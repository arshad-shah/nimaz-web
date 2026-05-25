import { describe, it, expect } from 'vitest';
import jsQR from 'jsqr';
import QRCode from 'qrcode';
import { qrSvg } from '../qr';
import { PLAY_STORE_URL } from '../../data/site';

/** Rasterize an inline SVG and return what a scanner reads from it. */
async function scan(svg: string): Promise<string | undefined> {
  // `currentColor` has no paint context standalone, and the logo `<image href>`
  // is browser-resolved, so neither renders here — but the dark modules and the
  // cleared quiet center are exactly what ships, which is what the scan depends on.
  const concrete = svg.replace(/currentColor/g, '#000000');
  const sharp = (await import('sharp')).default;
  const { data, info } = await sharp(Buffer.from(concrete), { density: 300 })
    .resize(512, 512, { fit: 'fill' })
    .flatten({ background: '#ffffff' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return jsQR(new Uint8ClampedArray(data), info.width, info.height)?.data;
}

describe('qrSvg', () => {
  it('produces an inline svg with rounded modules and finder eyes', async () => {
    const svg = await qrSvg(PLAY_STORE_URL);
    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg).toContain('fill="currentColor"');
    // rounded geometry uses elliptical-arc commands; finder eyes use an even-odd ring
    expect(svg).toMatch(/a[\d.]+,[\d.]+ 0 0 1/);
    expect(svg).toContain('fill-rule="evenodd"');
  });

  it('rejects an empty payload', async () => {
    await expect(qrSvg('')).rejects.toThrow(TypeError);
  });

  it('rasterizes the default output and it scans to the Play Store URL', async () => {
    expect(await scan(await qrSvg(PLAY_STORE_URL))).toBe(PLAY_STORE_URL);
  });

  it('stays scannable with a center logo (modules under it are cleared)', async () => {
    const svg = await qrSvg(PLAY_STORE_URL, {
      logo: { href: '/icon-192.png', modules: 8 },
    });
    expect(svg).toContain('<image');
    expect(svg).toContain('clip-path');
    expect(await scan(svg)).toBe(PLAY_STORE_URL);
  });

  it('gives each logo code a unique clipPath id', async () => {
    const a = await qrSvg(PLAY_STORE_URL, { logo: { href: '/icon-192.png' } });
    const b = await qrSvg(PLAY_STORE_URL, { logo: { href: '/icon-192.png' } });
    const idOf = (svg: string) => svg.match(/id="(qr-logo-clip-\d+)"/)?.[1];
    expect(idOf(a)).toBeDefined();
    expect(idOf(a)).not.toBe(idOf(b));
  });

  it('decodes a raw raster from the library too (independent of the SVG renderer)', async () => {
    const data = await QRCode.toBuffer(PLAY_STORE_URL, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 256,
      type: 'png',
    });
    const { data: rgba, info } = await import('sharp').then((m) =>
      m.default(data).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
    );
    const decoded = jsQR(new Uint8ClampedArray(rgba), info.width, info.height);
    expect(decoded?.data).toBe(PLAY_STORE_URL);
  });
});
