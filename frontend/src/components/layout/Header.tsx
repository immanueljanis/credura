'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, BookOpen, Trophy, Settings } from 'lucide-react';
// import { ConnectWalletButton } from '@/components/auth/ConnectWalletButton';

interface HeaderProps {
  isWalletConnected: boolean;
  userTokens: number;
  onWalletConnect: () => void;
}

export function Header({ isWalletConnected, userTokens, onWalletConnect }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Courses', href: '/courses' },
    { name: 'Quiz', href: '/quiz' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'About', href: '/about' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#58CC02] rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Digital Campus</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#58CC02] transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isWalletConnected && (
              <div className="hidden sm:flex items-center space-x-4">
                <div className="flex items-center bg-[#58CC02] text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Trophy className="w-4 h-4 mr-1" />
                  {userTokens} Credits
                </div>
                <Link
                  href="/profile"
                  className="p-2 text-gray-700 hover:text-[#58CC02] transition-colors duration-200"
                >
                  <User className="w-5 h-5" />
                </Link>
                <Link
                  href="/admin"
                  className="p-2 text-gray-700 hover:text-[#58CC02] transition-colors duration-200"
                >
                  <Settings className="w-5 h-5" />
                </Link>
              </div>
            )}
            
            {/* <ConnectWalletButton 
              isConnected={isWalletConnected}
              onConnect={onWalletConnect}
            /> */}
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-[#58CC02]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#58CC02] transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isWalletConnected && (
                <>
                  <Link
                    href="/profile"
                    className="text-gray-700 hover:text-[#58CC02] transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/admin"
                    className="text-gray-700 hover:text-[#58CC02] transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}