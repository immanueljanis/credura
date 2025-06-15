"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CourseCard } from "@/components/courses/CourseCard";
import { Search, Filter, BookOpen } from "lucide-react";

const COURSES = [
  {
    id: "1",
    title: "Blockchain Fundamentals",
    description:
      "Master the basics of blockchain technology and cryptocurrency. Learn about consensus mechanisms, mining, and the underlying principles.",
    instructor: "Dr. Sarah Chen",
    duration: "6 weeks",
    level: "Beginner",
    students: 1245,
    rating: 4.8,
    price: 0.05,
    image:
      "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Blockchain", "Cryptocurrency", "DeFi"],
    category: "Fundamentals",
  },
  {
    id: "2",
    title: "Smart Contract Development",
    description:
      "Learn to build and deploy smart contracts on Ethereum using Solidity programming language and development frameworks.",
    instructor: "Prof. Michael Rodriguez",
    duration: "8 weeks",
    level: "Intermediate",
    students: 892,
    rating: 4.9,
    price: 0.08,
    image:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Solidity", "Ethereum", "Web3"],
    category: "Development",
  },
  {
    id: "3",
    title: "DeFi Protocol Design",
    description:
      "Advanced concepts in decentralized finance and protocol design. Build your own DeFi applications from scratch.",
    instructor: "Alex Thompson",
    duration: "10 weeks",
    level: "Advanced",
    students: 567,
    rating: 4.7,
    price: 0.12,
    image:
      "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["DeFi", "Protocols", "Advanced"],
    category: "Finance",
  },
  {
    id: "4",
    title: "NFT Marketplace Development",
    description:
      "Build your own NFT marketplace from scratch using React, Web3.js, and smart contracts.",
    instructor: "Emma Watson",
    duration: "7 weeks",
    level: "Intermediate",
    students: 734,
    rating: 4.6,
    price: 0.09,
    image:
      "https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["NFT", "Marketplace", "React"],
    category: "Development",
  },
  {
    id: "5",
    title: "Cryptocurrency Trading",
    description:
      "Learn technical analysis, risk management, and trading strategies for cryptocurrency markets.",
    instructor: "David Kim",
    duration: "5 weeks",
    level: "Beginner",
    students: 923,
    rating: 4.5,
    price: 0.06,
    image:
      "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Trading", "Analysis", "Markets"],
    category: "Finance",
  },
  {
    id: "6",
    title: "Web3 Full-Stack Development",
    description:
      "Complete full-stack development course covering frontend, backend, and blockchain integration.",
    instructor: "Maria Garcia",
    duration: "12 weeks",
    level: "Advanced",
    students: 445,
    rating: 4.9,
    price: 0.15,
    image:
      "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Full-Stack", "React", "Node.js"],
    category: "Development",
  },
];

export default function CoursesPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userTokens, setUserTokens] = useState(150);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = ["All", "Fundamentals", "Development", "Finance"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Courses</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master blockchain technology with our comprehensive courses taught by industry experts
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#58CC02] focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#58CC02] focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#58CC02] focus:border-transparent"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredCourses.length} of {COURSES.length} courses
            </p>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} isWalletConnected={isWalletConnected} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
