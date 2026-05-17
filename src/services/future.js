/**
 * future.js
 * Placeholder service modules for v2 features.
 * Keeping these stubbed-out exports lets the UI reference them
 * without conditional imports, easing the transition later.
 */

// ────────────────────────────────────────────────────────────
// VOICE  ·  EVE companion text-to-speech / streaming voice AI
// ────────────────────────────────────────────────────────────
// Suggested provider: ElevenLabs, OpenAI TTS, or Cartesia.
// Wire up server-side at /api/voice and stream PCM/MP3 to the client.
export async function synthesizeVoice(text, voiceId = 'eve_default') {
  // TODO: POST to /api/voice with { text, voiceId }
  console.warn('[voice] stub — implement /api/voice');
  return { audioUrl: null, voiceId, placeholder: true, text };
}

// ────────────────────────────────────────────────────────────
// BEAUTY ANALYSIS  ·  per-region skin & feature reading
// ────────────────────────────────────────────────────────────
// Provider options:
//   - In-house mediapipe + custom skin model
//   - Perfect Corp Skin AI
//   - Haut.AI / Beauty.AI
// Returns per-region scores and natural-language interpretation.
export async function analyzeFace(photoDataUrl) {
  // TODO: POST photoDataUrl to /api/analyze-face
  console.warn('[beauty] stub — implement /api/analyze-face');
  return {
    placeholder: true,
    regions: {
      skin:       { score: 0.82, signal: 'glow', notes: '결이 정돈된 상태' },
      eyes:       { score: 0.78, signal: 'soft', notes: '어제보다 약간 피곤한 신호' },
      lips:       { score: 0.85, signal: 'hydrated', notes: '' },
      contour:    { score: 0.80, signal: 'sculpted', notes: '' },
      brows:      { score: 0.77, signal: 'natural', notes: '' },
    },
    overallMood: 'composed',
  };
}

// ────────────────────────────────────────────────────────────
// MAKEUP & HAIR  ·  contextual recommendation engine
// ────────────────────────────────────────────────────────────
// Should ingest: beauty signal + cycle phase + weather + calendar mood
// and return: ranked looks with product matches from Beauty Fridge.
export async function recommendLook({ beauty, cyclePhase, weather, mood }) {
  // TODO: POST to /api/recommend with the full context
  console.warn('[makeup] stub — implement /api/recommend');
  return {
    placeholder: true,
    suggested: [
      { id: 'natural_glow', name: 'Natural Glow', match: 0.94 },
      { id: 'office_clean', name: 'Office Clean', match: 0.88 },
      { id: 'romantic_date', name: 'Romantic Date', match: 0.71 },
    ],
  };
}
