'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useAccessToken } from '@/hooks/useAccessToken';
import { signOut } from '@/app/api/auth.api';

import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { SignInForm, SignUpForm } from '../Auth';
import { Button } from '@/components/ui/button';

const MENU_LINKS = [
  { href: '/', label: 'На головну' },
  { href: '/add', label: 'Додати слово' },
];

export const HeaderMenu = () => {
  const pathname = usePathname();
  const isAuthenticated = useAccessToken().accessToken != null;
  return (
    <div className="w-full flex flex-row justify-between px-5">
      <NavigationMenu>
        <NavigationMenuList>
          {MENU_LINKS.map(({ href, label }) => (
            <NavigationMenuItem key={`${href.replace('/','')}`}>
              <Link 
                href={href} 
                passHref
                legacyBehavior>
                <NavigationMenuLink active={pathname === href} className={navigationMenuTriggerStyle()} >
                  {label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {!isAuthenticated && (
        <div className="flex items-center gap-3">
          <SignInForm />
          <SignUpForm />
        </div>
      )}
      {isAuthenticated && (
        <div className="flex items-center gap-3">
          User!
          <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
        </div>
      )}
    </div>
  );
};
