"use client";

import React, { useEffect, useState } from "react";
import { Eye, Edit3, BarChart2, Trash2, Lock, Globe, AlertCircle, Star, X, Plus } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { deleteUserPrompt, getUserPrompts, updatePrompt } from "@/lib/api/prompts";
import { toast } from "sonner";



export default function UserMyPromptsHomePage() {
  const [myPromptsData, setMyPromptsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [editPrompt, setEditPrompt] = useState(null);
  const [editLoading, setEditLoading] = useState(false);



  useEffect(() => {
    const loadPrompts = async () => {
      if (isPending) return;

      const userEmail = user?.email;

      if (userEmail) {
        const data = await getUserPrompts(userEmail);
        setMyPromptsData(data);
      }
      setLoading(false);
    };
    loadPrompts();
  }, [user, isPending]);

  const handleAction = async (actionType, promptId) => {
    if (actionType === "view") {
      router.push(`/prompts/${promptId}`);
    }
    else if (actionType === "edit") {
      const prompt = myPromptsData.find(p => p._id === promptId);
      setEditPrompt(prompt);
    }
    else if (actionType === "delete") {
      if (!confirm("Are you sure you want to delete this prompt?")) return;
      const result = await deleteUserPrompt(promptId);
      if (result) {
        toast.success("Prompt deleted!");
        setMyPromptsData(prev => prev.filter(p => p._id !== promptId)); // map → filter
      } else {
        toast.error("Failed to delete prompt");
      }
    }
    else if (actionType === "analytics") {
      router.push(`/dashboard/user/analytics/${promptId}`);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center">
        <span className="animate-pulse text-zinc-400 font-medium">Loading your prompts...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
      {/* Header Title Section */}
      <div className="mb-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          My Prompt Templates
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Review approval statuses, change details, and check analytics.
        </p>
      </div>

      <div className="max-w-7xl mx-auto overflow-hidden bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-xs shadow-xl">
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
              {myPromptsData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-zinc-500">
                    No prompts found. Add some prompts first!
                  </td>
                </tr>
              ) : (
                myPromptsData.map((prompt) => (
                  <tr
                    key={prompt._id}
                    className="transition-colors hover:bg-zinc-800/10"
                  >
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

                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-950/40 border border-purple-900/40 text-purple-400 tracking-wider">
                        {prompt.aiEngine}
                      </span>
                    </td>

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

                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-950/20 border border-amber-900/40 text-amber-500 uppercase tracking-wide">
                        <AlertCircle className="size-3.5 shrink-0" />
                        {prompt.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center font-bold text-zinc-100 whitespace-nowrap">
                      {prompt.copyCount || 0}
                    </td>

                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1 font-semibold text-zinc-300">
                        <Star className="size-3.5 text-zinc-400" />
                        <span>{(prompt.rating || 0).toFixed(1)}</span>
                      </div>
                    </td>

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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {editPrompt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-zinc-100">Edit Prompt</h3>
              <button onClick={() => setEditPrompt(null)} className="text-zinc-500 hover:text-zinc-300">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Title</label>
                <input
                  value={editPrompt.title}
                  onChange={(e) => setEditPrompt(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-zinc-800/50 border border-zinc-700/50 focus:border-purple-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-zinc-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Short Description</label>
                <textarea
                  value={editPrompt.shortDescription}
                  onChange={(e) => setEditPrompt(prev => ({ ...prev, shortDescription: e.target.value }))}
                  rows={2}
                  className="w-full bg-zinc-800/50 border border-zinc-700/50 focus:border-purple-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-zinc-300 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Prompt Content</label>
                <textarea
                  value={editPrompt.contentTemplate}
                  onChange={(e) => setEditPrompt(prev => ({ ...prev, contentTemplate: e.target.value }))}
                  rows={4}
                  className="w-full bg-zinc-800/50 border border-zinc-700/50 focus:border-purple-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-zinc-300 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Visibility</label>
                  <select
                    value={editPrompt.visibilityStatus}
                    onChange={(e) => setEditPrompt(prev => ({ ...prev, visibilityStatus: e.target.value }))}
                    className="w-full bg-zinc-800/50 border border-zinc-700/50 focus:border-purple-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-zinc-300"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Difficulty</label>
                  <select
                    value={editPrompt.difficultyLevel}
                    onChange={(e) => setEditPrompt(prev => ({ ...prev, difficultyLevel: e.target.value }))}
                    className="w-full bg-zinc-800/50 border border-zinc-700/50 focus:border-purple-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-zinc-300"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={async () => {
                  setEditLoading(true);
                  const result = await updatePrompt(editPrompt._id, editPrompt);
                  if (result) {
                    toast.success("Prompt updated!");
                    setMyPromptsData(prev => prev.map(p => p._id === editPrompt._id ? editPrompt : p));
                    setEditPrompt(null);
                  } else {
                    toast.error("Failed to update");
                  }
                  setEditLoading(false);
                }}
                disabled={editLoading}
                className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition cursor-pointer"
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setEditPrompt(null)}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}