'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/components/courses/CourseCard';
import { StatsSection } from '@/components/home/StatsSection';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';

const SAMPLE_COURSES = [
  {
    id: '1',
    title: 'Blockchain Fundamentals',
    description: 'Master the basics of blockchain technology and cryptocurrency',
    instructor: 'Dr. Sarah Chen',
    duration: '6 weeks',
    level: 'Beginner',
    students: 1245,
    rating: 4.8,
    price: 0.05,
    image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Blockchain', 'Cryptocurrency', 'DeFi']
  },
  {
    id: '2',
    title: 'Smart Contract Development',
    description: 'Learn to build and deploy smart contracts on Ethereum',
    instructor: 'Prof. Michael Rodriguez',
    duration: '8 weeks',
    level: 'Intermediate',
    students: 892,
    rating: 4.9,
    price: 0.08,
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['Solidity', 'Ethereum', 'Web3']
  },
  {
    id: '3',
    title: 'DeFi Protocol Design',
    description: 'Advanced concepts in decentralized finance and protocol design',
    instructor: 'Alex Thompson',
    duration: '10 weeks',
    level: 'Advanced',
    students: 567,
    rating: 4.7,
    price: 0.12,
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['DeFi', 'Protocols', 'Advanced']
  },
  {
    id: '4',
    title: 'NFT Marketplace Development',
    description: 'Build your own NFT marketplace from scratch',
    instructor: 'Emma Watson',
    duration: '7 weeks',
    level: 'Intermediate',
    students: 734,
    rating: 4.6,
    price: 0.09,
    image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['NFT', 'Marketplace', 'React']
  }
];

export default function HomePage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userTokens, setUserTokens] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <Header
        isWalletConnected={isWalletConnected}
        userTokens={userTokens}
        onWalletConnect={() => setIsWalletConnected(true)}
      />

      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />

        {/* Courses Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured Courses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Master blockchain technology with our comprehensive courses taught by industry experts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* {SAMPLE_COURSES.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  isWalletConnected={isWalletConnected}
                />
              ))} */}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}