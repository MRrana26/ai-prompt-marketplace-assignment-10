"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Spinner } from "@heroui/react";
import { toast } from "sonner";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      setIsOpen(false);

    } catch (error) {
      toast.error("Failed to log out");
    }
  };

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
                className={`text-sm font-medium transition-colors hover:text-purple-400 ${isActive(link.href) ? "text-purple-400 font-semibold" : "text-zinc-400"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* lg device */}
          <div className="hidden md:flex items-center space-x-4">
            {isPending ? (
              <div>
                <span className="flex items-center justify-center gap-1"><Spinner color="current" /> Loading...</span>
              </div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <Link href={'/profile'}
                  className="group flex items-center p-1.5 pr-3 bg-zinc-900/40 hover:bg-zinc-900/90 border border-zinc-800 hover:border-purple-500/30 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-purple-500/5 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar>
                      <Avatar.Image alt="Profile Logo" src={user?.image} />
                      <Avatar.Fallback>{user.name?.charAt(0)}</Avatar.Fallback>
                    </Avatar>
                    <span className="text-sm text-zinc-300 font-medium hidden lg:inline-block">
                      {user?.name}
                    </span>
                  </div>
                </Link>
                <Button
                  variant="danger"
                  onClick={handleSignOut}
                >
                  Logout <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href={"/login"}
                  className="text-sm font-medium text-zinc-400 hover:text-white px-3 py-2 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href={"/register"}
                  className="text-sm font-medium bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg shadow-lg shadow-purple-500/20 transition-all active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            {isPending ? (
              <div className="flex flex-col items-center gap-2">
                <Spinner color="current" />
              </div>
            ) : user ? (
              <Avatar>
                <Avatar.Image alt="Profile Logo" src={user?.image} />
                <Avatar.Fallback>{user.name?.charAt(0)}</Avatar.Fallback>
              </Avatar>
            ) : null}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white focus:outline-none p-1 rounded-lg hover:bg-zinc-900 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
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
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.href) ? "bg-zinc-800 text-purple-400" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              <hr className="border-zinc-800 my-2" />

              {/* sm device auth */}
              <div className="space-y-2 pt-2 px-3">
                {isPending ? (
                  <div>
                    <span className="flex items-center justify-center gap-1"><Spinner color="current" /> Loading...</span>
                  </div>
                ) : user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/60">
                      <Avatar>
                        <Avatar.Image alt="Profile Logo" src={user?.image} />
                        <Avatar.Fallback>{user.name?.charAt(0)}</Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-zinc-200 truncate">{user?.name}</span>
                        <span className="text-xs text-zinc-500 truncate">{user?.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <Button
                        onClick={handleSignOut}
                        variant="danger"
                        className={'w-full'}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link
                      href={"/login"}
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center text-zinc-400 hover:text-white py-2 font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      href={"/register"}
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-md font-medium"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}