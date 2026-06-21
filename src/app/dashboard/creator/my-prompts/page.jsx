"use client";

import React, { useEffect, useState } from "react";
import { Plus, Eye, Edit3, BarChart2, Trash2, Lock, Globe, AlertCircle, Star } from "lucide-react";
import { getUserPrompts } from "@/lib/api/prompts";

export default function CreatorMyPromptsHomePage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrompts = async () => {
      const data = await getUserPrompts();
      setPrompts(data);
      setLoading(false);
    };
    loadPrompts();
  }, []);

  const handleAction = (actionType, promptId) => {
    console.log(`Action: ${actionType} on Prompt ID: ${promptId}`);
  };

  if (loading) {
    return (
      <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center">
        <span className="animate-pulse text-zinc-400 font-medium">Loading your prompts...</span>
      </div>
    );
  }

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
          /* EMPTY STATE */
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
          <div className="max-w-7xl w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-xs shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900/20">
                    <th className="py-4 px-6">Title</th>
                    <th className="py-4 px-6">AI Engine</th>
                    <th className="py-4 px-6">Visibility</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-center">Copies</th>
                    <th className="py-4 px-6 text-center">Rating</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800/60 text-sm">
                  {prompts.map((prompt) => (
                    <tr
                      key={prompt._id}
                      className="transition-colors hover:bg-zinc-800/10"
                    >
                      {/* Title & Category */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col min-w-[150px]">
                          <span className="font-bold text-zinc-100 tracking-wide">
                            {prompt.title}
                          </span>
                          <span className="text-xs text-zinc-500 mt-0.5">
                            Category: {prompt.category}
                          </span>
                        </div>
                      </td>

                      {/* AI Engine Badge */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-950/40 border border-purple-900/40 text-purple-400 tracking-wider uppercase">
                          {prompt.aiEngine}
                        </span>
                      </td>

                      {/* Visibility with Dynamic Icon */}
                      <td className="py-4 px-6 whitespace-nowrap text-zinc-300 font-medium">
                        <div className="flex items-center gap-1.5">
                          {prompt.visibilityStatus === "Private" ? (
                            <>
                              <Lock className="size-3.5 text-zinc-400" />
                              <span>Private</span>
                            </>
                          ) : (
                            <>
                              <Globe className="size-3.5 text-zinc-400" />
                              <span>Public</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-950/20 border border-amber-900/40 text-amber-500 uppercase tracking-wide">
                          <AlertCircle className="size-3.5 shrink-0" />
                          {prompt.status}
                        </span>
                      </td>

                      {/* Copies Count */}
                      <td className="py-4 px-6 text-center font-bold text-zinc-100 whitespace-nowrap">
                        {prompt.copyCount || 0}
                      </td>

                      {/* Rating with Star */}
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1 font-semibold text-zinc-300">
                          <Star className="size-3.5 text-zinc-400" />
                          <span>{(prompt.rating || 0).toFixed(1)}</span>
                        </div>
                      </td>

                      {/* Action Buttons Group */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleAction("view", prompt._id)}
                            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                            title="View"
                          >
                            <Eye className="size-4" />
                          </button>

                          <button
                            onClick={() => handleAction("edit", prompt._id)}
                            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="size-4" />
                          </button>

                          <button
                            onClick={() => handleAction("analytics", prompt._id)}
                            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                            title="Analytics"
                          >
                            <BarChart2 className="size-4" />
                          </button>

                          <button
                            onClick={() => handleAction("delete", prompt._id)}
                            className="p-2 rounded-lg bg-red-950/20 border border-red-900/30 text-red-400/90 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                            title="Delete"
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
          </div>
        )}
      </div>
    </div>
  );
}