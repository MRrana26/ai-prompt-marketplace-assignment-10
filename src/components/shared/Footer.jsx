"use client";

import Link from "next/link";

import { GitFork, Sparkles } from "lucide-react";
import { FaFacebook, FaGithub, FaLink, FaLinkedin } from "react-icons/fa";


export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#09090b] border-t border-zinc-900 text-zinc-400 text-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">


                    <div className="space-y-4 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
                            <Sparkles className="h-6 w-6 text-purple-400" />
                            <span>PromptVerse</span>
                        </Link>
                        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                            Empowering AI creators with a next-generation engineered prompt ecosystem and secured peer-to-peer marketplace.
                        </p>
                    </div>


                    <div>
                        <h4 className="text-zinc-200 font-semibold mb-4 text-xs tracking-wider uppercase">
                            Marketplace
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li>
                                <Link  href={"/all-prompts"} className="hover:text-purple-400 transition-colors">All Prompts</Link>
                            </li>
                            <li>
                                <Link href={"/featured"} className="hover:text-purple-400 transition-colors">Trending Prompts</Link>
                            </li>
                            <li>
                                <Link href={"/categories"} className="hover:text-purple-400 transition-colors">AI Categories</Link>
                            </li>
                            <li>
                                <Link href={"/leaderboard"} className="hover:text-purple-400 transition-colors">Top Engineering Leaders</Link>
                            </li>
                        </ul>
                    </div>

                    
                    <div>
                        <h4 className="text-zinc-200 font-semibold mb-4 text-xs tracking-wider uppercase">
                            Platform
                            </h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li>
                                <Link href={"/dashboard"} className="hover:text-purple-400 transition-colors">
                                Creator Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href={"/premium"} className="hover:text-purple-400 transition-colors flex items-center gap-1">
                                Premium Plan 
                                <span className="text-[10px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">
                                $5
                                </span>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/terms"} className="hover:text-purple-400 transition-colors">
                                Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href={"/privacy"} className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>

                    
                    <div>
                        <h4 className="text-zinc-200 font-semibold mb-4 text-xs tracking-wider uppercase">
                            Connect With Us
                            </h4>
                        <div className="flex items-center space-x-4 mb-4">
                        
                            <a href="https://www.facebook.com/MrRana26" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all" aria-label="Facebook">
                                <FaFacebook />
                            </a>

                            <a href="https://github.com/MRrana26" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all" aria-label="GitHub">

                                <FaGithub className="h-4 w-4" />
                            </a>
                            <a href="https://www.linkedin.com/in/dev-masudur-rahman" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all" aria-label="LinkedIn">
                                <FaLinkedin className="h-4 w-4" />
                            </a>
                        </div>

                        <p className="text-xs text-zinc-500 flex items-center gap-1">
                            Portfolio: <a href="https://masudur-rahman.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-purple-400 flex items-center gap-0.5 underline decoration-zinc-700">masudur-rahman.com <FaLink className="h-3 w-3" /></a>
                        </p>
                    </div>

                </div>

                
                <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                    <p>© {currentYear} PromptVerse Inc. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Crafted with passion for <span className="text-zinc-400 font-medium">Assignment-10</span>
                    </p>
                </div>

            </div>
        </footer>
    );
}