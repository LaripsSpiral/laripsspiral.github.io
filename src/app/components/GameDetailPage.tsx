'use client';

import {
  Users,
  Handshake,
  Building2,
  Play,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  X,
  Tag,
  CheckCircle,
  Calendar,
  Clock,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Game, FeatureDetailItem } from './GameCard';
import {
  ThemeHeading,
  ThemeDetail,
} from './ThemeBox';
import { CalendarDisplay } from './CalendarDisplay';
import { PageLayout } from './PageLayout';
import {
  THEME_PRIMARY_BORDER,
  THEME_PRIMARY,
  THEME_PANEL_BG,
  THEME_FONT_PRIMARY,
} from '../theme/palette';

interface GameDetailPageProps {
  game: Game;
}

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (url: string): string | null => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;

  // Extract timestamp if present
  const timeMatch = url.match(/[?&]t=(\d+)/);
  const startTime = timeMatch ? timeMatch[1] : '';

  // Build query parameters
  const params = new URLSearchParams();
  if (startTime) {
    params.append('start', startTime);
  }
  // Hide related videos from other channels (only shows videos from same channel)
  params.append('rel', '0');
  // Reduce YouTube branding
  params.append('modestbranding', '1');
  // Hide video annotations
  params.append('iv_load_policy', '3');
  // Disable keyboard controls (prevents some UI elements)
  params.append('disablekb', '1');

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

// Helper function to get YouTube thumbnail URL
const getYouTubeThumbnail = (url: string): string | null => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

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

// Feature Video Component with play button overlay
function FeatureVideo({
  src,
  thumbnail,
  title,
  fallbackImage
}: {
  src: string;
  thumbnail?: string;
  title?: string;
  fallbackImage?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative w-full h-full group">
      {/* Background image/thumbnail while video loads */}
      {(thumbnail || fallbackImage) && !isLoaded && (
        <div className="absolute inset-0 z-0">
          <Image
            src={thumbnail || fallbackImage || ''}
            alt={title || 'Video thumbnail'}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        controls
        controlsList="nodownload"
        className="h-full w-full object-cover relative z-10 bg-transparent"
        preload="metadata"
        poster={thumbnail || fallbackImage}
        onLoadedMetadata={() => setIsLoaded(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ backgroundColor: 'transparent' }}
      >
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-20 opacity-100 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))'
          }}
          onClick={(e) => {
            e.stopPropagation();
            videoRef.current?.play();
          }}
        >
          <div className="rounded-full bg-white/90 p-4 shadow-2xl hover:bg-white transition-colors">
            <Play className="h-10 w-10 text-gray-900" fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
}


export function GameDetailPage({ game }: GameDetailPageProps) {
  const searchParams = useSearchParams();
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const [mainMediaIndex, setMainMediaIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [showAllFeatures, setShowAllFeatures] = useState<boolean>(false);

  const [showTeam, setShowTeam] = useState<boolean>(false);
  const [showTags, setShowTags] = useState<boolean>(false);
  const [showRoleDetails, setShowRoleDetails] = useState<boolean>(false);
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

  const returnTo = searchParams.get('returnTo');
  const returnView = searchParams.get('returnView');
  const view = searchParams.get('view');
  const backView = returnView || view;
  const backToProjectsHref =
    returnTo === 'home'
      ? '/home'
      : backView && backView !== 'overview'
        ? `/projects?view=${encodeURIComponent(backView)}`
        : '/projects';

  return (
    <div className="relative min-h-screen" style={game.wallpaper ? { background: 'transparent' } : undefined}>
      {/* Background Wallpaper */}
      {game.wallpaper && (
        <>
          <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
            <Image
              src={game.wallpaper}
              alt={`${game.title} wallpaper`}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              style={{ opacity: 0.5 }}
            />
          </div>
          <div className="fixed inset-0 z-[1] bg-gradient-to-b from-[#0a0d11]/50 via-[#0a0d11]/40 to-[#06080c]/50" style={{ pointerEvents: 'none' }} />
        </>
      )}

      <div style={game.wallpaper ? { position: 'relative', zIndex: 2 } : undefined}>
        <PageLayout transparentBackground={!!game.wallpaper}>
          {/* Back Button */}
          <nav
            className="sticky top-0 z-10 border-b backdrop-blur-sm"
            style={{ borderColor: THEME_PRIMARY_BORDER, backgroundColor: 'rgba(10,13,17,0.7)', fontFamily: THEME_FONT_PRIMARY }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Link
                href={backToProjectsHref}
                className="relative inline-flex items-center gap-2 py-3 transition-colors text-gray-400 hover:text-gray-200"
                style={{ color: THEME_PRIMARY }}
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Projects</span>
              </Link>
            </div>
          </nav>

          <div className="min-h-screen relative z-10">
            {/* Main Content - Steam Style Layout */}
            <div className="mx-auto max-w-7xl px-4 pt-6 pb-6 sm:px-6 lg:px-8" style={{ fontFamily: THEME_FONT_PRIMARY }}>
              {/* Game Title - Moved to top */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0">{game.title}</h1>
              {/* Main Content - Merged Grid Layout */}
              <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:items-start">
                {/* Mobile Media Container */}
                <div
                  className="w-full lg:hidden space-y-4"
                  style={{
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    boxSizing: 'content-box'
                  }}
                >
                  {/* Main Hero Video/Image - Extracted for small screens */}
                  <div
                    className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-900 group"
                    style={{
                      marginTop: '5px',
                      marginBottom: '5px'
                    }}
                  >
                    {displayMedia[mainMediaIndex].type === 'video' ? (
                      <>
                        <video
                          src={displayMedia[mainMediaIndex].url}
                          controls
                          controlsList="nodownload"
                          className="h-full w-full object-cover"
                          preload="metadata"
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
                              const video = e.currentTarget.parentElement?.querySelector('video');
                              video?.play();
                            }}
                          >
                            <div className="rounded-full bg-white/90 p-6 shadow-2xl">
                              <Play className="h-16 w-16 text-gray-900" fill="currentColor" />
                            </div>
                          </div>
                        )}
                      </>
                    ) : displayMedia[mainMediaIndex].type === 'youtube' ? (
                      <div className="relative w-full h-full">
                        <iframe
                          src={getYouTubeEmbedUrl(displayMedia[mainMediaIndex].url) || ''}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={displayMedia[mainMediaIndex].title || 'YouTube video'}
                        />
                      </div>
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
                          priority
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

                  {/* Thumbnail Carousel - Extracted for small screens, appears above sidebar */}
                  {displayMedia.length > 1 && (
                    <div className="w-full">
                      {/* Scrollable Carousel */}
                      <div
                        className="flex gap-2 scroll-smooth py-0 [&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
                        style={{
                          scrollbarWidth: 'thin',
                          scrollbarColor: 'rgba(160, 175, 183, 0.5) transparent',
                          overflowX: 'scroll',
                          paddingTop: '0px',
                          paddingBottom: '0px'
                        }}
                      >
                        {displayMedia.map((media, index) => (
                          <div
                            key={`sm-${index}`}
                            className={`relative h-20 w-32 flex-shrink-0 cursor-pointer overflow-hidden rounded border-2 transition-all ${index === mainMediaIndex
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
                            ) : media.type === 'youtube' ? (
                              <>
                                <Image
                                  src={media.thumbnail || getYouTubeThumbnail(media.url) || game.imageUrl}
                                  alt={media.title || `YouTube thumbnail ${index + 1}`}
                                  fill
                                  sizes="128px"
                                  className="object-cover"
                                />
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

                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6 order-3 lg:order-none">
                  {/* Main Video and Carousel Container */}
                  <div className="hidden lg:block space-y-0">
                    {/* Main Hero Video/Image - Shown on large screens */}
                    <div
                      className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-900 group"
                      style={{
                        marginTop: '5px',
                        marginBottom: '5px'
                      }}
                    >
                      {displayMedia[mainMediaIndex].type === 'video' ? (
                        <>
                          <video
                            ref={videoRef}
                            src={displayMedia[mainMediaIndex].url}
                            controls
                            controlsList="nodownload"
                            className="h-full w-full object-cover"
                            preload="metadata"
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
                      ) : displayMedia[mainMediaIndex].type === 'youtube' ? (
                        <div className="relative w-full h-full">
                          <iframe
                            src={getYouTubeEmbedUrl(displayMedia[mainMediaIndex].url) || ''}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={displayMedia[mainMediaIndex].title || 'YouTube video'}
                          />
                        </div>
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
                      <div className="w-full">
                        {/* Scrollable Carousel */}
                        <div
                          ref={carouselRef}
                          className="flex gap-2 scroll-smooth py-2 [&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
                          style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(160, 175, 183, 0.5) transparent',
                            overflowX: 'scroll'
                          }}
                        >
                          {displayMedia.map((media, index) => (
                            <div
                              key={`lg-${index}`}
                              className={`relative h-20 w-32 flex-shrink-0 cursor-pointer overflow-hidden rounded border-2 transition-all ${index === mainMediaIndex
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
                              ) : media.type === 'youtube' ? (
                                <>
                                  <Image
                                    src={media.thumbnail || getYouTubeThumbnail(media.url) || game.imageUrl}
                                    alt={media.title || `YouTube thumbnail ${index + 1}`}
                                    fill
                                    sizes="128px"
                                    className="object-cover"
                                  />
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
                  {/* Game Links */}
                  <div
                    className="rounded-lg p-4"
                    style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
                  >
                    <h2 className="mb-4 text-2xl font-bold text-white">Links</h2>
                    <div className="flex flex-wrap gap-3">
                      {/* Game Platform Link */}
                      {game.gameLink && (
                        <a
                          href={game.gameLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-4 py-2 font-bold rounded transition-colors ${game.gameLink.includes('roblox.com')
                            ? 'bg-[#00b0ff] hover:bg-[#0091ea] text-white'
                            : 'bg-[#fa5c5c] hover:bg-[#ff7878] text-white'
                            }`}
                        >
                          {game.gameLink.includes('roblox.com') ? (
                            <>Roblox</>
                          ) : game.gameLink.includes('itch.io') ? (
                            <>Itch.io</>
                          ) : (
                            <>Play Now</>
                          )}
                        </a>
                      )}

                      {/* Website Link */}
                      {game.websiteLink && (
                        <a
                          href={game.websiteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold rounded transition-colors"
                        >
                          yoorodwittaya.com
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Features Worked On */}
                  {game.featureDetails && game.featureDetails.length > 0 && (
                    <div>
                      <div
                        className="rounded-lg p-4"
                        style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
                      >
                        <h2 className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold text-white">Features</h2>
                        <div className="space-y-6">
                          {game.featureDetails.map((featureDetail, index) => {
                            // Show only first 2 features initially, or all if showAllFeatures is true
                            const INITIAL_FEATURES_COUNT = 2;
                            if (!showAllFeatures && index >= INITIAL_FEATURES_COUNT) {
                              return null;
                            }

                            // Recursive component to render feature detail structure
                            const renderFeatureDetail = (detail: string | FeatureDetailItem | undefined, depth: number = 0) => {
                              if (!detail) return null;

                              // If it's a string, render as plain text (backward compatibility)
                              if (typeof detail === 'string') {
                                return (
                                  <ThemeDetail as="p" className="mb-1 whitespace-pre-line">
                                    {detail}
                                  </ThemeDetail>
                                );
                              }

                              // If it's a FeatureDetailItem object
                              const isSubLevel = depth > 0;
                              const textSize = isSubLevel ? 'text-xs sm:text-sm' : 'text-sm sm:text-base';

                              return (
                                <div className={isSubLevel ? 'ml-4 mt-2' : ''}>
                                  <ThemeHeading
                                    as="p"
                                    className={`${isSubLevel ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} font-semibold text-white mb-2`}
                                  >
                                    {detail.topic}
                                  </ThemeHeading>
                                  {detail.details && detail.details.length > 0 && (
                                    <ul className={`space-y-1 ${textSize}`} style={{ listStyle: 'none', paddingLeft: 0 }}>
                                      {detail.details.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start">
                                          <span className="mr-2" style={{ color: '#dfe6ea' }}>•</span>
                                          <span style={{ color: '#dfe6ea' }}>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                  {detail.subTopics && detail.subTopics.length > 0 && (
                                    <div className="mt-3 space-y-3">
                                      {detail.subTopics.map((subTopic, subIndex) => (
                                        <div key={subIndex}>
                                          {renderFeatureDetail(subTopic, depth + 1)}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {detail.media && (
                                    <div className="relative aspect-video w-full overflow-hidden border border-white/5 mt-4 rounded" style={{ backgroundColor: THEME_PANEL_BG }}>
                                      {detail.media.type === 'image' || detail.media.type === 'gif' ? (
                                        <Image
                                          src={detail.media.url}
                                          alt={detail.media.title || detail.topic}
                                          fill
                                          sizes="(max-width: 1200px) 100vw, 66vw"
                                          className="object-cover"
                                        />
                                      ) : detail.media.type === 'video' ? (
                                        <FeatureVideo
                                          src={detail.media.url}
                                          thumbnail={detail.media.thumbnail}
                                          title={detail.media.title || detail.topic}
                                          fallbackImage={game.imageUrl}
                                        />
                                      ) : detail.media.type === 'youtube' ? (
                                        <div className="relative w-full h-full">
                                          <iframe
                                            src={getYouTubeEmbedUrl(detail.media.url) || ''}
                                            className="absolute inset-0 w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={detail.media.title || detail.topic}
                                          />
                                        </div>
                                      ) : null}
                                    </div>
                                  )}
                                </div>
                              );
                            };

                            const key = typeof featureDetail === 'object' && featureDetail?.topic
                              ? featureDetail.topic
                              : index;

                            return (
                              <div
                                key={key}
                              >
                                <div className="space-y-2">
                                  {renderFeatureDetail(featureDetail)}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* View More / View Less Button */}
                        {game.featureDetails.length > 2 && (
                          <div className="mt-6 flex justify-center">
                            <button
                              onClick={() => setShowAllFeatures(!showAllFeatures)}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                              style={{
                                backgroundColor: THEME_PRIMARY + '20',
                                color: THEME_PRIMARY,
                                border: `1px solid ${THEME_PRIMARY}40`,
                              }}
                            >
                              {showAllFeatures ? (
                                <>
                                  <ChevronUp className="h-4 w-4" />
                                  <span>View Less</span>
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4" />
                                  <span>View More ({game.featureDetails.length - 2} more)</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>


                {/* Right Column - Game Info & Sidebar */}
                <div className="flex flex-col space-y-4 order-2 lg:order-none">
                  {/* Project Cover Image */}
                  {game.imageUrl && (
                    <div className="hidden lg:block relative w-full aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={game.imageUrl}
                        alt={game.title}
                        fill
                        sizes="(max-width: 1024px) 0vw, 389px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Description */}
                  <div
                    className="rounded-lg p-3"
                    style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
                  >
                    <h3 className="mb-2 text-base sm:text-lg md:text-xl font-semibold text-white">About Project</h3>

                    {/* Status, Dates, and Duration */}
                    <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      {game.status && (
                        <div className="flex items-center gap-1.5 text-gray-200 text-xs sm:text-sm border-r border-white/10 pr-2 last:border-0 last:pr-0">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>{game.status}</span>
                        </div>
                      )}
                      <CalendarDisplay
                        startDate={game.startDate}
                        endDate={game.lastDate}
                        showDuration={true}
                        variant="stacked"
                        className="text-gray-200"
                        scale={.85}
                        iconColor="rgb(229 231 235)"
                      />
                    </div>

                    <p className="text-gray-200 leading-tight whitespace-pre-line text-xs sm:text-sm md:text-sm font-body">{game.description}</p>
                  </div>

                  {/* Tags */}
                  {(game.genres?.length || game.platforms?.length || game.tools?.length || game.othertags?.length) && (
                    <div
                      className="rounded-lg p-4"
                      style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
                    >
                      <button
                        onClick={() => setShowTags(!showTags)}
                        className="mb-3 flex w-full items-center justify-between lg:pointer-events-none"
                        type="button"
                      >
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4" style={{ color: THEME_PRIMARY }} />
                          <h3 className="text-base sm:text-lg md:text-xl font-semibold uppercase tracking-wide text-white">Tags</h3>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-400 transition-transform lg:hidden ${showTags ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div className={`${showTags ? 'block' : 'hidden'} lg:block space-y-4`}>
                        {/* Genre Tags */}
                        {game.genres && game.genres.length > 0 && (
                          <div>
                            <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Genre</h4>
                            <div className="flex flex-wrap gap-2">
                              {game.genres.map((tag, index) => (
                                <span
                                  key={index}
                                  className="rounded-full px-3 py-1 text-xs font-medium"
                                  style={{
                                    backgroundColor: THEME_PRIMARY + '20',
                                    color: THEME_PRIMARY,
                                    border: `1px solid ${THEME_PRIMARY}40`,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Platform Tags */}
                        {game.platforms && game.platforms.length > 0 && (
                          <div>
                            <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Platforms</h4>
                            <div className="flex flex-wrap gap-2">
                              {game.platforms.map((tag, index) => (
                                <span
                                  key={index}
                                  className="rounded-full px-3 py-1 text-xs font-medium"
                                  style={{
                                    backgroundColor: THEME_PRIMARY + '20',
                                    color: THEME_PRIMARY,
                                    border: `1px solid ${THEME_PRIMARY}40`,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tools Tags */}
                        {game.tools && game.tools.length > 0 && (
                          <div>
                            <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Tools</h4>
                            <div className="flex flex-wrap gap-2">
                              {game.tools.map((tag, index) => (
                                <span
                                  key={index}
                                  className="rounded-full px-3 py-1 text-xs font-medium"
                                  style={{
                                    backgroundColor: THEME_PRIMARY + '20',
                                    color: THEME_PRIMARY,
                                    border: `1px solid ${THEME_PRIMARY}40`,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Other Tags */}
                        {game.othertags && game.othertags.length > 0 && (
                          <div>
                            <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Other</h4>
                            <div className="flex flex-wrap gap-2">
                              {game.othertags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="rounded-full px-3 py-1 text-xs font-medium"
                                  style={{
                                    backgroundColor: THEME_PRIMARY + '20',
                                    color: THEME_PRIMARY,
                                    border: `1px solid ${THEME_PRIMARY}40`,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Role & Position */}
                  {(game.role || game.roleDetails) && (
                    <div
                      className="rounded-lg p-4"
                      style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
                    >
                      <h3 className="mb-4 text-base sm:text-lg md:text-xl font-semibold text-white">Role & Position</h3>
                      <div className="space-y-3">
                        {game.role && (
                          <button
                            onClick={() => setShowRoleDetails(!showRoleDetails)}
                            className="flex w-full items-center gap-2 text-left lg:pointer-events-none"
                            type="button"
                            style={{ color: THEME_PRIMARY }}
                          >
                            <Users className="h-4 w-4" />
                            <span className="text-gray-300 text-xs sm:text-sm">{game.role}</span>
                            {game.roleDetails && (
                              <ChevronDown
                                className={`ml-auto h-4 w-4 text-gray-400 transition-transform lg:hidden ${showRoleDetails ? 'rotate-180' : ''}`}
                              />
                            )}
                          </button>
                        )}
                        {game.roleDetails && (
                          <div className={`${showRoleDetails ? 'block' : 'max-lg:hidden'} lg:block`}>
                            <p className="text-gray-300 text-xs sm:text-sm md:text-sm leading-relaxed whitespace-pre-line">{game.roleDetails}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Working for / Working while studying */}
                  {(game.client || game.badges?.school) && (
                    <div
                      className="rounded-lg p-4"
                      style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
                    >
                      <h3 className="mb-4 text-base sm:text-lg md:text-xl font-semibold text-white">
                        {game.client === 'Coursework'
                          ? 'Developed for'
                          : 'Developed at'}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-orange-400">
                          <Building2 className="h-4 w-4" />
                          {game.badges?.clientLink ? (
                            <a
                              href={game.badges.clientLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors underline underline-offset-4 decoration-white/40 hover:decoration-white/70"
                            >
                              {game.badges?.client || game.client}
                            </a>
                          ) : (
                            <span className="text-gray-300 text-xs sm:text-sm">
                              {game.badges?.client || game.client}
                            </span>
                          )}
                        </div>
                        {game.badges?.collaboration && (
                          <div className="flex items-center gap-2 text-blue-400">
                            <Handshake className="h-4 w-4" />
                            {game.badges?.collaborationLink ? (
                              <a
                                href={game.badges.collaborationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors underline underline-offset-4 decoration-white/40 hover:decoration-white/70"
                              >
                                In collaboration with {game.badges.collaboration}
                              </a>
                            ) : (
                              <span className="text-gray-300 text-xs sm:text-sm">
                                In collaboration with {game.badges.collaboration}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Team Members */}
                  {(game.teamMembers && game.teamMembers.length > 0) || game.badges?.teamSize ? (
                    <div
                      className="rounded-lg p-4"
                      style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
                    >
                      <button
                        onClick={() => setShowTeam(!showTeam)}
                        className="mb-4 flex w-full items-center justify-between lg:pointer-events-none"
                        type="button"
                      >
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">Team</h3>
                        <div className="flex items-center gap-2">
                          {game.teamMembers && game.teamMembers.length > 0 ? (
                            <span className="text-xs sm:text-sm text-gray-400" style={{ color: THEME_PRIMARY }}>
                              {game.teamMembers.length} {game.teamMembers.length === 1 ? 'Member' : 'Members'}
                            </span>
                          ) : game.badges?.teamSize ? (
                            <span className="text-xs sm:text-sm text-gray-400" style={{ color: THEME_PRIMARY }}>
                              {game.badges.teamSize} {game.badges.teamSize === 1 ? 'Member' : 'Members'}
                            </span>
                          ) : null}
                          <ChevronDown
                            className={`h-5 w-5 text-gray-400 transition-transform lg:hidden ${showTeam ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </button>
                      <div className={`${showTeam ? 'block' : 'hidden'} lg:block`}>
                        {game.teamMembers && game.teamMembers.length > 0 ? (
                          <div className="space-y-3">
                            {(() => {
                              // Group members by role
                              const roleGroups = game.teamMembers.reduce((acc, member) => {
                                if (!acc[member.role]) {
                                  acc[member.role] = [];
                                }
                                acc[member.role].push(member);
                                return acc;
                              }, {} as Record<string, Array<{ name: string; role: string }>>);

                              // Custom role priority order
                              const rolePriority = ['Producer', 'Designer', 'Programmer', 'Artist', 'Sound', 'QA'];

                              const getRolePriority = (role: string): number => {
                                const roleLower = role.toLowerCase();
                                for (let i = 0; i < rolePriority.length; i++) {
                                  if (roleLower.includes(rolePriority[i].toLowerCase())) {
                                    return i;
                                  }
                                }
                                return rolePriority.length; // Unmatched roles come last
                              };

                              // Sort roles by priority, then alphabetically within same priority
                              return Object.entries(roleGroups)
                                .sort(([roleA], [roleB]) => {
                                  const priorityA = getRolePriority(roleA);
                                  const priorityB = getRolePriority(roleB);
                                  if (priorityA !== priorityB) {
                                    return priorityA - priorityB;
                                  }
                                  return roleA.localeCompare(roleB);
                                })
                                .map(([role, members]) => {
                                  // Sort members by name within each role
                                  const sortedMembers = [...members].sort((a, b) => a.name.localeCompare(b.name));

                                  return (
                                    <div key={role} className="text-xs sm:text-sm">
                                      <p className="text-gray-200 font-medium mb-1">
                                        {role} <span className="text-gray-500">({sortedMembers.length})</span>
                                      </p>
                                      <div className="ml-2 space-y-1">
                                        {sortedMembers.map((member, index) => (
                                          <p key={index} className="text-gray-400 text-xs">
                                            {member.name}
                                          </p>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                });
                            })()}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {/* Awards */}
                  {game.awards && game.awards.length > 0 && (
                    <div
                      className="rounded-lg p-4"
                      style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
                    >
                      <h3 className="mb-4 text-base sm:text-lg md:text-xl font-semibold text-white">Awards</h3>
                      <div className="space-y-4">
                        {game.awards.map((award, index) => {
                          const isAwardObject = typeof award === 'object' && award !== null && 'title' in award;
                          const awardTitle = typeof award === 'string' ? award : (isAwardObject ? award.title : '');
                          const awardLink = isAwardObject ? award.link : undefined;
                          const awardCover = isAwardObject ? award.cover : undefined;
                          const awardTitleClassName = `text-gray-300 text-xs sm:text-sm md:text-base${awardLink ? ' underline underline-offset-4 decoration-white/40 hover:decoration-white/70' : ''}`;

                          const awardContent = (
                            <div className="flex items-start gap-3">
                              <div className="flex-1">
                                {awardCover ? (
                                  <div className="space-y-2">
                                    <div className="relative w-full aspect-video rounded overflow-hidden border border-white/10">
                                      <Image
                                        src={awardCover}
                                        alt={awardTitle}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 389px"
                                        className="object-cover"
                                      />
                                    </div>
                                    <span className={`${awardTitleClassName} block`}>{awardTitle}</span>
                                  </div>
                                ) : (
                                  <span className={awardTitleClassName}>{awardTitle}</span>
                                )}
                              </div>
                            </div>
                          );

                          return awardLink ? (
                            <a
                              key={index}
                              href={awardLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block transition-opacity hover:opacity-80"
                            >
                              {awardContent}
                            </a>
                          ) : (
                            <div key={index}>
                              {awardContent}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Collaborate */}
                  {game.badges?.partner && (
                    <div
                      className="rounded-lg p-4"
                      style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
                    >
                      <h3 className="mb-4 text-base sm:text-lg md:text-xl font-semibold text-white">Collaborate</h3>
                      <div className="flex items-center gap-2 text-orange-400">
                        <Handshake className="h-4 w-4" />
                        <span className="text-gray-300 text-xs sm:text-sm">{game.badges.partner}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Media Viewer Modal */}
          {selectedMediaIndex !== null && displayMedia[selectedMediaIndex] && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
              onClick={() => setSelectedMediaIndex(null)}
              style={{ fontFamily: THEME_FONT_PRIMARY }}
            >
              {/* Content container */}
              <div
                className="relative w-[90vw] max-w-6xl rounded-lg bg-gray-900/50 backdrop-blur-sm shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Title bar at top */}
                {displayMedia[selectedMediaIndex].title && (
                  <div className="relative bg-gray-800/95 px-4 py-3 flex items-center justify-center border-b border-gray-700/50">
                    <p className="text-white font-semibold text-center text-sm sm:text-base md:text-lg">{displayMedia[selectedMediaIndex].title}</p>
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
                      controlsList="nodownload"
                      autoPlay
                      preload="auto"
                      className="w-full h-full object-contain pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : displayMedia[selectedMediaIndex].type === 'youtube' ? (
                    <div className="relative w-full h-full">
                      <iframe
                        src={getYouTubeEmbedUrl(displayMedia[selectedMediaIndex].url) || ''}
                        className="absolute inset-0 w-full h-full pointer-events-auto"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={displayMedia[selectedMediaIndex].title || 'YouTube video'}
                      />
                    </div>
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
                    <p className="text-gray-300 text-xs sm:text-sm">
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
        </PageLayout>
      </div>
    </div>
  );
}

