import { PageHeader, Section, Stack } from '@arshad-shah/cynosure';
import { QaAccordion } from './QaAccordion';
import type { Faq } from '../../data/faq';

export default function FaqSection({ items }: { items: Faq[] }) {
  return (
    <Section size="md" paddingBlock="10">
      <Stack gap="8">
        <PageHeader
          as="div"
          headingLevel={2}
          titleSize="2xl"
          eyebrow="FAQ"
          title="Frequently asked questions"
        />
        <QaAccordion headingLevel={3} items={items.map((f) => ({ summary: f.q, body: f.a }))} />
      </Stack>
    </Section>
  );
}
