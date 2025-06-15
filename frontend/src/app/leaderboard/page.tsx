"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Trophy, Medal, Crown, Star, TrendingUp, Users, Award, Filter } from "lucide-react";

const LEADERBOARD_DATA = [
  {
    rank: 1,
    address: "0x1234...5678",
    username: "CryptoMaster",
    totalTokens: 15750,
    coursesCompleted: 12,
    quizzesPassed: 28,
    badges: 15,
    level: "Blockchain Expert",
    avatar: "🏆",
    streak: 45,
    joinDate: "2024-01-15",
  },
  {
    rank: 2,
    address: "0x5678...9012",
    username: "Web3Wizard",
    totalTokens: 14200,
    coursesCompleted: 11,
    quizzesPassed: 25,
    badges: 13,
    level: "DeFi Specialist",
    avatar: "🥈",
    streak: 38,
    joinDate: "2024-02-03",
  },
  {
    rank: 3,
    address: "0x9012...3456",
    username: "SmartContractPro",
    totalTokens: 13850,
    coursesCompleted: 10,
    quizzesPassed: 24,
    badges: 12,
    level: "Smart Contract Expert",
    avatar: "🥉",
    streak: 32,
    joinDate: "2024-01-28",
  },
  {
    rank: 4,
    address: "0x3456...7890",
    username: "BlockchainBuilder",
    totalTokens: 12500,
    coursesCompleted: 9,
    quizzesPassed: 22,
    badges: 11,
    level: "Advanced Learner",
    avatar: "⭐",
    streak: 28,
    joinDate: "2024-03-10",
  },
  {
    rank: 5,
    address: "0x7890...1234",
    username: "DeFiExplorer",
    totalTokens: 11800,
    coursesCompleted: 8,
    quizzesPassed: 20,
    badges: 10,
    level: "Intermediate",
    avatar: "🌟",
    streak: 25,
    joinDate: "2024-02-20",
  },
];

const ADDITIONAL_USERS = Array.from({ length: 15 }, (_, i) => ({
  rank: i + 6,
  address: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random()
    .toString(16)
    .substr(2, 4)}`,
  username: `User${i + 6}`,
  totalTokens: Math.floor(Math.random() * 10000) + 1000,
  coursesCompleted: Math.floor(Math.random() * 8) + 1,
  quizzesPassed: Math.floor(Math.random() * 20) + 5,
  badges: Math.floor(Math.random() * 10) + 1,
  level: ["Beginner", "Intermediate", "Advanced Learner"][Math.floor(Math.random() * 3)],
  avatar: ["🎓", "📚", "💎", "🚀", "⚡"][Math.floor(Math.random() * 5)],
  streak: Math.floor(Math.random() * 30) + 1,
  joinDate: "2024-03-15",
}));

const ALL_USERS = [...LEADERBOARD_DATA, ...ADDITIONAL_USERS];

export default function LeaderboardPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [userTokens, setUserTokens] = useState(2750);
  const [timeFilter, setTimeFilter] = useState("all-time");
  const [categoryFilter, setCategoryFilter] = useState("tokens");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    if (rank <= 10) return "bg-gradient-to-r from-[#58CC02] to-[#4E6C50] text-white";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isWalletConnected={isWalletConnected}
        userTokens={userTokens}
        onWalletConnect={() => setIsWalletConnected(true)}
      />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#58CC02] to-[#4E6C50] rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Digital Campus Leaderboard</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compete with fellow learners and climb the ranks! Earn tokens, complete courses, and
              showcase your blockchain expertise.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">🏆 Top Performers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="order-1 md:order-1">
                <div className="card text-center p-6 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300">
                  <div className="text-4xl mb-3">🥈</div>
                  <div className="text-6xl mb-3">{LEADERBOARD_DATA[1].avatar}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {LEADERBOARD_DATA[1].username}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{LEADERBOARD_DATA[1].level}</p>
                  <div className="text-2xl font-bold text-[#58CC02] mb-2">
                    {LEADERBOARD_DATA[1].totalTokens.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Campus Credits</div>
                </div>
              </div>

              <div className="order-2 md:order-2 transform md:scale-110">
                <div className="card text-center p-6 bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400">
                  <div className="text-4xl mb-3">👑</div>
                  <div className="text-6xl mb-3">{LEADERBOARD_DATA[0].avatar}</div>
                  <h3 className="font-bold text-xl text-gray-900 mb-1">
                    {LEADERBOARD_DATA[0].username}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{LEADERBOARD_DATA[0].level}</p>
                  <div className="text-3xl font-bold text-[#58CC02] mb-2">
                    {LEADERBOARD_DATA[0].totalTokens.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Campus Credits</div>
                </div>
              </div>

              <div className="order-3 md:order-3">
                <div className="card text-center p-6 bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-400">
                  <div className="text-4xl mb-3">🥉</div>
                  <div className="text-6xl mb-3">{LEADERBOARD_DATA[2].avatar}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {LEADERBOARD_DATA[2].username}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{LEADERBOARD_DATA[2].level}</p>
                  <div className="text-2xl font-bold text-[#58CC02] mb-2">
                    {LEADERBOARD_DATA[2].totalTokens.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Campus Credits</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#58CC02] focus:border-transparent"
                >
                  <option value="all-time">All Time</option>
                  <option value="monthly">This Month</option>
                  <option value="weekly">This Week</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#58CC02] focus:border-transparent"
                >
                  <option value="tokens">Total Tokens</option>
                  <option value="courses">Courses Completed</option>
                  <option value="quizzes">Quizzes Passed</option>
                  <option value="badges">Badges Earned</option>
                </select>
              </div>

              <div className="text-sm text-gray-600">Showing top 20 learners</div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-[#58CC02]" />
              Complete Rankings
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tokens
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Courses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quizzes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Badges
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Streak
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ALL_USERS.map((user) => (
                    <tr key={user.rank} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getRankBadge(
                              user.rank
                            )}`}
                          >
                            {getRankIcon(user.rank)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{user.avatar}</div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.username}</div>
                            <div className="text-sm text-gray-500">{user.address}</div>
                            <div className="text-xs text-gray-400">{user.level}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[#58CC02]">
                          {user.totalTokens.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.coursesCompleted}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.quizzesPassed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Award className="w-4 h-4 text-[#FF6F61] mr-1" />
                          <span className="text-sm text-gray-900">{user.badges}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-900">{user.streak} days</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {isWalletConnected && (
            <div className="card mt-8 bg-gradient-to-r from-[#58CC02] to-[#4E6C50] text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Your Current Rank</h3>
                  <div className="flex items-center space-x-6">
                    <div>
                      <div className="text-2xl font-bold">#47</div>
                      <div className="text-sm opacity-90">Global Rank</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{userTokens.toLocaleString()}</div>
                      <div className="text-sm opacity-90">Campus Credits</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-sm opacity-90">Courses Completed</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className="text-sm opacity-90">Keep Learning!</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
