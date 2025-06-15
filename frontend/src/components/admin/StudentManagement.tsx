"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  User,
  Trophy,
  BookOpen,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
} from "lucide-react";

const STUDENTS = [
  {
    id: "1",
    address: "0x1234...5678",
    joinDate: "2024-03-15",
    coursesEnrolled: 5,
    coursesCompleted: 3,
    totalTokens: 2750,
    nftId: "#1337",
    status: "Active",
    lastActivity: "2024-12-28",
  },
  {
    id: "2",
    address: "0x5678...9012",
    joinDate: "2024-04-20",
    coursesEnrolled: 3,
    coursesCompleted: 2,
    totalTokens: 1850,
    nftId: "#1338",
    status: "Active",
    lastActivity: "2024-12-27",
  },
  {
    id: "3",
    address: "0x9012...3456",
    joinDate: "2024-02-10",
    coursesEnrolled: 8,
    coursesCompleted: 6,
    totalTokens: 4200,
    nftId: "#1339",
    status: "Inactive",
    lastActivity: "2024-12-20",
  },
];

export function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredStudents = STUDENTS.filter((student) => {
    const matchesSearch = student.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor student accounts and progress</p>
        </div>
        <button className="btn-primary cursor-pointer">Add Student</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">12,450</p>
            </div>
            <User className="w-8 h-8 text-[#58CC02]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+12% from last month</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <p className="text-2xl font-bold text-gray-900">9,876</p>
            </div>
            <Trophy className="w-8 h-8 text-[#FF6F61]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+8% from last month</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Course Completions</p>
              <p className="text-2xl font-bold text-gray-900">45,230</p>
            </div>
            <BookOpen className="w-8 h-8 text-[#4E6C50]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+25% from last month</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tokens Distributed</p>
              <p className="text-2xl font-bold text-gray-900">2.5M</p>
            </div>
            <Trophy className="w-8 h-8 text-[#58CC02]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+18% from last month</div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by wallet address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#58CC02] focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tokens
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#58CC02] to-[#4E6C50] rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {student.address.slice(2, 4).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.address}</div>
                        <div className="text-sm text-gray-500">NFT: {student.nftId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {student.coursesCompleted}/{student.coursesEnrolled}
                    </div>
                    <div className="text-sm text-gray-500">Completed</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {student.totalTokens.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Credits</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(student.lastActivity).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
