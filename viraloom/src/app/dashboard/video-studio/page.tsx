"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, Sparkles, Play, Wand2, Type, Layout, 
  Volume2, Clock, CheckCircle2, ChevronDown, Monitor,
  Smartphone, Square, Settings2, AlertCircle, CheckCircle
} from "lucide-react";
import { generateVideo, VideoResult } from "@/app/actions/video-actions";

// Mock Data
const avatars = [
  { id: "1", name: "Sarah", role: "Professional", color: "from-blue-500 to-purple-500" },
  { id: "2", name: "Marcus", role: "Casual", color: "from-emerald-400 to-cyan-500" },
  { id: "3", name: "Emma", role: "News Anchor", color: "from-orange-400 to-red-500" },
  { id: "4", name: "David", role: "Tech Reviewer", color: "from-brand-400 to-indigo-600" },
  { id: "5", name: "Sophia", role: "Lifestyle", color: "from-pink-500 to-rose-500" },
  { id: "6", name: "James", role: "Corporate", color: "from-slate-400 to-slate-600" },
];

const voices = [
  { id: "v1", name: "Sarah (US English) - Natural" },
  { id: "v2", name: "Marcus (UK English) - Authoritative" },
  { id: "v3", name: "Emma (US English) - Energetic" },
];

export default function VideoStudioPage() {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].id);
  const [script, setScript] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(voices[0].id);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoResult, setVideoResult] = useState<VideoResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showVoiceDropdown, setShowVoiceDropdown] = useState(false);

  const handleGenerate = async () => {
    if (!script.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setVideoResult(null);

    try {
      const result = await generateVideo(script, selectedAvatar, selectedVoice);
      
      if (result.success && result.data) {
        setVideoResult(result.data);
      } else {
        setError(result.error || "Generation failed.");
      }
    } catch (err) {
      setError("Failed to connect to video service.");
    } finally {
      setIsGenerating(false);
    }
  };

  const activeAvatar = avatars.find(a => a.id === selectedAvatar);
  const activeVoice = voices.find(v => v.id === selectedVoice);

  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Video size={24} className="text-brand-400" />
            AI Video Studio
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Create stunning videos with realistic AI avatars and voices.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column: Avatar & Settings (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Avatar Selection */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Layout size={18} className="text-brand-400" />
                Select Avatar
              </h2>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {avatars.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`relative group rounded-xl overflow-hidden aspect-square transition-all duration-200 ${
                    selectedAvatar === avatar.id ? 'ring-2 ring-brand-500 ring-offset-2 ring-offset-surface-900' : 'hover:ring-2 hover:ring-white/20'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${avatar.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-white/90 text-xl tracking-tighter">
                    {avatar.name[0]}
                  </div>
                  {selectedAvatar === avatar.id && (
                    <div className="absolute top-1 right-1 bg-brand-500 rounded-full p-0.5 shadow-md">
                      <CheckCircle2 size={12} className="text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-black/50 backdrop-blur-sm p-1 text-center">
                    <span className="text-[10px] font-medium text-white truncate block">{avatar.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
              <Settings2 size={18} className="text-accent-400" />
              Settings
            </h2>

            {/* Aspect Ratio */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "16:9", icon: Monitor, label: "Landscape" },
                  { id: "9:16", icon: Smartphone, label: "Portrait" },
                  { id: "1:1", icon: Square, label: "Square" },
                ].map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setAspectRatio(ratio.id)}
                    className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border transition-all ${
                      aspectRatio === ratio.id 
                        ? 'bg-accent-500/10 border-accent-500/50 text-accent-400' 
                        : 'bg-surface-800/50 border-white/5 text-slate-400 hover:bg-surface-800 hover:text-white'
                    }`}
                  >
                    <ratio.icon size={18} />
                    <span className="text-[10px] font-medium">{ratio.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Script & Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Script Input */}
          <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full min-h-[400px]">
            <div className="p-4 border-b border-white/5 bg-white/[0.02] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-white">
                <Type size={18} className="text-brand-400" />
                <h2 className="text-base font-semibold">Video Script</h2>
              </div>
              
              {/* Voice Selector */}
              <div className="relative">
                <button 
                  onClick={() => setShowVoiceDropdown(!showVoiceDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-800 border border-white/10 text-sm text-slate-200 hover:bg-surface-700 transition-colors"
                >
                  <Volume2 size={14} className="text-accent-400" />
                  <span className="truncate max-w-[150px]">{activeVoice?.name.split(' - ')[0]}</span>
                  <ChevronDown size={14} className="text-slate-500" />
                </button>

                <AnimatePresence>
                  {showVoiceDropdown && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowVoiceDropdown(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute right-0 top-full mt-2 w-64 z-20 glass-card rounded-xl border border-white/10 p-1 shadow-xl"
                      >
                        {voices.map(voice => (
                          <button
                            key={voice.id}
                            onClick={() => { setSelectedVoice(voice.id); setShowVoiceDropdown(false); }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedVoice === voice.id ? 'bg-brand-500/20 text-brand-300' : 'text-slate-300 hover:bg-white/5'
                            }`}
                          >
                            <div className="font-medium">{voice.name.split(' - ')[0]}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{voice.name.split(' - ')[1]}</div>
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Textarea */}
            <div className="flex-1 p-6 relative group">
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Type your video script here... Or use the AI Magic Wand to generate one."
                className="w-full h-full min-h-[200px] bg-transparent resize-none outline-none text-slate-200 placeholder:text-slate-600 text-lg leading-relaxed"
              />
              
              <div className="absolute bottom-6 right-6 text-xs text-slate-500 font-medium bg-surface-900/80 px-3 py-1.5 rounded-lg backdrop-blur-md">
                {script.length} / 2000 chars
              </div>
            </div>

            {/* Progress / Status Area */}
            <AnimatePresence>
              {(isGenerating || videoResult || error) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 py-4 border-t border-white/5 bg-white/[0.01]"
                >
                  {isGenerating && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                          AI is generating your video...
                        </span>
                        <span>Estimated: 5s</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-brand-500"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "linear" }}
                        />
                      </div>
                    </div>
                  )}

                  {videoResult && (
                    <div className="p-4 rounded-xl bg-success-500/10 border border-success-500/20 flex items-start gap-3">
                      <CheckCircle className="text-success-400 flex-shrink-0 mt-0.5" size={18} />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-white">Generation Successful!</p>
                        <p className="text-xs text-slate-400">{videoResult.message}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button className="px-3 py-1.5 rounded-lg bg-success-500 text-white text-xs font-bold hover:bg-success-600 transition-colors">
                            Preview Video
                          </button>
                          <button className="px-3 py-1.5 rounded-lg bg-surface-800 text-slate-300 text-xs font-bold hover:bg-surface-700 transition-colors">
                            Download (HD)
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 rounded-xl bg-error-500/10 border border-error-500/20 flex items-start gap-3">
                      <AlertCircle className="text-error-400 flex-shrink-0 mt-0.5" size={18} />
                      <p className="text-sm font-medium text-error-400">{error}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Bar */}
            <div className="p-4 border-t border-white/5 bg-white/[0.02] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-500" />
                  Est. Duration: <span className="text-slate-200 font-medium">{Math.max(1, Math.ceil(script.length / 15))}s</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-brand-400" />
                  Cost: <span className="text-slate-200 font-medium">10 Credits</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={isGenerating || script.length === 0}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition-all ${
                  isGenerating || script.length === 0
                    ? 'bg-surface-700 text-slate-500 cursor-not-allowed'
                    : 'gradient-brand text-white shadow-brand-500/25 hover:shadow-brand-500/40'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play size={16} className="fill-current" />
                    Generate Video
                  </>
                )}
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
