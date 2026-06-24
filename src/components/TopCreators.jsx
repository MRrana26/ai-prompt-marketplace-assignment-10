"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { getTopCreators } from "@/lib/api/prompts";

export default function TopCreators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getTopCreators();
      setCreators(data);
    };
    load();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  if (creators.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#09090b] border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-pink-500 text-sm font-semibold tracking-wider uppercase mb-2">
              <Award className="h-4 w-4" /> Leaderboard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Meet the Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Prompt Engineers</span>
            </h2>
          </div>
          <button className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-pink-500 transition-colors group">
            View ranking leaderboard
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {creators.map((creator, index) => (
            <motion.div
              key={creator._id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700/60 rounded-2xl p-6 text-center transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-600/5 rounded-full blur-xl group-hover:bg-purple-600/10 transition-all" />

              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-purple-950/40 border-2 border-zinc-800 group-hover:border-pink-500/50 transition-all flex items-center justify-center text-2xl font-bold text-purple-400">
                  {creator._id?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-zinc-900 p-1.5 rounded-full border border-zinc-800 text-amber-400 shadow-md">
                  <ShieldCheck className="h-4 w-4 fill-amber-400/10" />
                </div>
              </div>

              <h3 className="text-base font-bold text-zinc-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all mb-1">
                {creator._id?.split("@")[0]}
              </h3>

              <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider text-purple-400 uppercase bg-purple-500/5 px-2.5 py-0.5 rounded-full border border-purple-500/10 mb-4">
                <Sparkles className="h-2.5 w-2.5" />
                {index === 0 ? "Elite Master" : index === 1 ? "Pro Creator" : index === 2 ? "Core Engineer" : "Rising Star"}
              </span>

              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-zinc-800/60 text-xs">
                <div className="text-left pl-2">
                  <p className="text-zinc-500 text-[11px]">Prompts</p>
                  <p className="font-semibold text-zinc-300 mt-0.5">{creator.totalPrompts}</p>
                </div>
                <div className="text-right pr-2 border-l border-zinc-800/60">
                  <p className="text-zinc-500 text-[11px]">Total Copies</p>
                  <p className="font-semibold text-zinc-300 mt-0.5">{creator.totalCopies}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}