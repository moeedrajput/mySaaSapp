"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Video,
  Search,
  PenTool,
  BarChart3,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Layout,
  Users,
  LogOut,
  User,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { USER_DATA } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Video,
  Search,
  PenTool,
  BarChart3,
  CreditCard,
  Settings,
  Layout,
  Users,
};

const navItems = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "AI Video Studio", href: "/dashboard/video-studio", icon: "Video", isNew: true },
  { label: "SEO Suite", href: "/dashboard/seo-suite", icon: "Search" },
  { label: "Content Lab", href: "/dashboard/content-lab", icon: "PenTool" },
  { label: "Templates", href: "/dashboard/templates", icon: "Layout" },
  { label: "Community", href: "/dashboard/community", icon: "Users" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  { label: "Billing", href: "/dashboard/billing", icon: "CreditCard" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || USER_DATA.name;
  const initial = displayName ? displayName.charAt(0).toUpperCase() : 'U';
  const displayEmail = user?.email || '';
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <motion.aside
      className={`fixed top-0 left-0 h-screen z-40 flex flex-col bg-surface-900/80 backdrop-blur-2xl border-r border-white/[0.04] sidebar-transition ${collapsed ? "w-[72px]" : "w-[260px]"
        }`}
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.04]">
        <Logo collapsed={collapsed} size="sm" />
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors text-slate-400 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${isActive
                ? "text-white"
                : "text-slate-400 hover:text-white"
                }`}
            >
              {/* Active indicator background */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl gradient-brand-subtle border border-brand-500/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}

              {/* Hover background */}
              {hoveredItem === item.href && !isActive && (
                <motion.div
                  layoutId="sidebar-hover"
                  className="absolute inset-0 rounded-xl bg-white/[0.04]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                />
              )}

              <span className="relative z-10 flex-shrink-0">
                <Icon
                  size={20}
                  className={
                    isActive
                      ? "text-brand-400"
                      : "text-slate-500 group-hover:text-slate-300"
                  }
                />
              </span>

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    className="relative z-10 truncate"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* New badge */}
              {item.isNew && !collapsed && (
                <motion.span
                  className="relative z-10 ml-auto flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <Sparkles size={10} />
                  New
                </motion.span>
              )}

              {/* Active left bar */}
              {isActive && (
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-brand-400"
                  layoutId="sidebar-bar"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Credits Card */}
      <div className="px-3 py-2">
        <div
          className={`rounded-xl overflow-hidden ${collapsed ? "p-2" : "p-4"
            }`}
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.1) 100%)",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          {collapsed ? (
            <div className="flex justify-center">
              <Zap size={20} className="text-brand-400" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Zap size={16} className="text-brand-400" />
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Credits
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-white">
                  {USER_DATA.credits.remaining.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400">remaining</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-800 overflow-hidden mb-3">
                <motion.div
                  className="h-full rounded-full gradient-brand"
                  initial={{ width: 0 }}
                  animate={{ width: `${(USER_DATA.credits.remaining / USER_DATA.credits.total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </div>
              <Link
                href="/dashboard/billing"
                className="block text-center text-xs font-medium text-brand-300 hover:text-brand-200 transition-colors"
              >
                Top up Credits →
              </Link>
            </>
          )}
        </div>
      </div>

      {/* User Avatar Section */}
      <div className="p-4 border-t border-white/[0.04]">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 border border-white/[0.1] flex items-center justify-center text-white relative overflow-hidden flex-shrink-0 shadow-lg shadow-brand-500/20">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <span className="font-bold text-sm">{initial}</span>
            )}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 border-2 border-surface-900 rounded-full" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{displayName}</p>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">{displayEmail}</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:bg-error-500/10 hover:text-error-400 transition-all duration-200 group"
              title="Log out"
            >
              <LogOut size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
