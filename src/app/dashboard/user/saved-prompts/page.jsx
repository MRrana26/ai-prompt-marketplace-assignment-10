"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, Trash2, Layers, Bookmark } from "lucide-react";

const initialSavedPrompts = [
  {
    id: "1",
    title: "Optimized React Tailwind Code Builder",
    description: "Generates production-grade, responsive React components using modern Tailwind...",
    aiEngine: "CHATGPT",
    category: "CODING",
  },
  {
    id: "2",
    title: "Claude 3.5 Sonnet Fullstack Architect",
    description: "Creates optimal database schemas and corresponding backend route templates...",
    aiEngine: "CLAUDE",
    category: "CODING",
  },
  {
    id: "3",
    title: "Gemini Long-form SEO Content Copywriter",
    description: "Structures comprehensive outline drafts for blog articles optimizing selected...",
    aiEngine: "GEMINI",
    category: "WRITING",
  },
  {
    id: "4",
    title: "Midjourney Premium Cinematic Portrait Recipe",
    description: "Advanced cinematic lighting parameters and environment details to create...",
    aiEngine: "MIDJOURNEY",
    category: "GRAPHICS & IMAGE",
  }
];

export default function UserSavedPromptsHomePage() {
  const [savedPrompts, setSavedPrompts] = useState(initialSavedPrompts);

  const handleRemoveBookmark = (id) => {
    setSavedPrompts((prev) => prev.filter((item) => item.id !== id));
    console.log(`Removed template ID: ${id} from bookmarks.`);
  };

  const getEngineBadgeStyle = (engine) => {
    switch (engine?.toUpperCase()) {
      case "CHATGPT": return "bg-purple-950/40 border-purple-900/50 text-purple-400";
      case "CLAUDE": return "bg-indigo-950/40 border-indigo-900/50 text-indigo-400";
      case "GEMINI": return "bg-blue-950/40 border-blue-900/50 text-blue-400";
      case "MIDJOURNEY": return "bg-pink-950/40 border-pink-900/50 text-pink-400";
      default: return "bg-zinc-800 border-zinc-700 text-zinc-400";
    }
  };

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
      
      {/* Header Titles */}
      <div className="mb-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Saved Prompt Templates</h1>
        <p className="text-sm text-zinc-400 mt-1">Browse your bookmarked templates and parameters.</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {savedPrompts.length === 0 ? (
          

          <div className="w-full border border-zinc-800/80 rounded-2xl bg-zinc-900/20 py-20 px-6 flex flex-col items-center justify-center text-center shadow-xl backdrop-blur-xs">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 mb-5 relative">
              <Layers className="size-10" />
              <Bookmark className="size-4 text-purple-500 absolute -top-1 -right-1" />
            </div>
            
            <h2 className="text-xl font-bold text-zinc-200 tracking-wide">No bookmarked prompts</h2>
            <p className="text-sm text-zinc-500 max-w-sm mt-1.5 leading-relaxed">
              Browse the marketplace and bookmark items to build your private collection.
            </p>

            <Link 
              href="/dashboard/user/prompts"
              className="mt-6 px-6 py-2.5 bg-purple-600 text-white text-sm font-bold rounded-xl hover:bg-purple-500 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-purple-900/20"
            >
              Browse Prompts
            </Link>
          </div>

        ) : (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedPrompts.map((item) => (
              <div 
                key={item.id} 
                className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-zinc-700/60 transition-all group"
              >
                <div>
                  {/* Category & AI Engine Tags Row */}
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold border uppercase tracking-wider ${getEngineBadgeStyle(item.aiEngine)}`}>
                      {item.aiEngine}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-cyan-950/30 border border-cyan-900/40 text-cyan-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Prompt Card Title */}
                  <h3 className="text-base font-bold text-zinc-100 tracking-wide line-clamp-2 min-h-[3rem] leading-snug group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Card Description Paragraph */}
                  <p className="text-xs md:text-sm text-zinc-400 line-clamp-2 leading-relaxed mt-2 mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Card Actions Row */}
                <div className="flex items-center gap-2 border-t border-zinc-800/60 pt-4">
                  {/* View Details Button */}
                  <button 
                    onClick={() => console.log(`Viewing Details of: ${item.id}`)}
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-purple-900/10"
                  >
                    <Eye className="size-4" />
                    <span>View Details</span>
                  </button>

                  {/* Remove/Delete Bookmark Button */}
                  <button 
                    onClick={() => handleRemoveBookmark(item.id)}
                    className="p-2.5 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400/90 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
}