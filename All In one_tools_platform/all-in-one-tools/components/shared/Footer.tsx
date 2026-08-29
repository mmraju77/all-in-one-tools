"use client";

import { useState } from "react";
import Link from "next/link";
import { Layers, Globe, ChevronDown, Mail } from "lucide-react";

export default function Footer() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English (US)");
  const languages = [
    "English (US)", 
    "Telugu (తెలుగు)", 
    "Hindi (हिन्दी)", 
    "Spanish (ES)", 
    "French (FR)", 
    "German (DE)"
  ];

  return (
    <footer className="bg-[#0a0f1c] border-t border-slate-800/60 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* 6-Column Grid for perfect horizontal alignment */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 mb-16">
          
          {/* Brand & Description (Takes 2 columns) */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group outline-none mb-6">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-all">
                <Layers className="h-5 w-5 text-white relative z-10" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                Multi Tools Engine<span className="text-blue-500">.</span>
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              The world's largest free utility platform. Over <strong className="text-white">10,000+</strong> secure, fast, and professional tools for creators, developers, and businesses.
            </p>

            <div className="relative inline-block">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-lg text-sm text-slate-300 transition-colors"
              >
                <Globe className="h-4 w-4 text-slate-400" />
                {selectedLang}
                <ChevronDown className="h-4 w-4 text-slate-500 ml-1" />
              </button>

              {isLangOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        selectedLang === lang ? 'bg-blue-500/10 text-blue-400' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Top Categories */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-5 whitespace-nowrap">Top Categories</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/category/ai-tools" className="hover:text-blue-400 transition-colors">AI Tools</Link></li>
              <li><Link href="/category/pdf-tools" className="hover:text-blue-400 transition-colors">PDF Utilities</Link></li>
              <li><Link href="/category/youtube-tools" className="hover:text-blue-400 transition-colors">YouTube SEO</Link></li>
              <li><Link href="/category/image-tools" className="hover:text-blue-400 transition-colors">Image Editors</Link></li>
              <li><Link href="/category/developer-tools" className="hover:text-blue-400 transition-colors">Developer Tools</Link></li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-5 whitespace-nowrap">Popular Tools</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/tool/tax-calculator-pro" className="hover:text-blue-400 transition-colors">Tax Calculator</Link></li>
              <li><Link href="/tool/youtube-thumbnail-downloader" className="hover:text-blue-400 transition-colors">Thumbnail Downloader</Link></li>
              <li><Link href="/tool/pdf-merge-engine" className="hover:text-blue-400 transition-colors">Merge PDF</Link></li>
              <li><Link href="/tool/json-formatter-pro" className="hover:text-blue-400 transition-colors">JSON Formatter</Link></li>
              <li><Link href="/tool/word-counter" className="hover:text-blue-400 transition-colors">Word Counter</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-5 whitespace-nowrap">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Guides</Link></li>
              <li><Link href="/developer-api" className="hover:text-white transition-colors">Developer API</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing & Pro</Link></li>
              <li><Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
              <li><Link href="/request-tool" className="hover:text-white transition-colors">Request a Tool</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-5 whitespace-nowrap">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Multi Tools Engine Platform. All rights reserved. Built for creators.
          </p>
          <Link href="/contact" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
            <Mail className="h-4 w-4" /> Contact Support
          </Link>
        </div>
      </div>
    </footer>
  );
}