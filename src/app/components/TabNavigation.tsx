'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { THEME_PRIMARY, THEME_PRIMARY_BORDER, THEME_FONT_PRIMARY } from '../theme/palette';

export function TabNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
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

  const isProjectsActive = pathname?.startsWith('/projects') || false;
  const currentView = searchParams.get('view') || 'overview';

  return (
    <>
      <nav
        className="border-b"
        style={{ borderColor: THEME_PRIMARY_BORDER, backgroundColor: 'rgba(10,13,17,0.9)', fontFamily: THEME_FONT_PRIMARY }}
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

      {/* Projects Subtabs */}
      {isProjectsActive && (
        <nav
          className="border-b"
          style={{ borderColor: THEME_PRIMARY_BORDER, backgroundColor: 'rgba(10,13,17,0.7)', fontFamily: THEME_FONT_PRIMARY }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              <Link
                href="/projects"
                className={`relative py-3 transition-colors ${
                  currentView === 'overview' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
                style={{ color: currentView === 'overview' ? THEME_PRIMARY : undefined }}
              >
                Overview
                {currentView === 'overview' && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: THEME_PRIMARY }}
                  />
                )}
              </Link>
              <Link
                href="/projects?view=all"
                className={`relative py-3 transition-colors ${
                  currentView === 'all' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
                style={{ color: currentView === 'all' ? THEME_PRIMARY : undefined }}
              >
                All Details
                {currentView === 'all' && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: THEME_PRIMARY }}
                  />
                )}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

