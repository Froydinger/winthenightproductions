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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    toast.success("Signed in with Google!");
    onOpenChange(false);
    setLoading(false);
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("apple", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Apple sign-in failed");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    toast.success("Signed in with Apple!");
    onOpenChange(false);
    setLoading(false);
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
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  variant="outline"
                  className="w-full border-border hover:bg-accent/50 h-11 rounded-xl font-semibold"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleAppleSignIn}
                  disabled={loading}
                  variant="outline"
                  className="w-full border-border hover:bg-accent/50 h-11 rounded-xl font-semibold"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      Continue with Apple
                    </>
                  )}
                </Button>

                <Button
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
