import { createClient } from '@/utils/supabase/server';

export const getVotesByDefinitionId = async (definitionId: string): Promise<{
  upvotes: number;
  downvotes: number;
}> => {
  const supabase = createClient();

  const { data: votes, error } = await supabase.from('definitions')
    .select('id,upvotes_count,downvotes_count')
    .eq('id', definitionId);

  if (error || !votes) {
    throw error || new Error('Не вдалося отримати голоси');
  }

  return {
    upvotes: votes[0].upvotes_count,
    downvotes: votes[0].downvotes_count,
  };
};

export const voteDefinitionUser = async (definitionId: string): Promise<'up' | 'down' | null> => {
  const supabase = createClient();

  const { data } = await supabase.from('votes')
    .select('id,vote')
    .eq('definition_id', definitionId)
    .filter('user_id', 'eq', 'auth.uid()');

  if (data?.length) {
    return data[0].vote;
  }
  return null;
};

export const getVotes = async (definitionId: string): Promise<{
  userVote: 'up' | 'down' | null;
  upvotes: number;
  downvotes: number;
}> => {
  const [userVote, {upvotes, downvotes}] = await Promise.all([
    voteDefinitionUser(definitionId),
    getVotesByDefinitionId(definitionId),
  ]);

  return {
    userVote,
    upvotes,
    downvotes,
  };
};
