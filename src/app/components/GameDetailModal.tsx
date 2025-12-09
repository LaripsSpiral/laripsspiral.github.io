'use client';

import {
  X,
  Calendar,
  Monitor,
  Gamepad2,
  Star,
  Trophy,
  GraduationCap,
  Users,
  Handshake,
} from 'lucide-react';
import { Game } from './GameCard';

interface GameDetailModalProps {
  game: Game;
  onClose: () => void;
}

export function GameDetailModal({ game, onClose }: GameDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-gray-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative h-96 w-full overflow-hidden">
          <img src={game.imageUrl} alt={game.title} className="h-full w-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent p-8">
            <h2 className="mb-2 text-white">{game.title}</h2>
            <p className="text-gray-300">{game.genre}</p>
          </div>
        </div>

        <div className="p-8">
          {game.badges && (
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {game.badges.star && (
                <div className="flex items-center gap-2 rounded-full bg-yellow-500/20 px-4 py-2 text-yellow-300">
                  <Star className="h-4 w-4" fill="currentColor" />
                  <span>Featured Project</span>
                </div>
              )}
              {game.badges.trophy && (
                <div className="flex items-center gap-2 rounded-full bg-purple-500/20 px-4 py-2 text-purple-300">
                  <Trophy className="h-4 w-4" />
                  <span>Award Winner</span>
                </div>
              )}
              {game.badges.school && (
                <div className="flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-blue-300">
                  <GraduationCap className="h-4 w-4" />
                  <span>Academic Project</span>
                </div>
              )}
              {game.badges.teamSize && (
                <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-green-300">
                  <Users className="h-4 w-4" />
                  <span>Team of {game.badges.teamSize}</span>
                </div>
              )}
              {game.badges.partner && (
                <div className="flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-orange-300">
                  <Handshake className="h-4 w-4" />
                  <span>Partner: {game.badges.partner}</span>
                </div>
              )}
            </div>
          )}

          <div className="mb-6">
            <h3 className="mb-3 text-white">About</h3>
            <p className="text-gray-400">{game.description}</p>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-4">
              <div className="mb-2 flex items-center gap-2 text-purple-400">
                <Gamepad2 className="h-5 w-5" />
                <span>Genre</span>
              </div>
              <p className="text-white">{game.genre}</p>
            </div>

            <div className="rounded-lg bg-gray-800 p-4">
              <div className="mb-2 flex items-center gap-2 text-purple-400">
                <Monitor className="h-5 w-5" />
                <span>Platform</span>
              </div>
              <p className="text-white">{game.platform}</p>
            </div>

            <div className="rounded-lg bg-gray-800 p-4">
              <div className="mb-2 flex items-center gap-2 text-purple-400">
                <Calendar className="h-5 w-5" />
                <span>Status</span>
              </div>
              <p className="text-white">{game.status || 'N/A'}</p>
            </div>

            <div className="rounded-lg bg-gray-800 p-4">
              <div className="mb-2 flex items-center gap-2 text-purple-400">
                <Users className="h-5 w-5" />
                <span>Role</span>
              </div>
              <p className="text-white">{game.role || 'N/A'}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-white">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-purple-600/20 px-4 py-2 text-sm text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

