"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Calculator, FileText, Zap, X } from "lucide-react";
import { categories } from "@/lib/categories";

export function CommandMenu() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Handle Keyboard & Events
  useEffect(() => {
    setMounted(true);
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((isOpen) => !isOpen);
      }
    };
    document.addEventListener("keydown", down);
    
    const openSearch = () => setOpen(true);
    window.addEventListener("open-search-modal", openSearch);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-search-modal", openSearch);
    };
  }, []);

  // 2. Focus input when modal opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (!open) setSearchTerm(""); // Clear search on close
  }, [open]);

  // 3. Safe Client-Side Rendering
  if (!mounted || !open) return null;

  // 4. Actions & Filtering
  const runCommand = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={() => setOpen(false)} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Area */}
        <div className="flex items-center px-4 border-b border-slate-800 bg-slate-900/50">
          <Search className="h-5 w-5 text-slate-400 mr-2 shrink-0" />
          <input
            ref={inputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type a command, tool, or category..."
            className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 h-14 text-base placeholder:text-slate-500"
          />
          <button 
            onClick={() => setOpen(false)} 
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* Trending Tools (Shows only when search is empty) */}
          {searchTerm === "" && (
            <div className="mb-4">
              <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Trending Tools
              </div>
              <button onClick={() => runCommand("/tool/tax-calculator")} className="w-full flex items-center px-3 py-3 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors text-sm">
                <Calculator className="mr-3 h-5 w-5 text-emerald-400" />
                Tax Calculator Pro
              </button>
              <button onClick={() => runCommand("/tool/pdf-merge")} className="w-full flex items-center px-3 py-3 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors text-sm">
                <FileText className="mr-3 h-5 w-5 text-red-400" />
                PDF Merge Engine
              </button>
              <button onClick={() => runCommand("/tool/youtube-thumbnail-downloader")} className="w-full flex items-center px-3 py-3 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors text-sm">
                <Zap className="mr-3 h-5 w-5 text-blue-400" />
                YouTube Thumbnail Downloader
              </button>
            </div>
          )}

          {/* Categories List */}
          <div>
            <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {searchTerm === "" ? "All Categories" : "Search Results"}
            </div>
            
            {filteredCategories.length === 0 ? (
              <div className="px-3 py-8 text-center text-slate-500 text-sm">
                No results found for "{searchTerm}".
              </div>
            ) : (
              filteredCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    onClick={() => runCommand(`/category/${cat.name.toLowerCase().replace(/\s+/g, "-")}`)}
                    className="w-full flex items-center px-3 py-3 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    <Icon className={`mr-3 h-5 w-5 ${cat.color}`} />
                    {cat.name}
                  </button>
                );
              })
            )}
          </div>

        </div>
      </div>
    </div>
  );
}