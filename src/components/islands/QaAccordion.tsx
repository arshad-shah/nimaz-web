import { Accordion, AccordionItem, Text } from '@arshad-shah/cynosure';

export interface QaItem {
  summary: string;
  body: string;
}

/**
 * Questions and answers (or policy sections) as a Cynosure Accordion. Several can be open at
 * once, so a reader can compare answers, and `scripts/gen-legal.mjs` can open them all to print.
 */
export function QaAccordion({ items, headingLevel }: { items: QaItem[]; headingLevel: 2 | 3 }) {
  return (
    <Accordion type="multiple" variant="card" headingLevel={headingLevel}>
      {items.map((item) => (
        <AccordionItem key={item.summary} value={item.summary} summary={item.summary}>
          <Text as="p" tone="muted">
            {item.body}
          </Text>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
