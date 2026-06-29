import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Moon, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/use-toast";

const AdminLogin = () => {
  const { user, signIn, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signIn(username, password);
      toast({ title: "Welcome back", description: "You're now signed in." });
      navigate("/admin");
    } catch (err) {
      toast({ title: "Login failed", description: "Invalid username or password.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/60 to-background px-5">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Moon className="h-7 w-7" />
          </span>
          <h1 className="font-display text-3xl font-semibold text-primary mt-4">NurulQuran Admin</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to manage your content</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8 shadow-xl shadow-emerald-900/5 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" className="h-11 rounded-xl pl-10" autoComplete="username" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-11 rounded-xl pl-10" autoComplete="current-password" />
            </div>
          </div>
          <Button type="submit" disabled={submitting} className="w-full h-11 rounded-full bg-primary hover:bg-primary/90 shadow-md disabled:opacity-70">
            {submitting ? "Signing in..." : "Sign In"} <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
