-- 1. Create the function that copies Auth API details into our public Profiles table
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, created_at)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'username', -- Extracts Custom Data we pass from Backend
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- 2. Bind the Trigger to the Supabase internal Users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();