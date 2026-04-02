import { e as createComponent, m as maybeRenderHead, l as renderScript, r as renderTemplate, k as renderComponent, n as renderSlot, o as renderHead, g as addAttribute, h as createAstro } from './astro/server_CE79dq6h.mjs';
import 'piccolore';
import 'clsx';
/* empty css                           */

const $$AIAgent = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Agent IA conversationnel One Nation Agency — FR/EN --><!-- Composant flottant, intégré dans le Layout -->${maybeRenderHead()}<div id="ai-agent" class="ai-agent" aria-label="Assistant One Nation Agency" role="complementary" data-astro-cid-umhhjqzc> <!-- BOUTON FLOTTANT --> <button id="ai-agent-trigger" class="ai-trigger" aria-label="Ouvrir l'assistant IA" aria-expanded="false" data-astro-cid-umhhjqzc> <div class="ai-trigger-icon ai-trigger-icon--closed" data-astro-cid-umhhjqzc> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-umhhjqzc> <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" data-astro-cid-umhhjqzc></path> <circle cx="9" cy="14" r="1" fill="currentColor" data-astro-cid-umhhjqzc></circle> <circle cx="15" cy="14" r="1" fill="currentColor" data-astro-cid-umhhjqzc></circle> </svg> </div> <div class="ai-trigger-icon ai-trigger-icon--open" style="display:none" data-astro-cid-umhhjqzc> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-umhhjqzc> <path d="M18 6L6 18M6 6l12 12" data-astro-cid-umhhjqzc></path> </svg> </div> <div class="ai-trigger-pulse" aria-hidden="true" data-astro-cid-umhhjqzc></div> </button> <!-- FENÊTRE DU CHAT --> <div id="ai-agent-window" class="ai-window" role="dialog" aria-modal="true" aria-label="Assistant One Nation Agency" hidden data-astro-cid-umhhjqzc> <!-- HEADER --> <div class="ai-window-header" data-astro-cid-umhhjqzc> <div class="ai-agent-avatar" data-astro-cid-umhhjqzc> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-umhhjqzc> <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" data-astro-cid-umhhjqzc></path> <circle cx="9" cy="14" r="1" fill="currentColor" data-astro-cid-umhhjqzc></circle> <circle cx="15" cy="14" r="1" fill="currentColor" data-astro-cid-umhhjqzc></circle> </svg> </div> <div class="ai-agent-info" data-astro-cid-umhhjqzc> <span class="ai-agent-name" data-astro-cid-umhhjqzc>Assistant One Nation</span> <span class="ai-agent-status" data-astro-cid-umhhjqzc> <span class="ai-status-dot" aria-hidden="true" data-astro-cid-umhhjqzc></span>
En ligne
</span> </div> <div class="ai-header-actions" data-astro-cid-umhhjqzc> <button id="ai-lang-toggle" class="ai-lang-btn" aria-label="Changer de langue" title="Switch to English" data-astro-cid-umhhjqzc>EN</button> <button id="ai-close-btn" class="ai-close-btn" aria-label="Fermer l'assistant" data-astro-cid-umhhjqzc> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-umhhjqzc> <path d="M18 6L6 18M6 6l12 12" data-astro-cid-umhhjqzc></path> </svg> </button> </div> </div> <!-- MESSAGES --> <div id="ai-messages" class="ai-messages" role="log" aria-live="polite" aria-label="Conversation" data-astro-cid-umhhjqzc></div> <!-- SUGGESTIONS RAPIDES --> <div id="ai-suggestions" class="ai-suggestions" role="group" aria-label="Suggestions rapides" data-astro-cid-umhhjqzc></div> <!-- INPUT --> <div class="ai-input-wrap" data-astro-cid-umhhjqzc> <input type="text" id="ai-input" class="ai-input" placeholder="Posez votre question..." aria-label="Votre message" autocomplete="off" maxlength="500" data-astro-cid-umhhjqzc> <button id="ai-send" class="ai-send-btn" aria-label="Envoyer" data-astro-cid-umhhjqzc> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-umhhjqzc> <path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-umhhjqzc></path> </svg> </button> </div> <p class="ai-footer-note" data-astro-cid-umhhjqzc>One Nation Agency · <a href="/contact" data-astro-cid-umhhjqzc>Contact</a> · <a href="https://wa.me/33625523859" target="_blank" data-astro-cid-umhhjqzc>WhatsApp</a></p> </div> </div>  ${renderScript($$result, "/home/ubuntu/onenation_full/src/components/AIAgent.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/ubuntu/onenation_full/src/components/AIAgent.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "One Nation Agency \u2014 Communication strat\xE9gique institutionnelle, agents IA sur mesure et cr\xE9ation web premium.",
    lang = "fr",
    ogImage = "/logoOnenation.png",
    canonical = Astro2.url.pathname
  } = Astro2.props;
  const fullCanonicalUrl = `https://www.onenationagency.com${canonical}`;
  const isHomePage = Astro2.url.pathname === "/";
  return renderTemplate(_a || (_a = __template(["<html", '> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', '><meta name="robots" content="index, follow"><meta name="author" content="One Nation Agency"><link rel="canonical"', '><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:url"', '><meta property="og:site_name" content="One Nation Agency"><meta property="og:locale"', '><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Favicons --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="icon" href="/favicon.ico"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#0A0A0A"><!-- Google Fonts Premium --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"><title>', `</title><!-- Schema.org --><script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "One Nation Agency",
      "url": "https://www.onenationagency.com",
      "logo": "https://www.onenationagency.com/logoOnenation.png",
      "description": "Agence premium sp\xE9cialis\xE9e en communication strat\xE9gique institutionnelle, cr\xE9ation d'agents IA et cr\xE9ation web haut de gamme.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3 rue de Suresnes",
        "addressLocality": "Paris",
        "postalCode": "75008",
        "addressCountry": "FR"
      },
      "telephone": "+33625523859",
      "email": "contact@onenationagency.com",
      "priceRange": "\u20AC\u20AC\u20AC"
    }
  <\/script>`, '</head> <body> <a href="#main-content" class="skip-to-content">Aller au contenu principal</a> ', " ", " ", "  <!-- Intersection Observer global pour animations reveal --> ", " </body> </html>"])), addAttribute(lang, "lang"), addAttribute(description, "content"), addAttribute(fullCanonicalUrl, "href"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(fullCanonicalUrl, "content"), addAttribute(lang === "fr" ? "fr_FR" : "en_US", "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), title, renderHead(), renderSlot($$result, $$slots["default"]), renderComponent($$result, "AIAgent", $$AIAgent, {}), !isHomePage && renderTemplate`<a href="https://wa.me/33625523859" class="whatsapp-btn" target="_blank" rel="noopener noreferrer" aria-label="Nous contacter sur WhatsApp"> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor"> <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"></path> </svg> </a>`, renderScript($$result, "/home/ubuntu/onenation_full/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "/home/ubuntu/onenation_full/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const { lang = "fr" } = Astro2.props;
  const navFR = [
    { label: "L'Agence", href: "/vision" },
    { label: "Expertises", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Intelligence IA", href: "/intelligence-artificielle" },
    { label: "Contact", href: "/contact" }
  ];
  const navEN = [
    { label: "Agency", href: "/en/vision" },
    { label: "Expertise", href: "/en/services" },
    { label: "Portfolio", href: "/en/portfolio" },
    { label: "AI Intelligence", href: "/en/artificial-intelligence" },
    { label: "Contact", href: "/en/contact" }
  ];
  const nav = lang === "en" ? navEN : navFR;
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<header class="site-header" id="site-header" data-astro-cid-3ef6ksr2> <div class="header-inner container" data-astro-cid-3ef6ksr2> <!-- Logo --> <a${addAttribute(lang === "en" ? "/en" : "/", "href")} class="logo" aria-label="One Nation Agency — Accueil" data-astro-cid-3ef6ksr2> <img src="/logoOnenation.png" alt="One Nation Agency" width="140" height="40" data-astro-cid-3ef6ksr2> </a> <!-- Navigation desktop --> <nav class="nav-desktop" aria-label="Navigation principale" data-astro-cid-3ef6ksr2> <ul data-astro-cid-3ef6ksr2> ${nav.map((item) => renderTemplate`<li data-astro-cid-3ef6ksr2> <a${addAttribute(item.href, "href")}${addAttribute(currentPath === item.href || currentPath.startsWith(item.href + "/") ? "active" : "", "class")} data-astro-cid-3ef6ksr2> ${item.label} </a> </li>`)} </ul> </nav> <!-- Actions droite --> <div class="header-actions" data-astro-cid-3ef6ksr2> <!-- Sélecteur de langue --> <div class="lang-switcher" aria-label="Changer de langue" data-astro-cid-3ef6ksr2> <a${addAttribute(lang === "en" ? currentPath.replace("/en", "") || "/" : "/en", "href")} class="lang-btn" data-astro-cid-3ef6ksr2> ${lang === "en" ? "FR" : "EN"} </a> </div> <!-- CTA --> <a${addAttribute(lang === "en" ? "/en/contact" : "/contact", "href")} class="header-cta btn-gold" data-astro-cid-3ef6ksr2> ${lang === "en" ? "Get in touch" : "Nous contacter"} </a> <!-- Burger mobile --> <button class="burger" id="burger-btn" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-menu" data-astro-cid-3ef6ksr2> <span data-astro-cid-3ef6ksr2></span> <span data-astro-cid-3ef6ksr2></span> <span data-astro-cid-3ef6ksr2></span> </button> </div> </div> <!-- Menu mobile --> <div class="mobile-menu" id="mobile-menu" role="dialog" aria-label="Menu mobile" data-astro-cid-3ef6ksr2> <nav aria-label="Navigation mobile" data-astro-cid-3ef6ksr2> <ul data-astro-cid-3ef6ksr2> ${nav.map((item) => renderTemplate`<li data-astro-cid-3ef6ksr2> <a${addAttribute(item.href, "href")}${addAttribute(currentPath === item.href ? "active" : "", "class")} data-astro-cid-3ef6ksr2> ${item.label} </a> </li>`)} <li class="mobile-lang" data-astro-cid-3ef6ksr2> <a${addAttribute(lang === "en" ? currentPath.replace("/en", "") || "/" : "/en", "href")} data-astro-cid-3ef6ksr2> ${lang === "en" ? "\u{1F1EB}\u{1F1F7} Fran\xE7ais" : "\u{1F1EC}\u{1F1E7} English"} </a> </li> <li data-astro-cid-3ef6ksr2> <a${addAttribute(lang === "en" ? "/en/contact" : "/contact", "href")} class="btn-gold mobile-cta" data-astro-cid-3ef6ksr2> ${lang === "en" ? "Get in touch" : "Nous contacter"} </a> </li> </ul> </nav> </div> </header>  ${renderScript($$result, "/home/ubuntu/onenation_full/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/ubuntu/onenation_full/src/components/Header.astro", void 0);

export { $$Layout as $, $$Header as a };
