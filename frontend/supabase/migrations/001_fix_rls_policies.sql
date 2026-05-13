-- Drop all broken auth.uid() policies (app uses custom JWT, not Supabase Auth)
DROP POLICY IF EXISTS "Users can view own projects" ON side_projects;
DROP POLICY IF EXISTS "Users can manage own projects" ON side_projects;
DROP POLICY IF EXISTS "Public projects viewable by all" ON side_projects;
DROP POLICY IF EXISTS "Public profiles viewable" ON user_profiles;

-- Ensure RLS is enabled
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE side_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_tags ENABLE ROW LEVEL SECURITY;

-- user_profiles: no anon access — all reads/writes go through service_role in API routes
-- (service_role bypasses RLS entirely, no policy needed for it)

-- side_projects: anon SELECT only for public projects on public profiles
-- (used by /api/stats which has no auth — public portfolio pages)
CREATE POLICY "public_read_public_projects"
  ON side_projects FOR SELECT
  TO anon
  USING (
    is_public = true
    AND user_id IN (
      SELECT id FROM user_profiles WHERE is_profile_public = true
    )
  );

-- user_profiles: anon SELECT only for public profiles
-- (used by /api/stats — public portfolio pages)
CREATE POLICY "public_read_public_profiles"
  ON user_profiles FOR SELECT
  TO anon
  USING (is_profile_public = true);

-- tech_tags: public read (autocomplete, no sensitive data)
CREATE POLICY "public_read_tech_tags"
  ON tech_tags FOR SELECT
  TO anon
  USING (true);

-- All writes (INSERT/UPDATE/DELETE) on user_profiles and side_projects
-- go through service_role client in API routes — service_role bypasses RLS,
-- no policies needed.
