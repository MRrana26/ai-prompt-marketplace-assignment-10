
"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const AI_TOOLS = [
  { name: "ChatGPT", color: "text-emerald-400 bg-emerald-950/40 border-emerald-900/50", desc: "World's most popular conversational AI for writing, coding, and analysis." },
  { name: "Midjourney", color: "text-pink-400 bg-pink-950/40 border-pink-900/50", desc: "Industry-leading image generation for stunning visual content creation." },
  { name: "Claude", color: "text-purple-400 bg-purple-950/40 border-purple-900/50", desc: "Anthropic's powerful AI for nuanced reasoning and long-form content." },
  { name: "Gemini", color: "text-blue-400 bg-blue-950/40 border-blue-900/50", desc: "Google's multimodal AI excelling at research and factual analysis." },
  { name: "Stable Diffusion", color: "text-amber-400 bg-amber-950/40 border-amber-900/50", desc: "Open-source image AI for photorealistic and artistic generations." },
  { name: "DALL·E", color: "text-cyan-400 bg-cyan-950/40 border-cyan-900/50", desc: "OpenAI's creative image generator for unique visual concepts." },
];

export default function AIToolsShowcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#09090b] border-b border-zinc-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-purple-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <Sparkles className="h-4 w-4" /> Supported Engines
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Prompts for Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">AI Engine</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-3">
            PromptVerse supports all major AI platforms. Find the perfect engineered prompt for your favorite tool.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {AI_TOOLS.map((tool) => (
            <motion.div
              key={tool.name}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700/60 transition-all duration-300 group"
            >
              <div className={`p-3 rounded-xl border shrink-0 font-black text-sm ${tool.color}`}>
                {tool.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-zinc-100 group-hover:text-purple-400 transition-colors mb-1">
                  {tool.name}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{tool.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}