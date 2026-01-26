"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, User, AlertCircle, ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminLoginPage() {
    const router = useRouter();
    const { login } = useAdminAuth();
    const [username, setUsername] = useState("ADMIN");
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 600));

        const success = await login(username, passcode);

        if (success) {
            // Small delay before redirect to ensure state updates
            setTimeout(() => {
                router.push("/app/h/dashboard");
            }, 300);
        } else {
            setError("Invalid credentials. Please check username and passcode.");
            setLoading(false);
            setPasscode(""); // Clear passcode on error
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

            <div className="relative w-full max-w-md">
                <Link href="/login" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login Options
                </Link>

                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Veterinary Clinic Portal
                        </h1>
                        <p className="text-blue-100 text-sm">
                            K9Hope Administration System
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="p-8 space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value.toUpperCase())}
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-200 transition-all text-gray-900 font-medium uppercase"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Passcode */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Access Passcode
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={passcode}
                                    onChange={(e) => setPasscode(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-200 transition-all"
                                    placeholder="Enter passcode"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 italic">
                                🎓 Hint: RIT Chennai CSE Final Year Project 2025-26
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !passcode}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    <Shield className="w-5 h-5" />
                                    Access System
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                        <div className="text-xs text-gray-600 text-center space-y-1">
                            <p className="font-semibold">K9Hope Veterinary Blood Bank System</p>
                            <p>Rajalakshmi Institute of Technology, Chennai</p>
                        </div>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 bg-blue-900/30 backdrop-blur border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-blue-200">
                            <p className="font-semibold mb-1">Secure Access</p>
                            <p>This portal is exclusively for licensed veterinary clinics.</p>
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-blue-300 mt-6">
                    K9Hope CRM v1.0.0
                </p>
            </div>
        </div>
    );
}
