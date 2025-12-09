import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
            className="absolute left-1/2 top-1/2 w-[95%] max-w-2xl h-[85vh] max-h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-neon-blue/30 bg-card/95 backdrop-blur-xl shadow-[0_0_24px_rgba(0,217,255,0.3),0_0_6px_rgba(0,217,255,0.4)] flex flex-col overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            role="dialog"
            aria-modal="true"
            aria-label="Support Win The Night"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b border-neon-blue/20 flex-shrink-0">
              <h2 className="text-xl font-bold text-foreground">Support Win The Night</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-neon-blue/10 border border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-neon-blue" />
              </button>
            </div>

            {/* Iframe container */}
            <div className="flex-1 relative overflow-hidden">
              <iframe
                src={href}
                className="absolute inset-0 w-full h-full border-0"
                title="Buy Me a Coffee - Win The Night"
                loading="lazy"
              />
            </div>

            {/* Footer note */}
            <div className="p-3 border-t border-neon-blue/20 flex-shrink-0 bg-card/50">
              <p className="text-xs text-center text-muted-foreground/70">
                Secure payments processed by Buy Me a Coffee
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
