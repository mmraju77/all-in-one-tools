"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Zap, ChevronDown, Search, User, LogOut } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // వెబ్‌సైట్ లోడ్ అవ్వగానే యూజర్ ఉన్నాడో లేదో చెక్ చేయడం
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // యూజర్ లాగిన్/లాగౌట్ అయినప్పుడు రియల్ టైమ్ లో అప్‌డేట్ చేయడం
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0f172a]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-500 p-1.5 rounded-md">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <Link href="/">
          <span className="text-2xl font-bold text-white tracking-tight cursor-pointer">MultiTool.</span>
        </Link>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <Link href="/" className="text-white hover:text-blue-400 transition-colors">Home</Link>
        <Link href="/categories" className="flex items-center gap-1 hover:text-white transition-colors">
          Categories <ChevronDown className="h-4 w-4" />
        </Link>
      </div>

      {/* Right Actions & Global Search Button */}
      <div className="flex items-center gap-4">
        
        {/* Search Shortcut Button */}
        <button 
          onClick={() => window.dispatchEvent(new Event("open-search-modal"))}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-sm text-slate-400 transition-colors"
        >
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="hidden lg:inline-flex items-center gap-1 rounded border border-slate-600 bg-slate-700 px-1.5 font-mono text-[10px] font-medium text-slate-300">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>

        <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-700 text-xs text-slate-300 bg-slate-800/50 cursor-pointer hover:bg-slate-700 transition-colors">
          USD ($) <ChevronDown className="h-3 w-3" />
        </div>
        
        <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 h-9 text-sm font-semibold transition-colors">
          Go Pro
        </Button>

        {/* Auth Section (Login / Profile) */}
        <div className="flex items-center gap-4 ml-2 border-l border-slate-700 pl-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                <User className="w-4 h-4" />
              </div>
              <button 
                onClick={handleLogout} 
                className="text-sm font-medium text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 h-9 rounded-full px-4 transition-colors">
                Log in
              </Button>
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}