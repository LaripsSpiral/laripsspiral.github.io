'use client';

import {
  Calendar,
  Monitor,
  Star,
  Trophy,
  Users,
  Handshake,
  Building2,
  Play,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  X,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from './GameCard';
import {
  ThemeCard,
  ThemeCardHeader,
  ThemeCardBody,
  ThemeGroup,
  ThemeTitle,
  ThemeHeading,
  ThemeDetail,
  ThemeBadge,
} from './ThemeBox';
import { PageLayout } from './PageLayout';
import {
  THEME_PRIMARY_BORDER,
  THEME_PRIMARY,
  THEME_PANEL_BG,
} from '../theme/palette';

interface GameDetailPageProps {
  game: Game;
}

// Generate example mockups when media is missing
const generateMockupMedia = (game: Game) => {
  const mockups = [
    {
      type: 'image' as const,
      url: game.imageUrl,
      title: `${game.title} - Main View`,
    },
    {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
      title: `${game.title} - Gameplay Screenshot`,
    },
    {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
      title: `${game.title} - Feature Showcase`,
    },
  ];
  return mockups;
};

export function GameDetailPage({ game }: GameDetailPageProps) {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const [mainMediaIndex, setMainMediaIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Use mockup media if no media is provided
  const displayMedia = game.media && game.media.length > 0 ? game.media : generateMockupMedia(game);

  // Reset video when main media changes
  useEffect(() => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [mainMediaIndex]);

  return (
    <PageLayout>
      {/* Back Button */}
      <div
        className="sticky top-0 z-10 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(10,13,17,0.9)', borderBottom: `1px solid ${THEME_PRIMARY_BORDER}` }}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>

      <div className="min-h-screen">

      {/* Main Content - Steam Style Layout */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-6">
        {/* Top Section - Two Column: Main Video Left, Info Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4 lg:items-start lg:grid-rows-[1fr]">
          {/* Left Column - Main Video/Image */}
          <div className="lg:col-span-2">
            {/* Main Hero Video/Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-900 mb-4 group">
              {displayMedia[mainMediaIndex].type === 'video' ? (
                <>
                  <video
                    ref={videoRef}
                    src={displayMedia[mainMediaIndex].url}
                    controls
                    className="h-full w-full object-cover"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={() => setIsVideoPlaying(false)}
                    onClick={(e) => {
                      // Prevent default click behavior, let video controls handle it
                      e.stopPropagation();
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                  {!isVideoPlaying && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        videoRef.current?.play();
                      }}
                    >
                      <div className="rounded-full bg-white/90 p-6 shadow-2xl">
                        <Play className="h-16 w-16 text-gray-900" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => setSelectedMediaIndex(mainMediaIndex)}
                >
                  <Image
                    src={displayMedia[mainMediaIndex].url}
                    alt={displayMedia[mainMediaIndex].title || game.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Navigation Arrows - Show on Hover */}
              {displayMedia.length > 1 && (
                <>
                  {/* Left Arrow */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newIndex = mainMediaIndex > 0 ? mainMediaIndex - 1 : displayMedia.length - 1;
                      setMainMediaIndex(newIndex);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-gray-800/90 p-3 text-white hover:bg-gray-700 transition-all shadow-lg opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  {/* Right Arrow */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newIndex = mainMediaIndex < displayMedia.length - 1 ? mainMediaIndex + 1 : 0;
                      setMainMediaIndex(newIndex);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-gray-800/90 p-3 text-white hover:bg-gray-700 transition-all shadow-lg opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Carousel Below Main Video */}
            {displayMedia.length > 1 && (
              <div className="w-full mt-4">
                {/* Scrollable Carousel */}
                <div 
                  ref={carouselRef}
                  className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth py-2"
                  style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  {displayMedia.map((media, index) => (
                    <div
                      key={index}
                      className={`relative h-20 w-32 flex-shrink-0 cursor-pointer overflow-hidden rounded border-2 transition-all ${
                        index === mainMediaIndex
                          ? 'border-blue-500'
                          : 'border-transparent hover:border-gray-600'
                      }`}
                      onClick={() => setMainMediaIndex(index)}
                    >
                      {media.type === 'video' ? (
                        <>
                          {media.thumbnail ? (
                            <Image
                              src={media.thumbnail}
                              alt={media.title || `Thumbnail ${index + 1}`}
                              fill
                              sizes="128px"
                              className="object-cover"
                            />
                          ) : (
                            <Image
                              src={game.imageUrl}
                              alt={game.title}
                              fill
                              sizes="128px"
                              className="object-cover"
                            />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <Play className="h-6 w-6 text-white" fill="currentColor" />
                          </div>
                        </>
                      ) : (
                        <Image
                          src={media.url}
                          alt={media.title || `Media ${index + 1}`}
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Game Info */}
          <div className="flex flex-col space-y-4">
            {/* Game Title */}
            <h1 className="text-3xl font-bold text-white">{game.title}</h1>

            {/* Description - Truncated with ellipsis */}
            <div className="max-h-24 overflow-hidden">
              <p className="text-gray-300 leading-relaxed line-clamp-4 break-words">{game.description}</p>
            </div>

            {/* Reviews/Badges and Release Info - Horizontal Layout */}
            <div className="flex flex-wrap items-center gap-3">
              {game.badges?.star && (
                <div className="flex items-center gap-2 text-yellow-400">
                  <Star className="h-4 w-4" fill="currentColor" />
                  <span className="text-sm font-semibold">Featured Project</span>
                </div>
              )}
              {game.badges?.trophy && (
                <div className="flex items-center gap-2" style={{ color: THEME_PRIMARY }}>
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm font-semibold">Award Winner</span>
                </div>
              )}
              {game.badges?.teamSize && (
                <ThemeBadge tone="team">
                  <Users className="h-4 w-4" />
                  <span>{game.badges.teamSize}</span>
                </ThemeBadge>
              )}
              {game.status && (
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{game.status}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Monitor className="h-4 w-4" />
                <span>{game.platform}</span>
              </div>
              {game.role && (
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Users className="h-4 w-4" />
                  <span>{game.role}</span>
                </div>
              )}
              {game.badges?.teamSize && (
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Team: {game.badges.teamSize} members</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-white">About This Project</h2>
              <div
                className="rounded-lg p-6"
                style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
              >
                <p className="text-gray-200 leading-relaxed whitespace-pre-line text-lg">{game.description}</p>
              </div>
            </div>

            {/* Features Worked On */}
            {game.features && game.features.length > 0 && (
              <ThemeCard>
                <ThemeCardHeader>
                  <ThemeTitle>Features & Contributions</ThemeTitle>
                  <ThemeHeading className="mt-1">Endless possibilities for this project</ThemeHeading>
                  <p className="text-sm text-gray-300/90 mt-2">
                    Highlights from this build — every pick-up, discard, and gameplay system that shaped the experience.
                  </p>
                </ThemeCardHeader>

                <ThemeCardBody>
                  <ThemeGroup>
                  {game.features.map((feature, index) => {
                    // Map each feature to a corresponding media item by index
                    const featureMedia = displayMedia[index];
                    const featureDetail = game.featureDetails?.[index] || feature;
                    return (
                      <div
                        key={index}
                        className="rounded-lg bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors overflow-hidden"
                      >
                        <div className="px-4 py-3 space-y-2">
                          <ThemeHeading as="p" className="text-base font-semibold text-white">
                            {feature}
                          </ThemeHeading>
                          <ThemeDetail as="p" className="mb-1">
                            {featureDetail}
                          </ThemeDetail>
                        </div>

                        {featureMedia && (
                          <div className="relative aspect-video w-full overflow-hidden bg-black/30 border-t border-white/5">
                            {featureMedia.type === 'gif' || featureMedia.type === 'image' ? (
                              <Image
                                src={('thumbnail' in featureMedia && featureMedia.thumbnail) ? featureMedia.thumbnail : featureMedia.url}
                                alt={featureMedia.title || feature}
                                fill
                                sizes="(max-width: 1200px) 100vw, 66vw"
                                className="object-cover"
                              />
                            ) : featureMedia.type === 'video' ? (
                              <>
                                {('thumbnail' in featureMedia && featureMedia.thumbnail) ? (
                                  <Image
                                    src={featureMedia.thumbnail}
                                    alt={featureMedia.title || feature}
                                    fill
                                    sizes="(max-width: 1200px) 100vw, 66vw"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                                    <Play className="h-12 w-12 text-gray-500" />
                                  </div>
                                )}
                              </>
                            ) : null}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1724]/80 via-transparent to-transparent" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  </ThemeGroup>
                </ThemeCardBody>
              </ThemeCard>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Role & Position */}
            {(game.role || game.roleDetails) && (
              <div
                className="rounded-lg p-6"
                style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
              >
                <h3 className="mb-4 text-lg font-semibold text-white">Role & Position</h3>
                <div className="space-y-3">
                  {game.role && (
                    <div className="flex items-center gap-2" style={{ color: THEME_PRIMARY }}>
                      <Users className="h-4 w-4" />
                      <span className="text-gray-300">{game.role}</span>
                    </div>
                  )}
                  {game.roleDetails && (
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{game.roleDetails}</p>
                  )}
                </div>
              </div>
            )}

            {/* Working for / Working while studying */}
            {(game.client || game.badges?.school) && (
              <div
                className="rounded-lg p-6"
                style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
              >
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {game.badges?.school || game.client === 'Academic Project'
                    ? 'Working while studying at'
                    : 'Working for'}
                </h3>
                <div className="flex items-center gap-2 text-orange-400">
                  <Building2 className="h-4 w-4" />
                  <span className="text-gray-300">
                    {game.badges?.school || game.client === 'Academic Project'
                      ? 'Bangkok University'
                      : game.client}
                  </span>
                </div>
              </div>
            )}

            {/* Collaborate */}
            {game.badges?.partner && (
              <div
                className="rounded-lg p-6"
                style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
              >
                <h3 className="mb-4 text-lg font-semibold text-white">Collaborate</h3>
                <div className="flex items-center gap-2 text-orange-400">
                  <Handshake className="h-4 w-4" />
                  <span className="text-gray-300">{game.badges.partner}</span>
                </div>
              </div>
            )}

            {/* Awards */}
            {game.awards && game.awards.length > 0 && (
              <div
                className="rounded-lg p-6"
                style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
              >
                <h3 className="mb-4 text-lg font-semibold text-white">Awards</h3>
                <div className="space-y-2">
                  {game.awards.map((award, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Trophy className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Media Viewer Modal */}
      {selectedMediaIndex !== null && displayMedia[selectedMediaIndex] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedMediaIndex(null)}
        >
          {/* Content container */}
          <div 
            className="relative w-[90vw] max-w-6xl rounded-lg bg-gray-900/50 backdrop-blur-sm shadow-2xl overflow-hidden flex flex-col" 
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Title bar at top */}
            {displayMedia[selectedMediaIndex].title && (
              <div className="relative bg-gray-800/95 px-4 py-3 flex items-center justify-center border-b border-gray-700/50">
                <p className="text-white font-semibold text-center">{displayMedia[selectedMediaIndex].title}</p>
                {/* Close button - centered in top panel */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMediaIndex(null);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[70] rounded-full bg-gray-800 p-2 text-white transition-colors hover:bg-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            )}

            {/* Content area - 16:9 aspect ratio */}
            <div className="relative w-full aspect-video flex items-center justify-center pointer-events-none bg-black/20">
              {displayMedia[selectedMediaIndex].type === 'video' ? (
                <video
                  src={displayMedia[selectedMediaIndex].url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={displayMedia[selectedMediaIndex].url}
                    alt={displayMedia[selectedMediaIndex].title || 'Media'}
                    fill
                    sizes="90vw"
                    className="object-contain"
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
              )}
            </div>

            {/* Bottom bar with position indicator */}
            {displayMedia.length > 1 && (
              <div className="relative bg-gray-800/95 px-4 py-3 flex items-center justify-center border-t border-gray-700/50">
                <p className="text-gray-300 text-sm">
                  {selectedMediaIndex !== null ? selectedMediaIndex + 1 : 1} of {displayMedia.length}
                </p>
              </div>
            )}

            {/* Navigation arrows - positioned at border of modal container with gap */}
            {displayMedia.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newIndex = selectedMediaIndex !== null && selectedMediaIndex > 0 
                      ? selectedMediaIndex - 1 
                      : displayMedia.length - 1;
                    setSelectedMediaIndex(newIndex);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-[70] rounded-full bg-gray-800/90 p-3 text-white transition-colors hover:bg-gray-700 shadow-lg"
                  style={{ pointerEvents: 'auto' }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newIndex = selectedMediaIndex !== null && selectedMediaIndex < displayMedia.length - 1 
                      ? selectedMediaIndex + 1 
                      : 0;
                    setSelectedMediaIndex(newIndex);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[70] rounded-full bg-gray-800/90 p-3 text-white transition-colors hover:bg-gray-700 shadow-lg"
                  style={{ pointerEvents: 'auto' }}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
      </div>
    </PageLayout>
  );
}

