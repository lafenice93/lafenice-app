import { SCREENS } from '../constants/screens.js';
import { useApp } from '../context/AppContext.jsx';
import ScreenFrame from '../components/ScreenFrame.jsx';
import { PhotoTopBar, PhotoTabBar } from '../components/PhotoChrome.jsx';

export function CodyMirrorScreen({ isActive = false }) {
  const { goTo } = useApp();
  const tags = [
    { cls: 't1', label: '개인 컬러', value: <>Spring Warm<br /><b>· Fire</b></> },
    { cls: 't2', label: '옷장', value: '47개 보유' },
    { cls: 't3', label: '외부', value: <>18°C<br />오후 약속</> },
    { cls: 't4', label: 'Mood', value: <>Composed<br />Confidence</> },
  ];
  return (
    <ScreenFrame className="s-photo s-cody-mirror" isActive={isActive}>
      <div className="photo-bg" />
      <PhotoTopBar onBack={() => goTo(SCREENS.HOME)} />
      <div className="cody-top-pill">Cody Mirror · Look No. 01</div>
      {tags.map((t) => (
        <div key={t.cls} className={`cody-tag ${t.cls}`}>
          <div className="tl">{t.label}</div>
          <div className="tv">{t.value}</div>
        </div>
      ))}
      <button type="button" className="cody-cta" onClick={() => goTo(SCREENS.CODY_OUTFIT)}>
        AI 코디 시작 →
      </button>
      <PhotoTabBar />
    </ScreenFrame>
  );
}

export function CodyOutfitScreen({ isActive = false }) {
  const { goTo } = useApp();
  const pieces = [
    { pn: 'TOP', pv: 'Silk Blouse', selected: true },
    { pn: 'BOTTOM', pv: 'Wide Pants', selected: true },
    { pn: 'OUTER', pv: '+ 추가', selected: false },
    { pn: '→', pv: 'Next', selected: false, next: true },
  ];
  return (
    <ScreenFrame className="s-photo s-cody-outfit" isActive={isActive}>
      <div className="photo-bg" />
      <PhotoTopBar onBack={() => goTo(SCREENS.CODY_MIRROR)} />
      <div className="cody-top-pill">Try-On · 실크 블라우스 + 와이드 팬츠</div>
      <div className="cody-check-pill">
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="M2 7l3 3 7-7" />
        </svg>
        보유 아이템
      </div>
      <div className="cody-piece-row">
        {pieces.map((p) => (
          <button
            key={p.pn}
            type="button"
            className={`piece${p.selected ? ' selected' : ''}`}
            onClick={p.next ? () => goTo(SCREENS.CODY_ANALYSIS) : undefined}
          >
            <div className="pn">{p.pn}</div>
            <div className="pv">{p.pv}</div>
          </button>
        ))}
      </div>
      <PhotoTabBar activeTab="routine" />
    </ScreenFrame>
  );
}

export function CodyAnalysisScreen({ isActive = false }) {
  const { goTo } = useApp();
  const scores = [
    { lbl: '색채 조화', v: '94%' },
    { lbl: '계절 적합', v: '96%' },
    { lbl: '무드 매칭', v: '96%' },
  ];
  return (
    <ScreenFrame className="s-photo s-cody-analysis" isActive={isActive}>
      <div className="photo-bg" />
      <PhotoTopBar onBack={() => goTo(SCREENS.CODY_OUTFIT)} />
      <div className="cody-top-pill">AI Style Analysis · Composed Confidence</div>
      <div className="an-scores">
        {scores.map((s) => (
          <div key={s.lbl} className="an-row">
            <span className="lbl">{s.lbl}</span>
            <span className="v">{s.v}</span>
          </div>
        ))}
        <div className="an-stars">
          <span className="fire">Fire</span>
          {['', '', '', '', ' dim'].map((d, i) => (
            <span key={i} className={`s${d}`}>
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="an-scores2">
        <div className="lbl">오늘의 무드 매칭</div>
        <div className="an-stars">
          <span className="fire">Fire</span>
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="s">
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="an-actions">
        <button type="button" className="an-action" onClick={() => goTo(SCREENS.HOME)}>
          Save Look
        </button>
        <button type="button" className="an-action primary" onClick={() => goTo(SCREENS.HOME)}>
          Back to Home
        </button>
      </div>
      <PhotoTabBar activeTab="analysis" />
    </ScreenFrame>
  );
}
