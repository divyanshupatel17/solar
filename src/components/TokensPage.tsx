import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { toast } from 'sonner@2.0.3';
import { Coins, TrendingUp, TrendingDown, DollarSign, Activity, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TokensPageProps {
  user: any;
}

const TokensPage: React.FC<TokensPageProps> = ({ user }) => {
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeAction, setTradeAction] = useState('');
  
  const balance = {
    tokens: user?.totalTokens || 120,
    fiatValue: (user?.totalTokens || 120) * 10,
    weeklyChange: 15,
    totalEarned: 245,
    totalSold: 125
  };

  const transactions = [
    { date: "23 Sep 25", action: "Earned", tokens: "+22", status: "Completed", hash: "–", type: "earn" },
    { date: "22 Sep 25", action: "Sold", tokens: "-8", status: "Completed", hash: "0x89ef12...", type: "sell" },
    { date: "21 Sep 25", action: "Earned", tokens: "+18", status: "Completed", hash: "–", type: "earn" },
    { date: "20 Sep 25", action: "Earned", tokens: "+20", status: "Completed", hash: "–", type: "earn" },
    { date: "19 Sep 25", action: "Sold", tokens: "-5", status: "Completed", hash: "0x12ab34...", type: "sell" },
    { date: "18 Sep 25", action: "Earned", tokens: "+10", status: "Completed", hash: "–", type: "earn" },
    { date: "17 Sep 25", action: "Bought", tokens: "+25", status: "Pending", hash: "0x45cd78...", type: "buy" },
    { date: "16 Sep 25", action: "Earned", tokens: "+15", status: "Completed", hash: "–", type: "earn" },
    { date: "15 Sep 25", action: "Sold", tokens: "-12", status: "Completed", hash: "0x56cd90...", type: "sell" },
    { date: "14 Sep 25", action: "Earned", tokens: "+14", status: "Completed", hash: "–", type: "earn" },
    { date: "13 Sep 25", action: "Bought", tokens: "+30", status: "Completed", hash: "0x23ab56...", type: "buy" },
    { date: "12 Sep 25", action: "Earned", tokens: "+16", status: "Completed", hash: "–", type: "earn" },
    { date: "11 Sep 25", action: "Sold", tokens: "-6", status: "Failed", hash: "0x67de89...", type: "sell" },
    { date: "10 Sep 25", action: "Earned", tokens: "+19", status: "Completed", hash: "–", type: "earn" },
    { date: "09 Sep 25", action: "Bought", tokens: "+40", status: "Completed", hash: "0x34fg12...", type: "buy" },
    { date: "08 Sep 25", action: "Earned", tokens: "+13", status: "Completed", hash: "–", type: "earn" },
    { date: "07 Sep 25", action: "Sold", tokens: "-9", status: "Completed", hash: "0x78hi34...", type: "sell" },
    { date: "06 Sep 25", action: "Earned", tokens: "+21", status: "Completed", hash: "–", type: "earn" },
    { date: "05 Sep 25", action: "Bought", tokens: "+35", status: "Completed", hash: "0x90jk56...", type: "buy" },
    { date: "04 Sep 25", action: "Earned", tokens: "+17", status: "Completed", hash: "–", type: "earn" }
  ];

  const marketData = [
    { pair: "SLR/USDC", price: "₹10.00", change: "+5.2%", volume: "₹45,230" },
    { pair: "SLR/MATIC", price: "0.012", change: "-2.1%", volume: "₹23,100" },
    { pair: "SLR/ETH", price: "0.00045", change: "+8.7%", volume: "₹67,890" }
  ];

  const handleTrade = () => {
    if (!tradeAmount || !tradeAction) {
      toast.error("Please enter amount and select action");
      return;
    }

    const amount = parseFloat(tradeAmount);
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (tradeAction === 'sell' && amount > balance.tokens) {
      toast.error("Insufficient tokens for sale");
      return;
    }

    toast.success(`✅ Trade executed successfully. ${tradeAction === 'buy' ? 'Bought' : 'Sold'} ${amount} SLR tokens.`);
    setTradeAmount('');
    setTradeAction('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-[#34A853]" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-[#FFD43B]" />;
      case 'Failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'earn':
        return 'text-[#34A853] bg-[#34A853]/10';
      case 'buy':
        return 'text-[#4285F4] bg-[#4285F4]/10';
      case 'sell':
        return 'text-[#FFD43B] bg-[#FFD43B]/10';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Tokens & Trading</h1>
          <p className="text-gray-600">Manage your solar tokens and execute trades</p>
        </div>
        <Badge className="bg-[#34A853]/20 text-[#34A853] border-[#34A853]/30 px-4 py-2">
          Market Open
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Balance & Trading */}
        <div className="lg:col-span-1 space-y-6">
          {/* My Balance Card */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Coins className="w-5 h-5 text-[#FFD43B]" />
                My Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-gradient-to-br from-[#FFD43B]/10 to-[#34A853]/10 rounded-xl">
                <p className="text-3xl text-gray-900 mb-2">{balance.tokens} SLR</p>
                <p className="text-gray-600 mb-2">≈ ₹{balance.fiatValue.toLocaleString()}</p>
                <Badge className={`${balance.weeklyChange > 0 ? 'text-[#34A853] bg-[#34A853]/10' : 'text-red-500 bg-red-50'}`}>
                  {balance.weeklyChange > 0 ? '+' : ''}{balance.weeklyChange}% this week
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-lg text-[#34A853]">{balance.totalEarned}</p>
                  <p className="text-xs text-gray-600">Total Earned</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-lg text-[#FFD43B]">{balance.totalSold}</p>
                  <p className="text-xs text-gray-600">Total Sold</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Form */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Activity className="w-5 h-5 text-[#4285F4]" />
                Quick Trade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Amount (SLR)</label>
                <Input
                  type="number"
                  placeholder="Enter token amount"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Action</label>
                <Select value={tradeAction} onValueChange={setTradeAction}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Buy Tokens</SelectItem>
                    <SelectItem value="sell">Sell Tokens</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleTrade}
                className="w-full bg-[#FFD43B] hover:bg-[#FFD43B]/90 text-gray-900 rounded-xl py-6"
              >
                Execute Trade
              </Button>

              <div className="text-center">
                <p className="text-xs text-gray-500">Current Rate: 1 SLR = ₹10.00</p>
              </div>
            </CardContent>
          </Card>

          {/* Market Pairs */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <DollarSign className="w-5 h-5 text-[#34A853]" />
                Market Pairs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {marketData.map((pair, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-900">{pair.pair}</p>
                    <p className="text-xs text-gray-600">Vol: {pair.volume}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{pair.price}</p>
                    <div className="flex items-center gap-1">
                      {pair.change.startsWith('+') ? (
                        <TrendingUp className="w-3 h-3 text-[#34A853]" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-xs ${pair.change.startsWith('+') ? 'text-[#34A853]' : 'text-red-500'}`}>
                        {pair.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Activity className="w-5 h-5 text-[#4285F4]" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 overflow-y-auto scrollbar-tokens">
                <Table>
                  <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Tokens</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Hash</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx, index) => (
                      <TableRow key={index} className="hover:bg-gray-50/50 transition-colors">
                        <TableCell className="text-gray-600">{tx.date}</TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${getActionColor(tx.type)}`}>
                            {tx.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`${tx.tokens.startsWith('+') ? 'text-[#34A853]' : 'text-[#FFD43B]'}`}>
                            {tx.tokens}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(tx.status)}
                            <span className="text-sm">{tx.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {tx.hash !== '–' ? (
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded text-[#4285F4]">
                              {tx.hash}
                            </code>
                          ) : (
                            <span className="text-gray-400">–</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Additional Market Insights */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <TrendingUp className="w-5 h-5 text-[#34A853]" />
                Market Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-[#FFD43B]/10 to-[#FFD43B]/5 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-[#FFD43B]" />
                    <span className="text-sm text-gray-700">24h Volume</span>
                  </div>
                  <p className="text-lg text-gray-900">₹1,24,500</p>
                  <p className="text-xs text-[#34A853]">+12.5% from yesterday</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-[#34A853]/10 to-[#34A853]/5 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="w-4 h-4 text-[#34A853]" />
                    <span className="text-sm text-gray-700">Market Cap</span>
                  </div>
                  <p className="text-lg text-gray-900">₹2.4M</p>
                  <p className="text-xs text-[#34A853]">+8.2% this week</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-[#4285F4]/10 to-[#4285F4]/5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#4285F4]" />
                    <span className="text-sm text-gray-700">Active Traders</span>
                  </div>
                  <Badge className="bg-[#4285F4]/20 text-[#4285F4] border-[#4285F4]/30 text-xs">
                    Live
                  </Badge>
                </div>
                <p className="text-lg text-gray-900">1,247 users</p>
                <p className="text-xs text-gray-600">Trading in the last 24 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TokensPage;