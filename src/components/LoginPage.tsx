import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import {
  Zap,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  Coins,
  TrendingUp,
} from "lucide-react";

interface LoginPageProps {
  onLogin: (user: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = {
        id: 1,
        name: "Soumil Gandhi",
        email: loginForm.email,
        avatar: "SG",
        joinDate: "Sep 2024",
        totalEnergy: 52.4,
        totalTokens: 120,
      };

      onLogin(user);
      toast.success("🎉 Welcome back to Solar Token System!");
      setIsLoading(false);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !signupForm.name ||
      !signupForm.email ||
      !signupForm.password
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = {
        id: 2,
        name: signupForm.name,
        email: signupForm.email,
        avatar: signupForm.name
          .split(" ")
          .map((n) => n[0])
          .join(""),
        joinDate: "Sep 2024",
        totalEnergy: 0,
        totalTokens: 0,
      };

      onLogin(user);
      toast.success(
        "🚀 Account created successfully! Welcome to Solar Token System!",
      );
      setIsLoading(false);
    }, 1500);
  };

  const features = [
    {
      icon: Zap,
      title: "Smart Energy Monitoring",
      desc: "Real-time IoT sensors track your solar production",
    },
    {
      icon: Coins,
      title: "Token Rewards",
      desc: "Earn SLR tokens for every kWh you produce",
    },
    {
      icon: TrendingUp,
      title: "AI Predictions",
      desc: "ML-powered forecasting and anomaly detection",
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      desc: "Secure trading on Polygon network",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD43B]/20 via-white to-[#34A853]/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Features */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFD43B] to-[#FFA500] rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900">
                  Solar Token System
                </h1>
                <p className="text-sm text-gray-600">
                  IoT • Blockchain • Trading
                </p>
              </div>
            </div>

            <Badge className="bg-[#FFD43B]/20 text-[#B8860B] border-[#FFD43B]/30 mb-4">
              Demo mode
            </Badge>

            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
              Transform Solar Energy into Digital Assets
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join the revolution of decentralized clean energy.
              Monitor, tokenize, and trade your solar production
              with cutting-edge technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm"
                >
                  <div className="w-10 h-10 bg-[#4285F4]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#4285F4]" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#34A853] rounded-full"></div>
                <span>52.4k kWh Produced</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#FFD43B] rounded-full"></div>
                <span>1.2k SLR Minted</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#4285F4] rounded-full"></div>
                <span>78 Trades</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-900">
                Welcome
              </CardTitle>
              <p className="text-gray-600">
                Sign in to your account or create a new one
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-2xl">
                  <TabsTrigger
                    value="login"
                    className="rounded-xl"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="rounded-xl"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <form
                    onSubmit={handleLogin}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={loginForm.email}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              email: e.target.value,
                            })
                          }
                          className="pl-10 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={
                            showPassword ? "text" : "password"
                          }
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              password: e.target.value,
                            })
                          }
                          className="pl-10 pr-10 rounded-xl"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#FFD43B] hover:bg-[#FFD43B]/90 text-gray-900 rounded-xl py-6"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                {/* Signup Tab */}
                <TabsContent value="signup">
                  <form
                    onSubmit={handleSignup}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={signupForm.name}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              name: e.target.value,
                            })
                          }
                          className="pl-10 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          value={signupForm.email}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              email: e.target.value,
                            })
                          }
                          className="pl-10 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-password"
                          type={
                            showPassword ? "text" : "password"
                          }
                          placeholder="••••••••"
                          value={signupForm.password}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              password: e.target.value,
                            })
                          }
                          className="pl-10 pr-10 rounded-xl"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          value={signupForm.confirmPassword}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="pl-10 rounded-xl"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#34A853] hover:bg-[#34A853]/90 text-white rounded-xl py-6"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Creating account..."
                        : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By continuing, you agree to our Terms of
                  Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;