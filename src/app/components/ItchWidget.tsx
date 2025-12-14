'use client';

import { useState, useEffect } from 'react';
import {
  THEME_PRIMARY_BORDER,
  THEME_PANEL_BG,
} from '../theme/palette';

interface ItchWidgetProps {
  embedId: string;
  gameUrl: string;
  gameName: string;
  authorName: string;
}

export function ItchWidget({ embedId, gameUrl, gameName, authorName }: ItchWidgetProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className="rounded-lg p-4 flex flex-col items-center sm:block"
      style={{ backgroundColor: THEME_PANEL_BG, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
    >
      <h2 className="mb-2 text-2xl font-bold text-white">Available to play</h2>
      {isMounted ? (
        <iframe
          frameBorder="0"
          src={`https://itch.io/embed/${embedId}?dark=true`}
          width="552"
          height="167"
          className="block w-[208px] sm:w-full mx-auto"
          style={{
            backgroundColor: THEME_PANEL_BG,
          }}
          title={`${gameName} by ${authorName} on itch.io`}
        />
      ) : (
        <div className="w-[208px] sm:w-full mx-auto h-[167px] flex items-center justify-center">
          <a 
            href={gameUrl} 
            className="text-sm text-gray-300 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {gameName} by {authorName}
          </a>
        </div>
      )}
    </div>
  );
}

