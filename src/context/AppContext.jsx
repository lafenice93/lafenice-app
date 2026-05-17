import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  SCREENS,
  SCREEN_ORDER,
  screenFromIndex,
  screenIndex,
} from '../constants/screens.js';

const AppContext = createContext(null);

function initialScreen() {
  if (typeof window === 'undefined') return SCREENS.SPLASH;
  const param = new URLSearchParams(window.location.search).get('screen');
  if (param && SCREEN_ORDER.includes(param)) return param;
  return SCREENS.SPLASH;
}

export function AppProvider({ children }) {
  const [screen, setScreen] = useState(initialScreen);

  const goTo = useCallback((target) => {
    if (typeof target === 'number') {
      setScreen(screenFromIndex(target));
      return;
    }
    if (SCREEN_ORDER.includes(target)) {
      setScreen(target);
    }
  }, []);

  const goNext = useCallback(() => {
    const i = screenIndex(screen);
    if (i < SCREEN_ORDER.length - 1) setScreen(SCREEN_ORDER[i + 1]);
  }, [screen]);

  const goPrev = useCallback(() => {
    const i = screenIndex(screen);
    if (i > 0) setScreen(SCREEN_ORDER[i - 1]);
  }, [screen]);

  const reset = useCallback(() => setScreen(SCREENS.SPLASH), []);

  const value = useMemo(
    () => ({
      SCREENS,
      screen,
      screenIndex: screenIndex(screen),
      goTo,
      goNext,
      goPrev,
      reset,
    }),
    [screen, goTo, goNext, goPrev, reset],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
