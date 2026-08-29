import { Metadata } from "next";
import { Layers } from "lucide-react";
import RelatedTools from "@/components/shared/RelatedTools";

// Programmatic SEO for Collections - Async Params Fix
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "collection";
  const collectionName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    title: `Best ${collectionName} | Multi Tools Engine Collections`,
    description: `Explore our hand-picked collection of the best ${collectionName}. Hand-curated for maximum productivity.`,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "collection";
  const collectionName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Collection Header */}
        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/20 rounded-3xl p-10 mb-12 flex flex-col items-center text-center">
          <div className="bg-blue-500/20 p-4 rounded-2xl mb-6 border border-blue-500/30">
            <Layers className="h-10 w-10 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {collectionName}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            A hand-curated master collection of the most powerful utilities for your daily workflow.
          </p>
        </div>

        {/* Using the same grid widget to show tools in this collection */}
        <RelatedTools category="Hand-picked" />

      </div>
    </div>
  );
}