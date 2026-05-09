"use client";

import { motion } from "framer-motion";
import { Layout, Search, Sparkles, Play, Filter, Clock, Tag } from "lucide-react";

const templates = [
  { id: 1, name: "Product Launch", category: "Marketing", duration: "45s", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60" },
  { id: 2, name: "Social Ad Reel", category: "Social Media", duration: "15s", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60" },
  { id: 3, name: "Educational Explainer", category: "Learning", duration: "2:00", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60" },
  { id: 4, name: "Real Estate Tour", category: "Business", duration: "1:30", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60" },
  { id: 5, name: "Fitness Motivation", category: "Health", duration: "30s", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60" },
  { id: 6, name: "Podcast Highlight", category: "Content", duration: "1:00", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=60" },
];

export default function TemplatesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layout size={24} className="text-brand-400" />
            Video Templates
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Choose a professionally designed preset to jumpstart your video creation.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search templates..."
              className="pl-10 pr-4 py-2 rounded-xl bg-surface-900 border border-white/5 text-sm text-white focus:border-brand-500/50 outline-none w-64"
            />
          </div>
          <button className="p-2.5 rounded-xl bg-surface-900 border border-white/5 text-slate-400 hover:text-white">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, i) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={template.image} 
                alt={template.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/40">
                  <Play size={20} fill="white" />
                </div>
              </div>
              <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                {template.category}
              </div>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white group-hover:text-brand-300 transition-colors">{template.name}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                      <Clock size={12} /> {template.duration}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                      <Tag size={12} /> HD Export
                    </span>
                  </div>
                </div>
                <div className="text-brand-400">
                  <Sparkles size={18} />
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-white/5 text-white text-xs font-bold border border-white/10 hover:bg-brand-500 hover:border-brand-500 transition-all duration-300">
                Use Template
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
