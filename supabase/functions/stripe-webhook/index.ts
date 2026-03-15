import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const PRO_PRICE_ID = "price_1TB5D3AB32948AKDJTYd74X4";
const SUPPORTER_PRICE_ID = "price_1TB5D1AB32948AKDFUcp67uu";

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!signature || !webhookSecret) {
    return new Response("Missing signature or webhook secret", { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Webhook signature verification failed", { status: 400 });
  }

  console.log(`[STRIPE-WEBHOOK] Event: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === "payment") {
          // One-time donation - add to supporters
          const customerEmail = session.customer_details?.email || "Anonymous";
          const customerName = session.customer_details?.name || "Anonymous Supporter";
          
          await supabase.from("supporters").insert({
            stripe_customer_id: (session.customer as string) || `onetime_${session.id}`,
            display_name: customerName,
            tier: "one_time",
            status: "active",
            amount_cents: session.amount_total || 0,
          });
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const priceId = subscription.items.data[0]?.price?.id;
        
        let tier = "supporter";
        let amountCents = 300;
        if (priceId === PRO_PRICE_ID) {
          tier = "pro";
          amountCents = 1000;
        }

        const customer = await stripe.customers.retrieve(customerId);
        const customerName = (customer as Stripe.Customer).name || "Anonymous Supporter";

        // Look up user by email
        let userId = null;
        const customerEmail = (customer as Stripe.Customer).email;
        if (customerEmail) {
          const { data: profiles } = await supabase
            .from("user_profiles")
            .select("user_id, display_name")
            .limit(10);
          
          // Try to find by auth user email
          const { data: authUsers } = await supabase.auth.admin.listUsers();
          const matchedUser = authUsers?.users?.find(u => u.email === customerEmail);
          if (matchedUser) {
            userId = matchedUser.id;
            // Use their profile display name if available
            const profile = profiles?.find(p => p.user_id === matchedUser.id);
            if (profile?.display_name) {
              // Use profile name instead
            }
          }
        }

        const status = subscription.status === "active" ? "active" : "inactive";

        // Upsert supporter record
        const { data: existing } = await supabase
          .from("supporters")
          .select("id")
          .eq("stripe_subscription_id", subscription.id)
          .maybeSingle();

        if (existing) {
          await supabase.from("supporters").update({
            status,
            tier,
            amount_cents: amountCents,
            display_name: customerName,
            user_id: userId,
            cancelled_at: status === "inactive" ? new Date().toISOString() : null,
          }).eq("id", existing.id);
        } else {
          await supabase.from("supporters").insert({
            stripe_customer_id: customerId,
            stripe_subscription_id: subscription.id,
            display_name: customerName,
            tier,
            status,
            amount_cents: amountCents,
            user_id: userId,
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await supabase.from("supporters")
          .update({ status: "inactive", cancelled_at: new Date().toISOString() })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }
    }
  } catch (err) {
    console.error("[STRIPE-WEBHOOK] Error processing event:", err);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
