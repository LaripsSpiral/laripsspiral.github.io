import { ElementType, ReactNode } from 'react';
import {
  THEME_PRIMARY,
  THEME_PRIMARY_BORDER,
  THEME_PRIMARY_TINT,
  THEME_COMPLEMENT_TINT,
  THEME_FONT_PRIMARY,
  THEME_BADGE_TEXT,
  THEME_BADGE_BG,
  THEME_BADGE_BG_MUTED,
  THEME_BADGE_STAR_TEXT,
  THEME_BADGE_STAR_BG,
  THEME_BADGE_TROPHY_TEXT,
  THEME_BADGE_TROPHY_BG,
  THEME_BADGE_SCHOOL_TEXT,
  THEME_BADGE_SCHOOL_BG,
} from '../theme/palette';

type BoxProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

type BadgeProps = BoxProps & {
  tone?:
    | 'primary'
    | 'muted'
    | 'star'
    | 'trophy'
    | 'school'
    | 'team'
    | 'partner';
  pill?: boolean;
};

const cx = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(' ');

export function ThemeCard({ as: Comp = 'div', className, children }: BoxProps) {
  return (
    <Comp
      className={cx('rounded-xl shadow-xl overflow-hidden', className)}
      style={{
        border: `1px solid ${THEME_PRIMARY_BORDER}`,
        background: `linear-gradient(180deg, ${THEME_PRIMARY_TINT} 0%, ${THEME_COMPLEMENT_TINT} 100%)`,
        fontFamily: THEME_FONT_PRIMARY,
      }}
    >
      {children}
    </Comp>
  );
}

export function ThemeCardHeader({ as: Comp = 'div', className, children }: BoxProps) {
  return (
    <Comp
      className={cx('px-6 py-4', className)}
      style={{
        borderBottom: `1px solid ${THEME_PRIMARY_BORDER}`,
        backgroundColor: THEME_PRIMARY_TINT,
      }}
    >
      {children}
    </Comp>
  );
}

export function ThemeCardBody({ as: Comp = 'div', className, children }: BoxProps) {
  return <Comp className={cx('px-6 py-5 space-y-4', className)}>{children}</Comp>;
}

export function ThemeGroup({ as: Comp = 'div', className, children }: BoxProps) {
  return <Comp className={cx('grid gap-4', className)}>{children}</Comp>;
}

export function ThemeTitle({ as: Comp = 'p', className, children }: BoxProps) {
  return (
    <Comp
      className={cx('text-xs uppercase tracking-[0.24em] font-semibold', className)}
      style={{ color: THEME_PRIMARY }}
    >
      {children}
    </Comp>
  );
}

export function ThemeHeading({ as: Comp = 'h2', className, children }: BoxProps) {
  return (
    <Comp className={cx('text-2xl font-bold text-white', className)} style={{ fontFamily: THEME_FONT_PRIMARY }}>
      {children}
    </Comp>
  );
}

export function ThemeSubheading({ as: Comp = 'p', className, children }: BoxProps) {
  return (
    <Comp
      className={cx('text-sm text-gray-200', className)}
      style={{ color: THEME_PRIMARY, fontFamily: THEME_FONT_PRIMARY }}
    >
      {children}
    </Comp>
  );
}

export function ThemeDetail({ as: Comp = 'div', className, children }: BoxProps) {
  return (
    <Comp
      className={cx(
        'rounded-md px-3 py-2 text-sm leading-relaxed',
        className
      )}
      style={{
        border: `1px solid ${THEME_PRIMARY_BORDER}`,
        backgroundColor: 'rgba(0,0,0,0.3)',
        color: '#dfe6ea',
        fontFamily: THEME_FONT_PRIMARY,
      }}
    >
      {children}
    </Comp>
  );
}

export function ThemeBadge({ as: Comp = 'div', className, children, tone = 'primary', pill = true }: BadgeProps) {
  let bg = THEME_BADGE_BG;
  let text = THEME_BADGE_TEXT;

  if (tone === 'muted') {
    bg = THEME_BADGE_BG_MUTED;
    text = THEME_BADGE_TEXT;
  } else if (tone === 'star') {
    bg = THEME_BADGE_STAR_BG;
    text = THEME_BADGE_STAR_TEXT;
  } else if (tone === 'trophy') {
    bg = THEME_BADGE_TROPHY_BG;
    text = THEME_BADGE_TROPHY_TEXT;
  } else if (tone === 'school') {
    bg = THEME_BADGE_SCHOOL_BG;
    text = THEME_BADGE_SCHOOL_TEXT;
  }

  const radius = pill ? '9999px' : '8px';
  return (
    <Comp
      className={cx('inline-flex items-center gap-1 px-2 py-1 text-xs', className)}
      style={{
        backgroundColor: bg,
        color: text,
        borderRadius: radius,
        fontFamily: THEME_FONT_PRIMARY,
      }}
    >
      {children}
    </Comp>
  );
}

