import { Avatar, Inline, Text } from '@arshad-shah/cynosure';
import { site } from '../data/site';

/** The Nimaz mark beside the name. The picture is decorative: the name is written next to it. */
export function Brand() {
  return (
    <Inline gap="4" align="center" as="span">
      <Avatar name={site.name} src="/icon-192.png" shape="square" decorative />
      <Text size="lg" weight="bold">
        {site.name}
      </Text>
    </Inline>
  );
}
