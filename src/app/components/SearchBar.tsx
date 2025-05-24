'use client';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSort: (sortBy: 'name' | 'latest') => void;
  sortBy: 'name' | 'latest';
}

export default function SearchBar({ onSearch, onSort, sortBy }: SearchBarProps) {
  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Search projects..."
        className="w-64 px-4 py-2 rounded-lg border bg-neutral-800/50 backdrop-blur-sm"
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        className="px-4 py-2 rounded-lg border bg-neutral-800/50 backdrop-blur-sm"
        onChange={(e) => onSort(e.target.value as 'name' | 'latest')}
        value={sortBy}
      >
        <option value="latest">Latest</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}
