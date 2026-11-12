import { Button, Container, EmptyState } from '@arshad-shah/cynosure';
import { compass } from '@arshad-shah/cynosure/icons';

export default function NotFound() {
  return (
    <Container size="sm" paddingBlock="10">
      <EmptyState
        icon={compass}
        title="Page not found"
        headingLevel={2}
        description="The page you're looking for doesn't exist."
        actions={
          <Button href="/" variant="solid" tone="accent">
            Back to home
          </Button>
        }
      />
    </Container>
  );
}
