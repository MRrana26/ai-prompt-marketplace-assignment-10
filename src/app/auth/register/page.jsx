"use client";

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
import { Radio, RadioGroup } from "@heroui/react";
import { Sparkles, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    if (!formValues.name || !formValues.email || !formValues.password) {
      return toast.error("Please fill in all fields.");
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email: formValues.email,
        name: formValues.name,
        password: formValues.password,
        role: formValues.role,
        image: formValues.image || "",

        additionalFields: {
          role: "user",
          plan: "free",
        }
      });

      if (error) {
        setIsSubmitting(false);
        return toast.error(error.message || "Registration failed!");
      }

      if (data) {
        toast.success("Registration successful!");
        router.push('/');
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleSignUpGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
      toast.success("Google Sign...");
      router.push('/');

    } catch (error) {
      console.error("Google Sign In Error:", error);
      toast.error("Something went wrong with Google Sign In");
    }
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
            Create Account
          </h2>
          <p className="text-sm text-zinc-400">
            Join PromptVerse and clear your engineering horizon
          </p>
        </CardHeader>

        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
          <TextField
            isRequired
            name="name"
            type="text"
            className="w-full"
            validate={(value) => {
              if (value.trim().length < 2) {
                return "Name must be at least 2 characters long";
              }
              return null;
            }}
          >
            <Label className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-1">
              Full Name
            </Label>
            <Input
              placeholder="Masudur Rahman"
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* email */}
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

          {/* img */}
          <TextField
            name="image"
            type="url"
            validate={(value) => {
              if (value && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(value)) {
                return "Please enter a valid image URL (.jpg, .png, .webp)";
              }
              return null;
            }}
          >
            <Label className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-1">Photo URL <span className="text-gray-400 font-normal">(Optional)</span></Label>
            <Input
              placeholder="https://example.com/photo.jpg"
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100" />
            <Description className="text-xs">Direct image link ending with .jpg, .png, .webp etc.</Description>
            <FieldError />
          </TextField>

          {/* pass */}
          <TextField
            isRequired
            minLength={6}
            name="password"
            type={showPassword ? "text" : "password"}
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

            <div className="relative">
              <Input
                placeholder="••••••••"
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100 pr-10 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Description className="text-[11px] text-zinc-500 mt-1">
              Must be at least 6 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* ============ Radio Group ================== */}
          <div className="flex flex-col gap-4">
            <Label className="font-medium text-zinc-400">Role Select</Label>
            <RadioGroup defaultValue="user" name="role" orientation="horizontal">
              <Radio value="user">
                <Radio.Content className="flex text-xs font-medium text-zinc-400">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  User
                </Radio.Content>
              </Radio>
              <Radio value="creator">
                <Radio.Content className="flex text-xs font-medium text-zinc-400">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Creator
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>
          {/* ============ Radio Group ================== */}

          {/* btn */}
          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-6 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-purple-500/10 text-sm group mt-2"
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Submit</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}

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

        {/* google */}
        <Button
          onClick={handleSignUpGoogle}
          className="w-full py-6 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-lg" /> Continue with Google
        </Button>

        {/* link*/}
        <p className="text-center text-sm text-zinc-500 mt-6">
          Already have an account?{" "}
          <Link
            href={"/auth/login"}
            className="text-purple-400 hover:text-purple-300 font-medium underline decoration-purple-500/30"
          >
            Sign In
          </Link>
        </p>

      </Card>
    </div>
  );
};

export default RegisterPage;