import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });

    // Also check URL hash for type=recovery
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in both fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setSuccess(true);
    toast.success("Password updated successfully!");
    setTimeout(() => navigate("/updates"), 2000);
  };

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>
      <Header />
      <div className="relative z-10 container mx-auto px-4 py-32 max-w-md">
        {success ? (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">Password Updated</h1>
            <p className="text-muted-foreground">Redirecting you now...</p>
          </div>
        ) : !isRecovery ? (
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
            <p className="text-muted-foreground">
              This page is accessed via the reset link in your email. If you need a reset link, use the "Forgot Password" option when signing in.
            </p>
          </div>
        ) : (
          <div className="space-y-6 bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6">
            <div className="text-center space-y-1">
              <h1 className="text-xl font-bold text-foreground">Set New Password</h1>
              <p className="text-sm text-muted-foreground">Choose a new password for your Win The Night™ account</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="new-pw" className="text-xs text-muted-foreground">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="new-pw"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-background/50 rounded-xl h-11"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm-pw" className="text-xs text-muted-foreground">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirm-pw"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-background/50 rounded-xl h-11"
                  />
                </div>
              </div>
              <Button
                onClick={handleReset}
                disabled={loading}
                className="w-full bg-neon-blue text-black hover:bg-neon-blue/90 font-semibold h-11 rounded-xl"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default ResetPassword;
