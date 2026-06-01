/* CV — Tweaks panel.
   Exposes every spacing, line-height and palette knob as a control.
   Writes the live values to CSS vars on :root so the page updates
   in real time. Persists via the host's __edit_mode_set_keys protocol
   so values survive reload. */

const { useEffect } = React;

const CV_DEFAULTS = /*EDITMODE-BEGIN*/{
  /* spacing (millimetres) */
  "photoGap":  7,
  "headPb":    3,
  "topRowMb":  3,
  "rowPy":     2,
  "rowGap":    5,
  "stackGap":  1.5,
  "skillsGap": 8,
  "pagePad":   9,

  /* line spacing */
  "titleLh":   0.92,
  "bodyLh":    1.35,

  /* colors — palette only */
  "pageBg":    "#ffffff",
  "text":      "#111111",
  "soft":      "#6b6b6b",
  "ruleColor": "#cfcfcf"
}/*EDITMODE-END*/;

// Curated palette — every color tweak picks from these four.
// White / soft gray / mid gray / black are the only allowed values.
const PAL = ["#ffffff", "#cfcfcf", "#6b6b6b", "#111111"];

function CVTweaks() {
  const [t, setTweak] = useTweaks(CV_DEFAULTS);

  // Push every tweak into the page as a CSS custom property.
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--tw-photo-gap",  t.photoGap + "mm");
    r.style.setProperty("--tw-head-pb",    t.headPb + "mm");
    r.style.setProperty("--tw-top-row-mb", t.topRowMb + "mm");
    r.style.setProperty("--tw-row-py",     t.rowPy + "mm");
    r.style.setProperty("--tw-row-gap",    t.rowGap + "mm");
    r.style.setProperty("--tw-stack-gap",  t.stackGap + "mm");
    r.style.setProperty("--tw-skills-gap", t.skillsGap + "mm");
    r.style.setProperty("--pad",           t.pagePad + "mm");
    r.style.setProperty("--tw-title-lh",   String(t.titleLh));
    r.style.setProperty("--tw-body-lh",    String(t.bodyLh));
    r.style.setProperty("--tw-page-bg",    t.pageBg);
    r.style.setProperty("--tw-text",       t.text);
    r.style.setProperty("--tw-soft",       t.soft);
    r.style.setProperty("--tw-rule-color", t.ruleColor);
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Spacing — header">
        <TweakSlider
          label="Photo → title gap"
          value={t.photoGap} min={0} max={20} step={0.5} unit="mm"
          onChange={(v) => setTweak("photoGap", v)}
        />
        <TweakSlider
          label="Header bottom gap"
          value={t.headPb} min={0} max={12} step={0.5} unit="mm"
          onChange={(v) => setTweak("headPb", v)}
        />
        <TweakSlider
          label="Eyebrow → big title"
          value={t.topRowMb} min={0} max={12} step={0.5} unit="mm"
          onChange={(v) => setTweak("topRowMb", v)}
        />
      </TweakSection>

      <TweakSection label="Spacing — rows">
        <TweakSlider
          label="Row vertical padding"
          value={t.rowPy} min={0} max={8} step={0.5} unit="mm"
          onChange={(v) => setTweak("rowPy", v)}
        />
        <TweakSlider
          label="Label → content gap"
          value={t.rowGap} min={0} max={16} step={0.5} unit="mm"
          onChange={(v) => setTweak("rowGap", v)}
        />
        <TweakSlider
          label="Entry → entry gap"
          value={t.stackGap} min={0} max={8} step={0.5} unit="mm"
          onChange={(v) => setTweak("stackGap", v)}
        />
        <TweakSlider
          label="Skills column gap"
          value={t.skillsGap} min={0} max={20} step={0.5} unit="mm"
          onChange={(v) => setTweak("skillsGap", v)}
        />
        <TweakSlider
          label="Page padding"
          value={t.pagePad} min={4} max={20} step={0.5} unit="mm"
          onChange={(v) => setTweak("pagePad", v)}
        />
      </TweakSection>

      <TweakSection label="Line spacing">
        <TweakSlider
          label="Title line-height"
          value={t.titleLh} min={0.8} max={1.3} step={0.01}
          onChange={(v) => setTweak("titleLh", v)}
        />
        <TweakSlider
          label="Body line-height"
          value={t.bodyLh} min={1.0} max={1.8} step={0.05}
          onChange={(v) => setTweak("bodyLh", v)}
        />
      </TweakSection>

      <TweakSection label="Colors">
        <TweakColor
          label="Page background"
          value={t.pageBg} options={PAL}
          onChange={(v) => setTweak("pageBg", v)}
        />
        <TweakColor
          label="Text"
          value={t.text} options={PAL}
          onChange={(v) => setTweak("text", v)}
        />
        <TweakColor
          label="Soft text"
          value={t.soft} options={PAL}
          onChange={(v) => setTweak("soft", v)}
        />
        <TweakColor
          label="Rule / dividers"
          value={t.ruleColor} options={PAL}
          onChange={(v) => setTweak("ruleColor", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<CVTweaks />);
