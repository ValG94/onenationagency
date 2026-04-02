import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_CE79dq6h.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../chunks/Header_iJfZ_hVj.mjs';
/* empty css                                       */
export { renderers } from '../renderers.mjs';

const $$Temoignages = createComponent(($$result, $$props, $$slots) => {
  const testimonials = [
    {
      quote: "Merci \xE0 One Nation pour ce travail formidable et professionnel. Bien cordialement.",
      author: "Alexis Mohamed",
      position: "Homme politique",
      image: "/alexis assis.jpeg",
      link: "https://www.linkedin.com/in/alexis-mohamed-875b08179/?originalSubdomain=dj"
    },
    {
      quote: "L'\xE9quipe de One Nation a \xE9t\xE9 \xE0 l'\xE9coute de mes attentes et besoins et a partaitement men\xE9e la mission qui lui a \xE9t\xE9 confi\xE9e. Son expertise et sa cr\xE9ativit\xE9 ont permis de donner une nouvelle dimension \xE0 notre image de marque.",
      author: "Christelle Keutcha",
      position: "CEO, Studio C",
      image: "/christelleK.jpeg",
      link: "https://www.linkedin.com/in/christelle-keutcha-98742310b/overlay/photo/"
    },
    {
      quote: "L'\xE9quipe de One Nation a parfaitement compris les sp\xE9cificit\xE9s du march\xE9 camerounais et a su adapter sa strat\xE9gie en cons\xE9quence. Leur approche a consid\xE9rablement renforc\xE9 notre visibilit\xE9 et notre cr\xE9dibilit\xE9.",
      author: "William Fotchine",
      position: "CEO, Nomad\xE9o Africa",
      image: "/wfotchine.jpeg",
      link: "https://www.linkedin.com/in/william-fotchine/"
    },
    {
      quote: "One Nation a su nous accompagner dans notre transformation digitale avec une expertise remarquable. Leur \xE9quipe a fait preuve d'une grande \xE9coute et d'une r\xE9activit\xE9 exemplaire.",
      author: "Constantin Etot",
      position: "CEO, PaieCash",
      image: "/cetot.jpg",
      link: "https://www.linkedin.com/in/constantin-etot/?originalSubdomain=fr"
    }
    // {
    // 	quote: "La créativité et le professionnalisme de One Nation ont fait toute la différence dans notre stratégie de communication. Nous avons vu une augmentation significative de notre engagement sur les réseaux sociaux.",
    // 	author: "Thomas Mbarga",
    // 	position: "Fondateur, StartUp Innovante",
    // 	image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format",
    // 	link: "https://www.linkedin.com/in/thomas-mbarga/"
    // },
    // {
    // 	quote: "One Nation nous a aidés à naviguer efficacement dans un environnement médiatique complexe. Leur expertise en relations presse a été déterminante pour le succès de notre lancement.",
    // 	author: "Isabelle Ngo",
    // 	position: "Directrice Générale, Association Internationale",
    // 	image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format",
    // 	link: "https://www.linkedin.com/in/isabelle-ngo/"
    // }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "T\xE9moignages - One Nation", "data-astro-cid-gfpvhwhd": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-gfpvhwhd": true })} ${maybeRenderHead()}<main data-astro-cid-gfpvhwhd> <section class="testimonials" data-astro-cid-gfpvhwhd> <div class="container" data-astro-cid-gfpvhwhd> <h1 data-astro-cid-gfpvhwhd>Témoignages</h1> <p class="intro-text" data-astro-cid-gfpvhwhd>Découvrez ce que nos clients disent de notre collaboration et des résultats obtenus grâce à nos services de communication sur mesure.</p> <div class="testimonials-grid" data-astro-cid-gfpvhwhd> ${testimonials.map((testimonial) => renderTemplate`<div class="testimonial-card" data-astro-cid-gfpvhwhd> <div class="rating" data-astro-cid-gfpvhwhd> <span class="star" data-astro-cid-gfpvhwhd> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-gfpvhwhd> <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" data-astro-cid-gfpvhwhd></path> </svg> </span> <span class="star" data-astro-cid-gfpvhwhd> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-gfpvhwhd> <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" data-astro-cid-gfpvhwhd></path> </svg> </span> <span class="star" data-astro-cid-gfpvhwhd> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-gfpvhwhd> <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" data-astro-cid-gfpvhwhd></path> </svg> </span> <span class="star" data-astro-cid-gfpvhwhd> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-gfpvhwhd> <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" data-astro-cid-gfpvhwhd></path> </svg> </span> <span class="star" data-astro-cid-gfpvhwhd> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-gfpvhwhd> <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" data-astro-cid-gfpvhwhd></path> </svg> </span> </div> <p class="quote" data-astro-cid-gfpvhwhd>"${testimonial.quote}"</p> <div class="author-info" data-astro-cid-gfpvhwhd> <div class="author-image" data-astro-cid-gfpvhwhd> <img${addAttribute(testimonial.image, "src")}${addAttribute(testimonial.author, "alt")} loading="lazy" data-astro-cid-gfpvhwhd> </div> <div class="author-details" data-astro-cid-gfpvhwhd> <strong data-astro-cid-gfpvhwhd>${testimonial.author}</strong> <span data-astro-cid-gfpvhwhd>${testimonial.position}</span> <a${addAttribute(testimonial.link, "href")} target="_blank" rel="noopener noreferrer" class="linkedin-link" data-astro-cid-gfpvhwhd> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-gfpvhwhd> <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" data-astro-cid-gfpvhwhd></path> </svg>
Profil LinkedIn
</a> </div> </div> </div>`)} </div> <div class="cta-section" data-astro-cid-gfpvhwhd> <h2 data-astro-cid-gfpvhwhd>Rejoignez nos clients satisfaits</h2> <p data-astro-cid-gfpvhwhd>Prêt à transformer votre communication et à obtenir des résultats exceptionnels ? Contactez-nous dès aujourd'hui pour discuter de votre projet.</p> <a href="/contact" class="cta-button" data-astro-cid-gfpvhwhd>Demander un devis</a> </div> </div> </section> </main> ` })} `;
}, "/home/ubuntu/onenation_full/src/pages/temoignages.astro", void 0);

const $$file = "/home/ubuntu/onenation_full/src/pages/temoignages.astro";
const $$url = "/temoignages";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Temoignages,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
