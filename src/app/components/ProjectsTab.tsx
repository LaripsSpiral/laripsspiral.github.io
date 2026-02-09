'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search, SortAsc, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'name');
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'all');
  const [selectedTags, setSelectedTags] = useState<string[]>(searchParams.get('tags')?.split(',') || []);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState<boolean>(true);

  // Update URL when search or sort changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    }
    if (sortBy !== 'name') {
      params.set('sort', sortBy);
    }
    if (statusFilter !== 'all') {
      params.set('status', statusFilter);
    }
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    }
    
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, sortBy, statusFilter, selectedTags, pathname, router]);

  const filteredAndSortedGames = useMemo(() => {
    let filtered = games;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((game) => game.status === statusFilter);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((game) => 
        selectedTags.some(tag => 
          game.genres?.includes(tag) ||
          game.playModes?.includes(tag) ||
          game.platforms?.includes(tag) ||
          game.tools?.includes(tag) ||
          game.othertags?.includes(tag)
        )
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query) ||
          game.genres?.some((tag) => tag.toLowerCase().includes(query)) ||
          game.playModes?.some((tag) => tag.toLowerCase().includes(query)) ||
          game.platforms?.some((tag) => tag.toLowerCase().includes(query)) ||
          game.tools?.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    const sorted = [...filtered];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'startDate') {
      sorted.sort((a, b) => {
        const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
        const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
        return dateB - dateA; // Most recent first
      });
    } else if (sortBy === 'startDateOldest') {
      sorted.sort((a, b) => {
        const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
        const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
        return dateA - dateB; // Oldest first
      });
    }

    return sorted;
  }, [games, searchQuery, sortBy, statusFilter, selectedTags]);

  // Group games by status
  const gamesByStatus = useMemo(() => {
    const groups: { [key: string]: Game[] } = {};
    
    // Define status order
    const statusOrder = ['Released', 'Prototype'];
    
    // Initialize groups
    statusOrder.forEach(status => {
      groups[status] = [];
    });
    
    // Group games
    filteredAndSortedGames.forEach(game => {
      const status = game.status || 'Prototype';
      if (groups[status]) {
        groups[status].push(game);
      } else {
        groups['Prototype'].push(game);
      }
    });
    
    return groups;
  }, [filteredAndSortedGames]);

  // Get all available tags with counts, categorized by type
  const availableTags = useMemo(() => {
    const categories = {
      genres: { name: 'Genres', tags: {} as { [key: string]: number } },
      playModes: { name: 'Play Modes', tags: {} as { [key: string]: number } },
      platforms: { name: 'Platforms', tags: {} as { [key: string]: number } },
      tools: { name: 'Tools', tags: {} as { [key: string]: number } },
      other: { name: 'Other', tags: {} as { [key: string]: number } }
    };

    games.forEach(game => {
      game.genres?.forEach(tag => {
        if (tag === 'Singleplayer' || tag === 'Multiplayer' || tag === 'Single player') {
          categories.playModes.tags[tag] = (categories.playModes.tags[tag] || 0) + 1;
        } else {
          categories.genres.tags[tag] = (categories.genres.tags[tag] || 0) + 1;
        }
      });
      game.playModes?.forEach(tag => {
        categories.playModes.tags[tag] = (categories.playModes.tags[tag] || 0) + 1;
      });
      game.platforms?.forEach(tag => {
        categories.platforms.tags[tag] = (categories.platforms.tags[tag] || 0) + 1;
      });
      game.tools?.forEach(tag => {
        categories.tools.tags[tag] = (categories.tools.tags[tag] || 0) + 1;
      });
      game.othertags?.forEach(tag => {
        categories.other.tags[tag] = (categories.other.tags[tag] || 0) + 1;
      });
    });

    // Convert to array format and sort within each category
    Object.keys(categories).forEach(key => {
      categories[key as keyof typeof categories].tags = Object.fromEntries(
        Object.entries(categories[key as keyof typeof categories].tags).sort(([a], [b]) => a.localeCompare(b))
      );
    });

    return categories;
  }, [games]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllTags = () => {
    setSelectedTags([]);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-6 sm:px-6 lg:px-8" style={{ fontFamily: THEME_FONT_PRIMARY }}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border bg-[#0d1117] py-3 pl-12 pr-4 text-gray-300 placeholder-gray-500 transition-colors focus:outline-none font-body"
            style={{ borderColor: THEME_PRIMARY_BORDER }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-gray-300 font-subheader">
            <SortAsc className="h-5 w-5" />
            <span>Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border bg-[#0d1117] px-4 py-3 text-sm text-gray-300 transition-colors focus:outline-none font-body"
            style={{ borderColor: THEME_PRIMARY_BORDER }}
          >
            <option value="all">All Status</option>
            <option value="Released">Released</option>
            <option value="Prototype">Prototype</option>
          </select>
          
          <div className="flex items-center gap-2 text-gray-300 font-subheader">
            <SortAsc className="h-5 w-5" />
            <span>Sort:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border bg-[#0d1117] px-4 py-3 text-sm text-gray-300 transition-colors focus:outline-none font-body"
            style={{ borderColor: THEME_PRIMARY_BORDER }}
          >
            <option value="name">Name (A-Z)</option>
            <option value="startDate">Start Date (Newest)</option>
            <option value="startDateOldest">Start Date (Oldest)</option>
          </select>
        </div>
      </div>

      {/* Tags Filter */}
      <div 
        className="mb-6 rounded-lg border"
        style={{ backgroundColor: '#0d1117', borderColor: THEME_PRIMARY_BORDER }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsFilterCollapsed(!isFilterCollapsed)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-subheader"
            >
              <SortAsc className="h-5 w-5" />
              <span>Filter by Tags:</span>
              {isFilterCollapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
            {selectedTags.length > 0 && (
              <button
                onClick={clearAllTags}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-700 transition-colors font-caption"
              >
                <X className="h-3 w-3" />
                Clear All
              </button>
            )}
          </div>
          
          {!isFilterCollapsed && (
            <div className="mt-4 space-y-4">
              {Object.entries(availableTags).map(([categoryKey, category]) => (
                Object.keys(category.tags).length > 0 && (
                  <div key={categoryKey}>
                    <h4 className="mb-2 text-sm font-medium text-gray-400 font-subheader">{category.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(category.tags).map(([tag, count]) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition-colors font-body ${
                            selectedTags.includes(tag)
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                          }`}
                        >
                          {tag}
                          <span className="text-xs opacity-70 font-caption">({count})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-6 text-sm text-gray-400 font-caption">
        Showing {filteredAndSortedGames.length}{' '}
        {filteredAndSortedGames.length === 1 ? 'game' : 'games'}
        {statusFilter !== 'all' && ` with status "${statusFilter}"`}
        {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
      </div>

      {statusFilter === 'all' ? (
        // Show grouped by status
        <div className="space-y-8">
          {Object.entries(gamesByStatus).map(([status, statusGames]) => (
            statusGames.length > 0 && (
              <div key={status}>
                <div className="mb-4 flex items-center gap-3">
                  <h2 className="text-xl font-bold text-white font-header">{status}</h2>
                  <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-gray-300 font-caption">
                    {statusGames.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {statusGames.map((game) => (
                    <GameCard key={game.title} game={game} />
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        // Show filtered results (not grouped)
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedGames.map((game) => (
            <GameCard key={game.title} game={game} />
          ))}
        </div>
      )}

      {filteredAndSortedGames.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-400">No games found matching your search.</p>
        </div>
      )}
    </div>
  );
}

