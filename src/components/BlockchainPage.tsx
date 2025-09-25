import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';
import { Link, Shield, Wallet, CheckCircle, Clock, Copy, ExternalLink, Zap } from 'lucide-react';

interface BlockchainPageProps {
  user: any;
}

const BlockchainPage: React.FC<BlockchainPageProps> = ({ user }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  
  const tokenInfo = {
    name: "SolarToken",
    symbol: "SLR",
    contract: "0x1234567890abcdef1234567890abcdef12345678",
    network: "Polygon Mumbai Testnet",
    decimals: 18,
    totalSupply: "1,000,000 SLR",
    circulatingSupply: "125,000 SLR",
    marketCap: "₹1,250,000"
  };

  const recentSettlements = [
    {
      txHash: "0x89f3c2e1d4a7b9f6e8c5d2a9b7f4e1c8d5a2b9f6e3c7d4a1b8f5e2c9d6a3b7f4",
      blockNumber: "45,678,912",
      timestamp: "2 mins ago",
      amount: "25 SLR",
      status: "Confirmed",
      gasUsed: "21,000",
      gasFee: "0.001 MATIC"
    },
    {
      txHash: "0x12ab45cd78ef90gh34ij56kl78mn90op12qr34st56uv78wx90yz12ab34cd56ef",
      blockNumber: "45,678,898",
      timestamp: "15 mins ago", 
      amount: "18 SLR",
      status: "Confirmed",
      gasUsed: "21,000",
      gasFee: "0.001 MATIC"
    },
    {
      txHash: "0x56cd78ef90ab12gh34kl56mn78op90qr12st34uv56wx78yz90ab12cd34ef56gh",
      blockNumber: "45,678,885",
      timestamp: "32 mins ago",
      amount: "12 SLR", 
      status: "Confirmed",
      gasUsed: "21,000",
      gasFee: "0.001 MATIC"
    }
  ];

  const networkStats = {
    blockTime: "2.3s",
    tps: "65,000",
    avgGasFee: "0.001 MATIC",
    validators: "100+",
    uptime: "99.9%"
  };

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true);
      setWalletAddress("0x742d35Cc4B8E40Ea2A5c1C29F19c6a8e8b8A3B2F");
      toast.success("🔗 Wallet connected successfully!");
    }, 1000);
  };

  const handleDisconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    toast.success("Wallet disconnected");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Blockchain Integration</h1>
          <p className="text-gray-600">ERC20 token management and network status</p>
        </div>
        <Badge className="bg-[#34A853]/20 text-[#34A853] border-[#34A853]/30 px-4 py-2">
          <div className="w-2 h-2 bg-[#34A853] rounded-full mr-2 animate-pulse"></div>
          Network Healthy
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Token Info & Wallet */}
        <div className="lg:col-span-1 space-y-6">
          {/* ERC20 Token Info */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Zap className="w-5 h-5 text-[#FFD43B]" />
                ERC20 Token Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-[#FFD43B]/10 to-[#34A853]/10 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFD43B] to-[#34A853] rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900">{tokenInfo.name}</h3>
                    <p className="text-sm text-gray-600">({tokenInfo.symbol})</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Network:</span>
                    <span className="text-gray-900">{tokenInfo.network}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Decimals:</span>
                    <span className="text-gray-900">{tokenInfo.decimals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Supply:</span>
                    <span className="text-gray-900">{tokenInfo.totalSupply}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Cap:</span>
                    <span className="text-[#34A853]">{tokenInfo.marketCap}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Contract Address</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <code className="text-xs text-gray-700 flex-1 overflow-hidden">
                    {truncateHash(tokenInfo.contract)}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(tokenInfo.contract)}
                    className="p-1 h-6 w-6"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-6 w-6"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Connection */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Wallet className="w-5 h-5 text-[#4285F4]" />
                Wallet Connection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isConnected ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                    <Wallet className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">Connect your wallet to interact with tokens</p>
                  <Button
                    onClick={handleConnectWallet}
                    className="w-full bg-[#4285F4] hover:bg-[#4285F4]/90 text-white rounded-xl py-6"
                  >
                    🔗 Connect MetaMask
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-[#34A853]/10 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-[#34A853]" />
                    <div className="flex-1">
                      <p className="text-sm text-[#34A853]">Wallet Connected</p>
                      <code className="text-xs text-gray-600">
                        {truncateHash(walletAddress)}
                      </code>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-lg text-gray-900">{user?.totalTokens || 120} SLR</p>
                      <p className="text-xs text-gray-600">Token Balance</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-lg text-gray-900">2.45 MATIC</p>
                      <p className="text-xs text-gray-600">Network Balance</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleDisconnectWallet}
                    className="w-full rounded-xl"
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Network Stats */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Shield className="w-5 h-5 text-[#34A853]" />
                Network Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(networkStats).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="text-sm text-gray-900">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Settlement Logs */}
        <div className="lg:col-span-2">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Link className="w-5 h-5 text-[#4285F4]" />
                Latest Settlement Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentSettlements.map((settlement, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#34A853]" />
                      <Badge className="bg-[#34A853]/20 text-[#34A853] border-[#34A853]/30">
                        {settlement.status}
                      </Badge>
                      <span className="text-sm text-gray-500">{settlement.timestamp}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-[#34A853]">{settlement.amount}</p>
                      <p className="text-xs text-gray-500">Tokens Minted</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Transaction Hash:</span>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded text-[#4285F4]">
                          {truncateHash(settlement.txHash)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(settlement.txHash)}
                          className="p-1 h-6 w-6"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-6 w-6"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Block Number:</span>
                      <span className="text-sm text-gray-900">{settlement.blockNumber}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Gas Used:</span>
                      <span className="text-sm text-gray-900">{settlement.gasUsed}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Gas Fee:</span>
                      <span className="text-sm text-gray-900">{settlement.gasFee}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Alert className="border-[#4285F4]/30 bg-[#4285F4]/5 rounded-xl mt-6">
            <Shield className="w-4 h-4 text-[#4285F4]" />
            <AlertDescription className="text-[#4285F4]">
              <div className="space-y-2">
                <p className="text-sm">🔒 <strong>Security Notice:</strong> All transactions are secured by Polygon's proof-of-stake consensus.</p>
                <p className="text-xs">Smart contract has been audited and verified. Always verify contract addresses before interacting.</p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default BlockchainPage;