import type { ReactNode } from 'react';
import {
  Badge,
  Button,
  Container,
  Grid,
  Heading,
  Inline,
  Stack,
  Text,
} from '@arshad-shah/cynosure';
import { external } from '@arshad-shah/cynosure/icons';
import { site } from '../../data/site';

/** `widget` is the live prayer-times island, passed in from the page as a named slot. */
export default function Hero({ widget }: { widget?: ReactNode }) {
  return (
    <Container paddingBlock="10">
      <Grid columns={{ base: 1, lg: 2 }} gap="10" align="center">
        <Stack gap="7" align="start">
          <Badge tone="accent">Free · No ads · No tracking</Badge>
          <Heading level={1} size="display">
            Your whole deen, in one app.
          </Heading>
          <Text as="p" variant="lead">
            {site.description}
          </Text>
          <Inline gap="4" wrap>
            <Button
              href={site.playStoreUrl}
              target="_blank"
              variant="solid"
              tone="accent"
              size="lg"
              iconEnd={external}
            >
              Get it on Google Play
            </Button>
            <Button href="/features" size="lg">
              Explore features
            </Button>
          </Inline>
        </Stack>
        {widget}
      </Grid>
    </Container>
  );
}
