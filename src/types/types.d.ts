import type { Database } from './supabase';

export type Word = Database["public"]["Tables"]["words"]["Row"];
export type Definition = Database["public"]["Tables"]["definitions"]["Row"];

export type MinimalWord = Pick<Word, "id" | "word">;
export type MinimalDefinition = Pick<Definition, "id" | "text">;