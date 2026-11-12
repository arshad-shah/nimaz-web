import { Badge, Card, Inline, Stack, Text } from '@arshad-shah/cynosure';
import type { PrayerEntry } from '../lib/prayer';

const time = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Stack passes other attributes to its element; its types do not list `aria-label` yet.
const named = { 'aria-label': 'Prayer times' };

/** The day's six prayer times, each with its colour from the app; the next one is marked. */
export function PrayerList({ prayers }: { prayers: PrayerEntry[] }) {
  return (
    <Stack as="ul" gap="3" {...named}>
      {prayers.map((p) => (
        <Card
          as="li"
          key={p.key}
          edge={p.color}
          variant="soft"
          tone={p.isNext ? 'accent' : 'neutral'}
          padding="sm"
        >
          <Inline justify="between" align="center">
            <Inline gap="4" align="center">
              <Text weight="medium">{p.name}</Text>
              {p.isNext && (
                <Badge tone="accent" size="sm">
                  Next
                </Badge>
              )}
            </Inline>
            <Text numeric weight="bold">
              {time(p.time)}
            </Text>
          </Inline>
        </Card>
      ))}
    </Stack>
  );
}
