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

const MENU_LINKS = [
  { href: '/', label: 'На головну' },
  { href: '/add', label: 'Додати слово' },
];

export const HeaderMenu = () => {
  const pathname = usePathname();
  return (
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
  );
};
