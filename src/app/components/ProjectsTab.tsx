'use client';

import { useMemo, useState } from 'react';
import { Search, SortAsc } from 'lucide-react';
import { Game, GameCard } from './GameCard';

interface ProjectsTabProps {
  games: Game[];
}

export function ProjectsTab({ games }: ProjectsTabProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  const filteredAndSortedGames = useMemo(() => {
    let filtered = games;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query) ||
          game.genre.toLowerCase().includes(query) ||
          game.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    const sorted = [...filtered];
    if (sortBy === 'newest') {
      sorted.sort((a, b) => parseInt(b.releaseYear, 10) - parseInt(a.releaseYear, 10));
    } else if (sortBy === 'oldest') {
      sorted.sort((a, b) => parseInt(a.releaseYear, 10) - parseInt(b.releaseYear, 10));
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sorted;
  }, [games, searchQuery, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pl-12 pr-4 text-gray-300 placeholder-gray-500 transition-colors focus:border-purple-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-gray-300">
            <SortAsc className="h-5 w-5" />
            <span>Sort:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-gray-300 transition-colors hover:border-purple-600 focus:border-purple-600 focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="mb-6 text-sm text-gray-400">
        Showing {filteredAndSortedGames.length}{' '}
        {filteredAndSortedGames.length === 1 ? 'game' : 'games'}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {filteredAndSortedGames.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-400">No games found matching your search.</p>
        </div>
      )}
    </div>
  );
}

