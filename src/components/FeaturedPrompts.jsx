"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Copy, Star, ShieldCheck, ArrowUpRight, Zap } from "lucide-react";
import { Button } from "@heroui/react";


const MOCK_PROMPTS = [
    {
        id: "1",
        title: "Ultimate SEO Article Writer",
        category: "Writing",
        aiTool: "ChatGPT",
        copyCount: 1240,
        rating: 4.9,
        creator: "Alen Walker",
        visibility: "Public"
    },

    {
        id: "2",
        title: "Cyberpunk Character Engine",
        category: "Design",
        aiTool: "Midjourney",
        copyCount: 890,
        rating: 4.8,
        creator: "Sumi Khan",
        visibility: "Public"
    },

    {
        id: "3",
        title: "SaaS Clean Code Optimizer",
        category: "Coding",
        aiTool: "Claude 3.5",
        copyCount: 1520,
        rating: 5.0,
        creator: "Dev Jhon",
        visibility: "Private"
    },

    {
        id: "4",
        title: "High-Converting FB Ads Copy",
        category: "Marketing",
        aiTool: "Gemini",
        copyCount: 650,
        rating: 4.6,
        creator: "Rony Ahmed",
        visibility: "Public"
    },

    {
        id: "5",
        title: "Hyper-Realistic Product Shoot",
        category: "Design",
        aiTool: "Midjourney",
        copyCount: 1100,
        rating: 4.9,
        creator: "Anika Roy",
        visibility: "Public"
    },

    {
        id: "6",
        title: "Automated Python Script Builder",
        category: "Coding",
        aiTool: "ChatGPT",
        copyCount: 940,
        rating: 4.7,
        creator: "Asif Iqbal",
        visibility: "Public"
    },
];

export default function FeaturedPrompts() {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#09090b] border-b border-zinc-900 relative">
            <div className="max-w-7xl mx-auto">

                {/* header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold tracking-wider uppercase mb-2">
                            <Zap className="h-4 w-4" /> Marketplace
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Trending <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">AI Prompts</span>
                        </h2>
                    </div>

                    <Link
                        href={"/all-prompts"}
                        className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-purple-400 transition-colors group"
                    >
                        View all public prompts
                        <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>


                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {MOCK_PROMPTS.map((prompt) => (
                        <motion.div
                            key={prompt.id}
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                            className="group relative flex flex-col justify-between bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/40 rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm"
                        >
                            <div>

                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                                        {prompt.aiTool}
                                    </span>
                                    {prompt.visibility === "Private" && (
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                                            <ShieldCheck className="h-3.5 w-3.5" /> Premium
                                        </span>
                                    )}
                                </div>


                                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-purple-400 transition-colors mb-2 line-clamp-1">
                                    {prompt.title}
                                </h3>


                                <p className="text-xs text-zinc-500 mb-6">
                                    Category: <span className="text-zinc-400 font-medium">{prompt.category}</span>
                                </p>
                            </div>


                            <div>
                                <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4 mb-4 text-xs text-zinc-400">
                                    <div className="flex items-center gap-1.5">
                                        <Copy className="h-3.5 w-3.5 text-zinc-500" />
                                        <span>{prompt.copyCount} copies</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                        <span className="font-medium text-zinc-200">{prompt.rating}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs text-zinc-500 truncate">
                                        by <span className="text-zinc-400 hover:underline cursor-pointer">{prompt.creator}</span>
                                    </span>


                                    <Button
                                        className="text-xs font-semibold bg-zinc-800 hover:bg-purple-600 hover:text-white text-zinc-200 px-4 py-2 rounded-xl border border-zinc-700/60 hover:border-purple-500/50 transition-all active:scale-95 whitespace-nowrap"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}