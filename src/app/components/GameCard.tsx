'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Star, Trophy, GraduationCap, Users, Handshake, Building2, CheckCircle, Globe, ExternalLink } from 'lucide-react';
import { createSlug } from '@/app/lib/project/slug';
import { ThemeBadge } from './ThemeBox';
import { THEME_FONT_PRIMARY } from '../theme/palette';

export interface GameMedia {
  type: 'video' | 'image' | 'gif' | 'youtube';
  url: string;
  thumbnail?: string;
  title?: string;
}

export interface FeatureDetailItem {
  topic: string;
  details: string[];
  media?: {
    type: 'image' | 'gif' | 'video' | 'youtube';
    url: string;
    title?: string;
    thumbnail?: string;
  };
  subTopics?: FeatureDetailItem[];
}

export interface Game {
  title: string;
  description: string;
  imageUrl: string;
  genres?: string[];
  playModes?: string[];
  platforms?: string[];
  tools?: string[];
  othertags?: string[];
  role?: string;
  roleDetails?: string;
  status?: string;
  startDate?: string;
  lastDate?: string;
  featureDetails?: (string | FeatureDetailItem)[];
  awards?: (string | { title: string; link?: string; cover?: string })[];
  client?: string;
  media?: GameMedia[];
  wallpaper?: string;
  teamMembers?: Array<{
    name: string;
    role: string;
  }>;
  badges?: {
    star?: boolean;
    trophy?: boolean;
    school?: boolean;
    teamSize?: number;
    partner?: string;
    client?: string;
    clientLink?: string;
    collaboration?: string;
    collaborationLink?: string;
  };
  gameLink?: string;
  websiteLink?: string;
}

interface GameCardProps {
  game: Game;
  onClick?: () => void;
  isSelected?: boolean;
  view?: 'overview' | 'all';
}

export function GameCard({ game, onClick, isSelected = false, view = 'overview' }: GameCardProps) {
  const slug = createSlug(game.title);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link href={`/projects/${slug}${view === 'all' ? '?view=all' : ''}`} className="block">
      <div
        className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-900 shadow-lg transition-transform duration-300 hover:shadow-2xl"
        onClick={handleClick}
        style={{ fontFamily: THEME_FONT_PRIMARY }}
      >
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={game.imageUrl}
            alt={game.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${!isSelected ? 'grayscale group-hover:grayscale-0' : ''
              }`}
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 pt-12">
            <div className="flex items-end justify-between gap-4">
              <div className="flex-1 mb-2.5 -ml-2">
                {game.status && (
                  <div className="mb-2">
                    <span className="px-3 py-1 rounded text-xs uppercase font-bold bg-black/50 text-white border border-white/30">
                      {game.status}
                    </span>
                  </div>
                )}
                {(game.startDate || game.lastDate) && (
                  <div className="mb-2 flex items-center gap-2 text-white/90">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-caption">
                      {game.lastDate
                        ? `${game.startDate || ''}${game.startDate ? ' to ' : ''}${game.lastDate}`
                        : game.startDate || game.lastDate}
                    </span>
                  </div>
                )}

                <h3 className="text-white font-header">{game.title}</h3>

                <div className="relative flex-1 max-w-md">
                </div>

                {game.badges?.partner && (
                  <div className="mt-2 flex items-center gap-2 text-white/70 text-xs">
                    <Handshake className="h-3 w-3" />
                    <span>{game.badges.partner}</span>
                  </div>
                )}

                <div className="mt-2 flex items-center gap-3 flex-wrap">
                  {(game.client || game.badges?.school) && (
                    <div className="flex items-center gap-2 text-white/70 text-xs">
                      <Building2 className="h-3 w-3" />
                      <span>
                        {game.badges?.school || game.client === 'Academic Project'
                          ? 'Bangkok University'
                          : game.client}
                      </span>
                    </div>
                  )}
                  {game.role && (
                    <div className="flex items-center gap-2 text-white/70 text-xs">
                      <Users className="h-3 w-3" />
                      <span>{game.role}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {game.badges && (
          <div className="absolute bottom-0 right-0 flex flex-row items-center justify-end gap-2 p-2">
            {game.badges.star && (
              <ThemeBadge tone="star">
                <Star className="h-3 w-3" fill="currentColor" />
              </ThemeBadge>
            )}
            {game.badges.trophy && (
              <ThemeBadge tone="trophy">
                <Trophy className="h-3 w-3" />
              </ThemeBadge>
            )}
            {game.badges.school && (
              <ThemeBadge tone="school">
                <GraduationCap className="h-3 w-3" />
              </ThemeBadge>
            )}
            {game.badges.client && (
              <ThemeBadge tone="partner">
                <Building2 className="h-3 w-3" />
                {game.badges.client.split(' | ')[0]}
              </ThemeBadge>
            )}
            {game.badges.collaboration && (
              <ThemeBadge tone="team">
                <Handshake className="h-3 w-3" />
                {game.badges.collaboration.split(' ')[0]}
              </ThemeBadge>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

