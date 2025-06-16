import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tldleqjobqryohastvem.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZGxlcWpvYnFyeW9oYXN0dmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MzYzMTcsImV4cCI6MjA2NTExMjMxN30.3lqVcvVRJoFkRYxy_jHNcbxHiRh4GPaWQAxp8VbSse0
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Product {
  id: number
  name: string
  price: number
  image_url: string
  description: string
}