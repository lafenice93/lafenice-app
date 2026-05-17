/**
 * /api/generate-avatar.js
 * Vercel Serverless Function — POST endpoint that generates a futuristic AI
 * beauty avatar from a user's captured selfie.
 *
 * Strategy: use OpenAI's image edits endpoint with `gpt-image-1` model,
 * passing the captured photo as the reference image. This preserves
 * identity at ~70–80% while letting the prompt re-style the look.
 *
 * Where to put the API key:
 *   - Local:   create `.env.local` from `.env.example` and set OPENAI_API_KEY
 *   - Vercel:  Project Settings → Environment Variables → OPENAI_API_KEY
 *
 * If OPENAI_API_KEY is missing the endpoint falls back to a "placeholder"
 * response that simply echoes the original photo — useful for demo builds.
 *
 * ──────────────────────────────────────────────────────────────
 * Verify the OpenAI Images API surface against the latest docs:
 *   https://platform.openai.com/docs/api-reference/images
 * ──────────────────────────────────────────────────────────────
 */

const PROMPT = [
  'A serene, cinematic AI beauty avatar inspired by the reference selfie.',
  'Keep the same face shape, eye spacing, lip shape, hairline, and skin tone.',
  'Refined porcelain skin with subtle inner glow, soft glossy lips,',
  'feathered brows, gentle catchlight in the eyes, neutral expression,',
  'editorial fashion lighting from upper-front 30°, soft warm key + cool cyan rim.',
  'Background: champagne-cream atmospheric haze with faint mint-cyan circuit motifs,',
  'subtle gold halo behind the head. Luxury biotech aesthetic.',
  'Photorealistic, 35mm portrait, shallow depth of field, no makeup-app filter look,',
  'no over-smoothing, preserve real skin texture.',
  'Frame: head and shoulders, centered, looking softly forward.',
].join(' ');

const MODEL    = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const SIZE     = process.env.OPENAI_IMAGE_SIZE  || '1024x1024';
const QUALITY  = 'high';

export default async function handler(req, res) {
  // ── CORS for previews (same-origin in prod) ─────────────────
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { photo, identityLock = 0.75 /* aesthetic = 'lafenice_default' */ } = req.body || {};
    if (!photo || typeof photo !== 'string' || !photo.startsWith('data:image')) {
      return res.status(400).json({ error: 'Missing or invalid `photo` (expected dataURL).' });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // ── Placeholder mode ──────────────────────────────────────
    // No key set → echo back the original so the UI flow still works.
    if (!apiKey) {
      return res.status(200).json({
        imageDataUrl: photo,
        identityScore: 1.0,
        prompt: PROMPT,
        placeholder: true,
        message: 'OPENAI_API_KEY not set — returning original selfie as placeholder.',
      });
    }

    // ── Convert dataURL → Buffer (and File-like) ──────────────
    const { buffer, mimeType } = decodeDataUrl(photo);
    const filename = `selfie.${mimeType.split('/')[1] || 'jpg'}`;
    const fileBlob = new Blob([buffer], { type: mimeType });

    // ── OpenAI Images Edits ───────────────────────────────────
    // We use multipart/form-data via the native FormData API.
    // The `image` field carries the reference selfie. The `prompt` field
    // steers the transformation while gpt-image-1 preserves identity.
    const form = new FormData();
    form.append('model', MODEL);
    form.append('prompt', `${PROMPT}\n\nIdentity preservation strength: ${identityLock.toFixed(2)}.`);
    form.append('size', SIZE);
    form.append('n', '1');
    if (MODEL === 'gpt-image-1') form.append('quality', QUALITY);
    form.append('image', fileBlob, filename);

    const openaiRes = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      console.error('[openai] error', openaiRes.status, errText);
      return res.status(502).json({
        error: 'Avatar provider error',
        detail: safeJson(errText),
      });
    }

    const payload = await openaiRes.json();
    const b64 = payload?.data?.[0]?.b64_json;
    if (!b64) {
      return res.status(502).json({ error: 'No image returned from provider', payload });
    }

    return res.status(200).json({
      imageDataUrl: `data:image/png;base64,${b64}`,
      identityScore: clamp01(identityLock + 0.05), // heuristic — replace with FAISS/face-embed compare later
      prompt: PROMPT,
      placeholder: false,
    });
  } catch (err) {
    console.error('[generate-avatar] fatal', err);
    return res.status(500).json({ error: 'Internal error', detail: String(err?.message || err) });
  }
}

// ────────────────────────────────────────────────────────────
// helpers
// ────────────────────────────────────────────────────────────

function decodeDataUrl(dataUrl) {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl);
  if (!match) throw new Error('Invalid data URL');
  return {
    mimeType: match[1],
    buffer: Buffer.from(match[2], 'base64'),
  };
}

function safeJson(text) {
  try { return JSON.parse(text); } catch { return text?.slice(0, 400); }
}

function clamp01(n) { return Math.max(0, Math.min(1, Number(n) || 0)); }

// ────────────────────────────────────────────────────────────
// Vercel runtime config: bump the body size so large dataURLs pass
// ────────────────────────────────────────────────────────────
export const config = {
  api: {
    bodyParser: { sizeLimit: '12mb' },
  },
};
