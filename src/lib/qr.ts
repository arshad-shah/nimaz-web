import QRCode, { type QRCodeErrorCorrectionLevel } from 'qrcode';

export interface QrLogoOptions {
  /** Image source drawn in the center via `<image>` (resolved by the browser). */
  href: string;
  /** Footprint in QR modules (square). Modules underneath are cleared so the code stays readable. */
  modules?: number;
  /** Tile corner radius as a ratio of the logo size (0 square … 0.5 circle). */
  radius?: number;
  /** Knockout plate color behind the logo, separating it from the modules. */
  plate?: string;
}

export interface QrSvgOptions {
  /**
   * Error correction. 'H' (~30% recovery) is the default and is required to stay
   * scannable when a center logo masks part of the symbol.
   */
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
  /** Quiet-zone width in modules. */
  margin?: number;
  /** Module fill. Defaults to `currentColor` so the code follows the theme's text color. */
  color?: string;
  /** Data-module corner radius as a ratio of module size (0 square … 0.5 circle). */
  moduleRadius?: number;
  /** Center logo, or `false` to omit it. */
  logo?: QrLogoOptions | false;
}

const DEFAULTS = {
  errorCorrectionLevel: 'H' as QRCodeErrorCorrectionLevel,
  margin: 2,
  color: 'currentColor',
  moduleRadius: 0.3,
} satisfies Omit<Required<QrSvgOptions>, 'logo'>;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

// Monotonic id so several codes on one page can't share a clipPath id.
let clipSeq = 0;

/** Rounded-rectangle path, drawn clockwise from the top-left corner. */
function roundedRect(x: number, y: number, w: number, h: number, r: number): string {
  r = clamp(r, 0, Math.min(w, h) / 2);
  return (
    `M${x + r},${y}h${w - 2 * r}a${r},${r} 0 0 1 ${r},${r}` +
    `v${h - 2 * r}a${r},${r} 0 0 1 ${-r},${r}` +
    `h${-(w - 2 * r)}a${r},${r} 0 0 1 ${-r},${-r}` +
    `v${-(h - 2 * r)}a${r},${r} 0 0 1 ${r},${-r}z`
  );
}

/** True for the three 7×7 finder patterns in the symbol corners. */
function isFinder(row: number, col: number, size: number): boolean {
  return (row < 7 && col < 7) || (row < 7 && col >= size - 7) || (row >= size - 7 && col < 7);
}

/** A rounded finder "eye": an even-odd ring plus a solid rounded center. */
function finderEye(row: number, col: number, margin: number): string {
  const x = col + margin;
  const y = row + margin;
  const ring = roundedRect(x, y, 7, 7, 2) + roundedRect(x + 1, y + 1, 5, 5, 1.3);
  const pupil = roundedRect(x + 2, y + 2, 3, 3, 1);
  return `<path fill-rule="evenodd" d="${ring}"/><path d="${pupil}"/>`;
}

/**
 * Generates an inline SVG QR code at build time. Data modules render as rounded
 * dots and the corners as rounded "eyes" for a softer, on-brand look; the symbol
 * uses high error correction so an optional center logo stays scannable.
 *
 * The default `currentColor` fill lets the code inherit the surrounding theme's
 * text color. The returned string is a bare `<svg>`; the caller is responsible
 * for the accessible wrapper (role/label).
 */
export async function qrSvg(payload: string, options: QrSvgOptions = {}): Promise<string> {
  if (typeof payload !== 'string' || payload.length === 0) {
    throw new TypeError('qrSvg: payload must be a non-empty string');
  }
  const errorCorrectionLevel = options.errorCorrectionLevel ?? DEFAULTS.errorCorrectionLevel;
  const margin = Math.max(0, options.margin ?? DEFAULTS.margin);
  const color = options.color ?? DEFAULTS.color;
  const moduleRadius = clamp(options.moduleRadius ?? DEFAULTS.moduleRadius, 0, 0.5);
  const logo = options.logo || null;

  const qr = QRCode.create(payload, { errorCorrectionLevel });
  const size = qr.modules.size;
  const dim = size + margin * 2;
  const center = dim / 2;

  // Footprint (in module units) cleared beneath the logo so it never masks data
  // the error correction can't recover.
  const clearHalf = logo ? clamp(logo.modules ?? 8, 0, size) / 2 : 0;

  let dots = '';
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!qr.modules.get(row, col) || isFinder(row, col, size)) continue;
      const x = col + margin;
      const y = row + margin;
      if (
        clearHalf > 0 &&
        Math.abs(x + 0.5 - center) <= clearHalf &&
        Math.abs(y + 0.5 - center) <= clearHalf
      ) {
        continue;
      }
      dots += roundedRect(x, y, 1, 1, moduleRadius);
    }
  }

  let body = `<path d="${dots}"/>`;
  body += finderEye(0, 0, margin);
  body += finderEye(0, size - 7, margin);
  body += finderEye(size - 7, 0, margin);

  if (logo) {
    const tile = clamp(logo.modules ?? 8, 1, size);
    const plate = tile + 1.4;
    const radius = clamp(logo.radius ?? 0.22, 0, 0.5);
    const plateColor = logo.plate ?? 'var(--surface, #ffffff)';
    const tx = center - tile / 2;
    const clipId = `qr-logo-clip-${clipSeq++}`;
    body +=
      `<path d="${roundedRect(center - plate / 2, center - plate / 2, plate, plate, plate * radius)}" fill="${plateColor}"/>` +
      `<clipPath id="${clipId}"><path d="${roundedRect(tx, tx, tile, tile, tile * radius)}"/></clipPath>` +
      `<image href="${logo.href}" x="${tx}" y="${tx}" width="${tile}" height="${tile}" clip-path="url(#${clipId})" preserveAspectRatio="xMidYMid slice"/>`;
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}" ` +
    `fill="${color}" shape-rendering="geometricPrecision">${body}</svg>`
  );
}
