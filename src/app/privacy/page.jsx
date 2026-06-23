"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Database, Cookie, UserCheck, ShieldAlert, Key } from "lucide-react";

export default function PrivacyPage() {
  
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

  const privacySections = [
    {
      icon: <Database className="size-5 text-purple-400" />,
      title: "1. Information We Collect",
      content:
        "We collect personal information that you voluntarily provide to us when you register on the marketplace, express an interest in obtaining information about us or our products, or when you buy/sell prompts. This includes names, email addresses, and billing details via Stripe.",
    },
    {
      icon: <Eye className="size-5 text-pink-400" />,
      title: "2. How We Use Your Information",
      content:
        "We use the information we collect to facilitate account creation, process financial transactions securely, prevent fraud, and deliver the specific AI prompts you purchase or sell on our marketplace platform.",
    },
    {
      icon: <Cookie className="size-5 text-amber-400" />,
      title: "3. Cookies & Tracking Technologies",
      content:
        "Our platform uses secure sessions and cookies to remember your login state and active cart items. These technologies help us understand user behavior, optimize site navigation, and improve your overall marketplace experience.",
    },
    {
      icon: <UserCheck className="size-5 text-cyan-400" />,
      title: "4. Data Sharing & Third-Parties",
      content:
        "Your data is never sold to third-party advertisers. We only share crucial payment information with Stripe to process subscriptions or prompt payouts, and with underlying AI platforms if compliance audits require prompt engineering verification.",
    },
    {
      icon: <ShieldAlert className="size-5 text-rose-400" />,
      title: "5. Data Security & Retention",
      content:
        "We implement industry-standard technical security measures to safeguard your personal data. We keep your information only as long as necessary to fulfill your transaction history and maintain secure logs for admin audits.",
    },
  ];

  return (
    <div className="w-full bg-[#09090b] text-zinc-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-120 h-120 bg-pink-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-90 h-90 bg-purple-600/5 rounded-full blur-[110px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto z-10 relative"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 mb-4 backdrop-blur-xs">
            <Key className="h-3.5 w-3.5 text-pink-400" />
            <span>Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-500 to-amber-400">
              Policy
            </span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Your privacy is crucial to us. Learn how we handle, store, and secure your personal marketplace data.
          </p>
        </motion.div>

        {/* Content Box */}
        <motion.div 
          variants={itemVariants}
          className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl shadow-purple-950/5 space-y-8"
        >
          {privacySections.map((section, index) => (
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
          Have questions or concerns regarding your data? Reach out to our privacy officer at{" "}
          <span className="text-pink-400 hover:underline cursor-pointer">hafezmasudranamn@gmail.com</span>
        </motion.div>
      </motion.div>
    </div>
  );
}