import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const loginSchema = z.object({
  emailOrId: z.string().min(1, "Email or Research ID is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string().default("Researcher"),
  rememberMe: z.boolean().default(false),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: "Researcher",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let message = "Invalid credentials. Please try again.";

        try {
          if (contentType?.includes("application/json")) {
            const errorData = await response.json();
            message = errorData.message ?? message;
          } else {
            const errorText = await response.text();
            if (errorText) {
              message = errorText;
            }
          }
        } catch (parseError) {
          console.error("Failed to parse login error response", parseError);
        }

        setError(message);
        return;
      }

      if (!contentType?.includes("application/json")) {
        const errorText = await response.text();
        setError(errorText || "Login failed. Please try again.");
        return;
      }

      const result = await response.json();
      localStorage.setItem("user", JSON.stringify(result.user));
      setLocation("/dashboard");
    } catch (err) {
      console.error("Login request failed", err);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-serif text-center">Researcher Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the Legacy Atlas platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailOrId">Email / Research ID</Label>
                <Input
                  id="emailOrId"
                  type="text"
                  placeholder="Enter your email or research ID"
                  {...register("emailOrId")}
                />
                {errors.emailOrId && (
                  <p className="text-sm text-red-500">{errors.emailOrId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <input type="hidden" {...register("role")} />

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  {...register("rememberMe")}
                  onCheckedChange={(checked) => setValue("rememberMe", checked as boolean)}
                />
                <Label htmlFor="rememberMe" className="text-sm">
                  Remember me
                </Label>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <span className="text-sm text-muted-foreground">Don't have an account? </span>
              <Link href="/register">
                <Button variant="link" className="p-0 h-auto font-medium">
                  Register here
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}