'use client';

import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useProfile } from '@/hooks/useProfile';
import { setVote, getMyVote } from '@/app/api/vote.api';

import { 
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp
} from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import ClipLoader from 'react-spinners/ClipLoader';

interface VoteBlockProps {
  wordId: string;
  definitionId: string;
  upvotes: number;
  downvotes: number;
}

export const VoteBlock = ({
  wordId,
  definitionId,
  upvotes,
  downvotes,
}: VoteBlockProps) => {
  const { isAuthenticated } = useProfile();

  const SHARED_VOTE_KEY = ['words', wordId, 'definitions', definitionId, 'votes']
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: SHARED_VOTE_KEY,
    mutationFn: (vote: 'up' | 'down') => setVote(definitionId, vote),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ['words', wordId, 'definitions']
    }),
  });

  const { data } =  useQuery({
    queryKey: SHARED_VOTE_KEY,
    queryFn: () => getMyVote(definitionId),
  });

  const userVote = data?.vote?.vote || null;

  return (
    <div>
      <div className="flex justify-end items-center relative -mb-2">
        {isPending && <ClipLoader size={15} className="mr-1" />}
        <p>{upvotes}</p>
        <Button 
          disabled={!isAuthenticated}
          className="p-1 bg-transparent hover:bg-transparent hover:opacity-70 text-card-foreground relative -top-[3px] disabled:opacity-100"
          onClick={() => isAuthenticated && mutate('up')}
        >
          {userVote === 'up' ? <FaThumbsUp size={20} /> : <FaRegThumbsUp size={20} />}
        </Button>

        <p className="ml-2">{downvotes}</p>
        <Button
          disabled={!isAuthenticated}
          className="p-1 bg-transparent hover:bg-transparent hover:opacity-70 text-card-foreground disabled:opacity-100"
          onClick={() => isAuthenticated && mutate('down')}
        >
          {userVote === 'down' ? <FaThumbsDown size={20} /> : <FaRegThumbsDown size={20} />}
        </Button>  
      </div>
    </div>
  );
};
