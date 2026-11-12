import { Card, Heading, Prose, Section, Stack } from '@arshad-shah/cynosure';

export default function DeveloperMessage() {
  return (
    <Section size="md" paddingBlock="10">
      <Card padding="lg">
        <Stack gap="5">
          <Heading level={2}>A personal message from the developer</Heading>
          <Prose>
            <p>
              <em>Assalamu alaikum wa rahmatullahi wa barakatuh</em> (Peace be upon you),
            </p>
            <p>
              Nimaz was born from a desire to create a tool that would serve our Ummah (community)
              in their daily spiritual practice. As a developer and a Muslim, I wanted to combine my
              technical skills with my faith to produce something truly beneficial that could help
              us all stay connected to our prayers and religious obligations.
            </p>
            <p>
              This app represents countless hours of research, development, and testing to ensure
              accurate prayer times and reliable Qibla direction. It's my sincere hope that Nimaz
              becomes a trusted companion in your spiritual journey, making it easier to fulfill
              your religious duties wherever you may be.
            </p>
            <p>
              I welcome your feedback, suggestions, and prayers as we continue to refine and improve
              this humble offering. May Allah accept this work as a form of sadaqah jariyah (ongoing
              charity) and make it beneficial for all who use it.
            </p>
            <p>Jazakum Allahu Khayran (May Allah reward you with goodness),</p>
            <p>
              <strong>Arshad Shah</strong>
            </p>
          </Prose>
        </Stack>
      </Card>
    </Section>
  );
}
