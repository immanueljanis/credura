"use client";

import { useState } from "react";
import { Search, Plus, BookOpen, Users, Star, Edit, Trash, Eye } from "lucide-react";
import { useWriteContract } from "wagmi";
import { courseBadgeAbi, courseBadgeAddress } from "@/abi/course-badge";

// const contract = useWriteContract();

const COURSES = [
  {
    id: "1",
    title: "Blockchain Fundamentals",
    instructor: "Dr. Sarah Chen",
    students: 1245,
    rating: 4.8,
    price: 0.05,
    status: "Published",
    createdDate: "2024-01-15",
    category: "Fundamentals",
  },
  {
    id: "2",
    title: "Smart Contract Development",
    instructor: "Prof. Michael Rodriguez",
    students: 892,
    rating: 4.9,
    price: 0.08,
    status: "Published",
    createdDate: "2024-02-20",
    category: "Development",
  },
  {
    id: "3",
    title: "Advanced DeFi Protocols",
    instructor: "Alex Thompson",
    students: 234,
    rating: 4.6,
    price: 0.12,
    status: "Draft",
    createdDate: "2024-12-01",
    category: "Finance",
  },
];

// Modal Component
const AddCourseModal = ({ isOpen, onClose, onAddCourse } : any) => {
  const [courseName, setCourseName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e : any) => {
    e.preventDefault();
    if (courseName.trim()) {
      onAddCourse(courseName);
      setCourseName("");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Create New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-2">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              className="input-field w-full"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#58CC02]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState(COURSES); // Manage courses in state

  const hanldeAddCourse = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateCourse = (newCourseName : string) => {
    // In a real application, you'd send this to an API and then update your state
    // For now, we'll just add it to our local COURSES array


    // contract.writeContract(  { 
    //    address: courseBadgeAddress,
    //     abi: courseBadgeAbi,         
    //     functionName: 'mintEventBadges',       
    //     args: [                      
    //       "0x", BigInt(Date.now(), newCourseName  
    //     ],
    //   }
    //     // value: parseEther('0.01'), // (Op
    // )

    const newCourse = {
      id: String(courses.length + 1), // Simple ID generation
      title: newCourseName,
      instructor: "New Instructor", // Placeholder
      students: 0,
      rating: 0,
      price: 0.00,
      status: "Draft", // New courses typically start as Draft
      createdDate: new Date().toISOString().split('T')[0],
      category: "Uncategorized", // Placeholder
    };
    setCourses([...courses, newCourse]);
    setIsModalOpen(false); // Close the modal after adding
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-1">Create, edit, and manage educational content</p>
        </div>
        <button className="btn-primary flex items-center" onClick={hanldeAddCourse}>
          <Plus className="w-5 h-5 mr-2" />
          Create Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">58</p>
            </div>
            <BookOpen className="w-8 h-8 text-[#58CC02]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+5 this month</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
            </div>
            <BookOpen className="w-8 h-8 text-[#FF6F61]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+3 this month</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">45K</p>
            </div>
            <Users className="w-8 h-8 text-[#4E6C50]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+15% this month</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
            </div>
            <Star className="w-8 h-8 text-[#58CC02]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+0.2 this month</div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#58CC02] focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card p-0 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.status === "Published"
                      ? "bg-green-100 text-green-800"
                      : course.status === "Draft"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {course.status}
                </span>
                <div className="text-lg font-bold text-[#58CC02]">{course.price} ETH</div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {course.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4">By {course.instructor}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {course.students.toLocaleString()} students
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                  {course.rating}
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                Created: {new Date(course.createdDate).toLocaleDateString()}
              </div>
            </div>

            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{course.category}</span>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-[#58CC02]">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-[#FF6F61]">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-500">
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AddCourseModal component */}
      <AddCourseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddCourse={handleCreateCourse}
      />
    </div>
  );
}