import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  placement?: string;
};

const BMC_BASE = "https://buymeacoffee.com/winthenight";

export const SupportModal: React.FC<Props> = ({ open, onClose, placement = "modal_support" }) => {
  const href = `${BMC_BASE}?utm_source=site&utm_medium=modal&utm_campaign=${encodeURIComponent(placement)}`;

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
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Support Win The Night</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              If our work helps you end the day stronger, consider buying us a coffee.
              Payments complete securely on Buy Me a Coffee.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-neon-blue hover:bg-neon-blue/90 text-black font-semibold px-6 py-3 shadow-neon hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all duration-300 hover:scale-105"
              >
                ☕ Buy us a coffee
              </a>
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-card border-2 border-neon-blue/30 text-foreground font-semibold px-6 py-3 hover:bg-neon-blue/10 hover:border-neon-blue/50 transition-all duration-300"
              >
                Close
              </button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground/70">
              We track attribution with UTM parameters; no cookies are set by this button.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
