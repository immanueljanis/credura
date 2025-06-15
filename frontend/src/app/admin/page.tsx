"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StudentManagement } from "@/components/admin/StudentManagement";
import { CourseManagement } from "@/components/admin/CourseManagement";
import { CreditOperations } from "@/components/admin/CreditOperations";
import { SystemAnalytics } from "@/components/admin/SystemAnalytics";
import { ContractControls } from "@/components/admin/ContractControls";
import { useAccount } from "wagmi";

export default function AdminPage() {
  const { isConnected } = useAccount();
  const [userTokens, setUserTokens] = useState(5000);
  const [activeTab, setActiveTab] = useState("students");

  const renderContent = () => {
    switch (activeTab) {
      case "students":
        return <StudentManagement />;
      case "courses":
        return <CourseManagement />;
      case "credits":
        return <CreditOperations />;
      case "analytics":
        return <SystemAnalytics />;
      case "contracts":
        return <ContractControls />;
      default:
        return <StudentManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isWalletConnected={isConnected} userTokens={userTokens} />

      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
