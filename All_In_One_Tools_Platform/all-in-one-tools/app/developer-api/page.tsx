import { Code, Terminal, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Developer API | Multi Tools Engine",
  description: "Integrate Multi Tools Engine's powerful utilities into your own applications.",
};

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-24 px-6 flex flex-col items-center justify-center text-center">
      <div className="h-24 w-24 rounded-3xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-8 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
        <Code className="h-12 w-12 text-emerald-400" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
        Multi Tools Engine API <span className="text-emerald-400 text-2xl align-top">v1.0</span>
      </h1>
      
      <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Power your applications with our enterprise-grade endpoints. Access file conversions, SEO auditing, AI generators, and 10,000+ other utilities directly via REST API.
      </p>
      
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex items-center gap-4 text-left max-w-lg w-full mb-10 shadow-2xl">
        <Terminal className="h-6 w-6 text-slate-500" />
        <code className="text-emerald-300 font-mono text-sm break-all">curl -X GET "https://api.Multi Tools Engine.com/v1/ping"</code>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="px-6 py-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium tracking-wide">
          Developer API is in Closed Beta
        </div>

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