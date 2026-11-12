import { Grid, Link, PageHeader, Section, Stack, Text } from '@arshad-shah/cynosure';
import { FeatureCard } from '../FeatureCard';
import { features } from '../../data/features';

/** The home page's first `limit` features, with a link to the whole catalogue. */
export default function FeatureGrid({ limit }: { limit: number }) {
  const items = features.slice(0, limit);
  return (
    <Section paddingBlock="10">
      <Stack gap="8">
        <PageHeader
          as="div"
          headingLevel={2}
          titleSize="2xl"
          eyebrow="Everything in one place"
          title="A complete Islamic companion"
        />
        <Grid columns={{ base: 1, sm: 2, lg: 3 }} gap="6">
          {items.map((f) => (
            <FeatureCard key={f.title} feature={f} level={3} />
          ))}
        </Grid>
        {features.length > items.length && (
          <Text as="p" size="sm" tone="muted" align="center">
            <Link href="/features">See all {features.length} features</Link> — trackers, tasbih,
            duas, zakat, khatam plans, widgets and more.
          </Text>
        )}
      </Stack>
    </Section>
  );
}
