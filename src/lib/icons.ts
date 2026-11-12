/**
 * Feature icons. `features.ts` names each feature's icon with a kebab-case key; this maps the
 * key to a Cynosure Facet icon. A key with no entry fails `content.test.ts`, so a new feature
 * cannot ship with a missing icon.
 */
import {
  bell,
  bookOpen,
  bookmark,
  calculator,
  calendar,
  calendarPlus,
  circleDot,
  clock,
  compass,
  graduationCap,
  grid,
  headphones,
  heart,
  help,
  listChecks,
  moon,
  moonStar,
  palette,
  retry,
  scrollText,
  search,
  sparkles,
  target,
  tree,
  wifiOff,
} from '@arshad-shah/cynosure/icons';
import type { IconData } from '@arshad-shah/cynosure/icons';

export const featureIcons: Record<string, IconData> = {
  bell,
  'book-marked': bookmark,
  'book-open': bookOpen,
  calculator,
  calendar,
  'calendar-days': calendarPlus,
  'circle-dot': circleDot,
  'circle-help': help,
  clock,
  compass,
  'graduation-cap': graduationCap,
  headphones,
  heart,
  'layout-grid': grid,
  'list-tree': tree,
  moon,
  'moon-star': moonStar,
  palette,
  'refresh-cw': retry,
  'scroll-text': scrollText,
  search,
  sparkles,
  'square-check-big': listChecks,
  target,
  'wifi-off': wifiOff,
};

export const featureIcon = (key: string): IconData => featureIcons[key] ?? sparkles;
