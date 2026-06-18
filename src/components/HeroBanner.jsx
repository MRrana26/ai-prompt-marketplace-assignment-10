"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { Button } from "@heroui/react";
import { toast } from "sonner";

const AllTags = [
  "Midjourney v6",
  "SEO Optimizer",
  "Claude 3.5 Sonnet",
  "Logo Generator",
  "SaaS Copywriting",
  "React Expert",
  "UI/UX Idea",
  "Cyberpunk Art",
  "Python Script",
];

const trendingTags = [...AllTags]
  .slice(0, 5);

export default function HeroBanner() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    toast.success(searchQuery)
  };

  // Motion Animation
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#09090b] px-4 sm:px-6 lg:px-8 border-b border-zinc-900">

      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="absolute top-1/3 left-1/3 w-75 h-75 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >

        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 mb-6 backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />

          <span>The Ultimate AI Prompt Ecosystem</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]"
        >
          Discover & Share

          <br className="hidden sm:inline" />

          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-500 to-amber-400">
            {" "}
            Next-Gen AI Prompts
          </span>
        </motion.h1>

        {/* Sub Heading */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10"
        >
          Supercharge your productivity and automation.

          Explore a curated marketplace of engineered prompts
          for ChatGPT, Midjourney, Claude, and more.
        </motion.p>

        {/* Search Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto mb-6"
        >
          <div className="relative flex items-center p-2 rounded-2xl bg-zinc-900/90 border border-zinc-800 focus-within:border-purple-500/50 shadow-2xl shadow-purple-900/10 transition-all backdrop-blur-md">

            <Search className="absolute left-4 h-5 w-5 text-zinc-500" />

            <input
              type="text"
              placeholder="Search prompts by title, tool, or tags (e.g., Midjourney)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pl-12 pr-32 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none text-sm sm:text-base"
            />

            <button
              type="submit"
              className="absolute right-2 flex items-center gap-1.5 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-purple-600/20"
            >
              <span>Explore</span>

              <ArrowRight className="h-4 w-4" />
            </button>

          </div>
        </motion.form>

        {/* Trending Tags */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-500"
        >

          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <Terminal className="h-3.5 w-3.5 text-pink-500" />
            Trending:
          </span>

          {trendingTags.map((tag, index) => (
            <Button
              key={index}
              onClick={() => setSearchQuery(tag)}
              className="text-xs font-medium text-zinc-400 bg-zinc-900 hover:bg-zinc-800 hover:text-purple-400 px-3 py-1.5 rounded-lg border border-zinc-800/60 transition-colors"
            >
              #{tag}
            </Button>

          ))}

        </motion.div>

      </motion.div>

    </div>
  );
}