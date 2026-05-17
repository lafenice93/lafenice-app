/** Screen ids — order matches interactive prototype flow */
export const SCREENS = {
  SPLASH: 'splash',
  SIGN_IN: 'sign-in',
  FACE: 'face',
  CYCLE: 'cycle',
  HOME: 'home',
  MOOD_PICK: 'mood-pick',
  MAKEUP_RESULT: 'makeup-result',
  MAKEUP_TUTORIAL: 'makeup-tutorial',
  HAIR_DETECT: 'hair-detect',
  HAIR_PICK: 'hair-pick',
  HAIR_TUTORIAL: 'hair-tutorial',
  CODY_MIRROR: 'cody-mirror',
  CODY_OUTFIT: 'cody-outfit',
  CODY_ANALYSIS: 'cody-analysis',
};

export const SCREEN_ORDER = Object.values(SCREENS);

export const SCREEN_LABELS = {
  [SCREENS.SPLASH]: 'Splash',
  [SCREENS.SIGN_IN]: 'Sign in',
  [SCREENS.FACE]: 'Face capture',
  [SCREENS.CYCLE]: 'Cycle',
  [SCREENS.HOME]: 'Home · EVE',
  [SCREENS.MOOD_PICK]: 'Make up · Mood Pick',
  [SCREENS.MAKEUP_RESULT]: "Today's Mood",
  [SCREENS.MAKEUP_TUTORIAL]: 'Make Up · Spring Warm',
  [SCREENS.HAIR_DETECT]: 'Hair · Face Shape',
  [SCREENS.HAIR_PICK]: 'Hair · Style Pick',
  [SCREENS.HAIR_TUTORIAL]: "Today's Hair",
  [SCREENS.CODY_MIRROR]: 'Cody · Body Mirror',
  [SCREENS.CODY_OUTFIT]: 'Cody · Try-On',
  [SCREENS.CODY_ANALYSIS]: 'Cody · Analysis',
};

/** Status bar clock per screen (prototype) */
export const SCREEN_CLOCKS = {
  [SCREENS.SPLASH]: '9:16',
  [SCREENS.SIGN_IN]: '9:16',
  [SCREENS.FACE]: '20:50',
  [SCREENS.CYCLE]: '9:16',
  [SCREENS.HOME]: '9:16',
  [SCREENS.MOOD_PICK]: '9:18',
  [SCREENS.MAKEUP_RESULT]: '9:19',
  [SCREENS.MAKEUP_TUTORIAL]: '9:20',
  [SCREENS.HAIR_DETECT]: '9:21',
  [SCREENS.HAIR_PICK]: '9:22',
  [SCREENS.HAIR_TUTORIAL]: '9:23',
  [SCREENS.CODY_MIRROR]: '9:24',
  [SCREENS.CODY_OUTFIT]: '9:25',
  [SCREENS.CODY_ANALYSIS]: '9:26',
};

/** Light status text on dark photo backgrounds */
export const DARK_STATUS_SCREENS = new Set([
  SCREENS.HOME,
  SCREENS.MOOD_PICK,
  SCREENS.MAKEUP_RESULT,
  SCREENS.MAKEUP_TUTORIAL,
  SCREENS.HAIR_DETECT,
  SCREENS.HAIR_PICK,
  SCREENS.HAIR_TUTORIAL,
  SCREENS.CODY_MIRROR,
  SCREENS.CODY_OUTFIT,
  SCREENS.CODY_ANALYSIS,
]);

export function screenIndex(id) {
  return SCREEN_ORDER.indexOf(id);
}

export function screenFromIndex(index) {
  return SCREEN_ORDER[Math.max(0, Math.min(SCREEN_ORDER.length - 1, index))];
}
