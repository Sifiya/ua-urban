'use client';
import React from 'react';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInForm, SignUpForm } from '../Auth';

const MENU_LINKS = [
  { href: '/', label: 'На головну' },
  { href: '/add', label: 'Додати слово' },
];

export const HeaderMenu = () => {
  const pathname = usePathname();
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

      <div className="flex items-center gap-3">
        <SignInForm />
        <SignUpForm />
      </div>
    </div>
  );
};
