import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_CE79dq6h.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../chunks/Header_iJfZ_hVj.mjs';
import { $ as $$Footer } from '../chunks/Footer_CH5Ge0p6.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Portfolio = createComponent(($$result, $$props, $$slots) => {
  const projects = [
    {
      id: "01",
      mockup: "laptop",
      title: "Centrachat Africa",
      subtitle: "Premi\xE8re centrale d'achats panafricaine",
      category: "Digital & Strat\xE9gie",
      country: "CAMEROUN",
      description: "Cr\xE9ation de la plateforme digitale de la premi\xE8re centrale d'achats panafricaine bas\xE9e \xE0 Yaound\xE9. Site bilingue, syst\xE8me d'adh\xE9sion en ligne, identit\xE9 de marque compl\xE8te.",
      tags: ["Web Premium", "Strat\xE9gie", "Branding"],
      image: "/homeCentrachat.webp",
      link: "https://www.centrachat.africa",
      color: "#1a3a5c"
    },
    {
      id: "02",
      mockup: "phone",
      title: "PaieCashPlay",
      subtitle: "Solutions digitales pour les associations sportives",
      category: "Fintech & Intelligence Artificielle",
      country: "FRANCE / AFRIQUE",
      description: "Conception et d\xE9veloppement de l'\xE9cosyst\xE8me digital PaieCashPlay : paiements digitaux, e-commerce, streaming, agent IA et digitalisation des clubs sportifs.",
      tags: ["Fintech", "Agent IA", "App Mobile"],
      image: "/homePaiecashplay.webp",
      link: "https://www.paiecashplay.com",
      color: "#1a1a2e"
    },
    {
      id: "03",
      mockup: "screen",
      title: "AFAC26 Conference",
      subtitle: "Site trilingue, agent IA et paiement international",
      category: "Intelligence Artificielle",
      country: "INTERNATIONAL",
      description: "Conception et d\xE9veloppement du site officiel de l'African Football Agents Conference 2026. Plateforme trilingue (FR/EN/PT), agent IA int\xE9gr\xE9, syst\xE8me de paiement international et accr\xE9ditation.",
      tags: ["Agent IA", "Web Trilingue", "Paiement"],
      image: "/Afac26_home.jpg",
      link: "https://www.afaaconference.com/en",
      color: "#0d1b2a"
    },
    {
      id: "04",
      mockup: "laptop",
      title: "Alexis Mohamed \u2014 Djibouti",
      subtitle: "Campagne pr\xE9sidentielle 2026",
      category: "Communication 360",
      country: "DJIBOUTI",
      description: "Strat\xE9gie de communication compl\xE8te pour la campagne pr\xE9sidentielle 2026 d'Alexis Mohamed. Identit\xE9 visuelle, site officiel, gestion des r\xE9seaux sociaux et relations presse.",
      tags: ["Communication Politique", "Web", "R\xE9seaux Sociaux"],
      image: "/homeMohamed.jpg",
      link: "https://www.alexismohamed.dj",
      color: "#1c3a5e"
    },
    {
      id: "05",
      mockup: "screen",
      title: "Dr Serge Ghislain Djorie",
      subtitle: "Campagne pr\xE9sidentielle 2025 \u2014 Centrafrique",
      category: "Communication 360",
      country: "CENTRAFRIQUE",
      description: "Direction de la communication pour la campagne pr\xE9sidentielle 2025 en Centrafrique. Strat\xE9gie digitale, site officiel, production de contenus et coordination m\xE9dias.",
      tags: ["Communication Politique", "Strat\xE9gie", "M\xE9dias"],
      image: "/homeDjorie.jpg",
      link: "https://www.djorie2025.cf",
      color: "#1a0a2e"
    },
    {
      id: "06",
      mockup: "laptop",
      title: "Nomad\xE9o Africa",
      subtitle: "Refonte site e-commerce mobilier de bureau",
      category: "Digital",
      country: "CAMEROUN",
      description: "Refonte compl\xE8te du site e-commerce de Nomad\xE9o Africa, leader du mobilier de bureau au Cameroun. UX/UI premium, catalogue produits, SEO et int\xE9gration paiement.",
      tags: ["E-commerce", "UX/UI", "SEO"],
      image: "/nomadeo africa home.jpg",
      link: "https://www.nomadeoafrica.com",
      color: "#1a2a1a"
    },
    {
      id: "07",
      mockup: "phone",
      title: "Coplacam",
      subtitle: "Refonte site institutionnel Design & Build",
      category: "Digital",
      country: "CAMEROUN",
      description: "Refonte du site institutionnel de Coplacam Design & Build, acteur majeur de l'agencement sur mesure en Afrique centrale. Identit\xE9 visuelle renforc\xE9e et exp\xE9rience utilisateur premium.",
      tags: ["Web Institutionnel", "Design", "Branding"],
      image: "/coplacam_home.png",
      link: "https://www.coplacam.com",
      color: "#2a1a0a"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Portfolio \u2014 One Nation Agency | Projets Strat\xE9giques & Digitaux", "description": "D\xE9couvrez les projets strat\xE9giques, digitaux et institutionnels r\xE9alis\xE9s par One Nation Agency en Afrique, Europe et au Moyen-Orient.", "data-astro-cid-hcjuqwdu": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-hcjuqwdu": true })} ${maybeRenderHead()}<main id="main-content" data-astro-cid-hcjuqwdu> <!-- Hero --> <section class="pf-hero" data-astro-cid-hcjuqwdu> <div class="pf-hero__bg" data-astro-cid-hcjuqwdu></div> <div class="pf-hero__content" data-astro-cid-hcjuqwdu> <span class="pf-hero__label" data-astro-cid-hcjuqwdu>Nos Réalisations</span> <h1 class="pf-hero__title" data-astro-cid-hcjuqwdu>Portfolio</h1> <p class="pf-hero__sub" data-astro-cid-hcjuqwdu>Projets stratégiques, digitaux et institutionnels à forte valeur ajoutée</p> </div> <div class="pf-hero__stats" data-astro-cid-hcjuqwdu> <div class="pf-hero__stat" data-astro-cid-hcjuqwdu> <span class="pf-hero__stat-num" data-astro-cid-hcjuqwdu>07</span> <span class="pf-hero__stat-label" data-astro-cid-hcjuqwdu>Projets</span> </div> <div class="pf-hero__stat" data-astro-cid-hcjuqwdu> <span class="pf-hero__stat-num" data-astro-cid-hcjuqwdu>12+</span> <span class="pf-hero__stat-label" data-astro-cid-hcjuqwdu>Pays</span> </div> <div class="pf-hero__stat" data-astro-cid-hcjuqwdu> <span class="pf-hero__stat-num" data-astro-cid-hcjuqwdu>3</span> <span class="pf-hero__stat-label" data-astro-cid-hcjuqwdu>Expertises</span> </div> </div> </section> <!-- Projets --> <section class="pf-projects" data-astro-cid-hcjuqwdu> ${projects.map((project, index) => renderTemplate`<article${addAttribute(`pf-item pf-item--${project.mockup} ${index % 2 !== 0 ? "pf-item--alt" : ""}`, "class")}${addAttribute(`--project-color: ${project.color};`, "style")}${addAttribute(index, "data-index")} data-astro-cid-hcjuqwdu> <!-- Visuel avec mockup --> <div class="pf-item__visual" data-astro-cid-hcjuqwdu> <div class="pf-item__bg"${addAttribute(`background: ${project.color};`, "style")} data-astro-cid-hcjuqwdu></div> ${project.mockup === "laptop" && renderTemplate`<div class="mockup mockup--laptop" data-astro-cid-hcjuqwdu> <div class="mockup__laptop-body" data-astro-cid-hcjuqwdu> <div class="mockup__laptop-screen" data-astro-cid-hcjuqwdu> <div class="mockup__laptop-bar" data-astro-cid-hcjuqwdu> <span class="mockup__dot mockup__dot--red" data-astro-cid-hcjuqwdu></span> <span class="mockup__dot mockup__dot--yellow" data-astro-cid-hcjuqwdu></span> <span class="mockup__dot mockup__dot--green" data-astro-cid-hcjuqwdu></span> </div> <div class="mockup__screen-content" data-astro-cid-hcjuqwdu> <img${addAttribute(project.image, "src")}${addAttribute(project.title, "alt")} class="mockup__img" loading="lazy" data-astro-cid-hcjuqwdu> </div> </div> </div> <div class="mockup__laptop-base" data-astro-cid-hcjuqwdu> <div class="mockup__laptop-hinge" data-astro-cid-hcjuqwdu></div> </div> </div>`} ${project.mockup === "phone" && renderTemplate`<div class="mockup mockup--phone" data-astro-cid-hcjuqwdu> <div class="mockup__phone-body" data-astro-cid-hcjuqwdu> <div class="mockup__phone-notch" data-astro-cid-hcjuqwdu></div> <div class="mockup__phone-screen" data-astro-cid-hcjuqwdu> <img${addAttribute(project.image, "src")}${addAttribute(project.title, "alt")} class="mockup__img" loading="lazy" data-astro-cid-hcjuqwdu> </div> <div class="mockup__phone-home" data-astro-cid-hcjuqwdu></div> </div> </div>`} ${project.mockup === "screen" && renderTemplate`<div class="mockup mockup--screen" data-astro-cid-hcjuqwdu> <div class="mockup__screen-frame" data-astro-cid-hcjuqwdu> <div class="mockup__screen-bezel" data-astro-cid-hcjuqwdu> <div class="mockup__screen-content" data-astro-cid-hcjuqwdu> <img${addAttribute(project.image, "src")}${addAttribute(project.title, "alt")} class="mockup__img" loading="lazy" data-astro-cid-hcjuqwdu> </div> </div> </div> <div class="mockup__screen-stand" data-astro-cid-hcjuqwdu> <div class="mockup__screen-neck" data-astro-cid-hcjuqwdu></div> <div class="mockup__screen-foot" data-astro-cid-hcjuqwdu></div> </div> </div>`} <div class="pf-item__num-bg" data-astro-cid-hcjuqwdu>${project.id}</div> </div> <!-- Infos --> <div class="pf-item__info" data-astro-cid-hcjuqwdu> <div class="pf-item__meta" data-astro-cid-hcjuqwdu> <span class="pf-item__country" data-astro-cid-hcjuqwdu>${project.country}</span> <span class="pf-item__sep" data-astro-cid-hcjuqwdu>|</span> <span class="pf-item__category" data-astro-cid-hcjuqwdu>${project.category}</span> </div> <div class="pf-item__num" data-astro-cid-hcjuqwdu>${project.id}</div> <h2 class="pf-item__title" data-astro-cid-hcjuqwdu>${project.title}</h2> <p class="pf-item__subtitle" data-astro-cid-hcjuqwdu>${project.subtitle}</p> <p class="pf-item__desc" data-astro-cid-hcjuqwdu>${project.description}</p> <div class="pf-item__tags" data-astro-cid-hcjuqwdu> ${project.tags.map((tag) => renderTemplate`<span class="pf-item__tag" data-astro-cid-hcjuqwdu>${tag}</span>`)} </div> ${project.link !== "#" ? renderTemplate`<a${addAttribute(project.link, "href")} target="_blank" rel="noopener noreferrer" class="pf-item__cta" data-astro-cid-hcjuqwdu> <span data-astro-cid-hcjuqwdu>Voir le projet</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-hcjuqwdu><path d="M7 17L17 7M17 7H7M17 7v10" data-astro-cid-hcjuqwdu></path></svg> </a>` : renderTemplate`<span class="pf-item__cta pf-item__cta--locked" data-astro-cid-hcjuqwdu> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-hcjuqwdu><rect x="3" y="11" width="18" height="11" rx="2" data-astro-cid-hcjuqwdu></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-astro-cid-hcjuqwdu></path></svg> <span data-astro-cid-hcjuqwdu>Projet confidentiel</span> </span>`} </div> </article>`)} </section> <!-- CTA --> <section class="pf-cta" data-astro-cid-hcjuqwdu> <div class="pf-cta__glow" data-astro-cid-hcjuqwdu></div> <div class="pf-cta__inner" data-astro-cid-hcjuqwdu> <span class="pf-cta__label" data-astro-cid-hcjuqwdu>Votre projet</span> <h2 class="pf-cta__title" data-astro-cid-hcjuqwdu>Construisons ensemble<br data-astro-cid-hcjuqwdu>votre prochaine réussite</h2> <a href="/contact" class="pf-cta__btn" data-astro-cid-hcjuqwdu>Discutons de votre projet</a> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-hcjuqwdu": true })} ` })}  ${renderScript($$result, "/home/ubuntu/onenation_full/src/pages/portfolio.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/ubuntu/onenation_full/src/pages/portfolio.astro", void 0);

const $$file = "/home/ubuntu/onenation_full/src/pages/portfolio.astro";
const $$url = "/portfolio";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Portfolio,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
