"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { categories } from "@/lib/categories";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-start pt-24 pb-24 px-4 w-full max-w-7xl mx-auto space-y-16">
      
      {/* Hero Section */}
      <div className="flex flex-col items-center w-full max-w-5xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            What do you want to <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
              do today?
            </span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-medium">
            In one platform. 3000+ Tools. The biggest free utility platform on the Internet.
          </p>
        </div>

        {/* Search Bar - Now interactive! */}
        <div className="w-full max-w-2xl relative mt-6">
          <div className="relative flex items-center w-full h-14 rounded-full bg-[#1e293b] border border-slate-700/50 shadow-inner overflow-hidden focus-within:border-slate-500 transition-colors pl-5 pr-1.5 py-1.5 hover:border-slate-500 cursor-pointer"
               onClick={() => window.dispatchEvent(new Event("open-search-modal"))}
          >
            <Search className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
            <input
              type="text"
              readOnly
              placeholder="Search 3000+ tools (e.g., 'tax', 'merge pdf')..."
              className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 placeholder:text-slate-500 h-full w-full text-base cursor-pointer"
            />
            <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-full px-7 h-full font-medium ml-2 shrink-0 pointer-events-none">
              Ask AI
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 text-xs font-semibold text-slate-400 pt-4 flex-wrap">
          <span className="tracking-widest text-[10px] uppercase mr-1">Popular:</span>
          {["PDF Merge", "Price Calc", "JSON Formatter", "EMI Calc"].map((tag) => (
            <span key={tag} onClick={() => window.dispatchEvent(new Event("open-search-modal"))} className="px-4 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/40 hover:bg-slate-700 transition-colors cursor-pointer text-slate-300">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <div className="w-full pt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Explore Categories</h2>
          <Link href="/categories" className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
            View all 80+ <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} key={category.name}>
                <Card className="flex items-center gap-4 p-5 bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600 transition-all cursor-pointer group rounded-xl shadow-sm h-full">
                  <div className={`p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 group-hover:scale-110 transition-transform ${category.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base line-clamp-1">{category.name}</h3>
                    <p className="text-slate-400 text-xs mt-0.5">{category.count}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}