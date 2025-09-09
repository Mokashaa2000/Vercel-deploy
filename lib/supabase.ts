import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key for admin operations
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Types for our database
export interface Assessment {
  id: number
  email: string
  first_name: string
  business_name?: string
  website?: string
  score: number
  answers: Record<string, string>
  submitted_at: string
  created_at: string
  updated_at: string
}

export interface AssessmentInsert {
  email: string
  first_name: string
  business_name?: string
  website?: string
  score: number
  answers: Record<string, string>
}
