"use client";

import { useState } from "react";
import { Download, PlaySquare, Search, CheckCircle2, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Thumbnails {
  hq: string;
  mq: string;
  max: string;
}

export default function YoutubeThumbnailDownloader() {
  const [url, setUrl] = useState<string>("");
  const [thumbnails, setThumbnails] = useState<Thumbnails | null>(null);
  const [error, setError] = useState<string>("");

  const extractVideoId = (videoUrl: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleFetchThumbnails = () => {
    setError("");
    setThumbnails(null);

    if (!url.trim()) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("Invalid YouTube URL. Please make sure the link is correct.");
      return;
    }

    setThumbnails({
      hq: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      mq: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
      max: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    });
  };

  const handleDownload = async (imageUrl: string, quality: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `youtube-thumbnail-${quality}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full mb-4 border border-red-500/20">
            <PlaySquare className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">YouTube Thumbnail Downloader</h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">
            Download high-quality YouTube thumbnails instantly. Just paste the video URL and get images in HD, MQ, and standard qualities.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500 border-t border-slate-800/50 pt-6 max-w-lg mx-auto">
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-emerald-500" /> Free & Safe</span>
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-yellow-500" /> Instant Download</span>
          </div>
        </div>

        {/* Search / Input Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 mb-12 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube Video Link here (e.g. https://youtube.com/watch?v=...)"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
            <Button 
              onClick={handleFetchThumbnails}
              className="bg-red-600 hover:bg-red-700 text-white rounded-2xl py-6 px-8 shadow-lg shadow-red-900/20 font-bold"
            >
              Get Thumbnails
            </Button>
          </div>
          {error && <p className="text-red-400 mt-4 text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> {error}</p>}
        </div>

        {/* Results Section */}
        {thumbnails && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* HD Quality */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  HD Quality (1080p) <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </h3>
                <Button onClick={() => handleDownload(thumbnails.max, "HD")} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
                  <Download className="h-4 w-4 mr-2" /> Download HD
                </Button>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumbnails.max} alt="HD Thumbnail" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* Normal Quality */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-200">Medium Quality</h3>
                  <Button onClick={() => handleDownload(thumbnails.hq, "Medium")} variant="outline" size="sm" className="border-slate-700 hover:bg-slate-800">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumbnails.hq} alt="Medium Thumbnail" className="w-full h-auto object-cover" />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-200">Standard Quality</h3>
                  <Button onClick={() => handleDownload(thumbnails.mq, "Standard")} variant="outline" size="sm" className="border-slate-700 hover:bg-slate-800">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumbnails.mq} alt="Standard Thumbnail" className="w-full h-auto object-cover" />
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}