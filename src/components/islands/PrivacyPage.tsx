import {
  Button,
  Card,
  Grid,
  GridItem,
  Heading,
  Inline,
  List,
  PageHeader,
  Section,
  Stack,
} from '@arshad-shah/cynosure';
import { download } from '@arshad-shah/cynosure/icons';
import { QaAccordion } from './QaAccordion';
import { privacy } from '../../data/privacy';

export default function PrivacyPage() {
  return (
    <Section>
      <Stack gap="9">
        <PageHeader
          titleSize="3xl"
          eyebrow={`Last updated · ${privacy.updated}`}
          title="Privacy Policy"
          description="Your privacy matters to us. Learn how Nimaz protects your data while providing essential Islamic services."
        />
        <Grid columns={{ base: 1, lg: 3 }} gap="9" align="start">
          <GridItem span={{ base: 'full', lg: 2 }}>
            <Stack gap="9" align="stretch">
              <Stack gap="5" as="section" aria-labelledby="policy-details">
                <Heading level={2} id="policy-details">
                  Policy details
                </Heading>
                <QaAccordion
                  headingLevel={3}
                  items={privacy.sections.map((s) => ({ summary: s.title, body: s.body }))}
                />
              </Stack>
              <Stack gap="5" as="section" aria-labelledby="privacy-faq">
                <Heading level={2} id="privacy-faq">
                  Frequently asked questions
                </Heading>
                <QaAccordion
                  headingLevel={3}
                  items={privacy.faqs.map((f) => ({ summary: f.q, body: f.a }))}
                />
              </Stack>
              <Inline>
                <Button href="/legal/Privacy-Policy.pdf" target="_blank" icon={download}>
                  Download complete policy (PDF)
                </Button>
              </Inline>
            </Stack>
          </GridItem>
          <GridItem as="aside" sticky stickyOffset="6rem">
            <Card padding="lg">
              <Stack gap="5">
                <Heading level={2} size="lg">
                  Privacy at a glance
                </Heading>
                <List
                  marker="check"
                  tone="accent"
                  items={privacy.glance.map((g) => ({ label: g }))}
                />
              </Stack>
            </Card>
          </GridItem>
        </Grid>
      </Stack>
    </Section>
  );
}
