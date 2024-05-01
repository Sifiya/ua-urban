'use server';
import React from 'react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { FaLink } from 'react-icons/fa';

interface LinkBannerProps {}

const OFFICIAL_HOST = 'www.urban.in.ua';

export const LinkBanner = ({}: LinkBannerProps) => {
  const headersList = headers();
  const host = headersList.get('host');

  if (!host || OFFICIAL_HOST.includes(host)) {
    return null;
  }

  return (
   
    <Link 
      href={`https://${OFFICIAL_HOST}`}
      className="bg-primary text-primary-foreground text-sm w-full p-3 flex items-center justify-center hover:opacity-90 transition-opacity"
    >
        <FaLink className="mr-2" />
        <span>Сайт переїхав на</span>
        <span className="underline ml-1 text-secondary">{OFFICIAL_HOST}</span>
        <FaLink className="ml-2" />
    </Link>
  );
};
