import { Send, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Request a Tool | Multi Tools Engine",
  description: "Can't find a tool? Request it here and we will build it.",
};

export default function RequestToolPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="h-16 w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-4">
            <Layers className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">Request a Tool</h1>
          <p className="text-slate-400 text-lg">
            Can't find what you need among our 10,000+ tools? Describe it below and our engineering team will build it.
          </p>
        </div>

        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-xl">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Desired Tool Name</label>
              <input 
                type="text" 
                placeholder="e.g., MP4 to GIF Converter" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">How should it work? (Description)</label>
              <textarea 
                rows={5}
                placeholder="Describe the features and inputs/outputs you need..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Your Email (Optional, to notify you when it's ready)</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <Button type="button" className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-12 font-semibold shadow-lg shadow-blue-900/20 flex items-center gap-2 justify-center">
              <Send className="h-4 w-4" /> Submit Request
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}