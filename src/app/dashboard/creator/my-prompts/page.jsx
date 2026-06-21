"use client";

import React, { useState } from "react";
import { Plus, AlertCircle, Eye, Edit, BarChart3, Trash2 } from "lucide-react";


const initialPrompts = [
  {
    id: 1,
    title: "check 011",
    category: "System Assistant",
    engine: "GEMINI",
    visibility: "Private",
    status: "PENDING",
    copies: 0,
    rating: "0.0",
  },
  {
    id: 2,
    title: "check",
    category: "Marketing",
    engine: "CLAUDE",
    visibility: "Public",
    status: "APPROVED",
    copies: 1,
    rating: "0.0",
  },
];

export default function CreatorMyPromptsHomePage() {
  const [prompts, setPrompts] = useState(initialPrompts);

  const handleDelete = (id) => {
    setPrompts(prompts.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              My Prompt Templates
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Review approval statuses, change details, and check analytics.
            </p>
          </div>
          
          {/* Create New Prompt Button */}
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-medium text-sm rounded-xl transition shadow-[0_0_15px_rgba(168,85,247,0.4)] shrink-0 self-start sm:self-center cursor-pointer">
            <Plus className="size-4" />
            <span>Create New Prompt</span>
          </button>
        </div>

        {/* Dynamic Content Section */}
        {prompts.length === 0 ? (
          
          /* EMPTY STATE DIAGRAM */
          <div className="w-full bg-zinc-900/20 border border-zinc-900 rounded-2xl p-12 flex flex-col items-center justify-center text-center border-dashed min-h-[400px]">
            <div className="p-4 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-500 mb-4 shadow-inner">
              <AlertCircle className="size-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-200 tracking-wide">
              No Prompts Found
            </h3>
            <p className="text-sm text-zinc-500 max-w-sm mt-1.5 mb-6">
              You have not added any prompts yet. Start publishing to reach users!
            </p>
            <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs sm:text-sm rounded-xl transition shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer">
              Publish First Prompt
            </button>
          </div>
        ) : (
          
          /* TABLE CONTAINER */
          <div className="w-full bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-zinc-800/60 bg-zinc-900/10 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  <th className="py-4 px-5">Title</th>
                  <th className="py-4 px-4">AI Engine</th>
                  <th className="py-4 px-4">Visibility</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-center">Copies</th>
                  <th className="py-4 px-4 text-center">Rating</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/60">
                {prompts.map((prompt) => (
                  <tr
                    key={prompt.id}
                    className="hover:bg-zinc-900/10 transition-colors"
                  >
                    {/* Title & Category */}
                    <td className="py-4 px-5">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-sm text-zinc-100 tracking-wide">
                          {prompt.title}
                        </span>
                        <span className="text-xs text-zinc-500">
                          Category: {prompt.category}
                        </span>
                      </div>
                    </td>

                    {/* AI Engine Badge */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        prompt.engine === "GEMINI"
                          ? "bg-fuchsia-950/30 border-fuchsia-800/40 text-fuchsia-400"
                          : "bg-purple-950/30 border-purple-800/40 text-purple-400"
                      }`}>
                        {prompt.engine}
                      </span>
                    </td>

                    {/* Visibility */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                        {prompt.visibility === "Private" ? (
                          <>
                            <span className="text-zinc-400 text-xs">🔒</span>
                            <span>Private</span>
                          </>
                        ) : (
                          <span>Public</span>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        prompt.status === "APPROVED"
                          ? "bg-emerald-950/30 border-emerald-900/60 text-emerald-400"
                          : "bg-amber-950/30 border-amber-900/60 text-amber-500"
                      }`}>
                        {prompt.status === "PENDING" ? "🕒 PENDING" : "✓ APPROVED"}
                      </span>
                    </td>

                    {/* Copies Count */}
                    <td className="py-4 px-4 text-center font-bold text-sm text-zinc-200">
                      {prompt.copies}
                    </td>

                    {/* Rating */}
                    <td className="py-4 px-4 text-center font-medium text-sm text-zinc-300">
                      ★ {prompt.rating}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-5">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition cursor-pointer">
                          <Eye className="size-4" />
                        </button>
                        <button className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition cursor-pointer">
                          <Edit className="size-4" />
                        </button>
                        <button className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition cursor-pointer">
                          <BarChart3 className="size-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(prompt.id)}
                          className="p-2 rounded-lg bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-500 hover:text-white transition cursor-pointer"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}