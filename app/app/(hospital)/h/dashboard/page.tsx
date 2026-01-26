//@ts-nocheck
"use client";
import { useEffect, useState } from "react";


import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import GreetingCard from "@/components/portals/common-parts/greeting-card"


// User Imports
import { useUser } from "@/context/UserContext";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getUserDataById } from "@/firebaseFunctions";



import { checkAdminAuth, getAdminSession } from "@/lib/adminAuth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  const router = useRouter();
  const { userId, role, device, setUser } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

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

  useEffect(() => {
    async function fetchHospitalData() {
      if (!userId) return; // ✅ Safe condition inside useEffect
      const data = await getUserDataById(userId, "hospital");
      setProfile(data);
    }
    fetchHospitalData();
  }, [userId]);

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

  // ✅ Sidebar check inside JSX instead of returning early
  if (!sidebar) {
    return <div>Loading Sidebar...</div>;
  }

  const session = getAdminSession();

  return (
    <ContentLayout title="Dashboard">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg mb-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Administrator</h2>
          <p className="text-blue-100">
            Logged in as <strong>{session?.username || "ADMIN"}</strong> -  K9Hope Veterinary Blood Bank CRM
          </p>
        </div>
      </div>

      <div>
        <GreetingCard name={profile?.h_admin_name || session?.username} role="hospital" />
      </div>



    </ContentLayout>
  );
}
