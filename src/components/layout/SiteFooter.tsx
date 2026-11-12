import {
  Container,
  Divider,
  Grid,
  Heading,
  Inline,
  SideNav,
  Stack,
  Text,
} from '@arshad-shah/cynosure';
import { github } from '@arshad-shah/cynosure/brands';
import { globe, mail } from '@arshad-shah/cynosure/icons';
import { Brand } from '../Brand';
import { site } from '../../data/site';
import { featureCategories } from '../../data/features';

const pages = [
  { id: 'home', label: 'Home', href: '/' },
  ...site.nav.map((n) => ({ id: n.href, label: n.label, href: n.href })),
];
const features = featureCategories.map((c) => ({
  id: c.id,
  label: c.label,
  href: `/features#${c.id}`,
}));
const contact = [
  { id: 'email', label: site.email, href: `mailto:${site.email}`, icon: mail },
  { id: 'website', label: 'arshadshah.com', href: site.website, icon: globe },
  { id: 'github', label: 'GitHub', href: site.github, icon: github },
];

export default function SiteFooter({ year }: { year: number }) {
  return (
    <footer className="site-footer">
      <Container paddingBlock="10">
        <Stack gap="9">
          <Grid columns={{ base: 1, sm: 2, lg: 4 }} gap="9">
            <Stack gap="5" align="start">
              <Brand />
              <Text as="p" size="sm" tone="muted">
                A beautifully designed companion for your daily Islamic practices with accurate
                prayer times and Qibla direction.
              </Text>
            </Stack>
            <Stack gap="4">
              <Heading level={2} size="sm">
                Pages
              </Heading>
              <SideNav label="Footer" size="sm" items={pages} />
            </Stack>
            <Stack gap="4">
              <Heading level={2} size="sm">
                Features
              </Heading>
              <SideNav label="Features" size="sm" items={features} />
            </Stack>
            <Stack gap="4">
              <Heading level={2} size="sm">
                Contact
              </Heading>
              <SideNav label="Contact" size="sm" items={contact} />
            </Stack>
          </Grid>
          <Divider />
          <Inline justify="between" wrap>
            <Text variant="caption">
              © {year} {site.name}. All rights reserved.
            </Text>
            <Text variant="caption">Made by {site.developer}</Text>
          </Inline>
        </Stack>
      </Container>
    </footer>
  );
}
