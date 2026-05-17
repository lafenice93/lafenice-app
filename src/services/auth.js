/**
 * auth.js
 * Authentication service stubs.
 *
 * For production, swap these with real implementations:
 *   - Apple Sign In:   https://developer.apple.com/sign-in-with-apple/
 *   - Google Identity: https://developers.google.com/identity/gsi/web
 *   - Email magic-link: pair with Supabase / Auth0 / NextAuth / Clerk
 *
 * Returning a fake user object for now — wire up backend later.
 */

const FAKE_DELAY = 700;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function signInWithApple() {
  // TODO: Replace with real Apple Sign In SDK.
  // Apple JS: https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js
  await delay(FAKE_DELAY);
  return { provider: 'apple', id: 'apple_demo_user', displayName: 'LAFENICE Guest' };
}

export async function signInWithGoogle() {
  // TODO: Replace with Google Identity Services tokenClient.
  // window.google.accounts.oauth2.initTokenClient({ client_id: '...' })
  await delay(FAKE_DELAY);
  return { provider: 'google', id: 'google_demo_user', displayName: 'LAFENICE Guest' };
}

export async function signInWithEmail(email) {
  // TODO: Replace with email/password or magic-link flow.
  await delay(FAKE_DELAY);
  return { provider: 'email', id: 'email_demo_user', email, displayName: email.split('@')[0] };
}

export async function signOut() {
  await delay(120);
  return true;
}
