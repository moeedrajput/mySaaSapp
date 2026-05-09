"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Sparkles, CalendarDays, TrendingUp, Copy, CheckCircle2, 
  Hash, FileText, Video, Image as ImageIcon, MessageCircle, Briefcase, 
  Clock, AlignLeft, Type, Zap, ArrowRight, AlertCircle
} from "lucide-react";
import { generateSeoStrategy, SeoStrategy } from "@/app/actions/seo-actions";

// Mock Calendar Data
const calendarPosts = [
  { id: 1, day: "Monday", date: "May 10", platform: "Youtube", title: "Top 5 AI Marketing Tools 2026", time: "10:00 AM", status: "scheduled", icon: Video, color: "text-red-400" },
  { id: 2, day: "Tuesday", date: "May 11", platform: "Twitter", title: "Why SEO is changing forever 🧵", time: "02:30 PM", status: "draft", icon: MessageCircle, color: "text-sky-400" },
  { id: 3, day: "Wednesday", date: "May 12", platform: "Linkedin", title: "Case Study: How we 10x'd traffic", time: "09:00 AM", status: "scheduled", icon: Briefcase, color: "text-blue-400" },
  { id: 4, day: "Thursday", date: "May 13", platform: "Instagram", title: "Behind the scenes of our AI setup", time: "11:00 AM", status: "draft", icon: ImageIcon, color: "text-pink-400" },
  { id: 5, day: "Friday", date: "May 14", platform: "Youtube", title: "Weekend AI News Roundup", time: "04:00 PM", status: "scheduled", icon: Video, color: "text-red-400" },
];

export default function SeoSuitePage() {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategyData, setStrategyData] = useState<SeoStrategy | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Button Clicked: Starting SEO Strategy generation...");
    
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await generateSeoStrategy(topic);
      console.log("API Response (SEO):", result);
      
      if (result.success && result.data) {
        setStrategyData(result.data);
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (err: any) {
      console.error("Client-side Error:", err);
      setError("Failed to connect to the AI service: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Search size={24} className="text-accent-400" />
          SEO Suite & Content Strategy
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Dominate search rankings and social algorithms with AI-generated strategies.
        </p>
      </div>

      {/* Main Input Area */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent-500/20 transition-colors duration-700" />
        
        <label className="text-sm font-semibold text-slate-300 mb-4 block flex items-center gap-2">
          <Zap size={18} className="text-brand-400" />
          What topic do you want to dominate?
        </label>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 relative z-10">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., AI Marketing Strategies, Real Estate Investing, Fitness Tips..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-900/80 border border-white/10 text-base text-white placeholder:text-slate-500 focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/30 transition-all outline-none shadow-inner"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isGenerating || !topic.trim()}
            className={`flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold shadow-lg transition-all min-w-[200px] ${
              isGenerating || !topic.trim()
                ? 'bg-surface-700 text-slate-500 cursor-not-allowed'
                : 'gradient-brand text-white shadow-brand-500/25 hover:shadow-brand-500/40'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Generating with Groq...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Strategy
              </>
            )}
          </motion.button>
        </form>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-xl bg-error-500/10 border border-error-500/20 text-error-400 text-sm flex items-center gap-3"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Results Section */}
      <AnimatePresence>
        {strategyData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Titles & Description Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Viral Titles */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-5">
                  <Type size={20} className="text-accent-400" />
                  3 Viral Titles
                </h3>
                <div className="space-y-4">
                  {strategyData.titles.map((t, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-surface-800/50 border border-white/5 flex items-start justify-between gap-4 group hover:bg-surface-800 transition-colors">
                      <p className="text-slate-200 font-medium leading-relaxed">{t}</p>
                      <button 
                        onClick={() => copyToClipboard(t, `title-${idx}`)}
                        className="p-2 rounded-lg bg-surface-700 text-slate-400 hover:text-white hover:bg-surface-600 transition-colors flex-shrink-0"
                      >
                        {copiedItem === `title-${idx}` ? <CheckCircle2 size={16} className="text-success-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO Description */}
              <div className="glass-card rounded-2xl p-6 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <AlignLeft size={20} className="text-success-400" />
                    SEO-Optimized Description
                  </h3>
                  <button 
                    onClick={() => copyToClipboard(strategyData.description, 'desc')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-surface-700 transition-colors"
                  >
                    {copiedItem === 'desc' ? <CheckCircle2 size={14} className="text-success-400" /> : <Copy size={14} />}
                    {copiedItem === 'desc' ? 'Copied' : 'Copy All'}
                  </button>
                </div>
                <div className="flex-1 p-5 rounded-xl bg-surface-800/50 border border-white/5 text-slate-300 text-sm leading-loose">
                  {strategyData.description}
                </div>
              </div>

            </div>

            {/* Trending Hashtags */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Hash size={20} className="text-brand-400" />
                  20 Trending Hashtags
                </h3>
                <button 
                  type="button"
                  onClick={() => copyToClipboard(strategyData.hashtags.join(" "), 'tags')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-surface-700 transition-colors"
                >
                  {copiedItem === 'tags' ? <CheckCircle2 size={14} className="text-success-400" /> : <Copy size={14} />}
                  Copy Tags
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {strategyData.hashtags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 cursor-default hover:bg-brand-500/20 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Media Calendar Grid */}
      <div className="glass-card rounded-2xl p-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <CalendarDays size={22} className="text-pink-400" />
              Content Calendar
            </h2>
            <p className="text-xs text-slate-400 mt-1">Your scheduled posts for the week</p>
          </div>
          <button className="text-sm font-medium text-brand-400 hover:text-brand-300 flex items-center gap-1">
            View Full Calendar <ArrowRight size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-3 pl-4 font-medium">Date</th>
                <th className="pb-3 font-medium">Platform</th>
                <th className="pb-3 font-medium">Content Title</th>
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 pr-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {calendarPosts.map((post) => (
                <tr key={post.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 pl-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{post.day}</span>
                      <span className="text-xs text-slate-500">{post.date}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-md bg-surface-800 ${post.color}`}>
                        <post.icon size={14} />
                      </div>
                      <span className="text-sm font-medium text-slate-300">{post.platform}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-slate-200 group-hover:text-brand-300 transition-colors cursor-pointer flex items-center gap-2">
                      <FileText size={14} className="text-slate-500" />
                      {post.title}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-slate-400 flex items-center gap-1.5">
                      <Clock size={14} /> {post.time}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      post.status === 'scheduled' 
                        ? 'bg-success-500/10 text-success-400 border-success-500/20' 
                        : 'bg-surface-700 text-slate-400 border-white/10'
                    }`}>
                      {post.status === 'scheduled' ? <CheckCircle2 size={12} /> : <TrendingUp size={12} />}
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
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
