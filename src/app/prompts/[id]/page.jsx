"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPromptById } from "@/lib/api/prompts";
import { authClient } from "@/lib/auth-client";
import { Copy, Bookmark, Star, ShieldCheck, Tag, Cpu, BarChart2, User, Lock } from "lucide-react";
import { toast } from "sonner";

export default function PromptDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [prompt, setPrompt] = useState(null);
    const [loading, setLoading] = useState(true);
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const isPremium = user?.plan?.toLowerCase().includes("pro") || user?.plan?.toLowerCase().includes("premium");

    useEffect(() => {
        const load = async () => {
            const data = await getPromptById(id);
            setPrompt(data);
            setLoading(false);
        };
        load();
    }, [id]);

    const handleCopy = () => {
        if (!prompt) return;
        navigator.clipboard.writeText(prompt.contentTemplate);
        toast.success("Prompt copied to clipboard!");
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-zinc-950 flex items-center justify-center">
                <span className="animate-pulse text-zinc-400 font-medium">Loading prompt...</span>
            </div>
        );
    }

    if (!prompt) {
        return (
            <div className="w-full min-h-screen bg-zinc-950 flex items-center justify-center">
                <span className="text-zinc-400">Prompt not found.</span>
            </div>
        );
    }

    const isPrivate = prompt.visibilityStatus === "Private";
    const canView = !isPrivate || isPremium;

    return (
        <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">

                {/* Header */}
                <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-900/40 text-purple-400 uppercase tracking-wider">
                            {prompt.aiEngine}
                        </span>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700/50 text-zinc-300 uppercase tracking-wider">
                            {prompt.category}
                        </span>
                        {isPrivate && (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center gap-1">
                                <ShieldCheck className="h-3.5 w-3.5" /> Premium
                            </span>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight mb-3">
                        {prompt.title}
                    </h1>
                    <p className="text-zinc-400 text-sm leading-relaxed">{prompt.shortDescription}</p>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-4 mt-5 text-sm text-zinc-400">
                        <div className="flex items-center gap-1.5">
                            <Copy className="size-4 text-zinc-500" />
                            <span>{prompt.copyCount} copies</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Star className="size-4 fill-amber-400 text-amber-400" />
                            <span>{(prompt.rating || 0).toFixed(1)} rating</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <BarChart2 className="size-4 text-zinc-500" />
                            <span>{prompt.difficultyLevel}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <User className="size-4 text-zinc-500" />
                            <span>{prompt.creatorEmail?.split("@")[0]}</span>
                        </div>
                    </div>
                </div>

                {/* Prompt Content */}
                <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
                        Prompt Content
                    </h2>

                    {canView ? (
                        <>
                            <pre className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 font-mono">
                                {prompt.contentTemplate}
                            </pre>
                            <button
                                onClick={handleCopy}
                                className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition active:scale-95 cursor-pointer"
                            >
                                <Copy className="size-4" />
                                Copy Prompt
                            </button>
                        </>
                    ) : (
                        <div className="relative">
                            <pre className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 font-mono blur-sm select-none">
                                {prompt.contentTemplate}
                            </pre>
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950/60 rounded-xl">
                                <Lock className="size-8 text-amber-400" />
                                <p className="text-sm font-semibold text-zinc-300">Premium Content</p>
                                <button
                                    onClick={() => router.push("/payment")}
                                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-bold rounded-xl transition active:scale-95 cursor-pointer"
                                >
                                    Subscribe to Premium
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tags */}
                <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                        <Tag className="size-4" /> Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {(prompt.tags || []).map((tag, i) => (
                            <span key={i} className="text-xs px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700/50 text-zinc-300">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 text-zinc-300 text-sm font-semibold rounded-xl transition cursor-pointer">
                        <Bookmark className="size-4" />
                        Bookmark
                    </button>
                </div>

            </div>
        </div>
    );
}