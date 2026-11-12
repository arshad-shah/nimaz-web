import {
  Badge,
  Button,
  Card,
  DeviceFrame,
  Divider,
  Grid,
  Heading,
  Icon,
  Image,
  Inline,
  List,
  PageHeader,
  QRCode,
  Section,
  Stack,
  Text,
} from '@arshad-shah/cynosure';
import { googleplay } from '@arshad-shah/cynosure/brands';
import { check, scanLine } from '@arshad-shah/cynosure/icons';
import { PrayerList } from '../PrayerList';
import { site } from '../../data/site';
import { getPrayerSchedule, DEFAULT_LOCATION } from '../../lib/prayer';

const steps = [
  {
    label: 'Download',
    description: 'Scan the QR code or tap the button to get Nimaz from Google Play.',
  },
  {
    label: 'Install',
    description: 'Tap "Install". The app is compact and installs quickly.',
  },
  {
    label: 'Set up',
    description: 'Grant location for accurate prayer times and Qibla direction when prompted.',
  },
];

// A fixed day, so the preview is the same on every build.
const preview = getPrayerSchedule({
  location: DEFAULT_LOCATION,
  date: new Date('2024-04-01T09:00:00Z'),
}).prayers.map((p) => ({ ...p, isNext: false }));

export default function DownloadPage() {
  return (
    <Section>
      <Grid columns={{ base: 1, lg: 2 }} gap="10" align="start">
        <Stack gap="8" align="start">
          <PageHeader
            titleSize="3xl"
            title="Download Nimaz today"
            eyebrow="Free · No ads · No in-app purchases"
            description={`Rating ${site.app.rating} · ${site.app.size} · ${site.app.minOs} · by ${site.developer}`}
          />
          <List marker="number" size="lg" gap="lg" label="How to install" items={steps} />
          <Button
            href={site.playStoreUrl}
            target="_blank"
            variant="solid"
            tone="accent"
            size="lg"
            icon={googleplay}
          >
            Get it on Google Play
          </Button>
          <Card padding="lg">
            <Stack gap="5">
              <Inline gap="6" align="center" wrap>
                <QRCode
                  value={site.playStoreUrl}
                  label="QR code linking to the Nimaz app on Google Play"
                  icon={<Image src="/icon-192.png" alt="" width={192} height={192} radius="sm" />}
                />
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
        <Stack align="center">
          <DeviceFrame label="Prayer times in the Nimaz app">
            <Stack gap="4" padding="5">
              <Text variant="eyebrow">Today in {DEFAULT_LOCATION.label}</Text>
              <PrayerList prayers={preview} />
            </Stack>
          </DeviceFrame>
        </Stack>
      </Grid>
    </Section>
  );
}
