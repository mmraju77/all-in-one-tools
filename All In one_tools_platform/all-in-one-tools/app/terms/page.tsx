import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Multi Tools Engine",
  description: "Terms of Service and usage guidelines for Multi Tools Engine.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <FileText className="h-6 w-6 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Terms of Service</h1>
        </div>
        
        <p className="text-slate-400 mb-10">Last updated: August 2026</p>

        <div className="space-y-8 text-base leading-relaxed text-slate-400">
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Terms</h2>
            <p>By accessing the website at Multi Tools Engine, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily use the tools and materials on Multi Tools Engine's website for personal, non-commercial, and commercial workflow purposes. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Use automated bots or scripts to scrape data from our tools.</li>
              <li>Attempt to decompile or reverse engineer any software contained on Multi Tools Engine's website.</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <p className="mt-3">This license shall automatically terminate if you violate any of these restrictions and may be terminated by Multi Tools Engine at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Disclaimer</h2>
            <p>The materials and tools on Multi Tools Engine's website are provided on an 'as is' basis. Multi Tools Engine makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Limitations</h2>
            <p>In no event shall Multi Tools Engine or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Multi Tools Engine's website, even if Multi Tools Engine or a Multi Tools Engine authorized representative has been notified orally or in writing of the possibility of such damage.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Revisions and Errata</h2>
            <p>The materials appearing on Multi Tools Engine's website could include technical, typographical, or photographic errors. Multi Tools Engine does not warrant that any of the materials on its website are accurate, complete or current. Multi Tools Engine may make changes to the materials contained on its website at any time without notice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Links</h2>
            <p>Multi Tools Engine has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Multi Tools Engine of the site. Use of any such linked website is at the user's own risk.</p>
          </section>
        </div>
      </div>
    </div>
  );
}