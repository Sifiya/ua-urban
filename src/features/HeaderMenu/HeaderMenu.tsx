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
        <NavigationMenuItem>
          {MENU_LINKS.map(({ href, label }) => (
            <Link 
              href={href} 
              key={`${href.replace('/','')}`}
              passHref
              legacyBehavior>
              <NavigationMenuLink active={pathname === href} className={navigationMenuTriggerStyle()} >
                {label}
              </NavigationMenuLink>
            </Link>
          ))}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
