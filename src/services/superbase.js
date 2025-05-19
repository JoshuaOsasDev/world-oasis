import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kpesqywafsbegufuwnbp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZXNxeXdhZnNiZWd1ZnV3bmJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NTgwNjQsImV4cCI6MjA2MjEzNDA2NH0.bSd01GZ_5hrIdAMWXN6gfjWvarbGgZK3YUVOqBmowvU";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
