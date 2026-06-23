"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Scale, FileText, Lock, AlertCircle, HelpCircle } from "lucide-react";

export default function TermsHomePage() {
  
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const sections = [
    {
      icon: <Scale className="size-5 text-purple-400" />,
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using the AI Prompt Marketplace, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
    },
    {
      icon: <FileText className="size-5 text-pink-400" />,
      title: "2. Prompt Licensing & Usage",
      content:
        "When you purchase a prompt from our marketplace, you are granted a non-exclusive, non-transferable, worldwide license to use the prompt for personal or commercial AI generation. You may not resell, redistribute, or sub-license the raw text of the prompts themselves.",
    },
    {
      icon: <Shield className="size-5 text-amber-400" />,
      title: "3. Creator Intellectual Property",
      content:
        "Creators retain the core copyright of their engineered prompts. However, by submitting a prompt to our marketplace, creators grant us the right to display, market, and distribute the prompt to buyers globally.",
    },
    {
      icon: <Lock className="size-5 text-cyan-400" />,
      title: "4. Payments, Fees & Refunds",
      content:
        "All transactions are securely processed via Stripe. Due to the digital and instantly reproducible nature of AI prompts, all sales are final and non-refundable unless a prompt is proven to be completely broken or non-functional.",
    },
    {
      icon: <AlertCircle className="size-5 text-rose-400" />,
      title: "5. Prohibited Conduct",
      content:
        "Users agree not to upload prompts that generate harmful, illegal, hateful, or explicit content violating the safety guidelines of Midjourney, OpenAI, Claude, or other underlying AI platforms.",
    },
  ];

  return (
    <div className="w-full bg-[#09090b] text-zinc-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 relative overflow-hidden">
      

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-100 h-100 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-600/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto z-10 relative"
      >

        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 mb-4 backdrop-blur-xs">
            <HelpCircle className="h-3.5 w-3.5 text-purple-400" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-500 to-amber-400">
              Service
            </span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Please read these terms carefully before using our AI Prompt Ecosystem. Last updated: June 2026.
          </p>
        </motion.div>

        {/* Content Box */}
        <motion.div 
          variants={itemVariants}
          className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl shadow-purple-950/5 space-y-8"
        >
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="group border-b border-zinc-800/60 last:border-0 pb-6 last:pb-0 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                  {section.icon}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-200 tracking-wide">
                  {section.title}
                </h2>
              </div>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed pl-13">
                {section.content}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-10 text-xs sm:text-sm text-zinc-500"
        >
          Have questions about our terms? Contact our support team at{" "}
          <span className="text-purple-400 hover:underline cursor-pointer">hafezmasudranamn@gmail.com</span>
        </motion.div>
      </motion.div>
    </div>
  );
}