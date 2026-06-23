"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, Calendar, Eye, CheckCircle2, Trash2, User, Loader2 } from "lucide-react";
import { getAllReports, dismissReport, removePromptAndReport, warnCreator } from "@/lib/api/prompts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ReportedPromptsHomePage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await getAllReports();
        setReports(data);
      } catch (error) {
        toast.error("Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleAction = async (actionType, report) => {
    const reportId = report._id;
    const promptId = report.promptId;

    if (actionType === "inspect") {
      router.push(`/prompts/${promptId}`);
    }

    else if (actionType === "dismiss") {
      const success = await dismissReport(reportId);
      if (success) {
        toast.success("Report dismissed successfully");
        setReports((prev) => prev.filter((r) => r._id !== reportId));
      } else {
        toast.error("Failed to dismiss report");
      }
    }

    else if (actionType === "warn") {
      const creatorEmail = report.promptDetails?.creatorEmail || report.promptDetails?.userEmail;
      const success = await warnCreator(reportId, creatorEmail);
      if (success) {
        toast.success("Creator has been warned!");
        setReports(prev => prev.map(r => r._id === reportId ? { ...r, status: "warned" } : r));
      } else {
        toast.error("Failed to warn creator");
      }
    }

    else if (actionType === "remove") {
      if (!confirm("Are you sure you want to permanently remove this prompt?")) return;
      const success = await removePromptAndReport(promptId, reportId);
      if (success) {
        toast.success("Prompt and report permanently removed");
        setReports((prev) => prev.filter((r) => r._id !== reportId));
      } else {
        toast.error("Failed to remove prompt");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-3 min-h-screen bg-zinc-950 text-zinc-100">
        <Loader2 className="size-8 text-red-500 animate-spin" />
        <p className="text-sm text-zinc-400">Loading moderation queue...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
      <div className="mb-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Reported Prompts Moderation Queue
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Review community warnings, warn creators, dismiss complaints, or remove posts.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        {reports.length === 0 ? (
          <div className="p-16 text-center text-zinc-500 bg-zinc-900/20 border border-zinc-800 rounded-2xl text-sm">
            No reported prompts in the queue. Community is clean!
          </div>
        ) : (
          reports.map((report) => {
            const formattedDate = report.createdAt
              ? new Date(report.createdAt).toLocaleDateString("en-GB")
              : "N/A";

            return (
              <div
                key={report._id}
                className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-xs shadow-xl flex flex-col gap-4"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-950/40 text-red-400 border border-red-900/40 tracking-wider uppercase">
                    <AlertTriangle className="size-3.5" />
                    REASON: {report.reason}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                    <Calendar className="size-4 shrink-0" />
                    <span>Reported on {formattedDate}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-zinc-100 tracking-wide">
                    Prompt:{" "}
                    <span className="font-semibold text-zinc-300">
                      {report.promptDetails?.title || "Unknown / Deleted Prompt"}
                    </span>
                  </h2>
                </div>

                <div className="w-full p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/60 text-sm">
                  <span className="text-zinc-500 font-medium">Report Details: </span>
                  <span className="text-zinc-300 font-normal">{report.description || "No description provided."}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-zinc-800/30">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                    <User className="size-4 text-zinc-600 shrink-0" />
                    <span>
                      Reported by: <span className="text-zinc-400 font-semibold">{report.reporterEmail}</span>
                    </span>
                  </div>

                  <div className="flex items-center flex-wrap gap-2">
                    <button
                      onClick={() => handleAction("inspect", report)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-600 transition-all cursor-pointer"
                    >
                      <Eye className="size-4 text-zinc-400" />
                      <span>Inspect</span>
                    </button>

                    <button
                      onClick={() => handleAction("dismiss", report)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="size-4" />
                      <span>Dismiss</span>
                    </button>

                    <button
                      onClick={() => handleAction("warn", report)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        report.status === "warned"
                          ? "bg-amber-600 border-amber-500 text-white"
                          : "bg-amber-950/20 border-amber-900/30 text-amber-500 hover:bg-amber-600 hover:text-white"
                      }`}
                    >
                      <AlertTriangle className="size-4" />
                      <span>{report.status === "warned" ? "Warned" : "Warn Creator"}</span>
                    </button>

                    <button
                      onClick={() => handleAction("remove", report)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-red-950/30 border border-red-900/50 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                    >
                      <Trash2 className="size-4" />
                      <span>Remove Prompt</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}