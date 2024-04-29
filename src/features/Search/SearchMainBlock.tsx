import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';
interface SearchMainBlockProps {}

export const SearchMainBlock = ({}: SearchMainBlockProps) => {
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
          <Input placeholder="Шукати слово..." className="text-foreground" />
          <Button variant="secondary" className="text-foreground">Пошук</Button>
        </form>
      </CardContent>
    </Card>
  );
};
