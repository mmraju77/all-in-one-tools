"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function UserRating() {
  const [rating, setRating] = useState(4); 
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="flex items-center justify-center gap-2 w-full">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-transform hover:scale-110 focus:outline-none"
          >
            <Star
              className={`h-9 w-9 transition-colors ${
                (hoverRating || rating) >= star
                  ? "fill-orange-400 text-orange-400"
                  : "text-slate-700"
              }`}
            />
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-400 font-medium mt-2 bg-slate-950 px-4 py-2 rounded-full border border-slate-800">
        Your rating: <span className="text-white font-bold">{rating || hoverRating} / 5</span>
      </p>
    </div>
  );
}