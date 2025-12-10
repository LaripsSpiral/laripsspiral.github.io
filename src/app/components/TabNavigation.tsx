'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { THEME_PRIMARY, THEME_PRIMARY_BORDER } from '../theme/palette';

export function TabNavigation() {
  const pathname = usePathname();
  
  const tabs = [
    { id: 'home', label: 'Home', href: '/home' },
    { id: 'about', label: 'About Me', href: '/about' },
    { id: 'projects', label: 'Projects', href: '/projects' },
  ];

  const isActive = (href: string) => {
    if (href === '/home') {
      return pathname === '/home' || pathname === '/';
    }
    return pathname?.startsWith(href) || false;
  };

  return (
    <nav
      className="border-b"
      style={{ borderColor: THEME_PRIMARY_BORDER, backgroundColor: 'rgba(10,13,17,0.9)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {tabs.map((tab) => {
            const active = isActive(tab.href);
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`relative py-4 transition-colors ${
                  active ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
                style={{ color: active ? THEME_PRIMARY : undefined }}
              >
                {tab.label}
                {active && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: THEME_PRIMARY }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

