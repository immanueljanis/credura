"use client";

import { Users, BookOpen, Coins, BarChart3, Settings, Shield } from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const menuItems = [
    { id: "students", label: "Student Management", icon: Users },
    { id: "courses", label: "Course Management", icon: BookOpen },
    { id: "credits", label: "Credit Operations", icon: Coins },
    { id: "analytics", label: "System Analytics", icon: BarChart3 },
    { id: "contracts", label: "Contract Controls", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-100 min-h-screen">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#58CC02] rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-600">System Management</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive ? "bg-[#58CC02] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
