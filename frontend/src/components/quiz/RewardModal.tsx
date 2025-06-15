"use client";

import {
  claimBadgeWithCertificate,
  claimCreditForStudent,
} from "@/actions/quiz/claim-credit.action";
import { erc20Contract } from "@/constants/erc20";
import { X, Trophy, Coins } from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";

interface RewardModalProps {
  tokens: number;
  badge: string;
  onClose: () => void;
}

export function RewardModal({ tokens, badge, onClose }: RewardModalProps) {
  const [status, setStatus] = useState("");
  const { address: userAddress, isConnected } = useAccount();
  const [isLoading, setIsloading] = useState(false);
  const [badgeStatus, setBadgeStatus] = useState("");

  const claimToken = async () => {
    setIsloading(true);
    setStatus("Claiming tokens...");

    try {
      const result = await claimCreditForStudent({
        userAddress: userAddress as `0x${string}`,
      });

      if (result.error) {
        setStatus(`Error: ${result.details}`);
      } else {
        setStatus("Tokens claimed successfully!");
      }

      console.log(result);
    } catch (error: any) {
      console.error("Failed to add reward:", error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsloading(false);
    }
  };

  const claimBadge = async () => {
    if (!isConnected) {
      setBadgeStatus("Please connect your wallet to claim the badge.");
      return;
    }

    setBadgeStatus("Creating certificate and claiming badge...");

    try {
      const result = await claimBadgeWithCertificate({
        userAddress: userAddress as `0x${string}`,
        name: "Rama",
        course: badge,
        date: new Date().toISOString().split("T")[0],
      });

      if (result && typeof result === "object" && "tokenId" in result) {
        const tokenIdStr =
          typeof result.tokenId === "bigint" ? result.tokenId.toString() : String(result.tokenId);
        setBadgeStatus(`Badge claimed successfully! Token ID: ${tokenIdStr}`);
      } else if (typeof result === "string") {
        setBadgeStatus(`Error: ${result}`);
      } else {
        setBadgeStatus("Unknown error occurred while claiming badge.");
      }
    } catch (error: any) {
      console.error("Failed to claim badge:", error);
      setBadgeStatus(`Error: ${error.message}`);
    }
  };

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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations! 🎉</h2>
          <p className="text-gray-600">You've successfully completed the quiz!</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-[#FFFFFF] bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <Coins className="w-6 h-6 text-[#58CC02] mr-2" />
              <span className="text-2xl font-bold text-[#58CC02]">+{tokens}</span>
            </div>
            <div className="space-y-2">
              <button
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50"
                onClick={() => claimToken()}
              >
                {isLoading ? "Claiming..." : "Claim Credits"}
              </button>
              {status && <p className="text-sm text-gray-600">{status}</p>}
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F61] to-[#4E6C50] rounded-lg p-4 text-white">
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-semibold">{badge}</div>
            <div className="text-sm opacity-90">Achievement Badge</div>
            <div className="mt-3">
              <button
                disabled={isLoading}
                className="w-full bg-white text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 disabled:opacity-50"
                onClick={claimBadge}
              >
                Claim Badge & Certificate
              </button>
              {badgeStatus && <p className="text-sm mt-2 opacity-90">{badgeStatus}</p>}
            </div>
          </div>
        </div>

        <button onClick={onClose} className="w-full btn-primary">
          Continue Learning
        </button>
      </div>
    </div>
  );
}
