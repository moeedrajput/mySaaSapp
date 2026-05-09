"use client";

import { motion } from "framer-motion";
import {
  Video,
  Search,
  FileText,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "video" | "seo" | "content" | "billing";
  title: string;
  description: string;
  status: "completed" | "processing" | "failed" | "pending";
  time: string;
  credits?: number;
}

const typeIcons: Record<string, React.ElementType> = {
  video: Video,
  seo: Search,
  content: FileText,
  billing: CreditCard,
};

const typeColors: Record<string, string> = {
  video: "text-brand-400 bg-brand-500/10",
  seo: "text-accent-400 bg-accent-500/10",
  content: "text-success-400 bg-success-500/10",
  billing: "text-warning-400 bg-warning-500/10",
};

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  completed: { icon: CheckCircle2, color: "text-success-400", label: "Completed" },
  processing: { icon: Loader2, color: "text-brand-400", label: "Processing" },
  failed: { icon: AlertCircle, color: "text-error-400", label: "Failed" },
  pending: { icon: Clock, color: "text-slate-400", label: "Pending" },
};

const mockActivity: ActivityItem[] = [
  {
    id: "1",
    type: "video",
    title: "Product Launch Intro",
    description: "AI avatar video generated — 1080p, 45s",
    status: "completed",
    time: "2 min ago",
    credits: 10,
  },
  {
    id: "2",
    type: "seo",
    title: "Keyword Research: 'AI Marketing Tools'",
    description: "42 keywords found, 8 high-opportunity",
    status: "completed",
    time: "1 hour ago",
    credits: 2,
  },
  {
    id: "3",
    type: "video",
    title: "Customer Testimonial V2",
    description: "Rendering in progress — estimated 3 min",
    status: "processing",
    time: "5 min ago",
    credits: 25,
  },
  {
    id: "4",
    type: "content",
    title: "Instagram Captions — Summer Campaign",
    description: "10 captions generated for product launch",
    status: "completed",
    time: "3 hours ago",
    credits: 5,
  },
  {
    id: "5",
    type: "billing",
    title: "Professional Plan Renewed",
    description: "Monthly subscription — $9/mo",
    status: "completed",
    time: "1 day ago",
  },
];

export default function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        <button className="text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors">
          View all →
        </button>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-white/[0.04]">
        {mockActivity.map((item, index) => {
          const TypeIcon = typeIcons[item.type];
          const StatusInfo = statusConfig[item.status];
          const StatusIcon = StatusInfo.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.07 }}
              className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer group"
            >
              {/* Type Icon */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[item.type]}`}
              >
                <TypeIcon size={18} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate group-hover:text-brand-300 transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {item.description}
                </p>
              </div>

              {/* Status + Meta */}
              <div className="flex-shrink-0 text-right space-y-1">
                <div className="flex items-center gap-1.5 justify-end">
                  <StatusIcon
                    size={12}
                    className={`${StatusInfo.color} ${
                      item.status === "processing" ? "animate-spin" : ""
                    }`}
                  />
                  <span className={`text-xs font-medium ${StatusInfo.color}`}>
                    {StatusInfo.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-[10px] text-slate-600">{item.time}</span>
                  {item.credits && (
                    <span className="text-[10px] text-slate-500 bg-surface-800 px-1.5 py-0.5 rounded">
                      -{item.credits} cr
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
