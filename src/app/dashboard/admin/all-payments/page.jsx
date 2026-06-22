"use client";

import React, { useEffect, useState } from "react";
import { Calendar, CreditCard, User } from "lucide-react";
import { getAllPayments } from "@/lib/api/admin";

export default function AllPaymentsHomePage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getAllPayments();
      setPayments(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center">
        <span className="animate-pulse text-zinc-400 font-medium">Loading payments...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
      <div className="mb-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Stripe Premium Payments Log
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Comprehensive database of customer subscription transactions.
        </p>
      </div>

      <div className="max-w-7xl mx-auto overflow-hidden bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-xs shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900/20">
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-6">Billing Email</th>
                <th className="py-4 px-6">Amount Charged</th>
                <th className="py-4 px-6">Payment Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-800/60 text-sm">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-zinc-500">
                    No payments found.
                  </td>
                </tr>
              ) : (
                payments.map((item) => (
                  <tr key={item._id} className="transition-colors hover:bg-zinc-800/10">
                    <td className="py-4 px-6 font-semibold text-cyan-400/90 whitespace-nowrap tracking-wide">
                      {item.transactionId}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="size-4 text-zinc-500 shrink-0" />
                        <span className="text-zinc-400">{item.email}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-bold text-emerald-400 whitespace-nowrap tracking-wide text-base">
                      ${item.amount}.00
                    </td>

                    <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                      <div className="flex items-start gap-2 text-xs">
                        <Calendar className="size-4 text-zinc-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">
                          {new Date(item.createdAt).toLocaleDateString('en-GB')},
                          <br />
                          <span className="text-zinc-500">
                            {new Date(item.createdAt).toLocaleTimeString('en-GB')}
                          </span>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}