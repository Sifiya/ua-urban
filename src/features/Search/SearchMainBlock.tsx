'use client';
import React, { useEffect, useState } from 'react';
import { useSearch } from './useSearch';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';

import { Popover, PopoverContent, PopoverAnchor } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
export const SearchMainBlock = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const {
    searchString,
    setSearchString,
    words,
  } = useSearch();

  useEffect(() => {
    if (words?.length) {
      setIsPopoverOpen(true);
    } 
  }, [words]);

  return (
    <Card className="w-full max-w-[700px] mt-8 mb-3 bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle>
          Пошук
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex sm:flex-row flex-col items-center sm:gap-2 mb-3">
          <FaSearch className="text-muted/60 sm:visible invisible sm:w-fit sm:h-fit w-0 h-0" size={30} />
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverAnchor asChild>
              <Input
                value={searchString}
                placeholder="Шукати слово..."
                className="text-foreground sm:mb-0 mb-5"
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
          <Link href={`/search?word=${searchString}`} className="sm:w-fit w-full">
            <Button 
              variant="secondary"
              className="text-foreground sm:w-fit w-full">
              Пошук
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
