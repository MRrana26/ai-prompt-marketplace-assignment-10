"use client";

import React, { useState } from "react";
import { Upload, PlusCircle } from "lucide-react";
import { createPrompt } from "@/lib/actions/prompts";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function CreatorAddPromptsHomePage() {

  const { data: session, isPending } = authClient.useSession();
      const user = session?.user;

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    contentTemplate: "",
    category: "Coding",
    aiEngine: "ChatGPT",
    difficultyLevel: "Beginner",
    visibilityStatus: "Public",
    tags: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {};
    if (!formData.title) newErrors.title = "Prompt title is required";
    if (!formData.shortDescription) newErrors.shortDescription = "Short description is required";
    if (!formData.contentTemplate) newErrors.contentTemplate = "Content template is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});

    try {

      let uploadedImageUrl = "https://placehold.co/600x400/png";

      if (thumbnail) {
        console.log("Uploading file to hosting...", thumbnail.name);
      }

      const tagsArray = formData.tags ? formData.tags.split(",").map(tag => tag.trim()) : [];

      const res = await createPrompt({
        ...formData,
        tags: tagsArray,
        copyCount: 0,
        creatorEmail: user?.email,
        thumbnailUrl: uploadedImageUrl,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      if (res?.insertedId) {
        toast.success("Prompt submitted successfully!");
        setFormData({
          title: "",
          shortDescription: "",
          contentTemplate: "",
          category: "Coding",
          aiEngine: "ChatGPT",
          difficultyLevel: "Beginner",
          visibilityStatus: "Public",
          tags: "",
        });
        setThumbnail(null);
        
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
      redirect('/dashboard/creator/my-prompts')
    }
  };

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 p-6 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-2xl bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-xs">

        {/* Header Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Create New Prompt Template</h1>
          <p className="text-sm text-zinc-400 mt-1">Fill in details to submit a prompt to the community catalog.</p>
        </div>

        {/* Form Build Section */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-sm">

          {/* PROMPT TITLE */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Prompt Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Optimized React Tailwind Card Builder"
              required
              className="w-full bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* SHORT DESCRIPTION */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Short Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Explain what this prompt accomplishes in 1-2 sentences"
              required
              className="w-full bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* PROMPT CONTENT TEMPLATE */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Prompt Content Template <span className="text-red-500">*</span>
            </label>
            <textarea
              name="contentTemplate"
              value={formData.contentTemplate}
              onChange={handleChange}
              rows={5}
              placeholder='Write the full, detailed prompt instructions. Use brackets to indicate variables e.g., "Act as a [role]..."'
              required
              className="w-full bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Grid Layout: CATEGORY & AI ENGINE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-zinc-950/60 border border-zinc-800 text-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 cursor-pointer transition-all"
              >
                <option value="Coding">Coding</option>
                <option value="Marketing">Marketing</option>
                <option value="Writing">Writing</option>
                <option value="System Assistant">System Assistant</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                AI Engine <span className="text-red-500">*</span>
              </label>
              <select
                name="aiEngine"
                value={formData.aiEngine}
                onChange={handleChange}
                className="w-full bg-zinc-950/60 border border-zinc-800 text-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 cursor-pointer transition-all"
              >
                <option value="ChatGPT">ChatGPT</option>
                <option value="Gemini">Gemini</option>
                <option value="Claude">Claude</option>
                <option value="Midjourney">Midjourney</option>
                <option value="Stable Diffusion">Stable Diffusion</option>
              </select>
            </div>
          </div>

          {/* Grid Layout: DIFFICULTY LEVEL & VISIBILITY STATUS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Difficulty Level <span className="text-red-500">*</span>
              </label>
              <select
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleChange}
                className="w-full bg-zinc-950/60 border border-zinc-800 text-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 cursor-pointer transition-all"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Radio Options Block */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Visibility Status <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-6 py-2.5">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300 select-none">
                  <input
                    type="radio"
                    name="visibilityStatus"
                    value="Public"
                    checked={formData.visibilityStatus === "Public"}
                    onChange={handleChange}
                    className="accent-purple-500 size-4 cursor-pointer"
                  />
                  <span>Public (Free access)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300 select-none">
                  <input
                    type="radio"
                    name="visibilityStatus"
                    value="Private"
                    checked={formData.visibilityStatus === "Private"}
                    onChange={handleChange}
                    className="accent-purple-500 size-4 cursor-pointer"
                  />
                  <span>Private (Premium lock)</span>
                </label>
              </div>
            </div>
          </div>

          {/* TAGS (COMMA-SEPARATED) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Tags (Comma-Separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. tailwind, card, component, responsive"
              className="w-full bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* THUMBNAIL IMAGE UPLOAD DRAGZONE */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Thumbnail Image Upload
            </label>
            <label className="w-full border-2 border-dashed border-zinc-800 hover:border-purple-500/50 rounded-xl p-6 bg-zinc-950/20 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group">
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="size-6 text-zinc-500 group-hover:text-purple-400 transition-colors" />
              <span className="text-zinc-200 font-bold tracking-wide">
                {thumbnail ? thumbnail.name : "Click to choose a thumbnail image file"}
              </span>
              <span className="text-xs text-zinc-500">
                Supports PNG, JPG, or WEBP (Max 2MB)
              </span>
            </label>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-purple-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-purple-500 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusCircle className="size-4" />
            <span>{isSubmitting ? "Submitting..." : "Submit Prompt for Review"}</span>
          </button>

        </form>
      </div>
    </div>
  );
}