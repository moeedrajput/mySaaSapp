"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PenTool, Sparkles, Copy, CheckCircle2, 
  MessageCircle, Image as ImageIcon, Briefcase, Video, Music,
  ChevronDown, Zap, Target, Users, Layout, Send
} from "lucide-react";
import { generateCaptions, CaptionVariation } from "@/app/actions/content-actions";

const tones = ["Professional", "Funny", "Bold", "Empathetic", "Casual"];
const audiences = ["Entrepreneurs", "Gen Z", "Small Business Owners", "Tech Enthusiasts", "Fitness Community"];

export default function ContentLabPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState(tones[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [captions, setCaptions] = useState<CaptionVariation[] | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showToneDropdown, setShowToneDropdown] = useState(false);
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Button Clicked: Starting Caption generation...");
    console.log("Settings:", { topic, tone, audience });

    if (!topic.trim()) return;
    
    setIsGenerating(true);
    setCaptions(null);

    try {
      const result = await generateCaptions(topic, tone, audience);
      console.log("API Response (Captions):", result);
      
      if (result.success && result.data) {
        setCaptions(result.data);
      }
    } catch (err: any) {
      console.error("Client-side Error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <PenTool size={24} className="text-success-400" />
          Content Lab
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Generate high-converting social media captions for every platform.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Configuration (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Layout size={20} className="text-brand-400" />
              Generator Settings
            </h3>

            {/* Topic Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Post Topic / Context</label>
              <textarea 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What is your post about? (e.g., launching a new AI tool for creators)"
                className="w-full h-32 p-4 rounded-xl bg-surface-900 border border-white/5 text-slate-200 placeholder:text-slate-600 focus:border-brand-500/50 outline-none transition-all resize-none shadow-inner"
              />
            </div>

            {/* Dropdowns Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tone Dropdown */}
              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tone</label>
                <button 
                  type="button"
                  onClick={() => setShowToneDropdown(!showToneDropdown)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-surface-900 border border-white/5 text-sm text-slate-200 hover:bg-surface-800 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Zap size={14} className="text-warning-400" />
                    {tone}
                  </span>
                  <ChevronDown size={14} className={`transition-transform ${showToneDropdown ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showToneDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute z-20 top-full mt-2 w-full glass-card p-1 rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                      {tones.map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => { setTone(t); setShowToneDropdown(false); }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${tone === t ? 'bg-brand-500/20 text-brand-300' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Audience Dropdown */}
              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Audience</label>
                <button 
                  type="button"
                  onClick={() => setShowAudienceDropdown(!showAudienceDropdown)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-surface-900 border border-white/5 text-sm text-slate-200 hover:bg-surface-800 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Users size={14} className="text-accent-400" />
                    {audience.length > 15 ? audience.substring(0, 12) + "..." : audience}
                  </span>
                  <ChevronDown size={14} className={`transition-transform ${showAudienceDropdown ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showAudienceDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute z-20 top-full mt-2 w-full glass-card p-1 rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                      {audiences.map(a => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => { setAudience(a); setShowAudienceDropdown(false); }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${audience === a ? 'bg-accent-500/20 text-accent-300' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                        >
                          {a}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isGenerating || !topic.trim()}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                isGenerating || !topic.trim()
                  ? 'bg-surface-800 text-slate-500 cursor-not-allowed'
                  : 'gradient-brand text-white shadow-brand-500/25'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Generating with Groq...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Viral Captions
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Right: Results (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border-4 border-brand-500/10 border-t-brand-500 animate-spin" />
                  <PenTool size={32} className="absolute inset-0 m-auto text-brand-400 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Analyzing your context...</h3>
                <p className="text-slate-400 max-w-xs mx-auto">ViraLoom AI is crafting 3 unique variations for different social algorithms.</p>
              </motion.div>
            ) : captions ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {captions.map((caption, i) => (
                  <motion.div 
                    key={caption.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-2xl overflow-hidden group"
                  >
                    <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-surface-900 ${
                          caption.platform === 'Instagram' ? 'text-pink-400' : 
                          caption.platform === 'LinkedIn' ? 'text-blue-400' : 'text-emerald-400'
                        }`}>
                          {caption.platform === 'Instagram' ? <ImageIcon size={18} /> : 
                           caption.platform === 'LinkedIn' ? <Briefcase size={18} /> : <Music size={18} />}
                        </div>
                        <span className="text-sm font-bold text-white">{caption.platform} Variation</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => copyToClipboard(caption.content, caption.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          copiedId === caption.id 
                            ? 'bg-success-500/10 text-success-400 border border-success-500/20' 
                            : 'bg-surface-800 text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        {copiedId === caption.id ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                        {copiedId === caption.id ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="p-6">
                      <pre className="whitespace-pre-wrap font-sans text-slate-300 text-sm leading-relaxed">
                        {caption.content}
                      </pre>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center border-dashed border-2 border-white/5"
              >
                <div className="w-16 h-16 rounded-3xl bg-surface-900 flex items-center justify-center mb-6 text-slate-600">
                  <Send size={32} />
                </div>
                <h3 className="text-lg font-semibold text-slate-400">Ready to go viral?</h3>
                <p className="text-slate-600 max-w-xs mx-auto mt-2">Enter a topic on the left and select your tone to generate high-performing captions.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
