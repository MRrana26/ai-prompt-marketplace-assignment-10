"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

const TOP_CREATORS = [
  {
    id: "c1",
    name: "Alen Walker",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    totalPrompts: 42,
    totalCopies: "12.4k",
    badge: "Elite Master"
  },
  {
    id: "c2",
    name: "Sumi Khan",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    totalPrompts: 31,
    totalCopies: "9.2k",
    badge: "Pro Designer"
  },
  {
    id: "c3",
    name: "Dev Jhon",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150",
    totalPrompts: 28,
    totalCopies: "15.1k",
    badge: "Core Engineer"
  },
  {
    id: "c4",
    name: "Anika Roy",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    totalPrompts: 22,
    totalCopies: "7.8k",
    badge: "Midjourney Guru"
  }
];

export default function TopCreators() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

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
          {TOP_CREATORS.map((creator) => (
            <motion.div
              key={creator.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700/60 rounded-2xl p-6 text-center transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-600/5 rounded-full blur-xl group-hover:bg-purple-600/10 transition-all" />

              <div className="relative w-20 h-20 mx-auto mb-4">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-full h-full rounded-full object-cover ring-2 ring-zinc-800 group-hover:ring-pink-500/50 transition-all"
                />
                <div className="absolute -bottom-1 -right-1 bg-zinc-900 p-1.5 rounded-full border border-zinc-800 text-amber-400 shadow-md">
                  <ShieldCheck className="h-4 w-4 fill-amber-400/10" />
                </div>
              </div>

              <h3 className="text-base font-bold text-zinc-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all mb-1">
                {creator.name}
              </h3>

              <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider text-purple-400 uppercase bg-purple-500/5 px-2.5 py-0.5 rounded-full border border-purple-500/10 mb-4">
                <Sparkles className="h-2.5 w-2.5" /> {creator.badge}
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