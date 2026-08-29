import { allToolsList } from "@/lib/all-tools";
import Link from "next/link";
import { Activity, Wrench, Zap, Lock, Sparkles, ArrowRight, Search, PlaySquare, Globe, Type, ImageIcon, FileText, Code2, Share2, ShoppingCart, Megaphone, Briefcase, Mail, GraduationCap, Languages, CalendarCheck, Calculator, HeartPulse, Scale, Users, ShieldAlert, FolderOpen, Workflow, Table, Database, Network, Palette, LineChart, Video, Headphones, Camera, PenTool, Home, Car, Plane, CloudSun, Newspaper, ShoppingBag, Landmark, Coins, TrendingUp, Receipt, HardHat, Cog, FlaskConical, Sigma, Ruler, CalendarDays, Globe2, Navigation, Stethoscope, Apple, Dumbbell, Baby, PawPrint, Gamepad2, Trophy, BookOpen, Building2, Package, PhoneCall, Cloud, Monitor, Smartphone, Compass, ScanSearch, Rocket, BarChart3, BrainCircuit, Wifi, Factory, HeartHandshake, ClipboardCheck, Fingerprint, Building, Boxes, Umbrella, Banknote, Target, Store, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const safeSlug = decodeURIComponent(resolvedParams.slug || "tool").toLowerCase();

  let tools = allToolsList.filter(tool => {
    const cat = tool.category.toLowerCase();
    
    // NEW DYNAMIC EXACT MATCH LOGIC
    const expectedSlug = cat.replace(/ & /g, '-').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (safeSlug === expectedSlug) return true;

    // Simplified fallback matching to prevent compiler stack overflow
    if (safeSlug.includes("hospitality") || safeSlug.includes("restaurant")) return cat === "hospitality & restaurant operations tools";
    if (safeSlug.includes("retail") || safeSlug.includes("store")) return cat === "retail operations tools";
    if (safeSlug.includes("consulting") || safeSlug.includes("professional-services")) return cat === "consulting & professional services tools";
    if (safeSlug.includes("compliance-management")) return cat === "compliance management tools";
    if (safeSlug.includes("procurement") || safeSlug.includes("purchasing")) return cat === "procurement & purchasing tools";
    if (safeSlug.includes("project-management")) return cat === "project management tools";
    if (safeSlug.includes("product-management")) return cat === "product management tools";
    if (safeSlug.includes("public-relations") || safeSlug.includes("media-relations") || safeSlug.includes("pr-")) return cat === "public relations & media relations tools";
    if (safeSlug.includes("payroll") || safeSlug.includes("compensation")) return cat === "payroll & compensation tools";
    if (safeSlug.includes("insurance")) return cat === "insurance tools";
    if (safeSlug.includes("healthcare-administration") || safeSlug.includes("clinic")) return cat === "healthcare administration tools";
    if (safeSlug.includes("supply") || safeSlug.includes("chain")) return cat === "supply chain management tools";
    if (safeSlug.includes("facility") || safeSlug.includes("workplace")) return cat === "facility & workplace management tools";
    if (safeSlug.includes("identity") || safeSlug.includes("access")) return cat === "identity & access management tools";
    if (safeSlug.includes("compliance") || safeSlug.includes("governance")) return cat === "compliance & governance tools";
    if (safeSlug.includes("procurement") || safeSlug.includes("vendor")) return cat === "procurement & vendor tools";
    if (safeSlug.includes("customer-support") || safeSlug.includes("helpdesk")) return cat === "customer support tools";
    if (safeSlug.includes("customer-success") || safeSlug.includes("csm")) return cat === "customer success tools";
    if (safeSlug.includes("ab-testing") || safeSlug.includes("experiment")) return cat === "a/b testing & experimentation tools";
    if (safeSlug.includes("manufacturing") || safeSlug.includes("factory") || safeSlug.includes("production")) return cat === "manufacturing tools";
    if (safeSlug.includes("iot") || safeSlug.includes("sensor") || safeSlug.includes("mqtt") || safeSlug.includes("device")) return cat === "iot tools";
    if (safeSlug.includes("cybersecurity") || safeSlug.includes("cyber") || safeSlug.includes("security") || safeSlug.includes("protect")) return cat === "cybersecurity tools" || cat === "security tools";
    if (safeSlug.includes("data-science") || safeSlug.includes("statistic") || safeSlug.includes("probability") || safeSlug.includes("regression")) return cat === "data science tools";
    if (safeSlug.includes("machine-learning") || safeSlug.includes("dataset")) return cat === "machine learning tools";
    if (safeSlug.includes("business-intelligence") || safeSlug.includes("kpi")) return cat === "business intelligence tools" || cat === "analytics & saas tools";
    if (safeSlug.includes("startup") || safeSlug.includes("founder")) return cat === "startup resources tools" || cat === "business tools";
    if (safeSlug.includes("no-code") || safeSlug.includes("automation")) return cat === "no-code & automation tools" || cat === "ai automation tools";
    if (safeSlug.includes("collaborat") || safeSlug.includes("team")) return cat === "collaboration tools";
    if (safeSlug.includes("search") || safeSlug.includes("research")) return cat === "search & research tools";
    if (safeSlug.includes("browser") || safeSlug.includes("url")) return cat === "browser tools";
    if (safeSlug.includes("app") || safeSlug.includes("mobile")) return cat === "mobile app tools";
    if (safeSlug.includes("system") || safeSlug.includes("os-") || safeSlug.includes("hardware")) return cat === "operating system tools";
    if (safeSlug.includes("cloud") || safeSlug.includes("devops")) return cat === "cloud & devops tools";
    if (safeSlug.includes("communication") || safeSlug.includes("message")) return cat === "communication tools";
    if (safeSlug.includes("logistic") || safeSlug.includes("shipping")) return cat === "logistics & shipping tools";
    if (safeSlug.includes("gov") || safeSlug.includes("public") || safeSlug.includes("citizen")) return cat === "government & public service tools";
    if (safeSlug.includes("student") || safeSlug.includes("academic")) return cat === "student tools";
    if (safeSlug.includes("book") || safeSlug.includes("read") || safeSlug.includes("library")) return cat === "book & reading tools";
    if (safeSlug.includes("sport") || safeSlug.includes("athlet")) return cat === "sports tools";
    if (safeSlug.includes("gaming") || safeSlug.includes("game")) return cat === "gaming tools";
    if (safeSlug.includes("pet") || safeSlug.includes("dog") || safeSlug.includes("cat")) return cat === "pet care tools";
    if (safeSlug.includes("parent") || safeSlug.includes("baby") || safeSlug.includes("child")) return cat === "parenting tools";
    if (safeSlug.includes("workout") || safeSlug.includes("fitness")) return cat === "workout & fitness planning tools";
    if (safeSlug.includes("nutrition") || safeSlug.includes("diet")) return cat === "nutrition tools";
    if (safeSlug.includes("medic") || safeSlug.includes("health")) return cat === "medical tools";
    if (safeSlug.includes("map") || safeSlug.includes("location")) return cat === "maps & location tools";
    if (safeSlug.includes("geograph")) return cat === "geography tools";
    if (safeSlug.includes("date") || safeSlug.includes("time")) return cat === "date & time tools";
    if (safeSlug.includes("unit") || safeSlug.includes("conver")) return cat === "unit conversion tools";
    if (safeSlug.includes("math") || safeSlug.includes("algebra")) return cat === "mathematics tools";
    if (safeSlug.includes("science") || safeSlug.includes("physics")) return cat === "science tools";
    if (safeSlug.includes("engineer")) return cat === "engineering tools";
    if (safeSlug.includes("construction")) return cat === "construction tools";
    if (safeSlug.includes("tax") || safeSlug.includes("accounting")) return cat === "tax & accounting tools";
    if (safeSlug.includes("stock") || safeSlug.includes("market")) return cat === "stock market tools";
    if (safeSlug.includes("crypto")) return cat === "cryptocurrency tools";
    if (safeSlug.includes("bank")) return cat === "banking tools";
    if (safeSlug.includes("finance")) return cat === "finance tools";
    if (safeSlug.includes("seo")) return cat === "seo tools";
    
    return false;
  });

  const categoryName = decodeURIComponent(resolvedParams.slug)
    .replace(/-/g, ' ') 
    .replace(/&/g, ' & ') 
    .replace(/\s+/g, ' ') 
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const freeTools = tools.filter(tool => !tool.isPro);
  const proTools = tools.filter(tool => tool.isPro);

  if (tools.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <h2 className="text-2xl text-slate-400">More tools coming soon to this category!</h2>
      </div>
    );
  }

  const getCategoryIcon = (slugStr: string) => {
    const baseClass = "h-6 w-6";
    if (slugStr.includes("hospitality") || slugStr.includes("restaurant")) return <Utensils className={`${baseClass} text-orange-500`} />;
    if (slugStr.includes("retail") || slugStr.includes("store")) return <Store className={`${baseClass} text-fuchsia-500`} />;
    if (slugStr.includes("consulting") || slugStr.includes("professional-services")) return <Briefcase className={`${baseClass} text-amber-400`} />;
    if (slugStr.includes("compliance-management")) return <ClipboardCheck className={`${baseClass} text-emerald-400`} />;
    if (slugStr.includes("procurement") || slugStr.includes("purchasing")) return <ShoppingCart className={`${baseClass} text-teal-400`} />;
    if (slugStr.includes("project-management")) return <Compass className={`${baseClass} text-teal-400`} />;
    if (slugStr.includes("product-management")) return <Target className={`${baseClass} text-indigo-400`} />;
    if (slugStr.includes("public-relations") || slugStr.includes("media-relations") || slugStr.includes("pr-")) return <Megaphone className={`${baseClass} text-orange-400`} />;
    if (slugStr.includes("payroll") || slugStr.includes("compensation")) return <Banknote className={`${baseClass} text-emerald-400`} />;
    if (slugStr.includes("insurance")) return <Umbrella className={`${baseClass} text-sky-400`} />;
    if (slugStr.includes("healthcare-administration") || slugStr.includes("clinic")) return <Stethoscope className={`${baseClass} text-rose-400`} />;
    if (slugStr.includes("supply") || slugStr.includes("chain")) return <Boxes className={`${baseClass} text-sky-400`} />;
    if (slugStr.includes("facility") || slugStr.includes("workplace")) return <Building className={`${baseClass} text-indigo-400`} />;
    if (slugStr.includes("identity") || slugStr.includes("access")) return <Fingerprint className={`${baseClass} text-indigo-400`} />;
    if (slugStr.includes("compliance") || slugStr.includes("governance")) return <ClipboardCheck className={`${baseClass} text-emerald-400`} />;
    if (slugStr.includes("customer-support") || slugStr.includes("helpdesk")) return <Headphones className={`${baseClass} text-sky-400`} />;
    if (slugStr.includes("customer-success") || slugStr.includes("csm")) return <HeartHandshake className={`${baseClass} text-pink-400`} />;
    if (slugStr.includes("ab-testing") || slugStr.includes("experiment")) return <FlaskConical className={`${baseClass} text-fuchsia-400`} />;
    if (slugStr.includes("manufacturing") || slugStr.includes("factory") || slugStr.includes("production")) return <Factory className={`${baseClass} text-orange-500`} />;
    if (slugStr.includes("iot") || slugStr.includes("sensor") || slugStr.includes("mqtt") || slugStr.includes("device")) return <Wifi className={`${baseClass} text-teal-400`} />;
    if (slugStr.includes("cybersecurity") || slugStr.includes("cyber") || slugStr.includes("security") || slugStr.includes("protect")) return <ShieldAlert className={`${baseClass} text-rose-400`} />;
    if (slugStr.includes("data-science") || slugStr.includes("statistic") || slugStr.includes("probability") || slugStr.includes("regression")) return <LineChart className={`${baseClass} text-sky-400`} />;
    if (slugStr.includes("machine-learning") || slugStr.includes("dataset")) return <BrainCircuit className={`${baseClass} text-indigo-400`} />;
    if (slugStr.includes("business-intelligence") || slugStr.includes("kpi")) return <BarChart3 className={`${baseClass} text-emerald-400`} />;
    if (slugStr.includes("startup") || slugStr.includes("founder")) return <Rocket className={`${baseClass} text-amber-400`} />;
    if (slugStr.includes("no-code") || slugStr.includes("automation")) return <Workflow className={`${baseClass} text-indigo-400`} />;
    if (slugStr.includes("collaborat") || slugStr.includes("team")) return <Users className={`${baseClass} text-violet-400`} />;
    if (slugStr.includes("search") || slugStr.includes("research")) return <ScanSearch className={`${baseClass} text-orange-400`} />;
    if (slugStr.includes("browser") || slugStr.includes("url")) return <Compass className={`${baseClass} text-teal-400`} />;
    if (slugStr.includes("app") || slugStr.includes("mobile")) return <Smartphone className={`${baseClass} text-teal-400`} />;
    if (slugStr.includes("system") || slugStr.includes("os-") || slugStr.includes("hardware")) return <Monitor className={`${baseClass} text-emerald-400`} />;
    if (slugStr.includes("cloud") || slugStr.includes("devops")) return <Cloud className={`${baseClass} text-sky-400`} />;
    if (slugStr.includes("communication") || slugStr.includes("message")) return <PhoneCall className={`${baseClass} text-indigo-400`} />;
    if (slugStr.includes("logistic") || slugStr.includes("shipping")) return <Package className={`${baseClass} text-blue-400`} />;
    if (slugStr.includes("gov") || slugStr.includes("public") || slugStr.includes("citizen")) return <Building2 className={`${baseClass} text-emerald-500`} />;
    if (slugStr.includes("student") || slugStr.includes("academic")) return <GraduationCap className={`${baseClass} text-yellow-500`} />;
    if (slugStr.includes("book") || slugStr.includes("read") || slugStr.includes("library")) return <BookOpen className={`${baseClass} text-sky-400`} />;
    if (slugStr.includes("sport") || slugStr.includes("athlet")) return <Trophy className={`${baseClass} text-yellow-400`} />;
    if (slugStr.includes("gaming") || slugStr.includes("game")) return <Gamepad2 className={`${baseClass} text-purple-500`} />;
    if (slugStr.includes("pet") || slugStr.includes("dog") || slugStr.includes("cat")) return <PawPrint className={`${baseClass} text-orange-400`} />;
    if (slugStr.includes("parent") || slugStr.includes("baby") || slugStr.includes("child")) return <Baby className={`${baseClass} text-pink-400`} />;
    if (slugStr.includes("workout") || slugStr.includes("fitness")) return <Dumbbell className={`${baseClass} text-orange-400`} />;
    if (slugStr.includes("nutrition") || slugStr.includes("diet")) return <Apple className={`${baseClass} text-red-400`} />;
    if (slugStr.includes("medic") || slugStr.includes("health")) return <Stethoscope className={`${baseClass} text-rose-400`} />;
    if (slugStr.includes("map") || slugStr.includes("location")) return <Navigation className={`${baseClass} text-sky-400`} />;
    if (slugStr.includes("geograph")) return <Globe2 className={`${baseClass} text-emerald-400`} />;
    if (slugStr.includes("date") || slugStr.includes("time")) return <CalendarDays className={`${baseClass} text-sky-400`} />;
    if (slugStr.includes("unit") || slugStr.includes("conver")) return <Ruler className={`${baseClass} text-pink-400`} />;
    if (slugStr.includes("math") || slugStr.includes("algebra")) return <Sigma className={`${baseClass} text-indigo-400`} />;
    if (slugStr.includes("science") || slugStr.includes("physics")) return <FlaskConical className={`${baseClass} text-sky-400`} />;
    if (slugStr.includes("engineer")) return <Cog className={`${baseClass} text-indigo-400`} />;
    if (slugStr.includes("construction")) return <HardHat className={`${baseClass} text-yellow-500`} />;
    if (slugStr.includes("tax") || slugStr.includes("accounting")) return <Receipt className={`${baseClass} text-emerald-400`} />;
    if (slugStr.includes("stock") || slugStr.includes("market")) return <TrendingUp className={`${baseClass} text-emerald-400`} />;
    if (slugStr.includes("crypto")) return <Coins className={`${baseClass} text-amber-400`} />;
    if (slugStr.includes("bank")) return <Landmark className={`${baseClass} text-emerald-400`} />;
    if (slugStr.includes("finance")) return <Activity className={`${baseClass} text-emerald-400`} />;
    if (slugStr.includes("seo")) return <Search className={`${baseClass} text-purple-400`} />;
    
    return <Wrench className={`${baseClass} text-blue-400`} />;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 flex items-center justify-center gap-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              {categoryName}
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Boost your productivity with our comprehensive suite of advanced utilities. 
            Choose from our highly-demanded core tools or upgrade to unlock pro-level power.
          </p>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
            <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
              {getCategoryIcon(safeSlug)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Core / High-Demand Tools</h2>
              <p className="text-slate-400 mt-1">{freeTools.length} essential utilities, completely free to use.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {freeTools.map((tool, index) => (
              <Link key={`${tool.slug}-${index}`} href={`/tool/${tool.slug}`} className="group p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all flex flex-col justify-between h-full">
                <h4 className="font-semibold text-slate-200 group-hover:text-white mb-3 flex items-start justify-between gap-2">
                  {tool.name} 
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400 flex-shrink-0 mt-0.5" />
                </h4>
                <div className="flex items-center gap-2">
                  <span className="inline-block bg-slate-800 text-slate-300 text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wide">FREE</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {proTools.length > 0 && (
          <div className="relative p-[1px] rounded-[32px] bg-gradient-to-r from-purple-600/50 to-blue-600/50 overflow-hidden shadow-2xl shadow-purple-900/10">
            <div className="bg-[#0f172a] rounded-[31px] p-8 md:p-10 relative z-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 border-b border-slate-800/80 pb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-500/10 p-4 rounded-2xl border border-purple-500/20 shadow-inner">
                    <Zap className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                      Pro Level Workspace
                    </h2>
                    <p className="text-slate-400 mt-2 text-lg">{proTools.length} advanced premium tools for professionals.</p>
                  </div>
                </div>
                <Link href="/pricing" className="shrink-0">
                  <Button className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl py-6 px-8 shadow-xl shadow-purple-900/30 font-bold text-base transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" /> Upgrade to Go Pro
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
                {proTools.map((tool, index) => (
                  <Link key={`${tool.slug}-pro-${index}`} href={`/tool/${tool.slug}`} className="group p-5 rounded-2xl bg-slate-950/60 border border-purple-500/20 hover:border-purple-500/60 transition-all flex flex-col justify-between h-full relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                      <h4 className="font-semibold text-slate-200 group-hover:text-white mb-3 flex items-start justify-between gap-2">
                        {tool.name}
                        <Lock className="h-4 w-4 text-purple-400/70 flex-shrink-0 mt-0.5" />
                      </h4>
                      <span className="inline-block bg-purple-900/30 text-purple-300 text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wider border border-purple-700/50">
                        ⚡ PRO
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}