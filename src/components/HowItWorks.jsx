"use client";

import { motion } from "framer-motion";
import { Search, Copy, Zap, Upload } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    color: "text-purple-400 bg-purple-950/40 border-purple-900/50",
    step: "01",
    title: "Discover Prompts",
    desc: "Browse thousands of community-crafted prompts across categories like coding, writing, design, and more."
  },
  {
    icon: Copy,
    color: "text-cyan-400 bg-cyan-950/40 border-cyan-900/50",
    step: "02",
    title: "Copy & Use Instantly",
    desc: "One-click copy any prompt directly to your clipboard and paste it into your favorite AI tool."
  },
  {
    icon: Upload,
    color: "text-pink-400 bg-pink-950/40 border-pink-900/50",
    step: "03",
    title: "Publish Your Own",
    desc: "Create and publish your engineered prompts to the marketplace. Set visibility and earn community recognition."
  },
  {
    icon: Zap,
    color: "text-amber-400 bg-amber-950/40 border-amber-900/50",
    step: "04",
    title: "Unlock Premium",
    desc: "Subscribe for $5 lifetime access to all private premium prompts from top creators worldwide."
  },
];

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#09090b] border-b border-zinc-900 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <Zap className="h-4 w-4" /> Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">PromptVerse</span> Works
          </h2>
          <p className="text-zinc-400 text-sm mt-3">
            Get started in minutes. No complex setup — just find, copy, and supercharge your AI workflow.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="relative flex flex-col gap-4 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700/60 transition-all duration-300 group"
              >
                <span className="absolute top-4 right-4 text-4xl font-black text-zinc-800/40 group-hover:text-zinc-800/60 transition-colors">
                  {step.step}
                </span>
                <div className={`p-3 rounded-xl border w-fit ${step.color}`}>
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 group-hover:text-purple-400 transition-colors mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}