"use client";

import Link from "next/link";
import { Star, Clock, Users, Lock } from "lucide-react";
import { FindCoursesDto } from "@/app/api/courses/route";
import { addCourseAction } from "@/actions/add-course.action";

interface CourseCardProps {
  course: FindCoursesDto[number];
  isWalletConnected: boolean;
}

export function CourseCard({ course, isWalletConnected }: CourseCardProps) {

  return (
    <div className="card group hover:scale-105 transition-all duration-200 p-0 overflow-hidden">
      <div className="relative">
        <img
          src={course.image ?? ""}
          alt={course.courseName}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium text-gray-800">
          {course.level}
        </div>
        <div className="absolute top-4 right-4 bg-[#58CC02] text-white px-2 py-1 rounded text-sm font-bold">
          {course.price} MON
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {course.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.courseName}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="text-sm text-gray-500 mb-4">By {course.instructor}</div>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {course?.studentsEnrolled?.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="font-medium">{course.rating}</span>
          </div>
        </div>

        {isWalletConnected ? (
          <Link
            href={`/courses/${course.id}`}
            className="w-full btn-primary text-center block"
          >
            Enroll Now
          </Link>
        ) : (
          <button className="w-full bg-gray-200 text-gray-500 font-medium px-6 py-3 rounded-lg cursor-not-allowed flex items-center justify-center">
            <Lock className="w-4 h-4 mr-2" />
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
