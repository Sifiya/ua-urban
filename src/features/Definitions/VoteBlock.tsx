'use client';

import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { setVote, getVotes } from '@/app/api/vote.api';

import { 
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp
} from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

interface VoteBlockProps {
  wordId: string;
  definitionId: string;
}

export const VoteBlock = ({
  wordId,
  definitionId,
}: VoteBlockProps) => {
  const SHARED_VOTE_KEY = ['words', wordId, 'definitions', definitionId, 'votes']
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: SHARED_VOTE_KEY,
    mutationFn: (vote: 'up' | 'down') => setVote(definitionId, vote),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ['words', wordId, 'definitions']
    }),
  });

  const { data } =  useQuery({
    queryKey: SHARED_VOTE_KEY,
    queryFn: () => getVotes(definitionId),
  });

  const userVote = data?.userVote;
  const upvotes = data?.upvotes;
  const downvotes = data?.downvotes;

  return (
    <div>
      <div className="flex justify-end items-center relative -mb-2">
        <p>{upvotes}</p>
        <Button 
          className="p-1 bg-transparent hover:bg-transparent hover:opacity-70 text-card-foreground relative -top-[3px]"
          onClick={() => mutate('up')}
        >
          {userVote === 'up' ? <FaThumbsUp size={20} /> : <FaRegThumbsUp size={20} />}
        </Button>

        <p className="ml-2">{downvotes}</p>
        <Button 
          className="p-1 bg-transparent hover:bg-transparent hover:opacity-70 text-card-foreground"
          onClick={() => mutate('down')}
        >
          {userVote === 'down' ? <FaThumbsDown size={20} /> : <FaRegThumbsDown size={20} />}
        </Button>  
      </div>
    </div>
  );
};
