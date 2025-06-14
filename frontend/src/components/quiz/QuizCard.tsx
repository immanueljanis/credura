'use client';

import { Clock, Users, Trophy, Target, Lock } from 'lucide-react';

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

export function QuizCard({ quiz, isWalletConnected, onComplete }: QuizCardProps) {
  const handleStartQuiz = () => {
    // Simulate quiz completion after a delay
    setTimeout(() => {
      onComplete({
        tokens: quiz.reward,
        badge: quiz.badge
      });
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card group hover:scale-105 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
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
        <button 
          onClick={handleStartQuiz}
          className="w-full btn-primary"
        >
          Start Quiz
        </button>
      ) : (
        <button className="w-full bg-gray-200 text-gray-500 font-medium px-6 py-3 rounded-lg cursor-not-allowed flex items-center justify-center">
          <Lock className="w-4 h-4 mr-2" />
          Connect Wallet
        </button>
      )}
    </div>
  );
}