import type { Database } from './supabase';

export type Word = Database["public"]["Tables"]["words"]["Row"];
export type Definition = Database["public"]["Tables"]["definitions"]["Row"];

export type MinimalWord = Pick<Word, "id" | "word">;
export type MinimalDefinition = Pick<Definition, "id" | "text" |"downvotes_count" | "upvotes_count">;

export type Vote = Database["public"]["Tables"]["votes"]["Row"];
export type MinimalVote = Pick<Vote, "id" | "definition_id" | "user_id" | "vote">;
