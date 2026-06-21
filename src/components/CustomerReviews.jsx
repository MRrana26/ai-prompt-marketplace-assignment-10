"use client";

import { motion } from "framer-motion";
import { MessageSquare, Star, Quote } from "lucide-react";

const MOCK_REVIEWS = [
  {
    id: "r1",
    name: "Sumaiya Akhter",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    comment: "The Midjourney v6 prompts available here are absolute game-changers! Saved me hours of conceptualizing for my client projects.",
    date: "June 12, 2026"
  },
  {
    id: "r2",
    name: "Aminul Islam",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    comment: "As a full-stack developer, the Next.js and Tailwind optimization prompts helped me write highly structured and clean code configurations.",
    date: "May 28, 2026"
  },
  {
    id: "r3",
    name: "Sajid Ahmed",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    rating: 4,
    comment: "Excellent platform structure. The copy-paste clipboard counter works flawlessly, and the prompt visibility settings are highly secure.",
    date: "April 15, 2026"
  }
];

export default function CustomerReviews() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#09090b] border-b border-zinc-900 relative overflow-hidden">

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-purple-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <MessageSquare className="h-4 w-4" /> Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Community Says</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Discover how thousands of creators, developers, and writers are boosting their AI potential with PromptVerse.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {MOCK_REVIEWS.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="relative p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/80 hover:border-zinc-700/50 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm group"
            >
                
              <Quote className="absolute top-4 right-4 h-8 w-8 text-zinc-800/40 group-hover:text-purple-500/10 transition-colors pointer-events-none" />

              <div>
                
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-zinc-700"}`} 
                    />
                  ))}
                </div>
                
                <p className="text-sm text-zinc-300 leading-relaxed italic mb-6">
                  {review.comment}
                </p>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/60">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-800"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-200 truncate">{review.name}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{review.date}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}