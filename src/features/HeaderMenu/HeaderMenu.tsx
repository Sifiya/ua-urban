'use client';
import React, { useMemo } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useQueryClient } from '@tanstack/react-query';
import { signOut } from '@/app/api/auth.api';

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { FaBars } from 'react-icons/fa';
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
  const isDesktop = useMediaQuery('(min-width: 600px)');
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { isAuthenticated, email } = useProfile();

  const filteredLinks = useMemo(() => MENU_LINKS.filter((link) => {
    return link.href !== '/add' || isAuthenticated;
  }), [isAuthenticated]);

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

  if (!isDesktop) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
            <FaBars size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-screen">
          <DropdownMenuGroup>
            {filteredLinks.map(({ href, label }) => (
              <DropdownMenuItem 
                key={`${href.replace('/','')}`}
                className="justify-center">
                <Link href={href}>
                  {label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            
            {isAuthenticated && (
              <>
                <DropdownMenuItem className="justify-center">
                  {email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center" onClick={onSignOut}>
                  Вийти
                </DropdownMenuItem>
              </>
            )}
            {!isAuthenticated && (
              <>
                <div className="w-full flex justify-center">
                  <SignInForm noButton />
                </div>
                <DropdownMenuSeparator />
                <div className="w-full flex justify-center">
                  <SignUpForm noButton />
                </div>
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
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
      
      <div className="flex items-center gap-3">
        {isAuthenticated && (
          <>
            <span>{email}</span>
            <Button variant="outline" onClick={onSignOut}>Вийти</Button>
          </>
        )}
        {!isAuthenticated && (
          <>
            <SignInForm />
            <SignUpForm />
          </>
        )}
      </div>
    </div>
  );
};
