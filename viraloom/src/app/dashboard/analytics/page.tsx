"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Eye, Clock, Video, FileText } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 size={24} className="text-brand-400" />
          Analytics
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Track your AI content performance and usage metrics
        </p>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Views", value: "24.8K", icon: Eye, change: "+18%", color: "text-brand-400" },
          { label: "Avg. Watch Time", value: "2m 34s", icon: Clock, change: "+7%", color: "text-accent-400" },
          { label: "Videos Published", value: "127", icon: Video, change: "+23", color: "text-success-400" },
          { label: "Content Pieces", value: "1,893", icon: FileText, change: "+145", color: "text-warning-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">{stat.label}</span>
              <stat.icon size={16} className={stat.color} />
            </div>
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-success-400 mt-1 flex items-center gap-1">
              <TrendingUp size={10} />
              {stat.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Chart placeholder */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Performance Overview</h2>
        <div className="h-64 flex items-center justify-center text-slate-500 text-sm">
          <div className="text-center">
            <BarChart3 size={40} className="mx-auto text-slate-600 mb-3" />
            <p>Charts will be rendered here with real data</p>
            <p className="text-xs text-slate-600 mt-1">Connect your analytics to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
}
