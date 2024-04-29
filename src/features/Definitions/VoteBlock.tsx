import React from 'react';
import { 
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp
} from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';

interface VoteBlockProps {
  wordId: string;
  definitionId: string;
}

export const VoteBlock = ({
  wordId,
  definitionId,
}: VoteBlockProps) => {
  // const {} = useMutation({
  //   mutationKey: ['words', wordId, 'definitions', definitionId, 'vote'],
  //   mutationFn: (vote: 'up' | 'down') => voteDefinition(definitionId, vote),
  // });

  return (
    <div>
      <div className="flex justify-end">
        <Button className="p-2 bg-transparent hover:bg-transparent hover:opacity-70 text-card-foreground">
          <FaRegThumbsUp size={20} />
        </Button>

        <Button className="p-2 bg-transparent hover:bg-transparent hover:opacity-70 text-card-foreground">
          <FaRegThumbsDown size={20} />
        </Button>
      </div>
    </div>
  );
};
