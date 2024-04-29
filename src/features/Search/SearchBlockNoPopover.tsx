'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';

interface SearchBlockNoPopoverProps {
  initialSearch?: string;
}

export const SearchBlockNoPopover = ({ initialSearch }: SearchBlockNoPopoverProps) => {
  const [searchString, setSearchString] = useState(() => initialSearch || '');

  return (
    <Card className="w-full max-w-[700px] mt-8 mb-3 bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle>
          Пошук
        </CardTitle>
      </CardHeader>
      <CardContent>
          <div className="flex items-center gap-2 mb-3">
            <FaSearch className="text-muted/60" size={30} />
              <Input
                value={searchString}
                placeholder="Шукати слово..."
                className="text-foreground"
                onChange={(e) => setSearchString(e.target.value)}
              />
            <Link href={`/search?word=${searchString}`}>
              <Button 
                variant="secondary"
                className="text-foreground">
                Пошук
              </Button>
            </Link>
          </div>
      </CardContent>
    </Card>
  );
};
