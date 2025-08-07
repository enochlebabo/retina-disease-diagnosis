import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qaeorurdxfnfuowyrvpv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhZW9ydXJkeGZuZnVvd3lydnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODIyNDgsImV4cCI6MjA2ODY1ODI0OH0.A23wffLG_9YoEQk9T0HXINgOu_qrO4PY9KwdytbCbk8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)