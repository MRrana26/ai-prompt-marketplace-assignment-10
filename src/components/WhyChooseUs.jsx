"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Zap, Users } from "lucide-react";

const BENEFITS = [
  {
    icon: <Target className="h-6 w-6 text-purple-400" />,
    title: "Battle-Tested Prompts",
    desc: "Every single prompt goes through strict admin moderation to ensure it delivers production-grade results."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-pink-400" />,
    title: "Secure Premium Marketplace",
    desc: "Monetize your prompt engineering skills safely. Built-in Stripe payment gateway prevents leaks."
  },
  {
    icon: <Zap className="h-6 w-6 text-amber-400" />,
    title: "One-Click Clipboard Integration",
    desc: "Seamlessly copy, benchmark, or bookmark complex multi-turn prompts optimized for ChatGPT, Claude, & Midjourney."
  },
  {
    icon: <Users className="h-6 w-6 text-blue-400" />,
    title: "Creator Ecosystem & Reviews",
    desc: "Review, rate, and report transparently. Connect with the world's finest context engineers."
  }
];

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#09090b] border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto">
        
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Engineered for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Next Generation</span> of AI Creators
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Why settle for generic queries? PromptVerse guarantees optimal tokens, clear context guidelines, and reliable performance across top foundational models.
          </p>
        </div>

        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/80 hover:bg-zinc-900/40 hover:border-zinc-700/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 w-fit mb-4">
                  {benefit.icon}
                </div>
               
                <h3 className="text-base font-bold text-zinc-100 mb-2">
                  {benefit.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}