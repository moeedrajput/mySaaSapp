// ============================================================
// ViraLoom Type Definitions
// ============================================================

// Enums matching database
export type SubscriptionTier = 'free' | 'starter' | 'professional' | 'enterprise';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'paused';
export type CreditTransactionType = 'purchase' | 'usage' | 'bonus' | 'refund' | 'subscription_grant';
export type VideoStatus = 'draft' | 'queued' | 'processing' | 'completed' | 'failed';
export type VideoAvatarType = 'stock' | 'custom' | 'cloned';
export type SeoContentType = 'blog_title' | 'meta_description' | 'social_caption' | 'hashtags' | 'keyword_analysis' | 'content_brief';

// Database Models
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  company_name: string | null;
  role: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  description: string | null;
  monthly_price_cents: number;
  annual_price_cents: number;
  credits_per_month: number;
  features: string[];
  stripe_monthly_price_id: string | null;
  stripe_annual_price_id: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at: string | null;
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  plan?: PricingPlan;
}

export interface CreditBalance {
  id: string;
  user_id: string;
  balance: number;
  lifetime_earned: number;
  lifetime_spent: number;
  updated_at: string;
}

export interface CreditTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: CreditTransactionType;
  description: string | null;
  reference_id: string | null;
  reference_type: string | null;
  balance_after: number;
  created_at: string;
}

export interface VideoProject {
  id: string;
  user_id: string;
  title: string;
  script_text: string | null;
  avatar_type: VideoAvatarType;
  avatar_id: string | null;
  avatar_name: string | null;
  voice_id: string | null;
  voice_name: string | null;
  language: string;
  background_url: string | null;
  background_color: string;
  aspect_ratio: string;
  duration_seconds: number | null;
  status: VideoStatus;
  render_provider: string | null;
  render_job_id: string | null;
  output_url: string | null;
  thumbnail_url: string | null;
  credits_used: number;
  error_message: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface SeoProject {
  id: string;
  user_id: string;
  name: string;
  website_url: string | null;
  target_audience: string | null;
  industry: string | null;
  created_at: string;
  updated_at: string;
}

export interface KeywordResearch {
  id: string;
  user_id: string;
  seo_project_id: string | null;
  seed_keyword: string;
  results: KeywordResult[];
  ai_suggestions: string[];
  credits_used: number;
  created_at: string;
}

export interface KeywordResult {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  trend: string;
}

export interface ContentGeneration {
  id: string;
  user_id: string;
  seo_project_id: string | null;
  content_type: SeoContentType;
  input_prompt: string;
  output_content: string;
  platform: string | null;
  tone: string;
  language: string;
  credits_used: number;
  is_favorite: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface UsageLog {
  id: string;
  user_id: string;
  action: string;
  module: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

// UI Types
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  isNew?: boolean;
}

export interface DashboardStats {
  totalVideos: number;
  creditsRemaining: number;
  seoScore: number;
  contentGenerated: number;
  videosThisMonth: number;
  creditsUsedThisMonth: number;
}
