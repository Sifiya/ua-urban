'use client';
import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';
import { useQueryClient } from '@tanstack/react-query';
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
  const { isAuthenticated, email } = useProfile();

  const filteredLinks = useMemo(() => MENU_LINKS.filter((link) => {
    return link.href !== '/add' || isAuthenticated;
  }), [isAuthenticated]);

  const queryClient = useQueryClient();
  const pathname = usePathname();
  const onSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      console.log(error);
    } else {
      queryClient.invalidateQueries({
        queryKey: ['profile']
      });
    }
  }

  return (
    <div className="w-full flex flex-row justify-between px-5">
      <NavigationMenu>
        <NavigationMenuList>
          {filteredLinks.map(({ href, label }) => (
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
          <span>{email}</span>
          <Button variant="outline" onClick={onSignOut}>Вийти</Button>
        </div>
      )}
    </div>
  );
};
