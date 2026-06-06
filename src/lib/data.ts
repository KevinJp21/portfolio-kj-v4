/* Avatar / retrato de Kevin — editorial dark con halo cyan/iris */
export const AVATAR_URL = "/perfil_avatar.webp";

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  client: string;
  category: "E-commerce" | "Restaurant" | "AI" | "Web App";
  stack: string[];
  cover: string;
  accent: string;
  description: string;
  summary: string;
  url?: string;
  github?: string;
  highlights: { label: string; value: string }[];
  blocks: ProjectBlock[];
};

export type ProjectBlock =
  | { kind: "intro"; text: string }
  | {
      kind: "image";
      src: string;
      alt: string;
      caption?: string;
      size?: "wide" | "tall" | "full";
    }
  | {
      kind: "split";
      title: string;
      body: string;
      meta?: { label: string; value: string }[];
    }
  | { kind: "quote"; text: string; author?: string }
  | { kind: "list"; title: string; items: string[] };

/* Proyectos reales del Portfolio v3 — orden cronológico descendente */
export const projects: Project[] = [
  {
    slug: "ferreteria-rueda",
    index: "01",
    title: "Ferretería Rueda",
    subtitle:
      "Primer canal de ventas online para una ferretería con 30+ años de historia.",
    year: "2025",
    role: "Frontend Developer · Shopify Liquid",
    client: "Ferretería Rueda — Barranquilla, CO",
    category: "E-commerce",
    stack: ["Shopify", "Liquid", "JavaScript"],
    cover:
      "https://c98agni2tvccp34z.public.blob.vercel-storage.com/ferreteria-rueda.webp",
    accent: "#f6a847",
    description:
      "Tienda Shopify desarrollada desde cero con Liquid y JavaScript personalizado, adaptada al catálogo físico de una ferretería tradicional.",
    summary:
      "Construí el primer canal de ventas online de Ferretería Rueda. Tema personalizado con Liquid, carrusel de productos, filtros, búsqueda y badges de descuento — todo modular y editable desde el administrador.",
    url: "https://ferreteriarueda.com/",
    highlights: [
      { label: "Stack", value: "Liquid" },
      { label: "Catálogo", value: "Online" },
      { label: "Admin", value: "100%" },
    ],
    blocks: [
      {
        kind: "intro",
        text: "Ferretería Rueda llevaba más de 30 años operando en Barranquilla sin presencia digital más allá de redes sociales. El objetivo: construir su primer canal de ventas online completo, funcional y adaptado a su catálogo físico.",
      },
      {
        kind: "image",
        src: "https://c98agni2tvccp34z.public.blob.vercel-storage.com/ferreteria-rueda.webp",
        alt: "Tienda Ferretería Rueda",
        size: "full",
      },
      {
        kind: "split",
        title: "Shopify + Liquid desde cero",
        body: "Mi primera experiencia con Liquid. Aprendí sus estructuras (sections, snippets), condicionales y el sistema de bloques reutilizables. Combiné esto con JavaScript personalizado para mejorar la UX sin romper la compatibilidad nativa de Shopify.",
        meta: [
          { label: "Stack", value: "Shopify · Liquid · JS" },
          { label: "Tipo", value: "Tema personalizado" },
        ],
      },
      {
        kind: "list",
        title: "Lo que desarrollé",
        items: [
          "Carrusel de productos dinámico en la home.",
          "Menús desplegables jerárquicos por categorías.",
          "Filtros personalizados en páginas de productos.",
          "Barra de búsqueda funcional por nombre o palabra clave.",
          "Badges de descuento automáticos en productos en oferta.",
          "Interfaz flexible: el administrador organiza secciones sin código.",
        ],
      },
    ],
  },
  {
    slug: "verezza-e-commerce",
    index: "02",
    title: "Verezza E-commerce",
    subtitle:
      "Tienda headless de moda femenina conectada a Shopify vía Storefront API.",
    year: "2024",
    role: "Full-stack Developer · Headless commerce",
    client: "Verezza — proyecto independiente",
    category: "E-commerce",
    stack: ["React", "TypeScript", "Remix", "GraphQL", "Shopify Storefront"],
    cover:
      "https://c98agni2tvccp34z.public.blob.vercel-storage.com/verezza-hRFo1mfQtbUDRe7YZYBtRbvCb7JsCK.webp",
    accent: "#8b7dff",
    description:
      "E-commerce headless con Remix y Shopify Storefront API. Autenticación, navegación, filtros, carrito y flujo de pago — todo desde cero con SSR.",
    summary:
      "Diseñé y desarrollé el frontend completo de Verezza, una marca de moda femenina urbana. Tienda headless con Remix y React, conectada a Shopify vía Storefront API en GraphQL, con rendering híbrido SSR + CSR.",
    url: "https://verezza.vercel.app/",
    github: "https://github.com/KevinJp21/Verezza-E-commerce",
    highlights: [
      { label: "Tipo", value: "Headless" },
      { label: "Render", value: "SSR+CSR" },
      { label: "API", value: "GraphQL" },
    ],
    blocks: [
      {
        kind: "intro",
        text: "Verezza es una marca de moda urbana centrada en la autenticidad. El proyecto consistió en diseñar y desarrollar una tienda online desde cero — moderna, accesible y escalable — usando un stack profesional alineado con producción real.",
      },
      {
        kind: "image",
        src: "https://c98agni2tvccp34z.public.blob.vercel-storage.com/verezza-hRFo1mfQtbUDRe7YZYBtRbvCb7JsCK.webp",
        alt: "Verezza E-commerce",
        size: "full",
      },
      {
        kind: "split",
        title: "Headless con Shopify Storefront API",
        body: "Conecté el frontend a Shopify usando su Storefront API en GraphQL, consumiendo productos, colecciones y variantes. Implementé autenticación, filtros, carrito y flujo de pago con buen manejo de estados y errores en Remix.",
        meta: [
          { label: "Stack", value: "Remix · React · TS · GraphQL" },
          { label: "Backend", value: "Shopify headless" },
        ],
      },
      {
        kind: "list",
        title: "Lo que entregué",
        items: [
          "Frontend completo del e-commerce con Remix y React.",
          "Autenticación, navegación, filtros y flujo de pago.",
          "Integración Shopify Storefront API vía GraphQL.",
          "Diseño responsive móvil y escritorio.",
          "Optimización con SSR, lazy loading y control de caché.",
          "Lógica de cliente y servidor con manejo de estados.",
        ],
      },
    ],
  },
  {
    slug: "chikos-gourmet",
    index: "03",
    title: "Chikos Gourmet",
    subtitle:
      "Sitio oficial y panel administrativo para una marca gastronómica de Barranquilla.",
    year: "2024",
    role: "Full-stack Developer · Lead frontend",
    client: "Chikos Gourmet — Barranquilla, CO",
    category: "Restaurant",
    stack: ["React", "TypeScript", "Remix", "MySQL", "Cloudflare Images"],
    cover:
      "https://c98agni2tvccp34z.public.blob.vercel-storage.com/chikos-gourmet-mQUztT4FcdNPxleYy1ZLXC6wcMUApT.webp",
    accent: "#f6a847",
    description:
      "Sitio oficial de una pizzería gourmet con menú interactivo, panel administrativo y arquitectura Remix SSR.",
    summary:
      "Diseñé e implementé el sitio oficial de Chikos Gourmet desde cero, con un panel administrativo que permite gestionar menú, ubicaciones y contenido sin asistencia técnica. Imágenes optimizadas con Cloudflare Images.",
    url: "https://chikos.com.co",
    highlights: [
      { label: "Stack", value: "Remix" },
      { label: "Imágenes", value: "Cloudflare" },
      { label: "Admin", value: "Full" },
    ],
    blocks: [
      {
        kind: "intro",
        text: "Chikos Gourmet quería dejar de operar con menús en PDF y un sitio estático. Necesitaban una experiencia que reflejara el cuidado de cada plato y, al mismo tiempo, una herramienta interna para mover precios y fotografías en minutos.",
      },
      {
        kind: "image",
        src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2000&q=80",
        alt: "Mockup Chikos Gourmet",
        size: "full",
      },
      {
        kind: "split",
        title: "Sistema editable end-to-end",
        body: "Construí un panel administrativo donde el equipo puede actualizar platos, fotos, ubicaciones y campañas. Las imágenes se almacenan y sirven desde Cloudflare Images con variantes optimizadas por dispositivo.",
        meta: [
          { label: "Stack", value: "Remix · MySQL · Cloudflare" },
          { label: "Tipo", value: "Sitio + admin" },
        ],
      },
      {
        kind: "list",
        title: "Decisiones clave",
        items: [
          "Arquitectura Remix para SSR sin penalizar SEO.",
          "Optimización de imágenes con variantes AVIF/WebP.",
          "Panel administrativo con gestión por sucursal.",
          "Sistema de menús versionado para campañas estacionales.",
        ],
      },
    ],
  },
  {
    slug: "docme-assistant-chatbot",
    index: "04",
    title: "DocMe Assistant",
    subtitle:
      "Chatbot inteligente para mejorar el acceso a servicios médicos en Colombia.",
    year: "2024",
    role: "Backend Developer · Machine Learning",
    client: "Proyecto académico · DocMe",
    category: "AI",
    stack: ["Python", "Flask", "TensorFlow", "Keras", "SQLAlchemy", "MySQL"],
    cover:
      "https://c98agni2tvccp34z.public.blob.vercel-storage.com/docme-chatbot-hlpvvLZ1enJTmmzLeEwrSovrjTPOdr.webp",
    accent: "#7be3ff",
    description:
      "Asistente virtual con redes neuronales para clasificar intenciones y facilitar la gestión de citas médicas.",
    summary:
      "Diseñé y programé la arquitectura completa del chatbot — desde el entrenamiento del modelo con TensorFlow/Keras hasta la integración en una aplicación Flask con MySQL para gestionar usuarios y citas.",
    github: "https://github.com/KevinJp21/ChatBot",
    highlights: [
      { label: "NLP", value: "NLTK" },
      { label: "Backend", value: "Flask" },
      { label: "Dominio", value: "Salud" },
    ],
    blocks: [
      {
        kind: "intro",
        text: "El sistema de salud en Colombia enfrenta saturación en líneas de atención y demoras para acceder a servicios médicos. DocMe responde a estas limitaciones con un enfoque tecnológico — un asistente conversacional que clasifica intenciones, agenda citas y ofrece contención emocional básica.",
      },
      {
        kind: "image",
        src: "https://c98agni2tvccp34z.public.blob.vercel-storage.com/docme-chatbot-hlpvvLZ1enJTmmzLeEwrSovrjTPOdr.webp",
        alt: "DocMe Chatbot",
        size: "full",
      },
      {
        kind: "split",
        title: "NLP + redes neuronales",
        body: "Entrené redes neuronales con TensorFlow y Keras para clasificar intenciones del usuario. Combinado con NLTK y PySpellChecker para procesamiento de lenguaje natural y corrección ortográfica, el bot entiende saludos, síntomas, apoyo emocional y solicitudes de cita.",
        meta: [
          { label: "Modelos", value: "TensorFlow · Keras" },
          { label: "NLP", value: "NLTK · PySpellChecker" },
        ],
      },
      {
        kind: "list",
        title: "Lo que aporté",
        items: [
          "Arquitectura completa del chatbot, end-to-end.",
          "Entrenamiento del modelo de clasificación de intenciones.",
          "Backend Flask con SQLAlchemy + MySQL.",
          "Servidor de producción con Waitress (WSGI).",
          "Procesamiento NLP, corrección ortográfica y respuestas.",
        ],
      },
    ],
  },
];

/* Experiencia — colaboraciones reales en orden cronológico descendente */
export const experience: {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  stack: string[];
  current?: boolean;
}[] = [
  {
    period: "2026 — Ene · presente",
    role: "Frontend Developer",
    company: "Silver Holdings S.A.S.",
    location: "Barranquilla, Colombia",
    description:
      "Desarrollo y mantenimiento de aplicaciones web empresariales con Next.js y TailwindCSS. Aplicación de buenas prácticas de arquitectura, patrones de diseño y código mantenible — integrando servicios, mejorando la experiencia de usuario y optimizando procesos internos en equipos multidisciplinarios con metodologías ágiles.",
    stack: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    current: true,
  },
  {
    period: "2025 — May",
    role: "Frontend Developer · Shopify",
    company: "Ferretería Rueda",
    location: "Barranquilla, Colombia",
    description:
      "Primer canal de ventas online para una ferretería con más de 30 años de historia. Tema Shopify personalizado desde cero con Liquid y JavaScript, completamente editable desde el administrador.",
    stack: ["Shopify", "Liquid", "JavaScript"],
  },
  {
    period: "2024 — Nov",
    role: "Full-stack Developer · Headless",
    company: "Verezza E-commerce",
    location: "Proyecto independiente",
    description:
      "Tienda headless de moda femenina con Remix + React + TypeScript, conectada a Shopify vía Storefront API en GraphQL. Autenticación, filtros, carrito y flujo de pago con rendering híbrido SSR + CSR.",
    stack: ["Remix", "React", "TypeScript", "GraphQL", "Shopify"],
  },
  {
    period: "2024 — Oct",
    role: "Full-stack Developer · Lead frontend",
    company: "Chikos Gourmet",
    location: "Barranquilla, Colombia",
    description:
      "Sitio oficial y panel administrativo para una marca gastronómica. Remix + React + MySQL, con menú dinámico, gestión por sucursal e imágenes servidas desde Cloudflare Images.",
    stack: ["Remix", "React", "TypeScript", "MySQL", "Cloudflare"],
  },
  {
    period: "2024 — May",
    role: "Backend Developer · ML Engineer",
    company: "DocMe Assistant Chatbot",
    location: "Proyecto académico",
    description:
      "Chatbot inteligente para gestionar citas médicas. Backend en Flask + SQLAlchemy + MySQL, con redes neuronales en TensorFlow/Keras para clasificación de intenciones y NLTK para procesamiento de lenguaje natural.",
    stack: ["Python", "Flask", "TensorFlow", "Keras", "MySQL"],
  },
];

/* Stack — categorías y herramientas reales del Portfolio v3 */
export type StackLevel = "daily" | "project" | "learning";

export const stack: {
  category: string;
  items: { name: string; level: StackLevel }[];
}[] = [
  {
    category: "Lenguajes & Frameworks",
    items: [
      { name: "TypeScript", level: "daily" },
      { name: "JavaScript", level: "daily" },
      { name: "React", level: "daily" },
      { name: "Next.js", level: "daily" },
      { name: "TailwindCSS", level: "daily" },
      { name: "Remix", level: "project" },
      { name: "GraphQL", level: "project" },
      { name: "Angular", level: "learning" },
    ],
  },
  {
    category: "Backend & Datos",
    items: [
      { name: "Node.js", level: "project" },
      { name: "Express", level: "project" },
      { name: "Python", level: "project" },
      { name: "Flask", level: "project" },
      { name: "MySQL", level: "project" },
      { name: "SQLAlchemy", level: "project" },
      { name: "Shopify · Liquid", level: "project" },
      { name: "PHP", level: "project" },
      { name: "Java", level: "project" },
    ],
  },
  {
    category: "Inteligencia Artificial",
    items: [
      { name: "TensorFlow", level: "project" },
      { name: "Keras", level: "project" },
      { name: "NLTK", level: "project" },
      { name: "Pandas", level: "project" },
      { name: "NumPy", level: "project" },
      { name: "SciKit-Learn", level: "project" },
      { name: "Matplotlib", level: "project" },
      { name: "Seaborn", level: "project" },
    ],
  },
  {
    category: "Herramientas",
    items: [
      { name: "Git", level: "daily" },
      { name: "npm", level: "daily" },
      { name: "pnpm", level: "daily" },
      { name: "Cloudflare", level: "project" },
      { name: "Docker", level: "learning" },
    ],
  },
];

export const stackLevelLabel: Record<StackLevel, string> = {
  daily: "Diario",
  project: "Por proyecto",
  learning: "Aprendiendo",
};

/* Servicios — basados en la experiencia real de los 4 proyectos del v3 */
export const services: { code: string; title: string; description: string }[] =
  [
    {
      code: "S/01",
      title: "Frontend Development",
      description:
        "Aplicaciones web modernas con React, Next.js y TailwindCSS. TypeScript, arquitectura escalable, patrones de diseño y foco en rendimiento, accesibilidad y experiencia de usuario.",
    },
    {
      code: "S/02",
      title: "Aplicaciones Full-stack",
      description:
        "APIs REST, bases de datos relacionales, autenticación y validaciones. Visión integral del flujo — desde el componente hasta la consulta SQL — con buenas prácticas y patrones de diseño aplicados.",
    },
    {
      code: "S/03",
      title: "E-commerce & Shopify",
      description:
        "Temas personalizados en Shopify con Liquid y arquitecturas headless con Storefront API + GraphQL. Tiendas desde cero, editables por el cliente, optimizadas para conversión.",
    },
    {
      code: "S/04",
      title: "Backend & Machine Learning",
      description:
        "Servicios backend en Flask y Express. Modelos de clasificación con TensorFlow/Keras y NLP con NLTK para resolver problemas concretos con datos reales.",
    },
  ];

/* Proceso — metodología basada en buenas prácticas ágiles */
export const process: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "Entender",
    body: "Empiezo por entender el problema real — qué necesita el usuario, qué hace el negocio, qué fricción existe. Sin esa claridad, cualquier solución es decoración.",
  },
  {
    step: "02",
    title: "Diseñar",
    body: "Boceto la arquitectura técnica y los flujos. Decido stack, patrones, modelo de datos. Lo importante: dejar las decisiones explícitas, no asumidas.",
  },
  {
    step: "03",
    title: "Construir",
    body: "Implementación desde cero con buenas prácticas — componentes reutilizables, código tipado, manejo de estados y errores. Metodologías ágiles aplicadas con criterio.",
  },
  {
    step: "04",
    title: "Pulir",
    body: "Optimización, accesibilidad, microinteracciones y revisión. El detalle es lo que separa una entrega que funciona de un producto que se siente bien usar.",
  },
];

/* Palabras clave para marquees */
export const keywords: string[] = [
  "Frontend Developer · Full-stack",
  "React · Next.js · TypeScript · TailwindCSS",
  "Ingeniero de sistemas",
  "Barranquilla, Colombia",
  "Disponible para nuevos proyectos · 2026",
];

export const navLinks = [
  { href: "/", label: "Inicio", code: "00" },
  { href: "/blog", label: "Blog", code: "01" },
  { href: "/about", label: "Sobre mí", code: "02" },
  { href: "/contact", label: "Contacto", code: "03" },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
