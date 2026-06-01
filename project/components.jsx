/* Alberto Soler — components. */

const { useState, useEffect } = React;

/* ---------------- icons (minimal) ----------------------------------- */
const I = {
  ArrowUpRight: (p) =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>,

  ArrowRight: (p) =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>,

  ArrowLeftLg: (p) =>
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="20" y1="12" x2="4" y2="12" />
      <polyline points="10 6 4 12 10 18" />
    </svg>,

  ArrowRightLg: (p) =>
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14 6 20 12 14 18" />
    </svg>,

  Paperclip: (p) =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>,

  Menu: (p) =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
    <line x1="3" y1="7"  x2="21" y2="7" />
    <line x1="3" y1="17" x2="21" y2="17" />
  </svg>,

  Close: (p) =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
    <line x1="5"  y1="5"  x2="19" y2="19" />
    <line x1="19" y1="5"  x2="5"  y2="19" />
  </svg>

};

/* ---------------- Top nav ------------------------------------------- */
function TopNav({ screen, setScreen }) {
  const [open, setOpen] = useState(false);
  const link = (k, label) =>
  <span
    className={`nav-link ${screen === k ? "active" : ""}`}
    onClick={() => {setScreen(k);setOpen(false);}}>
    {label}</span>;

  return (
    <nav className={`nav ${open ? "open" : ""}`}>
      <div className="container nav-inner">
        <div className="nav-wordmark-wrap">
          <div className="nav-wordmark" onClick={() => {setScreen("home");setOpen(false);}} style={{ fontSize: "24px" }}>
            ALBERTO&nbsp;SOLER
          </div>
        </div>
        <div className="nav-links-wrap">
          <div className="nav-links">
            {link("work", "Work")}
            {link("about", "About")}
            {link("contact", "Contact")}
          </div>
          <button className="nav-lang" type="button" aria-label="Switch language">
            <span className="lang-paren">(</span>
            <span className="lang-on">ENG</span>
            <span className="lang-sep">/</span>
            <span className="lang-off">ESP</span>
            <span className="lang-paren">)</span>
          </button>
        </div>
        <div className="nav-toggle-wrap">
          <button
            className="nav-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <I.Close /> : <I.Menu />}
          </button>
        </div>
      </div>
    </nav>);

}

/* ---------------- Hero photo (B&W placeholder + drop-zone) ----------- */
/* Uses <image-slot> so Alberto can drag his own photo in. The default
   placeholder is a Lightroom-tinted grayscale SVG of a figure in a
   kitchen — mirrors the reference. */
function HeroPhoto({ slotId = "hero-photo", aspect, placeholderLabel = "Click or drop a photo" }) {
  return (
    <div className="hero-photo bw-photo-bg" style={aspect ? { aspectRatio: aspect } : null}>
      <image-slot
        id={slotId}
        src="assets/hero-portrait.jpg"
        placeholder={placeholderLabel}
        shape="rect"
        fit="cover">
      </image-slot>
    </div>);

}

/* Stylised B&W kitchen scene — fallback art shown until the user drops
   their own photo. Hand-built SVG; reads as a photograph from a few
   meters out. */
function KitchenPhotoSVG() {
  return (
    <svg className="placeholder-art" viewBox="0 0 1600 700"
    preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8e8e8" />
          <stop offset="1" stopColor="#bdbdbd" />
        </linearGradient>
        <linearGradient id="counter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfcfcf" />
          <stop offset="1" stopColor="#a8a8a8" />
        </linearGradient>
        <linearGradient id="cabinet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dcdcdc" />
          <stop offset="1" stopColor="#c2c2c2" />
        </linearGradient>
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
        </radialGradient>
        <filter id="grain" x="0" y="0">
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.18 0" />
        </filter>
      </defs>

      {/* wall */}
      <rect width="1600" height="700" fill="url(#wall)" />

      {/* upper cabinets row */}
      <rect x="0" y="40" width="640" height="260" fill="url(#cabinet)" />
      <rect x="640" y="40" width="220" height="260" fill="#9f9f9f" />
      <line x1="640" y1="40" x2="640" y2="300" stroke="#7a7a7a" strokeWidth="2" />
      <line x1="860" y1="40" x2="860" y2="300" stroke="#7a7a7a" strokeWidth="2" />
      {/* microwave */}
      <rect x="40" y="80" width="220" height="140" fill="#2a2a2a" />
      <rect x="60" y="100" width="140" height="100" fill="#3d3d3d" />
      <rect x="210" y="100" width="40" height="100" fill="#1e1e1e" />
      {/* cabinet handles */}
      <line x1="320" y1="160" x2="380" y2="160" stroke="#7a7a7a" strokeWidth="3" />
      <line x1="460" y1="160" x2="520" y2="160" stroke="#7a7a7a" strokeWidth="3" />

      {/* right wall — dark cabinets and oven door */}
      <rect x="1080" y="40" width="520" height="660" fill="#1f1f1f" />
      <rect x="1100" y="60" width="200" height="300" fill="#0f0f0f" />
      <rect x="1320" y="60" width="180" height="300" fill="#161616" />
      {/* clock / vent dial on far right */}
      <circle cx="1530" cy="180" r="50" fill="#2a2a2a" />
      <circle cx="1530" cy="180" r="34" fill="#e6e6e6" />
      <circle cx="1530" cy="180" r="6" fill="#1a1a1a" />
      <line x1="1530" y1="180" x2="1556" y2="155" stroke="#1a1a1a" strokeWidth="3" />
      {/* oven lower */}
      <rect x="1100" y="380" width="380" height="280" fill="#0c0c0c" />
      <rect x="1120" y="400" width="340" height="220" fill="#1a1a1a" />

      {/* counter */}
      <rect x="0" y="380" width="1080" height="40" fill="#bcbcbc" />
      <rect x="0" y="420" width="1080" height="280" fill="url(#counter)" />

      {/* faucet */}
      <rect x="220" y="320" width="14" height="60" fill="#8a8a8a" />
      <rect x="200" y="320" width="60" height="10" fill="#8a8a8a" />
      <rect x="240" y="280" width="10" height="40" fill="#9a9a9a" />

      {/* jars on counter */}
      <rect x="280" y="430" width="60" height="80" fill="#9b9b9b" />
      <rect x="350" y="420" width="50" height="90" fill="#b0b0b0" />
      <rect x="410" y="440" width="40" height="70" fill="#8c8c8c" />
      <rect x="450" y="430" width="36" height="80" fill="#a3a3a3" />

      {/* tray / panel near figure */}
      <rect x="900" y="320" width="180" height="220" fill="#7d7d7d" />
      <rect x="908" y="328" width="164" height="204" fill="#9c9c9c" />

      {/* the figure — a person standing behind counter, dark jacket */}
      <g>
        {/* body / jacket */}
        <path d="M 700 700 L 700 460 C 700 400 760 360 820 360 C 880 360 940 400 940 460 L 940 700 Z"
        fill="#1a1a1a" />
        {/* neck */}
        <rect x="800" y="320" width="40" height="50" fill="#9c918a" />
        {/* head */}
        <ellipse cx="820" cy="280" rx="58" ry="68" fill="#aa9f96" />
        {/* hair */}
        <path d="M 762 250 C 762 210 880 200 878 252 L 878 268 C 870 240 770 240 762 268 Z"
        fill="#1f1c19" />
        {/* glasses */}
        <circle cx="800" cy="288" r="11" fill="none" stroke="#1f1f1f" strokeWidth="3" />
        <circle cx="840" cy="288" r="11" fill="none" stroke="#1f1f1f" strokeWidth="3" />
        <line x1="811" y1="288" x2="829" y2="288" stroke="#1f1f1f" strokeWidth="3" />
        {/* subtle face shadows */}
        <ellipse cx="820" cy="312" rx="10" ry="3" fill="#8a7f76" />
        {/* zip line on jacket */}
        <line x1="820" y1="380" x2="820" y2="700" stroke="#2c2c2c" strokeWidth="2" />
      </g>

      {/* vignette */}
      <rect width="1600" height="700" fill="url(#vignette)" />
      {/* film grain */}
      <rect width="1600" height="700" fill="url(#grain)" opacity="0.85" />
    </svg>);

}

/* ---------------- Breadcrumbs — interactive directory route -------- */
function Breadcrumbs({ path, setScreen }) {
  const navMap = { home: "home", work: "work", about: "about", contact: "contact" };
  return (
    <nav className="breadcrumbs" aria-label="Directory route">
      <span className="breadcrumbs-slash">/</span>
      {path.map((seg, i) => {
        const target = navMap[seg.toLowerCase()];
        const last = i === path.length - 1;
        const node = target && !last ?
        <button
          type="button"
          className="breadcrumbs-seg link"
          onClick={() => setScreen(target)}>
          {seg}</button> :

        <span className={`breadcrumbs-seg ${last ? "current" : ""}`}>{seg}</span>;

        return (
          <React.Fragment key={i}>
            {node}
            {!last ? <span className="breadcrumbs-slash">/</span> : null}
          </React.Fragment>);

      })}
      <span className="breadcrumbs-cursor" aria-hidden="true">_</span>
    </nav>);

}
function SectionHead({ eyebrow, title, lede }) {
  return (
    <div className="container section-head">
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : <div />}
      <div>
        <h2>{title}</h2>
        {lede ? <p className="lede">{lede}</p> : null}
      </div>
    </div>);

}

/* ---------------- Work row ------------------------------------------ */
function WorkRow({ idx, name, kind, year, onOpen }) {
  return (
    <div className="work-row" onClick={onOpen}>
      <span className="idx">({String(idx).padStart(2, "0")})</span>
      <span className="name">{name}</span>
      <span className="kind">{kind}</span>
      <span className="yr">{year}</span>
      <span className="arrow"><I.ArrowUpRight /></span>
    </div>);

}

/* ---------------- Manifesto ----------------------------------------- */
function Manifesto() {
  const items = [
  ["01", "Discover and Investigation", "Understand the context, the client and the problem."],
  ["02", "Definition", "Turn needs into a clear creative direction. You're never alone."],
  ["03", "Design", "Develop functional solutions based in emotional and strategic bases."],
  ["04", "Deliver and Maintenance", "Refine, adapt and bring the project to life. The final result integrates your values, the brand personality and a new way to resolve past problems."]];

  return (
    <ul className="manifesto-list">
      {items.map(([ix, nm, ds]) =>
      <li key={ix}>
          <span className="ix">{ix}</span>
          <span className="nm">{nm}</span>
          <span className="ds">{ds}</span>
        </li>
      )}
    </ul>);

}

/* ---------------- Contact form -------------------------------------- */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", brief: "" });
  const [files, setFiles] = useState([]);
  const fileInputRef = React.useRef(null);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onPickFiles = (e) => {
    const picked = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...picked]);
    // reset so the same file can be re-picked after removal
    e.target.value = "";
  };
  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));
  const fmtSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
    return (bytes / 1024 / 1024).toFixed(1) + " MB";
  };

  if (sent) {
    return (
      <div className="success">
        <b>Got it{form.name ? `, ${form.name.split(" ")[0]}` : ""}.</b> I read everything
        personally. I'll reply within two working days — either with a few
        clarifying questions, or a first conversation slot.
      </div>);

  }

  return (
    <form onSubmit={(e) => {e.preventDefault();setSent(true);}} className="contact-form-box">
      <div className="field">
        <label style={{ letterSpacing: "0px", fontSize: "14px" }}>Your name</label>
        <input type="text" value={form.name} onChange={set("name")}
        placeholder="David García" required />
      </div>
      <div className="field">
        <label style={{ letterSpacing: "0px", fontSize: "14px" }}>Email</label>
        <input type="email" value={form.email} onChange={set("email")}
        placeholder="hello@example.com" required />
      </div>
      <div className="field">
        <label style={{ letterSpacing: "0px", fontSize: "14px" }}>Tell me about your project</label>
        <textarea rows="4" value={form.brief} onChange={set("brief")}
        placeholder="A few sentences — what you do, what you need, when you need it." required></textarea>
      </div>

      <div className="field field-attach">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={onPickFiles}
          style={{ display: "none" }} />
        
        <div className="form-actions">
          <button
            type="button"
            className="attach-btn"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}>
            
            <I.Paperclip /> Attach files
          </button>
          <button type="submit" className="btn send-btn">Send <I.ArrowRight /></button>
        </div>
        {files.length > 0 ?
        <ul className="attach-list">
            {files.map((f, i) =>
          <li key={i}>
                <span className="attach-name">{f.name}</span>
                <span className="attach-size">{fmtSize(f.size)}</span>
                <button
              type="button"
              className="attach-remove"
              aria-label={`Remove ${f.name}`}
              onClick={() => removeFile(i)}>
              ×</button>
              </li>
          )}
          </ul> :
        null}
      </div>
    </form>);

}

/* ---------------- Footer -------------------------------------------- */
function Footer({ setScreen }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-wm" style={{ fontSize: "75px", lineHeight: "0.9" }}>Let's talk.</div>
          </div>
          <div className="footer-links footer-links-pages">
            <a onClick={() => setScreen("home")}>home</a>
            <a onClick={() => setScreen("work")}>work</a>
            <a onClick={() => setScreen("about")}>about</a>
            <a onClick={() => setScreen("contact")}>contact</a>
          </div>
          <div className="footer-links">
            <a className="footer-mail" href="mailto:alberto.soleralemany@gmail.com">alberto.soleralemany@gmail.com</a>
            <a href="https://www.instagram.com/icy.port" target="_blank" rel="noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noreferrer">Behance</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Alberto Soler · Montgat, Barcelona</span>
          <span>EN&nbsp;·&nbsp;ES</span>
        </div>
      </div>
    </footer>);

}

Object.assign(window, {
  I, TopNav, HeroPhoto, KitchenPhotoSVG, SectionHead, WorkRow,
  Manifesto, ContactForm, Footer, Breadcrumbs
});