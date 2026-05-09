"use client";

import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Palette, Key } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings size={24} className="text-slate-400" />
          Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your account preferences and integrations
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {[
          { icon: User, title: "Profile", desc: "Update your personal information and avatar", href: "#" },
          { icon: Bell, title: "Notifications", desc: "Configure email and in-app notifications", href: "#" },
          { icon: Shield, title: "Security", desc: "Password, 2FA, and session management", href: "#" },
          { icon: Key, title: "API Keys", desc: "Manage API keys for external integrations", href: "#" },
          { icon: Palette, title: "Appearance", desc: "Theme, language, and display preferences", href: "#" },
        ].map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:translate-x-1 transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-slate-400">
              <section.icon size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">{section.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{section.desc}</p>
            </div>
            <span className="text-slate-600 text-sm">→</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
