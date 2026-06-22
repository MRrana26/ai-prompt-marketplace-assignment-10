"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import { BarChart3, TrendingUp } from "lucide-react";

export default function CreatorAnalyticsCharts({ prompts = [] }) {

  const totalCopies = Array.isArray(prompts)
    ? prompts.reduce(
        (sum, p) => sum + Number(p?.copyCount || 0),
        0
      )
    : 0;

  const barData = [
    {
      name: "Overview",
      Bookmarks: 0,
      Copies: totalCopies,
    },
  ];

  const growthData = Array.isArray(prompts)
    ? prompts
        .map((p) => ({
          date: p?.createdAt
            ? new Date(p.createdAt).toLocaleDateString("en-CA")
            : "N/A",

          "Total Copies": Number(p?.copyCount || 0),

          "Total Prompts": 1,
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    : [];

  return (
    <div className="w-full bg-zinc-950 flex flex-col gap-6 text-zinc-100 p-1">

      {/* CHART 1 */}
      <div className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 shadow-xl">

        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="size-4 text-zinc-400" />
          <h2 className="text-sm font-bold text-zinc-200 tracking-wide">
            Prompt Templates Copies vs Bookmarks
          </h2>
        </div>

        <div className="w-full h-64 sm:h-72">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={barData}
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1f2937"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
              />

              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                domain={[0, "auto"]}
                tickCount={5}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "#18181b" }}
                contentStyle={{
                  backgroundColor: "#09090b",
                  borderColor: "#27272a",
                  color: "#f4f4f5",
                  borderRadius: "12px",
                }}
              />

              <Legend
                iconType="square"
                iconSize={10}
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "15px",
                }}
              />

              <Bar
                dataKey="Bookmarks"
                fill="#a855f7"
                maxBarSize={180}
                radius={[10, 10, 0, 0]}
              />

              <Bar
                dataKey="Copies"
                fill="#06b6d4"
                maxBarSize={180}
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* CHART 2 */}

      <div className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 shadow-xl">

        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="size-4 text-zinc-400" />

          <h2 className="text-sm font-bold text-zinc-200 tracking-wide">
            Accumulative Growth Metrics
          </h2>
        </div>

        <div className="w-full h-64 sm:h-72">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart
              data={growthData}
              margin={{ top: 10, right: 20, left: -25, bottom: 0 }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1f2937"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                minTickGap={20}
              />

              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                domain={[0, "auto"]}
                tickCount={5}
                tickLine={false}
              />

              <Tooltip
                cursor={{ stroke: "#27272a", strokeWidth: 1 }}
                contentStyle={{
                  backgroundColor: "#09090b",
                  borderColor: "#27272a",
                  color: "#f4f4f5",
                  borderRadius: "12px",
                }}
              />

              <Legend
                iconType="plainline"
                iconSize={12}
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "15px",
                }}
              />

              <Line
                type="monotone"
                dataKey="Total Copies"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{
                  fill: "#06b6d4",
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="Total Prompts"
                stroke="#a855f7"
                strokeWidth={2}
                dot={{
                  fill: "#a855f7",
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{ r: 6 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}