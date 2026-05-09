"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Video, Search, Zap, Sparkles, ArrowRight, Check, 
  ShieldCheck, Crown, Play, Cpu, Globe, BarChart3,
  MessageCircle, Image as ImageIcon, Briefcase, Layers,
  ChevronRight, Star, TrendingUp
} from "lucide-react";
import Logo from "@/components/ui/Logo";

const features = [
  {
    title: "AI Video Studio",
    description: "Generate professional videos with realistic AI avatars in seconds. No camera, no studio, no problem.",
    icon: Video,
    color: "text-brand-400",
    glow: "group-hover:shadow-brand-500/20"
  },
  {
    title: "SEO Suite",
    description: "Dominate search rankings with AI-powered keyword research and content strategy tailored for virality.",
    icon: Search,
    color: "text-accent-400",
    glow: "group-hover:shadow-accent-500/20"
  },
  {
    title: "Content Lab",
    description: "Generate high-converting captions and social media posts across all platforms with one click.",
    icon: Zap,
    color: "text-warning-400",
    glow: "group-hover:shadow-warning-500/20"
  }
];

const steps = [
  {
    title: "Research",
    description: "Enter your topic and let our AI find the most viral angles and keywords for your niche.",
    icon: Globe
  },
  {
    title: "Create",
    description: "Generate scripts, AI videos, and social media content using our state-of-the-art models.",
    icon: Cpu
  },
  {
    title: "Scale",
    description: "Schedule your posts across all platforms and watch your brand grow on autopilot.",
    icon: BarChart3
  }
];

const plans = [
  {
    name: "Basic",
    price: "$0",
    features: ["3 AI Videos per month", "5 SEO Reports per month", "Standard resolution", "Community support"],
    highlight: false,
    cta: "Get Started"
  },
  {
    name: "Pro",
    price: "$9",
    features: ["30 AI Videos per month", "Unlimited SEO Analysis", "Automated Social Posting", "HD Video Exports", "Priority support"],
    highlight: true,
    cta: "Join Pro"
  },
  {
    name: "Unlimited",
    price: "$25",
    features: ["Everything Unlimited", "4K Video Exports", "Custom AI Avatars", "Dedicated Manager", "White-label reports"],
    highlight: false,
    cta: "Go Unlimited"
  }
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-950 text-white selection:bg-brand-500/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-surface-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/dashboard" className="px-5 py-2 rounded-xl bg-white text-black text-sm font-bold hover:bg-slate-200 transition-all">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Sparkles size={14} />
              The Next Evolution is Here
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8"
            >
              The Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-accent-400 to-warning-400">
                AI Marketing
              </span> is Here
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed"
            >
              Create viral videos, dominate SEO, and automate your social media with the world's most powerful AI marketing suite. Designed for creators who demand the best.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-black text-lg hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]">
                Get Started for Free
                <ArrowRight size={20} />
              </Link>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-surface-900 border border-white/10 text-white font-bold text-lg hover:bg-surface-800 transition-all">
                <Play size={18} fill="white" />
                Watch Demo
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center gap-6"
            >
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Trusted by 10,000+ top creators</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale">
                <div className="text-2xl font-black italic tracking-tighter">FORBES</div>
                <div className="text-2xl font-black">TECHCRUNCH</div>
                <div className="text-2xl font-black">WIRED</div>
                <div className="text-2xl font-black italic tracking-tighter">The Verge</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-surface-900/50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">One Suite. Infinite Possibilities.</h2>
              <p className="text-slate-400">Everything you need to grow your digital presence in 2026.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  {...fadeIn}
                  transition={{ delay: i * 0.2 }}
                  className="group relative p-8 rounded-3xl bg-surface-950 border border-white/5 hover:border-brand-500/30 transition-all duration-500"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${feature.color}`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-400 transition-colors">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    Learn More <ChevronRight size={16} />
                  </div>
                  <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500 -z-10 ${feature.glow}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div {...fadeIn}>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                  From Idea to Viral in <span className="text-brand-400 underline decoration-brand-500/30 underline-offset-8 italic">Minutes</span>
                </h2>
                <div className="space-y-10">
                  {steps.map((step, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                          <step.icon size={20} className="text-slate-500" />
                          {step.title}
                        </h4>
                        <p className="text-slate-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                {...fadeIn}
                className="relative"
              >
                <div className="absolute inset-0 bg-brand-500/20 blur-[100px] rounded-full" />
                <div className="relative glass-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-surface-900">
                  <div className="h-10 bg-white/5 flex items-center px-4 gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <div className="flex-1 flex justify-center">
                      <div className="w-32 h-4 rounded-full bg-white/5" />
                    </div>
                  </div>
                  <div className="p-8 aspect-video flex items-center justify-center">
                    <div className="relative group cursor-pointer">
                      <div className="absolute inset-0 bg-brand-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                      <div className="relative w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play size={32} fill="currentColor" className="ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating UI Elements */}
                <div className="absolute -top-10 -right-10 glass-card p-4 rounded-2xl shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-success-500/20 flex items-center justify-center">
                      <TrendingUp size={16} className="text-success-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Viral Probability</p>
                      <p className="text-sm font-bold text-white">98.4% Match</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-surface-900/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-slate-400">Scale your brand without breaking the bank.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className={`flex flex-col rounded-3xl p-8 transition-all duration-300 ${
                    plan.highlight
                      ? "bg-surface-900 border-2 border-brand-500 shadow-[0_0_50px_-10px_rgba(124,58,237,0.4)] scale-105 z-10"
                      : "glass-card border-white/5"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className="text-sm text-slate-500">/month</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                        <Check size={16} className="text-brand-400 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href="/dashboard" className={`w-full py-4 rounded-2xl text-sm font-bold text-center transition-all ${
                    plan.highlight
                      ? "gradient-brand text-white shadow-xl shadow-brand-500/20"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  }`}>
                    {plan.cta}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-brand-500/5 -z-10" />
          <div className="max-w-4xl mx-auto px-6">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to Own the <br />Algorithm?</h2>
              <p className="text-xl text-slate-400 mb-10">Join 10,000+ creators who are already using ViraLoom to scale their brand.</p>
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-white text-black font-black text-xl hover:scale-105 transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)]">
                Get Started for Free
                <Zap size={24} fill="currentColor" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo />
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex gap-4">
            <MessageCircle size={20} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
            <ImageIcon size={20} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
            <Briefcase size={20} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
        <p className="text-center text-[10px] text-slate-600 mt-8 font-bold uppercase tracking-widest">© 2026 ViraLoom AI. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
