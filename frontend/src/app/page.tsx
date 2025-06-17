"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CourseCard } from "@/components/courses/CourseCard";
import { StatsSection } from "@/components/home/StatsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { useAccount } from "wagmi";
import { FindCoursesDto } from "./api/courses/route";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { address: userAddress, isConnected } = useAccount();
  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch("/api/courses");
      return response.json() as Promise<FindCoursesDto>;
    },
  });


  return (
    <div className="min-h-screen bg-white">
      <Header isWalletConnected={isConnected} />

      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured Courses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Master blockchain technology with our comprehensive courses
                taught by industry experts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {courses?.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isWalletConnected={isConnected}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
