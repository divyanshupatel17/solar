import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, ComposedChart, Bar } from 'recharts';
import { Zap, Battery, Coins, Target, AlertTriangle, Sun, Cloud, Thermometer, ChevronLeft, ChevronRight, Calendar, TrendingUp } from 'lucide-react';

interface DashboardPageProps {
  user: any;
}

const EnhancedDashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [forecastPeriod, setForecastPeriod] = useState<'7-day' | 'monthly'>('7-day');
  const [weatherIndex, setWeatherIndex] = useState(0);

  const summaryStats = [
    { title: "Today's Energy", value: "6.2 kWh", icon: Zap, color: "text-[#FFD43B]", change: "+12%" },
    { title: "Lifetime Energy", value: "52.4 kWh", icon: Battery, color: "text-[#34A853]", change: "+8%" },
    { title: "My Tokens Earned", value: `${user?.totalTokens || 120} SLR`, icon: Coins, color: "text-[#4285F4]", change: "+15%" },
    { title: "Forecast Accuracy", value: "92%", icon: Target, color: "text-purple-500", change: "+3%" },
  ];

  const liveProductionData = [
    { time: '6AM', actual: 0.5, forecast: 0.6 },
    { time: '8AM', actual: 0.8, forecast: 1.0 },
    { time: '10AM', actual: 1.2, forecast: 1.5 },
    { time: '12PM', actual: 2.1, forecast: 2.4 },
    { time: '2PM', actual: 3.0, forecast: 3.2 },
    { time: '4PM', actual: 3.5, forecast: 3.6 },
    { time: '6PM', actual: 2.8, forecast: 2.9 },
    { time: '8PM', actual: 1.9, forecast: 2.0 },
    { time: '10PM', actual: 0.9, forecast: 1.0 },
  ];

  const forecastData = {
    '7-day': [
      { day: 'Mon', expected: 6.5, movingAvg: 6.2 },
      { day: 'Tue', expected: 6.8, movingAvg: 6.4 },
      { day: 'Wed', expected: 6.2, movingAvg: 6.5 },
      { day: 'Thu', expected: 7.0, movingAvg: 6.6 },
      { day: 'Fri', expected: 7.5, movingAvg: 6.8 },
      { day: 'Sat', expected: 6.9, movingAvg: 6.8 },
      { day: 'Sun', expected: 6.7, movingAvg: 6.9 }
    ],
    'monthly': [
      { month: 'Jan', expected: 120, movingAvg: 115 },
      { month: 'Feb', expected: 135, movingAvg: 125 },
      { month: 'Mar', expected: 110, movingAvg: 120 },
      { month: 'Apr', expected: 145, movingAvg: 128 },
      { month: 'May', expected: 160, movingAvg: 135 },
      { month: 'Jun', expected: 150, movingAvg: 145 },
      { month: 'Jul', expected: 170, movingAvg: 155 },
      { month: 'Aug', expected: 155, movingAvg: 158 },
      { month: 'Sep', expected: 140, movingAvg: 155 }
    ]
  };

  const weatherForecast = [
    { day: 'Mon', condition: 'Sunny', temp: 32, cloud: 20, icon: '☀️' },
    { day: 'Tue', condition: 'Partly Cloudy', temp: 30, cloud: 45, icon: '⛅' },
    { day: 'Wed', condition: 'Cloudy', temp: 28, cloud: 65, icon: '☁️' },
    { day: 'Thu', condition: 'Sunny', temp: 33, cloud: 10, icon: '☀️' },
    { day: 'Fri', condition: 'Rainy', temp: 26, cloud: 80, icon: '🌧️' },
    { day: 'Sat', condition: 'Sunny', temp: 34, cloud: 15, icon: '☀️' },
    { day: 'Sun', condition: 'Rainy', temp: 30, cloud: 70, icon: '🌧️' }
  ];

  const energyLogs = [
    { date: "20 Sep 25", kwh: 6.2, tokens: "12 SLR", anomalies: 1, weather: "Cloudy 40%", status: "normal" },
    { date: "19 Sep 25", kwh: 7.5, tokens: "15 SLR", anomalies: 0, weather: "Sunny 20%", status: "good" },
    { date: "18 Sep 25", kwh: 5.9, tokens: "11 SLR", anomalies: 2, weather: "Cloudy 60%", status: "warning" },
    { date: "17 Sep 25", kwh: 8.1, tokens: "16 SLR", anomalies: 0, weather: "Sunny 10%", status: "good" },
    { date: "16 Sep 25", kwh: 6.8, tokens: "13 SLR", anomalies: 1, weather: "Partial 30%", status: "normal" },
  ];

  const anomalies = [
    { time: "20 Sep, 2PM", message: "Expected 2.4 kWh, got 0.9 kWh", severity: "warning" },
    { time: "18 Sep, 1PM", message: "Sudden 70% drop detected", severity: "error" },
    { time: "17 Sep, 11AM", message: "Minor fluctuation in output", severity: "info" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-[#34A853] bg-[#34A853]/10';
      case 'warning': return 'text-[#FFD43B] bg-[#FFD43B]/10';
      case 'normal': return 'text-[#4285F4] bg-[#4285F4]/10';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-[#FFD43B] bg-[#FFD43B]/5';
      case 'info': return 'border-[#4285F4] bg-[#4285F4]/5';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const currentForecastData = forecastData[forecastPeriod];
  const xAxisKey = forecastPeriod === '7-day' ? 'day' : 'month';

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Energy Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'User'}! Monitor your solar production and forecasts</p>
        </div>
        <Badge className="bg-[#34A853]/20 text-[#34A853] border-[#34A853]/30 px-4 py-2">
          System Online
        </Badge>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-xs text-[#34A853] border-[#34A853]/30">
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Live Production Chart */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Zap className="w-5 h-5 text-[#FFD43B]" />
              Live Production vs Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={liveProductionData}>
                  <defs>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD43B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FFD43B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#666" />
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
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#FFD43B" 
                    strokeWidth={3}
                    fill="url(#actualGradient)"
                    name="Actual Production"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="#34A853" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Forecast"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expected Production Forecast */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <TrendingUp className="w-5 h-5 text-[#4285F4]" />
                Expected Production Forecast
              </CardTitle>
              <Tabs value={forecastPeriod} onValueChange={(value) => setForecastPeriod(value as '7-day' | 'monthly')}>
                <TabsList className="bg-gray-100 rounded-xl">
                  <TabsTrigger value="7-day" className="rounded-lg">7-Day</TabsTrigger>
                  <TabsTrigger value="monthly" className="rounded-lg">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={currentForecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey={xAxisKey} stroke="#666" />
                  <YAxis stroke="#666" label={{ value: forecastPeriod === '7-day' ? 'kWh' : 'kWh', angle: -90, position: 'insideLeft' }} />
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
                    dataKey="expected" 
                    fill="#4285F4" 
                    radius={[4, 4, 0, 0]}
                    name="Expected Energy"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="movingAvg" 
                    stroke="#34A853" 
                    strokeWidth={3}
                    dot={{ fill: '#34A853', r: 6 }}
                    name="Moving Average"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Historical Energy Logs */}
        <div className="lg:col-span-2">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Battery className="w-5 h-5 text-[#34A853]" />
                Historical Energy Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Total kWh</TableHead>
                    <TableHead>Tokens Earned</TableHead>
                    <TableHead>Anomalies</TableHead>
                    <TableHead>Weather</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {energyLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{log.kwh}</span>
                          <Badge className={`text-xs ${getStatusColor(log.status)}`}>
                            {log.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-[#34A853]">{log.tokens}</TableCell>
                      <TableCell>
                        {log.anomalies > 0 ? (
                          <span className="text-[#FFD43B]">{log.anomalies} Drop</span>
                        ) : (
                          <span className="text-[#34A853]">None</span>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-600">{log.weather}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Weather & Anomalies Sidebar */}
        <div className="space-y-6">
          {/* Extended 7-Day Weather Forecast */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Sun className="w-5 h-5 text-[#FFD43B]" />
                  7-Day Weather Forecast
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setWeatherIndex(Math.max(0, weatherIndex - 1))}
                    disabled={weatherIndex === 0}
                    className="p-1 h-6 w-6"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setWeatherIndex(Math.min(weatherForecast.length - 3, weatherIndex + 1))}
                    disabled={weatherIndex >= weatherForecast.length - 3}
                    className="p-1 h-6 w-6"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Weather */}
              <div className="p-4 bg-[#FFD43B]/10 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">Today</span>
                  <span className="text-2xl">☀️</span>
                </div>
                <p className="text-2xl text-gray-900">30°C</p>
                <p className="text-sm text-gray-600">Cloud Cover: 40%</p>
                <p className="text-sm text-gray-600">Irradiance: 800 W/m²</p>
              </div>

              {/* Weather Carousel */}
              <div className="space-y-3">
                {weatherForecast.slice(weatherIndex, weatherIndex + 3).map((weather, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{weather.icon}</span>
                      <div>
                        <p className="text-sm text-gray-900">{weather.day}</p>
                        <p className="text-xs text-gray-600">{weather.condition}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{weather.temp}°C</p>
                      <p className="text-xs text-gray-600">{weather.cloud}% cloud</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Anomaly Alerts */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <AlertTriangle className="w-5 h-5 text-[#FFD43B]" />
                Anomaly Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {anomalies.map((anomaly, index) => (
                <Alert key={index} className={`${getSeverityColor(anomaly.severity)} border rounded-xl`}>
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">{anomaly.time}</p>
                      <p className="text-sm">{anomaly.message}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboardPage;