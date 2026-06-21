"use client";

import React from "react";
import { Eye, Check, X, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

const initialPrompts = [
  {
    id: "1",
    title: "check",
    category: "Marketing",
    creatorName: "creator",
    creatorEmail: "creator1@gmail.com",
    aiEngine: "CLAUDE",
    visibility: "Public",
    isFeatured: false,
    status: "APPROVED",
  },
  {
    id: "2",
    title: "CyberPunk",
    category: "Coding",
    creatorName: "Mr.Creator",
    creatorEmail: "creator@gmail.com",
    aiEngine: "CHATGPT",
    visibility: "Public",
    isFeatured: false,
    status: "APPROVED",
  },
  {
    id: "3",
    title: "Testing the form submission with auto-generated data.",
    category: "System Assistant",
    creatorName: "2RzPK5Q362!90",
    creatorEmail: "robert_torres@protonmail.com",
    aiEngine: "GEMINI",
    visibility: "Private",
    isFeatured: false,
    status: "PENDING",
  },
];

export default function AllPromptsHomePage() {
  
  const handleAction = (actionType, promptId) => {
    toast.success(`Action: ${actionType} on Prompt ID: ${promptId}`);
  };

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
      {/* Header Title Section */}
      <div className="mb-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Prompt Template Submissions Moderation
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Approve templates, reject with feedback, or tag featured highlights.
        </p>
      </div>

      {/*  Container */}
      <div className="max-w-7xl mx-auto overflow-hidden bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-xs shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Head */}
            <thead>
              <tr className="border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900/20">
                <th className="py-4 px-6">Template Title</th>
                <th className="py-4 px-6">Creator</th>
                <th className="py-4 px-6 text-center">AI Engine</th>
                <th className="py-4 px-6 text-center">Visibility</th>
                <th className="py-4 px-6 text-center">Featured</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-zinc-800/60 text-sm">
              {initialPrompts.map((prompt) => (
                <tr key={prompt.id} className="transition-colors hover:bg-zinc-800/10">
                  
                  {/* Template Title & Category */}
                  <td className="py-4 px-6 max-w-[220px]">
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-zinc-100 tracking-wide break-words line-clamp-2">
                        {prompt.title}
                      </span>
                      <span className="text-xs text-zinc-500 mt-0.5">
                        Category: {prompt.category}
                      </span>
                    </div>
                  </td>

                  {/* Info */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-300">{prompt.creatorName}</span>
                      <span className="text-xs text-zinc-500">{prompt.creatorEmail}</span>
                    </div>
                  </td>

                  {/*  Badge */}
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-purple-950/50 text-purple-400 border border-purple-900/40 tracking-wider">
                      {prompt.aiEngine}
                    </span>
                  </td>

                  {/* Visibility */}
                  <td className="py-4 px-6 text-center font-medium text-zinc-300 whitespace-nowrap">
                    {prompt.visibility}
                  </td>

                  {/* Button */}
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleAction("feature", prompt.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-900/60 border border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-all cursor-pointer"
                    >
                      <Star className="size-3.5" />
                      <span>Feature</span>
                    </button>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold border tracking-wider ${
                      prompt.status === "APPROVED"
                        ? "bg-emerald-950/30 text-emerald-400 border-emerald-900/40"
                        : "bg-amber-950/20 text-amber-500 border-amber-900/30"
                    }`}>
                      {prompt.status}
                    </span>
                  </td>

                  {/* Row */}
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      {/* View Button */}
                      <button
                        onClick={() => handleAction("view", prompt.id)}
                        className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 transition-all"
                        title="View Prompt"
                      >
                        <Eye className="size-4" />
                      </button>

                      {/* Approve PENDING*/}
                      {prompt.status === "PENDING" && (
                        <button
                          onClick={() => handleAction("approve", prompt.id)}
                          className="p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                          title="Approve Prompt"
                        >
                          <Check className="size-4" />
                        </button>
                      )}

                      {/* Reject */}
                      <button
                        onClick={() => handleAction("reject", prompt.id)}
                        className="p-1.5 rounded-lg bg-red-950/30 border border-red-900/50 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        title="Reject Prompt"
                      >
                        <X className="size-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleAction("delete", prompt.id)}
                        className="p-1.5 rounded-lg bg-red-950/30 border border-red-900/50 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        title="Delete Prompt"
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
    </div>
  );
}