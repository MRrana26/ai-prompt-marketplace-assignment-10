"use client";

import React from "react";
import { Users, FileText, MessageSquare, Copy, DollarSign } from "lucide-react";

export default function AdminAnalyticsTotalCard({ stats }) {

  const analyticsData = [
    {
      id: "users",
      label: "Total Users",
      value: stats?.totalUsers ?? "—",
      icon: Users,
      iconColor: "text-purple-400 bg-purple-950/40 border-purple-900/50",
    },
    {
      id: "prompts",
      label: "Total Prompts",
      value: stats?.totalPrompts ?? "—",
      icon: FileText,
      iconColor: "text-cyan-400 bg-cyan-950/40 border-cyan-900/50",
    },
    {
      id: "reviews",
      label: "Total Reviews",
      value: stats?.totalReviews ?? "—",
      icon: MessageSquare,
      iconColor: "text-emerald-400 bg-emerald-950/40 border-emerald-900/50",
    },
    {
      id: "copies",
      label: "Total Copies",
      value: stats?.totalCopies ?? "—",
      icon: Copy,
      iconColor: "text-amber-500 bg-amber-950/40 border-amber-900/50",
    },
    {
      id: "revenue",
      label: "Total Revenue",
      value: stats?.totalRevenue ? `$${stats.totalRevenue}.00` : "$0.00",
      icon: DollarSign,
      iconColor: "text-rose-400 bg-rose-950/40 border-rose-900/50",
    },
  ];

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Administrative System Analytics
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Aggregate metrics and engine distribution breakdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {analyticsData.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 shadow-xs backdrop-blur-xs transition-all hover:bg-zinc-800/40 hover:border-zinc-700/60"
            >
              <div className={`p-3 rounded-xl border shrink-0 ${item.iconColor}`}>
                <IconComponent className="size-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  {item.label}
                </span>
                <span className="text-2xl font-extrabold text-zinc-100 mt-0.5 tracking-wide">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}