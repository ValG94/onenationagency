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
| Emplacement local | `C:\dev\ONA\ona` — **hors OneDrive** depuis le 03/10/2026 |

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

Huit sources de vérité uniques. **Ne jamais dupliquer ces données dans une page.**

| Fichier | Rôle |
|---|---|
| `src/data/projects.ts` | Les projets du portfolio, bilingues. Numéros et compteurs calculés. |
| `src/data/routes.ts` | Correspondance FR↔EN, avec libellé et rubrique de chaque page. Pilote le sélecteur de langue, le footer, les hreflang et le plan du site. |
| `src/data/stats.ts` | Chiffres clés. Projets et années dérivés, pas saisis. |
| `src/data/civic.ts` | Contenu One Nation Civic, FR et EN, plus l'URL et l'ancre. Alimente `CivicSection.astro` et le lien du menu. |
| `src/data/testimonials.ts` | Avis clients, FR et EN, plus les URL Google. Alimente la section d'accueil et les avis intégraux du portfolio. |
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

_Dernière vérification : 2026-10-22 — régénéré par `pnpm run build`._

| Indicateur | Valeur |
|---|---|
| Pages générées | **24** (12 FR / 12 EN) |
| Liens internes cassés | ✅ 0 |
| Médias cassés | ✅ 0 |
| Balises hreflang | 72 |
| Pages sans alternative de langue | aucune |
| Agent IA aligné sur la langue | ✅ 24/24 |
| URLs dans le sitemap | 24 |
| Poids total `dist` | 20.26 Mo (dont 8.08 Mo de vidéo) |
| Variantes d'images générées | 90 |
| Dépendances | astro, resend, sharp |
| Gestionnaire de paquets | pnpm@10.34.5 |

**Chiffres affichés sur le site** — 10 Projets livrés · 7 Pays couverts · 3 Années d'expertise · 100% Clients satisfaits

**Pages les plus lourdes au premier rendu** — `/en/portfolio` 1052 Ko · `/portfolio` 1052 Ko · `/` 804 Ko

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
- **Règles commerciales inscrites dans le fichier de données**, à ne pas contourner : jamais de prix ferme (**sauf le Diagnostic depuis le 15/10, voir « Formats pour site existant »**), aucune promesse d'illimité, périmètre arrêté au devis. ESSENTIEL et BUSINESS annoncent « à partir de » ; **SIGNATURE affiche « Sur devis »**, avec le plancher de 3 900 € en retrait sous la mention — une plateforme métier ne se résume pas à un forfait.
- CTA des packs → `/contact?offre=essentiel|business|signature#contactForm` (plus `diagnostic`, `sprint`, `care` depuis le 15/10). Les pages contact lisent le paramètre, positionnent le sujet sur « web » et amorcent le message. **L'API n'a pas bougé** : `subject` y est du texte libre. Sans JS, le formulaire reste utilisable.
- Case study Island Living SXM : visuel, titre et pays viennent de `projects.ts` via `getProjects()`, déjà localisés et déjà en `ImageMetadata`. Seul l'angle commercial est dans `packages.ts`.
- `CivicSection` gagne une 3e variante, `feature`, pour le bloc institutionnel. Ses 4 bénéfices sont un sous-ensemble des 6 de `civic.ts` (`featureIndices`) : aucune copie ONC dupliquée.
- Nav à 7 entrées : **« Intelligence IA » et « One Nation Civic » sont abrégés en « IA » et « ONC » en desktop uniquement** (`shortLabel`), le menu mobile garde les libellés entiers et `aria-label` porte le nom complet. La bascule burger reste à 1024 px.
- Grille des offres : 3 colonnes au-dessus de 900 px, **une offre par ligne en dessous**. Une grille paire à trois cartes laissait une case vide béante à côté de la première.
- Cartes de hauteur égale (`align-items: stretch`) et **bouton toujours en dernier dans le pied de carte** : c'est ce qui aligne les trois CTA malgré des mentions de longueur inégale. Une mention insérée après le bouton casserait l'alignement.
- JSON-LD `Service` + `OfferCatalog` par page, avec `minPrice` et non `price` : les tarifs sont des planchers. (Généré par `getOffersJsonLd()` depuis le 15/10.)

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

### Formulaire de contact, lisibilité des erreurs — 26/08/2026
Turnstile activé en production, un envoi renvoyait 400 sans que le visiteur comprenne pourquoi. Deux causes, aucune liée à l'anti-spam :
- Le formulaire est en `novalidate` : un champ obligatoire vide partait jusqu'au serveur et revenait avec « Champs obligatoires manquants » glissé dans le **libellé du bouton**, sans dire lequel. Validation client ajoutée : champ fautif mis en rouge, focus, défilement, et message dans une zone `.form-error` dédiée.
- Le lien « Politique de confidentialité » est **à l'intérieur du `<label>`** de la case à cocher. Le cliquer quittait la page et vidait la saisie, ce qui se vit facilement comme « la case ne se coche plus ». Il s'ouvre désormais dans un nouvel onglet.

**La case elle-même n'a jamais été en cause** — vérifié au clic en navigateur : elle bascule normalement. Ne pas rouvrir cette piste.

Défaut préexistant corrigé au passage : la garde du formulaire **EN** ne stylait que `.checkbox-box`, un élément absent de ce markup. Cliquer sur « Send message » sans cocher ne produisait donc **aucun retour visuel**, le formulaire semblait mort.

Case à cocher redessinée (`appearance: none` + coche en `clip-path`). **Ne pas revenir à `accent-color`** : le navigateur choisit alors seul la couleur de la coche et, sur un fond doré clair, Chrome la rend noire, donc invisible sur la charte. La coche est désormais dorée sur fond sombre, comme tous les ✓ du site.

`data-refresh-expired="auto"` posé sur le widget : un jeton Turnstile vaut environ 5 minutes, un visiteur lent se voyait sinon refuser à l'envoi.

### Banc d'essai du widget ONC — 30/08/2026
`Layout.astro` porte le script d'embarquement One Nation Civic (`embed.js`, instance « tanzanie »), **gardé par `import.meta.env.DEV`**. Il fonctionne sous `pnpm run dev` et **disparaît du build** : vérifié, 0 occurrence sur les 40 pages de production.

**Ne jamais lever cette garde durablement.** L'instance appartient à un client : afficher son agent sur le site de l'agence pose un problème déontologique, et le site a déjà son propre agent IA. Il a été poussé en production deux fois, de nuit et hors trafic, uniquement pour la mise au point ; les deux fois ont été suivies d'un retrait immédiat.

**Prérequis côté ONC, découvert à cette occasion** : le domaine qui embarque le widget doit être déclaré dans les domaines autorisés de l'instance. Sans cela `/embed/widget` renvoie `X-Frame-Options: SAMEORIGIN`, le navigateur refuse l'iframe et n'affiche qu'un carré gris. Le diagnostic tient en une commande :

```bash
curl -sI "https://onenationcivic.com/embed/widget?inst=<inst>" | grep -i x-frame
```

Une réponse vide = embarquement tiers autorisé. **Piège de lecture** : la console Chrome nomme l'origine (`https://onenationcivic.com/`) et non l'URL refusée, ce qui fait croire à tort que la racine est mise en iframe. Compter les iframes du DOM plutôt que de se fier à ce message.

### Témoignages clients — 06/09/2026
Avis Google intégrés comme preuve sociale, entre le portfolio et One Nation Civic sur les deux accueils.
- `src/data/testimonials.ts` : source unique. Les composants n'écrivent aucun texte d'avis. Les sélecteurs (`getFeaturedTestimonials`, `getTestimonialForProject`, `getInstitutionalTestimonials`) forment le contrat avec l'interface : une future administration remplacera le tableau sans toucher aux composants.
- Trois composants dans `src/components/testimonials/` : `TestimonialsSection` (accueil, `shortReview`), `ProjectTestimonial` (portfolio, `fullReview`), `TestimonialCard` et `Stars` réutilisables.
- **Accueil : extraits courts uniquement.** L'avis intégral n'existe que sur `/portfolio`. Vérifié : 3 cartes par accueil, aucun texte long.
- Le portfolio a gagné une **ancre `id` par projet**, ce dont dépendent les CTA des cartes (`/portfolio#island-living-sxm`). L'avis de Constantin Etot s'affiche sur ses deux projets, PaieCashFan et PaieCashCoin.
- **Alexis Mohamed n'est pas client One Nation Civic.** Son avis porte `institutional: true` parce qu'il mentionne les chancelleries, ce qui permettra de le reprendre dans un contexte ONC sous une formule du type « Un regard sur notre approche institutionnelle ». Ne jamais écrire « Client ONC » ni « Utilisateur ONC » : l'avertissement est répété dans le fichier de données.
- `GOOGLE_REVIEW_URL` sert à **déposer** un avis. `GOOGLE_BUSINESS_URL` sert à les **lister** : tant qu'elle vaut `null`, le lien « Voir tous les avis » n'est pas rendu. Ne pas utiliser l'une pour l'autre.
- **Portraits clients** dans `src/assets/avis-<id>.png`, rattachés par le champ `avatar` et résolus comme les visuels de `projects.ts`. Sans photo, la pastille retombe sur les initiales : **ne jamais générer de portrait de synthèse**. Les sources font 68 px pour un affichage à 42 px, soit 1,6x — des photos plus grandes seraient plus nettes sur écran Retina.
- **Chaque avis s'affiche dans la langue où il a été écrit**, quelle que soit la langue de la page : `originalLang` la désigne, et la variante dans l'autre langue est présentée comme une traduction, jamais à la place de la citation. Les trois avis ont été rédigés en français. Sur la carte, la traduction suit en retrait ; en étude de cas, elle est repliée dans un `<details>` natif pour ne pas doubler six paragraphes.
- Grille 3 colonnes jusqu'à 3 avis, bascule automatique en défilement horizontal au-delà (`tm-grid--scroll`). Sous 760 px, une carte par écran en `scroll-snap`. **Aucune dépendance ajoutée.**
- **Piège rencontré, déjà connu du projet** : les règles `.tm-grid > *` de la section ne touchaient pas les cartes, qui appartiennent au scope de `TestimonialCard`. Résultat, des cartes à 90 px sur mobile. Les sélecteurs visant les cartes passent donc par `:global()`.

### Ancienne page témoignages retirée — 06/09/2026
`/temoignages` et `/en/testimonials` n'étaient plus liées depuis la navigation, mais restaient **construites et présentes dans le sitemap** : Google pouvait donc les indexer. Elles affichaient 4 avis en dur, dont d'autres citations d'Alexis Mohamed et de Constantin Etot que les avis Google de l'accueil — deux propos différents des mêmes personnes.
- Les deux fichiers sont déplacés dans **`src/_archive/`**, hors de `src/pages/`. Astro ne construit que `src/pages/`, et `sitemap.xml.ts` y découvre les pages par glob : sortir les fichiers les retire du routage **et** du sitemap d'un seul geste.
- **Un préfixe `_` n'aurait pas suffi** : le glob du sitemap ne filtre que `/404`, la page serait restée listée en 404. Ne pas « simplifier » en renommant.
- Paire retirée de `routes.ts`, sinon le sitemap émettait des `hreflang` vers des URL mortes. Le site repasse de 40 à 38 pages, parité 19/19.
- La marche à suivre pour les remettre en service est dans `src/_archive/README.md`.

### Repli sans JavaScript — 06/09/2026
`.site-wrapper` et `.reveal` partent à `opacity: 0` et ne sont révélés que par script. **Sans JavaScript, tout le site restait invisible** alors que le contenu est bien dans le HTML. Un bloc `<noscript>` dans `Layout.astro` rétablit la visibilité et masque le splash, sur les 38 pages. Il est inerte dès que le script s'exécute : l'animation est inchangée.

Vérifié à cette occasion sur la production, sans exécuter de JavaScript : la section témoignages, les trois avis, les noms et les notes sont **tous présents dans le HTML brut**. Même réponse octet pour octet avec l'agent Googlebot, `robots.txt` autorise tout hors `/api/`, aucune balise `noindex`, accueil présent au sitemap.

**Ne pas ajouter de balisage `Review` ou `AggregateRating`** pour ces avis : Google n'affiche pas d'extrait enrichi pour les avis qu'un site publie sur lui-même (*self-serving reviews*), et le baliser expose à un avertissement dans la Search Console. Les étoiles dans les résultats viennent de la fiche Google Business, pas du site.

### Mentions légales refondues — 29/09/2026
Texte fourni par l'utilisateur, appliqué en FR et **répercuté en EN** : la version anglaise annonçait encore IONOS comme hébergeur, ce qui était faux sur une page légale.
- **L'hébergeur est Vercel**, pas IONOS. IONOS n'apparaît plus que comme **registrar du nom de domaine**, dans une section distincte. Ne pas réintroduire l'ancienne formulation.
- 8 sections dans les deux langues : éditeur, hébergement, nom de domaine, propriété intellectuelle, données personnelles (avec responsable du traitement), cookies et traceurs, liens hypertextes, droit applicable.
- Coordonnées ajoutées à l'éditeur : SIRET au format lisible, téléphone et e-mail cliquables.
- Liens posés vers `vercel.com`, `ionos.fr`, la CNIL et la page cookies interne, plutôt que des mentions inertes.
- Classes et styles d'origine conservés ; deux ajouts seulement, un filet doré sur les blocs d'adresse (`.legal-block`) et un palier à 480 px, la carte n'ayant plus que des marges sur petit écran.

### Audit juridique et RGPD — 29/09/2026
Mené avant dépôt du dossier Activateur France Num. **Constat central, mesuré et non déduit : le site ne dépose aucun cookie.** Base de cookies vide après chargement de `/contact` en production dans un navigateur neuf, aucun `Set-Cookie` serveur, aucun sur le script Turnstile.

**Inventaire réel des tiers** (⚠ incomplet jusqu'au 20/10 : une image Unsplash chargée par le CSS de deux pages lui avait échappé, voir « Contrastes sur photo… » ; corrigé, l'inventaire ci-dessous est désormais exact) — après auto-hébergement des polices, **une seule ressource externe subsiste** : **Cloudflare Turnstile** (`challenges.cloudflare.com`), sur la page contact uniquement, sans cookie, exempté au titre de la sécurité. Aucun Google Analytics, Tag Manager, Matomo, Meta Pixel, LinkedIn Insight, Hotjar, Vercel Analytics, YouTube, Maps ni Calendly. Les liens sociaux sont de simples `<a href>`. **Ne pas repartir de zéro sur cet inventaire : il est à jour.**

Corrections apportées :
- **Politique de confidentialité entièrement réécrite**, FR et EN. L'ancienne était un modèle générique où manquait *tout* l'article 13 : responsable du traitement, base légale, destinataires, sous-traitants, transferts hors UE, durées de conservation, CNIL. Elle décrit désormais les **trois traitements réels** vérifiés dans le code : formulaire, assistant IA, sécurité du formulaire. Les sous-traitants sont nommés : Vercel, Resend, Cloudflare. **Google n'y figure plus** depuis l'auto-hébergement des polices le 29/09 : il n'est plus sous-traitant et ne reçoit plus aucune adresse IP. Ne pas l'y réintroduire.
- **La bannière annonçait une mesure d'audience inexistante** (« cookies d'analyse d'audience anonymisée »). Elle recueillait donc un consentement pour une finalité fictive. Le consentement optionnel commande en réalité **une seule chose** : l'envoi par e-mail du compte rendu des conversations avec l'assistant (`hasAnalyticsConsent()` dans `AIAgent.astro`). Texte aligné sur cette réalité.
- **Les pages cookies annonçaient des cookies de performance, de fonctionnalité, de ciblage et publicitaires tiers** — aucun n'existe. Réécrites FR et EN. Le bouton `data-cookie-settings` de retrait du consentement est conservé tel quel, c'est un mécanisme fonctionnel.
- **Bug corrigé** : la bannière anglaise renvoyait vers `/politique-confidentialite`, la page française.
- **Boutons de consentement équilibrés** : « Refuser » avait une bordure grise et une graisse moindre face à un « Accepter » doré. Même taille, même graisse, bordure dorée des deux côtés — la CNIL exige que refuser soit aussi simple qu'accepter.
- Mention RGPD au point de collecte sous les deux formulaires, avec durée de conservation et lien vers la politique.
- Footer : « Cookies » devient **« Gérer mes cookies »**, lien permanent sur les 38 pages.
- **Fuite corrigée** : un commentaire HTML exposait le nom d'instance d'un client (« tanzanie ») dans le code source des 38 pages. Les commentaires `<!-- -->` sont servis au navigateur ; le bloc vit désormais dans le frontmatter. **Ne jamais documenter en commentaire HTML.**

**Durées de conservation retenues** : trois ans à compter du dernier contact pour les demandes et les comptes rendus, conformément à la recommandation CNIL sur la prospection. À ajuster si la pratique réelle diffère.

**L'URL reste `/politique-confidentialite`**, pas `/politique-de-confidentialite` : c'est celle qui est indexée et référencée partout, et un 404 sur cette variante avait déjà été corrigé par le passé.

### Polices auto-hébergées — 29/09/2026
Dernier écart de l'audit RGPD refermé. **Ne jamais revenir au CDN Google** : il transmet l'adresse IP de chaque visiteur à Google aux États-Unis avant tout consentement, ce que la CNIL déconseille et qu'un tribunal allemand a sanctionné en 2022.
- Les `<link>` vers `fonts.googleapis.com` et `fonts.gstatic.com` ont disparu. Vérifié : **0 occurrence** dans les 38 pages construites.
- **Versions variables** plutôt que statiques : un seul fichier par famille et par sous-ensemble couvre toutes les graisses de 300 à 900, au lieu des 11 fichiers qu'auraient exigés les 7 graisses de Montserrat et les 4 d'Inter.
- **Seuls latin et latin-ext** sont embarqués. Google en propose 6 par famille — cyrillique, grec, vietnamien — inutiles sur un site FR/EN. Les fichiers vivent dans `public/fonts/` : Astro ne traite pas les `url()` des feuilles de style.
- 244 Ko au total, mais `unicode-range` fait que la plupart des visiteurs ne chargent que le latin, soit **84 Ko**. Les deux fichiers latins sont en `preload`, ce qui règle au passage le caractère bloquant signalé de longue date.
- Les déclarations `@font-face` sont en tête du `<style is:global>` de `Layout.astro`. Le fichier `src/styles/fonts-generated.css` conserve la version produite, pour pouvoir la régénérer.
- Rendu vérifié : `document.fonts` confirme Montserrat 300-900 et Inter 300-600 chargés, les titres en Montserrat, le texte courant en Inter, largeurs de rendu inchangées.

### Turnstile confirmé actif — 03/10/2026
Les deux variables sont bien posées sur Vercel, **vérifié en production** et non déduit :
- `PUBLIC_TURNSTILE_SITE_KEY` — le widget est rendu sur `/contact`, `data-sitekey` présent et `challenges.cloudflare.com` appelé.
- `TURNSTILE_SECRET_KEY` — un POST sur `/api/contact` avec un jeton invalide répond **400 « Vérification anti-robot échouée »**. Si le secret était absent, `verifieTurnstile()` renverrait `actif: false` et la demande passerait.

La protection ne repose donc plus sur les seuls filtres de contenu : le défi Cloudflare s'applique vraiment. **Ne pas rouvrir « activer Turnstile ».**

Pour refaire ce test sans polluer la boîte mail : donner aux deux noms une forme qui marque 4 au score anti-spam, un chiffre dans chaque nom valant +2. Secret absent → 200 sans envoi ; secret présent → 400. Les deux réponses se distinguent et aucun e-mail ne part dans l'un ou l'autre cas.

### Déplacement du dépôt hors OneDrive — 03/10/2026
Le projet vit désormais dans **`C:\dev\ONA\ona`**. L'ancien dossier (`OneDrive/Documents/ONE NATION/onenationagency.com/project`) a été vérifié puis peut être supprimé. **Le piège OneDrive de la section 6 ne s'applique plus** : plus de synchro à mettre en pause avant un traitement de masse.

Copie vérifiée, pas supposée :
- Git identique — branche `main`, HEAD `c504ab2`, 94 commits, 175 fichiers suivis, 0 modification, 0 stash, même remote.
- Fichiers **non versionnés donc irrécupérables depuis GitHub** : `.env`, `.env.example`, `.gitignore` identiques au md5 ; `originals/` — 63 fichiers, 64 Mo, arborescence et somme de contrôle agrégée identiques.
- `pnpm install --frozen-lockfile` puis `pnpm run build` passent depuis le nouveau dossier.
- **Preuve décisive** : le md5 agrégé de tous les `dist/**/*.html` est le même dans les deux dossiers.

Aucun chemin absolu de l'ancien emplacement n'existe dans le code, les scripts ou la configuration : rien à réparer après le déplacement.

**`node_modules` n'a pas été copié** (ni copiable utilement) : lancer `pnpm install` avant tout. pnpm 10 affiche alors `Ignored build scripts: esbuild, sharp` — **sans conséquence vérifiée**, le build optimise bien les 147 variantes d'images. Ne pas « corriger » par `pnpm approve-builds` sans raison.

### TVA, slug anglais, accessibilité du menu — 03/10/2026
- **Franchise de TVA** : l'utilisateur est auto-entrepreneur. CGV FR et EN, article des tarifs : « nets et HT » devient **« nets : TVA non applicable, article 293 B du Code général des impôts »**. Seule occurrence de HT/TVA du site, `packages.ts` compris.
- **Slugs anglais passés en revue** : tous reprennent le titre de leur page et le terme anglais usuel, sauf un. `/en/e-reputation` devient **`/en/online-reputation`** : « e-reputation » est un gallicisme, un anglophone cherche *online reputation management*. Le texte anglais suit (titre, H1, FAQ, footer EN, `/en/services`, réponse EN de l'agent IA), la page FR garde « e-réputation ». **Redirection 301** de l'ancienne URL dans `vercel.json`, avec et sans slash final. Les autres slugs sont validés, ne pas les rouvrir.
- **Piège rencontré** : un remplacement global de « e-reputation » attrape aussi « onlin**e-reputation** ». Le canonical s'était transformé en `/en/onlinonline reputation` et la page avait perdu ses 3 hreflang (114 → 111). C'est le compteur de la section 3 qui l'a signalé. Toujours relire ce chiffre après un renommage.
- **Menu mobile**, `Header.astro` :
  - L'`aria-label` du burger bascule entre « Ouvrir » et « Fermer le menu ». Il était aussi **figé en français sur les pages EN** : il est désormais traduit (« Open/Close menu »).
  - `inert` est posé à l'ouverture sur tout ce qui n'est ni le menu ni le burger. Il est calculé au moment de l'ouverture, donc les widgets injectés après chargement sont couverts. Seuls les `inert` posés par le menu sont levés à la fermeture.
  - Focus trap : Tab boucle entre le burger (qui sert de bouton de fermeture) et les liens. Le focus entre dans le menu à l'ouverture et revient au burger sur Échap ou sur clic du burger.
  - Le menu se referme si l'écran repasse au-dessus de 1024 px. Sinon, burger masqué, la page entière restait inerte sans issue.
  - `aria-modal` volontairement absent : le bouton de fermeture est hors du `role="dialog"`, et `aria-modal` le masquerait aux lecteurs d'écran. C'est `inert` qui isole le fond.
  - Vérifié dans Chrome sur `/contact` et `/en/online-reputation` en 390 px : 19 contrôles par page, tous passés, rendu visuel inchangé.
- **Lien « Voir tous les avis Google »** activé sur les deux accueils : `GOOGLE_BUSINESS_URL` vaut `https://share.google/CedPkNVagkkgOdEnQ`, le lien court de partage de la fiche (302 vers Google, vérifié). **C'est une constante de `testimonials.ts`, pas une variable d'environnement** : la ligne `GOOGLE_BUSINESS_URL` du `.env` local n'est lue par aucun code et peut être supprimée. Ne pas la déclarer sur Vercel en croyant activer quelque chose.

### Formats pour site existant, page Offres — 15/10/2026
Trois offres d'entrée ajoutées à `/offres` et `/en/packages`, sans refonte : Diagnostic Digital & IA Express (490 €), Sprint Digital (à partir de 990 €), Care vendu seul (49 € et 99 € par mois).
- **Deux sections, séparées par une question et non par un prix.** Section 1, « Vous n'avez pas encore de site ? » : Essentiel, Business, Signature, **inchangés**. Section 2, « Votre site existe déjà ? », titre « UN REGARD. UNE ACTION. UN SUIVI. » : Diagnostic, Sprint, puis Care. **Ne jamais fusionner les deux dans une grille** : cinq prix alignés de 490 à 3 900 € se lisent comme une échelle de budget, et le visiteur descend au premier barreau. La question est dans l'étiquette dorée au-dessus du titre, celui de la section 1 n'a pas bougé.
- **Care remonté, pas dupliqué** : l'ancien bloc « Après la mise en ligne » (3 petites cartes en bas de page) est supprimé. Care et Care Plus prennent les grandes cartes, Care Plus en avant avec le badge **« Recommandé »** (et non « Le plus choisi » : formule vendue seule toute neuve, l'affirmation n'était pas vérifiable). Business Care n'est plus qu'une ligne discrète sous les cartes. Accroche : « Nous maintenons aussi les sites que nous n'avons pas réalisés. » **Un seul bouton pour les deux formules**, `?offre=care`.
- **Aucun « HT »** : franchise de TVA. Règle écrite en tête de `packages.ts`. Le JSON-LD perd aussi `valueAddedTaxIncluded: false`, qui disait la même chose à Google.
- **CGV, article 4, FR et EN** : « Sauf mention contraire dans l'offre ou le devis accepté » devant l'acompte de 30 %. Sans cela, le Diagnostic payé à la commande et l'acompte de 50 % du Sprint contredisaient les CGV.
- **Carte extraite dans `src/components/PackageCard.astro`**, utilisée par les deux sections, **CSS déménagé avec elle** (piège des styles scopés). Les champs facultatifs absents sont omis : lignes de pied multiples (`terms`, ex-`delayLabel`/`delayValue`), périodicité (`pricePeriod`), mention encadrée (`highlight`, la déduction du Diagnostic), carte sans bouton (Care). **Vérifié au pixel près** : la grille de la section 1 est identique avant et après, à 1280, 820 et 390 px, FR et EN. Seule l'étiquette au-dessus du titre diffère, comme voulu.
- **Le formulaire de contact ne recopie plus la liste des offres.** `getContactOffers()` la construit depuis `packages.ts` au build, posée dans `data-offers` sur le `<form>`. Une offre future est reconnue sans toucher aux pages contact. Pour une offre « site existant », le message prérempli finit par « Mon site : » au lieu de « Mon projet : ». Testé dans Chrome : 6 offres × 2 langues, plus `?offre=inconnue` et `?offre=toString` ignorés, aucune erreur JS.
- **JSON-LD** : `getOffersJsonLd()` produit les 7 offres, avec `price` pour le Diagnostic (prix ferme), `minPrice` pour les planchers et `UnitPriceSpecification` à l'unité `MON` pour Care. Plus aucun montant recopié dans les pages.
- Méta-titre et méta-description FR/EN couvrent désormais l'audit et la maintenance. Phrase du hero : « Créer votre site, ou faire progresser celui que vous avez déjà. »
- Section 2 sur fond `--anthracite` avec filet `--border`, repris du CTA final : aucune couleur nouvelle.

**Suites, même jour :**
- **Hero, un bouton par situation**, dans l'ordre de la phrase « Créer votre site, ou faire progresser celui que vous avez déjà » : « Créer mon site » → `#offres`, « Améliorer mon site existant » → `#site-existant` (`ctaExisting` dans `packages.ts`), puis « Parler de mon projet », conservé. Vérifié au clic : le titre de la section 2 arrive sous l'en-tête fixe, sans être masqué (les 7rem de marge haute des sections suffisent, aucun `scroll-margin` nécessaire).
- **Bannières de partage dédiées** : `public/images/offres-banner.jpg` (FR) et `packages-banner.jpg` (EN), 1200×630, branchées par `ogImage` sur chaque page. L'accueil et les autres pages gardent `og-image-v2.jpg`. Même charte que la bannière générique : fond noir, lignes dorées, titre en Montserrat doré. Les deux pastilles reprennent les deux questions de la page. **Aucun prix sur la bannière, volontairement** : Facebook et LinkedIn la gardent en cache longtemps après un changement de tarif. Les 8 autres bannières de pages sont des photos recadrées sans texte : celles-ci sont les seules composées.
- Le script qui les produit est dans **`originals/og/banner.mjs`**, hors dépôt, avec la marche à suivre en tête : page HTML avec les polices de `public/fonts`, capturée par Chrome, puis JPEG via `sharp`. **Piège** : la page doit être ouverte depuis un fichier (`file://`). Injectée sans adresse, Chrome refuse de lire les polices locales et la bannière sort dans une police de repli, sans erreur visible.

### Portfolio : clients politiques rendus anonymes · 19/10/2026
Discrétion sur les campagnes politiques, pour ne pas gêner la prospection ONC auprès des ambassades.
- `projects.ts` : `alexis-mohamed` devient `personnalite-afrique-est`, `djorie` devient `personnalite-afrique-centrale`. Plus de nom, plus de lien, plus de mot « présidentielle ». `countries` conservé : le compteur de pays ne bouge pas.
- Visuels remplacés par `projet-afrique-est.jpg` et `projet-afrique-centrale.jpg` (écran pixellisé). Les anciens fichiers sont rangés dans `originals/confidentiel/` : **ne pas les remettre dans `src/assets/`**, car `import.meta.glob` publie dans `dist/` toute image présente dans ce dossier, même inutilisée.
- `testimonials.ts` : l'avis Google d'Alexis Mohamed n'est plus rattaché à un projet, n'est plus sur l'accueil (`featured: false`) et n'est plus mobilisable pour ONC (`institutional: false`). L'accueil affiche deux avis : `TestimonialsSection` passe alors en deux colonnes centrées (`tm-grid--duo`).
- `AIAgent.astro` : réponse « portfolio » FR et EN reformulée, mots-clés `djorie` et `mohamed` retirés.

### Accessibilité RGAA · 19/10/2026
Branche `accessibilite-rgaa`, PR n°1. Point de départ : audit rgaa-checker de l'accueil (26 % estimatif, 4 non-conformités dont 2 critiques) et audit axe-core des 38 pages (133 occurrences en échec, **8 après**).
- Bannière cookies : l'`aria-label` était posé sur le `<label>` et non sur la case, qui n'avait donc aucun nom (11.1). Le panneau replié était en `aria-hidden` tout en restant atteignable au clavier (10.8) : il est désormais `inert` tant qu'il est replié. « Toujours actif » traduit.
- Vidéo de l'accueil : bouton pause en haut à droite du hero (13.8). Il n'apparaît que si la vidéo joue réellement : rien n'est affiché si `prefers-reduced-motion` ou l'économiseur de données gardent le poster.
- Liens « Explorer » des trois piliers : complément en `.sr-only` (6.1). **La classe `.sr-only` est globale, dans `Layout.astro`.**
- Lien de langue : `lang` et libellé « English version / Version française » (8.7). Libellés ARIA de l'en-tête traduits sur les pages EN.
- Liens sans classe dans `p`, `li`, `dd` de `main` soulignés globalement (10.6). Contrastes : numéros d'étapes IA et SEO, étiquettes du portfolio (3.2).
- Titres : pied de page h4 vers h2, services h4 vers h3, nom d'auteur de `/afrique` en paragraphe (9.1).
- **283 SVG passés en `aria-hidden="true" focusable="false"`** (1.2). Règle pour la suite : toute nouvelle icône décorative porte ces deux attributs ; une icône seule dans un lien ou un bouton impose un `aria-label` sur le lien.
- Bouton WhatsApp flottant dans un `<aside>` étiqueté (12.6), ouverture d'onglet signalée.
- **Les 8 occurrences restantes sont volontaires** : grands numéros en filigrane (`.pf-item__num`, `.service-num`), décoratifs et en `aria-hidden`. Ne pas les « corriger » en relevant leur contraste, cela changerait le design pour un texte exempté.
- **SIRET corrigé, même PR** : les mentions légales et la politique de confidentialité, FR et EN, affichaient `518 212 162 00029`, numéro de l'ancien établissement parisien. Le bon est **`518 212 162 00045`** (Alfortville), confirmé par l'utilisatrice le 19/10/2026. Ne pas réintroduire 00029.

### Portfolio : visuels entiers sur grand écran · 19/10/2026
Même PR n°1. À 100 % sur ordinateur, la rangée d'un projet prend la hauteur de son texte (description et avis intégral), souvent plus d'un écran. En `object-fit: cover`, l'image remplissait une colonne haute et étroite et n'en montrait qu'une tranche ; elle n'apparaissait entière qu'en dézoomant.
- Au-dessus de 1024 px seulement (bloc en fin de `<style>` des deux pages portfolio) : zone `position: sticky` de la hauteur de l'écran, **remplie bord à bord** (une première version avec marges et image encadrée a été jugée moins premium). Elle reste visible pendant la lecture.
- Les visuels vont de 0,59 (téléphone) à 2,16 de ratio, la zone est à peu près carrée. `needsFit()`, dans le frontmatter des deux pages, tranche au build : ratio entre 0,79 et 1,4, plein cadre en `cover` (au moins 75 % de l'image visible) ; au-delà, classe `pf-item--fit`, image entière en `contain` sur un fond flou et assombri tiré d'elle-même (`.mockup__photo-backdrop`, 480 px). **Ne pas forcer `cover` sur une image large** : Nomadéo ou AFAC26 perdraient la moitié de l'appareil. Pour recentrer un plein cadre, régler `imagePosition` dans `projects.ts`.
- **Piège 1** : `inset: auto` doit précéder `top: 80px`, sinon le raccourci annule `top` et le collage ne se fait pas.
- **Piège 2** : `body` est passé de `overflow-x: hidden` à **`overflow-x: clip`** (repli `hidden` pour les vieux navigateurs). `hidden` faisait du body un conteneur de défilement et rendait tout `position: sticky` du site inopérant. Même chose sur `.pf-item` et `.pf-item__visual`. Ne pas revenir à `hidden`.
- Vérifié à 1366 et 1920 px, FR et EN ; mobile inchangé, aucun débordement horizontal à 390 px.

### Accessibilité de la page Offres · 19/10/2026
Les deux points laissés hors de la PR n°1 sont soldés.
- **Bloc Care : `<div>` devenu `<section>`.** `aria-labelledby` sur un `div` sans rôle est ignoré par les lecteurs d'écran. En `<section>`, la zone est annoncée sous son titre (« CARE, VOTRE SITE RESTE EN LIGNE. » / « CARE, KEEPING YOUR WEBSITE ONLINE. »), vérifié dans l'arbre d'accessibilité de Chrome. **Aucun pixel ne change** : section 2 comparée avec et sans la correction, sur le code actuel, à 1280 et 390 px, FR et EN.
- **Contrastes du case study : faux positif, aucune couleur modifiée.** Mesurés dans Chrome une fois le bloc affiché, `dt` (or `#C9A84C`) est à **8,3:1** et `dd` (`#BBBBBB`) à **9,8:1** sur `#111`, au-dessus de l'AA (4,5:1) et même de l'AAA (7:1). Les 3,2:1 et 3,6:1 de l'audit viennent de l'animation d'apparition : `.reveal` part à `opacity: 0` et un outil qui mesure pendant le fondu voit un texte à moitié transparent. **Ne pas « corriger » ces couleurs.** Devant un contraste trop bas signalé par un outil automatique sur ce site, mesurer d'abord après l'apparition (classe `.visible`).

### Menu mobile tronqué après défilement · 19/10/2026
Signalé par l'utilisateur sur iPhone, en production : en bas de page, le burger n'ouvrait qu'une bande avec « L'Agence ». En haut de page, tout s'affichait.
- **Cause** : passé 40 px de défilement, `.site-header.scrolled` posait `backdrop-filter: blur(20px)` **sur l'en-tête**. Or `#mobile-menu` est un enfant de l'en-tête, en `position: fixed`. Un ancêtre qui porte `backdrop-filter` (comme `transform`, `filter`, `will-change`, `contain`, `perspective`) devient le cadre de référence de ses descendants fixes : le menu se calait sur l'en-tête (104 px) au lieu de l'écran.
- **Correction** : fond et flou déplacés sur `.site-header::before`, en `z-index: -1` derrière le contenu de l'en-tête. L'en-tête ne porte plus de filtre, le menu redevient plein écran.
- **Vérifié dans Chrome** à 390 px, sur `/portfolio`, `/en/packages` et `/`, en haut, au milieu et en bas : avant 1 lien visible sur 9 dès qu'on a défilé, après 9/9 partout. En-tête défilé **identique au pixel près** à 1280 et 390 px. Tests d'accessibilité du menu (inert, focus, Échap) toujours verts.
- Pourquoi mes tests du 03/10 ne l'avaient pas vu : ils ouvraient le menu en haut de page. Un test de menu doit désormais aussi l'ouvrir **après défilement**.

### Six non-conformités RGAA corrigées · 20/10/2026
Repérées en lisant le code pendant la préparation de la vérification manuelle (liste : https://claude.ai/artifact/MmnySpfpr6LRxXWUNN9BSa), corrigées avant la déclaration.
- **12.1 Plan du site** : `/plan-du-site` et `/en/site-map`, un seul composant (`SiteMapContent.astro`) pour les deux langues, lien dans le pied de page des 40 pages. **La liste vient de `localePairs`** : chaque paire de `routes.ts` porte désormais un `label` FR/EN et un `group` (`main`, `expertise`, `legal`). Ajouter une page à la table la met au plan du site. Le site passe de 38 à **40 pages**, parité 20/20, 120 hreflang.
- **13.8 Animation d'accueil** (FR, 6 s) : bouton « Passer l'introduction » en bas à droite, placé **hors** du splash, qui est en `aria-hidden` (un bouton dedans serait muet pour les lecteurs d'écran). Échap passe aussi l'intro ; si le focus était sur le bouton, il va au contenu principal. Les deux accueils **sautent l'intro avec `prefers-reduced-motion`**. L'intro EN dure 2,2 s, sous la limite de 5 s : pas de bouton.
- **11.13** `autocomplete` sur les cinq champs nominatifs des formulaires FR et EN (`given-name`, `family-name`, `email`, `tel`, `organization`).
- **11.10** Phrase « Les champs marqués d'un astérisque (*) sont obligatoires. » avant le premier champ, FR et EN.
- **7.5** Zone `#form-status` en `role="status"` et `.sr-only`, présente dès le chargement et vidée à chaque envoi : le succès est annoncé. L'erreur réseau, qui n'allait que dans le bouton, passe désormais par `signaler()` et la zone `role="alert"`.
- **1.9** Figure du case study de `/offres` : `role="figure"` et `aria-label` reprenant la légende (pays, titre).
- **Défaut trouvé au passage** : cinq pages anglaises (`/en`, contact, services, vision, artificial-intelligence) appelaient `<Footer />` sans `lang`, donc un **pied de page entièrement en français**. Visible pour un anglophone et non conforme au 8.7. Corrigé, voir la section 6.
- **Vérifié dans Chrome** : plan du site, 20 liens sans lien cassé dans chaque langue ; bouton, Échap et réduction des animations ; autocomplete et phrase d'astérisque ; succès et erreur réseau annoncés (**réponse du serveur simulée, aucun e-mail envoyé**) ; figure exposée avec son nom.

### Contrastes sur photo, image Unsplash, textes alternatifs · 20/10/2026
Suite aux premiers tests NVDA de l'utilisatrice.
- **axe-core : 0 erreur** sur l'accueil et le contact. Mais axe laisse « à juger » tout texte posé sur image, vidéo ou dégradé (56 sur ces deux pages). Ces textes ont été **mesurés réellement sur les 40 pages, à 1280 et 390 px**. Méthode : capture avec et sans le texte, mesure sous les glyphes uniquement, pire cas pris sur les 5 % de fond les plus défavorables. **Mesurer tout le rectangle d'un élément donne de faux échecs** : il compte la bordure dorée des boutons et le dégradé des titres en `background-clip: text`.
- Corrigés : « Scroll » de l'accueil (1,9:1) ; texte RGPD et lien de la bannière cookies (2,8 et 4,4:1) ; numéros des piliers et « Translated from French » sur `/en` ; libellés des chiffres du portfolio FR et EN ; flèches du processus des pages IA.
- **Pages d'expertise et Afrique (16 pages)** : leurs sections posent une photo sous un voile **gris chaud `rgba(72, 71, 68, 0.8 à 0.9)`**, plus clair que le noir du site. Le gris clair du texte y tombait entre 3,4 et 4,4:1. Une règle ajoutée dans le style **de chaque page concernée** passe `.service-card p`, `.benefit-card p`, `.cta-section p`, `.testimonial-content p` et `.author-info p` en `--off-white`, à pleine opacité. Ce n'est pas une règle globale, car ces classes existent aussi sur des pages déjà conformes. Sur `.benefits` (conseil stratégique) et `.seo-services` (référencement), le voile démarre à 0,88 au lieu de 0,8.
- **Bilan : 80 mesures, 0 texte sous le seuil.** Limite : l'accueil a été mesuré sur le poster de la vidéo. Les images de la vidéo elle-même restent à vérifier à l'œil (critère 3.2 de la liste de vérification).
- **Image tierce trouvée, inventaire RGPD du 29/09 à corriger** : `/conseil-strategique` et `/en/strategic-consulting` chargeaient leur fond d'appel à l'action depuis **`images.unsplash.com`**, caché dans le CSS (donc invisible dans le HTML et absent du contrôle fait sur `/contact`). Chaque visiteur de ces pages envoyait son IP à Unsplash. Image auto-hébergée dans `public/conseil-cta.jpg` (1600 px, 242 Ko), original dans `originals/unsplash/`. **Vérifié après correction** : dans tout `dist` (HTML, CSS, JS), la seule ressource tierce chargée est Cloudflare Turnstile ; les autres adresses externes sont de simples liens. Pour refaire ce contrôle, chercher aussi dans `dist/_astro/*.css`, pas seulement dans le HTML.
- **Textes alternatifs des visuels de projets** : champ `imageAlt` bilingue dans `projects.ts`, utilisé par l'accueil (`ProjectCard`), le portfolio et le case study de `/offres`. Renseigné pour PaieCashFan (« Application PaieCashFan »), PaieCashCoin et Island Living SXM (« Site de réservation de villas à Saint-Martin, Island Living SXM »). Sans `imageAlt`, le texte par défaut est désormais **traduit** : il était écrit en dur en français, y compris sur `/en`. Le case study utilisait l'accroche du projet comme texte alternatif.
- **NVDA « ne lit rien »** : c'est un usage à expliquer, pas un défaut. Tab ne parcourt que les éléments interactifs. Le texte se lit en mode navigation (flèches, H, D, K, F, NVDA+Flèche bas). Le survol à la souris demande NVDA+M, et DevTools capte la souris. L'arbre d'accessibilité relevé sur l'accueil et le contact est complet et correct.

### Fond explicite sur `body` pour les outils de contraste · 20/10/2026
L'extension **WCAG Contrast Checker** utilisée par l'utilisatrice affichait des dizaines d'échecs : 1:1, 1,92, 2,29 et 3,54. Ce sont **exactement** les contrastes du blanc, de `#BBBBBB`, de l'or et de `#888` **sur fond blanc**. Le fond noir du site était posé sur `html` seul, `body` restait transparent, et l'outil, qui s'arrête à `body`, supposait du blanc. Fausses erreurs, mais qu'un auditeur RGAA équipé du même outil aurait vues.
- `body` porte désormais `background: var(--black)` dans `Layout.astro`. **Aucun effet visible**, vérifié au pixel près sur l'accueil, Expertises, IA et contact.
- Valeurs réelles des paragraphes signalés : Expertises et IA, blanc à 80 % sur `#0a0a0a`, environ 12,5:1 ; accueil, blanc à 75 %, environ 11:1 sur fond uni, validé aussi sur la photo du hero.
- Les « 1,16 » restants sont les grands numéros en filigrane (`01`, `02`…), décoratifs et masqués : exemption déjà actée dans la PR n°1.
- **Méthode à indiquer à l'utilisatrice pour le critère 3.2** : les listes automatiques de l'extension ne voient ni les images ni les vidéos. Pour un texte sur photo, prendre la pipette « Foreground » sur le texte et la pipette « Background » sur la zone la plus claire juste derrière.

### Pages d'expertise de la V1 retirées · 20/10/2026
Signalé par l'utilisatrice : `/conseil-strategique` était encore en ligne, alors que le menu ne la proposait plus. On n'y arrivait que par le plan du site, le pied de page ou le premier pilier de l'accueil FR, ce qui prêtait à confusion.
- **Retirées, FR et EN (16 pages)** : afrique, conseil-strategique, design-graphique, e-reputation, referencement, relations-presse, reseaux-sociaux, webmarketing, et leurs équivalents anglais. Archivées dans `src/_archive/` (même méthode que l'ancienne page témoignages, procédure de remise en service dans `src/_archive/README.md`), paires retirées de `routes.ts`. **Le site passe de 40 à 24 pages**, parité 12/12, 72 hreflang, 0 lien cassé. **Pages à conserver = les entrées du menu** : accueil, L'Agence, Expertises, Portfolio, Intelligence IA, One Nation Civic (section de l'accueil), Offres, Contact, plus les pages légales et le plan du site.
- **301 dans `vercel.json`** (avec et sans `/` final) : communication, Afrique, réseaux sociaux et webmarketing vers `/services#communication` ; design graphique et référencement vers `/services#web` ; mêmes cibles en anglais. La redirection `/en/e-reputation` → `/en/online-reputation` du 03/10 pointe désormais directement vers `/en/services#communication`, pour éviter une chaîne vers une page retirée.
- **Liens corrigés** : rubrique Expertises du pied de page (Communication stratégique → `#communication`, Création web premium → `#web`, Design graphique et E-réputation supprimés), piliers de l'accueil FR et EN vers leur section de `/services`.
- **Plan du site** : il suit l'ordre du menu. Nouveau champ `sections` dans `routes.ts` : une page y déclare ses ancres, listées sous elle (Expertises → communication, IA, web ; Accueil → One Nation Civic, via `CIVIC_ANCHOR` de `civic.ts`). La rubrique `expertise` a disparu de `PageGroup`. Mise en page en colonnes (`columns: 2`) et non en grille, sinon une page suivie de ses sections laisse des trous.
- Conséquence sur le travail du jour : l'image Unsplash auto-hébergée (`public/conseil-cta.jpg`) et la correction de contraste des pages d'expertise ne servent plus qu'aux pages archivées.

### Divers
- **Réseaux sociaux — 30/09/2026** : Instagram retiré, Facebook corrigé (l'ancienne URL ne menait nulle part), LinkedIn à jour. Ces liens existent à **deux endroits** qui doivent rester alignés : le footer et le `sameAs` du JSON-LD dans `Layout.astro`, qui déclare à Google les profils officiels. Modifier l'un sans l'autre laisse un profil mort dans les données structurées.
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
| Tranché | **« Paris » comme positionnement** | `contact.astro`, `en/contact.astro` et `en/index.astro` affichent « Paris, France » et « Paris · Africa · International ». Volontairement conservé : c'est du discours commercial, pas l'adresse légale. Ne pas « corriger » au motif que cela diffère du footer. |
| À valider | **Page dédiée One Nation Civic** | ONC vit dans une section d'accueil, un bandeau sur les pages IA et un bloc sur `/offres`. Une page `/one-nation-civic` + `/en/one-nation-civic` serait le prochain palier SEO : il suffirait d'y poser `<CivicSection />`, d'ajouter la paire dans `routes.ts` et de rebasculer le lien du menu. Non fait : hors demande. |
| Faible | **Description ONC dans le JSON-LD de `/offres`** | L'offre One Nation Civic du catalogue reprend la méta-description de la page entière comme description. Défaut antérieur au 15/10, non corrigé : hors demande. |
| À valider | **Chiffre « 100% clients satisfaits »** | Repris de l'ancien code sans vérification. Modifiable dans `stats.ts`. |
| Ouvert | **Flèche retour en haut de page** | L'utilisateur signale une superposition avec le bouton WhatsApp, mais aucune flèche n'existe dans le code, même avant l'audit. Possiblement une extension navigateur. Capture nécessaire. |
| Moyen | **Rate limiting en mémoire** | Réinitialisé à chaque cold start Vercel. Efficace contre un script isolé, pas contre un botnet. Upstash Redis pour une garantie stricte. |
| À décider | **Images orphelines** | Depuis le retrait des pages V1 (20/10), une cinquantaine d'images ne sont plus utilisées par aucune page en ligne : fonds dans `public/` (afrique.jpg, analyseSeo.jpg, benefit.jpg, conseil-cta.jpg, relationsPresse.jpg…), 8 bannières `public/images/*-banner.jpg`, et des visuels de `src/assets/`, dont certains orphelins depuis plus longtemps (anciens portraits de témoignages, anciennes photos). Celles de `public/` sont encore publiées. Les supprimer allège `dist`, mais une page archivée remise en service en aurait besoin : l'historique git les conserve. **Attention**, `web-app-manifest-512x512.png` est utilisée par `site.webmanifest`, ne pas la supprimer. |
| Faible | **JSON-LD identique sur les 24 pages** | Pas de `BreadcrumbList`, pas de `WebSite`+`SearchAction`, pas de schéma `Service` par page. |
| À corriger | **5 non-conformités RGAA (revue du 22/10)** | Trouvées par la revue complète menée avec la skill `rgaa-accessibilite` et des tests automatisés sur les 24 pages. **8.2** HTML invalide au validateur W3C : `<div>` dans un `<button>` (×3 par page), `<style>` dans `body` (le `<noscript>` de `Layout.astro`), `<script>` mal placé, `aria-hidden` en double sur des SVG (accueil, portfolio), `<source>` vidéo sans `src` (chargement différé de l'accueil), attribut `rx` sur un `<path>`. **8.7** bouton de langue de l'assistant IA (« Switch language » sur les pages FR, sans `lang="en"`). **10.14** « Voir le projet » des cartes de l'accueil visible au survol seulement (`.portfolio-card:hover .portfolio-overlay`, ajouter `:focus-within`). **11.11** message d'e-mail invalide sans exemple de format. **13.8** animations infinies sans arrêt : `.gold-text` (reflet, accueil), `.scroll-line`, `.ai-trigger-pulse` (toutes les pages), `.ai-status-dot`, `.ai-demo-dot`, `.ai-dot` ; les limiter à 5 s. Seul 13.8 se voit (les animations s'arrêtent) : à montrer en local avant de pousser. |
| En cours | **Vérification manuelle RGAA** | **Verdicts complets au 22/10 : 45/45.** L'utilisatrice en a jugé 10, Claude les 35 autres par revue de code et tests automatisés (notes « Claude, 22/10 » dans la base). Restent conseillées : une écoute NVDA (7.1) et la saisie de l'environnement de test. Faite par l'utilisatrice à l'aide d'une **liste interactive** : https://claude.ai/artifact/MmnySpfpr6LRxXWUNN9BSa (artifact privé). 45 critères avec la marche à suivre sur ce site, verdicts et notes enregistrés dans la base de l'artifact (collection `verifications`, un document par critère, plus `meta/environnement` pour les navigateurs et lecteurs d'écran utilisés). **Relire cette base avec l'outil ArtifactData avant de rédiger la déclaration.** Le rapport rgaa-checker d'origine (49 critères) n'a pas été conservé : la liste a été reconstruite le 20/10 à partir du RGAA 4.1.2, confronté au code du site. |
| À faire | **Déclaration d'accessibilité** | Après vérification et corrections : page `/accessibilite` + `/en/accessibility` (paire dans `routes.ts`), mention « Accessibilité : partiellement conforme » (ou l'état obtenu) dans le pied de page des 38 pages. Taux = conformes / (conformes + non conformes). Obligation légale probablement inexistante pour une micro-entreprise, démarche volontaire. |

**Hors code — à faire par l'utilisateur, aucun développement attendu**

| Sujet | Détail |
|---|---|
| **Numéro de téléphone** | Le site affiche partout le `06 98 61 97 10`. **Déjà sur la fiche Google Business** (confirmé le 03/10). Reste à le reporter sur les signatures d'e-mail et la page LinkedIn. |
| **WhatsApp** | Le widget pointe vers `wa.me/33698619710`. À vérifier d'un clic : si ce numéro n'est pas inscrit sur WhatsApp, le lien ouvre une erreur. |
| **Portraits clients** | `src/assets/avis-*.png` font 68 px pour un affichage à 42 px, soit 1,6x. Des sources plus grandes seraient plus nettes sur écran Retina. **Jamais de portrait de synthèse** : sans photo, la pastille retombe sur les initiales. |

---

## 6. Pièges connus

- **OneDrive — piège levé le 03/10/2026.** Le dépôt est sorti de la synchro (`C:\dev\ONA\ona`), les traitements de masse ne tombent plus en `EBUSY`/`Permission denied`. Conservé ici pour une seule raison : si un jour le projet retourne dans un dossier synchronisé, demander la mise en pause **avant** le traitement, pas après.
- **Previews Vercel** — l'utilisateur teste souvent sur `onenationagency-<hash>-…vercel.app`, figée sur son commit. Devant un bug « qui persiste » après correction, lire d'abord l'URL de sa capture.
- **Fins de ligne** — les fichiers historiques sont en CRLF, les nouveaux en LF. Comparer en normalisant avant de conclure à une modification.
- **Styles Astro scopés** — un `<style>` de page ne s'applique pas au markup d'un composant. Déplacer un markup vers un composant impose de déplacer son CSS avec.
- **`<Footer />` sur une page anglaise** — toujours `<Footer lang="en" />`. Sans `lang`, le composant retombe sur le français : le 20/10, cinq pages EN avaient tout leur pied de page en français. Même règle pour `<Header />`.
- **Ancêtres du menu mobile** — jamais de `transform`, `filter`, `backdrop-filter`, `will-change`, `contain` ni `perspective` sur `.site-header` ou ses parents : le menu, en `position: fixed` à l'intérieur, serait réduit à la hauteur de l'en-tête. Un effet visuel sur l'en-tête se pose sur `::before`. Tester le menu **après défilement**, pas seulement en haut de page.
- **Tirets cadratins** — le site n'en utilise plus dans le texte visible. Espace dans le texte courant, trait d'union dans les titres, « à »/« to » dans les plages.
- **`pnpm` uniquement** — ne pas lancer `npm install`, cela recréerait un `package-lock.json` concurrent et casserait le build Vercel.

---

## 7. Tenir cette fiche à jour

- **Section 3** : automatique, régénérée par `pnpm run build`. Ne pas l'éditer.
- **Sections 4 et 5** : à la main, à chaque intervention. Déplacer ce qui est fait de la section 5 vers la section 4, ajouter ce qui est découvert.

Pour l'assistant : lire ce fichier en début de session et repartir de la section 5 plutôt que de relire le dépôt. Après toute modification, mettre à jour les sections 4 et 5 dans le même commit que le code.
