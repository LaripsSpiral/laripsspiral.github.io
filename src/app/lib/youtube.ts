/**
 * YouTube URL utilities.
 *
 * Shared helpers used by ProjectDetailPage, ProjectPortfolio and ProjectSummary
 * to extract video IDs, build embed URLs and resolve thumbnail images.
 */

/** Extract the 11-character video ID from any common YouTube URL format. */
export const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};

/**
 * Build one of the YouTube `/embed/` URLs with sensible defaults.
 *
 * The version used in ProjectDetailPage also supports `?t=` timestamps and extra
 * params, so this implementation keeps those extras to avoid losing features.
 */
export const getYouTubeEmbedUrl = (url: string): string | null => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;

    // Extract timestamp if present
    const timeMatch = url.match(/[?&]t=(\d+)/);
    const startTime = timeMatch ? timeMatch[1] : '';

    const params = new URLSearchParams();
    if (startTime) params.append('start', startTime);
    params.append('rel', '0');
    params.append('modestbranding', '1');
    params.append('iv_load_policy', '3');
    params.append('disablekb', '1');

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

/**
 * Get the best-quality thumbnail URL for a YouTube video.
 *
 * Uses `maxresdefault.jpg` which is the highest resolution thumbnail YouTube
 * generates.  Falls back to `hqdefault.jpg` is handled by Image component's
 * error handling at the call-site if the max-res version doesn't exist.
 */
export const getYouTubeThumbnail = (url: string): string | null => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};
