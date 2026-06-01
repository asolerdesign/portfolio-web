/* App shell + screen routing + Tweaks panel. */

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { TopNav, Footer } from "./components.jsx";
import {
  HomeScreen, WorkScreen, CaseStudy, AboutScreen, ContactScreen,
} from "./screens.jsx";
import {
  useTweaks, TweaksPanel, TweakSection,
  TweakSlider, TweakToggle, TweakRadio,
} from "./tweaks-panel.jsx";

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "pagePad": 24,
  "gridCols": 12,
  "gridGap": 24,
  "showGrid": false,
  "heroAspect": "16 / 7",
  "navLinkSize": 26,
  "wordmarkSize": 16
}/*EDITMODE-END*/;

function GridOverlay({ cols }) {
  return (
    <div className="grid-overlay" aria-hidden="true">
      <div className="grid-overlay-inner">
        {Array.from({ length: cols }).map((_, i) => <span key={i} />)}
      </div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState("home");
  const [caseId, setCaseId] = useState(null);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const openCase = (id) => { setCaseId(id); setScreen("case"); };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [screen, caseId]);

  // Apply tweaks to root CSS vars + body class
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--page-pad",      t.pagePad + "px");
    r.style.setProperty("--grid-cols",     String(t.gridCols));
    r.style.setProperty("--grid-gap",      t.gridGap + "px");
    r.style.setProperty("--hero-aspect",   t.heroAspect);
    r.style.setProperty("--nav-link-size", t.navLinkSize + "px");
    r.style.setProperty("--wordmark-size", t.wordmarkSize + "px");
    document.body.classList.toggle("show-grid", !!t.showGrid);
  }, [t]);

  let body;
  switch (screen) {
    case "home":    body = <HomeScreen setScreen={setScreen} />; break;
    case "work":    body = <WorkScreen openCase={openCase} setScreen={setScreen} />; break;
    case "case":    body = <CaseStudy caseId={caseId} setScreen={setScreen} openCase={openCase} />; break;
    case "about":   body = <AboutScreen setScreen={setScreen} />; break;
    case "contact": body = <ContactScreen />; break;
    default:        body = <HomeScreen setScreen={setScreen} />;
  }

  return (
    <>
      <TopNav screen={screen === "case" ? "work" : screen} setScreen={setScreen} />
      <div data-screen-label={screen[0].toUpperCase() + screen.slice(1)}>
        {body}
      </div>
      <Footer setScreen={setScreen} />

      <GridOverlay cols={t.gridCols} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Grid &amp; margins">
          <TweakSlider
            label="Side margin (L/R)"
            value={t.pagePad} min={16} max={96} step={2} unit="px"
            onChange={(v) => setTweak("pagePad", v)}
          />
          <TweakRadio
            label="Columns"
            value={t.gridCols}
            options={[{ value: 8, label: "8" }, { value: 12, label: "12" }, { value: 16, label: "16" }]}
            onChange={(v) => setTweak("gridCols", v)}
          />
          <TweakSlider
            label="Gutter"
            value={t.gridGap} min={8} max={48} step={2} unit="px"
            onChange={(v) => setTweak("gridGap", v)}
          />
          <TweakToggle
            label="Show grid overlay"
            value={t.showGrid}
            onChange={(v) => setTweak("showGrid", v)}
          />
        </TweakSection>

        <TweakSection label="Hero photo">
          <TweakRadio
            label="Aspect"
            value={t.heroAspect}
            options={[
              { value: "16 / 7", label: "16:7" },
              { value: "16 / 9", label: "16:9" },
              { value: "3 / 2",  label: "3:2" },
              { value: "4 / 3",  label: "4:3" },
            ]}
            onChange={(v) => setTweak("heroAspect", v)}
          />
        </TweakSection>

        <TweakSection label="Navigation">
          <TweakSlider
            label="Wordmark size"
            value={t.wordmarkSize} min={12} max={24} step={1} unit="px"
            onChange={(v) => setTweak("wordmarkSize", v)}
          />
          <TweakSlider
            label="Nav link size"
            value={t.navLinkSize} min={16} max={40} step={1} unit="px"
            onChange={(v) => setTweak("navLinkSize", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
