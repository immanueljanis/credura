"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CourseCard } from "@/components/courses/CourseCard";
import { Search, Filter, BookOpen, Loader } from "lucide-react";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { FindCoursesDto } from "../api/courses/route";

export default function CoursesPage() {
  const { isConnected } = useAccount();
  const [userTokens, setUserTokens] = useState(150);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = ["All", "Fundamentals", "Development", "Finance"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch("/api/courses");
      return response.json() as Promise<FindCoursesDto>;
    },
  });

  const filteredCourses = useMemo(
    () =>
      courses?.filter((course) => {
        const matchesSearch =
          course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || course.category === selectedCategory;
        const matchesLevel =
          selectedLevel === "All" || course.level === selectedLevel;

        return matchesSearch && matchesCategory && matchesLevel;
      }) ?? [],
    [courses, searchTerm, selectedCategory, selectedLevel]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isWalletConnected={isConnected} userTokens={userTokens} />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master blockchain technology with our comprehensive courses taught
              by industry experts
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
              Showing {filteredCourses.length} of {courses?.length} courses
            </p>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isWalletConnected={isConnected}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              {isLoading ? (
                <>
                  <Loader className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Loading Courses
                  </h3>
                  <p className="text-gray-600">
                    Please Wait...
                  </p>
                </>
              ) : (
                <>
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
