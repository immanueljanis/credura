"use client";

import { Clock, Users, Trophy, Target, Lock } from "lucide-react";
import { QuizDialogComponent } from "./QuizModal";

const quizs = [
  [
    {
      id: 1,
      question: "What is a blockchain?",
      options: [
        "A type of social media network",
        "A centralized database",
        "A distributed and immutable ledger",
        "A gaming platform",
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "Which of the following best describes decentralization?",
      options: [
        "Control by a single authority",
        "Power distributed among multiple nodes or participants",
        "One company storing all the data",
        "Use of traditional banking",
      ],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "What is a block composed of?",
      options: [
        "Only smart contracts",
        "Unstructured data",
        "A group of verified transactions and metadata",
        "Encrypted user passwords",
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "Who can add a new block to the Bitcoin blockchain?",
      options: [
        "Any user with internet access",
        "Miners who solve a cryptographic puzzle",
        "Only Satoshi Nakamoto",
        "Government authorities",
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      question: "What makes blockchain tamper-resistant?",
      options: [
        "Its use of XML format",
        "Its peer-to-peer structure and hashing mechanisms",
        "Storing data in Microsoft Excel",
        "Encryption alone",
      ],
      correctAnswer: 1,
    },
    {
      id: 6,
      question: "What does the term 'public ledger' mean in blockchain?",
      options: [
        "Only banks can read it",
        "Everyone can view and verify transactions",
        "Only miners access it",
        "It is stored in a physical ledger book",
      ],
      correctAnswer: 1,
    },
    {
      id: 7,
      question: "What is a hash function used for in blockchain?",
      options: [
        "Generating new coins",
        "Identifying users",
        "Creating unique fixed-size outputs from input data",
        "Adding encryption to emails",
      ],
      correctAnswer: 2,
    },
    {
      id: 8,
      question: "What is a 51% attack?",
      options: [
        "A physical attack on blockchain servers",
        "An exploit when a single miner controls over 50% of the network's hash rate",
        "A virus infecting a blockchain",
        "A software bug",
      ],
      correctAnswer: 1,
    },
    {
      id: 9,
      question: "Which of these is a popular public blockchain?",
      options: ["Amazon Web Services", "MySQL", "Ethereum", "Oracle DB"],
      correctAnswer: 2,
    },
    {
      id: 10,
      question: "What is the incentive for miners in most blockchain networks?",
      options: [
        "Public recognition",
        "Hardware upgrades",
        "Rewards in cryptocurrency",
        "Free cloud storage",
      ],
      correctAnswer: 2,
    },
  ],
  [
    {
      id: 11,
      question: "What is a smart contract?",
      options: [
        "A digital copy of a legal document",
        "A self-executing contract with the terms directly written into code",
        "A chatbot agreement",
        "A hardware wallet feature",
      ],
      correctAnswer: 1,
    },
    {
      id: 12,
      question: "In Solidity, what is 'msg.sender'?",
      options: [
        "The name of the smart contract",
        "The current block miner",
        "The address that called the function",
        "The timestamp of the transaction",
      ],
      correctAnswer: 2,
    },
    {
      id: 13,
      question:
        "Which vulnerability allows attackers to call a fallback function repeatedly?",
      options: [
        "Time manipulation",
        "Overflow",
        "Reentrancy",
        "Block spamming",
      ],
      correctAnswer: 2,
    },
    {
      id: 14,
      question: "How can developers prevent reentrancy attacks?",
      options: [
        "Increase gas fees",
        "Call external contracts last and use mutex or reentrancy guards",
        "Disable all external calls",
        "Use only proof-of-work blockchains",
      ],
      correctAnswer: 1,
    },
    {
      id: 15,
      question: "What is gas in Ethereum smart contracts?",
      options: [
        "A fuel used in hardware wallets",
        "A cryptocurrency",
        "A fee paid for computation and storage",
        "A type of coin-mining technique",
      ],
      correctAnswer: 2,
    },
    {
      id: 16,
      question: "What is the purpose of 'view' functions in Solidity?",
      options: [
        "To modify blockchain state",
        "To execute external transactions",
        "To read data without modifying the state",
        "To set variables",
      ],
      correctAnswer: 2,
    },
    {
      id: 17,
      question: "What is an event in Solidity?",
      options: [
        "A scheduled meeting",
        "An external transaction call",
        "A logging mechanism to record blockchain activity",
        "A block timestamp",
      ],
      correctAnswer: 2,
    },
    {
      id: 18,
      question: "Which function type in Solidity allows sending Ether?",
      options: ["View", "Pure", "Constructor", "Payable"],
      correctAnswer: 3,
    },
    {
      id: 19,
      question: "Why are smart contracts immutable after deployment?",
      options: [
        "To allow easy editing by developers",
        "Due to the decentralized nature of blockchains",
        "Because they are saved in text format",
        "Because they are open source",
      ],
      correctAnswer: 1,
    },
    {
      id: 20,
      question: "What is OpenZeppelin in the context of smart contracts?",
      options: [
        "A testnet",
        "An NFT marketplace",
        "A secure smart contract library and framework",
        "A layer-2 solution",
      ],
      correctAnswer: 2,
    },
  ],
  [
    {
      id: 21,
      question: "What does DeFi stand for?",
      options: [
        "Decentralized Finance",
        "Defined Financials",
        "Default Finder",
        "Digital Fundraising",
      ],
      correctAnswer: 0,
    },
    {
      id: 22,
      question: "What is the role of a liquidity pool in DeFi?",
      options: [
        "To store NFTs",
        "To create smart contracts",
        "To provide token reserves for trading",
        "To mine Bitcoin",
      ],
      correctAnswer: 2,
    },
    {
      id: 23,
      question:
        "Which platform is known for yield farming and liquidity mining?",
      options: ["YouTube", "Compound", "Spotify", "Facebook"],
      correctAnswer: 1,
    },
    {
      id: 24,
      question:
        "Which DeFi platform is known for stablecoin-based lending and borrowing?",
      options: ["Uniswap", "MakerDAO", "Solana", "Polkadot"],
      correctAnswer: 1,
    },
    {
      id: 25,
      question: "What is a governance token?",
      options: [
        "A token that allows voting on protocol changes",
        "A token used only for payments",
        "A centralized asset",
        "A stablecoin",
      ],
      correctAnswer: 0,
    },
    {
      id: 26,
      question: "What is impermanent loss in DeFi?",
      options: [
        "The loss of seed phrase",
        "A hacker stealing funds",
        "Loss caused by volatility in liquidity pools compared to holding assets",
        "An oracle error",
      ],
      correctAnswer: 2,
    },
    {
      id: 27,
      question: "Which of the following is an automated market maker (AMM)?",
      options: ["Compound", "Uniswap", "Aave", "Coinbase"],
      correctAnswer: 1,
    },
    {
      id: 28,
      question: "What does TVL (Total Value Locked) represent?",
      options: [
        "Number of NFTs minted",
        "Volume of gas used",
        "Total value of assets held in a DeFi protocol",
        "Token valuation in fiat",
      ],
      correctAnswer: 2,
    },
    {
      id: 29,
      question:
        "Which DeFi lending protocol uses interest-bearing tokens like cDAI?",
      options: ["Uniswap", "Curve", "Compound", "Balancer"],
      correctAnswer: 2,
    },
  ],
] as const;

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: number;
  difficulty: string;
  reward: number;
  badge: string;
  category: string;
  attempts: number;
  successRate: number;
}

interface QuizCardProps {
  quiz: Quiz;
  isWalletConnected: boolean;
  onComplete: (reward: { tokens: number; badge: string }) => void;
}

export function QuizCard({
  quiz,
  isWalletConnected,
  onComplete,
}: QuizCardProps) {
  const handleStartQuiz = () => {
    console.log("hhh");
    onComplete({
      tokens: quiz.reward,
      badge: quiz.badge,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="card group hover:scale-105 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
            quiz.difficulty
          )}`}
        >
          {quiz.difficulty}
        </span>
        <div className="text-right">
          <div className="text-lg font-bold text-[#58CC02]">+{quiz.reward}</div>
          <div className="text-xs text-gray-500">tokens</div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {quiz.title}
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {quiz.description}
      </p>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-1" />
            {quiz.questions} questions
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {quiz.duration} min
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {quiz.attempts.toLocaleString()} attempts
          </div>
          <div className="flex items-center">
            <Trophy className="w-4 h-4 mr-1" />
            {quiz.successRate}% success
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Badge Reward:</div>
        <div className="bg-gradient-to-r from-[#FF6F61] to-[#4E6C50] text-white px-3 py-2 rounded-lg text-sm font-medium text-center">
          🏆 {quiz.badge}
        </div>
      </div>

      {isWalletConnected ? (
        <QuizDialogComponent
          questions={quizs[+quiz.id - 1] as never}
          onQuizAnswered={handleStartQuiz}
          triggerText="Start Quiz"
        />
      ) : (
        <button className="w-full bg-gray-200 text-gray-500 font-medium px-6 py-3 rounded-lg cursor-not-allowed flex items-center justify-center">
          <Lock className="w-4 h-4 mr-2" />
          Connect Wallet
        </button>
      )}
    </div>
  );
}
