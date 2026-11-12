import {
  Button,
  CynosureTheme,
  Inline,
  SiteHeader,
  ThemeToggle,
  useColorMode,
} from '@arshad-shah/cynosure';
import { googleplay } from '@arshad-shah/cynosure/brands';
import { Brand } from '../Brand';
import { site } from '../../data/site';
import { brand, MODE_KEY } from '../../theme';

/**
 * The site's top bar, and the owner of the colour mode: `CynosureTheme target="document"` puts
 * the mode the visitor picks on <html>, where every Cynosure component on the page reads it.
 */
export default function Header({ path }: { path: string }) {
  const { mode, setMode } = useColorMode({ key: MODE_KEY });
  return (
    <CynosureTheme target="document" mode={mode}>
      <SiteHeader
        brand={<Brand />}
        nav={site.nav.map((n) => ({ label: n.label, href: n.href, current: path === n.href }))}
        actions={
          <>
            <ThemeToggle variant="cycle" value={mode} onChange={setMode} />
            <Inline hideBelow="sm">
              <Button
                href={site.playStoreUrl}
                target="_blank"
                variant="solid"
                color={brand.gold}
                icon={googleplay}
              >
                Download
              </Button>
            </Inline>
          </>
        }
      />
    </CynosureTheme>
  );
}
