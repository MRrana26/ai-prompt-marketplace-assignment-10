"use client";

import React from "react";
import { AlertTriangle, Calendar, Eye, CheckCircle2, UserX, Trash2, User } from "lucide-react";

const reportedPromptsData = [
  {
    id: "1",
    reason: "SPAM",
    reportedDate: "20/06/2026",
    promptTitle: "check",
    reportDetails: "this report just cheking",
    reportedBy: "user (user@gmail.com)",
  }
];

export default function ReportedPromptsHomePage() {

 
  const handleAction = (actionType, reportId) => {
    console.log(`Action: ${actionType} on Report ID: ${reportId}`);
  };

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
      {/* Header Title Section */}
      <div className="mb-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Reported Prompts Moderation Queue
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Review community warnings, warn creators, dismiss complaints, or remove posts.
        </p>
      </div>

      {/* Reported Items List Wrapper */}
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        {reportedPromptsData.map((report) => (
          <div 
            key={report.id}
            className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-xs shadow-xl flex flex-col gap-4"
          >
            {/* Top Meta: Reason Badge & Date */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-950/40 text-red-400 border border-red-900/40 tracking-wider">
                <AlertTriangle className="size-3.5" />
                REASON: {report.reason}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                <Calendar className="size-4 shrink-0" />
                <span>Reported on {report.reportedDate}</span>
              </div>
            </div>

            {/* Prompt Title */}
            <div>
              <h2 className="text-lg font-bold text-zinc-100 tracking-wide">
                Prompt: <span className="font-semibold text-zinc-300">{report.promptTitle}</span>
              </h2>
            </div>

            {/* Report Details Box */}
            <div className="w-full p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/60 text-sm">
              <span className="text-zinc-500 font-medium">Report Details: </span>
              <span className="text-zinc-300 font-normal">{report.reportDetails}</span>
            </div>

            {/* Bottom Row: Reporter Info & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-zinc-800/30">
              {/* Reported By Info */}
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                <User className="size-4 text-zinc-600 shrink-0" />
                <span>Reported by: <span className="text-zinc-400 font-semibold">{report.reportedBy}</span></span>
              </div>

              {/* Action Buttons Group */}
              <div className="flex items-center flex-wrap gap-2">
                {/* Inspect Button */}
                <button
                  onClick={() => handleAction("inspect", report.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-600 transition-all cursor-pointer"
                >
                  <Eye className="size-4 text-zinc-400" />
                  <span>Inspect</span>
                </button>

                {/* Dismiss Button */}
                <button
                  onClick={() => handleAction("dismiss", report.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                >
                  <CheckCircle2 className="size-4" />
                  <span>Dismiss</span>
                </button>

                {/* Warn Creator Button */}
                <button
                  onClick={() => handleAction("warn", report.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-950/20 border border-amber-900/30 text-amber-500 hover:bg-amber-600 hover:text-white transition-all cursor-pointer"
                >
                  <AlertTriangle className="size-4" />
                  <span>Warn Creator</span>
                </button>

                {/* Remove Prompt Button */}
                <button
                  onClick={() => handleAction("remove", report.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-red-950/30 border border-red-900/50 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                >
                  <Trash2 className="size-4" />
                  <span>Remove Prompt</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}