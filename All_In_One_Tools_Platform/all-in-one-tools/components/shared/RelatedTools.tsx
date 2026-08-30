"use client";

import Link from "next/link";
import { Wrench, ArrowRight, Zap, Activity, Search, PlaySquare, Globe, Type, ImageIcon, FileText, Code2, Share2, ShoppingCart, Megaphone, Briefcase, Mail, GraduationCap, Languages, CalendarCheck, Calculator, HeartPulse, Scale, Users, ShieldAlert, FolderOpen, Workflow, Table, Database, Network, Palette, LineChart, Video, Headphones, Camera, PenTool, Home, Car, Plane, CloudSun, Newspaper, ShoppingBag, Landmark, Coins, TrendingUp, Receipt, HardHat, Cog, FlaskConical, Sigma, Ruler, CalendarDays, Globe2, Navigation, Stethoscope, Apple, Dumbbell, Baby, PawPrint, Gamepad2, Trophy, BookOpen, Building2, Package, PhoneCall, Cloud, Monitor, Smartphone, Compass, ScanSearch, Rocket, BarChart3, BrainCircuit, Wifi, Factory, HeartHandshake, ClipboardCheck, Fingerprint, Building, Boxes, Umbrella, Banknote, Target, Store, Utensils } from "lucide-react";
import { allToolsList } from "@/lib/all-tools";

export default function RelatedTools({ category = "AI Tools", currentSlug = "" }: { category?: string, currentSlug?: string }) {
  
  // Strict category matching
  const categoryTools = allToolsList.filter(tool => 
    tool.category.toLowerCase().trim() === category.toLowerCase().trim() && 
    tool.slug.toLowerCase() !== currentSlug.toLowerCase()
  );

  const words = currentSlug.split('-');
  const mainKeyword = words[0] === 'ai' && words.length > 1 ? words[1] : words[0];
  
  const clusterFree = categoryTools.filter(tool => !tool.isPro && tool.slug.includes(mainKeyword));
  const otherFree = categoryTools.filter(tool => !tool.isPro && !tool.slug.includes(mainKeyword));
  const freeToolsToShow = [...clusterFree, ...otherFree].slice(0, 4);

  const clusterPro = categoryTools.filter(tool => tool.isPro && tool.slug.includes(mainKeyword));
  const otherPro = categoryTools.filter(tool => tool.isPro && !tool.slug.includes(mainKeyword));
  const proToolsToShow = [...clusterPro, ...otherPro].slice(0, 4);

  const relatedToolsToShow = [...freeToolsToShow, ...proToolsToShow];

  if (relatedToolsToShow.length === 0) return null;

  // FIXED: Using standard if statements to prevent AST stack overflow
  const getCategoryIcon = (cat: string) => {
    const baseClass = "h-5 w-5";
    if (cat === "Hospitality & Restaurant Operations Tools") return <Utensils className={`${baseClass} text-orange-500`} />;
    if (cat === "Retail Operations Tools") return <Store className={`${baseClass} text-fuchsia-500`} />;
    if (cat === "Consulting & Professional Services Tools") return <Briefcase className={`${baseClass} text-amber-400`} />;
    if (cat === "Compliance Management Tools") return <ClipboardCheck className={`${baseClass} text-emerald-400`} />;
    if (cat === "Procurement & Purchasing Tools") return <ShoppingCart className={`${baseClass} text-teal-400`} />;
    if (cat === "Project Management Tools") return <Compass className={`${baseClass} text-teal-400`} />;
    if (cat === "Product Management Tools") return <Target className={`${baseClass} text-indigo-400`} />;
    if (cat === "Public Relations & Media Relations Tools") return <Megaphone className={`${baseClass} text-orange-400`} />;
    if (cat === "Payroll & Compensation Tools") return <Banknote className={`${baseClass} text-emerald-400`} />;
    if (cat === "Insurance Tools") return <Umbrella className={`${baseClass} text-sky-400`} />;
    if (cat === "Healthcare Administration Tools") return <Stethoscope className={`${baseClass} text-rose-400`} />;
    if (cat === "Supply Chain Management Tools") return <Boxes className={`${baseClass} text-sky-400`} />;
    if (cat === "Facility & Workplace Management Tools") return <Building className={`${baseClass} text-indigo-400`} />;
    if (cat === "Identity & Access Management Tools") return <Fingerprint className={`${baseClass} text-indigo-400`} />;
    if (cat === "Compliance & Governance Tools") return <ClipboardCheck className={`${baseClass} text-emerald-400`} />;
    if (cat === "Procurement & Vendor Tools") return <ShoppingCart className={`${baseClass} text-teal-400`} />;
    if (cat === "Customer Support Tools") return <Headphones className={`${baseClass} text-sky-400`} />;
    if (cat === "Customer Success Tools") return <HeartHandshake className={`${baseClass} text-pink-400`} />;
    if (cat === "A/B Testing & Experimentation Tools") return <FlaskConical className={`${baseClass} text-fuchsia-400`} />;
    if (cat === "Manufacturing Tools") return <Factory className={`${baseClass} text-orange-500`} />;
    if (cat === "IoT Tools") return <Wifi className={`${baseClass} text-teal-400`} />;
    if (cat === "Cybersecurity Tools" || cat === "Security Tools") return <ShieldAlert className={`${baseClass} text-rose-400`} />;
    if (cat === "Data Science Tools") return <LineChart className={`${baseClass} text-sky-400`} />;
    if (cat === "Machine Learning Tools") return <BrainCircuit className={`${baseClass} text-indigo-400`} />;
    if (cat === "Business Intelligence Tools" || cat === "Analytics & SaaS Tools") return <BarChart3 className={`${baseClass} text-emerald-400`} />;
    if (cat === "Startup Resources Tools") return <Rocket className={`${baseClass} text-amber-400`} />;
    if (cat === "No-Code & Automation Tools" || cat === "AI Automation Tools") return <Workflow className={`${baseClass} text-indigo-400`} />;
    if (cat === "Collaboration Tools") return <Users className={`${baseClass} text-violet-400`} />;
    if (cat === "Search & Research Tools") return <ScanSearch className={`${baseClass} text-orange-400`} />;
    if (cat === "Browser Tools") return <Compass className={`${baseClass} text-teal-400`} />;
    if (cat === "Mobile App Tools") return <Smartphone className={`${baseClass} text-teal-400`} />;
    if (cat === "Operating System Tools") return <Monitor className={`${baseClass} text-emerald-400`} />;
    if (cat === "Cloud & DevOps Tools") return <Cloud className={`${baseClass} text-sky-400`} />;
    if (cat === "Communication Tools") return <PhoneCall className={`${baseClass} text-indigo-400`} />;
    if (cat === "Logistics & Shipping Tools") return <Package className={`${baseClass} text-blue-400`} />;
    if (cat === "Government & Public Service Tools") return <Building2 className={`${baseClass} text-emerald-500`} />;
    if (cat === "Student Tools") return <GraduationCap className={`${baseClass} text-yellow-500`} />;
    if (cat === "Book & Reading Tools") return <BookOpen className={`${baseClass} text-sky-400`} />;
    if (cat === "Sports Tools") return <Trophy className={`${baseClass} text-yellow-400`} />;
    if (cat === "Gaming Tools") return <Gamepad2 className={`${baseClass} text-purple-500`} />;
    if (cat === "Pet Care Tools") return <PawPrint className={`${baseClass} text-orange-400`} />;
    if (cat === "Parenting Tools") return <Baby className={`${baseClass} text-pink-400`} />;
    if (cat === "Workout & Fitness Planning Tools") return <Dumbbell className={`${baseClass} text-orange-400`} />;
    if (cat === "Nutrition Tools") return <Apple className={`${baseClass} text-red-400`} />;
    if (cat === "Medical Tools") return <Stethoscope className={`${baseClass} text-rose-400`} />;
    if (cat === "Maps & Location Tools") return <Navigation className={`${baseClass} text-sky-400`} />;
    if (cat === "Geography Tools") return <Globe2 className={`${baseClass} text-emerald-400`} />;
    if (cat === "Date & Time Tools") return <CalendarDays className={`${baseClass} text-sky-400`} />;
    if (cat === "Unit Conversion Tools") return <Ruler className={`${baseClass} text-pink-400`} />;
    if (cat === "Mathematics Tools") return <Sigma className={`${baseClass} text-indigo-400`} />;
    if (cat === "Science Tools") return <FlaskConical className={`${baseClass} text-sky-400`} />;
    if (cat === "Engineering Tools") return <Cog className={`${baseClass} text-indigo-400`} />;
    if (cat === "Construction Tools") return <HardHat className={`${baseClass} text-yellow-500`} />;
    if (cat === "Tax & Accounting Tools") return <Receipt className={`${baseClass} text-emerald-400`} />;
    if (cat === "Stock Market Tools") return <TrendingUp className={`${baseClass} text-emerald-400`} />;
    if (cat === "Cryptocurrency Tools") return <Coins className={`${baseClass} text-amber-400`} />;
    if (cat === "Banking Tools") return <Landmark className={`${baseClass} text-emerald-400`} />;
    if (cat === "Finance Tools") return <Activity className={`${baseClass} text-emerald-400`} />;
    if (cat === "SEO Tools") return <Search className={`${baseClass} text-purple-400`} />;
    
    return <Wrench className={`${baseClass} text-blue-400`} />;
  };

  return (
    <div className="mt-16 pt-10 border-t border-slate-800/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          {getCategoryIcon(category)}
          Related {category}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {relatedToolsToShow.map((tool, index) => (
          <Link key={`${tool.slug}-${index}`} href={`/tool/${tool.slug}`} className={`group p-5 rounded-3xl bg-slate-900/50 border ${tool.isPro ? 'border-purple-500/30 hover:border-purple-500/80' : 'border-slate-800 hover:border-emerald-500/50'} hover:bg-slate-800/50 transition-all flex flex-col justify-between h-full relative overflow-hidden`}>
            {tool.isPro && <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full pointer-events-none"></div>}
            
            <div className="relative z-10">
              <h4 className="font-semibold text-slate-200 group-hover:text-white mb-3 flex items-start justify-between gap-2">
                <span className="flex flex-col gap-2">
                  {tool.name}
                  {tool.isPro && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 text-[10px] text-white px-2 py-0.5 rounded-full font-bold tracking-wide w-fit shadow-lg shadow-purple-900/30">
                      <Zap className="h-3 w-3 fill-white" /> PRO
                    </span>
                  )}
                </span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0 text-slate-400 group-hover:text-white" />
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-2">
                {tool.isPro 
                  ? `Unlock premium capabilities with our advanced ${tool.name.toLowerCase()} engine.` 
                  : `Calculate and generate results instantly using our free ${tool.name.toLowerCase()} tool.`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}