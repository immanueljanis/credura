'use client';

import { erc20Contract } from '@/constants/erc20';
import { X, Trophy, Coins } from 'lucide-react';
import { useState } from 'react';
import { useAccount } from 'wagmi';

interface RewardModalProps {
  tokens: number;
  badge: string;
  onClose: () => void;
}

export function RewardModal({ tokens, badge, onClose }: RewardModalProps) {
  const { address: userAddress, isConnected } = useAccount();
  const [isLoading, setIsloading] = useState(false)

  const claimToken = async () => {
    setIsloading(true)
    try {
      const result = await writeContractAsync({
        ...erc20Contract,
        functionName: "claim",
        args: [userAddress, tokens]
      })
      console.log(result);
    } catch (error) {
      console.error("Error transferring tokens:", error);
    } finally {
      setIsloading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#58CC02] to-[#4E6C50] rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Congratulations! 🎉
          </h2>
          <p className="text-gray-600">
            You've successfully completed the quiz!
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-[#FFFFFF] bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <Coins className="w-6 h-6 text-[#58CC02] mr-2" />
              <span className="text-2xl font-bold text-[#58CC02]">+{tokens}</span>
            </div>
            <div className="text-sm text-gray-600">
              <button className="w-full btn-primary" onClick={() => claimToken()}>Click here to claim your credits</button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F61] to-[#4E6C50] rounded-lg p-4 text-white">
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-semibold">{badge}</div>
            <div className="text-sm opacity-90">Achievement Badge</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full btn-primary"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
}

function writeContractAsync(arg0: any) {
  throw new Error('Function not implemented.');
}
