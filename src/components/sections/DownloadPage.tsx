import {
  AspectRatio,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Heading,
  Icon,
  Inline,
  PageHeader,
  Stack,
  Steps,
  Text,
} from '@arshad-shah/cynosure';
import { check, external, scanLine } from '@arshad-shah/cynosure/icons';
import { PrayerList } from '../PrayerList';
import { site } from '../../data/site';
import { getPrayerSchedule, DEFAULT_LOCATION } from '../../lib/prayer';

const steps = [
  {
    id: 'download',
    label: 'Download',
    description: 'Scan the QR code or tap the button to get Nimaz from Google Play.',
  },
  {
    id: 'install',
    label: 'Install',
    description: 'Tap "Install". The app is compact and installs quickly.',
  },
  {
    id: 'setup',
    label: 'Set up',
    description: 'Grant location for accurate prayer times and Qibla direction when prompted.',
  },
];

// A fixed day, so the preview is the same on every build.
const preview = getPrayerSchedule({
  location: DEFAULT_LOCATION,
  date: new Date('2024-04-01T09:00:00Z'),
}).prayers.map((p) => ({ ...p, isNext: false }));

/** `qr` is the QR code as an SVG string, generated at build time by `lib/qr.ts`. */
export default function DownloadPage({ qr }: { qr: string }) {
  return (
    <Container paddingBlock="10">
      <Grid columns={{ base: 1, lg: 2 }} gap="10" align="start">
        <Stack gap="8" align="start">
          <PageHeader
            title="Download Nimaz today"
            eyebrow="Free · No ads · No in-app purchases"
            description={`Rating ${site.app.rating} · ${site.app.size} · ${site.app.minOs} · by ${site.developer}`}
          />
          <Steps
            steps={steps}
            orientation="vertical"
            size="lg"
            current="download"
            labels={{ list: 'How to install' }}
          />
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
          <Card padding="lg">
            <Stack gap="5">
              <Inline gap="6" align="center" wrap>
                <AspectRatio ratio={1} style={{ inlineSize: '9rem', flex: 'none' }}>
                  <div
                    role="img"
                    aria-label="QR code linking to the Nimaz app on Google Play"
                    dangerouslySetInnerHTML={{ __html: qr }}
                  />
                </AspectRatio>
                <Stack gap="3" style={{ flex: '1 1 14rem' }}>
                  <Heading level={2} size="lg">
                    Scan to download
                  </Heading>
                  <Text as="p" size="sm" tone="muted">
                    Point your phone’s camera at the code to open Nimaz on Google Play — no typing,
                    no searching.
                  </Text>
                  <Text variant="caption">Requires {site.app.minOs}.</Text>
                  <Inline gap="2" wrap>
                    {['Free', 'No ads', 'No tracking'].map((t) => (
                      <Badge key={t} tone="accent" icon={check}>
                        {t}
                      </Badge>
                    ))}
                  </Inline>
                </Stack>
              </Inline>
              <Divider />
              <Inline gap="3" align="center">
                <Icon icon={scanLine} tone="muted" />
                <Text variant="caption">
                  Takes you straight to the official Google Play listing.
                </Text>
              </Inline>
            </Stack>
          </Card>
        </Stack>
        <Card padding="lg" className="preview">
          <Stack gap="5">
            <Text variant="eyebrow">Today in {DEFAULT_LOCATION.label}</Text>
            <PrayerList prayers={preview} />
          </Stack>
        </Card>
      </Grid>
    </Container>
  );
}
