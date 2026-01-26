"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAdminAuth, getAdminSession } from "@/lib/adminAuth";
import HospitalHeader from "@/components/hospital/HospitalHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export default function HospitalDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const session = getAdminSession();

  useEffect(() => {
    // Check admin authentication
    const isAuth = checkAdminAuth();

    if (!isAuth) {
      // Redirect to admin login if not authenticated
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // Show loading while checking auth
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HospitalHeader />

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Administrator</h2>
          <p className="text-blue-100">
            Logged in as <strong>{session?.username || 'ADMIN'}</strong> -  K9Hope Veterinary Blood Bank CRM
          </p>
        </div>
      </div>

      {/* Rest of dashboard content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Blood Requests</CardTitle>
              <CardDescription>Manage incoming patient needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Donors</CardTitle>
              <CardDescription>Available for donation today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">48</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Units in cold storage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">Good</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
