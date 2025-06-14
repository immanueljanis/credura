'use client';

import { useState } from 'react';
import { Wallet } from 'lucide-react';

interface ConnectWalletButtonProps {
  isConnected: boolean;
  onConnect: () => void;
}

export function ConnectWalletButton({ isConnected, onConnect }: ConnectWalletButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate wallet connection delay
    setTimeout(() => {
      onConnect();
      setIsConnecting(false);
    }, 1500);
  };

  if (isConnected) {
    return (
      <div className="flex items-center bg-[#58CC02] text-white px-4 py-2 rounded-lg font-medium">
        <Wallet className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">0x1234...5678</span>
        <span className="sm:hidden">Connected</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Wallet className="w-4 h-4 mr-2" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}