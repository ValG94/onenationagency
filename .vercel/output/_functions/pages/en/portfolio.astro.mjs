import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_CE79dq6h.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../../chunks/Header_iJfZ_hVj.mjs';
import { $ as $$Footer } from '../../chunks/Footer_CH5Ge0p6.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$Portfolio = createComponent(($$result, $$props, $$slots) => {
  const projects = [
    {
      id: "01",
      mockup: "laptop",
      title: "Centrachat Africa",
      subtitle: "First pan-African purchasing centre",
      category: "Digital & Strategy",
      country: "CAMEROON",
      description: "Creation of the digital platform for the first pan-African purchasing centre based in Yaound\xE9. Bilingual site, online membership system, complete brand identity.",
      tags: ["Premium Web", "Strategy", "Branding"],
      image: "/homeCentrachat.webp",
      link: "https://www.centrachat.africa",
      color: "#1a3a5c"
    },
    {
      id: "02",
      mockup: "phone",
      title: "PaieCashPlay",
      subtitle: "Digital solutions for sports associations",
      category: "Fintech & Artificial Intelligence",
      country: "FRANCE / AFRICA",
      description: "Design and development of the PaieCashPlay digital ecosystem: digital payments, e-commerce, streaming, AI agent and digitalisation of sports clubs.",
      tags: ["Fintech", "AI Agent", "Mobile App"],
      image: "/homePaiecashplay.webp",
      link: "https://www.paiecashplay.com",
      color: "#1a1a2e"
    },
    {
      id: "03",
      mockup: "screen",
      title: "AFAC26 Conference",
      subtitle: "Trilingual site, AI agent & international payment",
      category: "Artificial Intelligence",
      country: "INTERNATIONAL",
      description: "Design and development of the official website for the African Football Agents Conference 2026. Trilingual platform (FR/EN/PT), integrated AI agent, international payment system and accreditation.",
      tags: ["AI Agent", "Trilingual Web", "Payment"],
      image: "/Afac26_home.jpg",
      link: "https://www.afaaconference.com/en",
      color: "#0d1b2a"
    },
    {
      id: "04",
      mockup: "laptop",
      title: "Alexis Mohamed \u2014 Djibouti",
      subtitle: "2026 Presidential campaign",
      category: "360\xB0 Communication",
      country: "DJIBOUTI",
      description: "Complete communication strategy for the 2026 presidential campaign of Alexis Mohamed. Visual identity, official website, social media management and press relations.",
      tags: ["Political Communication", "Web", "Social Media"],
      image: "/homeMohamed.jpg",
      link: "https://www.alexismohamed.dj",
      color: "#1c3a5e"
    },
    {
      id: "05",
      mockup: "screen",
      title: "Dr Serge Ghislain Djorie",
      subtitle: "2025 Presidential campaign \u2014 Central African Republic",
      category: "360\xB0 Communication",
      country: "CENTRAL AFRICAN REPUBLIC",
      description: "Communication direction for the 2025 presidential campaign in the Central African Republic. Digital strategy, official website, content production and media coordination.",
      tags: ["Political Communication", "Strategy", "Media"],
      image: "/homeDjorie.jpg",
      link: "https://www.djorie2025.cf",
      color: "#1a0a2e"
    },
    {
      id: "06",
      mockup: "laptop",
      title: "Nomad\xE9o Africa",
      subtitle: "E-commerce website redesign \u2014 office furniture",
      category: "Digital",
      country: "CAMEROON",
      description: "Complete redesign of the Nomad\xE9o Africa e-commerce site, leader in office furniture in Cameroon. Premium UX/UI, product catalogue, SEO and payment integration.",
      tags: ["E-commerce", "UX/UI", "SEO"],
      image: "/nomadeo africa home.jpg",
      link: "https://www.nomadeoafrica.com",
      color: "#1a2a1a"
    },
    {
      id: "07",
      mockup: "phone",
      title: "Coplacam",
      subtitle: "Institutional website redesign \u2014 Design & Build",
      category: "Digital",
      country: "CAMEROON",
      description: "Redesign of the institutional website for Coplacam Design & Build, a major player in bespoke interior design in Central Africa. Strengthened visual identity and premium user experience.",
      tags: ["Institutional Web", "Design", "Branding"],
      image: "/coplacam_home.png",
      link: "https://www.coplacam.com",
      color: "#2a1a0a"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Portfolio \u2014 One Nation Agency | Strategic & Digital Projects", "description": "Discover the strategic, digital and institutional projects carried out by One Nation Agency in Africa, Europe and the Middle East.", "data-astro-cid-pabps33g": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "lang": "en", "data-astro-cid-pabps33g": true })} ${maybeRenderHead()}<main id="main-content" data-astro-cid-pabps33g> <!-- Hero --> <section class="pf-hero" data-astro-cid-pabps33g> <div class="pf-hero__bg" data-astro-cid-pabps33g></div> <div class="pf-hero__content" data-astro-cid-pabps33g> <span class="pf-hero__label" data-astro-cid-pabps33g>Our Work</span> <h1 class="pf-hero__title" data-astro-cid-pabps33g>Portfolio</h1> <p class="pf-hero__sub" data-astro-cid-pabps33g>Strategic, digital and institutional projects with high added value</p> </div> <div class="pf-hero__stats" data-astro-cid-pabps33g> <div class="pf-hero__stat" data-astro-cid-pabps33g> <span class="pf-hero__stat-num" data-astro-cid-pabps33g>07</span> <span class="pf-hero__stat-label" data-astro-cid-pabps33g>Projects</span> </div> <div class="pf-hero__stat" data-astro-cid-pabps33g> <span class="pf-hero__stat-num" data-astro-cid-pabps33g>12+</span> <span class="pf-hero__stat-label" data-astro-cid-pabps33g>Countries</span> </div> <div class="pf-hero__stat" data-astro-cid-pabps33g> <span class="pf-hero__stat-num" data-astro-cid-pabps33g>3</span> <span class="pf-hero__stat-label" data-astro-cid-pabps33g>Expertises</span> </div> </div> </section> <!-- Projects --> <section class="pf-projects" data-astro-cid-pabps33g> ${projects.map((project, index) => renderTemplate`<article${addAttribute(`pf-item pf-item--${project.mockup} ${index % 2 !== 0 ? "pf-item--alt" : ""}`, "class")}${addAttribute(`--project-color: ${project.color};`, "style")}${addAttribute(index, "data-index")} data-astro-cid-pabps33g> <div class="pf-item__visual" data-astro-cid-pabps33g> <div class="pf-item__bg"${addAttribute(`background: ${project.color};`, "style")} data-astro-cid-pabps33g></div> ${project.mockup === "laptop" && renderTemplate`<div class="mockup mockup--laptop" data-astro-cid-pabps33g> <div class="mockup__laptop-body" data-astro-cid-pabps33g> <div class="mockup__laptop-screen" data-astro-cid-pabps33g> <div class="mockup__laptop-bar" data-astro-cid-pabps33g> <span class="mockup__dot mockup__dot--red" data-astro-cid-pabps33g></span> <span class="mockup__dot mockup__dot--yellow" data-astro-cid-pabps33g></span> <span class="mockup__dot mockup__dot--green" data-astro-cid-pabps33g></span> </div> <div class="mockup__screen-content" data-astro-cid-pabps33g> <img${addAttribute(project.image, "src")}${addAttribute(project.title, "alt")} class="mockup__img" loading="lazy" data-astro-cid-pabps33g> </div> </div> </div> <div class="mockup__laptop-base" data-astro-cid-pabps33g> <div class="mockup__laptop-hinge" data-astro-cid-pabps33g></div> </div> </div>`} ${project.mockup === "phone" && renderTemplate`<div class="mockup mockup--phone" data-astro-cid-pabps33g> <div class="mockup__phone-body" data-astro-cid-pabps33g> <div class="mockup__phone-notch" data-astro-cid-pabps33g></div> <div class="mockup__phone-screen" data-astro-cid-pabps33g> <img${addAttribute(project.image, "src")}${addAttribute(project.title, "alt")} class="mockup__img" loading="lazy" data-astro-cid-pabps33g> </div> <div class="mockup__phone-home" data-astro-cid-pabps33g></div> </div> </div>`} ${project.mockup === "screen" && renderTemplate`<div class="mockup mockup--screen" data-astro-cid-pabps33g> <div class="mockup__screen-frame" data-astro-cid-pabps33g> <div class="mockup__screen-bezel" data-astro-cid-pabps33g> <div class="mockup__screen-content" data-astro-cid-pabps33g> <img${addAttribute(project.image, "src")}${addAttribute(project.title, "alt")} class="mockup__img" loading="lazy" data-astro-cid-pabps33g> </div> </div> </div> <div class="mockup__screen-stand" data-astro-cid-pabps33g> <div class="mockup__screen-neck" data-astro-cid-pabps33g></div> <div class="mockup__screen-foot" data-astro-cid-pabps33g></div> </div> </div>`} <div class="pf-item__num-bg" data-astro-cid-pabps33g>${project.id}</div> </div> <div class="pf-item__info" data-astro-cid-pabps33g> <div class="pf-item__meta" data-astro-cid-pabps33g> <span class="pf-item__country" data-astro-cid-pabps33g>${project.country}</span> <span class="pf-item__sep" data-astro-cid-pabps33g>|</span> <span class="pf-item__category" data-astro-cid-pabps33g>${project.category}</span> </div> <div class="pf-item__num" data-astro-cid-pabps33g>${project.id}</div> <h2 class="pf-item__title" data-astro-cid-pabps33g>${project.title}</h2> <p class="pf-item__subtitle" data-astro-cid-pabps33g>${project.subtitle}</p> <p class="pf-item__desc" data-astro-cid-pabps33g>${project.description}</p> <div class="pf-item__tags" data-astro-cid-pabps33g> ${project.tags.map((tag) => renderTemplate`<span class="pf-item__tag" data-astro-cid-pabps33g>${tag}</span>`)} </div> ${project.link !== "#" ? renderTemplate`<a${addAttribute(project.link, "href")} target="_blank" rel="noopener noreferrer" class="pf-item__cta" data-astro-cid-pabps33g> <span data-astro-cid-pabps33g>View project</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-pabps33g><path d="M7 17L17 7M17 7H7M17 7v10" data-astro-cid-pabps33g></path></svg> </a>` : renderTemplate`<span class="pf-item__cta pf-item__cta--locked" data-astro-cid-pabps33g> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-pabps33g><rect x="3" y="11" width="18" height="11" rx="2" data-astro-cid-pabps33g></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-astro-cid-pabps33g></path></svg> <span data-astro-cid-pabps33g>Confidential project</span> </span>`} </div> </article>`)} </section> <!-- CTA --> <section class="pf-cta" data-astro-cid-pabps33g> <div class="pf-cta__glow" data-astro-cid-pabps33g></div> <div class="pf-cta__inner" data-astro-cid-pabps33g> <span class="pf-cta__label" data-astro-cid-pabps33g>Your project</span> <h2 class="pf-cta__title" data-astro-cid-pabps33g>Let's build your next<br data-astro-cid-pabps33g>success together</h2> <a href="/contact" class="pf-cta__btn" data-astro-cid-pabps33g>Discuss your project</a> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-pabps33g": true })} ` })}  ${renderScript($$result, "/home/ubuntu/onenation_full/src/pages/en/portfolio.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/ubuntu/onenation_full/src/pages/en/portfolio.astro", void 0);

const $$file = "/home/ubuntu/onenation_full/src/pages/en/portfolio.astro";
const $$url = "/en/portfolio";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Portfolio,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
