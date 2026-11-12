import {
  Button,
  Card,
  Container,
  Grid,
  GridItem,
  Heading,
  Icon,
  Inline,
  PageHeader,
  Stack,
  Text,
} from '@arshad-shah/cynosure';
import { check, download } from '@arshad-shah/cynosure/icons';
import { QaAccordion } from './QaAccordion';
import { privacy } from '../../data/privacy';

export default function PrivacyPage() {
  return (
    <Container paddingBlock="10">
      <Stack gap="9">
        <PageHeader
          eyebrow={`Last updated · ${privacy.updated}`}
          title="Privacy Policy"
          description="Your privacy matters to us. Learn how Nimaz protects your data while providing essential Islamic services."
        />
        <Grid columns={{ base: 1, lg: 3 }} gap="9" align="start">
          <GridItem span={2}>
            <Stack gap="9" align="stretch">
              <Stack gap="5" as="section">
                <Heading level={2}>Policy details</Heading>
                <QaAccordion
                  headingLevel={3}
                  items={privacy.sections.map((s) => ({ summary: s.title, body: s.body }))}
                />
              </Stack>
              <Stack gap="5" as="section">
                <Heading level={2}>Frequently asked questions</Heading>
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
          <GridItem as="aside" className="sticky-aside">
            <Card padding="lg">
              <Stack gap="5">
                <Heading level={2} size="lg">
                  Privacy at a glance
                </Heading>
                <Stack as="ul" gap="4">
                  {privacy.glance.map((g) => (
                    <li key={g}>
                      <Inline gap="4" align="start" as="span">
                        <Icon icon={check} tone="accent" />
                        <Text size="sm" tone="muted">
                          {g}
                        </Text>
                      </Inline>
                    </li>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </GridItem>
        </Grid>
      </Stack>
    </Container>
  );
}
