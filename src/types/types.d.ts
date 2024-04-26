import type { Database } from './supabase';

export type Word = Database["public"]["Tables"]["words"]["Row"];
export type Definition = Database["public"]["Tables"]["definitions"]["Row"];