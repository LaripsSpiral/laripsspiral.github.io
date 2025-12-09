'use client';

import {
  X,
  Calendar,
  Monitor,
  Star,
  Trophy,
  Users,
  Handshake,
  CheckCircle,
  Building2,
  Play,
  Video,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Game } from './GameCard';

interface GameDetailModalProps {
  game: Game;
  games: Game[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GameDetailModal({ game, games, currentIndex, onClose, onNavigate }: GameDetailModalProps) {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const [mainMediaIndex, setMainMediaIndex] = useState<number>(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < games.length - 1) {
        e.preventDefault();
        onNavigate(currentIndex + 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, games.length, onNavigate, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/80 overflow-hidden"
      onClick={onClose}
    >
      <div
        className="flex-1 overflow-y-auto bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed right-4 top-4 z-20 rounded-full bg-gray-800/90 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white backdrop-blur-sm"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Main Content - Steam Style Layout */}
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6">
          {/* Top Section - Two Column: Main Video Left, Info Right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4 lg:items-start lg:grid-rows-[1fr]">
            {/* Left Column - Main Video/Image */}
            <div className="lg:col-span-2">
              {/* Main Hero Video/Image */}
              {game.media && game.media.length > 0 ? (
                <div
                  className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg bg-gray-900 mb-4"
                  onClick={() => setSelectedMediaIndex(mainMediaIndex)}
                >
                  {game.media[mainMediaIndex].type === 'video' ? (
                    <>
                      {game.media[mainMediaIndex].thumbnail ? (
                        <img
                          src={game.media[mainMediaIndex].thumbnail}
                          alt={game.media[mainMediaIndex].title || game.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={game.imageUrl}
                          alt={game.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="rounded-full bg-white/90 p-6 shadow-2xl">
                          <Play className="h-16 w-16 text-gray-900" fill="currentColor" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={game.media[mainMediaIndex].url}
                      alt={game.media[mainMediaIndex].title || game.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              ) : (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-900 mb-4">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Thumbnail Carousel Below Main Video */}
              {game.media && game.media.length > 1 && (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const carousel = e.currentTarget.nextElementSibling as HTMLElement;
                      if (carousel) carousel.scrollBy({ left: -150, behavior: 'smooth' });
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-gray-800/90 p-2 text-white hover:bg-gray-700 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 px-8">
                    {game.media.map((media, index) => (
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
                              <img
                                src={media.thumbnail}
                                alt={media.title || `Video ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gray-900">
                                <Video className="h-6 w-6 text-gray-600" />
                              </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <Play className="h-6 w-6 text-white" fill="white" />
                            </div>
                          </>
                        ) : (
                          <img
                            src={media.url}
                            alt={media.title || `Media ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const carousel = e.currentTarget.previousElementSibling as HTMLElement;
                      if (carousel) carousel.scrollBy({ left: 150, behavior: 'smooth' });
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-gray-800/90 p-2 text-white hover:bg-gray-700 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Game Info */}
            <div className="flex flex-col">
              {/* Game Artwork/Logo */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-800 mb-4">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content Area - Normal flow */}
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
                      <div className="flex items-center gap-2 text-purple-400">
                        <Trophy className="h-4 w-4" />
                        <span className="text-sm font-semibold">Award Winner</span>
                      </div>
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
                  </div>
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
                <div className="rounded-lg bg-gray-800/50 p-6">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">{game.description}</p>
                </div>
              </div>

              {/* Role Details */}
              {game.roleDetails && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-white">Role & Responsibilities</h2>
                  <div className="rounded-lg bg-gray-800/50 p-6">
                    <div className="mb-3 flex items-center gap-2 text-purple-400">
                      <Users className="h-5 w-5" />
                      <span className="font-medium text-lg">{game.role || 'Role'}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">{game.roleDetails}</p>
                  </div>
                </div>
              )}

              {/* Features Worked On */}
              {game.features && game.features.length > 0 && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-white">Features & Contributions</h2>
                  <div className="rounded-lg bg-gray-800/50 p-6">
                    <ul className="space-y-3">
                      {game.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Role & Position */}
              {(game.role || game.roleDetails) && (
                <div className="rounded-lg bg-gray-800/50 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-white">Role & Position</h3>
                  <div className="space-y-3">
                    {game.role && (
                      <div className="flex items-center gap-2 text-purple-400">
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

              {/* Working for */}
              {game.client && (
                <div className="rounded-lg bg-gray-800/50 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-white">Working for</h3>
                  <div className="flex items-center gap-2 text-orange-400">
                    <Building2 className="h-4 w-4" />
                    <span className="text-gray-300">{game.client}</span>
                  </div>
                </div>
              )}

              {/* Collaborate */}
              {game.badges?.partner && (
                <div className="rounded-lg bg-gray-800/50 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-white">Collaborate</h3>
                  <div className="flex items-center gap-2 text-orange-400">
                    <Handshake className="h-4 w-4" />
                    <span className="text-gray-300">{game.badges.partner}</span>
                  </div>
                </div>
              )}

              {/* Awards */}
              {game.awards && game.awards.length > 0 && (
                <div className="rounded-lg bg-gray-800/50 p-6">
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
      {selectedMediaIndex !== null && game.media && game.media[selectedMediaIndex] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedMediaIndex(null)}
        >
          <button
            onClick={() => setSelectedMediaIndex(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-gray-800 p-2 text-white transition-colors hover:bg-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative w-[90vw] max-w-6xl aspect-video rounded-lg bg-gray-900/50 backdrop-blur-sm shadow-2xl overflow-hidden flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-full h-full flex items-center justify-center bg-transparent">
              {game.media[selectedMediaIndex].type === 'video' ? (
                <video
                  src={game.media[selectedMediaIndex].url}
                  controls
                  autoPlay
                  className="max-h-full max-w-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={game.media[selectedMediaIndex].url}
                  alt={game.media[selectedMediaIndex].title || 'Media'}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>
            {game.media[selectedMediaIndex].title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white">{game.media[selectedMediaIndex].title}</p>
              </div>
            )}
            {/* Navigation arrows */}
            {game.media.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMediaIndex(
                      selectedMediaIndex > 0 ? selectedMediaIndex - 1 : game.media!.length - 1
                    );
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/80 p-3 text-white transition-colors hover:bg-gray-700"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMediaIndex(
                      selectedMediaIndex < game.media!.length - 1 ? selectedMediaIndex + 1 : 0
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/80 p-3 text-white transition-colors hover:bg-gray-700"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
