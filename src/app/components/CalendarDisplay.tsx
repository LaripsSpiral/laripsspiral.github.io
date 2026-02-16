'use client';

import { Calendar } from 'lucide-react';
import { differenceInDays, differenceInMonths, differenceInYears, parse, isValid, addYears, addMonths } from 'date-fns';
import { THEME_PRIMARY } from '../theme/palette';

interface CalendarDisplayProps {
    startDate?: string;
    endDate?: string;
    showDuration?: boolean;
    variant?: 'inline' | 'stacked';
    className?: string;
    scale?: number;
    textClassName?: string;
    iconColor?: string;
}

// Helper function to calculate duration between dates using date-fns
// Extracted from GameDetailPage.tsx
const calculateDuration = (startDate?: string, lastDate?: string): string => {
    if (!startDate || !lastDate) return '';

    try {
        const monthMap: { [key: string]: string } = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
            'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        };

        const parseDate = (dateStr: string): Date | null => {
            const parts = dateStr.split(' ').filter(part => part.length > 0);
            let day: string, month: string, year: string;

            if (parts.length === 3) {
                // Format: Day Month Year (e.g., "11 Nov 2024")
                day = parts[0].padStart(2, '0');
                const monthStr = parts[1];
                year = parts[2];
                month = monthMap[monthStr] || parts[1].padStart(2, '0');
                // Parse as "dd/MM/yyyy"
                return parse(`${day}/${month}/${year}`, 'dd/MM/yyyy', new Date());
            } else if (parts.length === 2) {
                // Format: Month Year (e.g., "Nov 2024")
                const monthStr = parts[0];
                year = parts[1];
                month = monthMap[monthStr] || parts[0].padStart(2, '0');
                // Parse as "01/MM/yyyy" (first day of month)
                return parse(`01/${month}/${year}`, 'dd/MM/yyyy', new Date());
            }
            return null;
        };

        const start = parseDate(startDate);
        const end = parseDate(lastDate);

        if (!start || !end || !isValid(start) || !isValid(end)) {
            return '';
        }

        // Calculate differences using date-fns
        const years = differenceInYears(end, start);
        const totalMonths = differenceInMonths(end, start);
        const months = totalMonths % 12;

        // Calculate remaining days after accounting for years and months
        let dateAfterYearsMonths = start;
        if (years > 0) {
            dateAfterYearsMonths = addYears(dateAfterYearsMonths, years);
        }
        if (months > 0) {
            dateAfterYearsMonths = addMonths(dateAfterYearsMonths, months);
        }
        const remainingDays = differenceInDays(end, dateAfterYearsMonths);

        // Build the duration string
        const parts: string[] = [];

        if (years > 0) {
            parts.push(`${years} year${years > 1 ? 's' : ''}`);
        }
        if (months > 0) {
            parts.push(`${months} month${months > 1 ? 's' : ''}`);
        }

        // Show remaining days
        if (remainingDays > 0) {
            if (remainingDays >= 7 && years === 0 && months === 0) {
                // If less than a year and month, show weeks and days
                const weeks = Math.floor(remainingDays / 7);
                const days = remainingDays % 7;
                if (weeks > 0) {
                    parts.push(`${weeks} week${weeks > 1 ? 's' : ''}`);
                }
                if (days > 0) {
                    parts.push(`${days} day${days > 1 ? 's' : ''}`);
                }
            } else {
                // Show days directly
                parts.push(`${remainingDays} day${remainingDays > 1 ? 's' : ''}`);
            }
        }

        if (parts.length === 0) {
            return 'Less than 1 day';
        }

        return parts.join(' ');
    } catch {
        return '';
    }
};

export function CalendarDisplay({
    startDate,
    endDate,
    showDuration = false,
    variant = 'inline',
    className = '',
    scale = 1,
    iconColor
}: CalendarDisplayProps) {
    if (!startDate && !endDate) return null;

    const dateText = endDate
        ? `${startDate || ''}${startDate ? ' - ' : ''}${endDate}`
        : startDate || endDate;

    const duration = showDuration && startDate && endDate ? calculateDuration(startDate, endDate) : null;

    // Standard baseline: Icon 20px, Font 14px, Gap 8px (inline) / 12px (stacked)
    const iconSize = 20 * scale;
    const fontSize = 12 * scale;
    const durationFontSize = 12 * scale;
    const gapSize = (variant === 'stacked' ? 12 : 8) * scale;
    const marginSize = 0 * scale;
    const iconTopMargin = 2 * scale;

    if (variant === 'stacked') {
        return (
            <div className={`flex items-start ${className}`} style={{ gap: `${gapSize}px` }}>
                <Calendar
                    className="flex-shrink-0"
                    style={{
                        color: iconColor,
                        width: `${iconSize}px`,
                        height: `${iconSize}px`,
                        marginTop: `${iconTopMargin}px`
                    }}
                />
                <div style={{ fontSize: `${fontSize}px` }}>
                    <p className="font-medium leading-tight">
                        {dateText}
                    </p>
                    {duration && (
                        <p className="text-gray-400" style={{ fontSize: `${durationFontSize}px`, marginTop: `${marginSize}px` }}>
                            Duration: {duration}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-center ${className}`} style={{ gap: `${gapSize}px`, fontSize: `${fontSize}px` }}>
            <Calendar
                className="flex-shrink-0"
                style={{
                    color: iconColor,
                    width: `${iconSize}px`,
                    height: `${iconSize}px`
                }}
            />
            <span className="leading-none">
                {dateText}
                {showDuration && duration && (
                    <span className="opacity-70" style={{ marginLeft: `${marginSize}px` }}>
                        ({duration})
                    </span>
                )}
            </span>
        </div>
    );
}
