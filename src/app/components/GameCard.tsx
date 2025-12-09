'use client';

import Link from 'next/link';
import { Calendar, Star, Trophy, GraduationCap, Users, Handshake } from 'lucide-react';
import { createSlug } from '@/app/lib/project/slug';

export interface GameMedia {
  type: 'video' | 'image' | 'gif';
  url: string;
  thumbnail?: string;
  title?: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  genre: string;
  platform: string;
  releaseYear: string;
  imageUrl: string;
  tags: string[];
  role?: string;
  roleDetails?: string;
  status?: string;
  starred?: boolean;
  features?: string[];
  awards?: string[];
  client?: string;
  media?: GameMedia[];
  badges?: {
    star?: boolean;
    trophy?: boolean;
    school?: boolean;
    teamSize?: number;
    partner?: string;
  };
}

interface GameCardProps {
  game: Game;
  onClick?: () => void;
  isSelected?: boolean;
}

export function GameCard({ game, onClick, isSelected = false }: GameCardProps) {
  const slug = createSlug(game.title);
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };
  
  return (
    <Link href={`/projects/${slug}`} className="block">
      <div
        className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-900 shadow-lg transition-transform duration-300 hover:shadow-2xl"
        onClick={handleClick}
      >
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={game.imageUrl}
          alt={game.title}
          className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
            !isSelected ? 'grayscale group-hover:grayscale-0' : ''
          }`}
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 pt-12">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1">
              {game.status && (
                <div className="mb-2 flex items-center gap-2 text-white/90">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{game.status}</span>
                </div>
              )}

              <h3 className="text-white">{game.title}</h3>
            </div>

            {game.badges && (
              <div className="flex flex-wrap items-end justify-end gap-2">
                {game.badges.star && (
                  <div className="flex items-center gap-1 rounded-full bg-yellow-500/20 px-2 py-1 text-xs text-yellow-300">
                    <Star className="h-3 w-3" fill="currentColor" />
                  </div>
                )}
                {game.badges.trophy && (
                  <div className="flex items-center gap-1 rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-300">
                    <Trophy className="h-3 w-3" />
                  </div>
                )}
                {game.badges.school && (
                  <div className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                    <GraduationCap className="h-3 w-3" />
                  </div>
                )}
                {game.badges.teamSize && (
                  <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-300">
                    <Users className="h-3 w-3" />
                    <span>{game.badges.teamSize}</span>
                  </div>
                )}
                {game.badges.partner && (
                  <div className="flex items-center gap-1 rounded-full bg-orange-500/20 px-2 py-1 text-xs text-orange-300">
                    <Handshake className="h-3 w-3" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}

