import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Leaf, Trophy, Target, Calendar, Users, Zap, Award, Medal, Crown } from 'lucide-react';

interface AnalyticsPageProps {
  user: any;
}

const EnhancedAnalyticsPage: React.FC<AnalyticsPageProps> = ({ user }) => {
  const [trendPeriod, setTrendPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const trendData = {
    daily: Array.from({ length: 7 }, (_, i) => ({
      period: `Day ${i + 1}`,
      kwh: Math.floor(Math.random() * 3) + 5,
      efficiency: Math.floor(Math.random() * 20) + 80
    })),
    weekly: [
      { period: 'Week 1', kwh: 42.5, efficiency: 85 },
      { period: 'Week 2', kwh: 48.2, efficiency: 92 },
      { period: 'Week 3', kwh: 39.1, efficiency: 78 },
      { period: 'Week 4', kwh: 44.7, efficiency: 88 }
    ],
    monthly: [
      { period: 'Jan', kwh: 120, efficiency: 82 },
      { period: 'Feb', kwh: 135, efficiency: 85 },
      { period: 'Mar', kwh: 110, efficiency: 79 },
      { period: 'Apr', kwh: 145, efficiency: 88 },
      { period: 'May', kwh: 160, efficiency: 91 },
      { period: 'Jun', kwh: 150, efficiency: 89 },
      { period: 'Jul', kwh: 170, efficiency: 95 },
      { period: 'Aug', kwh: 155, efficiency: 93 },
      { period: 'Sep', kwh: 140, efficiency: 87 }
    ]
  };

  const leaderboard = [
    { rank: 1, user: "Soumil Singh", energy: 25.0, tokens: 50, efficiency: 94, badge: "🥇", streak: 12, totalValue: 500 },
    { rank: 2, user: "Krishna Patel", energy: 22.5, tokens: 45, efficiency: 91, badge: "🥈", streak: 8, totalValue: 450 },
    { rank: 3, user: "Atharva Sharma", energy: 20.0, tokens: 40, efficiency: 88, badge: "🥉", streak: 6, totalValue: 400 },
    { rank: 4, user: "Priya Gupta", energy: 18.5, tokens: 37, efficiency: 85, badge: "🏅", streak: 4, totalValue: 370 },
    { rank: 5, user: "Rahul Kumar", energy: 16.2, tokens: 32, efficiency: 82, badge: "🏅", streak: 3, totalValue: 320 },
    { rank: 6, user: "Ananya Das", energy: 14.8, tokens: 30, efficiency: 79, badge: "🏅", streak: 2, totalValue: 300 },
    { rank: 7, user: "Vikram Shah", energy: 13.5, tokens: 27, efficiency: 76, badge: "🎖️", streak: 1, totalValue: 270 },
    { rank: 8, user: "Neha Agarwal", energy: 12.3, tokens: 25, efficiency: 74, badge: "🎖️", streak: 1, totalValue: 250 },
    { rank: 9, user: "Arjun Reddy", energy: 11.8, tokens: 24, efficiency: 72, badge: "🎖️", streak: 0, totalValue: 240 },
    { rank: 10, user: "Kavya Nair", energy: 10.9, tokens: 22, efficiency: 70, badge: "🎖️", streak: 0, totalValue: 220 },
    { rank: 11, user: "Rohit Joshi", energy: 10.2, tokens: 20, efficiency: 68, badge: "🎖️", streak: 0, totalValue: 200 },
    { rank: 12, user: "Sneha Malhotra", energy: 9.8, tokens: 19, efficiency: 66, badge: "🎖️", streak: 0, totalValue: 190 },
    { rank: 13, user: "Karthik Rao", energy: 9.1, tokens: 18, efficiency: 64, badge: "🎖️", streak: 0, totalValue: 180 },
    { rank: 14, user: "Pooja Verma", energy: 8.7, tokens: 17, efficiency: 62, badge: "🎖️", streak: 0, totalValue: 170 },
    { rank: 15, user: "Amit Thakur", energy: 8.2, tokens: 16, efficiency: 60, badge: "🎖️", streak: 0, totalValue: 160 }
  ];

  const monthlyStats = {
    totalEnergy: 52.4,
    co2Saved: 44.5,
    treesEquivalent: 12,
    avgEfficiency: 89,
    bestDay: "Friday (8.0 kWh)",
    predictiveAccuracy: 92
  };

  const energyDistribution = [
    { name: 'Morning (6-12)', value: 35, fill: '#FFD43B' },
    { name: 'Afternoon (12-18)', value: 45, fill: '#34A853' },
    { name: 'Evening (18-22)', value: 20, fill: '#4285F4' }
  ];

  const insights = [
    {
      title: "Peak Performance Day",
      value: "Friday",
      description: "Highest energy production this week",
      icon: Target,
      color: "text-[#FFD43B]"
    },
    {
      title: "Efficiency Trend",
      value: "+7%",
      description: "Improvement over last month",
      icon: TrendingUp,
      color: "text-[#34A853]"
    },
    {
      title: "Carbon Impact",
      value: "44.5 kg CO₂",
      description: "Saved this month",
      icon: Leaf,
      color: "text-[#34A853]"
    },
    {
      title: "Community Rank",
      value: `#${user ? leaderboard.findIndex(u => u.user.includes(user.name?.split(' ')[0])) + 1 : 4}`,
      description: "Your position this month",
      icon: Trophy,
      color: "text-[#4285F4]"
    }
  ];

  // Forecast Accuracy Gauge Data
  const gaugeData = [
    { name: 'Accuracy', value: 92, fill: '#34A853' },
    { name: 'Remaining', value: 8, fill: '#f0f0f0' }
  ];

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 85) return '#34A853'; // Green
    if (accuracy >= 60) return '#FFD43B'; // Yellow
    return '#ef4444'; // Red
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-[#FFD43B]" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-[#CD7F32]" />;
      default: return <Trophy className="w-4 h-4 text-gray-400" />;
    }
  };

  const currentTrendData = trendData[trendPeriod];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Analytics & Insights</h1>
          <p className="text-gray-600">Advanced analytics and performance metrics</p>
        </div>
        <Badge className="bg-[#4285F4]/20 text-[#4285F4] border-[#4285F4]/30 px-4 py-2">
          <Calendar className="w-4 h-4 mr-2" />
          Last 30 Days
        </Badge>
      </div>

      {/* Key Insights */}
      <div className="grid md:grid-cols-4 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gray-50 ${insight.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-[#34A853]" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900 mb-1">{insight.value}</p>
                  <p className="text-sm text-gray-900 mb-1">{insight.title}</p>
                  <p className="text-xs text-gray-600">{insight.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Production Trend Chart */}
        <div className="lg:col-span-2">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <BarChart className="w-5 h-5 text-[#FFD43B]" />
                  Production Trend Analysis
                </CardTitle>
                <Tabs value={trendPeriod} onValueChange={(value) => setTrendPeriod(value as 'daily' | 'weekly' | 'monthly')}>
                  <TabsList className="bg-gray-100 rounded-xl">
                    <TabsTrigger value="daily" className="rounded-lg">Daily</TabsTrigger>
                    <TabsTrigger value="weekly" className="rounded-lg">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly" className="rounded-lg">Monthly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="period" stroke="#666" />
                    <YAxis stroke="#666" label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                      }} 
                    />
                    <Legend />
                    <Bar 
                      dataKey="kwh" 
                      fill="#FFD43B" 
                      radius={[8, 8, 0, 0]}
                      name="Energy Production (kWh)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Forecast Accuracy Gauge & Carbon Impact */}
        <div className="space-y-6">
          {/* Forecast Accuracy Gauge */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Target className="w-5 h-5 text-[#4285F4]" />
                Forecast Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-48 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={gaugeData}
                        cx="50%"
                        cy="80%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={0}
                        dataKey="value"
                      >
                        {gaugeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center mt-4">
                      <p className="text-3xl text-gray-900" style={{ color: getAccuracyColor(92) }}>92%</p>
                      <p className="text-sm text-gray-600">Accuracy</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#34A853] rounded-full"></div>
                    <span className="text-gray-600">Accurate (&gt;85%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Impact */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Leaf className="w-5 h-5 text-[#34A853]" />
                Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-[#34A853]/10 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-[#34A853]" />
                  <span className="text-sm text-gray-700">CO₂ Saved This Month</span>
                </div>
                <p className="text-2xl text-[#34A853]">{monthlyStats.co2Saved} kg</p>
                <p className="text-xs text-gray-600">Equivalent to {monthlyStats.treesEquivalent} trees planted</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-lg text-gray-900">{monthlyStats.totalEnergy}</p>
                  <p className="text-xs text-gray-600">Total kWh</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-lg text-gray-900">{monthlyStats.avgEfficiency}%</p>
                  <p className="text-xs text-gray-600">Avg Efficiency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Leaderboard */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Trophy className="w-5 h-5 text-[#FFD43B]" />
              Community Leaderboard (15 Users)
            </CardTitle>
            <Badge className="bg-[#FFD43B]/20 text-[#FFD43B] border-[#FFD43B]/30">
              <Users className="w-4 h-4 mr-1" />
              Active Competition
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Energy (kWh)</TableHead>
                  <TableHead>Tokens Earned</TableHead>
                  <TableHead>Efficiency</TableHead>
                  <TableHead>Streak</TableHead>
                  <TableHead>Total Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((user, index) => (
                  <TableRow key={user.rank} className={user.rank <= 3 ? 'bg-gradient-to-r from-[#FFD43B]/5 to-transparent' : ''}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{user.badge}</span>
                        <div className="flex items-center gap-1">
                          {getRankIcon(user.rank)}
                          <span className="text-gray-900">#{user.rank}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#FFD43B] to-[#34A853] rounded-xl flex items-center justify-center">
                          <span className="text-white text-sm">{user.user.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <span className="text-gray-900">{user.user}</span>
                          {user.rank <= 3 && (
                            <Badge className="ml-2 text-xs bg-[#FFD43B]/20 text-[#B8860B] border-[#FFD43B]/30">
                              Top Performer
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-900">{user.energy} kWh</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#34A853]/20 text-[#34A853] border-[#34A853]/30">
                          {user.tokens} SLR
                        </Badge>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#34A853] rounded-full"
                            style={{ width: `${(user.tokens / 50) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#4285F4] rounded-full"
                            style={{ width: `${user.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700">{user.efficiency}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-[#FFD43B]" />
                        <span className="text-sm text-gray-900">{user.streak}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-900">₹{user.totalValue}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAnalyticsPage;