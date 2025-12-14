'use client';

import {
  Trophy,
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
import { Game, FeatureDetailItem } from './GameCard';
import {
  ThemeHeading,
  ThemeDetail,
} from './ThemeBox';
import { PageLayout } from './PageLayout';
import { ItchWidget } from './ItchWidget';
import {
  THEME_PRIMARY_BORDER,
  THEME_PRIMARY,
  THEME_PANEL_BG,
  THEME_FONT_PRIMARY,
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

// Helper function to calculate duration between dates
const calculateDuration = (startDate?: string, lastDate?: string): string => {
  if (!startDate || !lastDate) return '';
  
  try {
    const monthMap: { [key: string]: number } = {
      'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
      'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
    };
    
    const parseDate = (dateStr: string): Date => {
      const [monthStr, year] = dateStr.split('/');
      const month = monthMap[monthStr] || parseInt(monthStr);
      if (isNaN(month) || isNaN(parseInt(year))) {
        throw new Error('Invalid date format');
      }
      return new Date(parseInt(year), month - 1, 1);
    };
    
    const start = parseDate(startDate);
    const end = parseDate(lastDate);
    
    // Calculate difference in months more accurately
    const yearsDiff = end.getFullYear() - start.getFullYear();
    const monthsDiff = end.getMonth() - start.getMonth();
    const totalMonths = yearsDiff * 12 + monthsDiff;
    
    if (totalMonths < 0) return '';
    if (totalMonths === 0) return 'Less than 1 month';
    if (totalMonths < 12) {
      return `${totalMonths} month${totalMonths > 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      if (months === 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
      }
      return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
    }
  } catch {
    return '';
  }
};

export function GameDetailPage({ game }: GameDetailPageProps) {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const [mainMediaIndex, setMainMediaIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [showAllFeatures, setShowAllFeatures] = useState<boolean>(false);
  
  const duration = calculateDuration(game.startDate, game.lastDate);
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
        <div
          className="sticky top-0 z-10 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(10,13,17,0.9)', borderBottom: `1px solid ${THEME_PRIMARY_BORDER}` }}
        >
          <div className="mx-auto max-w-7xl px-4 md:px-8 py-4" style={{ fontFamily: THEME_FONT_PRIMARY }}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Projects</span>
            </Link>
          </div>
        </div>

        <div className="min-h-screen relative z-10">
        {/* Main Content - Steam Style Layout */}
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-6 sm:px-6 lg:px-8" style={{ fontFamily: THEME_FONT_PRIMARY }}>
        {/* Game Title - Moved to top */}
        <h1 className="text-3xl font-bold text-white mb-0">{game.title}</h1>
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
            {/* Itch.io Widget - Only for TinyTuna */}
            {game.id === '5' && (
              <ItchWidget
                embedId="4074544"
                gameUrl="https://laripsspiral.itch.io/tiny-tuna"
                gameName="TinyTuna"
                authorName="LaripsSpiral"
              />
            )}

            {/* Features Worked On */}
            {game.features && game.features.length > 0 && (
              <div>
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
                >
                  <h2 className="mb-2 text-2xl font-bold text-white">Features</h2>
                  <div className="space-y-6">
                    {game.features.map((feature, index) => {
                      // Show only first 2 features initially, or all if showAllFeatures is true
                      const INITIAL_FEATURES_COUNT = 2;
                      if (!showAllFeatures && index >= INITIAL_FEATURES_COUNT) {
                        return null;
                      }
                      
                      const featureDetail = game.featureDetails?.[index];
                      
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
                        const textSize = isSubLevel ? 'text-xs' : 'text-sm';
                        
                        return (
                          <div className={isSubLevel ? 'ml-4 mt-2' : ''}>
                            <ThemeHeading 
                              as="p" 
                              className={`${isSubLevel ? 'text-sm' : 'text-base'} font-semibold text-white mb-2`}
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
                                ) : null}
                              </div>
                            )}
                          </div>
                        );
                      };
                      
                      return (
                        <div
                          key={index}
                        >
                          <div className="space-y-2">
                            {renderFeatureDetail(featureDetail)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* View More / View Less Button */}
                  {game.features.length > 2 && (
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
                            <span>View More ({game.features.length - 2} more)</span>
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
              className="rounded-lg p-4"
              style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
            >
              <h3 className="mb-3 text-lg font-semibold text-white">About Project</h3>
              
              {/* Status, Dates, and Duration */}
              <div className="mb-4 space-y-2">
                {game.status && (
                  <div className="flex items-center gap-2 text-gray-200 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>{game.status}</span>
                  </div>
                )}
                {(game.startDate || game.lastDate) && (
                  <div className="flex items-center gap-2 text-gray-200 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {game.lastDate 
                        ? `${game.startDate || ''}${game.startDate ? ' to ' : ''}${game.lastDate}`
                        : game.startDate || game.lastDate}
                    </span>
                  </div>
                )}
                {duration && (
                  <div className="flex items-center gap-2 text-gray-200 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Duration: {duration}</span>
                  </div>
                )}
              </div>
              
              <p className="text-gray-200 leading-relaxed whitespace-pre-line text-sm">{game.description}</p>
            </div>

            {/* Tags */}
            {(game.genres?.length || game.platforms?.length || game.tools?.length || game.tags?.length) && (
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
                    <h3 className="text-lg font-semibold uppercase tracking-wide text-white">Tags</h3>
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
                  {game.tags && game.tags.length > 0 && (
                    <div>
                      <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Other</h4>
                      <div className="flex flex-wrap gap-2">
                        {game.tags.map((tag, index) => (
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
                <h3 className="mb-4 text-lg font-semibold text-white">Role & Position</h3>
                <div className="space-y-3">
                  {game.role && (
                    <button
                      onClick={() => setShowRoleDetails(!showRoleDetails)}
                      className="flex w-full items-center gap-2 text-left lg:pointer-events-none"
                      type="button"
                      style={{ color: THEME_PRIMARY }}
                    >
                      <Users className="h-4 w-4" />
                      <span className="text-gray-300 text-sm">{game.role}</span>
                      {game.roleDetails && (
                        <ChevronDown 
                          className={`ml-auto h-4 w-4 text-gray-400 transition-transform lg:hidden ${showRoleDetails ? 'rotate-180' : ''}`}
                        />
                      )}
                    </button>
                  )}
                  {game.roleDetails && (
                    <div className={`${showRoleDetails ? 'block' : 'max-lg:hidden'} lg:block`}>
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{game.roleDetails}</p>
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
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {game.badges?.school || game.client === 'Academic Project'
                    ? 'Academic Project at'
                    : 'Working for'}
                </h3>
                <div className="flex items-center gap-2 text-orange-400">
                  <Building2 className="h-4 w-4" />
                  <span className="text-gray-300 text-sm">
                    {game.badges?.school || game.client === 'Academic Project'
                      ? 'Bangkok University'
                      : game.client}
                  </span>
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
                  <h3 className="text-lg font-semibold text-white">Team</h3>
                  <div className="flex items-center gap-2">
                    {game.teamMembers && game.teamMembers.length > 0 ? (
                      <span className="text-sm text-gray-400" style={{ color: THEME_PRIMARY }}>
                        {game.teamMembers.length} {game.teamMembers.length === 1 ? 'Member' : 'Members'}
                      </span>
                    ) : game.badges?.teamSize ? (
                      <span className="text-sm text-gray-400" style={{ color: THEME_PRIMARY }}>
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
                            <div key={role} className="text-sm">
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

            {/* Collaborate */}
            {game.badges?.partner && (
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
              >
                <h3 className="mb-4 text-lg font-semibold text-white">Collaborate</h3>
                <div className="flex items-center gap-2 text-orange-400">
                  <Handshake className="h-4 w-4" />
                  <span className="text-gray-300 text-sm">{game.badges.partner}</span>
                </div>
              </div>
            )}

            {/* Awards */}
            {game.awards && game.awards.length > 0 && (
              <div
                className="rounded-lg p-4"
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
                  controlsList="nodownload"
                  autoPlay
                  preload="auto"
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
        </PageLayout>
      </div>
    </div>
  );
}

