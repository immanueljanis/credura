"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Play,
  Clock,
  Users,
  Star,
  CheckCircle,
  Lock,
  BookOpen,
  Trophy,
  ArrowLeft,
  Download,
  MessageCircle,
  Share2,
  Heart,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useAccount } from "wagmi";

const COURSES_DATA = {
  "1": {
    id: "1",
    title: "Blockchain Fundamentals",
    description:
      "Master the basics of blockchain technology and cryptocurrency. Learn about consensus mechanisms, mining, and the underlying principles that power the decentralized web.",
    instructor: "Dr. Sarah Chen",
    instructorBio: "Former blockchain researcher at MIT with 10+ years in distributed systems",
    instructorAvatar: "👩‍💼",
    duration: "6 weeks",
    level: "Beginner",
    students: 1245,
    rating: 4.8,
    reviews: 324,
    price: 0.05,
    image:
      "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Blockchain", "Cryptocurrency", "DeFi"],
    category: "Fundamentals",
    totalLessons: 24,
    completedLessons: 0,
    estimatedHours: 18,
    certificate: true,
    language: "English",
    lastUpdated: "2024-12-01",
    whatYouWillLearn: [
      "Understand blockchain technology fundamentals",
      "Learn about different consensus mechanisms",
      "Explore cryptocurrency and digital assets",
      "Understand smart contracts basics",
      "Learn about DeFi protocols",
      "Build your first blockchain application",
    ],
    requirements: [
      "Basic computer literacy",
      "No prior blockchain experience needed",
      "Willingness to learn new concepts",
    ],
    curriculum: [
      {
        id: 1,
        title: "Introduction to Blockchain",
        description: "Get started with blockchain fundamentals and core concepts",
        duration: "2 hours",
        lessons: [
          {
            id: 1,
            title: "What is Blockchain?",
            duration: "15 min",
            type: "video",
            completed: false,
            description: "Learn the basic definition and purpose of blockchain technology",
          },
          {
            id: 2,
            title: "History of Blockchain",
            duration: "12 min",
            type: "video",
            completed: false,
            description: "Explore the evolution from Bitcoin to modern blockchain applications",
          },
          {
            id: 3,
            title: "Key Concepts Quiz",
            duration: "10 min",
            type: "quiz",
            completed: false,
            description: "Test your understanding of fundamental blockchain concepts",
          },
          {
            id: 4,
            title: "Blockchain vs Traditional Databases",
            duration: "18 min",
            type: "video",
            completed: false,
            description: "Compare blockchain with traditional database systems",
          },
        ],
      },
      {
        id: 2,
        title: "Cryptography Basics",
        description: "Understanding the cryptographic foundations of blockchain",
        duration: "3 hours",
        lessons: [
          {
            id: 5,
            title: "Hash Functions",
            duration: "20 min",
            type: "video",
            completed: false,
            description: "Learn about SHA-256 and other cryptographic hash functions",
          },
          {
            id: 6,
            title: "Digital Signatures",
            duration: "18 min",
            type: "video",
            completed: false,
            description: "Understand how digital signatures provide authentication",
          },
          {
            id: 7,
            title: "Merkle Trees",
            duration: "15 min",
            type: "video",
            completed: false,
            description: "Explore how Merkle trees enable efficient verification",
          },
          {
            id: 8,
            title: "Public Key Cryptography",
            duration: "22 min",
            type: "video",
            completed: false,
            description: "Master asymmetric encryption and key pairs",
          },
          {
            id: 9,
            title: "Cryptography Practice",
            duration: "25 min",
            type: "assignment",
            completed: false,
            description: "Hands-on exercises with cryptographic functions",
          },
        ],
      },
      {
        id: 3,
        title: "Consensus Mechanisms",
        description: "Deep dive into how blockchain networks reach agreement",
        duration: "2.5 hours",
        lessons: [
          {
            id: 10,
            title: "Proof of Work Explained",
            duration: "22 min",
            type: "video",
            completed: false,
            description: "Understand Bitcoin's consensus mechanism",
          },
          {
            id: 11,
            title: "Proof of Stake Deep Dive",
            duration: "20 min",
            type: "video",
            completed: false,
            description: "Learn about Ethereum 2.0's consensus model",
          },
          {
            id: 12,
            title: "Other Consensus Algorithms",
            duration: "18 min",
            type: "video",
            completed: false,
            description: "Explore DPoS, PBFT, and other consensus methods",
          },
          {
            id: 13,
            title: "Consensus Comparison Quiz",
            duration: "15 min",
            type: "quiz",
            completed: false,
            description: "Compare different consensus mechanisms",
          },
        ],
      },
      {
        id: 4,
        title: "Smart Contracts Introduction",
        description: "Introduction to programmable blockchain applications",
        duration: "2 hours",
        lessons: [
          {
            id: 14,
            title: "What are Smart Contracts?",
            duration: "16 min",
            type: "video",
            completed: false,
            description: "Learn the basics of self-executing contracts",
          },
          {
            id: 15,
            title: "Ethereum Virtual Machine",
            duration: "20 min",
            type: "video",
            completed: false,
            description: "Understand how smart contracts execute on Ethereum",
          },
          {
            id: 16,
            title: "Smart Contract Use Cases",
            duration: "18 min",
            type: "video",
            completed: false,
            description: "Explore real-world applications of smart contracts",
          },
          {
            id: 17,
            title: "Smart Contracts Quiz",
            duration: "12 min",
            type: "quiz",
            completed: false,
            description: "Test your smart contract knowledge",
          },
        ],
      },
    ],
  },
  "2": {
    id: "2",
    title: "Smart Contract Development",
    description:
      "Learn to build and deploy smart contracts on Ethereum using Solidity programming language and development frameworks.",
    instructor: "Prof. Michael Rodriguez",
    instructorBio: "Full-stack developer specializing in Web3 and smart contract development",
    instructorAvatar: "👨‍💻",
    duration: "8 weeks",
    level: "Intermediate",
    students: 892,
    rating: 4.9,
    reviews: 156,
    price: 0.08,
    image:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Solidity", "Ethereum", "Web3"],
    category: "Development",
    totalLessons: 32,
    completedLessons: 0,
    estimatedHours: 28,
    certificate: true,
    language: "English",
    lastUpdated: "2024-11-28",
    whatYouWillLearn: [
      "Master Solidity programming language",
      "Build and deploy smart contracts",
      "Understand Ethereum Virtual Machine",
      "Learn testing and debugging techniques",
      "Explore DeFi protocol development",
      "Build a complete DApp project",
    ],
    requirements: [
      "Basic programming experience",
      "Understanding of blockchain fundamentals",
      "Familiarity with JavaScript (helpful)",
    ],
    curriculum: [
      {
        id: 1,
        title: "Solidity Fundamentals",
        description: "Master the basics of Solidity programming language",
        duration: "4 hours",
        lessons: [
          {
            id: 1,
            title: "Introduction to Solidity",
            duration: "18 min",
            type: "video",
            completed: false,
            description: "Get started with Solidity syntax and structure",
          },
          {
            id: 2,
            title: "Data Types and Variables",
            duration: "22 min",
            type: "video",
            completed: false,
            description: "Learn about Solidity data types and variable declarations",
          },
          {
            id: 3,
            title: "Functions and Modifiers",
            duration: "25 min",
            type: "video",
            completed: false,
            description: "Understand function syntax and access modifiers",
          },
          {
            id: 4,
            title: "Control Structures",
            duration: "20 min",
            type: "video",
            completed: false,
            description: "Master loops, conditionals, and control flow",
          },
          {
            id: 5,
            title: "Solidity Basics Quiz",
            duration: "15 min",
            type: "quiz",
            completed: false,
            description: "Test your Solidity fundamentals knowledge",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Solidity Concepts",
        description: "Deep dive into advanced Solidity programming patterns",
        duration: "5 hours",
        lessons: [
          {
            id: 6,
            title: "Inheritance and Interfaces",
            duration: "28 min",
            type: "video",
            completed: false,
            description: "Learn object-oriented programming in Solidity",
          },
          {
            id: 7,
            title: "Events and Logging",
            duration: "20 min",
            type: "video",
            completed: false,
            description: "Understand how to emit and listen to events",
          },
          {
            id: 8,
            title: "Error Handling",
            duration: "18 min",
            type: "video",
            completed: false,
            description: "Master require, assert, and revert statements",
          },
          {
            id: 9,
            title: "Gas Optimization",
            duration: "25 min",
            type: "video",
            completed: false,
            description: "Learn techniques to optimize gas usage",
          },
          {
            id: 10,
            title: "Advanced Patterns Assignment",
            duration: "30 min",
            type: "assignment",
            completed: false,
            description: "Build a contract using advanced Solidity patterns",
          },
        ],
      },
    ],
  },
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const course = COURSES_DATA[courseId as keyof typeof COURSES_DATA];

  const { isConnected } = useAccount();

  const [userTokens, setUserTokens] = useState(150);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isWalletConnected={isConnected} userTokens={userTokens} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
            <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
            <Link href="/courses" className="btn-primary">
              Back to Courses
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleEnroll = () => {
    if (isConnected) {
      setIsEnrolled(true);

      console.log("Enrolling in course:", course.id);
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />;
      case "quiz":
        return <Trophy className="w-4 h-4" />;
      case "assignment":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "text-blue-600";
      case "quiz":
        return "text-yellow-600";
      case "assignment":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const progress = Math.round((course.completedLessons / course.totalLessons) * 100);

  function setIsWalletConnected(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isWalletConnected={isConnected} userTokens={userTokens} />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="inline-flex items-center text-gray-600 hover:text-[#58CC02] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card mb-8">
                <div className="relative mb-6">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                    <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                      <Play className="w-6 h-6 text-gray-800 ml-1" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">{course.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#58CC02] bg-opacity-10 rounded-lg mx-auto mb-2">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold text-gray-900">{course.duration}</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#FF6F61] bg-opacity-10 rounded-lg mx-auto mb-2">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm text-gray-600">Students</div>
                    <div className="font-semibold text-gray-900">
                      {course.students.toLocaleString()}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#4E6C50] bg-opacity-10 rounded-lg mx-auto mb-2">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm text-gray-600">Lessons</div>
                    <div className="font-semibold text-gray-900">{course.totalLessons}</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#58CC02] bg-opacity-10 rounded-lg mx-auto mb-2">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                    <div className="font-semibold text-gray-900">{course.rating}</div>
                  </div>
                </div>

                {isEnrolled && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Course Progress</span>
                      <span className="text-sm text-gray-600">{progress}% Complete</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="card">
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8">
                    {[
                      { id: "overview", label: "Overview" },
                      { id: "curriculum", label: "Curriculum" },
                      { id: "instructor", label: "Instructor" },
                      { id: "reviews", label: "Reviews" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`cursor-pointer py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? "border-[#58CC02] text-[#58CC02]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {activeTab === "overview" && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        What You'll Learn
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-[#58CC02] mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-[#58CC02] rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="space-y-4">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Course Curriculum
                      </h3>
                      <p className="text-gray-600">
                        {course.curriculum.length} modules • {course.totalLessons} lessons •{" "}
                        {course.estimatedHours} hours total
                      </p>
                    </div>

                    {course.curriculum.map((module) => (
                      <div
                        key={module.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setExpandedModule(expandedModule === module.id ? null : module.id)
                          }
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <div className="mr-4">
                              {expandedModule === module.id ? (
                                <ChevronDown className="w-5 h-5 text-gray-600" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 text-lg">
                                Module {module.id}: {module.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                              <div className="flex items-center mt-2 text-sm text-gray-500">
                                <span>{module.lessons.length} lessons</span>
                                <span className="mx-2">•</span>
                                <span>{module.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-[#58CC02] font-medium">
                            {expandedModule === module.id ? "Collapse" : "Expand"}
                          </div>
                        </button>

                        {expandedModule === module.id && (
                          <div className="border-t border-gray-200 bg-gray-50">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lesson.id}
                                className="px-6 py-4 border-b border-gray-200 last:border-b-0 hover:bg-white transition-colors"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center flex-1">
                                    <div className="mr-4 text-gray-400 font-medium text-sm">
                                      {lessonIndex + 1}
                                    </div>
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                                        lesson.completed
                                          ? "bg-[#58CC02] text-white"
                                          : isEnrolled
                                          ? "bg-gray-200 text-gray-600 hover:bg-[#58CC02] hover:text-white cursor-pointer"
                                          : "bg-gray-100 text-gray-400"
                                      }`}
                                    >
                                      {lesson.completed ? (
                                        <CheckCircle className="w-4 h-4" />
                                      ) : (
                                        <div className={getLessonTypeColor(lesson.type)}>
                                          {getLessonIcon(lesson.type)}
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <h5 className="font-medium text-gray-900">
                                          {lesson.title}
                                        </h5>
                                        <div className="flex items-center space-x-3">
                                          <span className="text-sm text-gray-500">
                                            {lesson.duration}
                                          </span>
                                          {!isEnrolled && (
                                            <Lock className="w-4 h-4 text-gray-400" />
                                          )}
                                        </div>
                                      </div>
                                      <p className="text-sm text-gray-600 mt-1">
                                        {lesson.description}
                                      </p>
                                      <div className="flex items-center mt-2">
                                        <span
                                          className={`text-xs px-2 py-1 rounded-full ${
                                            lesson.type === "video"
                                              ? "bg-blue-100 text-blue-700"
                                              : lesson.type === "quiz"
                                              ? "bg-yellow-100 text-yellow-700"
                                              : "bg-green-100 text-green-700"
                                          }`}
                                        >
                                          {lesson.type.charAt(0).toUpperCase() +
                                            lesson.type.slice(1)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "instructor" && (
                  <div className="flex items-start space-x-6">
                    <div className="text-6xl">{course.instructorAvatar}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {course.instructor}
                      </h3>
                      <p className="text-gray-600 mb-4">{course.instructorBio}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          {course.rating} rating
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students.toLocaleString()} students
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Student Reviews</h3>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 mr-1" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-gray-600 ml-2">({course.reviews} reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {[
                        {
                          name: "Alex Johnson",
                          rating: 5,
                          comment: "Excellent course! Very comprehensive and well-structured.",
                          date: "2 weeks ago",
                        },
                        {
                          name: "Sarah Kim",
                          rating: 4,
                          comment: "Great content, learned a lot about blockchain fundamentals.",
                          date: "1 month ago",
                        },
                        {
                          name: "Mike Chen",
                          rating: 5,
                          comment:
                            "Perfect for beginners. The instructor explains everything clearly.",
                          date: "1 month ago",
                        },
                      ].map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-gray-900">{review.name}</div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{review.comment}</p>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="card">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{course.price} MON</div>
                  <div className="text-gray-600">One-time payment</div>
                </div>

                {isEnrolled ? (
                  <div className="space-y-4">
                    <div className="bg-[#58CC02] bg-opacity-10 border border-[#58CC02] rounded-lg p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-white mx-auto mb-2" />
                      <div className="font-semibold text-white">You're enrolled!</div>
                    </div>
                    <button className="w-full btn-primary">Continue Learning</button>
                  </div>
                ) : isConnected ? (
                  <button onClick={handleEnroll} className="w-full btn-primary mb-4">
                    Enroll Now
                  </button>
                ) : (
                  <button
                    onClick={() => setIsWalletConnected(true)}
                    className="w-full btn-primary mb-4"
                  >
                    Connect Wallet to Enroll
                  </button>
                )}

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Full lifetime access</span>
                    <CheckCircle className="w-4 h-4 text-[#58CC02]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Certificate of completion</span>
                    <CheckCircle className="w-4 h-4 text-[#58CC02]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Mobile and desktop access</span>
                    <CheckCircle className="w-4 h-4 text-[#58CC02]" />
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 mt-6 pt-6 border-t border-gray-200">
                  <button className="p-2 text-gray-400 hover:text-[#58CC02] transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-[#58CC02] transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-[#58CC02] transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Course Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lessons</span>
                    <span className="font-medium">{course.totalLessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language</span>
                    <span className="font-medium">{course.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium">
                      {new Date(course.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Related Courses</h3>
                <div className="space-y-4">
                  {[
                    { title: "Advanced Blockchain", price: "0.08 ETH", rating: 4.7 },
                    { title: "DeFi Fundamentals", price: "0.06 ETH", rating: 4.9 },
                  ].map((related, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900">{related.title}</div>
                        <div className="text-xs text-gray-600">{related.price}</div>
                        <div className="flex items-center text-xs">
                          <Star className="w-3 h-3 text-yellow-400 mr-1" />
                          {related.rating}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
