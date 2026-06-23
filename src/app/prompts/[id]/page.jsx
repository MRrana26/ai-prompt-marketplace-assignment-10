"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPromptById, incrementCopyCount, reportPrompt, toggleBookmark, checkBookmark, getReviews, submitReview } from "@/lib/api/prompts";
import { authClient } from "@/lib/auth-client";
import { Copy, Bookmark, Star, ShieldCheck, Tag, BarChart2, User, Lock, Flag, X, Image as ImageIcon, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const REPORT_REASONS = [
  "Inappropriate Content",
  "Spam",
  "Copyright Violation",
  "Misleading Information",
  "Other",
];

export default function PromptDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isPremium = user?.plan?.toLowerCase().includes("pro") || user?.plan?.toLowerCase().includes("premium");

  useEffect(() => {
    const load = async () => {
      const data = await getPromptById(id);
      setPrompt(data);
      setLoading(false);
    };
    load();
  }, [id]);

  useEffect(() => {
    const loadReviews = async () => {
      const data = await getReviews(id);
      setReviews(data);
    };
    loadReviews();
  }, [id]);

  useEffect(() => {
    const loadBookmark = async () => {
      if (user?.email && id) {
        const data = await checkBookmark(user.email, id);
        setIsBookmarked(data.bookmarked);
      }
    };
    loadBookmark();
  }, [user, id]);

  const handleCopy = async () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt.contentTemplate);
    await incrementCopyCount(id);
    setPrompt(prev => ({ ...prev, copyCount: (prev.copyCount || 0) + 1 }));
    toast.success("Prompt copied to clipboard!");
  };

  const handleBookmark = async () => {
    if (!user) return toast.error("Please login first!");
    const result = await toggleBookmark(id, user.email);
    if (result) {
      setIsBookmarked(result.bookmarked);
      toast.success(result.bookmarked ? "Prompt bookmarked!" : "Bookmark removed!");
    }
  };

  const handleReport = async () => {
    if (!reportReason) return toast.error("Please select a reason!");
    setReportSubmitting(true);
    const result = await reportPrompt(id, {
      reason: reportReason,
      description: reportDescription,
      reporterEmail: user?.email,
    });
    if (result) {
      toast.success("Report submitted successfully!");
      setShowReportModal(false);
      setReportReason("");
      setReportDescription("");
    }
    setReportSubmitting(false);
  };

  const handleReviewSubmit = async () => {
    if (!user) return toast.error("Please login first!");
    if (reviewRating === 0) return toast.error("Please select a rating!");
    if (!reviewComment.trim()) return toast.error("Please write a comment!");
    setReviewSubmitting(true);
    const result = await submitReview(id, {
      name: user.name,
      email: user.email,
      rating: reviewRating,
      comment: reviewComment,
    });
    if (result) {
      toast.success("Review submitted!");
      setReviews(prev => [{ name: user.name, email: user.email, rating: reviewRating, comment: reviewComment, createdAt: new Date().toISOString() }, ...prev]);
      setReviewRating(0);
      setReviewComment("");
    }
    setReviewSubmitting(false);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-zinc-950 flex items-center justify-center">
        <span className="animate-pulse text-zinc-400 font-medium">Loading prompt...</span>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="w-full min-h-screen bg-zinc-950 flex items-center justify-center">
        <span className="text-zinc-400">Prompt not found.</span>
      </div>
    );
  }

  const isPrivate = prompt.visibilityStatus === "Private";
  const canView = !isPrivate || isPremium;

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-900/40 text-purple-400 uppercase tracking-wider">
              {prompt.aiEngine}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700/50 text-zinc-300 uppercase tracking-wider">
              {prompt.category}
            </span>
            {isPrivate && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Premium
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight mb-3">
            {prompt.title}
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">{prompt.shortDescription}</p>

          <div className="flex flex-wrap gap-4 mt-5 text-sm text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Copy className="size-4 text-zinc-500" />
              <span>{prompt.copyCount} copies</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span>{(prompt.rating || 0).toFixed(1)} rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart2 className="size-4 text-zinc-500" />
              <span>{prompt.difficultyLevel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="size-4 text-zinc-500" />
              <span>{(prompt.creatorEmail || prompt.userEmail)?.split("@")[0]}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        {prompt.thumbnailUrl && (
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
              <ImageIcon className="size-4 text-purple-400" /> Preview
            </h2>
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-950">
              <Image
                src={prompt.thumbnailUrl}
                alt={prompt.title}
                fill
                className="object-cover"
                sizes="(max-w-4xl) 100vw, 896px"
              />
            </div>
          </div>
        )}

        {/* Prompt Content */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
            Prompt Content
          </h2>
          {canView ? (
            <>
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 font-mono">
                {prompt.contentTemplate}
              </pre>
              <button
                onClick={handleCopy}
                className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition active:scale-95 cursor-pointer"
              >
                <Copy className="size-4" />
                Copy Prompt
              </button>
            </>
          ) : (
            <div className="relative">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 font-mono blur-sm select-none">
                {prompt.contentTemplate}
              </pre>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950/60 rounded-xl">
                <Lock className="size-8 text-amber-400" />
                <p className="text-sm font-semibold text-zinc-300">Premium Content</p>
                <button
                  onClick={() => router.push("/payment")}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-bold rounded-xl transition active:scale-95 cursor-pointer"
                >
                  Subscribe to Premium
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
            <Tag className="size-4" /> Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {(prompt.tags || []).map((tag, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700/50 text-zinc-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleBookmark}
            className={`flex items-center gap-2 px-4 py-2.5 border text-sm font-semibold rounded-xl transition cursor-pointer ${
              isBookmarked
                ? "bg-purple-600 border-purple-500 text-white"
                : "bg-zinc-900 border-zinc-800 hover:border-purple-500/50 text-zinc-300"
            }`}
          >
            <Bookmark className={`size-4 ${isBookmarked ? "fill-white" : ""}`} />
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>

          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-red-500/50 text-zinc-300 hover:text-red-400 text-sm font-semibold rounded-xl transition cursor-pointer"
          >
            <Flag className="size-4" />
            Report
          </button>
        </div>

        {/* Reviews Section */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-6 flex items-center gap-2">
            <MessageSquare className="size-4" /> Reviews & Ratings
          </h2>

          {/* Write Review */}
          {canView && user ? (
            <div className="mb-6 pb-6 border-b border-zinc-800/60">
              <p className="text-sm font-semibold text-zinc-300 mb-3">Write a Review</p>

              {/* Star Rating */}
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setReviewRating(star)}>
                    <Star className={`size-6 transition ${star <= reviewRating ? "fill-amber-400 text-amber-400" : "text-zinc-600"}`} />
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Share your experience with this prompt..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={3}
                className="w-full bg-zinc-800/50 border border-zinc-700/50 focus:border-purple-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-zinc-300 placeholder-zinc-600 resize-none mb-3"
              />

              <button
                onClick={handleReviewSubmit}
                disabled={reviewSubmitting}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition cursor-pointer"
              >
                {reviewSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          ) : canView && !user ? (
            <div className="mb-6 pb-6 border-b border-zinc-800/60 text-sm text-zinc-500">
              <button onClick={() => router.push("/login")} className="text-purple-400 hover:underline">Login</button> to write a review.
            </div>
          ) : null}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <p className="text-sm text-zinc-500">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="flex flex-col gap-4">
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
                  <p className="text-sm text-zinc-400 leading-relaxed">{review.comment}</p>
                  <p className="text-xs text-zinc-600 mt-2">{new Date(review.createdAt).toLocaleDateString('en-GB')}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-zinc-100">Report Prompt</h3>
              <button onClick={() => setShowReportModal(false)} className="text-zinc-500 hover:text-zinc-300">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              {REPORT_REASONS.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setReportReason(reason)}
                  className={`text-left text-sm px-4 py-2.5 rounded-xl border transition ${
                    reportReason === reason
                      ? "bg-red-950/40 border-red-900/50 text-red-400"
                      : "bg-zinc-800/50 border-zinc-700/50 text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            <textarea
              placeholder="Additional description (optional)..."
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              rows={3}
              className="w-full bg-zinc-800/50 border border-zinc-700/50 focus:border-red-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-zinc-300 placeholder-zinc-600 resize-none mb-4"
            />

            <button
              onClick={handleReport}
              disabled={reportSubmitting}
              className="w-full py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition cursor-pointer"
            >
              {reportSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}