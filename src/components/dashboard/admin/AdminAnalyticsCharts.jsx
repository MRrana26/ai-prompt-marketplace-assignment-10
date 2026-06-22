"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { BarChart3, PieChart as PieIcon } from "lucide-react";

const PIE_COLORS = ["#a855f7", "#10b981", "#06b6d4", "#f59e0b", "#f43f5e", "#3b82f6", "#ec4899"];

export default function AdminAnalyticsCharts({ stats }) {

  const barData = (stats?.engineStats || []).map((e) => ({
    name: e._id || "Unknown",
    Copies: e.copies || 0,
    Prompts: e.prompts || 0,
  }));

  const pieData = (stats?.engineStats || []).map((e, i) => ({
    name: e._id || "Unknown",
    value: e.prompts || 0,
    color: PIE_COLORS[i % PIE_COLORS.length],
  }));

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">

        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-xs flex flex-col h-[450px]">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="size-5 text-zinc-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-wide">
              Engine Prompts Density vs Total Copies
            </h2>
          </div>

          <div className="w-full flex-1 min-h-0 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" tickLine={false} />
                <YAxis stroke="#71717a" tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "8px", color: "#f4f4f5" }}
                />
                <Legend iconType="square" verticalAlign="bottom" height={36} />
                <Bar dataKey="Copies" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={35} />
                <Bar dataKey="Prompts" fill="#a855f7" radius={[4, 4, 0, 0]} maxBarSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-xs flex flex-col h-[450px]">
          <div className="flex items-center gap-2 mb-6">
            <PieIcon className="size-5 text-zinc-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-wide">
              Prompt Distribution Share
            </h2>
          </div>

          <div className="w-full flex-1 min-h-0 relative flex flex-col justify-between">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Tooltip
                  contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "8px", color: "#f4f4f5" }}
                />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#18181b" strokeWidth={2} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-zinc-400 mt-2 px-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="size-3 rounded-xs shrink-0" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}