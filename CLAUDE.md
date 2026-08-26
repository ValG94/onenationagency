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

**Variables d'environnement sur Vercel**

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | Obligatoire. Sans elle le formulaire ne part pas. |
| `TURNSTILE_SECRET_KEY` | Vérification anti-robot côté serveur. Absente = vérification ignorée, le formulaire continue de marcher. |
| `PUBLIC_TURNSTILE_SITE_KEY` | Clé publique du widget, lue **au build**. Absente = widget non rendu. La changer impose un redéploiement. |

---

## 2. Architecture — où se trouve quoi

Sept sources de vérité uniques. **Ne jamais dupliquer ces données dans une page.**

| Fichier | Rôle |
|---|---|
| `src/data/projects.ts` | Les projets du portfolio, bilingues. Numéros et compteurs calculés. |
| `src/data/routes.ts` | Correspondance FR↔EN. Pilote le sélecteur de langue, le footer et les hreflang. |
| `src/data/stats.ts` | Chiffres clés. Projets et années dérivés, pas saisis. |
| `src/data/civic.ts` | Contenu One Nation Civic, FR et EN, plus l'URL et l'ancre. Alimente `CivicSection.astro` et le lien du menu. |
| `src/data/packages.ts` | Offres commerciales, FR et EN : les 3 packs, les 3 formules de maintenance, le case study et les CTA. Alimente `PackagesContent.astro` et le lien du menu. |
| `src/scripts/consent.ts` | Consentement cookies, partagé bannière ↔ agent IA. |
| `src/pages/sitemap.xml.ts` | Sitemap généré au build depuis les routes. |

### Gestes courants

**Ajouter un projet** → une entrée en tête de `projects.ts`, image dans `src/assets/`. Se répercute seul sur : portfolio FR et EN, numérotation, compteurs, 3 dernières réalisations des deux accueils.

**Traduire une page** → créer `src/pages/en/<slug>.astro`, puis ajouter la paire dans `routes.ts`. Le sélecteur de langue, le footer, les hreflang et le sitemap suivent.

**Ajouter une image** → dans `src/assets/` et via `<Image />` d'`astro:assets`. Exception : les fonds CSS `url()` restent dans `public/`, Astro ne sait pas les traiter.

---

## 3. État vérifié

<!-- AUTO:DEBUT -- ne pas éditer à la main, régénéré par scripts/project-status.mjs -->

_Dernière vérification : 2026-08-26 — régénéré par `pnpm run build`._

| Indicateur | Valeur |
|---|---|
| Pages générées | **40** (20 FR / 20 EN) |
| Liens internes cassés | ✅ 0 |
| Médias cassés | ✅ 0 |
| Balises hreflang | 120 |
| Pages sans alternative de langue | aucune |
| Agent IA aligné sur la langue | ✅ 40/40 |
| URLs dans le sitemap | 40 |
| Poids total `dist` | 18.90 Mo (dont 8.08 Mo de vidéo) |
| Variantes d'images générées | 147 |
| Dépendances | astro, resend, sharp |
| Gestionnaire de paquets | pnpm@10.34.5 |

**Chiffres affichés sur le site** — 8 Projets livrés · 7 Pays couverts · 3 Années d'expertise · 100% Clients satisfaits

**Pages les plus lourdes au premier rendu** — `/en/portfolio` 865 Ko · `/portfolio` 865 Ko · `/` 677 Ko

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

### Adresse légale — 04/08/2026
Statut auto-entrepreneur : l'adresse est désormais celle du domicile du dirigeant, **6 rue Jean Colly, 94140 Alfortville**. L'ancienne (3 rue de Suresnes, 75008 Paris) ne subsiste nulle part dans `dist/`.
- Modifiée dans : `Footer.astro`, `mentions-legales`, `politique-confidentialite`, `politique-cookies` et leurs 3 équivalents EN.
- `Layout.astro` : JSON-LD `PostalAddress` et balises `geo.region` (`FR-75` → `FR-94`) / `geo.placename`. Ces trois valeurs se propagent aux 38 pages — les toucher ensemble, sinon Google voit une adresse contradictoire entre le texte et les données structurées.
- Mentions légales FR et EN : ligne « Capital social : 1 000 € » supprimée (une entreprise individuelle n'en a pas), mention « Valéry Garrec, entrepreneur individuel (EI) » ajoutée sous la dénomination.
- CGV FR et EN, article 9 : juridiction compétente passée du tribunal de commerce de Paris à celui de **Créteil**, dont dépend le Val-de-Marne.

### One Nation Civic — 13/08/2026
Intégration d'ONC comme **solution propriétaire de l'agence**, sans refonte : ONA reste la marque principale.
- `src/data/civic.ts` + `CivicSection.astro` : une seule source, deux variantes (`full` sur les deux accueils, `compact` sur les deux pages IA). Modifier le texte ONC = éditer `civic.ts`, rien d'autre.
- Aperçu : **deux captures réelles d'ONC** (`src/assets/onc-home.jpg`, `onc-phone.png`), l'accueil et l'assistant mobile, en surimpression. Retouches faites à l'import, à ne pas refaire : 5 px de barre violette retirés en haut de l'accueil (couleur étrangère à la charte), et recadrage serré du mockup sur l'appareil pour réduire l'aplat bleu nuit. Les originaux sont dans `originals/onc/`, hors dépôt. Habillage (barre de navigateur, bordures, ombres) en CSS avec les tokens ONA.
- `/` passe de 500 à 677 Ko « au premier rendu » dans le tableau ci-dessus, mais les deux images sont en `loading="lazy"` et très bas de page : le script de mesure les compte, pas le navigateur.
- Menu : 6e entrée, dorée, pointant vers `/#one-nation-civic` (chemin absolu, donc valide depuis les 38 pages). **La bascule burger est passée de 900 à 1024 px** : à six entrées la nav desktop se cassait sur trois lignes vers 900 px.
- Les deux accueils sautent le splash quand l'URL porte une ancre, sinon le visiteur attendait 6 s puis atterrissait en haut de page.
- JSON-LD : ONC déclaré en `owns` → `SoftwareApplication` sur les 38 pages.
- Piège à ne pas réintroduire : `.civic-visual` doit rester en `flex-direction: column`. En ligne, un élément posé à côté de la capture s'étirait sur toute sa hauteur, élargissait la colonne de la grille et poussait le texte hors de l'écran sur tablette et mobile.
- 7 liens de `en/index.astro` pointaient vers les pages FR (`/services`, `/vision`, `/portfolio`, `/contact`, `/intelligence-artificielle`) : corrigés vers `/en/…`.

### Page Offres — 25/08/2026
Page commerciale `/offres` et `/en/packages` : 3 packs, maintenance, case study, ONC, CTA final.
- `src/data/packages.ts` + `PackagesContent.astro` : **un seul markup pour les deux langues**, les pages ne portent que les métadonnées. Aucune dérive FR/EN possible.
- **Règles commerciales inscrites dans le fichier de données**, à ne pas contourner : jamais de prix ferme, aucune promesse d'illimité, périmètre arrêté au devis. ESSENTIEL et BUSINESS annoncent « à partir de » ; **SIGNATURE affiche « Sur devis »**, avec le plancher de 3 900 € en retrait sous la mention — une plateforme métier ne se résume pas à un forfait.
- CTA des packs → `/contact?offre=essentiel|business|signature#contactForm`. Les pages contact lisent le paramètre, positionnent le sujet sur « web » et amorcent le message. **L'API n'a pas bougé** : `subject` y est du texte libre. Sans JS, le formulaire reste utilisable.
- Case study Island Living SXM : visuel, titre et pays viennent de `projects.ts` via `getProjects()`, déjà localisés et déjà en `ImageMetadata`. Seul l'angle commercial est dans `packages.ts`.
- `CivicSection` gagne une 3e variante, `feature`, pour le bloc institutionnel. Ses 4 bénéfices sont un sous-ensemble des 6 de `civic.ts` (`featureIndices`) : aucune copie ONC dupliquée.
- Nav à 7 entrées : **« Intelligence IA » et « One Nation Civic » sont abrégés en « IA » et « ONC » en desktop uniquement** (`shortLabel`), le menu mobile garde les libellés entiers et `aria-label` porte le nom complet. La bascule burger reste à 1024 px.
- Grille des offres : 3 colonnes au-dessus de 900 px, **une offre par ligne en dessous**. Une grille paire à trois cartes laissait une case vide béante à côté de la première.
- Cartes de hauteur égale (`align-items: stretch`) et **bouton toujours en dernier dans le pied de carte** : c'est ce qui aligne les trois CTA malgré des mentions de longueur inégale. Une mention insérée après le bouton casserait l'alignement.
- JSON-LD `Service` + `OfferCatalog` par page, avec `minPrice` et non `price` : les tarifs sont des planchers.

### Domaine One Nation Civic — 25/08/2026
`CIVIC_URL` passe de `onenationcivic.onrender.com` à **`onenationcivic.com`**. L'ancienne adresse répond encore mais n'est plus référencée nulle part.
- Le JSON-LD de `Layout.astro` portait l'URL **en dur** et échappait donc à `civic.ts` : le bloc entier est désormais construit dans le frontmatter (`orgJsonLd`) et rendu via `set:html`. Une seule source, plus de divergence possible entre le texte et les données structurées.

### Spam du formulaire — 26/08/2026
Des robots remplissaient le formulaire public : noms et messages en chaînes aléatoires. **Ni l'agent IA ni Google n'y étaient pour quoi que ce soit** — l'agent produit un mail au gabarit distinct (objet « 🤖 Visiteur sans demande formulée »), et Googlebot ne soumet pas de formulaire. Ne pas rouvrir cette piste.

Le honeypot et le contrôle d'origine ne filtrent que les robots naïfs : celui-ci exécutait du JS, posait un `Referer` valide, cochait le consentement et laissait le champ piège vide. Deux couches ajoutées :
- `api/_antispam.js` : **score sur le contenu**, pas de règle unique, seuil à 4. Chiffre dans un nom (+2 chacun), message d'un seul bloc sans espace (+3), pauvre en voyelles (+2), 3 liens ou plus (+2), soumission en moins de 3 s (+1). Le spam observé marque 10. Le préfixe `_` empêche Vercel d'exposer le fichier comme endpoint.
- **Cloudflare Turnstile**, sans cookie donc sans bandeau supplémentaire. Le code est en place mais **inerte tant que les deux variables ne sont pas posées** : c'est voulu, le formulaire ne devait pas casser en attendant.
- Un spam détecté reçoit **200 sans envoi** : lui signaler la détection lui apprendrait à la contourner.
- Effet de bord réglé : chaque spam déclenchait un accusé de réception vers l'adresse usurpée. Le domaine écrivait donc à des inconnus, ce qui abîme sa réputation d'envoi.

**Défaut trouvé en testant** : `resend.emails.send()` ne lève pas d'exception, il résout avec `{ data, error }`. Le `try/catch` ne se déclenchait jamais et un envoi échoué renvoyait « ✓ Message envoyé » au visiteur, message perdu sans trace. Les trois appels vérifient désormais `.error` — 502 si la notification échoue, log seul si c'est l'accusé de réception, la demande étant déjà arrivée.

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
| Tranché | **« Paris » comme positionnement** | `contact.astro`, `en/contact.astro` et `en/index.astro` affichent « Paris, France » et « Paris · Africa · International ». Volontairement conservé : c'est du discours commercial, pas l'adresse légale. Ne pas « corriger » au motif que cela diffère du footer. |
| À valider | **Franchise de TVA** | `cgv.astro` et `en/terms-and-conditions.astro` annoncent des tarifs « nets et HT ». En micro-entreprise sous franchise, la formule attendue est « TVA non applicable, article 293 B du CGI ». Dépend du régime réel, non modifié. |
| À valider | **Page dédiée One Nation Civic** | ONC vit dans une section d'accueil, un bandeau sur les pages IA et un bloc sur `/offres`. Une page `/one-nation-civic` + `/en/one-nation-civic` serait le prochain palier SEO : il suffirait d'y poser `<CivicSection />`, d'ajouter la paire dans `routes.ts` et de rebasculer le lien du menu. Non fait : hors demande. |
| À valider | **Bannière og:image de `/offres`** | Les deux pages retombent sur `og-image-v2.jpg`, la bannière générique. Une bannière dédiée servirait mieux le partage d'une page commerciale. |
| À valider | **Chiffre « 100% clients satisfaits »** | Repris de l'ancien code sans vérification. Modifiable dans `stats.ts`. |
| Ouvert | **Flèche retour en haut de page** | L'utilisateur signale une superposition avec le bouton WhatsApp, mais aucune flèche n'existe dans le code, même avant l'audit. Possiblement une extension navigateur. Capture nécessaire. |
| Moyen | **Activer Turnstile** | Le code est prêt. Créer un site sur dash.cloudflare.com/turnstile, puis poser `PUBLIC_TURNSTILE_SITE_KEY` et `TURNSTILE_SECRET_KEY` sur Vercel et redéployer. Tant que c'est absent, seuls les filtres de contenu protègent. |
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
