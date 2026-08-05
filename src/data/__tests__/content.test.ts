import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { features, featureCategories, featuresIn } from '../features';
import { stats } from '../stats';
import { privacy } from '../privacy';
import { terms } from '../terms';
import { faqs } from '../faq';

const categoryIds = featureCategories.map((c) => c.id);

const feature = z.object({
  icon: z.string().regex(/^[a-z][a-z0-9-]*$/, 'must be a kebab-case Lucide icon name'),
  title: z.string().min(1),
  body: z.string().min(40),
  accent: z.enum(['primary', 'gold', 'purple']),
  category: z.enum(['prayer', 'quran', 'worship', 'library', 'tools', 'platform']),
  illustrated: z.literal(true).optional(),
});

/** The six icons FeatureArt.astro actually draws. Anything else must not claim `illustrated`. */
const ILLUSTRATED_ICONS = ['clock', 'compass', 'calendar', 'book-open', 'bell', 'scroll-text'];

describe('content data', () => {
  it('has a well-formed feature catalogue', () => {
    expect(features.length).toBeGreaterThanOrEqual(20);
    features.forEach((f) => expect(() => feature.parse(f)).not.toThrow());
  });

  it('has unique feature titles', () => {
    expect(new Set(features.map((f) => f.title)).size).toBe(features.length);
  });

  it('only marks features illustrated when FeatureArt can draw them', () => {
    // Otherwise the showcase renders an empty SVG where the art should be.
    features
      .filter((f) => f.illustrated)
      .forEach((f) => expect(ILLUSTRATED_ICONS).toContain(f.icon));
  });

  it('files every feature under a declared category, and leaves none empty', () => {
    features.forEach((f) => expect(categoryIds).toContain(f.category));
    featureCategories.forEach((c) => expect(featuresIn(c.id).length).toBeGreaterThan(0));
  });

  it('has unique category ids usable as URL anchors', () => {
    expect(new Set(categoryIds).size).toBe(categoryIds.length);
    categoryIds.forEach((id) => expect(id).toMatch(/^[a-z][a-z0-9-]*$/));
  });

  it('has 4 valid stats', () => {
    const stat = z.object({
      value: z.string().trim().min(1),
      label: z.string().trim().min(1),
    });
    expect(stats).toHaveLength(4);
    stats.forEach((s) => expect(() => stat.parse(s)).not.toThrow());
  });

  /**
   * The counts on the stats strip and the counts written into feature copy describe the same
   * app, so they have to agree. These are the numbers an audit found wrong in August 2026 —
   * the strip claimed 18 calculation methods and 9 hadith collections against the app's 11
   * and 6. Sourced from CalculationMethod, HadithCollectionScreen, QuranTranslation and
   * QuranReciter in arshad-shah/Nimaz.
   */
  it('keeps the stats strip consistent with the feature copy', () => {
    const statValue = (label: string) => stats.find((s) => s.label === label)?.value;
    const bodyFor = (title: string) => features.find((f) => f.title === title)?.body ?? '';

    expect(statValue('Calculation Methods')).toBe('11');
    expect(bodyFor('Accurate prayer times')).toContain('11 calculation methods');

    expect(statValue('Hadith Collections')).toBe('6');
    expect(bodyFor('Hadith collections')).toContain('six canonical collections');

    expect(statValue('Quran Translations')).toBe('15');
    expect(bodyFor('Qur’an reader with tafsir')).toContain('15 translations');

    expect(statValue('Reciters')).toBe('13');
    expect(bodyFor('13 reciters, playing offline')).toContain('thirteen reciters');
  });
});

describe('legal data', () => {
  it('has privacy glance, sections and faqs', () => {
    expect(privacy.glance.length).toBeGreaterThanOrEqual(5);
    expect(privacy.sections.length).toBeGreaterThanOrEqual(9);
    expect(privacy.faqs.length).toBeGreaterThanOrEqual(7);
    privacy.sections.forEach((s) => expect(s.body.length).toBeGreaterThan(60));
    privacy.sections.forEach((s) => expect(s.highlights.length).toBeGreaterThan(0));
  });

  /**
   * The August 2026 audit found the policy promising an analytics opt-out the app does not
   * have, and omitting every service that had been added since March 2024. These assertions
   * fail if that disclosure is dropped again.
   */
  it('discloses every third party the app actually reaches', () => {
    const text = JSON.stringify(privacy).toLowerCase();
    [
      'firebase',
      'crashlytics',
      'performance',
      'cloud messaging',
      'cloudflare',
      'anthropic',
    ].forEach((name) => expect(text).toContain(name));
  });

  it('covers the permissions and optional features the app has', () => {
    const text = JSON.stringify(privacy).toLowerCase();
    ['camera', 'bluetooth', 'ask with proof'].forEach((topic) => expect(text).toContain(topic));
  });

  it('does not claim an analytics opt-out that the app lacks', () => {
    const text = JSON.stringify(privacy).toLowerCase();
    expect(text).not.toContain('analytics opt-out');
    expect(text).not.toContain('turned off in settings');
  });

  it('has 4 terms tabs and permitted/prohibited lists', () => {
    expect(terms.tabs).toHaveLength(4);
    expect(terms.permitted).toHaveLength(4);
    expect(terms.prohibited).toHaveLength(4);
  });

  it('tells readers that AI answers are not religious rulings', () => {
    const text = JSON.stringify(terms).toLowerCase();
    expect(text).toContain('fatwa');
  });

  it('carries revision dates on both legal documents', () => {
    expect(privacy.updated).toMatch(/\d{4}$/);
    expect(terms.effective).toMatch(/\d{4}$/);
  });
});

describe('product faq', () => {
  const faq = z.object({ q: z.string().trim().min(8), a: z.string().trim().min(40) });
  it('has a non-trivial, well-formed FAQ list', () => {
    expect(faqs.length).toBeGreaterThanOrEqual(5);
    faqs.forEach((f) => expect(() => faq.parse(f)).not.toThrow());
  });
  it('has unique questions', () => {
    expect(new Set(faqs.map((f) => f.q)).size).toBe(faqs.length);
  });
  it('does not promise the analytics toggle the app lacks', () => {
    const text = faqs.map((f) => f.a).join(' ');
    expect(text).not.toMatch(/analytics can be turned off/i);
  });
});
