import { Map, LayoutGrid, FileText, Info } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Sitemap | Multi Tools Engine",
  description: "Navigate through all pages and categories on Multi Tools Engine.",
};

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Map className="h-6 w-6 text-blue-400" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Sitemap</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Info className="h-5 w-5 text-emerald-400"/> Core Pages</h2>
            <ul className="space-y-3">
              <li><Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-blue-400 transition-colors">Contact Support</Link></li>
              <li><Link href="/pricing" className="text-slate-400 hover:text-blue-400 transition-colors">Pricing & Pro</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-blue-400 transition-colors">Blog & Guides</Link></li>
              <li><Link href="/developer-api" className="text-slate-400 hover:text-blue-400 transition-colors">Developer API</Link></li>
            </ul>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><FileText className="h-5 w-5 text-rose-400"/> Legal</h2>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}