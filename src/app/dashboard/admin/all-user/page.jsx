"use client";

import React, { useEffect, useState } from "react";
import { Trash2, Calendar } from "lucide-react";
import { Avatar } from "@heroui/react";
import { toast } from "sonner";
import { getAllUsers, updateUserRole, deleteUser } from "@/lib/api/users";

export default function AllUserHomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
      setLoading(false);
    };
    loadUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const result = await updateUserRole(userId, newRole);
    if (result) {
      toast.success(`Role updated to ${newRole}`);
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
    }
  };

  const handleDeleteUser = async (userId) => {
    const result = await deleteUser(userId);
    if (result) {
      toast.warning(`User deleted`);
      setUsers(prev => prev.filter(u => u._id !== userId));
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center">
        <span className="animate-pulse text-zinc-400 font-medium">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen">
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

            <tbody className="divide-y divide-zinc-800/60 text-sm">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-zinc-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="transition-colors hover:bg-zinc-800/20"
                  >
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-zinc-700/50 shadow-xs shrink-0">
                          <Avatar.Image alt={user.name} src={user.image} />
                          <Avatar.Fallback className="bg-purple-500/10 text-purple-400 font-semibold text-xs">
                            {user.name?.charAt(0).toUpperCase()}
                          </Avatar.Fallback>
                        </Avatar>
                        <span className="font-semibold text-zinc-200 tracking-wide">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                      {user.email}
                    </td>

                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border uppercase tracking-wider ${
                        user.plan?.toLowerCase() === 'premium' || user.plan?.toLowerCase() === 'pro'
                          ? 'bg-amber-950/40 text-amber-400 border-amber-900/50'
                          : 'bg-zinc-800/50 text-amber-500/90 border-amber-500/20'
                      }`}>
                        {user.plan || "free"}
                      </span>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <select
                        defaultValue={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs rounded-xl px-3 py-1.5 font-medium focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 cursor-pointer transition-all"
                      >
                        <option value="user">User</option>
                        <option value="creator">Creator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-4 text-zinc-600" />
                        <span>{new Date(user.createdAt).toLocaleDateString('en-GB')}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 rounded-xl bg-red-950/20 text-red-400 border border-red-900/40 hover:bg-red-500 hover:text-white transition-all shadow-xs"
                        title="Delete User"
                      >
                        <Trash2 className="size-4" />
                      </button>
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