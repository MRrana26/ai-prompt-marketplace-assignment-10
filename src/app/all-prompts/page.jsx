"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Copy, Star, ShieldCheck, Search, SlidersHorizontal, Eye } from "lucide-react";
import { Button } from "@heroui/react";
import { getAllPrompts } from "@/lib/api/prompts";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";

const AllPromptsHomePage = () => {
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = authClient.useSession();

    const [selectedEngine, setSelectedEngine] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [sortBy, setSortBy] = useState('Latest');

    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(() => searchParams.get("search") || '');

    useEffect(() => {
        const fetchPromptsData = async () => {
            try {
                setLoading(true);
                const data = await getAllPrompts();
                const approvedPrompts = data.filter(p => p.status === 'approved' || p.status === undefined);
                setPrompts(approvedPrompts);
            } catch (error) {
                console.error("Failed to fetch prompts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPromptsData();
    }, []);

    const filteredPrompts = useMemo(() => {
        let updatedList = [...prompts];

        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            updatedList = updatedList.filter(prompt =>
                prompt.title.toLowerCase().includes(query) ||
                prompt.shortDescription?.toLowerCase().includes(query) ||
                prompt.tags?.some(tag => tag.toLowerCase().includes(query))
            );
        }
        if (selectedEngine !== 'All') {
            updatedList = updatedList.filter(prompt => prompt.aiEngine === selectedEngine);
        }
        if (selectedCategory !== 'All') {
            updatedList = updatedList.filter(prompt => prompt.category === selectedCategory);
        }


        if (selectedDifficulty !== 'All') {
            updatedList = updatedList.filter(prompt => prompt.difficultyLevel === selectedDifficulty);
        }

        if (sortBy === 'Latest') {
            updatedList.sort((a, b) => b._id.localeCompare(a._id));
        } else if (sortBy === 'Most Popular') {
            updatedList.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortBy === 'Most Copied') {
            updatedList.sort((a, b) => (b.copyCount || 0) - (a.copyCount || 0));
        }

        return updatedList;
    }, [searchQuery, selectedEngine, selectedCategory, selectedDifficulty, sortBy, prompts]);

    const handleResetFilters = () => {
        setSelectedEngine('All');
        setSelectedCategory('All');
        setSelectedDifficulty('All');
        setSearchQuery('');
        setSortBy('Latest');
    };

    return (
        <div className="min-h-screen bg-[#070b13] text-zinc-100 font-sans px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-7xl mx-auto">

                {/* top section: Header and Search Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-900 pb-8 mb-8">
                    <div>
                        <span className="text-xs uppercase tracking-widest font-bold text-purple-500">Catalog</span>
                        <h1 className="text-3xl font-extrabold tracking-tight mt-1">Explore Prompts</h1>
                        <p className="text-zinc-500 text-xs mt-1">
                            Showing {filteredPrompts.length} verified AI prompts
                        </p>
                    </div>
                    {/* Search Field */}
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search prompt, tag, tool..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-purple-500/60 focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm placeholder-zinc-600 transition-colors"
                        />
                    </div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                    {/* Left side: filters pane */}
                    <div className="bg-[#0b132b]/40 border border-zinc-900 rounded-2xl p-5 sticky top-6 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-6 border-b border-zinc-800/60 pb-3">
                            <div className="flex items-center gap-2 font-bold text-sm text-zinc-300">
                                <SlidersHorizontal className="h-4 w-4 text-purple-400" /> Filters
                            </div>
                            <button
                                onClick={handleResetFilters}
                                className="text-xs text-zinc-500 hover:text-purple-400 transition-colors"
                            >
                                Reset all
                            </button>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2.5">AI Engine</h4>
                            <div className="flex flex-col gap-1">
                                {['All', 'ChatGPT', 'Gemini', 'Claude', 'Midjourney', 'Stable Diffusion', 'Other'].map((engine) => (
                                    <button
                                        key={engine}
                                        onClick={() => setSelectedEngine(engine)}
                                        className={`text-left text-xs px-3 py-2 rounded-lg transition-all ${selectedEngine === engine
                                            ? 'bg-purple-950/40 text-purple-400 font-semibold border border-purple-900/50'
                                            : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200'
                                            }`}
                                    >
                                        {engine}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filter Category */}
                        <div className="mb-6">
                            <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2.5">Category</h4>
                            <div className="flex flex-col gap-1">
                                {['All', 'Coding', 'Writing', 'Marketing', 'Graphics & Image', 'Idea Generation', 'System Assistant', 'Other'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`text-left text-xs px-3 py-2 rounded-lg transition-all ${selectedCategory === cat
                                            ? 'bg-purple-950/40 text-purple-400 font-semibold border border-purple-900/50'
                                            : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filter Difficulty */}
                        <div>
                            <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2.5">Difficulty</h4>
                            <div className="flex flex-col gap-1">
                                {['All', 'Beginner', 'Intermediate', 'Pro'].map((diff) => (
                                    <button
                                        key={diff}
                                        onClick={() => setSelectedDifficulty(diff)}
                                        className={`text-left text-xs px-3 py-2 rounded-lg transition-all ${selectedDifficulty === diff
                                            ? 'bg-purple-950/40 text-purple-400 font-semibold border border-purple-900/50'
                                            : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200'
                                            }`}
                                    >
                                        {diff}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/*  sorting */}
                    <div className="lg:col-span-3">

                        <div className="bg-[#0b132b]/20 border border-zinc-900/60 rounded-xl p-3 flex items-center gap-3 mb-6">
                            <span className="text-xs text-zinc-500 pl-2">Sort By:</span>
                            <div className="flex gap-1.5">
                                {['Latest', 'Most Popular', 'Most Copied'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setSortBy(tab)}
                                        className={`text-xs px-4 py-1.5 rounded-lg font-medium transition-all ${sortBy === tab
                                            ? 'bg-zinc-800 text-white border border-zinc-700/60'
                                            : 'text-zinc-400 hover:text-zinc-200'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2, 4].map((n) => (
                                    <div key={n} className="h-64 bg-zinc-900/30 border border-zinc-800/40 animate-pulse rounded-2xl"></div>
                                ))}
                            </div>
                        ) : filteredPrompts.length === 0 ? (

                            <div className="bg-[#0b132b]/20 border border-dashed border-zinc-800 rounded-2xl p-16 text-center">
                                <p className="text-zinc-500 text-sm mb-4">No prompts match your selection filters.</p>
                                <Button size="sm" className="bg-purple-600 text-white font-semibold rounded-xl" onClick={handleResetFilters}>
                                    Clear Sorting & Filters
                                </Button>
                            </div>
                        ) : (

                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredPrompts.map((prompt) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.96 }}
                                            transition={{ duration: 0.25 }}
                                            key={prompt._id}
                                            whileHover={{ y: -4 }}
                                            className="group flex flex-col justify-between bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/40 rounded-2xl p-5 transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <div>
                                                {/* Card Header Media Simulation/Tags */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex gap-2">
                                                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-purple-950/60 text-purple-400 border border-purple-950">
                                                            {prompt.aiEngine}
                                                        </span>
                                                        {prompt.difficultyLevel && (
                                                            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-400 uppercase tracking-wide">
                                                                {prompt.difficultyLevel}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {prompt.visibilityStatus === "Private" && (
                                                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                                                            <ShieldCheck className="h-3 w-3" /> Premium
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-md font-bold text-zinc-100 group-hover:text-purple-400 transition-colors mb-2 line-clamp-1">
                                                    {prompt.title}
                                                </h3>

                                                <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                                                    {prompt.shortDescription || "No description provided for this catalog template."}
                                                </p>

                                                <p className="text-[11px] text-zinc-600 mb-4">
                                                    Category: <span className="text-zinc-500 font-medium">{prompt.category}</span>
                                                </p>
                                            </div>

                                            {/* Card Footer Metric Rows */}
                                            <div>
                                                <div className="flex items-center justify-between border-t border-zinc-800/60 pt-3.5 mb-4 text-xs text-zinc-500">
                                                    <div className="flex items-center gap-1.5">
                                                        <Copy className="h-3.5 w-3.5" />
                                                        <span>{prompt.copyCount || 0} copies</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                                        <span className="font-medium text-zinc-300">{(prompt.rating || 0).toFixed(1)}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-[11px] text-zinc-500 truncate max-w-[120px]">
                                                        by <span className="text-zinc-400">{(prompt.creatorEmail || prompt.userEmail)?.split("@")[0]}</span>
                                                    </span>

                                                    <Link href={session ? `/prompts/${prompt._id}` : "/auth/login"} className="shrink-0">
                                                        <Button className="text-xs font-bold bg-zinc-800/80 hover:bg-purple-600 hover:text-white text-zinc-200 px-4 py-2 rounded-xl border border-zinc-700/60 transition-all flex items-center gap-1.5">
                                                            <Eye className="h-3.5 w-3.5" /> View Details
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllPromptsHomePage;