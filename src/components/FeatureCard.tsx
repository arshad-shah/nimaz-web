import { Avatar, Card, Heading, Stack, Text } from '@arshad-shah/cynosure';
import type { Feature } from '../data/features';
import { featureIcon } from '../lib/icons';
import { brand } from '../theme';

/** One feature as a card: its icon on a tinted tile, its name and what it does. */
export function FeatureCard({ feature, level }: { feature: Feature; level: 2 | 3 }) {
  const color =
    feature.accent === 'gold' ? brand.gold : feature.accent === 'purple' ? brand.purple : undefined;
  return (
    <Card padding="lg">
      <Stack gap="5" align="start">
        <Avatar
          name={feature.title}
          icon={featureIcon(feature.icon)}
          shape="square"
          size="lg"
          tone="accent"
          color={color}
          decorative
        />
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
