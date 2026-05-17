import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

/**
 * AppContext
 * Central state for the LAFENICE onboarding flow.
 * Holds: current screen, user identity, captured photo, generated avatar, transient errors.
 *
 * Designed to be replaced/extended by a router (React Router, Next.js routing) later.
 *
 * Debug: append `?screen=login|camera|generate|result` to force-start on any
 * screen. Useful for previewing without going through the full flow.
 */

const AppContext = createContext(null);

const SCREENS = {
  LOGIN: 'login',
  CAMERA: 'camera',
  GENERATE: 'generate',
  RESULT: 'result',
};

function initialScreen() {
  if (typeof window === 'undefined') return SCREENS.LOGIN;
  const param = new URLSearchParams(window.location.search).get('screen');
  if (param && Object.values(SCREENS).includes(param)) return param;
  return SCREENS.LOGIN;
}

export function AppProvider({ children }) {
  const [screen, setScreen] = useState(initialScreen);
  const [user, setUser] = useState(null);          // { provider, email?, displayName? }
  const [capture, setCapture] = useState(null);    // dataURL of selfie
  const [avatar, setAvatar] = useState(null);      // dataURL of generated avatar
  const [error, setError] = useState(null);        // last user-visible error

  // when forcing a preview screen, seed enough state to render it
  useEffect(() => {
    if (screen === SCREENS.GENERATE && !capture) {
      // 1px transparent pixel so the gen flow doesn't immediately fail
      setCapture('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
    }
    if (screen === SCREENS.RESULT && !avatar) {
      setAvatar({
        imageDataUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        identityScore: 0.78,
        placeholder: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = useCallback((next) => setScreen(next), []);

  const reset = useCallback(() => {
    setScreen(SCREENS.LOGIN);
    setUser(null);
    setCapture(null);
    setAvatar(null);
    setError(null);
  }, []);

  const value = useMemo(() => ({
    SCREENS,
    screen, goTo,
    user, setUser,
    capture, setCapture,
    avatar, setAvatar,
    error, setError,
    reset,
  }), [screen, user, capture, avatar, error, goTo, reset]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}

export { SCREENS };
