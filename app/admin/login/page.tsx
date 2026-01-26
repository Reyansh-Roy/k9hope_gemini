"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, User, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("ADMIN");
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Hardcoded credentials
    const VALID_USERNAME = "ADMIN";
    const VALID_PASSCODE = "k9hopeRit";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Simulate authentication delay for professional feel
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (username.toUpperCase() === VALID_USERNAME && passcode === VALID_PASSCODE) {
            // Set admin session
            localStorage.setItem("k9hope_admin_session", "true");
            localStorage.setItem("k9hope_admin_username", username);
            localStorage.setItem("k9hope_admin_login_time", new Date().toISOString());

            // Redirect to hospital dashboard
            router.push("/app/h/dashboard");
        } else {
            setError("Invalid credentials. Please check username and passcode.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none"></div>

            <div className="relative w-full max-w-md z-10">
                {/* Back Button */}
                <Link href="/login" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login Options
                </Link>

                {/* Login Card */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-lg">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-1 shadow-sm">
                                Veterinary Clinic Portal
                            </h1>
                            <p className="text-blue-100 text-sm font-medium">
                                K9Hope Administration System
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="p-8 space-y-6">
                        {/* Username Field */}
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
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 font-bold uppercase tracking-wider bg-gray-50"
                                    placeholder="ADMIN"
                                    readOnly
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Passcode Field */}
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
                                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 font-mono tracking-widest text-lg placeholder:font-sans placeholder:tracking-normal placeholder:text-sm"
                                    placeholder="Enter 4-digit PIN..."
                                    required
                                    disabled={loading}
                                    maxLength={20}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 italic flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Hint: This is a final-year project (for fun!)
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 animate-in fade-in slide-in-from-top-1">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700 font-medium">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !passcode}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 transform active:scale-[0.98]"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span className="animate-pulse">Authenticating...</span>
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
                    <div className="bg-gray-50 px-8 py-5 border-t border-gray-200">
                        <div className="text-xs text-gray-600 text-center space-y-1.5">
                            <p className="font-semibold text-blue-900">K9Hope Veterinary Blood Bank System</p>
                            <p>Rajalakshmi Institute of Technology, Chennai</p>
                            <p className="text-gray-400">In partnership with Madras Veterinary College</p>
                        </div>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 bg-blue-950/40 backdrop-blur-md border border-blue-400/20 rounded-lg p-4 shadow-xl">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-blue-200 leading-relaxed">
                            <p className="font-semibold mb-1 text-blue-100">Secure Hospital-Grade Access</p>
                            <p>This portal is exclusively for licensed veterinary clinics. Unauthorized access is prohibited by K9Hope protocols.</p>
                        </div>
                    </div>
                </div>

                {/* Version Info */}
                <p className="text-center text-[10px] text-blue-400/60 mt-8 uppercase tracking-widest">
                    K9Hope CRM v1.0.0 • Final Year Project 2025-26
                </p>
            </div>
        </div>
    );
}
