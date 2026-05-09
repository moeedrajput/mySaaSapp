"use client";

import { useState } from "react";
// Final verification: Billing page updated with hardcoded premium data per request
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, Check, Sparkles, Zap, ShieldCheck, Crown, Info,
  Plus, History, Download, MoreHorizontal, AlertTriangle, X
} from "lucide-react";
import { USER_DATA } from "@/lib/constants";

const plans = [
  {
    name: "Basic",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: ["3 AI Videos per month", "5 SEO Reports per month", "Standard resolution", "Community support"],
    cta: "Current Plan",
    disabled: true,
    highlight: false,
    icon: ShieldCheck,
    color: "text-slate-400",
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "Perfect for growing creators",
    features: ["30 AI Videos per month", "Unlimited SEO Analysis", "Automated Social Posting", "HD Video Exports", "Priority Email support"],
    cta: "Upgrade to Pro",
    disabled: false,
    highlight: true,
    icon: Sparkles,
    color: "text-brand-400",
  },
  {
    name: "Unlimited",
    price: "$25",
    period: "/month",
    description: "The expert level experience",
    features: ["Unlimited AI Videos", "Unlimited SEO Suite", "4K Video Exports", "Custom AI Avatars", "Dedicated Account Manager", "White-label reports"],
    cta: "Go Unlimited",
    disabled: false,
    highlight: false,
    icon: Crown,
    color: "text-warning-400",
  },
];

const creditPacks = [
  { amount: 50, price: "$5", description: "Quick boost" },
  { amount: 150, price: "$12", description: "Most popular", recommended: true },
  { amount: 500, price: "$35", description: "Best value" },
];

export default function BillingPage() {
  const [showTopUp, setShowTopUp] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard size={24} className="text-brand-400" />
            Billing & Subscription
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your plan, credits, and payment history.
          </p>
        </div>

        {/* Current Plan Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-800/80 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
          <span className="text-xs font-medium text-slate-300">Current Plan:</span>
          <span className="text-sm font-bold text-white uppercase tracking-wider">Professional</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credits Status & Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap size={120} className="text-brand-400" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                  <Zap size={16} className="text-brand-400" />
                  Credits remaining
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white tracking-tight">1,247</span>
                  <span className="text-slate-500 text-sm">/ 2,000 credits</span>
                </div>
                <div className="w-64 h-2 rounded-full bg-surface-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "62.35%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-brand-500 to-accent-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowTopUp(true)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold gradient-brand text-white shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  Top up credits
                </motion.button>
                <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
                  <div className="flex items-center gap-1"><Info size={10} /> Credits reset in 12 days</div>
                </p>
              </div>
            </div>
          </div>

          {/* Credits Usage Chart (CSS Bars) */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <History size={16} className="text-brand-400" />
              Credits Usage (Last 7 Days)
            </h3>
            <div className="flex items-end justify-between h-40 gap-2">
              {USER_DATA.credits.history.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-3">
                  <div className="relative w-full group">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.used / 200) * 100}%` }}
                      className="w-full rounded-t-lg bg-brand-500/20 border-t-2 border-brand-500 group-hover:bg-brand-500/40 transition-colors"
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-surface-800 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {day.used} credits
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border-brand-500/20 bg-brand-500/5">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Payment Method</h3>
            <div className="p-4 rounded-xl bg-surface-900 border border-white/5 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 rounded bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                  Visa
                </div>
                <div>
                  <p className="text-sm font-bold text-white">•••• 4242</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Expires 04/27</p>
                </div>
              </div>
              <button className="text-xs font-bold text-brand-400 hover:text-brand-300">Edit</button>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 rounded-xl text-xs font-bold border border-white/10 text-slate-300 hover:bg-white/5 transition-all"
            >
              Update Payment Details
            </motion.button>
          </div>

          <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-warning-500/10 flex items-center justify-center text-warning-400 mb-4">
              <AlertTriangle size={24} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Low on Credits?</h4>
            <p className="text-xs text-slate-500 mb-4">Enable auto-recharge to never stop creating.</p>
            <button className="text-xs font-bold text-brand-400 hover:underline">Enable Auto-Top-up</button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {plans.map((plan, i) => {
          const isCurrent = plan.name === "Pro"; // Current plan is Pro (Professional)
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${plan.highlight
                  ? "bg-surface-900 border-2 border-brand-500 shadow-[0_0_40px_-10px_rgba(124,58,237,0.3)] scale-105 z-10"
                  : "glass-card border-white/5 hover:border-white/10"
                }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] gradient-brand text-white shadow-lg shadow-brand-500/40">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 ${plan.color}`}>
                  <plan.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-sm text-slate-500">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check size={16} className="text-success-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="space-y-4">
                <motion.button
                  whileHover={!isCurrent ? { scale: 1.02 } : {}}
                  whileTap={!isCurrent ? { scale: 0.98 } : {}}
                  disabled={isCurrent}
                  className={`w-full py-4 rounded-2xl text-sm font-bold transition-all ${plan.highlight && !isCurrent
                      ? "gradient-brand text-white shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40"
                      : isCurrent
                        ? "bg-surface-800 text-success-400 cursor-not-allowed border border-success-500/20"
                        : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    }`}
                >
                  {isCurrent ? "Current Plan" : plan.cta}
                </motion.button>

                {isCurrent && plan.name !== "Basic" && (
                  <button
                    onClick={() => setShowCancel(true)}
                    className="w-full text-center text-xs font-medium text-slate-500 hover:text-error-400 transition-colors"
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Payment History Section */}
      <div className="glass-card rounded-2xl p-6 mt-8 overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <History size={20} className="text-brand-400" />
          Payment History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
                <th className="pb-4 px-4">Date</th>
                <th className="pb-4 px-4">Description</th>
                <th className="pb-4 px-4">Amount</th>
                <th className="pb-4 px-4 text-center">Status</th>
                <th className="pb-4 px-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {USER_DATA.invoices.map((inv) => (
                <tr key={inv.id} className="text-sm text-slate-300 hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 px-4">{inv.date}</td>
                  <td className="py-4 px-4 font-medium text-white">{inv.description}</td>
                  <td className="py-4 px-4">{inv.amount}</td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <span className="px-2 py-0.5 rounded-full bg-success-500/10 text-success-400 text-[10px] font-bold border border-success-500/20">
                        {inv.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-2 rounded-lg bg-surface-900 text-slate-400 hover:text-white transition-colors">
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top-up Credits Modal */}
      <AnimatePresence>
        {showTopUp && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTopUp(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-surface-950 border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setShowTopUp(false)}
                className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/20">
                  <Zap size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Top up Credits</h3>
                <p className="text-sm text-slate-400">Choose a pack to keep your AI content engine running.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {creditPacks.map((pack) => (
                  <button
                    key={pack.amount}
                    className={`relative p-5 rounded-2xl border transition-all text-left group ${pack.recommended
                        ? "bg-brand-500/10 border-brand-500 shadow-lg shadow-brand-500/10"
                        : "bg-surface-900 border-white/5 hover:border-white/10"
                      }`}
                  >
                    {pack.recommended && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-brand-500 text-white text-[8px] font-black uppercase">Popular</span>
                    )}
                    <p className="text-2xl font-black text-white">{pack.amount}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Credits</p>
                    <p className="text-lg font-bold text-brand-400 mt-4">{pack.price}</p>
                    <p className="text-[10px] text-slate-600 mt-1">{pack.description}</p>
                  </button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowTopUp(false)}
                className="w-full py-4 rounded-2xl text-sm font-bold gradient-brand text-white shadow-xl shadow-brand-500/25"
              >
                Buy Selected Pack
              </motion.button>
              <p className="text-center text-[10px] text-slate-600 mt-4">Secure checkout powered by Stripe</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancel && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancel(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-surface-950 border border-white/10 rounded-3xl p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-error-500/10 flex items-center justify-center mx-auto mb-6 text-error-400">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Cancel Subscription?</h3>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                You will lose access to Pro features and your credits will be reset toProfessional limits at the end of the current billing cycle.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowCancel(false)}
                  className="w-full py-3.5 rounded-xl text-sm font-bold bg-error-500 text-white hover:bg-error-600 transition-colors"
                >
                  Confirm Cancellation
                </button>
                <button
                  onClick={() => setShowCancel(false)}
                  className="w-full py-3.5 rounded-xl text-sm font-bold bg-white/5 text-slate-400 hover:bg-white/10 transition-colors"
                >
                  Keep my Plan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <div className="text-center pt-8">
        <p className="text-xs text-slate-500">
          All plans include 256-bit SSL encryption. Cancel anytime. Prices in USD.
        </p>
      </div>
    </div>
  );
}
