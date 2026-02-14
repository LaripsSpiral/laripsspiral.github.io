'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Users, Target, ExternalLink, ArrowRight, Github, Play, X } from 'lucide-react';
import { Game, FeatureDetailItem } from './GameCard';
import { createSlug } from '@/app/lib/project/slug';
import {
  ThemeCard,
  ThemeCardHeader,
  ThemeCardBody,
  ThemeTitle,
} from './ThemeBox';
import {
  THEME_PRIMARY,
  THEME_PRIMARY_BORDER,
  THEME_PRIMARY_TINT,
  THEME_FONT_PRIMARY,
  THEME_CATEGORY_SKILLS_BG,
  THEME_CATEGORY_SKILLS_TEXT,
} from '../theme/palette';

interface ProjectOverviewProps {
  game: Game;
}

export function ProjectOverview({ game }: ProjectOverviewProps) {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<FeatureDetailItem['media'] | null>(null);

  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getYouTubeThumbnail = (url: string): string | null => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const getYouTubeEmbedUrl = (url: string): string | null => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  };

  // Convert featureDetails to features array for display
  const features = game.featureDetails?.map((item): { title: string; description: string } => {
    if (typeof item === 'string') {
      return { title: item, description: '' };
    }
    return { title: item.topic, description: item.details.join(' ') };
  }) || [];

  const featureMedia = (game.featureDetails || [])
    .filter((item): item is FeatureDetailItem => typeof item !== 'string')
    .map((item) => item.media)
    .filter((media): media is NonNullable<FeatureDetailItem['media']> => !!media);

  const whatIDidItems = (game.roleDetails || '')
    .split(/\r?\n|\.|;|•|\u2022/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const onCloseOverlay = () => setSelectedMedia(null);

  const overlay = useMemo(() => {
    if (!selectedMedia) return null;
    const type = selectedMedia.type;

    if (type === 'image' || type === 'gif') {
      return (
        <div className="relative w-[min(1100px,96vw)] h-[min(720px,80vh)]">
          <Image
            src={selectedMedia.url}
            alt={selectedMedia.title || 'Media'}
            fill
            sizes="(max-width: 1100px) 96vw, 1100px"
            className="object-contain"
            priority
          />
        </div>
      );
    }

    if (type === 'video') {
      return (
        <video
          src={selectedMedia.url}
          controls
          controlsList="nodownload"
          className="max-h-[80vh] max-w-[96vw] rounded-lg bg-black"
        />
      );
    }

    if (type === 'youtube') {
      const embedUrl = getYouTubeEmbedUrl(selectedMedia.url);
      return (
        <div className="relative w-[min(1100px,96vw)] aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            src={embedUrl || ''}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={selectedMedia.title || 'YouTube video'}
          />
        </div>
      );
    }

    return null;
  }, [selectedMedia]);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 lg:px-8" style={{ fontFamily: THEME_FONT_PRIMARY }}>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ color: THEME_PRIMARY }}
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Projects
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:w-1/3 space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={game.imageUrl}
                alt={game.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              {game.status && (
                <div className="absolute top-4 right-4">
                  <span
                    className="px-3 py-1 rounded text-xs uppercase font-bold bg-black/50 text-white border border-white/30"
                  >
                    {game.status}
                  </span>
                </div>
              )}
            </div>

            {featureMedia.length > 0 && (
              <div
                className="rounded-lg border p-3"
                style={{ borderColor: THEME_PRIMARY_BORDER, backgroundColor: 'rgba(0,0,0,0.18)' }}
              >
                <h3 className="text-sm font-semibold text-white mb-3">Feature Highlights</h3>
                <div className="grid grid-cols-2 gap-2">
                  {featureMedia.slice(0, 4).map((media, index) => {
                    const thumbnail =
                      media.type === 'youtube'
                        ? (media.thumbnail || getYouTubeThumbnail(media.url) || game.imageUrl)
                        : (media.thumbnail || media.url);

                    return (
                      <button
                        type="button"
                        key={index}
                        className="relative aspect-video overflow-hidden rounded-md border"
                        style={{ borderColor: `${THEME_PRIMARY}30` }}
                        onClick={() => setSelectedMedia(media)}
                      >
                        <Image
                          src={thumbnail}
                          alt={media.title || `Feature ${index + 1}`}
                          fill
                          sizes="(max-width: 1024px) 50vw, 16vw"
                          className="object-cover"
                        />
                        {(media.type === 'video' || media.type === 'youtube') && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                            <Play className="h-6 w-6 text-white" fill="currentColor" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="lg:w-2/3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {game.title}
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
              {game.description}
            </p>

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {game.role && (
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5" style={{ color: THEME_PRIMARY }} />
                  <div>
                    <p className="text-xs text-gray-400">Role</p>
                    <p className="text-sm text-white">{game.role}</p>
                  </div>
                </div>
              )}
              
              {game.startDate && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" style={{ color: THEME_PRIMARY }} />
                  <div>
                    <p className="text-xs text-gray-400">Timeline</p>
                    <p className="text-sm text-white">
                      {game.startDate} - {game.lastDate || 'Present'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Technologies */}
            {game.tools && game.tools.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {game.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="rounded-md px-3 py-1 text-sm"
                      style={{
                        backgroundColor: THEME_PRIMARY_TINT,
                        border: `1px solid ${THEME_PRIMARY_BORDER}`,
                        color: THEME_PRIMARY,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/projects/${createSlug(game.title)}?view=all`}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                style={{
                  backgroundColor: THEME_PRIMARY,
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = THEME_PRIMARY_TINT;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = THEME_PRIMARY;
                }}
              >
                <Target className="h-4 w-4" />
                View Full Details
              </Link>
              
              {game.gameLink && (
                <a
                  href={game.gameLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-colors"
                  style={{
                    borderColor: THEME_PRIMARY_BORDER,
                    color: THEME_PRIMARY,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${THEME_PRIMARY}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Play className="h-4 w-4" />
                  Play Game
                </a>
              )}
              
              {game.websiteLink && (
                <a
                  href={game.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-colors"
                  style={{
                    borderColor: THEME_PRIMARY_BORDER,
                    color: THEME_PRIMARY,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${THEME_PRIMARY}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {whatIDidItems.length > 0 && (
        <ThemeCard>
          <ThemeCardHeader style={{ backgroundColor: THEME_CATEGORY_SKILLS_BG }}>
            <ThemeTitle style={{ color: THEME_CATEGORY_SKILLS_TEXT, fontSize: '0.875rem', fontWeight: '700' }}>
              KEY TASKS
            </ThemeTitle>
          </ThemeCardHeader>
          <ThemeCardBody style={{ backgroundColor: 'rgba(255, 193, 7, 0.05)' }}>
            <ul className="grid gap-2" style={{ listStyle: 'none', paddingLeft: 0 }}>
              {whatIDidItems.slice(0, 8).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: THEME_PRIMARY }} />
                  <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </ThemeCardBody>
        </ThemeCard>
      )}

      {/* Key Features */}
      {features.length > 0 && (
        <ThemeCard>
          <ThemeCardHeader style={{ backgroundColor: THEME_CATEGORY_SKILLS_BG }}>
            <ThemeTitle style={{ color: THEME_CATEGORY_SKILLS_TEXT, fontSize: '0.875rem', fontWeight: '700' }}>
              KEY FEATURES
            </ThemeTitle>
          </ThemeCardHeader>
          <ThemeCardBody style={{ backgroundColor: 'rgba(255, 193, 7, 0.05)' }}>
            <div className="grid gap-3 sm:gap-4">
              {(showAllFeatures ? features : features.slice(0, 3)).map((feature, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div 
                    className="mt-1 h-2 w-2 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: THEME_PRIMARY }} 
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{feature.title}</h4>
                    {feature.description && (
                      <p className="text-sm text-gray-300 leading-relaxed">{feature.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {features.length > 3 && (
              <div className="mt-4 pt-4 border-t" style={{ borderColor: THEME_PRIMARY_BORDER }}>
                <button
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                  style={{ color: THEME_PRIMARY }}
                >
                  {showAllFeatures ? 'Show Less' : `Show ${features.length - 3} More Features`}
                  <ArrowRight className={`h-4 w-4 ${showAllFeatures ? 'rotate-90' : ''}`} />
                </button>
              </div>
            )}
          </ThemeCardBody>
        </ThemeCard>
      )}

      {/* Genres and Play Modes */}
      <div className="grid gap-6 sm:grid-cols-2 mt-6">
        {game.genres && game.genres.length > 0 && (
          <ThemeCard>
            <ThemeCardHeader style={{ backgroundColor: THEME_CATEGORY_SKILLS_BG }}>
              <ThemeTitle style={{ color: THEME_CATEGORY_SKILLS_TEXT, fontSize: '0.875rem', fontWeight: '700' }}>
                GENRES
              </ThemeTitle>
            </ThemeCardHeader>
            <ThemeCardBody style={{ backgroundColor: 'rgba(255, 193, 7, 0.05)' }}>
              <div className="flex flex-wrap gap-2">
                {game.genres.map((genre, index: number) => (
                  <span
                    key={index}
                    className="rounded-md px-3 py-1 text-sm"
                    style={{
                      backgroundColor: THEME_PRIMARY_TINT,
                      border: `1px solid ${THEME_PRIMARY_BORDER}`,
                      color: THEME_PRIMARY,
                    }}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </ThemeCardBody>
          </ThemeCard>
        )}

        {game.playModes && game.playModes.length > 0 && (
          <ThemeCard>
            <ThemeCardHeader style={{ backgroundColor: THEME_CATEGORY_SKILLS_BG }}>
              <ThemeTitle style={{ color: THEME_CATEGORY_SKILLS_TEXT, fontSize: '0.875rem', fontWeight: '700' }}>
                PLAY MODES
              </ThemeTitle>
            </ThemeCardHeader>
            <ThemeCardBody style={{ backgroundColor: 'rgba(255, 193, 7, 0.05)' }}>
              <div className="flex flex-wrap gap-2">
                {game.playModes.map((mode, index: number) => (
                  <span
                    key={index}
                    className="rounded-md px-3 py-1 text-sm"
                    style={{
                      backgroundColor: THEME_PRIMARY_TINT,
                      border: `1px solid ${THEME_PRIMARY_BORDER}`,
                      color: THEME_PRIMARY,
                    }}
                  >
                    {mode}
                  </span>
                ))}
              </div>
            </ThemeCardBody>
          </ThemeCard>
        )}
      </div>

      {selectedMedia && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={onCloseOverlay}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-3 -right-3 rounded-full p-2 text-white border"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)', borderColor: `${THEME_PRIMARY}40` }}
              onClick={onCloseOverlay}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            {overlay}
          </div>
        </div>
      )}
    </div>
  );
}
