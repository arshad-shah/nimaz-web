import {
  Button,
  Card,
  DescriptionList,
  Grid,
  Heading,
  Icon,
  Inline,
  PageHeader,
  Section,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
} from '@arshad-shah/cynosure';
import { checkCircle, download, mail, xCircle } from '@arshad-shah/cynosure/icons';
import type { IconData } from '@arshad-shah/cynosure';
import { terms } from '../../data/terms';
import { site } from '../../data/site';

interface Use {
  heading: string;
  body: string;
}

function Uses({
  title,
  tone,
  icon,
  items,
}: {
  title: string;
  tone: 'success' | 'danger';
  icon: IconData;
  items: readonly Use[];
}) {
  return (
    <Card padding="lg" edge={tone}>
      <Stack gap="5">
        <Inline gap="3" align="center">
          <Icon icon={icon} tone={tone} size="lg" />
          <Heading level={2} size="lg">
            {title}
          </Heading>
        </Inline>
        <DescriptionList
          layout="stacked"
          items={items.map((p) => ({ term: p.heading, detail: p.body }))}
        />
      </Stack>
    </Card>
  );
}

export default function TermsPage() {
  return (
    <Section>
      <Stack gap="9">
        <PageHeader
          titleSize="3xl"
          eyebrow={`Effective · ${terms.effective}`}
          title="Terms & Conditions"
          description="Understanding the terms of use for Nimaz helps ensure a positive experience for everyone."
        />
        <Tabs variant="soft">
          <TabList label="Sections of the terms">
            {terms.tabs.map((t) => (
              <Tab key={t.id} value={t.id}>
                {t.title}
              </Tab>
            ))}
          </TabList>
          {terms.tabs.map((t) => (
            <TabPanel key={t.id} value={t.id}>
              <Stack gap="6" paddingBlock="6">
                <Text as="p" variant="lead">
                  {t.description}
                </Text>
                {t.items.map((it) => (
                  <Card key={it.heading} padding="lg">
                    <Stack gap="3">
                      <Heading level={2} size="md">
                        {it.heading}
                      </Heading>
                      <Text as="p" size="sm" tone="muted">
                        {it.body}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </TabPanel>
          ))}
        </Tabs>
        <Grid columns={{ base: 1, md: 2 }} gap="6">
          <Uses title="Permitted uses" tone="success" icon={checkCircle} items={terms.permitted} />
          <Uses title="Prohibited uses" tone="danger" icon={xCircle} items={terms.prohibited} />
        </Grid>
        <Inline gap="4" wrap>
          <Button href="/legal/Terms-and-Conditions.pdf" target="_blank" icon={download}>
            Download complete terms (PDF)
          </Button>
          <Button href={`mailto:${site.email}`} variant="solid" tone="accent" icon={mail}>
            Contact developer
          </Button>
        </Inline>
      </Stack>
    </Section>
  );
}
