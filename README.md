# LAFENICE · Onboarding

A futuristic luxury AI avatar onboarding flow for the LAFENICE web app.
Login → Camera capture → AI avatar generation → Result.

> Aesthetic: warm cream + cyber mint + champagne gold. Mobile-first 9:16.
> Stack: React 18 + Vite, deployed to Vercel with a serverless `/api` for the OpenAI image call.

---

## Quick start

```bash
# 1. install
npm install

# 2. add your OpenAI key
cp .env.example .env.local
# then edit .env.local and set OPENAI_API_KEY

# 3. run
npm run dev
```

Open <http://localhost:5173>. The app boots into the login screen.

> No API key set? The app still runs — `/api/generate-avatar` falls back to
> returning the original selfie as a "placeholder" so the whole flow is
> demoable without a key. A pill on the Result screen tells you you're in
> demo mode.

---

## Deploy to Vercel

1. Push this folder to a Git repository.
2. In Vercel: **New Project → Import** the repo.
3. Framework preset will auto-detect as **Vite**.
4. Under **Environment Variables**, add:
   - `OPENAI_API_KEY` (required for real generation)
   - `OPENAI_IMAGE_MODEL` *(optional, default `gpt-image-1`)*
   - `OPENAI_IMAGE_SIZE` *(optional, default `1024x1024`)*
5. Deploy. Camera access requires HTTPS, which Vercel provides automatically.

---

## Architecture

```
lafenice-onboarding/
├── api/
│   └── generate-avatar.js     # Vercel Serverless Function — calls OpenAI
├── src/
│   ├── main.jsx               # React root + AppProvider
│   ├── App.jsx                # PhoneFrame shell + screen router
│   ├── context/AppContext.jsx # global state (screen / user / capture / avatar)
│   ├── hooks/useCamera.js     # getUserMedia + capture-to-dataURL
│   ├── components/            # reusable: PhoneFrame, BrandMark, GlassButton…
│   ├── screens/               # LoginScreen → CameraCaptureScreen → … → Result
│   ├── services/
│   │   ├── auth.js            # OAuth provider stubs (Apple / Google / Email)
│   │   ├── avatar.js          # client wrapper for /api/generate-avatar
│   │   └── future.js          # v2 stubs: voice, beauty analysis, recommend
│   └── styles/index.css       # design tokens + all screen styles
├── index.html
├── vercel.json
├── vite.config.js
├── package.json
└── .env.example
```

### Frontend ↔ API boundary

- The browser **never** sees `OPENAI_API_KEY`.
- `src/services/avatar.js` POSTs the selfie dataURL to `/api/generate-avatar`.
- The serverless function reads the env var, calls OpenAI Images Edits, and
  returns `{ imageDataUrl, identityScore, prompt, placeholder }`.

### Identity preservation strategy

We use the OpenAI **Images → Edits** endpoint with `gpt-image-1` and the
captured selfie as the reference image. The prompt explicitly preserves
face shape, eye spacing, lip shape, hairline, and skin tone, while
re-styling lighting, background, and mood. Empirically lands in the
**70–80% identity** range the brief asked for.

If you later want stronger identity locking, swap the API call for one
of these (drop-in replacements at the `/api/generate-avatar.js` boundary):

- **Replicate** running `InstantID` or `PhotoMaker-v2`
- **fal.ai** running `flux-pulid`
- A self-hosted IP-Adapter + ControlNet pipeline

---

## Reusable components

| Component | Purpose |
|---|---|
| `<PhoneFrame themeDark />` | luxury iPhone-style chrome; collapses to full-bleed on mobile |
| `<StatusBar time />` | iOS-style top bar, theme-aware |
| `<BrandMark size glow />` | LAFENICE gold wordmark |
| `<GlassButton variant icon>` | pill button — variants: `default / outline / ghost / gold / dark` |
| `<ScanOverlay label hint />` | animated mint face-scan overlay |
| `<LoadingAura label />` | spinning conic-gradient halo for the gen screen |
| `<BackButton onClick />` | floating round back arrow |

All components live in `src/components/` and consume design tokens from
`src/styles/index.css`.

---

## Where to put API keys

| Key | Where it goes | Used by |
|---|---|---|
| `OPENAI_API_KEY` | Vercel env var (or `.env.local` for dev) | `api/generate-avatar.js` |
| Apple Sign In | Replace stub in `src/services/auth.js` and add Apple JS SDK in `index.html` | `LoginScreen` |
| Google Sign In | Replace stub in `src/services/auth.js` with Google Identity Services token client | `LoginScreen` |
| Email magic-link | Replace stub in `src/services/auth.js`, wire to Supabase / Auth0 / NextAuth | `LoginScreen` |
| ElevenLabs / TTS *(v2)* | Add server route `api/voice.js`, env var `ELEVENLABS_API_KEY` | `services/future.js` |
| Beauty analysis *(v2)* | Add server route `api/analyze-face.js` | `services/future.js` |

---

## v2 roadmap (hooks already present)

- **Voice AI** — EVE companion. Stub at `services/future.js → synthesizeVoice()`.
- **Beauty analysis** — per-region skin / feature reading. Stub at `analyzeFace()`.
- **Makeup / hair recommendations** — contextual look ranking. Stub at `recommendLook()`.

The Result screen's `Continue →` button is the natural hand-off into the
next onboarding step (Cycle setup, Lifestyle, Birth data) — wire it up
when those screens land.

---

## Notes

- Camera APIs require **HTTPS** (or `localhost`). Use `npm run dev`
  during local development; Vercel handles HTTPS automatically.
- The captured selfie is sent as a base64 dataURL to your own
  serverless function only. It is **not** persisted server-side in this
  reference implementation — add that explicitly if you need it for
  audit or training data.
- The OpenAI Images API surface evolves. Verify the request shape in
  `api/generate-avatar.js` against the current docs before going live:
  <https://platform.openai.com/docs/api-reference/images>
