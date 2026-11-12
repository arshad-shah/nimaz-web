import { Card, Heading, IconTile, Stack, Text } from '@arshad-shah/cynosure';
import type { Feature } from '../data/features';
import { featureIcon } from '../lib/icons';

/** The app's three feature colours, as Cynosure tones. */
const tone = { primary: 'accent', gold: 'warning', purple: 'info' } as const;

/** One feature as a card: its icon on a tinted tile, its name and what it does. */
export function FeatureCard({ feature, level }: { feature: Feature; level: 2 | 3 }) {
  return (
    <Card padding="lg">
      <Stack gap="5" align="start">
        <IconTile icon={featureIcon(feature.icon)} tone={tone[feature.accent]} size="lg" />
        <Stack gap="3">
          <Heading level={level} size="md">
            {feature.title}
          </Heading>
          <Text as="p" size="sm" tone="muted">
            {feature.body}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
}
