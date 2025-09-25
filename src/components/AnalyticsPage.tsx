import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Leaf, Trophy, Target, Calendar, Users, Zap, Award } from 'lucide-react';

const AnalyticsPage = () => {
  const weeklyData = [
    { day: 'Mon', kwh: 6.2, efficiency: 85 },
    { day: 'Tue', kwh: 7.5, efficiency: 92 },
    { day: 'Wed', kwh: 5.9, efficiency: 78 },
    { day: 'Thu', kwh: 6.7, efficiency: 88 },
    { day: 'Fri', kwh: 8.0, efficiency: 95 },
    { day: 'Sat', kwh: 7.1, efficiency: 90 },
    { day: 'Sun', kwh: 6.5, efficiency: 87 }
  ];

  const leaderboard = [
    { rank: 1, user: "Soumil", energy: 25.0, tokens: "50 SLR", efficiency: 94, badge: "🥇" },
    { rank: 2, user: "Krishna", energy: 22.5, tokens: "45 SLR", efficiency: 91, badge: "🥈" },
    { rank: 3, user: "Atharva", energy: 20.0, tokens: "40 SLR", efficiency: 88, badge: "🥉" },
    { rank: 4, user: "Priya", energy: 18.5, tokens: "37 SLR", efficiency: 85, badge: "🏅" },
    { rank: 5, user: "Rahul", energy: 16.2, tokens: "32 SLR", efficiency: 82, badge: "🏅" },
    { rank: 6, user: "Ananya", energy: 14.8, tokens: "30 SLR", efficiency: 79, badge: "🏅" }
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
      title: "Forecast Accuracy",
      value: "92%",
      description: "ML prediction accuracy",
      icon: Target,
      color: "text-[#4285F4]"
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-xl shadow-lg">
          <p className="text-gray-900">{`${label}`}</p>
          <p className="text-[#FFD43B]">{`Energy: ${payload[0].value} kWh`}</p>
          <p className="text-[#34A853]">{`Efficiency: ${payload[1]?.value || 0}%`}</p>
        </div>
      );
    }
    return null;
  };

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
        {/* Weekly Production Trend */}
        <div className="lg:col-span-2">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <BarChart className="w-5 h-5 text-[#FFD43B]" />
                Weekly Production Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#666" />
                    <YAxis stroke="#666" label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<CustomTooltip />} />
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

        {/* Energy Distribution */}
        <div className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Zap className="w-5 h-5 text-[#4285F4]" />
                Daily Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={energyDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {energyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Production']}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {energyDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.fill }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Carbon Impact */}
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

      {/* Leaderboard */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Trophy className="w-5 h-5 text-[#FFD43B]" />
            Community Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Energy Produced (kWh)</TableHead>
                <TableHead>Tokens Earned</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Badge</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((user) => (
                <TableRow key={user.rank} className={user.rank <= 3 ? 'bg-gray-50' : ''}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{user.badge}</span>
                      <span className="text-gray-900">#{user.rank}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FFD43B] to-[#34A853] rounded-xl flex items-center justify-center">
                        <span className="text-white text-sm">{user.user[0]}</span>
                      </div>
                      <span className="text-gray-900">{user.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900">{user.energy}</TableCell>
                  <TableCell>
                    <Badge className="bg-[#34A853]/20 text-[#34A853] border-[#34A853]/30">
                      {user.tokens}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#34A853] rounded-full"
                          style={{ width: `${user.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-700">{user.efficiency}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.rank <= 3 && (
                      <Award className="w-5 h-5 text-[#FFD43B]" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;