import { useApp, SCREENS } from './context/AppContext.jsx';
import PhoneFrame from './components/PhoneFrame.jsx';
import StatusBar from './components/StatusBar.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import CameraCaptureScreen from './screens/CameraCaptureScreen.jsx';
import AvatarGenerationScreen from './screens/AvatarGenerationScreen.jsx';
import AvatarResultScreen from './screens/AvatarResultScreen.jsx';

/**
 * App
 * Renders the phone-frame chrome and the active onboarding screen.
 * Screens are kept mounted with CSS-driven opacity transitions for smooth flow.
 */
export default function App() {
  const { screen } = useApp();
  const isDark = screen === SCREENS.CAMERA;
  const clock = clockFor(screen);

  return (
    <div className="studio">
      <PhoneFrame themeDark={isDark}>
        <StatusBar time={clock} />

        <div className={`scr ${screen === SCREENS.LOGIN ? 'active' : ''}`}>
          <LoginScreen />
        </div>
        <div className={`scr ${screen === SCREENS.CAMERA ? 'active' : ''}`}>
          <CameraCaptureScreen />
        </div>
        <div className={`scr ${screen === SCREENS.GENERATE ? 'active' : ''}`}>
          <AvatarGenerationScreen />
        </div>
        <div className={`scr ${screen === SCREENS.RESULT ? 'active' : ''}`}>
          <AvatarResultScreen />
        </div>
      </PhoneFrame>
    </div>
  );
}

function clockFor(screen) {
  switch (screen) {
    case SCREENS.CAMERA:   return '20:50';
    case SCREENS.GENERATE: return '20:51';
    case SCREENS.RESULT:   return '20:52';
    default:               return '9:16';
  }
}
