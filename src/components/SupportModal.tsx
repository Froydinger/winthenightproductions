import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, ExternalLink } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  placement?: string;
};

const BMC_BASE = "https://buymeacoffee.com/winthenight";

export const SupportModal: React.FC<Props> = ({ open, onClose, placement = "modal_support" }) => {
  const href = `${BMC_BASE}?utm_source=site&utm_medium=modal&utm_campaign=${encodeURIComponent(placement)}`;

  const handleSupportClick = () => {
    window.open(href, '_blank', 'noopener,noreferrer');
    onClose();
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
            className="absolute left-1/2 top-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-neon-blue/30 bg-card/95 backdrop-blur-xl p-6 shadow-[0_0_24px_rgba(0,217,255,0.3),0_0_6px_rgba(0,217,255,0.4)]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            role="dialog"
            aria-modal="true"
            aria-label="Support Win The Night"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-neon-blue/10 border-2 border-neon-blue/30">
                <Coffee className="w-12 h-12 text-neon-blue" />
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground text-center mb-3">
              Support Win The Night
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed text-center mb-6">
              If our work helps you end the day stronger, consider buying us a coffee.
              Your support helps us continue creating meaningful mental health content and conversations.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleSupportClick}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-neon-blue hover:bg-neon-blue/90 text-black font-semibold px-6 py-3 shadow-neon hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all duration-300 hover:scale-105"
              >
                <Coffee className="w-5 h-5" />
                <span>Buy us a coffee</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-card border-2 border-neon-blue/30 text-foreground font-semibold px-6 py-3 hover:bg-neon-blue/10 hover:border-neon-blue/50 transition-all duration-300"
              >
                Maybe Later
              </button>
            </div>

            <p className="mt-4 text-xs text-center text-muted-foreground/70">
              Secure payments processed by Buy Me a Coffee
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
