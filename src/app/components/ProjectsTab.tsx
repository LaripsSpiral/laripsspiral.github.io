'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search, SortAsc } from 'lucide-react';
import { Game, GameCard } from './GameCard';
import { THEME_PRIMARY_BORDER, THEME_FONT_PRIMARY } from '../theme/palette';

interface ProjectsTabProps {
  games: Game[];
}

export function ProjectsTab({ games }: ProjectsTabProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'newest');

  // Update URL when search or sort changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    }
    if (sortBy !== 'newest') {
      params.set('sort', sortBy);
    }
    
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, sortBy, pathname, router]);

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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" style={{ fontFamily: THEME_FONT_PRIMARY }}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border bg-[#0d1117] py-3 pl-12 pr-4 text-gray-300 placeholder-gray-500 transition-colors focus:outline-none"
            style={{ borderColor: THEME_PRIMARY_BORDER }}
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
            className="rounded-lg border bg-[#0d1117] px-4 py-3 text-sm text-gray-300 transition-colors focus:outline-none"
            style={{ borderColor: THEME_PRIMARY_BORDER }}
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

