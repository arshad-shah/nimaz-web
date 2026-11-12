import { IconButton, SiteFooter } from '@arshad-shah/cynosure';
import { github } from '@arshad-shah/cynosure/brands';
import { globe, mail } from '@arshad-shah/cynosure/icons';
import { Brand } from '../Brand';
import { site } from '../../data/site';
import { featureCategories } from '../../data/features';

const columns = [
  {
    title: 'Pages',
    links: [{ label: 'Home', href: '/' }, ...site.nav.map((n) => ({ ...n }))],
  },
  {
    title: 'Features',
    links: featureCategories.map((c) => ({ label: c.label, href: `/features#${c.id}` })),
  },
  {
    title: 'Contact',
    links: [
      { label: site.email, href: `mailto:${site.email}` },
      { label: 'arshadshah.com', href: site.website, external: true },
      { label: 'GitHub', href: site.github, external: true },
    ],
  },
];

export default function Footer({ year }: { year: number }) {
  return (
    <SiteFooter
      brand={<Brand />}
      tagline="A beautifully designed companion for your daily Islamic practices with accurate prayer times and Qibla direction."
      columns={columns}
      legal={
        <>
          © {year} {site.name}. All rights reserved. Made by {site.developer}.
        </>
      }
      social={
        <>
          <IconButton
            icon={mail}
            label="Email"
            href={`mailto:${site.email}`}
            variant="ghost"
            tone="neutral"
          />
          <IconButton
            icon={globe}
            label="Website"
            href={site.website}
            variant="ghost"
            tone="neutral"
          />
          <IconButton
            icon={github}
            label="GitHub"
            href={site.github}
            variant="ghost"
            tone="neutral"
          />
        </>
      }
    />
  );
}
