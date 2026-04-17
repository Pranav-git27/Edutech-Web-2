-- CREATE SITE ACTIVITY TABLE FOR REAL-TIME INNOVATION
CREATE TABLE IF NOT EXISTS public.site_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL, -- e.g., 'PROBLEM_SUBMIT', 'USER_SIGNUP', 'CONTEST_REGISTER'
    user_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.site_activity ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to view activity (for the real-time social proof)
CREATE POLICY "Public can view site activity" 
ON public.site_activity FOR SELECT 
TO anon, authenticated
USING (true);

-- Allow authenticated users/service role to insert activity
CREATE POLICY "Enable insert for all users" 
ON public.site_activity FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- ENABLE REALTIME FOR THIS TABLE
-- Note: This command enables the 'supabase_realtime' publication for the table
ALTER PUBLICATION supabase_realtime ADD TABLE site_activity;
