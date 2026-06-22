"use client";

import React from "react";
import { FileText, Copy, Bookmark } from "lucide-react";

export default function CreatorAnalyticsTotalCard({ 
  promptsCount = 0, 
  copiesCount = 0, 
  bookmarksCount = 0 
}) {
  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6">
      
      <div className="mb-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Creator Analytics Dashboard
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Real-time usage statistics and performance insights.
        </p>
      </div>

      {/* 3-Column Analytics Cards Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* CARD 1: TOTAL PROMPTS */}
        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex items-center gap-5 shadow-xl backdrop-blur-xs">
          {/* Purple Icon Container */}
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/50 text-purple-400 shrink-0">
            <FileText className="size-6" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Total Prompts
            </span>
            <span className="text-3xl font-extrabold text-zinc-100 tracking-tight">
              {promptsCount}
            </span>
          </div>
        </div>

        {/* CARD 2: TOTAL COPIES */}
        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex items-center gap-5 shadow-xl backdrop-blur-xs">
          {/* Blue/Cyan Icon Container */}
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-900/50 text-cyan-400 shrink-0">
            <Copy className="size-6" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Total Copies
            </span>
            <span className="text-3xl font-extrabold text-zinc-100 tracking-tight">
              {copiesCount}
            </span>
          </div>
        </div>

        {/* CARD 3: TOTAL BOOKMARKS */}
        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex items-center gap-5 shadow-xl backdrop-blur-xs">
          {/* Emerald/Green Icon Container */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 shrink-0">
            <Bookmark className="size-6" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Total Bookmarks
            </span>
            <span className="text-3xl font-extrabold text-zinc-100 tracking-tight">
              {bookmarksCount}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}