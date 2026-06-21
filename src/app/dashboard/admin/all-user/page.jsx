"use client";

import React from "react";
import { Trash2, Calendar } from "lucide-react";
import { Avatar } from "@heroui/react";
import { toast } from "sonner";
const initialUsers = [
  {
    id: "1",
    name: "admin01",
    email: "admin01@gmail.com",
    image: "",
    plan: "Free",
    role: "User",
    registeredDate: "20/06/2026",
  },
  {
    id: "2",
    name: "creator",
    email: "creator1@gmail.com",
    image: "",
    plan: "Free",
    role: "Creator",
    registeredDate: "20/06/2026",
  },
  {
    id: "3",
    name: "user",
    email: "user@gmail.com",
    image: "",
    plan: "Free",
    role: "Admin",
    registeredDate: "20/06/2026",
  },
  
];

export default function AllUserHomePage() {
  
  const handleRoleChange = (userId, newRole) => {
    toast.success(`User ID: ${userId} - New Role: ${newRole}`);
  };

  const handleDeleteUser = (userId) => {
    toast.warning(`Delete User ID: ${userId}`);
  };

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
      {/* Header Title Section */}
      <div className="mb-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          User Role & Accounts Management
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Review accounts, modify role scopes, and delete users.
        </p>
      </div>

      <div className="max-w-7xl mx-auto overflow-hidden bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-xs shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/*  Heading */}
            <thead>
              <tr className="border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900/20">
                <th className="py-4 px-6">Profile Details</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6 text-center">Subscription</th>
                <th className="py-4 px-6">Role Level</th>
                <th className="py-4 px-6">Registered Date</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-800/60 text-sm">
              {initialUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className="transition-colors hover:bg-zinc-800/20"
                >
                  {/* img name*/}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-zinc-700/50 shadow-xs shrink-0">
                        <Avatar.Image alt={user.name} src={user.image} />
                        <Avatar.Fallback className="bg-purple-500/10 text-purple-400 font-semibold text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar>
                      <span className="font-semibold text-zinc-200 tracking-wide">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                    {user.email}
                  </td>

                  {/* Subscription  */}
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border uppercase tracking-wider ${
                      user.plan.toLowerCase() === 'premium' || user.plan.toLowerCase() === 'pro'
                        ? 'bg-amber-950/40 text-amber-400 border-amber-900/50'
                        : 'bg-zinc-800/50 text-amber-500/90 border-amber-500/20'
                    }`}>
                      {user.plan}
                    </span>
                  </td>

                  {/*  Dropdown */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <select
                      defaultValue={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs rounded-xl px-3 py-1.5 font-medium focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 cursor-pointer transition-all"
                    >
                      <option value="User">User</option>
                      <option value="Creator">Creator</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>

                  {/*  Date */}
                  <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-4 text-zinc-600" />
                      <span>{user.registeredDate}</span>
                    </div>
                  </td>

                  {/*  Button */}
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 rounded-xl bg-red-950/20 text-red-400 border border-red-900/40 hover:bg-red-500 hover:text-white transition-all shadow-xs"
                      title="Delete User"
                    >
                      <Trash2 className="size-4" />
                    </button>
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