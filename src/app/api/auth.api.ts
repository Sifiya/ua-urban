'use server';
import { createClient } from '@/utils/supabase/server';

const withErrorHandling = <T, K>(data?: K, error?: T): {
  error: T | null,
  success: boolean,
  data?: K,
} => {
  if (error || !data) {
    return { error: error || null, success: false };
  }

  return { error: null, success: true, data };
};

export const signUp = async (email: string, password: string) => {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return withErrorHandling(user, error?.message);
};

export const signInWithEmail = async (email: string, password: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return withErrorHandling(data.session?.access_token, error?.message);
};

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  return withErrorHandling(true, error);
}

export const getUser = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return { isAuthenticated: false };
  }
  return { isAuthenticated: true, email: data.user.email };
};
