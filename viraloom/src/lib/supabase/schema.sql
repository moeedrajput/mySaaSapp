-- ============================================================
-- ViraLoom Database Schema
-- Enterprise AI Marketing SaaS
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE subscription_tier AS ENUM ('free', 'starter', 'professional', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing', 'paused');
CREATE TYPE credit_transaction_type AS ENUM ('purchase', 'usage', 'bonus', 'refund', 'subscription_grant');
CREATE TYPE video_status AS ENUM ('draft', 'queued', 'processing', 'completed', 'failed');
CREATE TYPE video_avatar_type AS ENUM ('stock', 'custom', 'cloned');
CREATE TYPE seo_content_type AS ENUM ('blog_title', 'meta_description', 'social_caption', 'hashtags', 'keyword_analysis', 'content_brief');

-- ============================================================
-- 1. PROFILES (extends Supabase auth.users)
-- ============================================================

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  company_name TEXT,
  role TEXT DEFAULT 'member',
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 2. PRICING PLANS
-- ============================================================

CREATE TABLE public.pricing_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  tier subscription_tier NOT NULL UNIQUE,
  description TEXT,
  monthly_price_cents INTEGER NOT NULL DEFAULT 0,
  annual_price_cents INTEGER NOT NULL DEFAULT 0,
  credits_per_month INTEGER NOT NULL DEFAULT 0,
  features JSONB DEFAULT '[]'::jsonb,
  stripe_monthly_price_id TEXT,
  stripe_annual_price_id TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Seed default plans
INSERT INTO public.pricing_plans (name, tier, description, monthly_price_cents, annual_price_cents, credits_per_month, features, sort_order) VALUES
  ('Free', 'free', 'Get started with AI marketing', 0, 0, 50, '["5 AI videos/month", "Basic SEO tools", "3 keyword searches/day", "Community support"]'::jsonb, 0),
  ('Starter', 'starter', 'For growing creators', 2900, 27900, 500, '["50 AI videos/month", "Full SEO suite", "Unlimited keyword searches", "Social caption generator", "Email support"]'::jsonb, 1),
  ('Professional', 'professional', 'For serious marketers', 9900, 95900, 2000, '["200 AI videos/month", "Priority rendering", "Custom AI avatars", "Competitor analysis", "API access", "Priority support"]'::jsonb, 2),
  ('Enterprise', 'enterprise', 'For agencies & teams', 29900, 289900, 10000, '["Unlimited AI videos", "Custom avatar cloning", "White-label options", "Dedicated account manager", "SSO & team management", "SLA guarantee"]'::jsonb, 3);

-- ============================================================
-- 3. SUBSCRIPTIONS
-- ============================================================

CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.pricing_plans(id),
  status subscription_status NOT NULL DEFAULT 'active',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe ON public.subscriptions(stripe_subscription_id);

-- ============================================================
-- 4. CREDITS SYSTEM
-- ============================================================

CREATE TABLE public.credit_balances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  balance INTEGER NOT NULL DEFAULT 0,
  lifetime_earned INTEGER NOT NULL DEFAULT 0,
  lifetime_spent INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- positive = credit, negative = debit
  type credit_transaction_type NOT NULL,
  description TEXT,
  reference_id UUID, -- links to video_project, seo_generation, etc.
  reference_type TEXT, -- 'video_project', 'seo_generation', etc.
  balance_after INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_credit_transactions_user ON public.credit_transactions(user_id);
CREATE INDEX idx_credit_transactions_created ON public.credit_transactions(created_at DESC);

-- ============================================================
-- 5. AI VIDEO STUDIO (Module B)
-- ============================================================

CREATE TABLE public.video_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled Video',
  script_text TEXT,
  avatar_type video_avatar_type DEFAULT 'stock',
  avatar_id TEXT, -- ID from HeyGen/Kling avatar library
  avatar_name TEXT,
  voice_id TEXT,
  voice_name TEXT,
  language TEXT DEFAULT 'en-US',
  background_url TEXT,
  background_color TEXT DEFAULT '#0a0a0a',
  aspect_ratio TEXT DEFAULT '16:9',
  duration_seconds FLOAT,
  status video_status DEFAULT 'draft',
  render_provider TEXT, -- 'heygen', 'kling', etc.
  render_job_id TEXT, -- External API job ID
  output_url TEXT, -- Final video URL
  thumbnail_url TEXT,
  credits_used INTEGER DEFAULT 0,
  error_message TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_video_projects_user ON public.video_projects(user_id);
CREATE INDEX idx_video_projects_status ON public.video_projects(status);

-- ============================================================
-- 6. SEO SUITE (Module C)
-- ============================================================

CREATE TABLE public.seo_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Untitled Project',
  website_url TEXT,
  target_audience TEXT,
  industry TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_seo_projects_user ON public.seo_projects(user_id);

CREATE TABLE public.keyword_research (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  seo_project_id UUID REFERENCES public.seo_projects(id) ON DELETE SET NULL,
  seed_keyword TEXT NOT NULL,
  results JSONB DEFAULT '[]'::jsonb, -- Array of { keyword, volume, difficulty, cpc, trend }
  ai_suggestions JSONB DEFAULT '[]'::jsonb,
  credits_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_keyword_research_user ON public.keyword_research(user_id);

CREATE TABLE public.content_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  seo_project_id UUID REFERENCES public.seo_projects(id) ON DELETE SET NULL,
  content_type seo_content_type NOT NULL,
  input_prompt TEXT NOT NULL,
  output_content TEXT NOT NULL,
  platform TEXT, -- 'instagram', 'twitter', 'linkedin', 'youtube', 'tiktok', 'blog'
  tone TEXT DEFAULT 'professional',
  language TEXT DEFAULT 'en',
  credits_used INTEGER DEFAULT 0,
  is_favorite BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_content_generations_user ON public.content_generations(user_id);
CREATE INDEX idx_content_generations_type ON public.content_generations(content_type);

-- ============================================================
-- 7. USAGE ANALYTICS
-- ============================================================

CREATE TABLE public.usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'video_created', 'seo_search', 'caption_generated', etc.
  module TEXT NOT NULL, -- 'video_studio', 'seo_suite', 'billing'
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_usage_logs_user ON public.usage_logs(user_id);
CREATE INDEX idx_usage_logs_action ON public.usage_logs(action);
CREATE INDEX idx_usage_logs_created ON public.usage_logs(created_at DESC);

-- ============================================================
-- 8. ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keyword_research ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Pricing plans: everyone can read
CREATE POLICY "Anyone can view pricing plans" ON public.pricing_plans FOR SELECT USING (true);

-- Subscriptions: users can view their own
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Credit balances: users can view their own
CREATE POLICY "Users can view own balance" ON public.credit_balances FOR SELECT USING (auth.uid() = user_id);

-- Credit transactions: users can view their own
CREATE POLICY "Users can view own transactions" ON public.credit_transactions FOR SELECT USING (auth.uid() = user_id);

-- Video projects: full CRUD on own projects
CREATE POLICY "Users can manage own videos" ON public.video_projects FOR ALL USING (auth.uid() = user_id);

-- SEO projects: full CRUD on own projects
CREATE POLICY "Users can manage own SEO projects" ON public.seo_projects FOR ALL USING (auth.uid() = user_id);

-- Keyword research: full CRUD on own research
CREATE POLICY "Users can manage own keyword research" ON public.keyword_research FOR ALL USING (auth.uid() = user_id);

-- Content generations: full CRUD on own content
CREATE POLICY "Users can manage own content" ON public.content_generations FOR ALL USING (auth.uid() = user_id);

-- Usage logs: users can view their own
CREATE POLICY "Users can view own usage" ON public.usage_logs FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- 9. UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_video_projects_updated_at BEFORE UPDATE ON public.video_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_projects_updated_at BEFORE UPDATE ON public.seo_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
