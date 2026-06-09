/* Screens for the Alberto Soler portfolio. */

import React from "react";
import { I, HeroPhoto, Breadcrumbs, ContactForm } from "./components.jsx";

const WORKS = [
{ id: "can-soler", name: "Can Soler", kind: "Ice Cream & Nougat, Alimentary", year: 2025,
  image: "assets/work/can-soler-card.jpg",
  galleryCount: 8,
  category: "Branding, Packaging, Visual Communication",
  services: "Brand Strategy\nVisual Identity\nApplications",
  desc: "Can Soler has been one of Badalona's most iconic ice cream parlours since 1969, delighting generations with handcrafted ice creams and traditional nougat. As a seasonal business, their work revolves around two key moments of the year: the summer season and the Christmas campaign.\n\nThe brand is led by Albert Soler, who was awarded the title of Spanish Ice Cream Champion in 2019. More than just an ice cream shop, Can Soler represents family tradition, craftsmanship, and a commitment to classic methods that have been carefully refined and elevated over the years." },
{ id: "iaia", name: "IAIA", kind: "Cheesecake, Alimentary", year: 2025,
  category: "Branding, Packaging, Visual Communication",
  services: "Visual Identity\nBrand Strategy\nApplications",
  desc: "IAIA was born in Cerdanyola del Vallès during the pandemic. What started as a simple hobby — baking cheesecakes at home — soon became something much bigger when Albert Toà realised its potential beyond the kitchen. Together with his family, he transformed that passion into IAIA.\n\nToday, the brand has become known for its signature cheesecakes and its strong presence at food markets and gastronomic festivals, where it continues to build a loyal following through quality, craftsmanship, and a distinctive identity." },
{ id: "saint-louis", name: "Saint Louis", kind: "Quiet Luxury Brand", year: 2024,
  galleryCount: 6,
  typeOfProject: "Final Degree Project",
  category: "Branding, Visual Identity",
  services: "Visual Identity\nBrand Strategy\nApplications",
  desc: "Saint Louis is my final degree project developed at university. The project explores heraldic research through a contemporary and minimalist approach, reinterpreting traditional symbolism within a modern visual language.\n\nThe concept behind the project is based on a simple question: if a medieval monarch were alive today, what would his image, visual communication, and personal brand look like?\n\nThe identity is inspired by Louis IX of France, also known as Saint Louis — a monarch remembered for his humility, devotion, and strong connection to the Catholic faith, which eventually led to his canonisation.\n\nThe visual identity system is divided into three distinct marks, each designed for a specific purpose: the logo symbol is used for corporate applications, the heraldic shield represents the symbolic dimension of the brand, and the signature is reserved for authorship and more personal applications." },
{ id: "creative4funnel", name: "Creative4Funnel", titleLines: ["Creative", "4Funnel"], kind: "Digital Marketing", year: 2023,
  galleryCount: 2,
  typeOfProject: "Freelance",
  category: "Brandmark",
  services: "Naming\nBrandmark",
  desc: "CREATIVE4FUNNEL is a digital marketing studio based in Andorra, founded and led by Marc Ramos. The studio specialises in digital marketing strategies, sales funnel development, and the production of events tailored for infoproduct entrepreneurs and online creators.\n\nWith a strong focus on growth and audience conversion, CREATIVE4FUNNEL combines strategic thinking, content, and live experiences to help brands strengthen their digital presence and scale their business effectively." },
{ id: "cheff", name: "Cheff", kind: "Sandwiches, Alimentary", year: 2022,
  galleryCount: 3,
  category: "Visual Identity",
  typeOfProject: "University Project",
  services: "Visual Identity\nApplications",
  desc: "CHEFF is a fictional brand created as part of a university project. The concept focuses on eco-friendly sandwich delivery, combining sustainability, convenience, and contemporary branding into a modern food delivery experience." },
{ id: "embudoox", name: "Embudoox", kind: "Commercial Funnel", year: 2024,
  galleryCount: 2,
  category: "Brandmark",
  typeOfProject: "Freelance",
  services: "Brandmark",
  desc: "EMBUDOOX is a digital marketing company based in Andorra, specializing in sales funnel strategy and development. Its visual and emotional identity is built around the concepts of success, performance, and effectiveness." },
{ id: "cmp-spain", name: "CMP Spain", kind: "Pastry, Alimentary", year: 2024,
  galleryCount: 1,
  category: "Brandmark",
  typeOfProject: "Freelance",
  services: "Brandmark",
  desc: "CMP Spain is the name of the Spanish National Pastry Team, which represented Spain at the 2026 European Championship and will soon compete in the World Championship. The brand identity is built around the abbreviation \"ESP\", derived from the country's name, creating a linear graphic form that evokes the traditional layered morphology of a pastry." }];


/* =====================================================================
   HOME — matches the reference image
   ===================================================================== */
function HomeScreen({ setScreen }) {
  return (
    <>
      <div className="container">
        <HeroPhoto slotId="home-hero" placeholderLabel="Drag your portrait here" />
      </div>

      <section className="container">
        <div className="hero-block">
          <div className="hero-title-wrap">
            <h1 className="hero-title">Graphic Design<br />&amp; Visual Communication</h1>
          </div>

          <div className="hero-meta-wrap">
            <div className="meta-table">
              <div className="row single"><span className="v" style={{ fontWeight: "700" }}>Based in Barcelona.</span></div>
              <div className="row single"><span className="v" style={{ fontWeight: "500" }}>Working across visual identity,{"\n"}art direction and digital experiences.</span></div>
              <div className="row">
                <span className="k" style={{ fontWeight: "400" }}>Disciplines,{"\n"}open for commissions,{"\n"}2026.</span>
                <span className="v">Brand Strategy{"\n"}Visual Identity{"\n"}Art direction{"\n"}Packaging{"\n"}Creative AI</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>);

}

/* =====================================================================
   WORK — horizontal carousel
   ===================================================================== */
/* Single horizontal carousel used by WorkScreen. Extracted so multiple
   sections (Visual Identity, Creative Playground, …) can share the same
   chrome and behaviour. */
function WorkCarousel({ title, items, openCase }) {
  const trackRef = React.useRef(null);
  const draggedRef = React.useRef(false);

  const scrollByCard = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector(".work-card");
    const gap = parseFloat(getComputedStyle(t).columnGap || getComputedStyle(t).gap) || 24;
    const step = card ? card.offsetWidth + gap : t.clientWidth * 0.7;
    t.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  React.useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    let down = false,startX = 0,startScroll = 0;
    const onDown = (e) => {
      down = true;draggedRef.current = false;
      startX = e.clientX;startScroll = t.scrollLeft;
      t.classList.add("dragging");
    };
    const onMove = (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) draggedRef.current = true;
      t.scrollLeft = startScroll - dx;
    };
    const onUp = () => {down = false;t.classList.remove("dragging");};
    t.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      t.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const onCardClick = (id) => (e) => {
    if (draggedRef.current) {e.preventDefault();return;}
    openCase(id);
  };

  return (
    <div className="work-carousel-section">
      <div className="container work-carousel-title-row">
        <h2 className="work-section-title" style={{ fontSize: "35px", letterSpacing: "-0.5px" }}>{title}</h2>
      </div>

      <div className="work-carousel">
        <div className="work-track" ref={trackRef}>
          {items.map((w) =>
          <article
            className="work-card"
            key={w.id}
            onClick={onCardClick(w.id)}
            role="link"
            tabIndex="0"
            onKeyDown={(e) => {if (e.key === "Enter") openCase(w.id);}}>
            
              <div className="work-card-image">
                <image-slot
                id={`work-${w.id}`}
                src={w.image || ""}
                placeholder={`Drop ${w.name} cover`}
                shape="rect"
                fit="cover">
              </image-slot>
              </div>
              <div className="work-card-hover">
                <span className="work-card-hover-name">{w.name}</span>
                <span className="work-card-hover-arrow"><I.ArrowUpRight /></span>
              </div>
            </article>
          )}
        </div>
      </div>

      <div className="container carousel-controls">
        <button
          className="carousel-arrow"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous projects">
          
          <I.ArrowLeftLg />
        </button>
        <button
          className="carousel-arrow"
          onClick={() => scrollByCard(1)}
          aria-label="Next projects">
          
          <I.ArrowRightLg />
        </button>
      </div>
    </div>);

}

function WorkScreen({ openCase, setScreen }) {
  const identityProjects = WORKS.filter((w) => (w.section || "identity") === "identity");

  return (
    <section className="work-section">
      <div className="container work-section-head">
        <Breadcrumbs path={["home", "work"]} setScreen={setScreen} />
      </div>

      <WorkCarousel title="Visual Identity" items={identityProjects} openCase={openCase} />
    </section>);

}

/* =====================================================================
   CASE STUDY — per-project detail page
   ===================================================================== */

/* Drop-target carousel used inside every case study. The number of slots is
   configurable per-project via `count` so projects with fewer assets can show
   a shorter carousel. */
function CaseGallery({ caseId, caseName, count }) {
  const trackRef = React.useRef(null);

  const scrollByCard = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector(".case-gallery-card");
    const gap = parseFloat(getComputedStyle(t).columnGap || getComputedStyle(t).gap) || 24;
    const step = card ? card.offsetWidth + gap : t.clientWidth * 0.7;
    t.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Drag-to-scroll
  React.useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    let down = false,startX = 0,startScroll = 0;
    const onDown = (e) => {
      // Don't hijack drag on the slot itself — it has its own drop UX
      if (e.target.closest("image-slot")) return;
      down = true;
      startX = e.clientX;startScroll = t.scrollLeft;
      t.classList.add("dragging");
    };
    const onMove = (e) => {
      if (!down) return;
      t.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = () => {down = false;t.classList.remove("dragging");};
    t.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      t.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <div className="case-gallery-wrap">
        <div className="case-gallery-track" ref={trackRef}>
          {Array.from({ length: count }).map((_, i) => {
            const n = i + 1;
            return (
              <div className="case-gallery-card" key={n}>
                <image-slot
                  id={`case-${caseId}-${n}`}
                  placeholder={`${caseName} · image ${String(n).padStart(2, "0")}`}
                  shape="rect"
                  fit="cover">
                </image-slot>
              </div>);

          })}
        </div>
      </div>

      <div className="container carousel-controls case-gallery-controls">
        <button
          className="carousel-arrow"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous image">
          
          <I.ArrowLeftLg />
        </button>
        <button
          className="carousel-arrow"
          onClick={() => scrollByCard(1)}
          aria-label="Next image">
          
          <I.ArrowRightLg />
        </button>
      </div>
    </>);

}

function CaseStudy({ caseId, setScreen, openCase }) {
  const w = WORKS.find((x) => x.id === caseId) || WORKS[0];
  const idx = WORKS.findIndex((x) => x.id === caseId);
  const total = WORKS.length;
  // Linear navigation (not circular): no prev on the first, no next on the last.
  const prev = idx > 0 ? WORKS[idx - 1] : null;
  const next = idx < total - 1 ? WORKS[idx + 1] : null;

  // Split services into a list for the Feature block
  const services = (w.services || "").split("\n").filter(Boolean);

  return (
    <section className="case-study">
      <div className="container case-back">
        <button className="btn" onClick={() => setScreen("work")}>
          <I.ArrowLeftLg style={{ width: 16, height: 16 }} />
          All work
        </button>
        <div className="case-back-count">
          ({String(idx + 1).padStart(2, "0")}) <span style={{ color: "var(--gray)" }}>/ {String(total).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="container case-layout">
        <div className="case-text">
          <h1 className="case-title">
            {w.titleLines ?
            w.titleLines.map((line, i) =>
            <React.Fragment key={i}>{i > 0 ? <br /> : null}{line}</React.Fragment>
            ) :
            w.name}
          </h1>
          {(w.desc || "").split("\n\n").map((para, i) =>
          <p className="case-lede" key={i}>{para}</p>
          )}

          <div className="case-section case-details-block">
            <div className="case-section-head">Details</div>
            <div className="case-details-row"><span className="k">Category</span><span className="v">{w.category}</span></div>
            <div className="case-details-row"><span className="k">Year</span><span className="v">{w.year}</span></div>
            <div className="case-details-row"><span className="k">Bussines</span><span className="v">{w.kind}</span></div>
            <div className="case-details-row"><span className="k">Type of Project</span><span className="v">{w.typeOfProject || "Collaboration with Estudi Santamaria."}</span></div>
          </div>

          <div className="case-section">
            <div className="case-section-head">Feature</div>
            <ul className="case-feature-list">
              {services.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>

        <div className="case-media">
          {w.image ?
          <img src={w.image} alt={w.name} className="case-media-img" /> :

          <image-slot
            id={`case-main-${w.id}`}
            placeholder={`Drop a ${w.name} image`}
            shape="rect"
            fit="cover">
          </image-slot>
          }
        </div>
      </div>

      <CaseGallery caseId={w.id} caseName={w.name} count={w.galleryCount || 4} />

      <div className="container case-nav">
        {prev ? (
          <button className="case-nav-side" onClick={() => openCase(prev.id)}>
            <span className="case-nav-name">← {prev.name}</span>
          </button>
        ) : null}
        {next ? (
          <button className="case-nav-side right" onClick={() => openCase(next.id)}>
            <span className="case-nav-name">{next.name} →</span>
          </button>
        ) : null}
      </div>
    </section>);

}

/* =====================================================================
   ABOUT
   ===================================================================== */
function AboutScreen({ setScreen }) {
  return (
    <section className="section section-tight">
      <div className="container">
        <div className="about-grid">
          <div className="about-portrait bw-photo-bg">
            <image-slot
              id="about-portrait"
              src="assets/about-placeholder.svg"
              placeholder="Click or drop a portrait"
              shape="rect"
              fit="cover">
            </image-slot>
          </div>

          <div className="about-body">
            <h2 className="about-title">As a human, as a designer.</h2>
            <p>Hi, I'm Alberto Soler. A designer based in Barcelona in pursuit of greatness. I'm specialized in Brand Strategy, Visual Communication, Packaging 
and UI Design.


            </p>
            <p>As a human, I like to describe myself as sensitive and emotional — that's why my work routine bases itself in listening, understanding and thinking.
I truly believe every design decision starts with a correct comprehension of the problem and the seek of a solution.



            </p>
            <p>As a designer, I see myself as a guide leading projects with careful attention to my clients, understanding their needs and translating them into creative and effective outcomes.</p>
            <p>My growing interest in Swiss design, sustainability, and conscious design has shaped the way I approach my work. It has taught me to view design not only as a form of visual communication, but as a universal tool capable of driving positive change and creating lasting impact.</p>

            <h3 className="about-h" style={{ fontSize: "56px" }}>My Life.</h3>

            <p>Outside the studio, life feeds the work. I grew up between Badalona and Montgat next to the coast, and most of what I care about — food, music, type, the way a shopfront is lettered — started as something I noticed walking around. I still collect those details obsessively.





            </p>

            <div style={{ marginTop: 32 }}>
              <button className="btn" onClick={() => setScreen("contact")}>
                Start a conversation <I.ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* =====================================================================
   CONTACT
   ===================================================================== */
function ContactScreen() {
  return (
    <section className="section section-tight">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-side">
            <p>
              Form below or text me directly via email or social media. I read every brief
              personally and reply within less than two working days.
            </p>
            <div className="channels">
              <a href="mailto:alberto.soleralemany@gmail.com">alberto.soleralemany@gmail.com</a>
              <a href="#" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://linkedin.com/in/alberto-soler-alemany-22b45621b/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          <div className="contact-form-wrap">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>);

}

export { WORKS, HomeScreen, WorkScreen, CaseStudy, AboutScreen, ContactScreen };