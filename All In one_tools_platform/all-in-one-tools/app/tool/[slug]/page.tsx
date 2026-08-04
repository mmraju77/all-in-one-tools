import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, Share2, Bookmark, StarHalf, Zap } from "lucide-react";
import Link from "next/link";
import UserRating from "@/components/tools/UserRating";

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "";
  const toolName = slug.replace(/-/g, " ").toUpperCase();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-10 min-h-screen">
      
      {/* 1. Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/"
          className="text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Categories
        </Link>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 h-9"
          >
            <Bookmark className="h-4 w-4 mr-2" /> Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 h-9"
          >
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>
      </div>

      {/* 2. Enhanced Dynamic Tool Header with Ratings */}
      <div className="space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 text-transparent bg-clip-text">
            {toolName}
          </span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-medium mx-auto md:mx-0">
          Premium {toolName.toLowerCase()} tool to boost your productivity. Fast, secure, and running entirely on the edge.
        </p>

        {/* 🌟 Global Star Rating UI */}
        <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
          <div className="flex items-center text-yellow-500">
            <Star className="h-5 w-5 fill-yellow-500" />
            <Star className="h-5 w-5 fill-yellow-500" />
            <Star className="h-5 w-5 fill-yellow-500" />
            <Star className="h-5 w-5 fill-yellow-500" />
            <StarHalf className="h-5 w-5 fill-yellow-500" />
          </div>
          <span className="text-slate-200 font-bold text-sm">4.8/5</span>
          <span className="text-slate-500 text-sm font-medium">(1,284 ratings)</span>
        </div>
      </div>

      {/* 3. The Universal Tool Workspace */}
      <Card className="w-full min-h-[450px] bg-[#1e293b] border-slate-700/50 rounded-2xl flex flex-col items-center justify-center p-8 shadow-2xl relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 10px, #334155 10px, #334155 20px)",
          }}
        />

        <div className="text-slate-400 text-center space-y-6 relative z-10">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-6 border border-blue-500/20 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]">
            <Zap className="h-10 w-10 text-cyan-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Interactive Workspace</h2>
          <p className="text-base max-w-md mx-auto text-slate-400">
            This is the dynamic container. Based on the URL, the exact logic for{" "}
            <strong className="text-cyan-400">{toolName}</strong> will be injected right here without reloading the page.
          </p>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white mt-6 h-12 px-10 rounded-full font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all">
            Execute Tool Action
          </Button>
        </div>
      </Card>

      {/* 🌟 New Interactive User Rating Component */}
      <UserRating toolName={toolName} />

      {/* 4. Enhanced SEO & Programmatic Content Section */}
      <div className="grid md:grid-cols-3 gap-8 pt-6 border-t border-slate-800/60 mt-12">
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              How to use this <span className="text-cyan-400">{toolName.toLowerCase()}</span>
            </h3>
            <p className="leading-relaxed text-slate-300 text-lg">
              Our micro-tool architecture ensures that every utility is highly optimized and user-friendly. Simply input your data in the workspace above, and our system will process it instantly. No data is sent to our servers unless explicitly stated, ensuring maximum privacy.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Why choose our platform?</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-cyan-400" />
                Lightning fast execution
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                100% Free to use for personal projects
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                Enterprise-grade security and privacy
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-purple-400" />
                No registration required for basic features
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6 bg-slate-800/30 p-8 rounded-2xl border border-slate-700/50 shadow-lg h-fit">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-700/50">
            Related Utilities
          </h3>
          <ul className="space-y-4 text-sm font-medium">
            <li>
              <Link href="/tool/pdf-merge" className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center justify-between">
                PDF Merge Pro <span className="text-slate-600">→</span>
              </Link>
            </li>
            <li>
              <Link href="/tool/json-formatter" className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center justify-between">
                JSON Formatter <span className="text-slate-600">→</span>
              </Link>
            </li>
            <li>
              <Link href="/tool/seo-analyzer" className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center justify-between">
                SEO Analyzer <span className="text-slate-600">→</span>
              </Link>
            </li>
            <li>
              <Link href="/tool/image-compressor" className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center justify-between">
                Image Compressor <span className="text-slate-600">→</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}