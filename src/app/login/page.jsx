"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardHeader,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();


  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (!user.email || !user.password) {
      return toast.error("Please fill in all fields.");
    }

    console.log("From Login Form Submit:", user);
    toast.success("Form submitted! Check console log.");
  };


  const handleSignInGoogle = () => {
    console.log("Google Sign-In Triggered");
    toast.success("Google Sign-In Clicked");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <Card className="max-w-md w-full bg-zinc-950 p-6 rounded-2xl border border-zinc-900 shadow-xl z-10 text-zinc-100">

        <CardHeader className="flex flex-col items-center gap-2 text-center pb-6">
          <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 mb-1">
            <Sparkles className="h-6 w-6 text-purple-400" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
            Welcome Back
          </h2>
          <p className="text-sm text-zinc-400">
            Sign in to manage and trade your engineered prompts
          </p>
        </CardHeader>

        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-1">
              Email Address
            </Label>
            <Input
              placeholder="name@example.com"
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* password */}
          <TextField
            isRequired
            minLength={6}
            name="password"
            type="password"
            className="w-full"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-1">
              Password
            </Label>
            <Input
              placeholder="••••••••"
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100"
            />
            <Description className="text-[11px] text-zinc-500 mt-1">
              Must be at least 6 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-6 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-purple-500/10 text-sm group mt-2"
          >
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-zinc-950 text-zinc-500 font-mono">OR</span>
          </div>
        </div>

        {/* Google*/}
        <Button
          onClick={handleSignInGoogle}
          className="w-full py-6 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-lg" /> Continue with Google
        </Button>

        {/* register link */}
        <p className="text-center text-sm text-zinc-500 mt-6">
          Do not have an account?{" "}
          <Link
            href={"/register"}
            className="text-purple-400 hover:text-purple-300 font-medium underline decoration-purple-500/30"
          >
            Create an account
          </Link>
        </p>

      </Card>
    </div>
  );
};

export default LoginPage;