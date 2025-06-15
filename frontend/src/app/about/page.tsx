"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  BookOpen,
  Users,
  Trophy,
  Shield,
  Zap,
  Globe,
  Target,
  Heart,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import { useAccount } from "wagmi";

const TEAM_MEMBERS = [
  {
    name: "Adzikri Fauzi Shiddiq",
    role: "Full Stack Developer",
    bio: "Former blockchain researcher at MIT with 10+ years in distributed systems",
    image: "👨‍🏫",
    social: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Immanuel J. Janis",
    role: "Frontend Developer",
    bio: "Full-stack developer specializing in Web3 and smart contract development",
    image: "👨‍💻",
    social: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Muhammad Ramadhani",
    role: "Smart Contract Developer",
    bio: "Educational technology expert with focus on blockchain curriculum design",
    image: "👨‍🍳",
    social: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Hudzaifah A.",
    role: "Frontend Developer",
    bio: "Building vibrant learning communities in the Web3 space",
    image: "👨‍🎓",
    social: { twitter: "#", linkedin: "#", github: "#" },
  },
];

const MILESTONES = [
  {
    year: "2025",
    title: "Credura Founded",
    description: "Started with a vision to revolutionize blockchain education",
  },
  {
    year: "2025 Q3",
    title: "Platform Launch",
    description: "Launched our first courses and onboarded 1,000+ students",
  },
  {
    year: "2025 Q4",
    title: "Token Integration",
    description: "Introduced Campus Credits and NFT certificates",
  },
  {
    year: "2025 Q4",
    title: "Community Growth",
    description: "Reached 10,000+ active learners worldwide",
  },
  {
    year: "2026 Q1",
    title: "Advanced Features",
    description: "Added quiz system, leaderboards, and admin panel",
  },
  {
    year: "2026 Q2",
    title: "Global Expansion",
    description: "Planning partnerships with universities and institutions",
  },
];

export default function AboutPage() {
  const { isConnected } = useAccount();
  const [userTokens, setUserTokens] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <Header isWalletConnected={isConnected} userTokens={userTokens} />

      <main>
        <section className="relative bg-gradient-to-br from-white via-green-50 to-blue-50 pt-20 pb-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-[#58CC02] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#FF6F61] rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                About <span className="text-gradient">Credura</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                We're on a mission to democratize blockchain education and empower the next
                generation of Web3 developers, creators, and innovators through hands-on learning
                experiences.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#58CC02] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">12,000+</div>
                  <div className="text-gray-600">Active Learners</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FF6F61] rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                  <div className="text-gray-600">Expert Courses</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#4E6C50] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">2.5M+</div>
                  <div className="text-gray-600">Tokens Earned</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Credura was born from the belief that blockchain education should be accessible,
                  engaging, and rewarding. We combine cutting-edge technology with proven
                  educational methodologies to create an immersive learning experience.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our platform leverages blockchain technology not just as a subject of study, but
                  as the foundation of our educational ecosystem - ensuring transparency, ownership,
                  and real value for every achievement.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#58CC02] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Verified Learning</h3>
                      <p className="text-sm text-gray-600">All achievements stored on-chain</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#FF6F61] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Instant Rewards</h3>
                      <p className="text-sm text-gray-600">Earn tokens for every milestone</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#4E6C50] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Global Access</h3>
                      <p className="text-sm text-gray-600">Learn from anywhere, anytime</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#58CC02] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Community First</h3>
                      <p className="text-sm text-gray-600">Learn together, grow together</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Learning Progress</h3>
                      <span className="text-[#58CC02] font-medium">85% Complete</span>
                    </div>

                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: "85%" }}></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-[#58CC02]">12</div>
                        <div className="text-sm text-gray-600">Courses</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-[#FF6F61]">2,750</div>
                        <div className="text-sm text-gray-600">Credits</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-2 bg-[#58CC02] text-white p-3 rounded-lg">
                      <Trophy className="w-5 h-5" />
                      <span className="font-medium">Blockchain Expert Badge Earned!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do at Credura
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card text-center group hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-[#58CC02] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
                <p className="text-gray-600 leading-relaxed">
                  We strive for the highest quality in our courses, technology, and student
                  experience.
                </p>
              </div>

              <div className="card text-center group hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-[#FF6F61] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  Learning is better together. We foster a supportive community of learners and
                  educators.
                </p>
              </div>

              <div className="card text-center group hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-[#4E6C50] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparency</h3>
                <p className="text-gray-600 leading-relaxed">
                  Blockchain technology enables us to provide complete transparency in achievements
                  and progress.
                </p>
              </div>

              <div className="card text-center group hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-[#58CC02] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
                <p className="text-gray-600 leading-relaxed">
                  We continuously explore new ways to make learning more engaging and effective.
                </p>
              </div>

              <div className="card text-center group hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-[#FF6F61] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Accessibility</h3>
                <p className="text-gray-600 leading-relaxed">
                  Quality blockchain education should be accessible to everyone, regardless of
                  background.
                </p>
              </div>

              <div className="card text-center group hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-[#4E6C50] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  We measure success by the positive impact we have on our students' careers and
                  lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate educators and technologists working to revolutionize blockchain education
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM_MEMBERS.map((member, index) => (
                <div
                  key={index}
                  className="card text-center group hover:scale-105 transition-transform duration-200"
                >
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-[#58CC02] font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{member.bio}</p>

                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.social.twitter}
                      className="text-gray-400 hover:text-[#58CC02] transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="text-gray-400 hover:text-[#58CC02] transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.social.github}
                      className="text-gray-400 hover:text-[#58CC02] transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From concept to global platform - here's how Credura has evolved
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#58CC02] opacity-20"></div>

              <div className="space-y-12">
                {MILESTONES.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                    >
                      <div className="card">
                        <div className="text-[#58CC02] font-bold text-lg mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-center w-12 h-12 bg-[#58CC02] rounded-full border-4 border-white shadow-lg z-10">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>

                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#1C1C1C] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Have questions about Credura? We'd love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#58CC02] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Email Us</h3>
                <p className="text-gray-300 mb-4">Get in touch with our team</p>
                <a
                  href="mailto:hello@credura.edu"
                  className="text-[#58CC02] hover:text-[#4FB302] transition-colors"
                >
                  hello@credura.edu
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF6F61] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Join Community</h3>
                <p className="text-gray-300 mb-4">Connect with fellow learners</p>
                <a href="#" className="text-[#58CC02] hover:text-[#4FB302] transition-colors">
                  Discord Community
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#4E6C50] rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Documentation</h3>
                <p className="text-gray-300 mb-4">Learn more about our platform</p>
                <a href="#" className="text-[#58CC02] hover:text-[#4FB302] transition-colors">
                  Read the Docs
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
