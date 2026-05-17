/**
 * avatar.js — Client-side wrapper for the avatar generation API.
 *
 * The actual OpenAI call happens server-side in /api/generate-avatar.js
 * (never expose your OPENAI_API_KEY to the browser).
 *
 * Returns: { imageDataUrl, identityScore, prompt, placeholder }
 */

/**
 * generateAvatar
 * @param {string} photoDataUrl — base64 dataURL of the captured selfie
 * @param {object} opts — { identityLock?: number  // 0–1, target similarity }
 */
export async function generateAvatar(photoDataUrl, opts = {}) {
  if (!photoDataUrl) throw new Error('No photo provided');

  const res = await fetch('/api/generate-avatar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      photo: photoDataUrl,
      identityLock: opts.identityLock ?? 0.75,
      aesthetic: opts.aesthetic ?? 'lafenice_default',
    }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody?.error || `Avatar API failed (${res.status})`);
  }

  /** @type {{imageDataUrl:string, identityScore?:number, prompt?:string, placeholder?:boolean}} */
  const data = await res.json();
  return data;
}
