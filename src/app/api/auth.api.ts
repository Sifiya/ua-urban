'use server';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

const withErrorHandling = <T, K>(data?: K, error?: T): {
  error: T | null,
  success: boolean,
  data?: K,
} => {
  if (error || !data) {
    return { error: error || null, success: false };
  }

  return { error: null, success: true, data};
};

export const signUp = async (email: string, password: string) => {
  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return withErrorHandling(user, error?.message);
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return withErrorHandling(data.session?.access_token, error?.message);
};

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return withErrorHandling(true, error);
}
