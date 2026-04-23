-- Shared updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Vibe enum (matches src/data/nfts.ts)
CREATE TYPE public.vibe AS ENUM ('grounded','soft','electric','misty','sunlit');
CREATE TYPE public.post_type AS ENUM ('story','wip');

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  handle TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  wallet_address TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, handle)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'handle', '@' || split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- NFT metadata
CREATE TABLE public.nft_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  edition TEXT NOT NULL DEFAULT '1/1',
  price TEXT,
  image_url TEXT NOT NULL,
  storage_path TEXT,
  vibe public.vibe NOT NULL DEFAULT 'soft',
  mood INT NOT NULL DEFAULT 50 CHECK (mood BETWEEN 0 AND 100),
  species TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.nft_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "NFTs viewable by everyone" ON public.nft_metadata FOR SELECT USING (true);
CREATE POLICY "Auth users plant NFTs" ON public.nft_metadata FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners update NFTs" ON public.nft_metadata FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners delete NFTs" ON public.nft_metadata FOR DELETE USING (auth.uid() = owner_id);

CREATE INDEX idx_nft_owner ON public.nft_metadata(owner_id);
CREATE INDEX idx_nft_vibe ON public.nft_metadata(vibe);
CREATE INDEX idx_nft_mood ON public.nft_metadata(mood);

CREATE TRIGGER update_nft_updated_at BEFORE UPDATE ON public.nft_metadata
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Greenhouse posts
CREATE TABLE public.greenhouse_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  caption TEXT NOT NULL,
  image_url TEXT,
  storage_path TEXT,
  post_type public.post_type NOT NULL DEFAULT 'story',
  before_image_url TEXT,
  after_image_url TEXT,
  nft_id UUID REFERENCES public.nft_metadata(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.greenhouse_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts viewable by everyone" ON public.greenhouse_posts FOR SELECT USING (true);
CREATE POLICY "Auth users create posts" ON public.greenhouse_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors update posts" ON public.greenhouse_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors delete posts" ON public.greenhouse_posts FOR DELETE USING (auth.uid() = author_id);

CREATE INDEX idx_posts_author ON public.greenhouse_posts(author_id);
CREATE INDEX idx_posts_created ON public.greenhouse_posts(created_at DESC);

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.greenhouse_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Waters (one per user per post)
CREATE TABLE public.waters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.greenhouse_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);
ALTER TABLE public.waters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Waters viewable by everyone" ON public.waters FOR SELECT USING (true);
CREATE POLICY "Auth users water" ON public.waters FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users unwater own" ON public.waters FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_waters_post ON public.waters(post_id);

-- Storage bucket for NFT images (public read)
INSERT INTO storage.buckets (id, name, public) VALUES ('nft-images', 'nft-images', true);

CREATE POLICY "NFT images public read" ON storage.objects FOR SELECT USING (bucket_id = 'nft-images');
CREATE POLICY "Users upload own NFT images" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'nft-images' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users update own NFT images" ON storage.objects FOR UPDATE
  USING (bucket_id = 'nft-images' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users delete own NFT images" ON storage.objects FOR DELETE
  USING (bucket_id = 'nft-images' AND auth.uid()::text = (storage.foldername(name))[1]);