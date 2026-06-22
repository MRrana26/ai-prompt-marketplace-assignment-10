"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Mail, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { getUserPrompts } from "@/lib/api/prompts";
import Link from "next/link";

export default function UserHomePage() {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const user = session?.user;
  const [myPromptsData, setMyPromptsData] = useState([]);

  useEffect(() => {
    const loadPrompts = async () => {
      if (isPending) return;

      const userEmail = user?.email;

      if (userEmail) {
        const data = await getUserPrompts(userEmail);
        setMyPromptsData(data);
      }
      setLoading(false);
    };
    loadPrompts();
  }, [user, isPending]);



  const isPremium = user?.plan?.toLowerCase().includes("pro") || user?.plan?.toLowerCase().includes("premium");


  const roleColor = user?.role?.toLowerCase() === "admin" ? "text-red-400 border-red-900/50 bg-red-950/30" :
    user?.role?.toLowerCase() === "creator" ? "text-purple-400 border-purple-900/50 bg-purple-950/30" :
      "text-zinc-400 border-zinc-800 bg-zinc-900/50";

  if (isPending) {
    return (
      <div className="w-full min-h-screen bg-zinc-950 text-zinc-400 flex items-center justify-center text-sm font-medium">
        Loading profile configuration...
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-950 text-zinc-100 min-h-screen">

      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">User Account Profile</h1>
        <p className="text-sm text-zinc-400 mt-1">Manage your plan, credentials, and published prompt details.</p>
      </div>

      {/* Profile Main Card */}
      <div className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xs">

        {/* Profile Details Top Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-zinc-800/60">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md"></div>
            <Avatar className="h-20 w-20 border-2 border-purple-500/50 relative z-10 p-1 bg-zinc-900">
              <Avatar.Image alt="Profile Logo" src={user?.image} />
              <Avatar.Fallback className="bg-purple-500/10 text-purple-400 font-bold text-xl">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </Avatar.Fallback>
            </Avatar>
          </div>

          {/* User Meta Details */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <h2 className="text-2xl font-bold text-zinc-100 tracking-wide truncate">{user?.name || "User"}</h2>
              {isPremium && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-linear-to-r from-purple-500 to-pink-500 text-white uppercase tracking-wider">
                  <Sparkles className="size-3" /> Pro
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-sm text-zinc-400">
              <Mail className="size-4 shrink-0 text-zinc-500" />
              <span className="truncate">{user?.email || "user@aiverse.com"}</span>
            </div>

            {/* Badges Row */}
            <div className="flex items-center gap-2 mt-1 flex-wrap justify-center sm:justify-start">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold border uppercase tracking-wider ${roleColor}`}>
                Role: {user?.role || "User"}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold border uppercase tracking-wider ${isPremium
                  ? "bg-amber-950/40 text-amber-400 border-amber-900/50"
                  : "bg-amber-950/20 text-amber-500 border-amber-500/30"
                }`}>
                Plan: {user?.plan || "Free"}
              </span>
            </div>
          </div>
        </div>

        {/* Middle Section: Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {/* Prompts Published Card */}
          <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col gap-2">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 w-fit">
              <FileText className="size-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mt-2">Prompts Published</span>
            <span className="text-3xl font-extrabold text-zinc-100">{myPromptsData.length}</span>
          </div>

          {/* Account Status Card */}
          <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit">
              <CheckCircle2 className="size-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mt-2">Account Status</span>
            <span className="text-lg font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
              Verified Member
            </span>
          </div>
        </div>

        {/* Bottom Condition Section */}
        {isPremium ? (

          <div className="w-full p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 flex items-center gap-2.5 text-sm sm:text-base font-medium">
            <ShieldCheck className="size-5 shrink-0 text-emerald-400" />
            <span>Lifetime Premium Active - Enjoy complete access to all Prompt Marketplace items!</span>
          </div>
        ) : (

          <div className="w-full p-5 rounded-xl bg-zinc-900/60 border border-dashed border-purple-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <div className="flex items-center gap-1.5 text-zinc-100 font-bold tracking-wide justify-center md:justify-start">
                <Sparkles className="size-4 text-purple-400" />
                <h3>Upgrade to Pro Lifetime</h3>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 max-w-md leading-relaxed">
                Unlock access to all private prompt templates, parameter sets, and community reviews for a single one-time contribution of $5.
              </p>
            </div>

            {/* Upgrade Action Button */}
            <Link href={'/payment'}>
              <button
                onClick={() => console.log("Initiating Stripe Checkout...")}
                className="px-6 py-2.5 bg-cyan-500 text-zinc-950 text-sm font-extrabold rounded-xl hover:bg-cyan-400 active:scale-[0.98] transition-all shadow-md shadow-cyan-500/10 shrink-0 cursor-pointer"
              >
                Upgrade Now ($5)
              </button></Link>
          </div>
        )}

      </div>
    </div>
  );
}