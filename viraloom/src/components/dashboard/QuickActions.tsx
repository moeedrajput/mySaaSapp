"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Video, Search, PenTool, Sparkles, ArrowRight } from "lucide-react";

const actions = [
  {
    title: "Create AI Video",
    description: "Generate a talking avatar video from text",
    icon: Video,
    href: "/dashboard/video-studio",
    gradient: "from-brand-600/20 to-brand-400/5",
    iconColor: "text-brand-400",
    borderColor: "border-brand-500/20 hover:border-brand-500/40",
  },
  {
    title: "Keyword Research",
    description: "Find high-impact keywords for your niche",
    icon: Search,
    href: "/dashboard/seo-suite",
    gradient: "from-accent-600/20 to-accent-400/5",
    iconColor: "text-accent-400",
    borderColor: "border-accent-500/20 hover:border-accent-500/40",
  },
  {
    title: "Generate Content",
    description: "AI-powered captions, titles & descriptions",
    icon: PenTool,
    href: "/dashboard/content-lab",
    gradient: "from-success-500/20 to-success-400/5",
    iconColor: "text-success-400",
    borderColor: "border-success-500/20 hover:border-success-500/40",
  },
];

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={18} className="text-brand-400" />
        <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
      </div>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link key={action.title} href={action.href}>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className={`group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${action.gradient} border ${action.borderColor} transition-all duration-300 cursor-pointer hover:translate-x-1`}
            >
              <div className={`p-2.5 rounded-lg bg-white/[0.04] ${action.iconColor}`}>
                <action.icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{action.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{action.description}</p>
              </div>
              <ArrowRight
                size={16}
                className="text-slate-600 group-hover:text-slate-300 group-hover:translate-x-1 transition-all"
              />
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Usage this month */}
      <div className="mt-6 p-4 rounded-xl bg-surface-800/40 border border-white/[0.04]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            This Month
          </p>
          <p className="text-xs text-slate-500">May 2026</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Videos", value: "24", color: "text-brand-400" },
            { label: "Keywords", value: "186", color: "text-accent-400" },
            { label: "Content", value: "93", color: "text-success-400" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
