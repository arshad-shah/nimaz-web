/**
 * The `/features` body: a header with links to each category, then one section per category
 * from `features.ts`.
 *
 * Within a category, the features that have bespoke art (`illustrated`) lead with the large
 * alternating two-column treatment, and the rest follow as a card grid. Each section carries
 * its category id as an anchor, which the footer links to.
 */
import {
  AspectRatio,
  Button,
  Card,
  Grid,
  GridItem,
  Heading,
  Inline,
  PageHeader,
  Section,
  Stack,
  Text,
} from '@arshad-shah/cynosure';
import { FeatureCard } from '../FeatureCard';
import StatsStrip from './StatsStrip';
import { featureCategories, features, featuresIn, type Feature } from '../../data/features';
import { FEATURE_ART_RATIO, featureArt } from '../../lib/feature-art';

/** Art then words; on wide screens every second row puts the art on the other side. */
function LeadFeature({ feature, flip }: { feature: Feature; flip: boolean }) {
  return (
    <Grid columns={{ base: 1, lg: 2 }} gap="9" align="center">
      <GridItem order={flip ? { lg: 2 } : undefined}>
        <Card padding="none">
          <AspectRatio ratio={FEATURE_ART_RATIO} radius="card">
            <div dangerouslySetInnerHTML={{ __html: featureArt(feature.icon) }} />
          </AspectRatio>
        </Card>
      </GridItem>
      <Stack gap="4">
        <Heading level={3} size="xl">
          {feature.title}
        </Heading>
        <Text as="p" tone="muted">
          {feature.body}
        </Text>
      </Stack>
    </Grid>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <Section paddingBlock="10">
        <PageHeader
          titleSize="3xl"
          eyebrow="Powerful Islamic companion"
          title="Everything you need, beautifully made"
          description={`${features.length} features across six areas of practice — and all of them work offline, on a phone that never asks you to sign in.`}
        >
          <Inline as="nav" gap="3" wrap aria-label="Feature categories">
            {featureCategories.map((c) => (
              <Button key={c.id} href={`#${c.id}`} size="sm">
                {c.label}
              </Button>
            ))}
          </Inline>
        </PageHeader>
      </Section>
      {featureCategories.map((cat) => {
        const items = featuresIn(cat.id);
        const lead = items.filter((f) => f.illustrated);
        const rest = items.filter((f) => !f.illustrated);
        return (
          <Section key={cat.id} id={cat.id} aria-labelledby={`${cat.id}-title`}>
            <Stack gap="9">
              <Stack gap="3">
                <Heading level={2} size="2xl" id={`${cat.id}-title`}>
                  {cat.label}
                </Heading>
                <Text as="p" variant="lead">
                  {cat.blurb}
                </Text>
              </Stack>
              {lead.map((f, i) => (
                <LeadFeature key={f.title} feature={f} flip={i % 2 === 1} />
              ))}
              {rest.length > 0 && (
                <Grid columns={{ base: 1, sm: 2, lg: 3 }} gap="6">
                  {rest.map((f) => (
                    <FeatureCard key={f.title} feature={f} level={3} />
                  ))}
                </Grid>
              )}
            </Stack>
          </Section>
        );
      })}
      <StatsStrip />
    </>
  );
}
