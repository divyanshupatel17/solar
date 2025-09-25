import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Zap,
  Coins,
  TrendingUp,
  Shield,
  Database,
  Users,
  ChevronRight,
  Star,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onGetStarted: () => void;
  user?: any;
  onNavigateToAnalytics?: () => void;
  onNavigateToTokens?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  onGetStarted,
  user,
  onNavigateToAnalytics,
  onNavigateToTokens,
}) => {
  const stats = [
    {
      title: "Total Energy Produced",
      value: "52.4 kWh",
      icon: Zap,
      color: "text-[#FFD43B]",
    },
    {
      title: "Total Tokens Minted",
      value: "1,250 SLR",
      icon: Coins,
      color: "text-[#34A853]",
    },
    {
      title: "Total Trades",
      value: "78 completed",
      icon: TrendingUp,
      color: "text-[#4285F4]",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Measure with IoT",
      description:
        "Smart sensors track real-time solar energy production from your panels",
      icon: Database,
      color: "bg-[#FFD43B]",
    },
    {
      step: "02",
      title: "Tokenize on Blockchain",
      description:
        "Energy data is verified and converted into ERC20 tokens on Polygon",
      icon: Shield,
      color: "bg-[#34A853]",
    },
    {
      step: "03",
      title: "Trade on Marketplace",
      description:
        "Buy and sell solar tokens with other users in our secure marketplace",
      icon: TrendingUp,
      color: "bg-[#4285F4]",
    },
  ];

  const teamMembers = [
    {
      name: "Soumil Gandhi",
      role: "Backend and ioT",
      avatar: "AS",
    },
    {
      name: "Krishna Patri",
      role: "Web developer",
      avatar: "KP",
    },
    {
      name: "Divyanshu Patel",
      role: "Machine Learning",
      avatar: "SS",
    },
    {
      name: "Ashutosh Gunjal",
      role: "Machine Learning",
      avatar: "PG",
    },
    {
      name: "Savitha Ponsekar",
      role: "UI/UX Designer",
      avatar: "RK",
    },
    {
      name: "Atharva Hiremath",
      role: "Blockchain",
      avatar: "AD",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD43B]/10 to-[#34A853]/10 rounded-3xl"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Badge className="bg-[#FFD43B]/20 text-[#B8860B] border-[#FFD43B]/30">
                Demo mode
              </Badge>
              <h1 className="text-4xl md:text-6xl text-gray-900">
                Solar Power, Reinvented as Currency
              </h1>
              <p className="text-xl text-gray-600">
                Measure production, forecast output, and trade
                tokens securely on blockchain. The future of
                decentralized clean energy is here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onGetStarted}
                  className="bg-[#FFD43B] hover:bg-[#FFD43B]/90 text-gray-900 rounded-xl px-8 py-6 text-lg"
                >
                  Get Started Today
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={user ? onNavigateToTokens : onGetStarted}
                  className="border-[#34A853] text-[#34A853] hover:bg-[#34A853]/10 rounded-xl px-8 py-6 text-lg"
                >
                  Explore Tokens
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD43B]/20 to-[#34A853]/20 rounded-2xl blur-xl"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1615232714706-6b3adc67138b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGVuZXJneSUyMHN1c3RhaW5hYmxlfGVufDF8fHx8MTc1ODQ0ODA3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Solar panels"
                className="relative w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-2xl bg-gray-50 ${stat.color}`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* How It Works */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Three simple steps to tokenize your solar energy
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {howItWorks.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="text-center space-y-6">
                  <div
                    className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Badge
                      variant="outline"
                      className="text-xs px-3 py-1"
                    >
                      STEP {step.step}
                    </Badge>
                    <h3 className="text-xl text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600">
            The innovators behind Solar Token System
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="bg-gray-50 border-0 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFD43B] to-[#34A853] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-lg">
                    {member.avatar}
                  </span>
                </div>
                <h4 className="text-gray-900 mb-1">
                  {member.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {member.role}
                </p>
                <div className="flex justify-center mt-3">
                  <Star className="w-4 h-4 text-[#FFD43B] fill-current" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action / Post-Login Hero */}
      {user ? (
        <div className="bg-gradient-to-r from-[#FFD43B] to-[#34A853] rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl text-white mb-4">
            Clean Energy. Real Value. Your Story.
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Track your production, trade tokens, and join the movement.
          </p>
          <Button
            onClick={onNavigateToAnalytics}
            className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl px-8 py-6 text-lg shadow-lg"
          >
            Explore Analytics
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-[#FFD43B] to-[#34A853] rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl text-white mb-4">
            Ready to Start Trading Solar Energy?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join the revolution of decentralized clean energy
          </p>
          <Button
            onClick={onGetStarted}
            className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl px-8 py-6 text-lg shadow-lg"
          >
            Get Started Today
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;