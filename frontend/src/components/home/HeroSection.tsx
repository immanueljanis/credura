'use client';

import { ArrowRight, Play, BookOpen, Users, Trophy } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-white via-green-50 to-blue-50 pt-20 pb-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#58CC02] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#FF6F61] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#4E6C50] rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Learn <span className="text-gradient">Blockchain</span> <br />
              Earn <span className="text-gradient">Rewards</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Master Web3 technologies with our interactive courses, earn crypto rewards, 
              and build your blockchain expertise with hands-on projects and real-world applications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/courses" className="btn-primary inline-flex items-center justify-center">
                Start Learning
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:border-[#58CC02] hover:text-[#58CC02] transition-all duration-200">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-[#58CC02] rounded-lg mb-3 mx-auto">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-[#FF6F61] rounded-lg mb-3 mx-auto">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-[#4E6C50] rounded-lg mb-3 mx-auto">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">500K+</div>
                <div className="text-sm text-gray-600">Rewards</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="animate-slide-up">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#58CC02] rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Smart Contracts 101</div>
                      <div className="text-sm text-gray-500">8 weeks • Intermediate</div>
                    </div>
                  </div>
                  
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '75%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progress: 75%</span>
                    <div className="flex items-center bg-[#58CC02] text-white px-3 py-1 rounded-full text-sm">
                      <Trophy className="w-3 h-3 mr-1" />
                      +50 Credits
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-[#FF6F61] text-white p-3 rounded-lg shadow-lg animate-bounce">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#4E6C50] text-white p-3 rounded-lg shadow-lg">
                <span className="font-bold">+1000 XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}