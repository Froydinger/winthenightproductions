import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  title: string;
  backTo?: string;
  backLabel?: string;
}

const AdminHeader = ({ title, backTo = "/", backLabel = "Back" }: AdminHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-neon-blue/20"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(backTo)}
            className="text-muted-foreground hover:text-foreground hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {backLabel}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-neon-blue" />
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        </div>

        <div className="w-[72px]" />
      </div>
    </header>
  );
};

export default AdminHeader;
