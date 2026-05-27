import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { features } from '../features';
import { stats } from '../stats';
import { privacy } from '../privacy';
import { terms } from '../terms';
import { faqs } from '../faq';

const feature = z.object({
  icon: z.enum(['clock', 'compass', 'calendar', 'book-open', 'bell', 'scroll-text']),
  title: z.string().min(1),
  body: z.string().min(40),
  accent: z.enum(['primary', 'gold', 'purple']),
});

describe('content data', () => {
  it('has 6 valid features', () => {
    expect(features).toHaveLength(6);
    features.forEach((f) => expect(() => feature.parse(f)).not.toThrow());
  });
  it('has 4 valid stats', () => {
    const stat = z.object({
      value: z.string().trim().min(1),
      label: z.string().trim().min(1),
    });
    expect(stats).toHaveLength(4);
    stats.forEach((s) => expect(() => stat.parse(s)).not.toThrow());
  });
});

describe('legal data', () => {
  it('has privacy glance, sections and faqs', () => {
    expect(privacy.glance.length).toBeGreaterThanOrEqual(5);
    expect(privacy.sections).toHaveLength(7);
    expect(privacy.faqs).toHaveLength(7);
    privacy.sections.forEach((s) => expect(s.body.length).toBeGreaterThan(60));
  });
  it('has 4 terms tabs and permitted/prohibited lists', () => {
    expect(terms.tabs).toHaveLength(4);
    expect(terms.permitted).toHaveLength(4);
    expect(terms.prohibited).toHaveLength(4);
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
});
