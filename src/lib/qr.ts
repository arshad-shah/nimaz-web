import QRCode from 'qrcode';

/**
 * Generates an inline SVG QR code at build time. Uses currentColor so the
 * code inherits theme text color. Error-correction M tolerates print/scale.
 */
export async function qrSvg(payload: string): Promise<string> {
  const svg = await QRCode.toString(payload, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    color: { dark: '#000000', light: '#00000000' },
  });
  // The qrcode library (verified for qrcode@1.5.4) uses #000000 only on the
  // module path stroke, so this swap is complete and correct. Revisit if
  // upgrading qrcode.
  // Strip fixed colors so it adapts to theme via currentColor on the wrapper.
  return svg.replace(/#000000/g, 'currentColor');
}
