"use client";

import { motion } from "framer-motion";
import {
  Video,
  Zap,
  TrendingUp,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Video,
  Zap,
  TrendingUp,
  FileText,
};

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: string;
  iconColor?: string;
  delay?: number;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType = "positive",
  icon,
  iconColor = "text-brand-400",
  delay = 0,
}: StatsCardProps) {
  const Icon = iconMap[icon] || Video;

  const changeColors = {
    positive: "text-success-400",
    negative: "text-error-400",
    neutral: "text-slate-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className="glass-card rounded-2xl p-6 group cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <div
          className={`p-2.5 rounded-xl bg-white/[0.04] group-hover:bg-white/[0.06] transition-colors ${iconColor}`}
        >
          <Icon size={20} />
        </div>
      </div>

      <div className="space-y-1">
        <motion.p
          className="text-3xl font-bold text-white tracking-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
        >
          {value}
        </motion.p>

        {change && (
          <div className="flex items-center gap-1.5">
            {changeType === "positive" ? (
              <ArrowUpRight size={14} className={changeColors[changeType]} />
            ) : changeType === "negative" ? (
              <ArrowDownRight size={14} className={changeColors[changeType]} />
            ) : null}
            <span className={`text-xs font-medium ${changeColors[changeType]}`}>
              {change}
            </span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        )}
      </div>

      {/* Bottom gradient line */}
      <div className="mt-4 h-[2px] w-full rounded-full overflow-hidden bg-surface-800">
        <motion.div
          className="h-full rounded-full gradient-brand"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
