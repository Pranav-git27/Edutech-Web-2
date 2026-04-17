-- CREATE DISCUSSIONS TABLE
CREATE TABLE IF NOT EXISTS public.discussions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id INTEGER REFERENCES public.problems(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT,
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view discussions" ON public.discussions
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can post discussions" ON public.discussions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enable Realtime for discussions!
ALTER PUBLICATION supabase_realtime ADD TABLE discussions;
