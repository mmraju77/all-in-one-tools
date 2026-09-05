"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  ChevronDown, 
  Search, 
  User, 
  LogOut,
  Cpu,
  Code,
  TrendingUp,
  FileText as File,
  Video,
  Image as Camera,
  Briefcase,
  Shield,
  ArrowRight,
  Headphones,
  Layers
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [currency, setCurrency] = useState("USD");
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  
  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "INR", symbol: "₹" },
    { code: "GBP", symbol: "£" }
  ];

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0f172a]">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-3 group outline-none">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 shadow-lg shadow-blue-500/30 group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:scale-105">
            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Layers className="h-6 w-6 text-white relative z-10" />
          </div>
          <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 group-hover:from-emerald-300 group-hover:to-blue-400 transition-all duration-300">
            Multi Tools Engine<span className="text-blue-500 group-hover:text-emerald-400 transition-colors">.</span>
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-base font-medium text-slate-300 ml-8">
        <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
        
        <div 
          className="relative"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <Link href="/categories" onClick={closeMenu} className="flex items-center gap-1.5 py-4 hover:text-white transition-colors">
            Categories 
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </Link>

          <div className={`absolute top-[100%] left-[-20px] pt-2 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
            <div className="w-[750px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              
              <div className="grid grid-cols-3 gap-8 p-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Tech & Developer</h3>
                  <div className="space-y-1">
                    <Link href="/category/ai-tools" onClick={closeMenu} className="flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors">
                      <Cpu className="h-5 w-5 text-blue-400" /> AI Tools
                    </Link>
                    <Link href="/category/developer-tools" onClick={closeMenu} className="flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors">
                      <Code className="h-5 w-5 text-emerald-400" /> Developer
                    </Link>
                    <Link href="/category/seo-tools" onClick={closeMenu} className="flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors">
                      <TrendingUp className="h-5 w-5 text-orange-400" /> SEO Tools
                    </Link>
                    <Link href="/category/cybersecurity-tools" onClick={closeMenu} className="flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors">
                      <Shield className="h-5 w-5 text-red-400" /> Security
                    </Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Media & Content</h3>
                  <div className="space-y-1">
                    <Link href="/category/youtube-tools" onClick={closeMenu} className="flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors">
                      <Video className="h-5 w-5 text-red-500" /> YouTube
                    </Link>
                    <Link href="/category/image-tools" onClick={closeMenu} className="flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors">
                      <Camera className="h-5 w-5 text-purple-400" /> Image Tools
                    </Link>
                    <Link href="/category/audio-tools" onClick={closeMenu} className="flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors">
                      <Headphones className="h-5 w-5 text-cyan-400" /> Audio Tools
                    </Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Business & Docs</h3>
                  <div className="space-y-1">
                    <Link href="/category/pdf-tools" onClick={closeMenu} className="flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors">
                      <File className="h-5 w-5 text-rose-400" /> PDF Tools
                    </Link>
                    <Link href="/category/finance-tools" onClick={closeMenu} className="flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors">
                      <TrendingUp className="h-5 w-5 text-green-400" /> Finance
                    </Link>
                    <Link href="/category/business-tools" onClick={closeMenu} className="flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors">
                      <Briefcase className="h-5 w-5 text-amber-400" /> Business
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/50 p-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-sm text-slate-400 font-medium">Explore all 10,000+ free tools in one place.</span>
                <Link href="/categories" onClick={closeMenu} className="text-base font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                  View All 100 Categories <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 ml-auto">
        <button 
          onClick={() => window.dispatchEvent(new Event("open-search-modal"))}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md border border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-base text-slate-400 transition-colors"
        >
          <Search className="h-5 w-5" />
          <span>Search...</span>
          <kbd className="hidden lg:inline-flex items-center gap-1 rounded border border-slate-600 bg-slate-700 px-1.5 font-mono text-[11px] font-medium text-slate-300 ml-2">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>

        <div className="relative">
          <div 
            onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-300 bg-slate-800/50 cursor-pointer hover:bg-slate-700 transition-colors"
          >
            {currency} ({currencies.find(c => c.code === currency)?.symbol}) <ChevronDown className="h-4 w-4" />
          </div>
          
          {isCurrencyMenuOpen && (
            <div className="absolute top-full mt-2 right-0 w-24 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
              {currencies.map((c) => (
                <div 
                  key={c.code}
                  onClick={() => {
                    setCurrency(c.code);
                    setIsCurrencyMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors ${
                    currency === c.code ? 'bg-blue-500/10 text-blue-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="font-medium">{c.code}</span>
                  <span className="text-slate-500">{c.symbol}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Link href="/pricing">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 h-10 text-base font-semibold transition-colors shadow-lg shadow-blue-500/20 hidden sm:flex">
            Go Pro
          </Button>
        </Link>

        <div className="flex items-center gap-4 ml-2 sm:border-l border-slate-700 sm:pl-5">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                <User className="w-5 h-5" />
              </div>
              <button 
                onClick={handleLogout} 
                className="text-base font-medium text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1.5"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 h-10 text-base rounded-full px-5 transition-colors">
                Log in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}