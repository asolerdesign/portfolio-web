/* Bilingual (EN/ES) strings + language context for the portfolio.
   Default language is English; the choice persists in localStorage and the
   nav's (ENG / ESP) toggle switches it. t(key, vars) resolves a UI string;
   tp(work, field) resolves a per-project field (falls back to the English
   value already stored on the WORKS entry). */

import React, { createContext, useContext, useEffect, useState } from "react";

export const LANGS = ["en", "es"];

/* ---------------- Fixed UI strings ---------------------------------- */
export const STRINGS = {
  en: {
    // Nav
    "NAV.work": "Work",
    "NAV.about": "About",
    "NAV.contact": "Contact",
    // Home
    "HOME.title": "Graphic Design\n& Visual Communication",
    "HOME.based": "Based in Barcelona.",
    "HOME.intro": "Working across visual identity,\nart direction and digital experiences.",
    "HOME.meta_label": "Disciplines,\nopen for commissions,\n2026.",
    "HOME.disciplines": "Brand Strategy\nVisual Identity\nArt direction\nPackaging\nCreative AI",
    // Work
    "WORK.section_title": "Visual Identity",
    "BC.home": "home",
    "BC.work": "work",
    "BC.about": "about",
    "BC.contact": "contact",
    // Case study labels
    "CASE.back": "All work",
    "CASE.details_head": "Details",
    "CASE.k_category": "Category",
    "CASE.k_year": "Year",
    "CASE.k_business": "Business",
    "CASE.k_type": "Type of Project",
    "CASE.type_default": "Collaboration with Estudi Santamaria.",
    "CASE.feature_head": "Feature",
    // About
    "ABOUT.title": "As a human, as a designer.",
    "ABOUT.p1": "Hi, I'm Alberto Soler. A designer based in Barcelona in pursuit of greatness. I'm specialized in Brand Strategy, Visual Communication, Packaging and UI Design.",
    "ABOUT.p2": "As a human, I like to describe myself as sensitive and emotional — that's why my work routine bases itself in listening, understanding and thinking. I truly believe every design decision starts with a correct comprehension of the problem and the seek of a solution.",
    "ABOUT.p3": "As a designer, I see myself as a guide leading projects with careful attention to my clients, understanding their needs and translating them into creative and effective outcomes.",
    "ABOUT.p4": "My growing interest in Swiss design, sustainability, and conscious design has shaped the way I approach my work. It has taught me to view design not only as a form of visual communication, but as a universal tool capable of driving positive change and creating lasting impact.",
    "ABOUT.h2": "My Life.",
    "ABOUT.p5": "Outside the studio, life feeds the work. I grew up between Badalona and Montgat next to the coast, and most of what I care about — food, music, type, the way a shopfront is lettered — started as something I noticed walking around. I still collect those details obsessively.",
    "ABOUT.cta": "Start a conversation",
    // Contact
    "CONTACT.intro": "Form below or text me directly via email or social media. I read every brief personally and reply within less than two working days.",
    "CONTACT.ch_linkedin": "LinkedIn",
    // Form
    "FORM.label_name": "Your name",
    "FORM.ph_name": "David García",
    "FORM.label_email": "Email",
    "FORM.ph_email": "hello@example.com",
    "FORM.label_message": "Tell me about your project",
    "FORM.ph_message": "A few sentences — what you do, what you need, when you need it.",
    "FORM.attach": "Attach files",
    "FORM.send": "Send",
    "FORM.sending": "Sending…",
    "FORM.success_word": "Got it",
    "FORM.success_body": "Your message is on its way. I read everything personally and reply within two working days — either with a few clarifying questions, or a first conversation slot.",
    "FORM.error_title": "Couldn't send your message.",
    "FORM.error_api": "Something went wrong. Please try again, or email me directly.",
    "FORM.error_network": "Couldn't reach the server — check your connection, or email me directly.",
    // Footer
    "FOOTER.cta": "Let's talk.",
    "FOOTER.home": "home",
    "FOOTER.work": "work",
    "FOOTER.about": "about",
    "FOOTER.contact": "contact",
    "FOOTER.copyright": "© 2026 Alberto Soler · Montgat, Barcelona",
    "FOOTER.lang_note": "EN · ES",
    "FOOTER.legal": "Legal Notice",
    "FOOTER.privacy": "Privacy Policy",
    // Legal notice
    "LEGAL.title": "Legal Notice",
    "LEGAL.intro": "In compliance with Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the following information is provided:",
    "LEGAL.k_owner": "Owner",
    "LEGAL.k_nif": "Tax ID (NIF)",
    "LEGAL.k_address": "Address",
    "LEGAL.v_address": "Carrer Francesc Layret, 98, Badalona, 08911, Spain",
    "LEGAL.k_email": "Email",
    "LEGAL.k_web": "Website",
    "LEGAL.k_activity": "Activity",
    "LEGAL.v_activity": "Graphic design, brand identity and packaging services.",
    "LEGAL.s1_h": "Purpose.",
    "LEGAL.s1_p": "This website is informative in nature and serves as a professional portfolio. Accessing and using it confers the status of user and implies acceptance of this Legal Notice.",
    "LEGAL.s2_h": "Intellectual property.",
    "LEGAL.s2_p": "All content on this site (designs, texts, images, logos and projects shown) is owned by Alberto Soler Alemany or by the respective clients, and is protected by intellectual property law. Its reproduction, distribution or modification without express authorisation is prohibited.",
    "LEGAL.s3_h": "Liability.",
    "LEGAL.s3_p": "The owner accepts no responsibility for any misuse of the content of this site, which shall be the sole responsibility of the user.",
    "LEGAL.s4_h": "Governing law.",
    "LEGAL.s4_p": "This Legal Notice is governed by Spanish law. In the event of any dispute, the parties submit to the courts and tribunals that have jurisdiction in accordance with the law.",
    // Privacy policy
    "PRIVACY.title": "Privacy Policy",
    "PRIVACY.s1_h": "Data Controller.",
    "PRIVACY.s1_p": "Alberto Soler Alemany · NIF 48134874X · Carrer Francesc Layret, 98, Badalona, 08911, Spain · work@albertosolerdesign.com",
    "PRIVACY.s2_h": "What data do we collect and for what purpose?",
    "PRIVACY.s2_p": "Through the contact form we collect your name, email address and the content of your message, for the sole purpose of handling and replying to your enquiry. No data is collected for any other purpose and no profiles are created.",
    "PRIVACY.s3_h": "Legal basis.",
    "PRIVACY.s3_p": "The processing is based on your consent, which you give by submitting the form.",
    "PRIVACY.s4_h": "Retention.",
    "PRIVACY.s4_p": "Data is kept for as long as necessary to handle your request and, thereafter, until you request its erasure.",
    "PRIVACY.s5_h": "Recipients and data processors.",
    "PRIVACY.s5_p": "Form submissions are handled through Web3Forms, a service that acts as a data processor and processes data on servers that may be located outside the European Economic Area, with the safeguards provided for by the applicable regulations. The site is hosted on Cloudflare Pages (Cloudflare, Inc.). No data is disclosed to third parties unless required by law.",
    "PRIVACY.s6_h": "Analytics and cookies.",
    "PRIVACY.s6_p": "This site uses Cloudflare Web Analytics, an analytics tool that does not use cookies or collect personally identifiable data from visitors. Therefore, this site does not install tracking or advertising cookies and does not require a consent banner. The browser's local storage is used solely to remember your language preference, a function necessary for the site to work.",
    "PRIVACY.s7_h": "Your rights.",
    "PRIVACY.s7_a": "You may exercise your rights of access, rectification, erasure, objection, restriction of processing and portability by writing to work@albertosolerdesign.com. You also have the right to lodge a complaint with the Agencia Española de Protección de Datos (Spanish Data Protection Agency, ",
    "PRIVACY.s7_b": ") if you believe the processing does not comply with the regulations.",
    // Meta / SEO
    "META.title": "Alberto Soler — Graphic Design & Visual Communication",
    "META.description": "Alberto Soler — graphic design & visual communication. Brand strategy, visual identity and art direction, based in Barcelona.",
    // Mail (form submission)
    "MAIL.subject": "New portfolio enquiry from {name}",
    // Accessibility (aria-labels)
    "A11Y.lang": "Switch language",
    "A11Y.menu_open": "Open menu",
    "A11Y.menu_close": "Close menu",
    "A11Y.prev_proj": "Previous projects",
    "A11Y.next_proj": "Next projects",
    "A11Y.prev_img": "Previous image",
    "A11Y.next_img": "Next image",
    "A11Y.breadcrumb": "Directory route",
    "A11Y.remove_file": "Remove {file}",
    // Image drop placeholders
    "IMG.hero": "Drag your portrait here",
    "IMG.about": "Click or drop a portrait",
    "IMG.work_card": "Drop {name} cover",
    "IMG.case_main": "Drop a {name} image",
    "IMG.gallery": "{name} · image {n}",
  },
  es: {
    // Nav
    "NAV.work": "Proyectos",
    "NAV.about": "Sobre Mí",
    "NAV.contact": "Contacto",
    // Home
    "HOME.title": "Diseño Gráfico\n& Comunicación Visual",
    "HOME.based": "Ubicado en Barcelona.",
    "HOME.intro": "Dedicado a la creación de identidades visuales,\ndirección de arte y experiencias digitales.",
    "HOME.meta_label": "Disciplinas,\ndisponible para trabajar,\n2026.",
    "HOME.disciplines": "Estrategia de Marca\nIdentidad Visual\nDirección de Arte\nPackaging\nIA Creativa",
    // Work
    "WORK.section_title": "Identidad Visual",
    "BC.home": "home",
    "BC.work": "proyectos",
    "BC.about": "sobre mí",
    "BC.contact": "contacto",
    // Case study labels
    "CASE.back": "Proyectos",
    "CASE.details_head": "Detalles",
    "CASE.k_category": "Categoría",
    "CASE.k_year": "Año",
    "CASE.k_business": "Sector",
    "CASE.k_type": "Proyecto",
    "CASE.type_default": "Colaboración con Estudi Santamaria",
    "CASE.feature_head": "Muestras",
    // About
    "ABOUT.title": "Como humano, como diseñador.",
    "ABOUT.p1": "Hola, soy Alberto Soler, diseñador afincado en Barcelona en busca de la excelencia y mejora constante. Estoy especializado en estrategia de marca, comunicación visual, packaging y diseño de interfaces.",
    "ABOUT.p2": "Como persona, me gusta describirme como alguien sensible y emocional, por eso, mi rutina de trabajo se basa en escuchar, comprender y reflexionar. Creo firmemente que toda decisión de diseño parte de una comprensión correcta del problema y de la búsqueda de una solución firme.",
    "ABOUT.p3": "Como diseñador, me considero un guía que dirige los proyectos prestando especial atención a mis clientes, comprendiendo sus necesidades y traduciéndolas en resultados creativos y eficaces.",
    "ABOUT.p4": "Mi creciente interés por el diseño suizo, la sostenibilidad y el diseño consciente ha marcado mi forma de enfocar mi trabajo. Me ha enseñado a considerar el diseño no solo como una forma de comunicación visual, sino como una herramienta universal capaz de impulsar un cambio positivo y generar un impacto duradero.",
    "ABOUT.h2": "Sobre Mí.",
    "ABOUT.p5": "Fuera del estudio, la vida inspira mi trabajo. Crecí entre Badalona y Montgat, cerca de la costa, y la mayor parte de lo que me apasiona —la comida, la música, la tipografía, el diseño de los letreros de las tiendas— surgió de cosas que me llamaban la atención mientras paseaba. Sigo recopilando esos detalles de forma obsesiva.",
    "ABOUT.cta": "Empieza una conversación.",
    // Contact
    "CONTACT.intro": "Rellena el formulario que aparece a continuación o envíame un mensaje directamente por correo electrónico o a través de las redes sociales.",
    "CONTACT.ch_linkedin": "LinkedIn",
    // Form
    "FORM.label_name": "Tu nombre",
    "FORM.ph_name": "Aina García",
    "FORM.label_email": "Email",
    "FORM.ph_email": "hello@example.com",
    "FORM.label_message": "Cuéntame sobre tu proyecto",
    "FORM.ph_message": "Qué haces, qué necesitas, cuál es el timing.",
    "FORM.attach": "Adjunta archivos",
    "FORM.send": "Enviar",
    "FORM.sending": "Enviando…",
    "FORM.success_word": "Entendido",
    "FORM.success_body": "Ya te he enviado el mensaje. Leo todo personalmente y respondo en un plazo de dos días laborables, ya sea con algunas preguntas aclaratorias o proponiendo una primera fecha para la conversación. Muchas gracias por contactar conmigo.",
    "FORM.error_title": "No pudimos enviar tu mensaje, vuelve a intentarlo.",
    "FORM.error_api": "Ha surgido un error. Inténtalo de nuevo o envíame un correo electrónico directamente.",
    "FORM.error_network": "No se ha podido conectar con el servidor: comprueba tu conexión o envíame un correo electrónico directamente.",
    // Footer
    "FOOTER.cta": "¡Hablemos!",
    "FOOTER.home": "home",
    "FOOTER.work": "proyectos",
    "FOOTER.about": "sobre mí",
    "FOOTER.contact": "contacto",
    "FOOTER.copyright": "© 2026 Alberto Soler · Montgat, Barcelona",
    "FOOTER.lang_note": "EN · ES",
    "FOOTER.legal": "Aviso Legal",
    "FOOTER.privacy": "Política de Privacidad",
    // Aviso legal
    "LEGAL.title": "Aviso Legal",
    "LEGAL.intro": "En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos:",
    "LEGAL.k_owner": "Titular",
    "LEGAL.k_nif": "NIF",
    "LEGAL.k_address": "Domicilio",
    "LEGAL.v_address": "Carrer Francesc Layret, 98, Badalona, 08911, España",
    "LEGAL.k_email": "Correo electrónico",
    "LEGAL.k_web": "Sitio web",
    "LEGAL.k_activity": "Actividad",
    "LEGAL.v_activity": "Servicios de diseño gráfico, identidad de marca y packaging.",
    "LEGAL.s1_h": "Objeto.",
    "LEGAL.s1_p": "Este sitio web tiene carácter informativo y de portfolio profesional. El acceso y uso del mismo atribuye la condición de usuario e implica la aceptación de este Aviso Legal.",
    "LEGAL.s2_h": "Propiedad intelectual.",
    "LEGAL.s2_p": "Todos los contenidos del sitio (diseños, textos, imágenes, logotipos y proyectos mostrados) son titularidad de Alberto Soler Alemany o de sus respectivos clientes, y están protegidos por la normativa de propiedad intelectual. Queda prohibida su reproducción, distribución o modificación sin autorización expresa.",
    "LEGAL.s3_h": "Responsabilidad.",
    "LEGAL.s3_p": "El titular no se hace responsable del mal uso que se realice de los contenidos de este sitio, siendo responsabilidad exclusiva del usuario.",
    "LEGAL.s4_h": "Legislación aplicable.",
    "LEGAL.s4_p": "Este Aviso Legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a derecho.",
    // Política de privacidad
    "PRIVACY.title": "Política de Privacidad",
    "PRIVACY.s1_h": "Responsable del tratamiento.",
    "PRIVACY.s1_p": "Alberto Soler Alemany · NIF 48134874X · Carrer Francesc Layret, 98, Badalona, 08911, España · work@albertosolerdesign.com",
    "PRIVACY.s2_h": "¿Qué datos recogemos y con qué finalidad?",
    "PRIVACY.s2_p": "A través del formulario de contacto recogemos tu nombre, correo electrónico y el contenido del mensaje, con la única finalidad de atender y responder a tu consulta. No se recogen datos para ningún otro fin ni se elaboran perfiles.",
    "PRIVACY.s3_h": "Base legal.",
    "PRIVACY.s3_p": "El tratamiento se basa en tu consentimiento, que otorgas al enviar el formulario.",
    "PRIVACY.s4_h": "Conservación.",
    "PRIVACY.s4_p": "Los datos se conservan durante el tiempo necesario para atender tu solicitud y, posteriormente, hasta que solicites su supresión.",
    "PRIVACY.s5_h": "Destinatarios y encargados del tratamiento.",
    "PRIVACY.s5_p": "El envío del formulario se gestiona mediante Web3Forms, servicio que actúa como encargado del tratamiento y que procesa los datos en servidores que pueden ubicarse fuera del Espacio Económico Europeo, con las garantías previstas por la normativa aplicable. El sitio está alojado en Cloudflare Pages (Cloudflare, Inc.). No se ceden datos a terceros salvo obligación legal.",
    "PRIVACY.s6_h": "Analítica y cookies.",
    "PRIVACY.s6_p": "Este sitio utiliza Cloudflare Web Analytics, una herramienta de analítica que no emplea cookies ni recopila datos personales identificativos de los visitantes. Por ello, este sitio no instala cookies de seguimiento ni publicitarias y no requiere banner de consentimiento. Únicamente se utiliza el almacenamiento local del navegador para recordar tu preferencia de idioma, función necesaria para el funcionamiento del sitio.",
    "PRIVACY.s7_h": "Tus derechos.",
    "PRIVACY.s7_a": "Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a work@albertosolerdesign.com. Asimismo, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (",
    "PRIVACY.s7_b": ") si consideras que el tratamiento no se ajusta a la normativa.",
    // Meta / SEO
    "META.title": "Alberto Soler — Diseño Gráfico & Comunicación Visual",
    "META.description": "Alberto Soler — Diseño Gráfico & Comunicación Visual. Estrategia de marca, identidad visual y dirección de arte, ubicado en Barcelona.",
    // Mail (form submission)
    "MAIL.subject": "[SOLICITUD WORK] {name}",
    // Accessibility (aria-labels)
    "A11Y.lang": "Cambiar idioma",
    "A11Y.menu_open": "Abrir menú",
    "A11Y.menu_close": "Cerrar menú",
    "A11Y.prev_proj": "Proyectos anteriores",
    "A11Y.next_proj": "Proyectos siguientes",
    "A11Y.prev_img": "Imagen anterior",
    "A11Y.next_img": "Imagen siguiente",
    "A11Y.breadcrumb": "Ruta de navegación",
    "A11Y.remove_file": "Eliminar {file}",
    // Image drop placeholders
    "IMG.hero": "Arrastra tu retrato aquí",
    "IMG.about": "Haz clic o suelta un retrato",
    "IMG.work_card": "Suelta la portada de {name}",
    "IMG.case_main": "Suelta una imagen de {name}",
    "IMG.gallery": "{name} · imagen {n}",
  },
};

/* ---------------- Per-project Spanish fields ------------------------ */
// English lives on the WORKS entries (screens.jsx); these override per field
// when the language is Spanish. Brand names + titleLines stay as-is.
export const PROJECT_I18N = {
  "can-soler": { es: {
    kind: "Heladería y Turronería, Alimentario",
    category: "Branding, Packaging, Comunicación Visual",
    services: "Estrategia de Marca\nIdentidad Visual\nAplicaciones",
    desc: "Can Soler es una de las heladerías más emblemáticas de Badalona desde 1969, y lleva generaciones deleitando a sus clientes con helados artesanales y turrón tradicional. Al tratarse de un negocio estacional, su actividad gira en torno a dos momentos clave del año: la temporada de verano y la campaña navideña.\n\nLa marca está dirigida por Albert Soler, galardonado con el título de Campeón de España de Heladería en 2019. Más que una simple heladería, Can Soler representa la tradición familiar, la artesanía y el compromiso con los métodos clásicos que se han ido perfeccionando y elevando con esmero a lo largo de los años.",
  } },
  "iaia": { es: {
    kind: "Cheesecake, Alimentario",
    category: "Branding, Packaging, Comunicación Visual",
    services: "Identidad Visual\nEstrategia de Marca\nAplicaciones",
    desc: "IAIA nació en Cerdanyola del Vallès durante la pandemia. Lo que comenzó como un simple pasatiempo —hacer tartas de queso en casa— pronto se convirtió en algo mucho más grande cuando Albert Toà se dio cuenta de su potencial más allá de la cocina. Junto con su familia, transformó esa pasión en IAIA.\n\nHoy en día, la marca se ha hecho famosa por sus emblemáticas tartas de queso y su fuerte presencia en mercados de alimentos y festivales gastronómicos, donde sigue ganándose un público fiel gracias a la calidad, la artesanía y una identidad distintiva.",
  } },
  "saint-louis": { es: {
    kind: "Lujo Silencioso",
    category: "Branding, Identidad Visual",
    services: "Identidad Visual\nEstrategia de Marca\nAplicaciones",
    typeOfProject: "Proyecto de Final de Grado",
    desc: "«Saint Louis» es mi proyecto de final de carrera desarrollado en la universidad. El proyecto explora la investigación heráldica a través de un enfoque contemporáneo y minimalista, reinterpretando el simbolismo tradicional dentro de un lenguaje visual moderno.\n\nEl concepto que subyace al proyecto se basa en una sencilla pregunta: si un monarca medieval viviera hoy en día, ¿cómo serían su imagen, su comunicación visual y su marca personal?\n\nLa identidad se inspira en Luis IX de Francia, también conocido como San Luis, un monarca recordado por su humildad, devoción y fuerte vínculo con la fe católica, lo que finalmente condujo a su canonización.\n\nEl sistema de identidad visual se divide en tres marcas distintas, cada una diseñada para un propósito específico: el símbolo del logotipo se utiliza para aplicaciones corporativas, el escudo heráldico representa la dimensión simbólica de la marca y la firma se reserva para la autoría y aplicaciones más personales.",
  } },
  "creative4funnel": { es: {
    kind: "Marketing Digital",
    category: "Logotipo",
    services: "Naming\nMarca",
    typeOfProject: "Freelance",
    desc: "CREATIVE4FUNNEL es un estudio de marketing digital con sede en Andorra, fundado y dirigido por Marc Ramos. El estudio se especializa en estrategias de marketing digital, desarrollo de embudos de ventas y la organización de eventos a medida para emprendedores del sector de los productos informativos y creadores online.\n\nCon un claro enfoque en el crecimiento y la conversión de la audiencia, CREATIVE4FUNNEL combina el pensamiento estratégico, los contenidos y las experiencias en directo para ayudar a las marcas a reforzar su presencia digital y hacer crecer su negocio de forma eficaz.",
  } },
  "cheff": { es: {
    kind: "Bocadillos, Alimentario",
    category: "Identidad Visual",
    services: "Identidad Visual\nAplicaciones",
    typeOfProject: "Proyecto Universitario",
    desc: "CHEFF es una marca ficticia creada en el marco de un proyecto universitario. El concepto se centra en la entrega a domicilio de bocadillos ecológicos, combinando la sostenibilidad, la comodidad y una imagen de marca contemporánea en una experiencia moderna de entrega de comida a domicilio.",
  } },
  "embudoox": { es: {
    kind: "Embudos de Venta",
    category: "Logotipo",
    services: "Logotipo",
    typeOfProject: "Freelance",
    desc: "EMBUDOOX es una empresa de marketing digital con sede en Andorra, especializada en la estrategia y el desarrollo de embudos de ventas. Su identidad visual y emocional se basa en los conceptos de éxito, rendimiento y eficacia.",
  } },
  "cmp-spain": { es: {
    kind: "Pastelería, Alimentario",
    category: "Logotipo",
    services: "Logotipo",
    typeOfProject: "Freelance",
    desc: "CMP Spain es el nombre del Equipo Nacional de Pastelería de España, que representó a España en el Campeonato de Europa de 2026 y que pronto competirá en el Campeonato del Mundo. La identidad de marca se articula en torno a la abreviatura «ESP», derivada del nombre del país, creando una forma gráfica lineal que evoca la morfología tradicional en capas de un pastel.",
  } },
};

/* ---------------- Context ------------------------------------------- */
const interpolate = (str, vars) =>
  vars ? String(str).replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : "")) : str;

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const s = localStorage.getItem("lang");
      if (s === "en" || s === "es") return s;
    } catch (e) {}
    return "en";
  });

  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch (e) {}
  };

  const t = (key, vars) => {
    const dict = STRINGS[lang] || STRINGS.en;
    const val = dict[key] != null ? dict[key] : (STRINGS.en[key] != null ? STRINGS.en[key] : key);
    return interpolate(val, vars);
  };

  // Per-project field: Spanish override when present, else the English value
  // already on the WORKS entry.
  const tp = (work, field) => {
    if (lang === "es") {
      const o = PROJECT_I18N[work.id] && PROJECT_I18N[work.id].es;
      if (o && o[field] != null) return o[field];
    }
    return work[field];
  };

  // Keep <html lang>, the tab title and the meta description in sync.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t("META.title");
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", t("META.description"));
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t, tp }}>
      {children}
    </LangContext.Provider>);

}

export function useLang() {
  const ctx = useContext(LangContext);
  // Safe fallback so a component used outside the provider still renders (EN).
  if (!ctx) {
    const t = (key, vars) => interpolate(STRINGS.en[key] != null ? STRINGS.en[key] : key, vars);
    return { lang: "en", setLang: () => {}, t, tp: (w, f) => w[f] };
  }
  return ctx;
}
