"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { allToolsList } from "@/lib/all-tools"; 
import { 
  Search, 
  Mic, 
  TrendingUp, 
  Sparkles, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Code, 
  Cpu, 
  Shield, 
  ArrowRight,
  MonitorPlay,
  Calculator,
  LayoutGrid,
  Palette,
  Scissors,
  Terminal,
  FileJson,
  X 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [showVoiceDialog, setShowVoiceDialog] = useState(false);

  const handleSearchClick = () => {
    window.dispatchEvent(new CustomEvent("open-search-modal"));
  };

  const handleVoiceSearch = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support Voice Search. Try Google Chrome or Microsoft Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = window.navigator.language || "en-IN"; 
    recognition.interimResults = false;
    recognition.maxAlternatives = 3; 

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      setVoiceText(transcript);
      setShowVoiceDialog(true);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      if (event.error === 'not-allowed') {
        alert("Microphone access denied. Please allow microphone access in your browser settings.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const confirmVoiceSearch = () => {
    setShowVoiceDialog(false);
    
    if (!voiceText.trim()) return;

    const searchWords = voiceText.toLowerCase().trim().split(/\s+/);
    
    const exactMatch = allToolsList.find(t => {
      const toolName = t.name.toLowerCase();
      return searchWords.every(word => toolName.includes(word));
    });

    if (exactMatch) {
      router.push(`/tool/${exactMatch.slug}`);
    } else {
      window.dispatchEvent(new CustomEvent("open-search-modal", { detail: voiceText }));
    }
  };

  const trendingTags = [
    { name: "YouTube Downloader", url: "/tool/youtube-thumbnail-downloader" },
    { name: "Image Compressor", url: "/tool/bulk-image-compressor" },
    { name: "JSON Formatter", url: "/tool/json-formatter-pro" },
    { name: "Word Counter", url: "/tool/word-counter" }
  ];

  const topCategories = [
    { name: "AI Tools", icon: Cpu, color: "text-blue-400", bg: "bg-blue-500/10", link: "/category/ai-tools" },
    { name: "YouTube", icon: Video, color: "text-red-400", bg: "bg-red-500/10", link: "/category/youtube-tools" },
    { name: "PDF Tools", icon: FileText, color: "text-rose-400", bg: "bg-rose-500/10", link: "/category/pdf-tools" },
    { name: "SEO Tools", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", link: "/category/seo-tools" },
    { name: "Image Editors", icon: ImageIcon, color: "text-purple-400", bg: "bg-purple-500/10", link: "/category/image-tools" },
    { name: "Developer", icon: Code, color: "text-amber-400", bg: "bg-amber-500/10", link: "/category/developer-tools" },
    { name: "Security", icon: Shield, color: "text-cyan-400", bg: "bg-cyan-500/10", link: "/category/cybersecurity-tools" },
    { name: "Calculators", icon: Calculator, color: "text-orange-400", bg: "bg-orange-500/10", link: "/category/finance-tools" },
  ];

  // 🚀 FIXED: Added actual URLs to Editor's Choice Tools
  const editorsChoiceTools = [
    { name: "YouTube Tags Extractor", desc: "Extract high-ranking tags instantly", icon: MonitorPlay, color: "text-red-400", bgHover: "group-hover:bg-red-500/20", url: "/tool/youtube-tags-extractor" },
    { name: "CSS Gradient Generator", desc: "Create beautiful CSS gradients", icon: Palette, color: "text-pink-400", bgHover: "group-hover:bg-pink-500/20", url: "/tool/css-gradient-generator" },
    { name: "JSON Formatter Pro", desc: "Format and validate JSON data", icon: FileJson, color: "text-emerald-400", bgHover: "group-hover:bg-emerald-500/20", url: "/tool/json-formatter-pro" },
    { name: "Bulk Image Compressor", desc: "Compress images without losing quality", icon: ImageIcon, color: "text-blue-400", bgHover: "group-hover:bg-blue-500/20", url: "/tool/bulk-image-compressor" },
  ];

  // 🚀 FIXED: Added actual URLs to New AI Tools
  const newAiToolsList = [
    { name: "AI Content Detector", desc: "Check if text is human or AI generated", icon: Cpu, color: "text-purple-400", bgHover: "group-hover:bg-purple-500/20", url: "/tool/ai-content-detector" },
    { name: "Midjourney Prompt Maker", desc: "Generate perfect AI image prompts", icon: Sparkles, color: "text-cyan-400", bgHover: "group-hover:bg-cyan-500/20", url: "/tool/midjourney-prompt-maker" },
    { name: "Smart Background Remover", desc: "Erase image backgrounds using AI", icon: Scissors, color: "text-orange-400", bgHover: "group-hover:bg-orange-500/20", url: "/tool/smart-background-remover" },
    { name: "Code Explainer AI", desc: "Understand complex code snippets", icon: Terminal, color: "text-green-400", bgHover: "group-hover:bg-green-500/20", url: "/tool/code-explainer-ai" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300">
      
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            What do you want to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">do today?</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Your ultimate workflow engine. Access <span className="text-white font-bold tracking-wide">10,000+</span> enterprise-grade web utilities in a single workspace. <br className="hidden md:block" />
            No installations. No friction. <span className="text-emerald-400 font-semibold">100% free forever.</span>
          </p>

          <div 
            onClick={handleSearchClick}
            className="w-full h-16 sm:h-20 bg-slate-900/60 backdrop-blur-xl border-2 border-slate-700/50 hover:border-blue-500/50 rounded-2xl flex items-center px-4 sm:px-6 shadow-2xl shadow-black/50 cursor-text transition-all group"
          >
            <Search className="h-6 w-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
            <div className="flex-1 text-left pl-4 text-slate-500 text-base sm:text-lg">
              Search for tools (e.g., 'PDF Merge', 'Tax Calculator')...
            </div>
            
            <button 
              onClick={handleVoiceSearch}
              className={`hidden sm:flex items-center justify-center h-12 w-12 rounded-xl transition-all ml-2 ${
                isListening 
                  ? 'bg-red-500/20 text-red-500 animate-pulse border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-transparent'
              }`} 
              title="Voice Search"
            >
              <Mic className="h-5 w-5" />
            </button>
            
            <Button className="hidden sm:flex ml-3 h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-900/20">
              Search
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-base font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
              <TrendingUp className="h-5 w-5" /> Trending:
            </span>
            {trendingTags.map((tag) => (
              <button 
                key={tag.name} 
                onClick={() => router.push(tag.url)}
                className="px-5 py-2 rounded-full bg-slate-800/60 border border-slate-700/80 hover:bg-slate-700 hover:border-slate-500 hover:text-white text-sm font-medium text-slate-300 transition-all shadow-sm"
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Glassmorphism Category Grid */}
      <section className="py-16 px-6 border-t border-slate-800/50 bg-slate-900/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <LayoutGrid className="h-6 w-6 text-blue-400" /> Browse by Category
              </h2>
              <p className="text-sm text-slate-400">Explore our massive collection of utility categories.</p>
            </div>
            <Link href="/categories" className="hidden sm:flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              View All 100 Categories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {topCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.name} href={cat.link} className="group relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-700/50 p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:border-slate-600 transition-all duration-300">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${cat.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${cat.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">{cat.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">100+ Tools</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. Popular Collections Cards */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Master Collections</h2>
            <p className="text-sm text-slate-400">Our biggest hubs for specific industry needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div onClick={() => router.push('/category/seo-tools')} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-900/50 p-8 group hover:border-emerald-500/50 transition-colors cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors" />
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                <TrendingUp className="h-7 w-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">The Ultimate SEO Hub</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">Boost your rankings with 100+ SEO auditing, keyword, and backlink tools.</p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-400 group-hover:gap-2 transition-all">Explore SEO Tools <ArrowRight className="h-4 w-4" /></span>
            </div>

            <div onClick={() => router.push('/category/pdf-tools')} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-900/40 to-slate-900 border border-rose-900/50 p-8 group hover:border-rose-500/50 transition-colors cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-colors" />
              <div className="h-14 w-14 rounded-2xl bg-rose-500/20 flex items-center justify-center mb-6 border border-rose-500/30">
                <FileText className="h-7 w-7 text-rose-400" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">Advanced PDF Suite</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">Merge, split, compress, and edit PDFs with 100+ secure document tools.</p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-rose-400 group-hover:gap-2 transition-all">Explore PDF Tools <ArrowRight className="h-4 w-4" /></span>
            </div>

            <div onClick={() => router.push('/category/image-tools')} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-900/50 p-8 group hover:border-purple-500/50 transition-colors cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors" />
              <div className="h-14 w-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                <ImageIcon className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">Image Processing Pro</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">Convert formats, compress sizes, and edit graphics with 100+ image utilities.</p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-purple-400 group-hover:gap-2 transition-all">Explore Image Tools <ArrowRight className="h-4 w-4" /></span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Collections */}
      <section className="py-16 px-6 border-t border-slate-800/50 bg-slate-950">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          
          <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-400" /> Editor's Choice
            </h2>
            <div className="space-y-4">
              {editorsChoiceTools.map((tool, idx) => {
                const Icon = tool.icon;
                return (
                  // 🚀 FIXED: Added onClick routing to each card
                  <div key={`editor-${idx}`} onClick={() => router.push(tool.url)} className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-600 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center transition-colors ${tool.bgHover}`}>
                        <Icon className={`h-5 w-5 text-slate-400 transition-colors ${tool.color.replace('text-', 'group-hover:text-')}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-200 group-hover:text-white">{tool.name}</h4>
                        <p className="text-xs text-slate-500">{tool.desc}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-400 hover:text-white">Use Tool</Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-400" /> New AI Tools
            </h2>
            <div className="space-y-4">
              {newAiToolsList.map((tool, idx) => {
                const Icon = tool.icon;
                return (
                  // 🚀 FIXED: Added onClick routing to each card
                  <div key={`ai-${idx}`} onClick={() => router.push(tool.url)} className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-600 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center transition-colors ${tool.bgHover}`}>
                        <Icon className={`h-5 w-5 text-slate-400 transition-colors ${tool.color.replace('text-', 'group-hover:text-')}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-200 group-hover:text-white">{tool.name}</h4>
                        <p className="text-xs text-slate-500">{tool.desc}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase rounded-md border border-blue-500/20">New</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 🚀 CUSTOM VOICE SEARCH MODAL */}
      {showVoiceDialog && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-2xl max-w-sm w-full mx-auto relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowVoiceDialog(false)} 
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-6 mt-2 text-center">
              <div className="mx-auto w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Voice Recognized</h3>
              <p className="text-slate-400 text-sm mb-4">Did we hear this correctly?</p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
                <p className="text-blue-300 font-semibold text-lg break-words">"{voiceText}"</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowVoiceDialog(false)} className="flex-1 bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl">
                Cancel
              </Button>
              <Button onClick={confirmVoiceSearch} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-900/20">
                Search This
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}