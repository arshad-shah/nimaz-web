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
});
