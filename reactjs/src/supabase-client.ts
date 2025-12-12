import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://hklgjvukxapvtxdvvbqx.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGdqdnVreGFwdnR4ZHZ2YnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNDIyNzcsImV4cCI6MjA3NjgxODI3N30.Bj8-2Z_oFlqws9EwGiNM_z4AiND0lqQxxnX0v_4EmWk"
);