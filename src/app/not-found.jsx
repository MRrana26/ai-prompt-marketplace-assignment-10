"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#09090b] flex items-center justify-center px-4">

            <div className="absolute top-37.5 left-37.5 w-100 h-100 bg-purple-600/20 rounded-full blur-[120px]" />

            <div className="absolute -bottom-37.5 -right-37.5 w-87.5 h-87.5 bg-pink-600/20 rounded-full blur-[120px]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[30px_30px]" />

            
            <div className="relative z-10 text-center">

                {/* 404 */}
                <h1 className="text-[120px] sm:text-[170px] md:text-[220px] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-linear-to-r  from-purple-500 via-pink-500 to-purple-500 animate-pulse">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                    Oops! Page Not Found
                </h2>

                {/* Description */}
                <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto mt-4 leading-relaxed">
                    Sorry, the page you are looking for does not exist, has been removed,
                    or is temporarily unavailable.
                </p>

                {/* Button */}
                <div className="mt-8">
                    <Link href="/">
                        <Button
                            radius="lg"
                            size="lg"
                            className="bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-semibold px-8 shadow-xl shadow-purple-500/20 hover:scale-105 transition-all duration-300 active:scale-95"
                        >
                            <FaHome className="text-lg mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                <p className="text-zinc-600 text-sm mt-8">
                    Error Code : 404 | Page Not Found
                </p>

            </div>
        </div>
    );
};

export default NotFoundPage;