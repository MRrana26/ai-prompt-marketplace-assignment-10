"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Prompts", href: "/all-prompts" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
              <Sparkles className="h-6 w-6 text-purple-400" />
              <span>PromptVerse</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                  isActive(link.href) ? "text-purple-400 font-semibold" : "text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          
          <div className="hidden md:flex items-center space-x-4">
            {<div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-zinc-400 hover:text-white px-3 py-2 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg shadow-lg shadow-purple-500/20 transition-all active:scale-95"
                >
                  Register
                </Link>
              </div>}
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#09090b] border-b border-zinc-800"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.href) ? "bg-zinc-800 text-purple-400" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <hr className="border-zinc-800 my-2" />

              {<div className="space-y-2 pt-2 px-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center text-zinc-400 hover:text-white py-2 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-md font-medium"
                  >
                    Register
                  </Link>
                </div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}