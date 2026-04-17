-- Initialize Mock Contests Data into PostgreSQL
INSERT INTO public.contests (id, title, description, start_time, end_time, status) VALUES
(1, 'Weekly Contest 389', 'Join our most competitive weekly contest! Features 4 algorithmic problems ranging from Easy to Hard. Top 50 participants receive exclusive developer profile badges.', '2026-04-18T10:00:00Z', '2026-04-18T11:30:00Z', 'Upcoming'),
(2, 'Biweekly Contest 127', 'A special biweekly event focusing strictly on Dynamic Programming and Advanced Graph Theory. Amazon/Google API Mock questions included.', '2026-04-20T14:00:00Z', '2026-04-20T15:30:00Z', 'Upcoming'),
(3, 'CodeArena Spring Championship', 'The ultimate CodeArena Spring Championship! 6 problems, 3 grueling hours. Only the strongest syntax survives. Win real cash rewards!', '2026-04-25T09:00:00Z', '2026-04-25T12:00:00Z', 'Upcoming'),
(4, 'Weekly Contest 388', 'Weekly sprint focusing on basic data structures: Arrays and String manipulation. Great for absolute beginners.', '2026-04-10T10:00:00Z', '2026-04-10T11:30:00Z', 'Active'),
(5, 'Weekly Contest 387', 'Past contest covering basic recursion. View the past results to see the historic winners.', '2026-03-25T10:00:00Z', '2026-03-25T11:30:00Z', 'Past')
ON CONFLICT (id) DO UPDATE SET description = EXCLUDED.description;

-- Security: Prevent registration duplicate crashes from UI gracefully
ALTER TABLE public.contest_registrations DROP CONSTRAINT IF EXISTS unique_contest_reg;
ALTER TABLE public.contest_registrations ADD CONSTRAINT unique_contest_reg UNIQUE(user_id, contest_id);

-- Explicitly allow Signed-In Users to Register (SQL Policy)
-- (Commented out because you successfully created this policy in Supabase earlier!)
-- CREATE POLICY "Users can insert their own contest registrations" ON public.contest_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
