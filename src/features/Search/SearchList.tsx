'use server';

import React from 'react';
import { searchWord } from '@/app/api/search.api';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { Header2 } from '@/components/typography';
import { FaChevronRight } from 'react-icons/fa';

interface SearchListProps {
  searchString: string;
}

export const SearchList = async ({
  searchString
}: SearchListProps) => {
  const words = await searchWord(searchString, true);

  return (
    <section className="mt-8">
      <Header2 className='mt-8 px-4'>
        Результати пошуку
      </Header2>
      <Table>          
        <TableBody>
          {words?.map((word) => (
            <TableRow key={word.id}>
              <TableCell className="p-0">
                <Link href={`/word/${word.id}`} className="w-full block p-4 flex justify-between items-center">
                  <span className="font-semibold text-lg">{word.word}</span>
                  <FaChevronRight size={20} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
