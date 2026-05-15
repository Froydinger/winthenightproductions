import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// All product/price IDs that qualify as "Pro"
const PRO_PRICE_IDS = [
  "price_1TB5D3AB32948AKDJTYd74X4", // WTN Pro Supporter $10/mo
];
const PRO_PRODUCT_IDS = [
  "prod_UAtIOiu4df3Rso",  // ArcAi Pro (current)
  "prod_U4U5QGmibWU8wD",  // ArcAi Pro (legacy $8/mo)
];

// In-memory cache (per warm instance) to reduce Stripe API calls and abuse impact
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
let cache: { at: number; payload: string } | null = null;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
      return new Response(cache.payload, {
        headers: { ...corsHeaders, "Content-Type": "application/json", "X-Cache": "HIT" },
      });
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Fetch all active subscriptions
    const supporters: { name: string; source: string }[] = [];
    const seenEmails = new Set<string>();

    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const params: Stripe.SubscriptionListParams = {
        status: "active",
        limit: 100,
        expand: ["data.customer"],
      };
      if (startingAfter) params.starting_after = startingAfter;

      const subs = await stripe.subscriptions.list(params);

      for (const sub of subs.data) {
        const priceId = sub.items.data[0]?.price?.id;
        const productId = sub.items.data[0]?.price?.product;

        const isProPrice = PRO_PRICE_IDS.includes(priceId);
        const isProProduct = typeof productId === "string" && PRO_PRODUCT_IDS.includes(productId);

        if (isProPrice || isProProduct) {
          const customer = sub.customer as Stripe.Customer;
          const email = customer.email || "";
          if (!seenEmails.has(email)) {
            seenEmails.add(email);
            let source = "wtn";
            if (isProProduct && PRO_PRODUCT_IDS[0] === productId) source = "arcai";
            else if (isProProduct && PRO_PRODUCT_IDS[1] === productId) source = "arcai_legacy";

            supporters.push({
              name: customer.name || customer.email || "Anonymous Supporter",
              source,
            });
          }
        }
      }

      hasMore = subs.has_more;
      if (subs.data.length > 0) {
        startingAfter = subs.data[subs.data.length - 1].id;
      }
    }

    return new Response(JSON.stringify({ supporters }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
