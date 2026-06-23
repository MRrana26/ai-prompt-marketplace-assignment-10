"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, MessageSquare, Star, Calendar } from "lucide-react";
import { getUserReviews } from "@/lib/api/prompts";
import { authClient } from "@/lib/auth-client";

export default function UserMyReviewsHomePage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      if (!user?.email) return;
      const data = await getUserReviews(user.email);
      setReviews(data);
      setLoading(false);
    };
    load();
  }, [user]);

  const getToolBadgeStyle = (tool) => {
    switch (tool?.toUpperCase()) {
      case "CHATGPT": return "bg-purple-950/40 border-purple-900/40 text-purple-400";
      case "GEMINI": return "bg-blue-950/40 border-blue-900/40 text-blue-400";
      case "CLAUDE": return "bg-indigo-950/40 border-indigo-900/40 text-indigo-400";
      case "MIDJOURNEY": return "bg-pink-950/40 border-pink-900/40 text-pink-400";
      default: return "bg-zinc-800 border-zinc-700 text-zinc-400";
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center">
        <span className="animate-pulse text-zinc-400 font-medium">Loading reviews...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
      <div className="mb-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          My Product Reviews
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Feedback and ratings you have posted on the marketplace.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {reviews.length === 0 ? (
          <div className="w-full border border-zinc-800/80 rounded-2xl bg-zinc-900/20 py-20 px-6 flex flex-col items-center justify-center text-center shadow-xl backdrop-blur-xs">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/60 text-zinc-500 mb-5">
              <MessageSquare className="size-10 text-zinc-500" />
            </div>
            <h2 className="text-xl font-bold text-zinc-200 tracking-wide">
              No reviews submitted yet
            </h2>
            <p className="text-sm text-zinc-500 max-w-sm mt-2 leading-relaxed">
              Try templates from our catalog and share your experiences to assist other users!
            </p>
            <Link
              href="/all-prompts"
              className="mt-6 px-6 py-2.5 bg-purple-600 text-white text-sm font-bold rounded-xl hover:bg-purple-500 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-purple-900/20"
            >
              Browse Prompts
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-xs shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900/20">
                    <th className="py-4 px-6">Prompt Title</th>
                    <th className="py-4 px-6">AI Tool</th>
                    <th className="py-4 px-6">Rating</th>
                    <th className="py-4 px-6">Comments</th>
                    <th className="py-4 px-6">Submitted Date</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800/60 text-sm">
                  {reviews.map((review) => (
                    <tr
                      key={review._id}
                      className="transition-colors hover:bg-zinc-800/10"
                    >
                      <td className="py-4 px-6 font-bold text-zinc-100 min-w-[200px] tracking-wide">
                        {review.promptDetails?.title || "Deleted Prompt"}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border tracking-wider ${getToolBadgeStyle(review.promptDetails?.aiEngine)}`}>
                          {review.promptDetails?.aiEngine || "N/A"}
                        </span>
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-1 font-bold text-zinc-100">
                          <Star className="size-4 text-amber-500 fill-amber-500" />
                          <span>{review.rating?.toFixed(1)}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-zinc-400 font-medium italic max-w-[250px] truncate">
                        {review.comment}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="size-3.5 text-zinc-500" />
                          <span>{new Date(review.createdAt).toLocaleDateString('en-GB')}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => router.push(`/prompts/${review.promptId}`)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold text-xs transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                        >
                          <Eye className="size-3.5" />
                          <span>View</span>
                        </button>
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