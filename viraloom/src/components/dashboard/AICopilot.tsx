"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, User, Bot } from "lucide-react";

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-[500px] bg-surface-950 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-brand-500/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">ViraLoom AI Assistant</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400 flex-shrink-0">
                  <Bot size={18} />
                </div>
                <div className="p-3 rounded-2xl rounded-tl-none bg-surface-900 border border-white/5 text-sm text-slate-300 leading-relaxed">
                  I&apos;m your ViraLoom AI assistant! I can help you create videos, write scripts, and optimize your content. How can I help you today?
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-surface-900/50 backdrop-blur-md">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl bg-surface-950 border border-white/5 text-sm text-white focus:border-brand-500/50 outline-none transition-all"
                  onKeyDown={(e) => e.key === "Enter" && setMessage("")}
                />
                <button 
                  onClick={() => setMessage("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg gradient-brand text-white shadow-lg shadow-brand-500/20"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl gradient-brand text-white flex items-center justify-center shadow-2xl shadow-brand-500/40 relative group"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-surface-900 border border-white/10 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            AI Copilot
          </div>
        )}
      </motion.button>
    </div>
  );
}
