import { e as createComponent, m as maybeRenderHead, g as addAttribute, n as renderSlot, r as renderTemplate, h as createAstro } from './astro/server_CE79dq6h.mjs';
import 'piccolore';
import 'clsx';
/* empty css                           */

const $$Astro = createAstro();
const $$Section = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Section;
  const { id, title, class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")}${addAttribute(["section", className], "class:list")} data-astro-cid-sh445jdo> <div class="container" data-astro-cid-sh445jdo> <h2 data-astro-cid-sh445jdo>${title}</h2> ${renderSlot($$result, $$slots["default"])} </div> </section> `;
}, "/home/ubuntu/onenation_full/src/components/Section.astro", void 0);

export { $$Section as $ };
