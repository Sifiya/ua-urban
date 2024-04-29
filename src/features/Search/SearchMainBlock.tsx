'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchWord } from '@/app/api/search.api';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';

import { Popover, PopoverContent, PopoverAnchor } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
interface SearchMainBlockProps {}

export const SearchMainBlock = ({}: SearchMainBlockProps) => {
  const [searchString, setSearchString] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { data: words, refetch } = useQuery({
    enabled: false,
    queryKey: ['searchWord', JSON.stringify(searchString)],
    queryFn: async () => searchWord(searchString),
  });

  useEffect(() => {
    if (searchString.length > 0) {
      refetch();
    } 
  }, [searchString, refetch]);

  useEffect(() => {
    if (words?.length) {
      setIsPopoverOpen(true);
    } else {
     // setIsPopoverOpen(false);
    }
  }, [words]);

  return (
    <Card className="w-10/12 max-w-[700px] mt-8 mb-3 bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle>
          Пошук
        </CardTitle>
      </CardHeader>
      <CardContent>
          <form className="flex items-center gap-2 mb-3">
            <FaSearch className="text-muted/60" size={30} />
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverAnchor asChild>
                <Input
                  
                  placeholder="Шукати слово..."
                  className="text-foreground"
                  onChange={(e) => setSearchString(e.target.value)}
                />
              </PopoverAnchor>
              <PopoverContent 
                className="search-popover-content px-0 py-1"
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <Table>
                  <TableBody>
                    {words?.map((word) => (
                      <TableRow key={word.id}>
                        <TableCell className="p-0">
                          <Link href={`/word/${word.id}`} className="w-full block py-2 px-4">
                            {word.word}
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </PopoverContent>
            </Popover>
            <Button variant="secondary" className="text-foreground">Пошук</Button>
          </form>
      </CardContent>
    </Card>
  );
};
