import Link from 'next/link';
import { BookOpen, Github, Twitter, Disc as Discord } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#58CC02] rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Digital Campus</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering the next generation of blockchain developers and Web3 enthusiasts 
              through innovative education and hands-on learning experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#58CC02] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#58CC02] transition-colors">
                <Discord className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#58CC02] transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/courses" className="text-gray-400 hover:text-[#58CC02] transition-colors">Courses</Link></li>
              <li><Link href="/quiz" className="text-gray-400 hover:text-[#58CC02] transition-colors">Quiz</Link></li>
              <li><Link href="/leaderboard" className="text-gray-400 hover:text-[#58CC02] transition-colors">Leaderboard</Link></li>
              <li><Link href="/profile" className="text-gray-400 hover:text-[#58CC02] transition-colors">Profile</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-[#58CC02] transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#58CC02] transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-[#58CC02] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-[#58CC02] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Digital Campus. All rights reserved. Built with ❤️ for the Web3 community.
          </p>
        </div>
      </div>
    </footer>
  );
}