import { useState } from 'react';
import {
  Button,
  Container,
  CynosureTheme,
  IconButton,
  Inline,
  Sheet,
  SideNav,
  Stack,
  ThemeToggle,
  useColorMode,
} from '@arshad-shah/cynosure';
import { download, menu } from '@arshad-shah/cynosure/icons';
import { Brand } from '../Brand';
import { site } from '../../data/site';

// Inline passes other attributes to its element; its types do not list `aria-label` yet.
const primary = { 'aria-label': 'Primary' };

const drawerItems = [
  { id: '/', label: 'Home', href: '/' },
  ...site.nav.map((n) => ({ id: n.href, label: n.label, href: n.href })),
];

/**
 * The site's top bar, and the owner of the colour mode: `CynosureTheme target="document"` puts
 * the mode the visitor picked on <html>, where every Cynosure component on the page reads it.
 * Wide screens get the links in the bar; narrow ones get them in a Sheet.
 */
export default function SiteHeader({ path }: { path: string }) {
  const { mode, setMode } = useColorMode();
  const [open, setOpen] = useState(false);
  return (
    <CynosureTheme target="document" mode={mode}>
      <header className="site-header">
        <Container paddingBlock="4">
          <Inline justify="between" align="center">
            <Button href="/" variant="ghost" size="lg">
              <Brand />
            </Button>
            <Inline gap="4" align="center">
              <Inline as="nav" gap="2" className="only-wide" {...primary}>
                {site.nav.map((n) => (
                  <Button
                    key={n.href}
                    href={n.href}
                    variant="ghost"
                    aria-current={path === n.href ? 'page' : undefined}
                  >
                    {n.label}
                  </Button>
                ))}
              </Inline>
              <ThemeToggle variant="cycle" value={mode} onChange={setMode} />
              <Button
                className="only-wide"
                href={site.playStoreUrl}
                target="_blank"
                variant="solid"
                tone="accent"
                icon={download}
              >
                Download
              </Button>
              <IconButton
                className="only-narrow"
                icon={menu}
                label="Open menu"
                onClick={() => setOpen(true)}
              />
            </Inline>
          </Inline>
        </Container>
      </header>
      <Sheet open={open} onOpenChange={setOpen} side="end" size="sm" title="Menu">
        <Stack gap="6">
          <SideNav
            label="Mobile"
            current={path}
            items={drawerItems}
            onNavigate={() => setOpen(false)}
          />
          <Button
            href={site.playStoreUrl}
            target="_blank"
            variant="solid"
            tone="accent"
            icon={download}
            fullWidth
          >
            Download
          </Button>
        </Stack>
      </Sheet>
    </CynosureTheme>
  );
}
