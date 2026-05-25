import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { features } from '../features';
import { stats } from '../stats';

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
