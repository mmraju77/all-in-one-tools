"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function UserRating({ toolName }: { toolName: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (currentRating: number) => {
    setRating(currentRating);
    setSubmitted(true);
    // భవిష్యత్తులో ఈ రేటింగ్ ని మనం డేటాబేస్ (Supabase) కి పంపిస్తాం
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 mt-4 border border-slate-800/50 bg-slate-900/30 rounded-2xl shadow-inner">
      {!submitted ? (
        <>
          <p className="text-slate-400 font-medium mb-3">Rate your experience with {toolName}</p>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <button
                  key={index}
                  type="button"
                  className="transition-transform hover:scale-110 focus:outline-none"
                  onClick={() => handleRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    className={`h-8 w-8 transition-colors duration-200 ${
                      currentRating <= (hover || rating)
                        ? "fill-yellow-500 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]"
                        : "text-slate-600 hover:text-yellow-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-1 text-yellow-500 mb-2">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-yellow-500" />
            ))}
          </div>
          <p className="text-emerald-400 font-bold text-lg">Thank you for your feedback!</p>
        </div>
      )}
    </div>
  );
}