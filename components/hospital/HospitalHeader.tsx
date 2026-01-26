"use client";

import { LogOut, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutAdmin, getAdminSession } from "@/lib/adminAuth";

export default function HospitalHeader() {
    const router = useRouter();
    const session = getAdminSession();

    // Safety check just in case session is null (though should be protected)
    const username = session?.username || "Admin";

    const handleLogout = () => {
        logoutAdmin();
        router.push("/login");
    };

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-50">
            <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 leading-tight">K9Hope CRM</h1>
                        <p className="text-xs text-blue-600 font-medium">Veterinary Clinic Portal</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900">{username}</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg transition-all border border-red-100 hover:border-red-200 active:scale-95"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
