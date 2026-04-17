# Supabase Architect Skill
**Description:** Converts static frontend data structures into backend Supabase schemas.

## Instructions
1. **Analyze Components:** Scan `src/components/` for arrays of objects (e.g., Courses, Mentors).
2. **Schema Generation:** Write a PostgreSQL script for the Supabase SQL Editor. 
   - Define tables with appropriate types (UUID, TEXT, INT).
   - Include `created_at` timestamps.
3. **Environment Setup:** - Check for `.env` file. If missing, create it with placeholders for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
   - Create `src/lib/supabaseClient.js` using the `@supabase/supabase-js` library.

## Constraints
- Do NOT modify the UI layout or Tailwind classes.
- Use 'public' schema for all tables.