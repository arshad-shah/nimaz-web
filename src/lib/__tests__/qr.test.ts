import { describe, it, expect } from 'vitest';
import jsQR from 'jsqr';
import QRCode from 'qrcode';
import { qrSvg } from '../qr';
import { PLAY_STORE_URL } from '../../data/site';

describe('qrSvg', () => {
  it('produces an inline svg', async () => {
    const svg = await qrSvg(PLAY_STORE_URL);
    expect(svg.startsWith('<svg')).toBe(true);
  });

  it('decodes back to the real Play Store URL', async () => {
    // Render to a raw pixel matrix and decode it to prove it scans.
    const size = 256;
    const data = await QRCode.toBuffer(PLAY_STORE_URL, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: size,
      type: 'png',
    });
    const { data: rgba, info } = await import('sharp').then((m) =>
      m.default(data).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
    );
    const decoded = jsQR(new Uint8ClampedArray(rgba), info.width, info.height);
    expect(decoded?.data).toBe(PLAY_STORE_URL);
  });

  it('rasterizes the actual qrSvg() output and it scans to the Play Store URL', async () => {
    const svg = await qrSvg(PLAY_STORE_URL);
    // currentColor has no paint context when rendered standalone; substitute a
    // concrete dark color for rasterization only. Geometry (the QR modules) is
    // identical to what ships — this proves the emitted SVG itself scans.
    const concrete = svg.replace(/currentColor/g, '#000000');
    const sharp = (await import('sharp')).default;
    const { data, info } = await sharp(Buffer.from(concrete))
      .flatten({ background: '#ffffff' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const decoded = jsQR(new Uint8ClampedArray(data), info.width, info.height);
    expect(decoded?.data).toBe(PLAY_STORE_URL);
  });
});
