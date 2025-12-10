'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Calendar, Trophy, GraduationCap, Users, Handshake, Building2 } from 'lucide-react';
import { Game } from './GameCard';
import { createSlug } from '@/app/lib/project/slug';
import {
  THEME_PRIMARY,
  THEME_PRIMARY_BORDER as THEME_BORDER,
  THEME_PRIMARY_TINT as THEME_TINT,
  THEME_COMPLEMENT_TINT as THEME_COMP_TINT,
} from '../theme/palette';
import { ThemeBadge } from './ThemeBox';

interface HomeTabProps {
  games: Game[];
}

export function HomeTab({ games }: HomeTabProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeAutoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const AUTO_SCROLL_DURATION = 5000; // 5 seconds
  const RESUME_AUTO_PLAY_DELAY = 10000; // 10 seconds

  // Auto-rotate through projects
  useEffect(() => {
    if (isAutoPlaying && games.length > 0) {
      // Clear resume timer when auto-playing starts
      if (resumeAutoPlayRef.current) {
        clearTimeout(resumeAutoPlayRef.current);
        resumeAutoPlayRef.current = null;
      }
      
      // Reset progress when starting
      setProgress(0);
      
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % games.length);
        setProgress(0); // Reset progress when item changes
      }, AUTO_SCROLL_DURATION);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (resumeAutoPlayRef.current) {
        clearTimeout(resumeAutoPlayRef.current);
      }
    };
  }, [isAutoPlaying, games.length]);

  // Progress bar animation
  useEffect(() => {
    // Reset progress when currentIndex changes
    setProgress(0);
    
    if (isAutoPlaying && games.length > 0) {
      const updateInterval = 50; // Update every 50ms for smooth animation
      const increment = (100 / AUTO_SCROLL_DURATION) * updateInterval;
      
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return Math.min(prev + increment, 100);
        });
      }, updateInterval);
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isAutoPlaying, games.length, currentIndex]);

  // Scroll to center the active item
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = 280; // Width of each item
      const gap = 16; // Gap between items
      const itemTotalWidth = itemWidth + gap;
      const spacerWidth = container.clientWidth / 2 - itemWidth / 2; // Width of spacer
      
      // Calculate scroll position to center the active item
      // Spacer width + (item index * item total width) + half item width - half container width
      const itemStartPosition = spacerWidth + (currentIndex * itemTotalWidth);
      const scrollPosition = itemStartPosition + (itemWidth / 2) - (container.clientWidth / 2);
      
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const currentGame = games[currentIndex];

  // Resume auto-play after inactivity
  const scheduleResumeAutoPlay = () => {
    // Clear existing timer
    if (resumeAutoPlayRef.current) {
      clearTimeout(resumeAutoPlayRef.current);
    }
    
    // Set new timer to resume auto-play after 10 seconds
    resumeAutoPlayRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
      setProgress(0);
    }, RESUME_AUTO_PLAY_DELAY);
  };

  const handleProjectClick = (index: number) => {
    setIsAutoPlaying(false);
    setProgress(0);
    setCurrentIndex(index);
    scheduleResumeAutoPlay();
  };

  if (games.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="py-20 text-center">
          <p className="text-gray-400">No projects available.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        {/* Main Preview */}
        <div className="mb-0 px-6 py-6">
          <Link 
            href={`/projects/${createSlug(currentGame.title)}`}
            className="group relative overflow-hidden rounded-xl shadow-2xl transition-transform duration-300 cursor-pointer block"
            style={{
              border: `1px solid ${THEME_BORDER}`,
              background: `linear-gradient(180deg, ${THEME_TINT} 0%, ${THEME_COMP_TINT} 100%)`,
            }}
          >
            <div className="relative h-[400px] w-full overflow-hidden">
              <Image
                src={currentGame.imageUrl}
                alt={currentGame.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 pt-12">
                <div className="flex items-end justify-between gap-4">
                  <div className="flex-1">
                    {currentGame.status && (
                      <div className="mb-2 flex items-center gap-2 text-white/90">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{currentGame.status}</span>
                      </div>
                    )}

                    <h2 className="text-white text-xl sm:text-2xl font-bold">{currentGame.title}</h2>
                    
                    {currentGame.badges?.partner && (
                      <div className="mt-2 flex items-center gap-2 text-white/70 text-xs">
                        <Handshake className="h-3 w-3" />
                        <span>{currentGame.badges.partner}</span>
                      </div>
                    )}
                    
                    <div className="mt-2 flex items-center gap-3 flex-wrap">
                      {(currentGame.client || currentGame.badges?.school) && (
                        <div className="flex items-center gap-2 text-white/70 text-xs">
                          <Building2 className="h-3 w-3" />
                          <span>
                            {currentGame.badges?.school || currentGame.client === 'Academic Project'
                              ? 'Bangkok University'
                              : currentGame.client}
                          </span>
                        </div>
                      )}
                      {currentGame.role && (
                        <div className="flex items-center gap-2 text-white/70 text-xs">
                          <Users className="h-3 w-3" />
                          <span>{currentGame.role}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {currentGame.badges && (
                    <div className="flex flex-wrap items-end justify-end gap-2">
                      {currentGame.badges.star && (
                        <ThemeBadge tone="star">
                          <Star className="h-3 w-3" fill="currentColor" />
                        </ThemeBadge>
                      )}
                      {currentGame.badges.trophy && (
                        <ThemeBadge tone="trophy">
                          <Trophy className="h-3 w-3" />
                        </ThemeBadge>
                      )}
                      {currentGame.badges.school && (
                        <ThemeBadge tone="school">
                          <GraduationCap className="h-3 w-3" />
                        </ThemeBadge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
          
          {/* Auto-scroll Progress Bar */}
          <div className="mt-4">
            <div
              className="h-1 w-full rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <div
                className={`h-full transition-all ${isAutoPlaying ? 'ease-linear' : ''}`}
                style={{
                  width: `${progress}%`,
                  transition: isAutoPlaying ? 'width 0.05s linear' : 'none',
                  backgroundColor: THEME_PRIMARY,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sub Preview Carousel - Full Width */}
      <div className="relative w-full py-2">
        {/* Projects Row - Single horizontal scrolling row, centered */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-16 py-2 scroll-smooth" 
          style={{ 
            scrollSnapType: 'x mandatory'
          }}
        >
          {/* Spacer to allow first item to scroll to center */}
          <div style={{ width: 'calc(50% - 140px)', flexShrink: 0 }} />
          {games.map((game, index) => {
            return (
            <div
              key={game.id}
              onClick={() => handleProjectClick(index)}
              className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                index === currentIndex
                  ? 'scale-105'
                  : 'opacity-60 hover:opacity-100 hover:scale-[1.02]'
              }`}
              style={{ 
                width: '280px', 
                minWidth: '280px', 
                scrollSnapAlign: 'center'
              }}
            >
              <div
                className="relative h-40 w-full overflow-hidden rounded-lg shadow-lg"
                style={{
                  border: `1px solid ${THEME_BORDER}`,
                  background: `linear-gradient(180deg, ${THEME_TINT} 0%, ${THEME_COMP_TINT} 100%)`,
                  boxShadow: index === currentIndex ? `0 0 0 3px ${THEME_PRIMARY}33` : undefined,
                }}
              >
                <Image
                  src={game.imageUrl}
                  alt={game.title}
                  fill
                  sizes="280px"
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                  <h4 className="text-sm font-semibold text-white line-clamp-1">{game.title}</h4>
                </div>
                {index === currentIndex && (
                  <div
                    className="absolute inset-0 rounded-lg"
                    style={{ border: `2px solid ${THEME_PRIMARY}` }}
                  />
                )}
              </div>
            </div>
            );
          })}
          {/* Spacer to allow last item to scroll to center */}
          <div style={{ width: 'calc(50% - 140px)', flexShrink: 0 }} />
        </div>
      </div>
    </>
  );
}

