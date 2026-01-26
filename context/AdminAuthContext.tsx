"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminAuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    isLoading: boolean;
    login: (username: string, passcode: string) => Promise<boolean>;
    logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Check authentication on mount (client-side only)
    useEffect(() => {
        const checkAuth = async () => {
            // Ensure we're on client
            if (typeof window !== "undefined") {
                const storedAuth = sessionStorage.getItem("k9hope_admin_auth");
                const storedUsername = sessionStorage.getItem("k9hope_admin_username");

                if (storedAuth === "true" && storedUsername) {
                    setIsAuthenticated(true);
                    setUsername(storedUsername);
                } else {
                    setIsAuthenticated(false);
                    setUsername(null);
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    // Redirect logic - only on protected routes
    useEffect(() => {
        if (isLoading) return; // Wait for initial check

        const protectedRoutes = ["/app/h/dashboard", "/app/h/", "/h/dashboard", "/h/"];
        const isProtectedRoute = protectedRoutes.some((route) => pathname?.startsWith(route));

        if (isProtectedRoute && !isAuthenticated) {
            router.push("/admin/login");
        }
    }, [isAuthenticated, pathname, isLoading, router]);

    const login = async (inputUsername: string, passcode: string): Promise<boolean> => {
        // Validate credentials
        if (inputUsername.toUpperCase() === "ADMIN" && passcode === "k9hopeRit") {
            // Use sessionStorage instead of localStorage (persists across tabs, clears on browser close)
            sessionStorage.setItem("k9hope_admin_auth", "true");
            sessionStorage.setItem("k9hope_admin_username", inputUsername.toUpperCase());
            sessionStorage.setItem("k9hope_admin_login_time", new Date().toISOString());

            setIsAuthenticated(true);
            setUsername(inputUsername.toUpperCase());

            return true;
        }
        return false;
    };

    const logout = () => {
        sessionStorage.removeItem("k9hope_admin_auth");
        sessionStorage.removeItem("k9hope_admin_username");
        sessionStorage.removeItem("k9hope_admin_login_time");

        setIsAuthenticated(false);
        setUsername(null);
        router.push("/login");
    };

    return (
        <AdminAuthContext.Provider
            value={{
                isAuthenticated,
                username,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error("useAdminAuth must be used within AdminAuthProvider");
    }
    return context;
}
