"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { allToolsList } from "@/lib/all-tools";
import { 
  Search, X, Clock, Code, Calculator, FileText, TrendingUp, Shield, Cpu, 
  Image as ImageIcon, Video, Briefcase, ShoppingCart, Compass, Target, 
  DollarSign, Umbrella, Heart, Package, Building, Headphones, Wifi, 
  AlertTriangle, LineChart, Users, Smartphone, Monitor, Cloud, PhoneCall, 
  BookOpen, Activity, Map as MapIcon, Calendar, Settings, Receipt, Coins, 
  Wrench, Zap, Globe, Folder, Play, ArrowLeft 
} from "lucide-react";

function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentItems, setRecentItems] = useState<{name: string, url: string, type: string}[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const trendingTools = [
    { name: "YouTube Thumbnail Downloader", url: "/tool/youtube-thumbnail-downloader", icon: <Play className="h-4 w-4 text-blue-400" /> },
    { name: "Tax Calculator Pro", url: "/tool/tax-calculator-pro", icon: <Calculator className="h-4 w-4 text-emerald-400" /> },
    { name: "PDF Merge Engine", url: "/tool/pdf-merge-engine", icon: <FileText className="h-4 w-4 text-rose-400" /> },
    { name: "SEO Analyzer", url: "/tool/seo-analyzer", icon: <TrendingUp className="h-4 w-4 text-purple-400" /> },
    { name: "JSON Formatter Pro", url: "/tool/json-formatter-pro", icon: <Code className="h-4 w-4 text-amber-400" /> },
  ];

  const uniqueCategories = Array.from(new Set(allToolsList.map(t => t.category))).sort();

  const getCategoryIcon = (catName: string) => {
    const safeSlug = catName.toLowerCase();
    const baseClass = "h-4 w-4";
    if (safeSlug.includes("retail") || safeSlug.includes("store")) return <ShoppingCart className={`${baseClass} text-fuchsia-500`} />;
    if (safeSlug.includes("consulting") || safeSlug.includes("professional")) return <Briefcase className={`${baseClass} text-amber-400`} />;
    if (safeSlug.includes("compliance") || safeSlug.includes("governance")) return <Shield className={`${baseClass} text-emerald-400`} />;
    if (safeSlug.includes("machine learning") || safeSlug.includes("ai ")) return <Cpu className={`${baseClass} text-indigo-400`} />;
    if (safeSlug.includes("developer")) return <Code className={`${baseClass} text-blue-400`} />;
    if (safeSlug.includes("video") || safeSlug.includes("youtube")) return <Video className={`${baseClass} text-rose-400`} />;
    if (safeSlug.includes("pdf") || safeSlug.includes("text")) return <FileText className={`${baseClass} text-orange-400`} />;
    if (safeSlug.includes("seo")) return <TrendingUp className={`${baseClass} text-emerald-400`} />;
    return <Folder className={`${baseClass} text-slate-400`} />;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsOpen(true);
      if (customEvent.detail && typeof customEvent.detail === 'string') {
        setQuery(customEvent.detail); 
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search-modal", handleOpenModal);
    
    const savedRecents = localStorage.getItem("Multi Tools Engine_recent");
    if (savedRecents) {
      setRecentItems(JSON.parse(savedRecents));
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search-modal", handleOpenModal);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery(""); 
    }
  }, [isOpen]);

  const handleSelect = (name: string, url: string, type: string) => {
    const newItem = { name, url, type };
    const filteredRecents = recentItems.filter(item => item.url !== url);
    const updatedRecents = [newItem, ...filteredRecents].slice(0, 5);
    
    setRecentItems(updatedRecents);
    localStorage.setItem("Multi Tools Engine_recent", JSON.stringify(updatedRecents));

    router.push(url);
    setIsOpen(false);
  };

  // 🚀 SMART SEARCH LOGIC (Fuzzy Search)
  // If user types "youtube download", it matches "YouTube Thumbnail Downloader"
  const searchWords = query.toLowerCase().trim().split(/\s+/);
  
  const filteredTools = query 
    ? allToolsList.filter(t => {
        const toolName = t.name.toLowerCase();
        const categoryName = t.category.toLowerCase();
        // Check if every typed word is present somewhere in the tool's name or category
        return searchWords.every(word => toolName.includes(word) || categoryName.includes(word));
      }).slice(0, 10)
    : [];

  const filteredCategories = query
    ? uniqueCategories.filter(c => {
        return searchWords.every(word => c.toLowerCase().includes(word));
      }).slice(0, 5)
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:pt-32">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)}></div>

      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center px-4 py-4 border-b border-slate-800 bg-[#151e32]">
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 -ml-2 mr-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Go Back / Close"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <Search className="h-5 w-5 text-slate-500 mr-2 hidden sm:block" />
          
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none text-slate-200 text-lg focus:outline-none focus:ring-0 placeholder:text-slate-500"
            placeholder="Search 10,000+ tools, commands, or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <button 
              onClick={() => setQuery("")} 
              className="p-1 mx-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
              title="Clear text"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          <kbd className="hidden sm:flex items-center gap-1 rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400 border border-slate-700">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
          
          {!query && (
            <>
              {recentItems.length > 0 && (
                <div className="mb-4">
                  <h3 className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Recent</h3>
                  {recentItems.map((item, idx) => (
                    <button key={idx} onClick={() => handleSelect(item.name, item.url, item.type)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors text-left">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="mb-4">
                <h3 className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Trending Tools</h3>
                {trendingTools.map((tool, idx) => (
                  <button key={idx} onClick={() => handleSelect(tool.name, tool.url, 'tool')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors text-left">
                    {tool.icon}
                    <span className="text-sm font-medium">{tool.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {query && (
            <>
              {filteredCategories.length > 0 && (
                <div className="mb-4">
                  <h3 className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Categories</h3>
                  {filteredCategories.map((cat, idx) => {
                    const catSlug = cat.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    return (
                      <button key={idx} onClick={() => handleSelect(cat, `/category/${catSlug}`, 'category')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors text-left">
                        {getCategoryIcon(cat)}
                        <span className="text-sm font-medium">{cat}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {filteredTools.length > 0 && (
                <div className="mb-4">
                  <h3 className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tools</h3>
                  {filteredTools.map((tool, idx) => (
                    <button key={idx} onClick={() => handleSelect(tool.name, `/tool/${tool.slug}`, 'tool')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors text-left">
                      {tool.isPro ? <Zap className="h-4 w-4 text-amber-400" /> : <Wrench className="h-4 w-4 text-blue-400" />}
                      <span className="text-sm font-medium flex-1">{tool.name}</span>
                      <span className="text-xs text-slate-500 hidden sm:block truncate max-w-[200px]">{tool.category}</span>
                    </button>
                  ))}
                </div>
              )}

              {filteredTools.length === 0 && filteredCategories.length === 0 && (
                <div className="py-14 text-center">
                  <Search className="h-8 w-8 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">No results found for "{query}"</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { CommandMenu };