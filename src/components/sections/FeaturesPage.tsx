/**
 * The `/features` body: a header with links to each category, then one section per category
 * from `features.ts`.
 *
 * Within a category, the features that have bespoke art (`illustrated`) lead with the large
 * alternating two-column treatment, and the rest follow as a card grid. Each category heading
 * carries the category id as an anchor, which the footer links to.
 */
import {
  AspectRatio,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Inline,
  PageHeader,
  Stack,
  Text,
} from '@arshad-shah/cynosure';
import { FeatureCard } from '../FeatureCard';
import StatsStrip from './StatsStrip';
import { featureCategories, features, featuresIn, type Feature } from '../../data/features';
import { FEATURE_ART_RATIO, featureArt } from '../../lib/feature-art';

// Inline passes other attributes to its element; its types do not list `aria-label` yet.
const categoriesNav = { 'aria-label': 'Feature categories' };

function LeadFeature({ feature, flip }: { feature: Feature; flip: boolean }) {
  const art = (
    <Card key="art" padding="none">
      <AspectRatio ratio={FEATURE_ART_RATIO} radius="card">
        <div dangerouslySetInnerHTML={{ __html: featureArt(feature.icon) }} />
      </AspectRatio>
    </Card>
  );
  const copy = (
    <Stack key="copy" gap="4">
      <Heading level={3} size="xl">
        {feature.title}
      </Heading>
      <Text as="p" tone="muted">
        {feature.body}
      </Text>
    </Stack>
  );
  return (
    <Grid columns={{ base: 1, lg: 2 }} gap="9" align="center">
      {flip ? [copy, art] : [art, copy]}
    </Grid>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <Container paddingBlock="10">
        <PageHeader
          eyebrow="Powerful Islamic companion"
          title="Everything you need, beautifully made"
          description={`${features.length} features across six areas of practice — and all of them work offline, on a phone that never asks you to sign in.`}
        >
          <Inline as="nav" gap="3" wrap {...categoriesNav}>
            {featureCategories.map((c) => (
              <Button key={c.id} href={`#${c.id}`} size="sm">
                {c.label}
              </Button>
            ))}
          </Inline>
        </PageHeader>
      </Container>
      {featureCategories.map((cat) => {
        const items = featuresIn(cat.id);
        const lead = items.filter((f) => f.illustrated);
        const rest = items.filter((f) => !f.illustrated);
        return (
          <Container key={cat.id} as="section" paddingBlock="9">
            <Stack gap="9">
              <Stack gap="3">
                <Heading level={2} size="2xl" id={cat.id}>
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
          </Container>
        );
      })}
      <StatsStrip />
    </>
  );
}
