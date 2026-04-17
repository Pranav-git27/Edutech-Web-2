# Feature Activator Skill
**Description:** Injects real-time data fetching logic into static components.

## Instructions
1. **Dependency Check:** Ensure `@supabase/supabase-js` is installed. If not, suggest the terminal command.
2. **Logic Injection:** - Import the `supabase` client.
   - Replace static data variables (e.g., `const courses = [...]`) with a `useState` and `useEffect` hook.
   - Fetch data from the corresponding Supabase table on component mount.
3. **Form Handling:** Locate `<form>` elements. Replace default behavior with `supabase.from().insert()` calls.

## Constraints
- Preserve all existing Framer Motion animations.
- Only modify the logic within script blocks; do not touch the JSX structure unless adding a `{loading ? ... : ...}` conditional.