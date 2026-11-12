/**
 * Feature icons. `features.ts` names each feature's icon with a kebab-case key; this maps the
 * key to a Cynosure Facet icon. A key with no entry fails `content.test.ts`, so a new feature
 * cannot ship with a missing icon.
 */
import {
  bell,
  bookOpen,
  bookMarked,
  calculator,
  calendar,
  calendarDays,
  circleDot,
  clock,
  compass,
  graduationCap,
  grid,
  headphones,
  heart,
  help,
  checkSquare,
  moon,
  moonStar,
  palette,
  refreshCw,
  scrollText,
  search,
  sparkles,
  target,
  listTree,
  wifiOff,
} from '@arshad-shah/cynosure/icons';
import type { IconData } from '@arshad-shah/cynosure';

export const featureIcons: Record<string, IconData> = {
  bell,
  'book-marked': bookMarked,
  'book-open': bookOpen,
  calculator,
  calendar,
  'calendar-days': calendarDays,
  'circle-dot': circleDot,
  'circle-help': help,
  clock,
  compass,
  'graduation-cap': graduationCap,
  headphones,
  heart,
  'layout-grid': grid,
  'list-tree': listTree,
  moon,
  'moon-star': moonStar,
  palette,
  'refresh-cw': refreshCw,
  'scroll-text': scrollText,
  search,
  sparkles,
  'square-check-big': checkSquare,
  target,
  'wifi-off': wifiOff,
};

export const featureIcon = (key: string): IconData => featureIcons[key] ?? sparkles;
