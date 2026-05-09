"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, TrendingUp, Zap, Video, FileText, BarChart3, 
  Users, Gift, Copy, CheckCircle2, ChevronRight, X, PlayCircle, CreditCard
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import { USER_DATA } from "@/lib/constants";

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("viraloom_onboarding_seen");
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("viraloom_onboarding_seen", "true");
    setShowOnboarding(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(USER_DATA.referrals.link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back, {USER_DATA.name.split(' ')[0]}
          </h1>
          <motion.span
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-2xl"
          >
            👋
          </motion.span>
        </div>
        <p className="text-sm text-slate-400 flex items-center gap-2">
          <Sparkles size={14} className="text-brand-400" />
          Here&apos;s what&apos;s happening with your AI marketing today
        </p>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Videos Created"
          value="127"
          change="+23%"
          changeType="positive"
          icon="Video"
          iconColor="text-brand-400"
          delay={0.1}
        />
        <StatsCard
          title="Credits Remaining"
          value={USER_DATA.credits.remaining.toLocaleString()}
          change="-18%"
          changeType="negative"
          icon="Zap"
          iconColor="text-accent-400"
          delay={0.15}
        />
        <StatsCard
          title="SEO Score"
          value="92"
          change="+12%"
          changeType="positive"
          icon="TrendingUp"
          iconColor="text-success-400"
          delay={0.2}
        />
        <StatsCard
          title="Content Generated"
          value="1,893"
          change="+45%"
          changeType="positive"
          icon="FileText"
          iconColor="text-warning-400"
          delay={0.25}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Analytics Chart (Line Chart Style) */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 size={20} className="text-brand-400" />
                Performance Analytics
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Videos created vs Credits used over 30 days</p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <div className="w-2 h-2 rounded-full bg-brand-500" /> Videos
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <div className="w-2 h-2 rounded-full bg-accent-500" /> Credits
              </span>
            </div>
          </div>

          {/* Simple SVG Chart */}
          <div className="relative h-48 w-full mt-4">
            <svg viewBox="0 0 1000 200" className="w-full h-full preserve-3d overflow-visible">
              {/* Grid Lines */}
              <line x1="0" y1="0" x2="1000" y2="0" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
              <line x1="0" y1="50" x2="1000" y2="50" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
              <line x1="0" y1="100" x2="1000" y2="100" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
              <line x1="0" y1="150" x2="1000" y2="150" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
              <line x1="0" y1="200" x2="1000" y2="200" stroke="white" strokeOpacity="0.05" strokeWidth="1" />

              {/* Videos Path */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M0,150 L100,140 L200,160 L300,120 L400,130 L500,80 L600,100 L700,70 L800,90 L900,40 L1000,60"
                fill="none"
                stroke="url(#brandGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Credits Path */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                d="M0,180 L100,170 L200,175 L300,150 L400,160 L500,120 L600,130 L700,100 L800,110 L900,60 L1000,80"
                fill="none"
                stroke="url(#accentGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8,8"
              />

              <defs>
                <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#c026d3" />
                </linearGradient>
                <linearGradient id="accentGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="flex justify-between mt-4">
            <span className="text-[10px] font-bold text-slate-600 uppercase">30 Days Ago</span>
            <span className="text-[10px] font-bold text-slate-600 uppercase">Today</span>
          </div>
        </div>

        {/* Referral Section */}
        <div className="glass-card rounded-3xl p-6 relative overflow-hidden bg-brand-500/[0.03] border-brand-500/20">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center text-brand-400 mb-6">
              <Gift size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Refer a Friend</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Share your link and get <span className="text-white font-bold">100 free credits</span> for every friend who joins!
            </p>
            
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-surface-950 border border-white/5 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500 truncate">{USER_DATA.referrals.link}</span>
                <button 
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors flex-shrink-0"
                >
                  {copiedLink ? <CheckCircle2 size={16} className="text-success-400" /> : <Copy size={16} />}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium">Total Referrals</p>
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-brand-400" />
                  <span className="text-sm font-bold text-white">{USER_DATA.referrals.count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="space-y-6">
          <QuickActions />
          {/* Trending alert banner (Moved here for better flow) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl p-4"
            style={{
              background: "rgba(124,58,237,0.06)",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/20">
                <TrendingUp size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">Videos are trending! 🔥</p>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Your AI content is outperforming 89% of similar creators this week.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Onboarding Wizard Modal */}
      <AnimatePresence>
        {showOnboarding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-surface-950 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
            >
              {/* Decorative gradients */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-500/20 rounded-full blur-[100px]" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent-500/20 rounded-full blur-[100px]" />

              <div className="relative p-10 flex flex-col items-center text-center">
                <button 
                  onClick={completeOnboarding}
                  className="absolute top-8 right-8 p-2 text-slate-600 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Step indicator */}
                <div className="flex gap-2 mb-10">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        onboardingStep === step ? "w-8 bg-brand-500" : "w-1.5 bg-white/10"
                      }`} 
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {onboardingStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-20 h-20 rounded-3xl gradient-brand flex items-center justify-center mb-8 shadow-2xl shadow-brand-500/20">
                        <Sparkles size={40} className="text-white" />
                      </div>
                      <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Welcome to ViraLoom</h2>
                      <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                        The world&apos;s most powerful AI-driven marketing platform. Create viral content in minutes, not hours.
                      </p>
                    </motion.div>
                  )}

                  {onboardingStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-20 h-20 rounded-3xl bg-accent-500/20 flex items-center justify-center mb-8 border border-accent-500/30">
                        <PlayCircle size={40} className="text-accent-400" />
                      </div>
                      <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Create First AI Video</h2>
                      <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                        Choose an avatar, paste your script, and let our engine render a high-fidelity talking head video instantly.
                      </p>
                    </motion.div>
                  )}

                  {onboardingStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-20 h-20 rounded-3xl bg-warning-500/20 flex items-center justify-center mb-8 border border-warning-500/30">
                        <CreditCard size={40} className="text-warning-400" />
                      </div>
                      <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Ready to Scale?</h2>
                      <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                        Explore our plans to unlock 4K exports, custom avatars, and unlimited SEO analysis.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-12 flex gap-4 w-full max-w-sm">
                  {onboardingStep < 3 ? (
                    <button
                      onClick={() => setOnboardingStep(onboardingStep + 1)}
                      className="flex-1 py-4 rounded-2xl text-sm font-black gradient-brand text-white shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2"
                    >
                      Next Step <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={completeOnboarding}
                      className="flex-1 py-4 rounded-2xl text-sm font-black bg-success-500 text-white shadow-xl shadow-success-500/25"
                    >
                      Get Started
                    </button>
                  )}
                  <button
                    onClick={completeOnboarding}
                    className="flex-1 py-4 rounded-2xl text-sm font-black bg-white/5 text-slate-500 hover:text-white transition-colors"
                  >
                    Skip
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
