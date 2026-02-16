'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { getYouTubeEmbedUrl } from '@/app/lib/youtube';
import { THEME_PRIMARY } from '@/app/theme/palette';

export interface OverlayMedia {
    type: 'image' | 'gif' | 'video' | 'youtube';
    url: string;
    title?: string;
    thumbnail?: string;
}

interface MediaOverlayProps {
    media: OverlayMedia | null;
    onClose: () => void;
}

/**
 * Full-screen media overlay / lightbox.
 *
 * Supports images, gifs, hosted video and YouTube embeds.
 * Previously duplicated in ProjectPortfolio and ProjectSummary.
 */
export function MediaOverlay({ media, onClose }: MediaOverlayProps) {

    const content = useMemo(() => {
        if (!media) return null;

        if (media.type === 'image' || media.type === 'gif') {
            return (
                <div className="relative w-[min(1100px,96vw)] h-[min(720px,80vh)]">
                    <Image
                        src={media.url}
                        alt={media.title || 'Media'}
                        fill
                        sizes="(max-width: 1100px) 96vw, 1100px"
                        className="object-contain"
                        priority
                    />
                </div>
            );
        }

        if (media.type === 'video') {
            return (
                <video
                    src={media.url}
                    controls
                    controlsList="nodownload"
                    className="max-h-[80vh] max-w-[96vw] rounded-lg bg-black"
                />
            );
        }

        if (media.type === 'youtube') {
            const embedUrl = getYouTubeEmbedUrl(media.url);
            return (
                <div className="relative w-[min(1100px,96vw)] aspect-video rounded-lg overflow-hidden bg-black">
                    <iframe
                        src={embedUrl || ''}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={media.title || 'YouTube video'}
                    />
                </div>
            );
        }

        return null;
    }, [media]);

    if (!media) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
            onClick={onClose}
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
                    onClick={onClose}
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>
                {content}
            </div>
        </div>
    );
}
