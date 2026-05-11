"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  Plus,
  ChevronDown,
  LogOut,
  User,
  HelpCircle,
  Moon,
  Sparkles,
  Menu,
} from "lucide-react";
import { USER_DATA } from "@/lib/constants";

interface TopBarProps {
  onMobileMenuToggle: () => void;
}

export default function TopBar({ onMobileMenuToggle }: TopBarProps) {
  const router = useRouter();
  const supabase = createClient();
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
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
  const avatarUrl = user?.user_metadata?.avatar_url;

  const notifications = [
    {
      id: 1,
      title: "Video render complete",
      desc: '"Product Launch Intro" is ready to download',
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "SEO Alert",
      desc: "Your keyword 'AI marketing' moved to position #3",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Credits topped up",
      desc: "500 credits added to your account",
      time: "3 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 bg-surface-950/60 backdrop-blur-xl border-b border-white/[0.04]">
      {/* Left: Mobile menu + Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-800/60 border border-white/[0.06] hover:border-brand-500/20 transition-colors w-80 group">
              <Search
                size={16}
                className="text-slate-500 group-hover:text-slate-400 transition-colors"
              />
              <input
                type="text"
                placeholder="Search videos, keywords, projects..."
                className="bg-transparent text-sm text-slate-200 placeholder:text-slate-500 outline-none w-full"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium text-slate-500 bg-surface-700/60 border border-white/[0.06]">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Quick Create */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium gradient-brand text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-shadow"
        >
          <Plus size={16} />
          <span>Create</span>
        </motion.button>

        {/* Mobile search */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="md:hidden p-2 rounded-lg hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative p-2 rounded-lg hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-500 pulse-live" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-80 z-50 glass-card rounded-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">
                        Notifications
                      </h3>
                      <span className="text-xs text-brand-400 font-medium cursor-pointer hover:text-brand-300">
                        Mark all read
                      </span>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer ${
                          n.unread ? "" : "opacity-60"
                        }`}
                      >
                        <div className="flex gap-3">
                          {n.unread && (
                            <div className="w-2 h-2 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
                          )}
                          <div className={n.unread ? "" : "ml-5"}>
                            <p className="text-sm font-medium text-white">
                              {n.title}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {n.desc}
                            </p>
                            <p className="text-[10px] text-slate-500 mt-1">
                              {n.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center">
                    <button className="text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/[0.06] mx-1" />

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-white/[0.04] transition-colors"
          >
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-brand-500/20 overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span>{initial}</span>
              )}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-white leading-none">
                {displayName}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                <Sparkles size={8} className="text-brand-400" />
                Professional
              </p>
            </div>
            <ChevronDown
              size={14}
              className={`hidden sm:block text-slate-500 transition-transform ${
                showProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {showProfile && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfile(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 z-50 glass-card rounded-2xl overflow-hidden"
                >
                  <div className="p-2">
                    {[
                      { label: "Profile", icon: User, href: "#" },
                      { label: "Help & Support", icon: HelpCircle, href: "#" },
                      { label: "Dark Mode", icon: Moon, href: "#" },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                      >
                        <item.icon size={16} className="text-slate-500" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                    <div className="border-t border-white/[0.06] p-2">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-error-400 hover:bg-error-400/10 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
