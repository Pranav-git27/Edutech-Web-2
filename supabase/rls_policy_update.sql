-- Since we established excellent Data Security, users normally cannot hack their scores.
--  When a user Submits correct code, our backend acting on their behalf needs permission to update their Profile Score.

-- Add this missing policy to allow users (and our secured backend API token) to Update their own Profile points!
CREATE POLICY "Users can update their own profile stats" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);
