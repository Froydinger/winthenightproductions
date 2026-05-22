import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Zap, Star, DollarSign, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  placement?: string;
};

const tiers = [
  {
    id: "custom",
    label: "One-Time Donation",
    description: "Any amount, one time. Every bit helps!",
    icon: DollarSign,
    mode: "payment" as const,
  },
  {
    id: "supporter",
    label: "Supporter",
    price: "$3/mo",
    description: "Quietly back the show every month — no shout-out, just love. We're truly grateful.",
    icon: Heart,
    priceId: "price_1TB5D1AB32948AKDFUcp67uu",
    mode: "subscription" as const,
  },
  {
    id: "pro",
    label: "Pro Supporter",
    price: "$10/mo",
    description: "Monthly shout-out on the podcast + your name on the Pro Supporters wall. Pure support, full credit.",
    icon: Star,
    priceId: "price_1TB5D3AB32948AKDJTYd74X4",
    mode: "subscription" as const,
  },
];



const PRESET_AMOUNTS = [3, 5, 10, 25];

export const SupportModal: React.FC<Props> = ({ open, onClose }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const { toast } = useToast();

  const handleCheckout = async (tier: typeof tiers[number]) => {
    setLoading(tier.id);
    try {
      const body: Record<string, unknown> = {};

      if (tier.id === "custom") {
        const cents = Math.round(parseFloat(customAmount) * 100);
        if (!cents || cents < 100) {
          toast({ title: "Please enter at least $1", variant: "destructive" });
          setLoading(null);
          return;
        }
        body.customAmount = cents;
        body.mode = "payment";
      } else {
        body.priceId = tier.priceId;
        body.mode = tier.mode;
      }

      const { data, error } = await supabase.functions.invoke("create-checkout", { body });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank", "noopener,noreferrer");
        onClose();
      }
    } catch (err: any) {
      toast({ title: "Something went wrong", description: err.message, variant: "destructive" });
    } finally {
      setLoading(null);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="fixed left-0 right-0 top-0 bottom-0 m-auto w-[94%] max-w-lg h-fit max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-neon-blue/30 bg-card/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_0_24px_rgba(0,217,255,0.3)]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            role="dialog"
            aria-modal="true"
            aria-label="Support Win The Night"
          >
            <h2 className="text-2xl font-bold text-foreground text-center mb-1">
              Support Win The Night
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-5">
              Choose how you'd like to support the show
            </p>

            <div className="space-y-3">
              {/* Subscription tiers */}
              {tiers.filter(t => t.id !== "custom").map((tier) => {
                const Icon = tier.icon;
                return (
                  <button
                    key={tier.id}
                    onClick={() => handleCheckout(tier)}
                    disabled={loading !== null}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-neon-blue/20 bg-card/60 hover:bg-neon-blue/10 hover:border-neon-blue/50 transition-all duration-300 text-left group disabled:opacity-50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center border border-neon-blue/30 group-hover:scale-110 transition-transform flex-shrink-0">
                      <Icon className="w-5 h-5 text-neon-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{tier.label}</span>
                        <span className="text-neon-blue font-bold text-sm">{tier.price}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{tier.description}</p>
                    </div>
                    {loading === tier.id && <Loader2 className="w-4 h-4 animate-spin text-neon-blue flex-shrink-0" />}
                  </button>
                );
              })}

              {/* One-time donation */}
              <div className="p-4 rounded-xl border border-neon-blue/20 bg-card/60 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center border border-neon-blue/30 flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-neon-blue" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">One-Time Donation</span>
                    <p className="text-xs text-muted-foreground">Any amount, one time</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {PRESET_AMOUNTS.map(amt => (
                    <button
                      key={amt}
                      onClick={() => setCustomAmount(String(amt))}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                        customAmount === String(amt)
                          ? "bg-neon-blue/20 border-neon-blue/50 text-neon-blue"
                          : "border-border/50 text-muted-foreground hover:border-neon-blue/30"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      placeholder="Amount"
                      className="w-full pl-7 pr-3 py-2 rounded-lg bg-background/50 border border-border/50 text-foreground text-sm focus:outline-none focus:border-neon-blue/50"
                    />
                  </div>
                  <button
                    onClick={() => handleCheckout(tiers[0])}
                    disabled={loading !== null || !customAmount}
                    className="px-4 py-2 rounded-lg bg-neon-blue hover:bg-neon-blue/90 text-black font-semibold text-sm transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading === "custom" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Donate"}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-4 py-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-neon-blue/30 transition-all text-sm"
            >
              Maybe Later
            </button>

            <p className="mt-3 text-xs text-center text-muted-foreground/70">
              Secure payments processed by Stripe
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
