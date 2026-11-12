import { Grid, Section, Stat } from '@arshad-shah/cynosure';
import { stats } from '../../data/stats';

export default function StatsStrip() {
  return (
    <Section variant="soft" paddingBlock="10" aria-label="Nimaz in numbers">
      <Grid as="ul" columns={{ base: 2, lg: 4 }} gap="6">
        {stats.map((s) => (
          <Stat key={s.label} as="li" label={s.label} value={s.value} align="center" />
        ))}
      </Grid>
    </Section>
  );
}
