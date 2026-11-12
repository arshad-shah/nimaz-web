import { Card, Container, Grid, Stack, Text } from '@arshad-shah/cynosure';
import { stats } from '../../data/stats';

export default function StatsStrip() {
  return (
    <Container paddingBlock="8">
      <Grid columns={{ base: 2, lg: 4 }} gap="6">
        {stats.map((s) => (
          <Card key={s.label} variant="soft" tone="accent" padding="lg">
            <Stack gap="2" align="center">
              <Text numeric weight="bold" size="2xl" tone="accent">
                {s.value}
              </Text>
              <Text variant="caption" align="center">
                {s.label}
              </Text>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
