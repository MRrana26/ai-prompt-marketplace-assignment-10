"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { BarChart3, PieChart as PieIcon } from "lucide-react";

// ১. ডেমো ডাটা (পরবর্তীতে আপনি সার্ভার থেকে আসা ডাটা এখানে ম্যাপ করতে পারবেন)
const barData = [
  { name: "ChatGPT", Copies: 230, Prompts: 5 },
  { name: "Gemini", Copies: 140, Prompts: 4 },
  { name: "Claude", Copies: 250, Prompts: 5 },
  { name: "Midjourney", Copies: 188, Prompts: 3 },
  { name: "Stable Diffusion", Copies: 0, Prompts: 0 },
];

const pieData = [
  { name: "ChatGPT", value: 30, color: "#a855f7" }, // Purple
  { name: "Claude", value: 25, color: "#10b981" },    // Emerald Green
  { name: "Gemini", value: 25, color: "#06b6d4" },    // Cyan Blue
  { name: "Midjourney", value: 15, color: "#f59e0b" }, // Amber/Orange
  { name: "Stable Diffusion", value: 5, color: "#f43f5e" }, // Rose/Red
];

export default function AdminAnalyticsCharts({ serverData }) {
  // যদি সার্ভার থেকে ডাটা আসে, তবে সেটিকে ব্যবহার করার প্রিপারেশন:
  // const dataForBar = serverData?.bar || barData;
  // const dataForPie = serverData?.pie || pieData;

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        
        {/* বাম পাশের কার্ড: Bar Chart */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-xs flex flex-col h-[450px]">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="size-5 text-zinc-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-wide">
              Engine Prompts Density vs Total Copies
            </h2>
          </div>

          {/* Chart Container */}
          <div className="w-full flex-1 min-h-0 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" tickLine={false} />
                <YAxis stroke="#71717a" tickLine={false} domain={[0, 260]} ticks={[0, 65, 130, 195, 260]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "8px", color: "#f4f4f5" }}
                />
                <Legend iconType="square" verticalAlign="bottom" height={36} />
                {/* Copies (Cyan Bar) */}
                <Bar dataKey="Copies" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={35} />
                {/* Prompts (Purple Bar) */}
                <Bar dataKey="Prompts" fill="#a855f7" radius={[4, 4, 0, 0]} maxBarSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ডান পাশের কার্ড: Pie / Donut Chart */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-xs flex flex-col h-[450px]">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <PieIcon className="size-5 text-zinc-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-wide">
              Prompt Distribution Share
            </h2>
          </div>

          {/* Chart Container */}
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
                  innerRadius={70}  // ডোনাট শেপ দেওয়ার জন্য ইনার রেডিয়াস
                  outerRadius={95}
                  paddingAngle={4}   // প্রতিটি স্লাইসের মাঝের গ্যাপ
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#18181b" strokeWidth={2} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Custom Grid Legend (ছবির মতো নিচে সুন্দর এলাইনমেন্টের জন্য) */}
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