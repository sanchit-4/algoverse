"use client";

import { useState } from "react";
import axios from "axios";
import { X, Loader2, Lock, Mail, User } from "lucide-react";
import clsx from "clsx";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/Signup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/auth/login" : "/auth/signup";
    const payload = isLogin ? { email, password } : { email, password, username };

    try {
      // Use full URL to avoid rewrite issues during auth
      const res = await axios.post(`http://localhost:3000${endpoint}`, payload);
      
      // Save Token
      localStorage.setItem("token", res.data.token);
      
      // Close & Reload to update UI
      onClose();
      window.location.reload();
      
    } catch (err: any) {
      setError(err.response?.data?.error || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-xl w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : "Join Algoverse"}
          </h2>
          <p className="text-sm text-gray-400">
            {isLogin ? "Login to access your submissions" : "Create an account to track progress"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-900/50 text-red-300 text-sm p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username (Signup Only) */}
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="cool_coder"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] text-white text-sm rounded-lg py-2.5 pl-10 focus:ring-2 focus:ring-blue-600 outline-none"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-500" size={16} />
              <input 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] text-white text-sm rounded-lg py-2.5 pl-10 focus:ring-2 focus:ring-blue-600 outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-500" size={16} />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] text-white text-sm rounded-lg py-2.5 pl-10 focus:ring-2 focus:ring-blue-600 outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 mt-6"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            className="text-blue-400 hover:text-blue-300 font-bold hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>

      </div>
    </div>
  );
}