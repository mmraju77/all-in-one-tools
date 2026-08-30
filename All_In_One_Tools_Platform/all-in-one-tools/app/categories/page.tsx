import Link from "next/link";
import { allToolsList } from "@/lib/all-tools";
import { Activity, ArrowRight, Wrench, Search, PlaySquare, Globe, Type, ImageIcon, FileText, Code2, Share2, ShoppingCart, Megaphone, Briefcase, Mail, GraduationCap, Languages, CalendarCheck, Calculator, HeartPulse, Scale, Users, ShieldAlert, FolderOpen, Workflow, Table, Database, Network, Palette, LineChart, Video, Headphones, Camera, PenTool, Home, Car, Plane, CloudSun, Newspaper, ShoppingBag, Landmark, Coins, TrendingUp, Receipt, HardHat, Cog, FlaskConical, Sigma, Ruler, CalendarDays, Globe2, Navigation, Stethoscope, Apple, Dumbbell, Baby, PawPrint, Gamepad2, Trophy, BookOpen, Building2, Package, PhoneCall, Cloud, Monitor, Smartphone, Compass, ScanSearch, Rocket, BarChart3, BrainCircuit, Wifi, Factory, HeartHandshake, ClipboardCheck, Fingerprint, Building, Boxes, Umbrella, Banknote, Target, Store, Utensils } from "lucide-react";

export default function AllCategoriesPage() {
  const uniqueCategories = Array.from(new Set(allToolsList.map(t => t.category))).sort();

  const getCategoryIcon = (safeSlug: string) => {
    const baseClass = "h-5 w-5";
    if (safeSlug.includes("hospitality") || safeSlug.includes("restaurant")) return <Utensils className={`${baseClass} text-orange-500`} />;
    if (safeSlug.includes("retail") || safeSlug.includes("store")) return <Store className={`${baseClass} text-fuchsia-500`} />;
    if (safeSlug.includes("consulting") || safeSlug.includes("professional services")) return <Briefcase className={`${baseClass} text-amber-400`} />;
    if (safeSlug.includes("compliance management")) return <ClipboardCheck className={`${baseClass} text-emerald-400`} />;
    if (safeSlug.includes("procurement") || safeSlug.includes("purchasing")) return <ShoppingCart className={`${baseClass} text-teal-400`} />;
    if (safeSlug.includes("project management")) return <Compass className={`${baseClass} text-teal-400`} />;
    if (safeSlug.includes("product management")) return <Target className={`${baseClass} text-indigo-400`} />;
    if (safeSlug.includes("public relations") || safeSlug.includes("media relations") || safeSlug.includes("pr ")) return <Megaphone className={`${baseClass} text-orange-400`} />;
    if (safeSlug.includes("payroll") || safeSlug.includes("compensation")) return <Banknote className={`${baseClass} text-emerald-400`} />;
    if (safeSlug.includes("insurance")) return <Umbrella className={`${baseClass} text-sky-400`} />;
    if (safeSlug.includes("healthcare administration") || safeSlug.includes("clinic")) return <Stethoscope className={`${baseClass} text-rose-400`} />;
    if (safeSlug.includes("supply") || safeSlug.includes("chain")) return <Boxes className={`${baseClass} text-sky-400`} />;
    if (safeSlug.includes("facility") || safeSlug.includes("workplace")) return <Building className={`${baseClass} text-indigo-400`} />;
    if (safeSlug.includes("identity") || safeSlug.includes("access")) return <Fingerprint className={`${baseClass} text-indigo-400`} />;
    if (safeSlug.includes("compliance") || safeSlug.includes("governance")) return <ClipboardCheck className={`${baseClass} text-emerald-400`} />;
    if (safeSlug.includes("customer support") || safeSlug.includes("helpdesk")) return <Headphones className={`${baseClass} text-sky-400`} />;
    if (safeSlug.includes("customer success") || safeSlug.includes("csm")) return <HeartHandshake className={`${baseClass} text-pink-400`} />;
    if (safeSlug.includes("ab testing") || safeSlug.includes("experiment")) return <FlaskConical className={`${baseClass} text-fuchsia-400`} />;
    if (safeSlug.includes("manufacturing") || safeSlug.includes("factory")) return <Factory className={`${baseClass} text-orange-500`} />;
    if (safeSlug.includes("iot") || safeSlug.includes("sensor")) return <Wifi className={`${baseClass} text-teal-400`} />;
    if (safeSlug.includes("cybersecurity") || safeSlug.includes("cyber") || safeSlug.includes("security")) return <ShieldAlert className={`${baseClass} text-rose-400`} />;
    if (safeSlug.includes("data science") || safeSlug.includes("statistic")) return <LineChart className={`${baseClass} text-sky-400`} />;
    if (safeSlug.includes("machine learning") || safeSlug.includes("dataset")) return <BrainCircuit className={`${baseClass} text-indigo-400`} />;
    if (safeSlug.includes("business intelligence") || safeSlug.includes("kpi")) return <BarChart3 className={`${baseClass} text-emerald-400`} />;
    if (safeSlug.includes("startup") || safeSlug.includes("founder")) return <Rocket className={`${baseClass} text-amber-400`} />;
    if (safeSlug.includes("no-code") || safeSlug.includes("automation") || safeSlug.includes("workflow")) return <Workflow className={`${baseClass} text-indigo-400`} />;
    if (safeSlug.includes("collaborat") || safeSlug.includes("team") || safeSlug.includes("raci")) return <Users className={`${baseClass} text-violet-400`} />;
    if (safeSlug.includes("search") || safeSlug.includes("research") || safeSlug.includes("query")) return <ScanSearch className={`${baseClass} text-orange-400`} />;
    if (safeSlug.includes("browser") || safeSlug.includes("url") || safeSlug.includes("http")) return <Compass className={`${baseClass} text-teal-400`} />;
    if (safeSlug.includes("app") || safeSlug.includes("mobile") || safeSlug.includes("android")) return <Smartphone className={`${baseClass} text-teal-400`} />;
    if (safeSlug.includes("system") || safeSlug.includes("os ") || safeSlug.includes("hardware")) return <Monitor className={`${baseClass} text-emerald-400`} />;
    if (safeSlug.includes("cloud") || safeSlug.includes("devops") || safeSlug.includes("aws")) return <Cloud className={`${baseClass} text-sky-400`} />;
    if (safeSlug.includes("communication") || safeSlug.includes("message") || safeSlug.includes("contact")) return <PhoneCall className={`${baseClass} text-indigo-400`} />;
    if (safeSlug.includes("logistic") || safeSlug.includes("shipping")) return <Package className={`${baseClass} text-blue-400`} />;
    if (safeSlug.includes("gov") || safeSlug.includes("public") || safeSlug.includes("citizen")) return <Building2 className={`${baseClass} text-emerald-500`} />;
    if (safeSlug.includes("student") || safeSlug.includes("academic") || safeSlug.includes("study")) return <GraduationCap className={`${baseClass} text-yellow-500`} />;
    if (safeSlug.includes("book") || safeSlug.includes("read") || safeSlug.includes("library")) return <BookOpen className={`${baseClass} text-sky-400`} />;
    if (safeSlug.includes("sport") || safeSlug.includes("athlet") || safeSlug.includes("tournament")) return <Trophy className={`${baseClass} text-yellow-400`} />;
    if (safeSlug.includes("gaming") || safeSlug.includes("game")) return <Gamepad2 className={`${baseClass} text-purple-500`} />;
    if (safeSlug.includes("pet") || safeSlug.includes("dog") || safeSlug.includes("cat")) return <PawPrint className={`${baseClass} text-orange-400`} />;
    if (safeSlug.includes("parent") || safeSlug.includes("baby") || safeSlug.includes("child")) return <Baby className={`${baseClass} text-pink-400`} />;
    if (safeSlug.includes("workout") || safeSlug.includes("fitness")) return <Dumbbell className={`${baseClass} text-orange-400`} />;
    if (safeSlug.includes("nutrition") || safeSlug.includes("diet")) return <Apple className={`${baseClass} text-red-400`} />;
    if (safeSlug.includes("medic") || safeSlug.includes("health")) return <Stethoscope className={`${baseClass} text-rose-400`} />;
    if (safeSlug.includes("map") || safeSlug.includes("location")) return <Navigation className={`${baseClass} text-sky-400`} />;
    if (safeSlug.includes("geograph")) return <Globe2 className={`${baseClass} text-emerald-400`} />;
    if (safeSlug.includes("date") || safeSlug.includes("time")) return <CalendarDays className={`${baseClass} text-sky-400`} />;
    if (safeSlug.includes("unit") || safeSlug.includes("conver")) return <Ruler className={`${baseClass} text-pink-400`} />;
    if (safeSlug.includes("math") || safeSlug.includes("algebra")) return <Sigma className={`${baseClass} text-indigo-400`} />;
    if (safeSlug.includes("science") || safeSlug.includes("physics")) return <FlaskConical className={`${baseClass} text-sky-400`} />;
    if (safeSlug.includes("engineer")) return <Cog className={`${baseClass} text-indigo-400`} />;
    if (safeSlug.includes("construction")) return <HardHat className={`${baseClass} text-yellow-500`} />;
    if (safeSlug.includes("tax") || safeSlug.includes("accounting")) return <Receipt className={`${baseClass} text-emerald-400`} />;
    if (safeSlug.includes("stock") || safeSlug.includes("market")) return <TrendingUp className={`${baseClass} text-emerald-400`} />;
    if (safeSlug.includes("crypto")) return <Coins className={`${baseClass} text-amber-400`} />;
    if (safeSlug.includes("bank")) return <Landmark className={`${baseClass} text-emerald-400`} />;
    if (safeSlug.includes("finance")) return <Activity className={`${baseClass} text-emerald-400`} />;
    if (safeSlug.includes("seo")) return <Search className={`${baseClass} text-purple-400`} />;
    
    return <Wrench className={`${baseClass} text-blue-400`} />;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 flex items-center justify-center gap-3">
            <LayoutGrid className="h-10 w-10 text-emerald-400" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              All Tool Categories
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Explore our massive collection of free online tools organized by category. 
            Find exactly what you need to boost your productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uniqueCategories.map((cat, index) => {
            const catSlug = cat.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            const safeSlug = cat.toLowerCase();
            const toolsCount = allToolsList.filter(t => t.category === cat).length;

            return (
              <Link 
                key={index} 
                href={`/category/${catSlug}`} 
                className="group relative p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors"></div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 group-hover:border-emerald-500/30 transition-colors shadow-inner relative z-10">
                    {getCategoryIcon(safeSlug)}
                  </div>
                  <h3 className="font-bold text-lg text-slate-200 group-hover:text-white transition-colors relative z-10 leading-tight pr-4">
                    {cat}
                  </h3>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-800/50 relative z-10">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold tracking-wide border border-emerald-500/20">
                    {toolsCount} Tools
                  </span>
                  <span className="text-slate-500 text-xs font-medium group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                    Explore <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}

function LayoutGrid(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}