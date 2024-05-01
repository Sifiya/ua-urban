'use server';
import { MinimalVote } from '@/types/types';
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

export const getVotes = async (definitionId: string): Promise<{
  userVote: 'up' | 'down' | null;
  upvotes: number;
  downvotes: number;
}> => {
  const [userVotesData, { upvotes, downvotes }] = await Promise.all([
    getMyVote(definitionId),
    getVotesByDefinitionId(definitionId),
  ]);

  const userVote = userVotesData.vote?.vote || null;

  return {
    userVote,
    upvotes,
    downvotes,
  };
};

export const getMyVote = async (definitionId: string): Promise<{
  vote: Pick<MinimalVote, 'id' | 'vote'> | null,
  error?: string,
}> => {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  let userId = userData?.user?.id;

  if (!userId) {
    return { error: 'Не вдалося отримуватиі ідентифікатор користувача', vote: null };
  }

  const { data: vote } = await supabase.from('votes')
    .select('id, vote')
    .eq('definition_id', definitionId)
    .eq('user_id', userId).maybeSingle();

  return { vote };
};

export const setVote = async (definitionId: string, vote: 'up' | 'down') => {
  const supabase = createClient();

  const { data } = await supabase.from('definitions').select('id').eq('id', definitionId);

  if (!data?.length) {
    throw new Error('Definition not found');
  }

  // check if user already voted
  const { vote: myVote } = await getMyVote(definitionId);

  if (myVote) {
    const oldVote = myVote.vote;
    
    if (oldVote === vote) {
      await supabase.rpc(
        vote === 'up' ? 'remove_upvote' : 'remove_downvote',
        { insert_definition_id: definitionId }
      );
    } else {
      await supabase.rpc(
        vote === 'up' ? 'replace_down_with_up' : 'replace_up_with_down',
        { insert_definition_id: definitionId }
      );
    }
  } else {
    await supabase.rpc(
      vote === 'up' ? 'add_upvote' : 'add_downvote',
      { insert_definition_id: definitionId }
    );
  }
};
