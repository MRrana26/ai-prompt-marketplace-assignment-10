"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPromptAnalytics } from "@/lib/api/prompts";
import { Copy, Star, Bookmark, BarChart2, ArrowLeft, MessageSquare } from "lucide-react";

export default function PromptAnalyticsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const result = await getPromptAnalytics(id);
      setData(result);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-zinc-950 flex items-center justify-center">
        <span className="animate-pulse text-zinc-400 font-medium">Loading analytics...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full min-h-screen bg-zinc-950 flex items-center justify-center">
        <span className="text-zinc-400">Analytics not found.</span>
      </div>
    );
  }

  const { prompt, reviews, bookmarks } = data;
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 text-sm font-medium w-fit transition"
        >
          <ArrowLeft className="size-4" />
          Back to My Prompts
        </button>

        {/* Header */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="size-5 text-purple-400" />
            <h1 className="text-xl font-bold text-zinc-100">Prompt Analytics</h1>
          </div>
          <p className="text-zinc-400 text-sm">{prompt?.title}</p>
          <p className="text-xs text-zinc-500 mt-1">{prompt?.category} · {prompt?.aiEngine}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 flex flex-col gap-2">
            <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-900/50 text-cyan-400 w-fit">
              <Copy className="size-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Copies</span>
            <span className="text-3xl font-extrabold text-zinc-100">{prompt?.copyCount || 0}</span>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 flex flex-col gap-2">
            <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-900/50 text-amber-400 w-fit">
              <Star className="size-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Avg Rating</span>
            <span className="text-3xl font-extrabold text-zinc-100">{avgRating}</span>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 flex flex-col gap-2">
            <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-900/50 text-purple-400 w-fit">
              <Bookmark className="size-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Bookmarks</span>
            <span className="text-3xl font-extrabold text-zinc-100">{bookmarks || 0}</span>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 flex flex-col gap-2">
            <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 w-fit">
              <MessageSquare className="size-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Reviews</span>
            <span className="text-3xl font-extrabold text-zinc-100">{reviews?.length || 0}</span>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
            <MessageSquare className="size-4" /> Recent Reviews
          </h2>
          {reviews.length === 0 ? (
            <p className="text-sm text-zinc-500">No reviews yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {reviews.map((review, i) => (
                <div key={i} className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-zinc-200">{review.name}</p>
                      <p className="text-xs text-zinc-500">{review.email}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`size-3.5 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "text-zinc-700"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400">{review.comment}</p>
                  <p className="text-xs text-zinc-600 mt-2">{new Date(review.createdAt).toLocaleDateString('en-GB')}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}