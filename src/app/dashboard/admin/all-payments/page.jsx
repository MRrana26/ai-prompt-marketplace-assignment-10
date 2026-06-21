"use client";

import React from "react";
import { Calendar, CreditCard, User } from "lucide-react";

const initialPayments = [
  {
    transactionId: "mock_txn_SLZJLKXXJQ",
    purchaserName: "2RzPK5Q362!90",
    purchaserId: "6a33d64773814908b51b20b9",
    billingEmail: "tester-premium@aiverse.com",
    amountCharged: "$5.00",
    paymentDate: "19/06/2026, 11:04:20",
  },
  {
    transactionId: "mock_txn_S4H45IIAA",
    purchaserName: "Admin",
    purchaserId: "6a29490a90b9866925d751bc",
    billingEmail: "tester-premium@aiverse.com",
    amountCharged: "$5.00",
    paymentDate: "18/06/2026, 15:03:05",
  },
  {
    transactionId: "mock_txn_K9YIM8ZJ9",
    purchaserName: "aA7AyuGYsE$36",
    purchaserId: "6a33ace3b70c387821e82f42",
    billingEmail: "tester-premium@aiverse.com",
    amountCharged: "$5.00",
    paymentDate: "18/06/2026, 14:33:22",
  },
  {
    transactionId: "mock_txn_3TiU0Y0tgBg4giF607uzjoczm",
    purchaserName: "User",
    purchaserId: "6a29486c90b9866925d75176",
    billingEmail: "stripe_buyer@aiverse.com",
    amountCharged: "$5.00",
    paymentDate: "18/06/2026, 11:15:40",
  },
];

export default function AllPaymentsHomePage() {
  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
      {/* Header Title Section */}
      <div className="mb-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Stripe Premium Payments Log
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Comprehensive database of customer subscription transactions.
        </p>
      </div>

      {/* Table Container Wrapper */}
      <div className="max-w-7xl mx-auto overflow-hidden bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-xs shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Head */}
            <thead>
              <tr className="border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900/20">
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-6">Purchaser Details</th>
                <th className="py-4 px-6">Billing Email</th>
                <th className="py-4 px-6">Amount Charged</th>
                <th className="py-4 px-6">Payment Date</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-800/60 text-sm">
              {initialPayments.map((item, index) => (
                <tr 
                  key={index} 
                  className="transition-colors hover:bg-zinc-800/10"
                >
                  {/* Transaction ID */}
                  <td className="py-4 px-6 font-semibold text-cyan-400/90 whitespace-nowrap tracking-wide">
                    {item.transactionId}
                  </td>

                  {/* Purchaser Details (Icon + Name + ID) */}
                  <td className="py-4 px-6 min-w-[240px]">
                    <div className="flex items-start gap-2.5">
                      <User className="size-4 text-zinc-500 mt-0.5 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-zinc-200 tracking-wide break-all">
                          {item.purchaserName}
                        </span>
                        <span className="text-xs text-zinc-500 mt-0.5 font-mono break-all">
                          ID: {item.purchaserId}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Billing Email */}
                  <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                    {item.billingEmail}
                  </td>

                  {/* Amount Charged */}
                  <td className="py-4 px-6 font-bold text-emerald-400 whitespace-nowrap tracking-wide text-base">
                    {item.amountCharged}
                  </td>

                  {/* Payment Date */}
                  <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                    <div className="flex items-start gap-2 text-xs">
                      <Calendar className="size-4 text-zinc-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">
                        {item.paymentDate.split(", ")[0]},
                        <br />
                        <span className="text-zinc-500">{item.paymentDate.split(", ")[1]}</span>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}