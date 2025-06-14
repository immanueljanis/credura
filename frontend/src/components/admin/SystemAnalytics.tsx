'use client';

import { BarChart3, TrendingUp, Users, DollarSign, BookOpen, Trophy } from 'lucide-react';

export function SystemAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Analytics</h1>
        <p className="text-gray-600 mt-1">Monitor platform performance and user engagement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="card text-center">
          <Users className="w-8 h-8 text-[#58CC02] mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 mb-1">12,450</div>
          <div className="text-sm text-gray-600">Total Users</div>
          <div className="text-xs text-green-600 mt-1">+12% ↗</div>
        </div>

        <div className="card text-center">
          <BookOpen className="w-8 h-8 text-[#FF6F61] mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 mb-1">58</div>
          <div className="text-sm text-gray-600">Total Courses</div>
          <div className="text-xs text-green-600 mt-1">+5 this month</div>
        </div>

        <div className="card text-center">
          <Trophy className="w-8 h-8 text-[#4E6C50] mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 mb-1">45,230</div>
          <div className="text-sm text-gray-600">Completions</div>
          <div className="text-xs text-green-600 mt-1">+25% ↗</div>
        </div>

        <div className="card text-center">
          <DollarSign className="w-8 h-8 text-[#58CC02] mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 mb-1">2.5M</div>
          <div className="text-sm text-gray-600">Tokens Issued</div>
          <div className="text-xs text-green-600 mt-1">+18% ↗</div>
        </div>

        <div className="card text-center">
          <TrendingUp className="w-8 h-8 text-[#FF6F61] mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 mb-1">94%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
          <div className="text-xs text-green-600 mt-1">+2% ↗</div>
        </div>

        <div className="card text-center">
          <BarChart3 className="w-8 h-8 text-[#4E6C50] mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 mb-1">4.8</div>
          <div className="text-sm text-gray-600">Avg Rating</div>
          <div className="text-xs text-green-600 mt-1">+0.2 ↗</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-[#58CC02]" />
            User Growth
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Chart visualization would be integrated here</p>
              <p className="text-sm">Connect your preferred charting library</p>
            </div>
          </div>
        </div>

        {/* Course Completion Rates */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-[#FF6F61]" />
            Course Completion Rates
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Blockchain Fundamentals</span>
                <span>85%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Smart Contract Development</span>
                <span>78%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>DeFi Protocol Design</span>
                <span>92%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>NFT Marketplace Development</span>
                <span>71%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '71%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Courses */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-[#4E6C50]" />
            Top Performing Courses
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Blockchain Fundamentals', students: 1245, rating: 4.8 },
              { name: 'Smart Contract Development', students: 892, rating: 4.9 },
              { name: 'DeFi Protocol Design', students: 567, rating: 4.7 },
              { name: 'NFT Marketplace Development', students: 734, rating: 4.6 }
            ].map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{course.name}</div>
                  <div className="text-sm text-gray-600">{course.students} students</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-500">
                    <Trophy className="w-4 h-4 mr-1" />
                    {course.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { action: 'New user registered', user: '0x1234...5678', time: '2 min ago' },
              { action: 'Course completed', user: '0x5678...9012', time: '5 min ago' },
              { action: 'Quiz passed', user: '0x9012...3456', time: '8 min ago' },
              { action: 'Tokens earned', user: '0x3456...7890', time: '12 min ago' },
              { action: 'New course enrolled', user: '0x7890...1234', time: '15 min ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                  <div className="text-xs text-gray-600">{activity.user}</div>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}