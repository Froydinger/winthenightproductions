import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Lock, ArrowLeft, Loader2, Sparkles } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type AuthView = "main" | "signin" | "signup" | "forgot" | "magic";

const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<AuthView>("main");

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  const goTo = (v: AuthView) => {
    resetFields();
    setView(v);
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/updates` },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created! Check your email to confirm.");
    onOpenChange(false);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Signed in!");
    onOpenChange(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password reset link sent! Check your email.");
  };

  const handleMagicLink = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/updates` },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Magic link sent! Check your email.");
  };

  const BackButton = () => (
    <button
      onClick={() => goTo("main")}
      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) goTo("main"); }}>
      <DialogContent className="bg-card/95 backdrop-blur-xl border-border p-0 overflow-hidden max-w-sm">
        {/* Header accent */}
        <div className="h-1 w-full bg-gradient-to-r from-neon-blue via-blue-400 to-neon-blue" />

        <div className="p-6 pt-5">
          {/* ====== MAIN VIEW ====== */}
          {view === "main" && (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-bold text-foreground">
                  Welcome to Win The Night™
                </h2>
                <p className="text-sm text-muted-foreground">
                  Sign in to join the conversation
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => goTo("signin")}
                  className="w-full bg-neon-blue text-black hover:bg-neon-blue/90 font-semibold h-11 rounded-xl"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Sign In with Password
                </Button>

                <Button
                  onClick={() => goTo("magic")}
                  variant="outline"
                  className="w-full border-border hover:bg-accent/50 h-11 rounded-xl"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-neon-blue" />
                  Sign In with Magic Link
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <Button
                onClick={() => goTo("signup")}
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground h-11 rounded-xl"
              >
                Create an Account
              </Button>
            </div>
          )}

          {/* ====== SIGN IN ====== */}
          {view === "signin" && (
            <div className="space-y-4">
              <BackButton />
              <h2 className="text-lg font-bold text-foreground">Sign In</h2>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="si-email" className="text-xs text-muted-foreground">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="si-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-background/50 rounded-xl h-11"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="si-password" className="text-xs text-muted-foreground">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="si-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-background/50 rounded-xl h-11"
                    />
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSignIn}
                disabled={loading}
                className="w-full bg-neon-blue text-black hover:bg-neon-blue/90 font-semibold h-11 rounded-xl"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
              </Button>
              <button
                onClick={() => goTo("forgot")}
                className="text-xs text-neon-blue hover:underline w-full text-center block"
              >
                Forgot your password?
              </button>
            </div>
          )}

          {/* ====== SIGN UP ====== */}
          {view === "signup" && (
            <div className="space-y-4">
              <BackButton />
              <h2 className="text-lg font-bold text-foreground">Create Account</h2>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="su-email" className="text-xs text-muted-foreground">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="su-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-background/50 rounded-xl h-11"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="su-password" className="text-xs text-muted-foreground">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="su-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-background/50 rounded-xl h-11"
                    />
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSignUp}
                disabled={loading}
                className="w-full bg-neon-blue text-black hover:bg-neon-blue/90 font-semibold h-11 rounded-xl"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => goTo("signin")} className="text-neon-blue hover:underline">
                  Sign in
                </button>
              </p>
            </div>
          )}

          {/* ====== FORGOT PASSWORD ====== */}
          {view === "forgot" && (
            <div className="space-y-4">
              <BackButton />
              <h2 className="text-lg font-bold text-foreground">Reset Password</h2>
              <p className="text-sm text-muted-foreground">
                Enter your email and we'll send you a reset link.
              </p>
              <div className="space-y-1.5">
                <Label htmlFor="fp-email" className="text-xs text-muted-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fp-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background/50 rounded-xl h-11"
                  />
                </div>
              </div>
              <Button
                onClick={handleForgotPassword}
                disabled={loading}
                className="w-full bg-neon-blue text-black hover:bg-neon-blue/90 font-semibold h-11 rounded-xl"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Reset Link"}
              </Button>
            </div>
          )}

          {/* ====== MAGIC LINK ====== */}
          {view === "magic" && (
            <div className="space-y-4">
              <BackButton />
              <h2 className="text-lg font-bold text-foreground">Magic Link</h2>
              <p className="text-sm text-muted-foreground">
                We'll email you a link that signs you in instantly — no password needed.
              </p>
              <div className="space-y-1.5">
                <Label htmlFor="ml-email" className="text-xs text-muted-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="ml-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background/50 rounded-xl h-11"
                  />
                </div>
              </div>
              <Button
                onClick={handleMagicLink}
                disabled={loading}
                className="w-full bg-neon-blue text-black hover:bg-neon-blue/90 font-semibold h-11 rounded-xl"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Magic Link"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
