'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FaChevronLeft } from 'react-icons/fa';

interface BackButtonProps {
  className?: string;
}

export const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();
  return (
    <Button variant="link" onClick={() => router.back()} className={className}>
      <FaChevronLeft size={16} />
      <span className="ml-1.5">Назад</span>
    </Button>
  );
};
