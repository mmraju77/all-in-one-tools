import { Info, Layers, Zap, Shield } from "lucide-react";

export const metadata = {
  title: "About Us | Multi Tools Engine",
  description: "Learn more about Multi Tools Engine, the world's largest free utility platform.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Info className="h-6 w-6 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">About Multi Tools Engine</h1>
        </div>
        
        <div className="space-y-8 text-base leading-relaxed text-slate-400">
          <p className="text-lg text-slate-300">
            Welcome to <strong className="text-white">Multi Tools Engine</strong>, the ultimate destination for creators, developers, and businesses looking for fast, secure, and professional web utilities. 
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p>Our mission is simple: to provide a single, unified workspace where you can find every tool you need without navigating through dozens of ad-filled websites. We believe that premium productivity tools should be accessible to everyone, everywhere, for free.</p>
          </section>

          <div className="grid sm:grid-cols-3 gap-6 py-6">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-center">
              <Layers className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white mb-1">10,000+</h3>
              <p className="text-sm text-slate-500">Free Tools</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-center">
              <Zap className="h-8 w-8 text-amber-400 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white mb-1">Light Fast</h3>
              <p className="text-sm text-slate-500">Processing</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-center">
              <Shield className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white mb-1">100%</h3>
              <p className="text-sm text-slate-500">Secure & Private</p>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>No Installations:</strong> Everything runs directly in your browser.</li>
              <li><strong>Privacy First:</strong> Your files are either processed locally or automatically deleted from our servers within 1 hour.</li>
              <li><strong>Constantly Evolving:</strong> We are continually adding new tools based on community feedback.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}