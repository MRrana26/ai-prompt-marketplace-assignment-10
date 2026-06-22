"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, MessageSquare, Star, Calendar } from "lucide-react";

const initialReviewsData = [
  {
    id: "1",
    promptTitle: "ChatGPT Suspicious Shell Script Optimizer",
    aiTool: "CHATGPT",
    rating: 5.0,
    comments: '"Test "',
    submittedDate: "20/06/2026",
  },
  
];

export default function UserMyReviewsHomePage() {
  const [reviews, setReviews] = useState(initialReviewsData);

  const getToolBadgeStyle = (tool) => {
    switch (tool?.toUpperCase()) {
      case "CHATGPT": return "bg-purple-950/40 border-purple-900/40 text-purple-400";
      case "GEMINI": return "bg-blue-950/40 border-blue-900/40 text-blue-400";
      default: return "bg-zinc-800 border-zinc-700 text-zinc-400";
    }
  };

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
      
      {/* Header Title Section */}
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

            {/* Redirect Button */}
            <Link 
              href="/dashboard/user/prompts"
              className="mt-6 px-6 py-2.5 bg-purple-600 text-white text-sm font-bold rounded-xl hover:bg-purple-500 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-purple-900/20"
            >
              Browse Prompts
            </Link>
          </div>

        ) : (
          

          <div className="overflow-hidden bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-xs shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* Table Head */}
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

                {/* Table Body */}
                <tbody className="divide-y divide-zinc-800/60 text-sm">
                  {reviews.map((review) => (
                    <tr 
                      key={review.id} 
                      className="transition-colors hover:bg-zinc-800/10"
                    >
                      {/* Prompt Title */}
                      <td className="py-4 px-6 font-bold text-zinc-100 min-w-[200px] tracking-wide">
                        {review.promptTitle}
                      </td>

                      {/* AI Tool Badge */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border tracking-wider ${getToolBadgeStyle(review.aiTool)}`}>
                          {review.aiTool}
                        </span>
                      </td>

                      {/* Rating with Amber/Orange Star */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-1 font-bold text-zinc-100">
                          <Star className="size-4 text-amber-500 fill-amber-500" />
                          <span>{review.rating.toFixed(1)}</span>
                        </div>
                      </td>

                      {/* Comments Text */}
                      <td className="py-4 px-6 text-zinc-400 font-medium italic max-w-[250px] truncate">
                        {review.comments}
                      </td>

                      {/* Submitted Date */}
                      <td className="py-4 px-6 whitespace-nowrap text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="size-3.5 text-zinc-500" />
                          <span>{review.submittedDate}</span>
                        </div>
                      </td>

                      {/* Action Button: View */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => console.log(`Viewing Review ID: ${review.id}`)}
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