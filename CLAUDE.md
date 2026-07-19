# One Nation Agency — fiche projet

Site vitrine bilingue de l'agence. **Ce fichier est la source de vérité sur l'état du projet** : le lire avant toute intervention, et le mettre à jour après.

---

## 1. Identité technique

| | |
|---|---|
| Stack | Astro 5, statique, sans framework UI |
| Langues | FR (défaut) et EN, parité complète |
| Hébergement | Vercel — production `www.onenationagency.com`, déploiement sur push `main` |
| Fonction serveur | `api/contact.js` (Vercel), envoi via Resend |
| Paquets | **pnpm** — un seul lockfile, `pnpm-lock.yaml` |
| Dépôt | https://github.com/ValG94/onenationagency |

```bash
pnpm install          # installer
pnpm run dev          # développer
pnpm run build        # construire + régénérer la section 3 de ce fichier
```

`RESEND_API_KEY` doit être définie sur Vercel pour que le formulaire fonctionne.

---

## 2. Architecture — où se trouve quoi

Cinq sources de vérité uniques. **Ne jamais dupliquer ces données dans une page.**

| Fichier | Rôle |
|---|---|
| `src/data/projects.ts` | Les projets du portfolio, bilingues. Numéros et compteurs calculés. |
| `src/data/routes.ts` | Correspondance FR↔EN. Pilote le sélecteur de langue, le footer et les hreflang. |
| `src/data/stats.ts` | Chiffres clés. Projets et années dérivés, pas saisis. |
| `src/scripts/consent.ts` | Consentement cookies, partagé bannière ↔ agent IA. |
| `src/pages/sitemap.xml.ts` | Sitemap généré au build depuis les routes. |

### Gestes courants

**Ajouter un projet** → une entrée en tête de `projects.ts`, image dans `src/assets/`. Se répercute seul sur : portfolio FR et EN, numérotation, compteurs, 3 dernières réalisations des deux accueils.

**Traduire une page** → créer `src/pages/en/<slug>.astro`, puis ajouter la paire dans `routes.ts`. Le sélecteur de langue, le footer, les hreflang et le sitemap suivent.

**Ajouter une image** → dans `src/assets/` et via `<Image />` d'`astro:assets`. Exception : les fonds CSS `url()` restent dans `public/`, Astro ne sait pas les traiter.

---

## 3. État vérifié

<!-- AUTO:DEBUT -- ne pas éditer à la main, régénéré par scripts/project-status.mjs -->

_Dernière vérification : 2026-07-19 — régénéré par `pnpm run build`._

| Indicateur | Valeur |
|---|---|
| Pages générées | **38** (19 FR / 19 EN) |
| Liens internes cassés | ✅ 0 |
| Médias cassés | ✅ 0 |
| Balises hreflang | 114 |
| Pages sans alternative de langue | aucune |
| Agent IA aligné sur la langue | ✅ 38/38 |
| URLs dans le sitemap | 38 |
| Poids total `dist` | 18.27 Mo (dont 8.08 Mo de vidéo) |
| Variantes d'images générées | 136 |
| Dépendances | astro, resend, sharp |
| Gestionnaire de paquets | pnpm@10.34.5 |

**Chiffres affichés sur le site** — 8 Projets livrés · 7 Pays couverts · 3 Années d'expertise · 100% Clients satisfaits

**Pages les plus lourdes au premier rendu** — `/en/portfolio` 865 Ko · `/portfolio` 865 Ko · `/` 500 Ko

<!-- AUTO:FIN -->

---

## 4. Ce qui a été corrigé

Audit complet mené le 19/07/2026, puis 10 commits. Repères pour ne pas rouvrir des sujets clos.

### Sécurité — `api/contact.js`
- **Relais d'e-mail ouvert fermé.** La branche `agent_notification` acceptait objet et corps arbitraires sans authentification : n'importe qui pouvait émettre depuis le domaine.
- Ajouts : contrôle d'origine, rate limiting par IP, honeypot, validation de format, échappement HTML de toutes les données visiteur.
- Le mail de confirmation n'écho plus le message du visiteur — il partait vers une adresse arbitraire et servait de relais de phishing.
- `src/pages/api/contact.ts`, doublon mort et non patché, supprimé.
- **Le formulaire EN simulait l'envoi** (`setTimeout` puis « ✓ Message sent! ») : tous les leads anglophones étaient perdus. Branché sur l'API.

### RGPD
- L'agent IA transmettait la conversation avec `rgpd: true` codé en dur, sans consentement. Conditionné au choix réel du visiteur.
- L'interrupteur « cookies analytiques » de la bannière était décoratif : il est respecté.
- Retrait du consentement possible depuis `/politique-cookies`.

### Performance
- Migration complète vers `astro:assets` : WebP, `srcset`, `width`/`height` générés (47 `<img>` n'avaient aucune dimension → CLS).
- Sources ré-encodées : 43,7 Mo → 5,0 Mo. `/portfolio` de ~17 Mo à 865 Ko.
- Vidéo du hero : 14,2 → 3,7 Mo (WebM VP9, audio retiré car muette), chargée après `window.load` derrière un poster, ignorée si `prefers-reduced-motion` ou économiseur de données.
- 31 images orphelines supprimées, originaux archivés dans `originals/` (hors dépôt).

### Données et i18n
- 4 sources de projets contradictoires fusionnées en une (`realisations.ts` supprimé).
- Liens 404 corrigés : `/en/agency`, `/en/ai`, `/politique-de-confidentialite`, `/privacy-policy`, image `wfotchine.jpg`.
- hreflang fantômes sur 13 pages supprimés ; sélecteur de langue qui renvoyait toujours à l'accueil corrigé.
- Compteurs incohérents unifiés (`vision.astro` affichait 5 puis animait vers 8).
- **13 pages traduites en anglais** : parité 19/19.
- Agent IA aligné sur la langue de la page (`currentLang` était figé à `'fr'`).

### Divers
- Skip-link : ancre ajoutée sur 5 pages, libellé traduit.
- `:root` des pages portfolio écrasait le design system globalement → variables scopées.
- 8 bannières og:image manquantes générées en 1200×630.
- Footer ajouté sur 13 pages qui étaient des culs-de-sac de maillage.
- 2 faux témoignages avec portraits Unsplash supprimés.
- Code mort : 5 composants, dossier `project/` imbriqué (101 fichiers), dépendances passées de 7 à 3.
- Bouton WhatsApp dupliqué sur `/en`.

---

## 5. Reste à faire

| Priorité | Sujet | Détail |
|---|---|---|
| À valider | **Slugs anglais** | `/en/seo`, `/en/digital-marketing`, `/en/terms-and-conditions`… choisis par défaut. Les changer coûte une ligne dans `routes.ts` + un renommage, tant que Google ne les a pas indexés. |
| À valider | **Chiffre « 100% clients satisfaits »** | Repris de l'ancien code sans vérification. Modifiable dans `stats.ts`. |
| Ouvert | **Flèche retour en haut de page** | L'utilisateur signale une superposition avec le bouton WhatsApp, mais aucune flèche n'existe dans le code, même avant l'audit. Possiblement une extension navigateur. Capture nécessaire. |
| Moyen | **Rate limiting en mémoire** | Réinitialisé à chaque cold start Vercel. Efficace contre un script isolé, pas contre un botnet. Upstash Redis pour une garantie stricte. |
| Moyen | **Google Fonts bloquant** | 2 familles × 9 graisses en `<link rel="stylesheet">` sans `preload`. Auto-hébergement à envisager. |
| Faible | **JSON-LD identique sur les 38 pages** | Pas de `BreadcrumbList`, pas de `WebSite`+`SearchAction`, pas de schéma `Service` par page. |
| Faible | **Menu mobile** | `role="dialog"` sans focus trap ni `inert` sur l'arrière-plan. |
| Faible | **`aria-label` du burger** | Figé à « Ouvrir le menu », jamais mis à jour en « Fermer ». |

---

## 6. Pièges connus

- **OneDrive** — le dépôt est dans un dossier synchronisé. Les traitements de masse (images, `node_modules`) échouent en `EBUSY`/`Permission denied`. Demander la mise en pause de la synchro **avant**, pas après.
- **Previews Vercel** — l'utilisateur teste souvent sur `onenationagency-<hash>-…vercel.app`, figée sur son commit. Devant un bug « qui persiste » après correction, lire d'abord l'URL de sa capture.
- **Fins de ligne** — les fichiers historiques sont en CRLF, les nouveaux en LF. Comparer en normalisant avant de conclure à une modification.
- **Styles Astro scopés** — un `<style>` de page ne s'applique pas au markup d'un composant. Déplacer un markup vers un composant impose de déplacer son CSS avec.
- **Tirets cadratins** — le site n'en utilise plus dans le texte visible. Espace dans le texte courant, trait d'union dans les titres, « à »/« to » dans les plages.
- **`pnpm` uniquement** — ne pas lancer `npm install`, cela recréerait un `package-lock.json` concurrent et casserait le build Vercel.

---

## 7. Tenir cette fiche à jour

- **Section 3** : automatique, régénérée par `pnpm run build`. Ne pas l'éditer.
- **Sections 4 et 5** : à la main, à chaque intervention. Déplacer ce qui est fait de la section 5 vers la section 4, ajouter ce qui est découvert.

Pour l'assistant : lire ce fichier en début de session et repartir de la section 5 plutôt que de relire le dépôt. Après toute modification, mettre à jour les sections 4 et 5 dans le même commit que le code.
