import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Zap, Battery, Coins, Target, AlertTriangle, Sun, Cloud, Thermometer } from 'lucide-react';

const DashboardPage = () => {
  const summaryStats = [
    { title: "Today's Energy", value: "6.2 kWh", icon: Zap, color: "text-[#FFD43B]", change: "+12%" },
    { title: "Lifetime Energy", value: "52.4 kWh", icon: Battery, color: "text-[#34A853]", change: "+8%" },
    { title: "My Tokens Earned", value: "120 SLR", icon: Coins, color: "text-[#4285F4]", change: "+15%" },
    { title: "Forecast Accuracy", value: "92%", icon: Target, color: "text-purple-500", change: "+3%" },
  ];

  const productionData = [
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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Energy Dashboard</h1>
          <p className="text-gray-600">Monitor your solar production and forecasts</p>
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

      {/* Main Production Chart */}
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
              <LineChart data={productionData}>
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
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#FFD43B" 
                  strokeWidth={3}
                  dot={{ fill: '#FFD43B', r: 6 }}
                  name="Actual Production"
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#4285F4" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#4285F4', r: 4 }}
                  name="Forecast"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

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

        {/* Weather Widget & Anomalies */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Sun className="w-5 h-5 text-[#FFD43B]" />
                Weather Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl text-gray-900">30°C</p>
                  <p className="text-sm text-gray-600">Temperature</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Cloud className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                  <p className="text-2xl text-gray-900">40%</p>
                  <p className="text-sm text-gray-600">Cloud Cover</p>
                </div>
              </div>
              <div className="p-4 bg-[#FFD43B]/10 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-4 h-4 text-[#FFD43B]" />
                  <span className="text-sm text-gray-700">Solar Irradiance</span>
                </div>
                <p className="text-xl text-gray-900">800 W/m²</p>
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

export default DashboardPage;