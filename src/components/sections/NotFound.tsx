import { Button, EmptyState, Section } from '@arshad-shah/cynosure';
import { compass } from '@arshad-shah/cynosure/icons';

export default function NotFound() {
  return (
    <Section size="sm">
      <EmptyState
        icon={compass}
        title="Page not found"
        headingLevel={1}
        description="The page you're looking for doesn't exist."
        actions={
          <Button href="/" variant="solid" tone="accent">
            Back to home
          </Button>
        }
      />
    </Section>
  );
}
