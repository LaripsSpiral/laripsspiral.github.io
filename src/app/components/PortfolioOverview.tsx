'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Users, Target, ExternalLink, Play, X, GraduationCap, Handshake } from 'lucide-react';
import { createSlug } from '@/app/lib/project/slug';
import { FeatureDetailItem, Game } from './GameCard';
import {
  THEME_PRIMARY,
  THEME_PRIMARY_BORDER,
  THEME_PRIMARY_TINT,
  THEME_FONT_PRIMARY,
} from '../theme/palette';

interface PortfolioOverviewProps {
  games: Game[];
}

export function PortfolioOverview({ games }: PortfolioOverviewProps) {
  const [selectedMedia, setSelectedMedia] = useState<FeatureDetailItem['media'] | null>(null);

  const calculateDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else {
      return `${months} month${months > 1 ? 's' : ''}`;
    }
  };

  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getYouTubeEmbedUrl = (url: string): string | null => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  };

  const getYouTubeThumbnail = (url: string): string | null => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

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

  if (!games || games.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ fontFamily: THEME_FONT_PRIMARY }}>
        <p className="text-gray-400">No projects available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: THEME_FONT_PRIMARY }}>
      {/* Background with gradient and blur */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${THEME_PRIMARY_TINT} 0%, transparent 50%), 
                        radial-gradient(circle at 70% 80%, rgba(95, 80, 72, 0.2) 0%, transparent 50%),
                        linear-gradient(180deg, #0b0f14 0%, #0a0d11 60%, #06080c 100%)`
          }}
        />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Project Showcase - Vertical Layout */}
        <div className="px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-16">
            {[...games].sort((a, b) => {
              // Sort starred projects first
              const aHasStar = a.badges?.star || false;
              const bHasStar = b.badges?.star || false;
              if (aHasStar && !bHasStar) return -1;
              if (!aHasStar && bHasStar) return 1;
              return 0;
            }).map((game) => {
              const featureMedia = (game.featureDetails || [])
                .filter((item): item is FeatureDetailItem => typeof item !== 'string')
                .map((item) => item.media)
                .filter((media): media is NonNullable<FeatureDetailItem['media']> => !!media);

              return (
                <div key={game.title} className="rounded-2xl border overflow-hidden bg-black/10" style={{ borderColor: `${THEME_PRIMARY}20` }}>
                  <div className="p-6 sm:p-8">
                    <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
                      <div className="lg:col-span-5 space-y-3">
                        <div className="relative aspect-video overflow-hidden rounded-xl border bg-black/5" style={{ borderColor: `${THEME_PRIMARY}20` }}>
                          <Image
                            src={game.imageUrl}
                            alt={game.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover"
                          />

                          {game.status && (
                            <div className="absolute top-3 right-3">
                              <span
                                className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 text-white border border-white/30 backdrop-blur-sm"
                              >
                                {game.status}
                              </span>
                            </div>
                          )}
                        </div>

                        {featureMedia.length > 0 && (
                          <div className="rounded-xl border p-3 bg-black/5" style={{ borderColor: `${THEME_PRIMARY}20` }}>
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Feature Highlights</p>
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
                                    className="relative aspect-video overflow-hidden rounded-lg border"
                                    style={{ borderColor: `${THEME_PRIMARY}25` }}
                                    title={media.title}
                                    onClick={() => setSelectedMedia(media)}
                                  >
                                    <Image
                                      src={thumbnail}
                                      alt={media.title || `Feature ${index + 1}`}
                                      fill
                                      sizes="(max-width: 1024px) 50vw, 160px"
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

                      <div className="lg:col-span-7 space-y-4">
                        <div>
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 flex items-center gap-2">
                            {game.badges?.star && (
                              <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-7 h-7 text-yellow-400"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            )}
                            {game.title}
                          </h2>
                          <p className="text-sm text-gray-300 leading-relaxed">{game.description}</p>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
                          {/* Left side - Key Tasks */}
                          <div className="lg:col-span-5">
                            {/* Key Tasks / Features */}
                            {game.featureDetails && game.featureDetails.length > 0 && (
                              <div>
                                <h4 className="text-xs font-semibold text-white mb-2">Key Tasks</h4>
                                <ul className="space-y-1">
                                  {game.featureDetails.map((feature, index) => {
                                    const item = typeof feature === 'string' ? feature : feature.topic;
                                    return (
                                      <li key={index} className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: THEME_PRIMARY }} />
                                        <span className="text-sm text-gray-300">{item}</span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Right side - Role, Timeline, Technologies, Buttons */}
                          <div className="lg:col-span-7 space-y-4">
                            <div className="flex flex-wrap gap-3">
                              {game.role && (
                                <div className="flex items-center gap-3">
                                  <Users className="h-5 w-5" style={{ color: THEME_PRIMARY }} />
                                  <div>
                                    <p className="text-xs text-white font-medium">{game.role}</p>
                                    {game.badges?.teamSize && (
                                      <p className="text-xs text-gray-400">Team Size: {game.badges.teamSize}</p>
                                    )}
                                  </div>
                                </div>
                              )}

                              {game.startDate && (
                                <div className="flex items-center gap-3">
                                  <Calendar className="h-5 w-5" style={{ color: THEME_PRIMARY }} />
                                  <div>
                                    <p className="text-xs text-white font-medium">
                                      {game.startDate} - {game.lastDate || 'Present'}
                                    </p>
                                    {game.lastDate && (
                                      <p className="text-xs text-gray-400">
                                        Duration: {calculateDuration(game.startDate, game.lastDate)}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}

                              {game.badges?.school && (
                                <div className="flex items-center gap-3">
                                  <GraduationCap className="h-5 w-5 text-blue-400" />
                                  <div>
                                    <p className="text-xs text-white font-medium">Developed at</p>
                                    <p className="text-xs text-gray-400">
                                      {game.badges.school ? 'Bangkok University' : game.client || 'Independent'}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {game.badges?.collaboration && (
                                <div className="flex items-center gap-3">
                                  <Handshake className="h-5 w-5 text-purple-400" />
                                  <div>
                                    <p className="text-xs text-white font-medium">Collaboration</p>
                                    <p className="text-xs text-gray-400">
                                      {game.badges.collaboration}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {game.awards && game.awards.length > 0 && (
                                <div>
                                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Awards</p>
                                  <div className="space-y-0.5">
                                    {game.awards.map((award, index) => (
                                      <div key={index} className="flex items-center gap-3">
                                        <div className="flex-1">
                                          {typeof award === 'string' ? (
                                            <p className="text-sm text-gray-300 underline">{award}</p>
                                          ) : (
                                            <a
                                              href={award.link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-sm text-gray-300 hover:text-white transition-colors underline"
                                            >
                                              {award.title}
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            {game.tools && game.tools.length > 0 && (
                                <div>
                                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Technologies</p>
                                  <div className="flex flex-wrap gap-2">
                                    {game.tools.slice(0, 10).map((tool, index) => (
                                      <span
                                        key={index}
                                        className="px-3 py-1 rounded-full text-sm font-medium"
                                        style={{
                                          backgroundColor: `${THEME_PRIMARY}20`,
                                          border: `1px solid ${THEME_PRIMARY}`,
                                          color: THEME_PRIMARY,
                                        }}
                                      >
                                        {tool}
                                      </span>
                                    ))}
                                    {game.tools.length > 10 && (
                                      <span className="text-gray-400 text-sm">+{game.tools.length - 10} more</span>
                                    )}
                                  </div>
                                </div>
                              )}

                          </div>
                          
                            <div className="flex gap-3 justify-start">
                              <Link
                                href={`/projects/${createSlug(game.title)}?view=all`}
                                className="flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all transform hover:scale-105 bg-gray-200 text-gray-900 hover:bg-gray-300 text-sm"
                              >
                                <div className="relative w-3.5 h-3.5">
                                  <div className="absolute inset-0 rounded-full border-2 border-gray-600"></div>
                                  <div className="absolute inset-1 rounded-full border border-gray-400"></div>
                                </div>
                                Details
                              </Link>

                              {game.gameLink && (
                                <a
                                  href={game.gameLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 rounded-md font-medium border transition-all transform hover:scale-105 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 text-sm"
                                >
                                  <Play className="h-3.5 w-3.5" />
                                  Play
                                </a>
                              )}

                              {game.websiteLink && (
                                <a
                                  href={game.websiteLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 rounded-md font-medium border transition-all transform hover:scale-105 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 text-sm"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                  Website
                                </a>
                              )}
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
