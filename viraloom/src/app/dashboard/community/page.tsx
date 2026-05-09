"use client";

import { motion } from "framer-motion";
import { Users, Heart, MessageSquare, Eye, Share2, MoreVertical, TrendingUp } from "lucide-react";

const showcase = [
  { id: 1, title: "Cyberpunk Cityscape AI", creator: "Alex River", avatar: "AR", views: "12.4k", likes: "1.2k", image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&auto=format&fit=crop&q=60" },
  { id: 2, title: "Healthy Morning Routine", creator: "Sarah J.", avatar: "SJ", views: "8.1k", likes: "842", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60" },
  { id: 3, title: "Startup Pitch Intro", creator: "TechVibe", avatar: "TV", views: "15.9k", likes: "2.1k", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60" },
  { id: 4, title: "Travel Blog Recap", creator: "Wanderlust", avatar: "WL", views: "5.2k", likes: "430", image: "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?w=800&auto=format&fit=crop&q=60" },
  { id: 5, title: "AI Music Video", creator: "NeonBeats", avatar: "NB", views: "24.1k", likes: "3.5k", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60" },
  { id: 6, title: "Product Promo 2026", creator: "BrandFlow", avatar: "BF", views: "11.2k", likes: "1.1k", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60" },
];

export default function CommunityPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users size={24} className="text-brand-400" />
            Community Gallery
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore and get inspired by AI-generated videos created by the ViraLoom community.
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/10 border border-brand-500/20">
          <TrendingUp size={16} className="text-brand-400" />
          <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">Top Trending Today</span>
        </div>
      </div>

      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {showcase.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl overflow-hidden break-inside-avoid group"
          >
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <Heart size={18} className="hover:text-error-400 cursor-pointer transition-colors" />
                    <MessageSquare size={18} className="hover:text-brand-400 cursor-pointer transition-colors" />
                    <Share2 size={18} className="hover:text-accent-400 cursor-pointer transition-colors" />
                  </div>
                  <MoreVertical size={18} className="cursor-pointer" />
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full gradient-brand flex items-center justify-center text-[10px] font-black text-white">
                    {item.avatar}
                  </div>
                  <span className="text-xs text-slate-400">{item.creator}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Eye size={12} /> {item.views}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Heart size={12} className="text-error-400/50" /> {item.likes}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center py-10">
        <button className="px-8 py-3 rounded-2xl bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-all">
          Load More Masterpieces
        </button>
      </div>
    </div>
  );
}
