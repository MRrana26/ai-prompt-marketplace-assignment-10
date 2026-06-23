"use client";
export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Eye, Check, X, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { getAllPrompts, updatePromptStatus, deletePrompt } from "@/lib/api/prompts";

export default function AllPromptsHomePage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadPrompts = async () => {
      const data = await getAllPrompts();
      setPrompts(data);
      setLoading(false);
    };
    loadPrompts();
  }, []);

  const handleApprove = async (id) => {
    const result = await updatePromptStatus(id, "approved");
    if (result) {
      toast.success("Prompt approved");
      setPrompts(prev => prev.map(p => p._id === id ? { ...p, status: "approved" } : p));
    }
  };

  const handleReject = async (id) => {
    const currentPrompt = prompts.find(p => p._id === id);
    if (!currentPrompt) return;
    const newStatus = currentPrompt.status === "rejected" ? "pending" : "rejected";
    const result = await updatePromptStatus(id, newStatus);

    if (result) {
      if (newStatus === "pending") {
        toast.success("Prompt status changed back to pending");
      } else {
        toast.error("Prompt rejected");
      }
      setPrompts(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p));
    }
  };

  const handleDelete = async (id) => {
    const result = await deletePrompt(id);
    if (result) {
      toast.warning("Prompt deleted");
      setPrompts(prev => prev.filter(p => p._id !== id));
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center">
        <span className="animate-pulse text-zinc-400 font-medium">Loading prompts...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
      <div className="mb-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Prompt Template Submissions Moderation
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Approve templates, reject with feedback, or tag featured highlights.
        </p>
      </div>

      <div className="max-w-7xl mx-auto overflow-hidden bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-xs shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
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

            <tbody className="divide-y divide-zinc-800/60 text-sm">
              {prompts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-zinc-500">
                    No prompts found.
                  </td>
                </tr>
              ) : (
                prompts.map((prompt) => (
                  <tr key={prompt._id} className="transition-colors hover:bg-zinc-800/10">
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

                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-medium text-zinc-300">
                          {prompt.creatorEmail || prompt.userEmail}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-purple-950/50 text-purple-400 border border-purple-900/40 tracking-wider">
                        {prompt.aiEngine}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center font-medium text-zinc-300 whitespace-nowrap">
                      {prompt.visibilityStatus}
                    </td>

                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-900/60 border border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-all cursor-pointer">
                        <Star className="size-3.5" />
                        <span>Feature</span>
                      </button>
                    </td>

                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold border tracking-wider ${prompt.status === "approved"
                        ? "bg-emerald-950/30 text-emerald-400 border-emerald-900/40"
                        : prompt.status === "rejected"
                          ? "bg-red-950/30 text-red-400 border-red-900/40"
                          : "bg-amber-950/20 text-amber-500 border-amber-900/30"
                        }`}>
                        {prompt.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => router.push(`/prompts/${prompt._id}`)}
                          className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 transition-all"
                          title="View Prompt"
                        >
                          <Eye className="size-4" />
                        </button>

                        {prompt.status === "pending" && (
                          <button
                            onClick={() => handleApprove(prompt._id)}
                            className="p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                            title="Approve Prompt"
                          >
                            <Check className="size-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleReject(prompt._id)}
                          className="p-1.5 rounded-lg bg-red-950/30 border border-red-900/50 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                          title="Reject Prompt"
                        >
                          <X className="size-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(prompt._id)}
                          className="p-1.5 rounded-lg bg-red-950/30 border border-red-900/50 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                          title="Delete Prompt"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}