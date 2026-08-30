import { BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Blog & Guides | Multi Tools Engine",
  description: "Read the latest tutorials, updates, and guides from Multi Tools Engine.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-24 px-6 flex flex-col items-center justify-center text-center">
      <div className="h-24 w-24 rounded-3xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-8 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
        <BookOpen className="h-12 w-12 text-blue-400" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
        Blog & Guides
      </h1>
      
      <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Our team is currently crafting amazing content! We are preparing 500+ tutorials, workflow guides, and SEO strategies to help you maximize your productivity.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        
        {/* Animated Coming Soon Badge */}
        <div className="px-6 py-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          Coming Soon... Stay Tuned!
        </div>

        {/* Back to Home Button */}
        <Link 
          href="/" 
          className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium transition-all flex items-center gap-2 shadow-lg"
        >
          <ArrowLeft className="h-5 w-5" /> Back to Home
        </Link>
        
      </div>
    </div>
  );
}