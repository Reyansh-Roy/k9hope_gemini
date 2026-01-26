"use client";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { LogOut, Shield } from "lucide-react";

export default function HospitalDashboard() {
  const { isAuthenticated, username, isLoading, logout } = useAdminAuth();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect happens automatically in context
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">K9Hope CRM</h1>
              <p className="text-xs text-gray-500">Veterinary Blood Bank System</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{username}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Welcome, {username}</h2>
          <p className="text-blue-100">K9Hope Veterinary Blood Bank Management System</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Dashboard Cards */}
          <DashboardCard
            title="Active Blood Requests"
            value="8"
            icon="🩸"
            bgColor="bg-red-50"
            textColor="text-red-700"
          />
          <DashboardCard
            title="Verified Donors"
            value="24"
            icon="🐕"
            bgColor="bg-blue-50"
            textColor="text-blue-700"
          />
          <DashboardCard
            title="Blood Available"
            value="320ml"
            icon="🏥"
            bgColor="bg-green-50"
            textColor="text-green-700"
          />
          <DashboardCard
            title="Successful Transfusions"
            value="47"
            icon="✅"
            bgColor="bg-purple-50"
            textColor="text-purple-700"
          />
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 text-lg">
            Full dashboard features coming soon...
          </p>
        </div>
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  icon,
  bgColor,
  textColor,
}: {
  title: string;
  value: string;
  icon: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-lg p-6 border border-gray-200`}>
      <div className="text-4xl mb-2">{icon}</div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
}
