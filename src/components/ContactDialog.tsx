import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, ExternalLink } from "lucide-react";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-neon-blue" />
          Contact Us
        </DialogTitle>
        <DialogDescription>
          Reach us directly by email or follow the longer updates on Substack.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3">
        <Button asChild className="bg-neon-blue hover:bg-neon-blue/90 text-black font-bold">
          <a href="mailto:contact@winthenight.org">
            <Mail className="w-4 h-4 mr-2" />
            contact@winthenight.org
          </a>
        </Button>
        <Button asChild variant="outline" className="border-neon-blue/40 text-neon-blue hover:bg-neon-blue/10">
          <a href="https://winthenight.blog" target="_blank" rel="noopener noreferrer">
            Visit Substack
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
