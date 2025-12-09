'use client';

import { useState, useEffect, useRef } from 'react';
import { Star, Calendar, Trophy, GraduationCap, Users, Handshake } from 'lucide-react';
import { Game } from './GameCard';
import { GameDetailModal } from './GameDetailModal';

interface HomeTabProps {
  games: Game[];
}

export function HomeTab({ games }: HomeTabProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
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
          <div 
            onClick={() => setSelectedGame(currentGame)}
            className="group relative overflow-hidden rounded-xl bg-gray-900 shadow-2xl transition-transform duration-300 hover:shadow-purple-500/20 cursor-pointer"
          >
            <div className="relative h-[400px] w-full overflow-hidden">
              <img
                src={currentGame.imageUrl}
                alt={currentGame.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent px-6 pt-12 pb-4">
                <div className="flex items-end justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {currentGame.status && (
                      <div className="mb-2 flex items-center gap-2 text-white/90">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{currentGame.status}</span>
                      </div>
                    )}

                    <h2 className="mb-2 text-xl sm:text-2xl font-bold text-white line-clamp-2">{currentGame.title}</h2>
                    <p className="mb-3 text-sm sm:text-base text-gray-300 line-clamp-2">{currentGame.description}</p>

                    <div className="mb-3 flex flex-wrap gap-2">
                      {currentGame.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-purple-600/30 px-2 py-1 text-xs text-purple-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {currentGame.role && (
                      <p className="text-xs text-gray-400">Role: {currentGame.role}</p>
                    )}
                  </div>

                  {currentGame.badges && (
                    <div className="flex flex-wrap items-end justify-end gap-1.5">
                      {currentGame.badges.star && (
                        <div className="flex items-center gap-1 rounded-full bg-yellow-500/20 px-2 py-1 text-xs text-yellow-300">
                          <Star className="h-3 w-3" fill="currentColor" />
                        </div>
                      )}
                      {currentGame.badges.trophy && (
                        <div className="flex items-center gap-1 rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-300">
                          <Trophy className="h-3 w-3" />
                        </div>
                      )}
                      {currentGame.badges.school && (
                        <div className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                          <GraduationCap className="h-3 w-3" />
                        </div>
                      )}
                      {currentGame.badges.teamSize && (
                        <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-300">
                          <Users className="h-3 w-3" />
                          <span className="text-xs">{currentGame.badges.teamSize}</span>
                        </div>
                      )}
                      {currentGame.badges.partner && (
                        <div className="flex items-center gap-1 rounded-full bg-orange-500/20 px-2 py-1 text-xs text-orange-300">
                          <Handshake className="h-3 w-3" />
                          <span className="ml-1 text-xs">{currentGame.badges.partner}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Auto-scroll Progress Bar */}
          <div className="mt-4">
            <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full bg-purple-500 transition-all ${isAutoPlaying ? 'ease-linear' : ''}`}
                style={{
                  width: `${progress}%`,
                  transition: isAutoPlaying ? 'width 0.05s linear' : 'none'
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
                  ? 'ring-4 ring-purple-500 scale-105'
                  : 'opacity-60 hover:opacity-100 hover:scale-[1.02]'
              }`}
              style={{ 
                width: '280px', 
                minWidth: '280px', 
                scrollSnapAlign: 'center'
              }}
            >
              <div className="relative h-40 w-full overflow-hidden rounded-lg bg-gray-900 shadow-lg">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                  <h4 className="text-sm font-semibold text-white line-clamp-1">{game.title}</h4>
                </div>
                {index === currentIndex && (
                  <div className="absolute inset-0 border-2 border-purple-500 rounded-lg" />
                )}
              </div>
            </div>
            );
          })}
          {/* Spacer to allow last item to scroll to center */}
          <div style={{ width: 'calc(50% - 140px)', flexShrink: 0 }} />
        </div>
      </div>

      {selectedGame && <GameDetailModal game={selectedGame} onClose={() => setSelectedGame(null)} />}
    </>
  );
}

