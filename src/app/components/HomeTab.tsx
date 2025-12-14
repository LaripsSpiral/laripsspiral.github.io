'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Calendar, Trophy, GraduationCap, Users, Handshake, Building2, ArrowRight, CheckCircle } from 'lucide-react';
import { Game } from './GameCard';
import { createSlug } from '@/app/lib/project/slug';
import {
  THEME_PRIMARY,
  THEME_PRIMARY_BORDER as THEME_BORDER,
  THEME_PRIMARY_TINT as THEME_TINT,
  THEME_COMPLEMENT_TINT as THEME_COMP_TINT,
  THEME_FONT_PRIMARY,
} from '../theme/palette';
import { ThemeBadge } from './ThemeBox';
import { personalInfo } from '../data/personalInfo';

interface HomeTabProps {
  games: Game[];
}

const AUTO_SCROLL_DURATION = 10 * 1000; // 10 seconds
const RESUME_AUTO_PLAY_DELAY = 10 * 1000; // 10 seconds

export function HomeTab({ games }: HomeTabProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeAutoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Track screen size for responsive scroll-snap
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Auto-rotate through projects
  useEffect(() => {
    // Always clear existing interval first to ensure fresh start
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isAutoPlaying && games.length > 0) {
      // Clear resume timer when auto-playing starts
      if (resumeAutoPlayRef.current) {
        clearTimeout(resumeAutoPlayRef.current);
        resumeAutoPlayRef.current = null;
      }
      
      // Reset progress when starting
      setProgress(0);
      
      // Create new interval with current duration
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % games.length);
        setProgress(0); // Reset progress when item changes
      }, AUTO_SCROLL_DURATION);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (resumeAutoPlayRef.current) {
        clearTimeout(resumeAutoPlayRef.current);
      }
    };
  }, [isAutoPlaying, games.length]);

  // Progress bar animation
  useEffect(() => {
    // Always clear existing progress interval first
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

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
        progressIntervalRef.current = null;
      }
    };
  }, [isAutoPlaying, games.length, currentIndex]);


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
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" style={{ fontFamily: THEME_FONT_PRIMARY }}>
        <div className="py-20 text-center">
          <p className="text-gray-400">No projects available.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* About Me Preview Section */}
      <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 pt-4 sm:pt-6 pb-2 lg:px-8" style={{ fontFamily: THEME_FONT_PRIMARY }}>
        <div className="px-2 sm:px-4">
          <Link
            href="/about"
            className="group relative block overflow-hidden rounded-xl shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              border: `1px solid ${THEME_BORDER}`,
              background: `linear-gradient(135deg, ${THEME_TINT} 0%, ${THEME_COMP_TINT} 100%)`,
            }}
          >
            <div className="relative p-2 sm:p-3 md:p-4">
              <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center">
                {/* Profile Image */}
                <div className="flex-shrink-0 hidden sm:block">
                  <div
                    className="relative aspect-square w-16 sm:w-20 md:w-24 overflow-hidden rounded-full"
                    style={{
                      background: THEME_TINT,
                      border: `2px solid ${THEME_BORDER}`,
                    }}
                  >
                    <div className="flex h-full w-full items-center justify-center bg-gray-800">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: THEME_PRIMARY }}>
                        ST
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="mb-1 sm:mb-2 flex items-start justify-between gap-1 sm:gap-2">
                    <div className="flex-1 min-w-0">
                      <h2 className="mb-0.5 sm:mb-1 text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase text-white truncate">{personalInfo.name}</h2>
                      <p className="text-xs sm:text-sm md:text-base truncate" style={{ color: THEME_PRIMARY }}>{personalInfo.title}</p>
                    </div>
                    {/* View More Button - Positioned at top right */}
                    <div className="flex-shrink-0">
                      <div
                        className="flex items-center gap-1 sm:gap-1.5 md:gap-2 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 transition-all group-hover:gap-2 sm:group-hover:gap-2.5 md:group-hover:gap-3"
                        style={{
                          backgroundColor: THEME_PRIMARY,
                          color: '#0a0d11',
                        }}
                      >
                        <span className="text-xs sm:text-sm font-semibold">View More</span>
                        <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                  {/* Professional Summary Preview */}
                  <p className="mb-1 sm:mb-2 text-xs leading-relaxed text-gray-300 line-clamp-2">
                    {personalInfo.professionalSummary.replace(/\*\*/g, '')}
                  </p>


                  {/* Languages */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 text-xs mb-1 sm:mb-2">
                    <span className="font-semibold uppercase whitespace-nowrap" style={{ color: THEME_PRIMARY }}>
                      Languages:
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                      {personalInfo.languages.map((lang) => (
                        <span key={lang} className="whitespace-nowrap" style={{ color: THEME_PRIMARY }}>
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 pt-2 pb-4 sm:pb-6 lg:px-8" style={{ fontFamily: THEME_FONT_PRIMARY }}>
        {/* Main Layout: Sub Previews Left, Main Preview Right on large; Main on top, Sub below on small */}
        <div className="px-2 sm:px-4 py-3 sm:py-4 md:py-6">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 lg:h-[515px]">
            {/* Left Side - Sub Preview Carousel (Vertical on large, Horizontal on small) */}
            <div className="lg:w-64 flex-shrink-0 relative lg:order-1 order-2">
              <div 
                ref={scrollContainerRef}
                className="flex lg:flex-col flex-row gap-2 sm:gap-3 md:gap-4 lg:overflow-y-auto overflow-x-auto lg:overflow-x-hidden scrollbar-hide scroll-smooth lg:max-h-[600px] lg:pr-2 lg:pl-2 lg:pt-2 lg:pb-20 lg:justify-start pr-1 sm:pr-2 pl-1 sm:pl-2 pt-1 sm:pt-2 pb-1 sm:pb-2" 
                style={{ 
                  scrollSnapType: isLargeScreen ? 'y mandatory' : 'x mandatory',
                  height: '100%'
                }}
              >
                {games.map((game, index) => {
                  const isActive = index === currentIndex;
                  
                  return (
                    <div
                      key={game.id}
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      onClick={() => {
                        handleProjectClick(index);
                      }}
                      className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                        isActive
                          ? 'scale-105'
                          : 'opacity-60 hover:opacity-100 hover:scale-[1.02]'
                      }`}
                      style={{ 
                        scrollSnapAlign: 'center'
                      }}
                    >
                      <div
                        className="relative lg:h-28 h-20 sm:h-24 lg:w-full w-28 sm:w-32 overflow-hidden rounded-lg shadow-lg"
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
                          sizes="256px"
                          className="object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2 sm:p-2.5 md:p-3">
                          <h4 className="text-xs sm:text-sm text-white line-clamp-1">{game.title}</h4>
                        </div>
                        {isActive && (
                          <div
                            className="absolute inset-0 rounded-lg"
                            style={{ border: `2px solid ${THEME_PRIMARY}` }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* View More Button - Floating at bottom on large, static on small */}
              <div className="lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:pt-4 lg:pr-2 lg:pointer-events-none relative pt-2 sm:pt-3 md:pt-4 pointer-events-auto">
                <div className="lg:bg-gradient-to-t lg:from-[#0a0d11] lg:via-[#0a0d11]/95 lg:to-transparent lg:pointer-events-auto pointer-events-auto" style={{ height: 'fit-content' }}>
                  <Link
                    href="/projects"
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 transition-all hover:gap-2 sm:hover:gap-2.5 md:hover:gap-3 w-full"
                    style={{
                      backgroundColor: THEME_PRIMARY,
                      color: '#0a0d11',
                    }}
                  >
                    <span className="font-semibold text-xs sm:text-sm">View More Projects</span>
                    <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Main Preview */}
            <div className="flex-1 lg:order-2 order-1">
              <Link 
                href={`/projects/${createSlug(currentGame.title)}`}
                className="group relative overflow-hidden rounded-xl shadow-2xl transition-transform duration-300 cursor-pointer block"
                style={{
                  border: `1px solid ${THEME_BORDER}`,
                  background: `linear-gradient(180deg, ${THEME_TINT} 0%, ${THEME_COMP_TINT} 100%)`,
                }}
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={currentGame.imageUrl}
                    alt={currentGame.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-2 sm:p-3 md:p-4 pt-6 sm:pt-8 md:pt-10">
                    <div className="flex items-start justify-between gap-2 sm:gap-3 md:gap-4">
                      <div className="flex-1">
                        {currentGame.status && (
                          <div className="mb-2 sm:mb-2.5 md:mb-3 flex items-center gap-1.5 sm:gap-2 text-white/90">
                            <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                            <span className="text-xs sm:text-sm">{currentGame.status}</span>
                          </div>
                        )}
                        {(currentGame.startDate || currentGame.lastDate) && (
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5 md:mb-3 text-white/90">
                            <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                            <span className="text-xs sm:text-sm">
                              {currentGame.lastDate 
                                ? `${currentGame.startDate || ''}${currentGame.startDate ? ' to ' : ''}${currentGame.lastDate}`
                                : currentGame.startDate || currentGame.lastDate}
                            </span>
                          </div>
                        )}

                        <h2 className="mb-2 sm:mb-2.5 md:mb-3 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold">{currentGame.title}</h2>
                        
                        {currentGame.badges?.partner && (
                          <div className="mb-2 sm:mb-2.5 md:mb-3 flex items-center gap-1.5 sm:gap-2 text-white/70">
                            <Handshake className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                            <span className="text-xs sm:text-sm">{currentGame.badges.partner}</span>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 md:gap-3">
                          {(currentGame.client || currentGame.badges?.school) && (
                            <div className="flex items-center gap-1.5 sm:gap-2 text-white/70">
                              <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                              <span className="text-xs sm:text-sm">
                                {currentGame.badges?.school || currentGame.client === 'Academic Project'
                                  ? 'Bangkok University'
                                  : currentGame.client}
                              </span>
                            </div>
                          )}
                          {currentGame.role && (
                            <div className="flex items-center gap-1.5 sm:gap-2 text-white/70">
                              <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                              <span className="text-xs sm:text-sm">{currentGame.role}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {currentGame.badges && (
                    <div className="absolute bottom-0 right-0 flex flex-row items-center justify-end gap-1 sm:gap-1.5 md:gap-2 p-1 sm:p-1.5 md:p-2">
                      {currentGame.badges.star && (
                        <ThemeBadge tone="star" className="px-2 py-1 sm:px-2.5 sm:py-1.25 md:px-3 md:py-1.5">
                          <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" fill="currentColor" />
                        </ThemeBadge>
                      )}
                      {currentGame.badges.trophy && (
                        <ThemeBadge tone="trophy" className="px-2 py-1 sm:px-2.5 sm:py-1.25 md:px-3 md:py-1.5">
                          <Trophy className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                        </ThemeBadge>
                      )}
                      {currentGame.badges.school && (
                        <ThemeBadge tone="school" className="px-2 py-1 sm:px-2.5 sm:py-1.25 md:px-3 md:py-1.5">
                          <GraduationCap className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                        </ThemeBadge>
                      )}
                    </div>
                  )}
                </div>
              </Link>
              
              {/* Auto-scroll Progress Bar */}
              <div className="mt-3 sm:mt-4 md:mt-6">
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
        </div>
      </div>
    </>
  );
}

