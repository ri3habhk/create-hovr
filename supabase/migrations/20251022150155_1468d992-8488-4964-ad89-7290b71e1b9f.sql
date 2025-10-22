-- Ensure FK so PostgREST can embed profiles via user_id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'creator_portfolios_user_id_fkey'
  ) THEN
    ALTER TABLE public.creator_portfolios
    ADD CONSTRAINT creator_portfolios_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;
END$$;

-- Helpful index for joins/filters
CREATE INDEX IF NOT EXISTS idx_creator_portfolios_user_id ON public.creator_portfolios(user_id);