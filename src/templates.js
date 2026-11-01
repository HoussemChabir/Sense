// Page markup as strings, from src/content.js and the words in src/i18n/. vite.config.js writes each page to static HTML
// at build time and renders it per request in dev; main.js adds the behaviour. Runs in Node only (it reads the map
// source from disk). English pages live at the root, every other language under /<code>/, with the same slugs.
import { readFileSync } from 'node:fs';
import manifest from './image-manifest.json';
import { SITE, whatsapp, brand, experiences, journeys, destinations, alts } from './content.js';
import { base, srcset, fallbackSrc, coverSizes, fullBleedSizes, slots, heroSources, picture } from './images.js';
import en from './i18n/en.js';
import fr from './i18n/fr.js';
import de from './i18n/de.js';
import it from './i18n/it.js';
import pl from './i18n/pl.js';
import ru from './i18n/ru.js';
import ar from './i18n/ar.js';

export const languages = {en, fr, de, it, pl, ru, ar};
const codes = Object.keys(languages);
export const rtl = lang => lang === 'ar';
const prefix = lang => lang === 'en' ? '' : `/${lang}`;

const arrow = '<svg class="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5"/></svg>';
const tunisiaMapSource = readFileSync(new URL('../assets/tunisia-outline-source.svg', import.meta.url), 'utf8');
const tunisiaPath = tunisiaMapSource.match(/<g id="tunisia_fill">[\s\S]*?<path[^>]*d="([^"]+)"/)[1].replace(/\s+/g, ' ');
// Use the source land geometry to keep the Mediterranean off Algeria and Libya.
const atlasLand = tunisiaMapSource.match(/<g id="land_fill">[\s\S]*?<path[^>]*d="([^"]+)"/)[1].replace(/\s+/g, ' ');
const atlasCoast = [...tunisiaMapSource.matchAll(/<polyline[^>]*points="([^"]+)"/g)][2][1].trim().split(/\s+/).map(p=>p.split(',').map(Number));
const atlasWest = atlasCoast.at(-1);
const atlasCoastPath = 'M' + atlasCoast.map(p=>p.join(' ')).join('L');
const atlasLandExtension = `M-600 ${atlasWest[1]+140}Q-250 ${atlasWest[1]+80} ${atlasWest[0]} ${atlasWest[1]}L80 1400H-600Z M70 1140H860V1400H70Z M737 755C850 770 960 805 1400 864V1400H737Z`;
const atlasPoints = {north:[468.78,185.67],coast:[539,480.5],history:[472,355],oasis:[230.5,592.5],sahara:[337,735],island:[552,618]};
// Each illustration is positioned relative to its own destination marker.
// [original width, original height, horizontal offset, vertical offset]
const atlasIllustrations = {north:[190,130,-35,65],history:[195,145,-30,55],coast:[125,96,-82,18],oasis:[180,125,35,-45],sahara:[190,140,55,55],island:[165,120,-30,55]};
const atlasArt = Object.entries(atlasIllustrations).map(([key,[w,h,dx,dy]])=>{
  const [mx,my]=atlasPoints[key], width=w*.7, height=h*.7;
  return `<image class="atlas-illustration" data-illustration-region="${key}" data-href="${base(`atlas-beige-${key}`, 480)}" x="${mx+dx-width/2}" y="${my+dy-height/2}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"/>`;
}).join('');
const atlasLayouts = {
  desktop:{view:'-50 -30 1300 1000',tx:288.3,ty:-40.5,scale:.74,title:[620,850],compass:[985,560],labels:{north:['left',150],history:['left',150],coast:['right',90],island:['right',90],oasis:['left',100],sahara:['left',157]}},
  mobile:{view:'0 -50 720 970',tx:65.1,ty:-22.5,scale:.7,title:[360,815],labels:{north:['left',70],history:['left',70],coast:['right',70],island:['right',70],oasis:['left',75],sahara:['left',110]}}
};
// The clickable area of each destination on the map, in map coordinates.
const atlasRegions = {north:'M70 85H730V300H70Z',history:'M70 300H455V565H70Z',coast:'M455 300H745V565H455Z',oasis:'M70 565H350V735H70Z',island:'M350 565H745V735H350Z',sahara:'M70 735H745V1190H70Z'};
const instagramIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>';
const whatsappIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.37 9.37 0 0 1 6.67 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.28l5.68-1.49a11.33 11.33 0 0 0 5.77 1.47h.01c6.25 0 11.34-5.09 11.34-11.35 0-3.03-1.18-5.88-3.32-8.02z"/></svg>';

// A language's copy of the content: each item with its translated fields. Every other language must translate every item.
const translate = (lang, list, words) => list.map(item => {
  if (lang !== 'en' && !words?.[item.slug]) throw new Error(`src/i18n/${lang}.js: no translation for ${item.slug}`);
  return {...item, ...words?.[item.slug]};
});
const localAlts = (lang, words) => {
  const missing = lang === 'en' ? [] : Object.keys(alts).filter(name => !words?.[name]);
  if (missing.length) throw new Error(`src/i18n/${lang}.js: no alt text for ${missing.join(', ')}`);
  return {...alts, ...words};
};

// Structured data (schema.org JSON-LD): every page carries one connected graph of the business, the website and the page
// itself. The share image is the page photo's smallest JPEG of at least 1200px, or its largest.
const ogImage = name => { const {width, height, fallback} = manifest[name], [w, ext] = fallback.find(([w]) => w >= 1200) ?? fallback.at(-1); return {url: `${SITE}${base(name, w)}.${ext}`, width: w, height: Math.round(w * height / width)}; };
const breadcrumb = (lang, name, url) => ({'@type': 'BreadcrumbList', itemListElement: [{'@type': 'ListItem', position: 1, name: brand.name, item: `${SITE}${prefix(lang)}/`}, {'@type': 'ListItem', position: 2, name, item: url}]});

// Every page of one language: its URL, the same page's URL without the language prefix (`rest`, for the language links),
// title (ending with the brand), head tags (see head below), the WhatsApp message its chat links start with, its own
// structured data, and its markup.
const site = lang => {
  const {ui: t} = languages[lang], words = languages[lang], root = prefix(lang);
  const content = {journey: translate(lang, journeys, words.journeys), destination: translate(lang, destinations, words.destinations), experience: translate(lang, experiences, words.experiences)};
  const photoAlts = localAlts(lang, words.alts);
  // Below-the-fold photos wait for the first frame after load (see main.js), so the hero gets the bandwidth first.
  const image = (name, slot) => picture(name, coverSizes(name, slots[slot]), `alt="${photoAlts[name]}" loading="lazy" decoding="async"`, 'media', true);
  const types = {
    journey: {dir: 'journeys', list: content.journey, back: [`${root}/#journeys`, t.back.journey]},
    destination: {dir: 'destinations', list: content.destination, back: [`${root}/#discover`, t.back.destination]},
    experience: {dir: 'experiences', list: content.experience, back: [`${root}/#experiences`, t.back.experience]},
  };
  const rest = (type, item) => `/${types[type].dir}/${item.slug}/`;
  const path = (type, item) => root + rest(type, item);
  // Links to a detail page name its photo, which main.js starts fetching on hover.
  const link = (type, item) => `href="${path(type, item)}" data-photo="${item.hero || item.image}"`;
  // Detail pages send their call to action to the home page planner, which fills in the interest.
  const planLink = interest => `${root}/?interest=${encodeURIComponent(interest)}#plan`;
  // The same page in every language: a menu at the top of the page, and a row of links in the footer.
  const languageLinks = page => codes.map(code => `<a href="${prefix(code)}${page}" hreflang="${code}" lang="${code}"${code === lang ? ' aria-current="page"' : ''}>${languages[code].name}</a>`).join('');
  const languageMenu = page => `<details class="lang-menu"><summary aria-label="${t.language}: ${languages[lang].name}">${lang.toUpperCase()}</summary><nav aria-label="${t.language}">${languageLinks(page)}</nav></details>`;
  const {journey: journeyList, destination: destinationList, experience: experienceList} = content;

  const atlasLinks = Object.fromEntries(destinationList.map(d => [d.key, link('destination', d)]));
  const atlasSvg = mode => {
    const l=atlasLayouts[mode], [vx,vy,vw,vh]=l.view.split(' ').map(Number), id=`atlas-${mode}`, point=key=>{const [x,y]=atlasPoints[key];return [l.tx+x*l.scale,l.ty+y*l.scale];};
    const labels=destinationList.map(d=>{const [mx,my]=point(d.key), [side,len]=l.labels[d.key], left=side==='left', end=left?mx-len:mx+len, nameLines=(mode==='mobile'&&t.atlas.mobile[d.key])||t.atlas.names[d.key], lh=mode==='mobile'?22:19, textX=left?end-10:end+10, textY=my-(nameLines.length-1)*lh/2+6;return `<a class="atlas-hotspot atlas-label region-${d.key}" data-atlas-region="${d.key}" ${atlasLinks[d.key]} aria-label="${t.explore(d.title)}"><line class="atlas-connector" x1="${left?end:mx+10}" y1="${my}" x2="${left?mx-10:end}" y2="${my}"/><g transform="translate(${mx} ${my})"><g class="atlas-marker"><circle class="atlas-marker-ring" r="10"/><circle class="atlas-marker-core" r="4"/></g></g><text class="atlas-label-text" x="${textX}" y="${textY}" text-anchor="${left!==rtl(lang)?'end':'start'}">${nameLines.map((line,i)=>`<tspan x="${textX}" dy="${i?lh:0}" class="${i?'atlas-label-sub':''}">${line}</tspan>`).join('')}</text></a>`;}).join('');
    const regions=['north','history','coast','oasis','island','sahara'].map(key=>`<a data-atlas-region="${key}" ${atlasLinks[key]} aria-label="${t.explore(destinationList.find(d=>d.key===key).title)}"><path class="atlas-region region-${key}" d="${atlasRegions[key]}"/></a>`).join('');
    return `<svg class="atlas-map atlas-map-${mode}" viewBox="${l.view}" role="group" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${t.atlas.title}</title><desc id="${id}-desc">${t.atlas.desc}</desc><defs><radialGradient id="${id}-land-fade" cx="50%" cy="48%" r="68%"><stop offset="48%" stop-color="white"/><stop offset="100%" stop-color="black"/></radialGradient><mask id="${id}-land-edge"><rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="url(#${id}-land-fade)"/></mask><clipPath id="${id}-country"><path d="${tunisiaPath}"/></clipPath><mask id="${id}-water" maskUnits="userSpaceOnUse" x="-1000" y="-200" width="3000" height="1800"><rect x="-1000" y="-200" width="3000" height="1800" fill="white"/><g transform="translate(${l.tx} ${l.ty}) scale(${l.scale})" fill="black"><path d="${atlasLand}"/><path d="${atlasLandExtension}"/><path d="${tunisiaPath}"/></g></mask></defs><g mask="url(#${id}-land-edge)"><g transform="translate(${l.tx} ${l.ty}) scale(${l.scale})" class="atlas-landscape" aria-hidden="true"><path d="${atlasLand}" fill="#ebdcc5"/><path d="${atlasLandExtension}" fill="#ebdcc5"/><path class="atlas-neighbor-coast" d="${atlasCoastPath}"/><path class="atlas-neighbor-coast" d="M-600 ${atlasWest[1]+140}Q-250 ${atlasWest[1]+80} ${atlasWest[0]} ${atlasWest[1]}M738 755C850 770 960 805 1400 864"/></g></g><g mask="url(#${id}-water)"><g class="atlas-sea" mask="url(#${id}-land-edge)" aria-hidden="true"><rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="#c6e1e9"/></g></g><g class="atlas-country-group" transform="translate(${l.tx} ${l.ty}) scale(${l.scale})"><path class="atlas-country" d="${tunisiaPath}" fill="#ebdcc5"/><g clip-path="url(#${id}-country)" class="atlas-regions">${regions}</g><path class="atlas-region-dividers" clip-path="url(#${id}-country)" d="M165 345Q340 320 520 345M160 560Q350 535 555 550M185 770Q350 730 590 790M455 345Q430 470 455 565M350 565Q380 670 350 770"/>${atlasArt}<path class="atlas-outline" d="${tunisiaPath}"/><g class="atlas-neighbors"><text x="35" y="490" text-anchor="middle">${t.atlas.algeria}</text><text x="685" y="910" text-anchor="middle">${t.atlas.libya}</text><path d="M-15 440l25-23 18 16 20-30 37 37M635 855l30-30 28 22 18-14 34 25"/></g></g>${labels}${l.compass?`<g class="atlas-compass" transform="translate(${l.compass})"><text y="-13">${t.atlas.north}</text><path d="M0 0v54M-10 28h20M0 0l-4 11 4-3 4 3Z"/></g>`:''}<g class="atlas-title" transform="translate(${l.title})"><path d="M-17 0h34"/><text text-anchor="middle" y="43">${t.atlas.heading[0]}</text><text text-anchor="middle" y="79">${t.atlas.heading[1]}</text></g></svg>`;
  };

  // The site footer, on every page but the one-screen experience pages: who Sense Tunisia is, Instagram and WhatsApp, links to every section and destination,
  // and the page in other languages. Elsewhere, the planner and privacy links lead to the home page (main.js opens the
  // privacy dialog for #privacy).
  const footer = (home, page, accent) => { const to = home ? '' : `${root}/`; return `<footer class="footer section-shell"${accent?` data-accent="${accent}"`:''}><a href="${home ? '#top' : `${root}/`}" class="wordmark" aria-label="${t.footer.home}">sense<span class="logo-dot">.</span></a><p class="footer-tagline">${t.description}</p><a class="footer-instagram" href="${brand.instagram}" target="_blank" rel="me noopener noreferrer">${instagramIcon}<span>Instagram @${brand.handle}</span></a><div class="footer-cols"><div><h3>${t.footer.discover}</h3><a href="${to}#discover">${t.footer.ourTunisia}</a><a href="${to}#experiences">${t.nav.experiences}</a><a href="${to}#journeys">${t.nav.journeys}</a></div><div><h3>${t.footer.destinations}</h3>${destinationList.map(d=>`<a ${link('destination', d)}>${d.shortTitle||d.title}</a>`).join('')}</div><div><h3>${t.footer.contact}</h3><span>${t.footer.where}</span><a href="${whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp <bdi dir="ltr">${brand.phone}</bdi></a>${home ? `<button data-plan>${t.footer.plan}</button>` : `<a href="${root}/#plan">${t.footer.plan}</a>`}</div></div><nav class="footer-langs" aria-label="${t.language}">${languageLinks(page)}</nav><div class="footer-bottom"><span>© ${new Date().getFullYear()} ${brand.name}</span>${home ? `<button id="privacy-button">${t.footer.privacy}</button>` : `<a href="${root}/#privacy">${t.footer.privacy}</a>`}<span>${t.footer.curious}</span></div></footer>`; };
  // Around every page: the skip link and the WhatsApp button. Only the home page shows the loading screen.
  const shell = (body, home) => `${home ? `<div class="loader" aria-hidden="true"><div class="loader-stage"><span class="loader-ring"></span><span class="loader-ring"></span><span class="loader-ring"></span><span class="loader-flag"></span></div><span class="wordmark">sense<span class="logo-dot">.</span><span class="wordmark-caption">${t.slogan}</span></span></div>` : ''}<a class="skip-link" href="#main">${t.skip}</a>${body}<a class="whatsapp-float" href="${whatsapp}" target="_blank" rel="noopener noreferrer" aria-label="${t.chat}">${whatsappIcon}</a>`;

  const p = t.planner;
  const home = `
  <header class="header" id="top">
    <a class="wordmark" href="#top">sense<span class="logo-dot">.</span><span class="wordmark-caption">${t.slogan}</span></a>
    <nav class="desktop-nav" aria-label="${t.nav.main}">
      <a href="#discover" class="active">${t.nav.destinations}</a><a href="#experiences">${t.nav.experiences}</a><a href="#journeys">${t.nav.journeys}</a>
    </nav>
    <button class="header-plan" data-plan>${t.startPlanning} ${arrow}</button>
    ${languageMenu('/')}
    <button class="menu-toggle" aria-label="${t.app.openMenu}" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button>
  </header>
  <nav id="mobile-menu" class="mobile-menu" aria-label="${t.nav.mobile}" hidden><a href="#discover">${t.nav.destinations}</a><a href="#experiences">${t.nav.experiences}</a><a href="#journeys">${t.nav.journeys}</a><button class="button" data-plan>${t.startPlanning} ${arrow}</button><div class="menu-langs" aria-label="${t.language}" role="group">${languageLinks('/')}</div></nav>
  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <picture class="hero-photo"><source media="${heroSources[0].media}" type="image/avif" srcset="${srcset('hero-mobile','avif')}" sizes="${heroSources[0].sizes}"/><source media="${heroSources[0].media}" srcset="${srcset('hero-mobile','fallback')}" sizes="${heroSources[0].sizes}"/><source type="image/avif" srcset="${srcset('hero-desktop','avif')}" sizes="${heroSources[1].sizes}"/><img src="${fallbackSrc('hero-desktop')}" srcset="${srcset('hero-desktop','fallback')}" sizes="${heroSources[1].sizes}" alt="${photoAlts['hero-desktop']}" width="1536" height="1024" fetchpriority="high" decoding="async"/></picture>
      <div class="hero-copy"><h1 id="hero-title">${t.hero.title}</h1><p class="hero-subtitle">${t.hero.subtitle}</p><button class="button" data-plan>${t.hero.button} ${arrow}</button></div>
      <a href="#discover" class="hero-scroll"><span>${t.hero.scroll}</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v17m-5-5 5 5 5-5" stroke="currentColor" stroke-width="1.5"/></svg></a>
      <span class="hero-coordinate"><bdi dir="ltr">33°27′ N &nbsp; 9°01′ E</bdi><br/><span>${t.hero.place}</span></span>
      <div class="paint-border hero-paint" aria-hidden="true"></div>
    </section>

    <section id="discover" class="discover atlas-section" aria-labelledby="discover-title">
      <h2 id="discover-title" class="sr-only">${t.discover}</h2>
      <p class="atlas-instruction">${t.instruction}</p>
      <div class="atlas-stage">
        ${atlasSvg('desktop')}
        ${atlasSvg('mobile')}
      </div>
    </section>

    <section class="landscape-interlude" aria-labelledby="interlude-title">${picture('beach-interlude', coverSizes('beach-interlude', slots.interlude), `alt="${photoAlts['beach-interlude']}" loading="lazy" decoding="async"`, 'interlude-photo', true)}<div class="interlude-copy"><h2 id="interlude-title">${t.interlude.title}</h2><p>${t.interlude.text}</p><span class="signature">${t.interlude.signature}</span></div></section>

    <section id="experiences" class="experiences section-shell">
      <div class="experience-intro"><h2>${t.feel.title}</h2>${t.feel.text.map(text => `<p>${text}</p>`).join('')}</div>
      <a class="image-tile adventure-tile" ${link('experience', experienceList[0])}>${image(experienceList[0].image,'adventure')}<span class="tile-copy"><span class="tile-kicker">${experienceList[0].kicker}</span><span class="tile-title">${experienceList[0].title}</span></span><span class="tile-arrow">${arrow}</span></a>
      <div id="experience-grid" class="experience-grid">${experienceList.slice(1).map(e=>`<a class="image-tile" ${link('experience', e)}>${image(e.image,'tile')}<span class="tile-copy"><span class="tile-kicker">${e.kicker}</span><span class="tile-title">${e.title}</span></span><span class="tile-arrow">${arrow}</span></a>`).join('')}</div>
    </section>

    <section id="journeys" class="journeys section-shell"><div class="section-heading"><div><span class="section-dash"></span><span class="small-label">${t.journeys.label}</span><h2>${t.journeys.title}</h2></div><p>${t.journeys.text}</p></div><div class="journey-grid">${journeyList.map(j=>`<article class="journey-card"${j.accent?` data-accent="${j.accent}"`:''}><a class="journey-image" ${link('journey', j)} aria-label="${t.journeys.card(j.title, j.duration)}">${image(j.image,'journey')}<span class="duration">${t.journeys.of(j.duration)}</span></a><div class="journey-body"><a class="journey-body-link" ${link('journey', j)}><span class="small-label">${j.route}</span><h3>${j.title}</h3><p>${j.description}</p></a><a class="text-link" ${link('journey', j)}>${t.journeys.explore} ${arrow}</a></div></article>`).join('')}</div><p class="journey-note">${t.journeys.note}</p></section>

    <section id="plan" class="planner-section" aria-labelledby="plan-title"><span class="section-dash"></span><span class="small-label">${p.label}</span><h2 id="plan-title">${p.title}</h2><p>${p.text}</p><form id="planner-form"><div class="form-grid"><label>${p.name}<input name="name" required autocomplete="given-name" maxlength="100" placeholder="${p.namePlaceholder}"/></label><label>${p.email}<input name="email" type="email" required autocomplete="email" maxlength="254" placeholder="${p.emailPlaceholder}"/></label><label>${p.month}<input name="month" type="month"/></label><label>${p.travelers}<select name="travelers">${en.ui.planner.travelerOptions.map((value, i) => `<option${value === p.travelerOptions[i] ? '' : ` value="${value}"`}${i === 1 ? ' selected' : ''}>${p.travelerOptions[i]}</option>`).join('')}</select></label></div><label>${p.interests}<textarea name="interests" rows="3" maxlength="2000" placeholder="${p.interestsPlaceholder}"></textarea></label><label class="consent"><input type="checkbox" required/> ${p.consent}</label><button class="button" type="submit">${p.submit} ${arrow}</button><p class="form-note">${p.note}</p></form><div class="planner-wash" aria-hidden="true"></div></section>
  </main>
  ${footer(true, '/')}
  <dialog id="detail-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="${t.closeDialog}">×</button><div id="dialog-content"></div></dialog>
  <script type="application/json" id="app-words">${JSON.stringify(t.app).replaceAll('<', '\\u003c')}</script>
`;

  // A row of links to related pages, from the [type, slug] pairs in src/content.js.
  const find = ([type, slug]) => types[type].list.find(item => item.slug === slug);
  const related = (label, refs) => `<nav class="related" aria-label="${label}"><span class="small-label">${label}</span>${refs.map(ref => `<a ${link(ref[0], find(ref))}>${find(ref).title}</a>`).join('')}</nav>`;
  const render = {
    experience: (e, count) => { const d = find(['destination', e.where]); return {eyebrow: t.experience.eyebrow(count), lead: e.subtitle, text: e.description, extra: `<a class="text-link exp-down exp-next" ${link('destination', d)}>${t.explore(d.shortTitle || d.title)} ${arrow}</a>`, cta: t.experience.cta}; },
    journey: (j, count) => ({eyebrow: t.journey.eyebrow(j.duration, count), lead: j.route, text: j.description, extra: `<a class="text-link exp-down" href="#itinerary">${t.journey.hours} ${arrow}</a>`, cta: t.journey.cta, after: `<section id="itinerary" class="exp-itinerary"${j.accent?` data-accent="${j.accent}"`:''} aria-labelledby="itinerary-title"><span class="section-dash"></span><h2 id="itinerary-title">${t.journey.steps}</h2><ol>${j.days.map(([day,place,text])=>`<li><span>${day}</span><div><h3>${place}</h3><p>${text}</p></div></li>`).join('')}</ol>${j.details?`<h3 class="itinerary-sub">${t.journey.service}</h3><ol class="journey-details">${j.details.map(([k,v])=>`<li><span>${k}</span><div><p>${v}</p></div></li>`).join('')}</ol>`:''}${related(t.exploreMore, j.related)}<p class="form-note">${t.journey.outline}</p><a class="button" href="${planLink(j.title)}">${t.journey.cta} ${arrow}</a></section>`}),
    destination: (d, count) => ({eyebrow: t.destination.eyebrow(count), lead: d.tag, text: d.text, cta: t.destination.cta, after: `<section class="destination-editorial" aria-label="${t.explore(d.title)}"><div class="destination-intro"><span class="section-dash"></span><span class="small-label">${t.destination.sense(d.shortTitle || d.title)}</span><h2>${t.destination.deeper}</h2><p>${d.culture}</p></div><div class="destination-guide">${d.guide.map(([heading,...sentences])=>`<section><h2>${heading}</h2><p>${sentences.join(' ').replaceAll('href="/', `href="${root}/`)}</p></section>`).join('')}${related(t.experiencesHere, d.related)}</div><div class="destination-experiences"><h2 class="small-label">${t.destination.local}</h2><ol>${d.experiences.map((item,i)=>`<li><span>0${i+1}</span><h3>${item}</h3></li>`).join('')}</ol></div><div class="destination-gallery">${d.gallery.map((photo,i)=>image(photo,i===0?'galleryLead':'gallery')).join('')}</div><div class="destination-cta"><span class="eyebrow">${t.destination.personal}</span><h2>${t.destination.story}</h2><a class="button" href="${planLink(d.title)}">${t.destination.plan} ${arrow}</a></div></section>`}),
  };
  const exp = (photo, bar, foot, after = '') => `<main id="main"><article class="experience-page${bar.cls || ''}"${bar.accent?` data-accent="${bar.accent}"`:''} aria-labelledby="page-title"><div class="exp-hero"><div class="exp-photo">${picture(photo, fullBleedSizes(photo),`alt="${photoAlts[photo]}" fetchpriority="high"`)}</div><div class="exp-bar"><a class="wordmark" href="${root}/" aria-label="${t.footer.home}">sense<span class="logo-dot">.</span></a><a class="exp-back" href="${bar.back[0]}">${arrow}<span>${bar.back[1]}</span></a>${languageMenu(bar.page)}</div>${foot}</div>${after}</article></main>`;
  const detail = (type, i) => {
    const {list, back} = types[type], e = list[i], photo = e.hero || e.image, n = list.length, prev = list[(i-1+n)%n], next = list[(i+1)%n];
    const c = render[type](e, `0${i+1} / 0${n}`), cls = {destination: ' destination-page', experience: ' experience-detail'}[type] || '';
    return exp(photo, {cls, accent: e.accent, back, page: rest(type, e)}, `<div class="exp-foot"><div class="exp-copy"><span class="eyebrow">${c.eyebrow}</span><h1 id="page-title">${e.title}</h1><p class="exp-lead">${c.lead}</p><p>${c.text}</p>${c.extra || ''}<a class="button" href="${planLink(e.title)}">${c.cta} ${arrow}</a></div><nav class="exp-nav" aria-label="${t.pageNav}"><a ${link(type, prev)}>${arrow}<span><small>${t.previous}</small>${prev.title}</span></a><a ${link(type, next)}><span><small>${t.next}</small>${next.title}</span>${arrow}</a></nav></div>`, c.after) + (type === 'experience' ? '' : footer(false, rest(type, e), e.accent));
  };

  const org = {'@type': 'TravelAgency', '@id': `${SITE}/#org`, name: brand.name, alternateName: brand.alternateNames, url: `${SITE}${root}/`, logo: `${SITE}/icon-512.png`, image: ogImage('hero-desktop').url, description: t.description, slogan: t.slogan, sameAs: brand.sameAs, telephone: brand.phone, contactPoint: {'@type': 'ContactPoint', telephone: brand.phone, contactType: 'reservations', url: whatsapp}, address: {'@type': 'PostalAddress', addressCountry: 'TN'}, areaServed: {'@type': 'Country', name: 'Tunisia'}};
  const website = {'@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: brand.name, alternateName: brand.alternateNames, inLanguage: codes, publisher: {'@id': org['@id']}};
  const webPage = page => ({'@type': 'WebPage', '@id': `${SITE}${page.path}#webpage`, url: `${SITE}${page.path}`, name: page.title, inLanguage: lang, isPartOf: {'@id': website['@id']}, publisher: {'@id': org['@id']}, primaryImageOfPage: {'@type': 'ImageObject', url: ogImage(page.image).url}});
  const trip = (j, url) => ({'@type': 'TouristTrip', name: j.title, description: j.description, url, inLanguage: lang, image: ogImage(j.hero || j.image).url, itinerary: {'@type': 'ItemList', itemListElement: j.places.map((name, i) => ({'@type': 'ListItem', position: i + 1, item: {'@type': 'TouristAttraction', name}}))}, offers: {'@type': 'Offer', url, price: j.price, priceCurrency: 'EUR', description: t.offer, priceSpecification: {'@type': 'UnitPriceSpecification', price: j.price, priceCurrency: 'EUR', referenceQuantity: {'@type': 'QuantitativeValue', value: 1, unitText: 'person'}}}, provider: {'@id': org['@id']}});
  const faq = j => ({'@type': 'FAQPage', inLanguage: lang, mainEntity: j.details.map(([name, text]) => ({'@type': 'Question', name, acceptedAnswer: {'@type': 'Answer', text}}))});
  const destination = (d, url) => ({'@type': 'TouristDestination', name: d.title, description: d.text, url, image: ogImage(d.image).url, includesAttraction: d.places.map(name => ({'@type': 'TouristAttraction', name}))});
  const page = (rest, fields) => { const p = {lang, rest, path: root + rest, alt: photoAlts[fields.image], schema: [], ...fields}; return {...p, graph: [org, website, webPage(p), ...p.schema]}; };
  const detailPages = (type, ...schemas) => types[type].list.map((e, i) => {
    const url = SITE + path(type, e), index = e.index ?? true;
    return page(rest(type, e), {...e.seo, title: `${e.seo.title} | ${brand.name}`, index, image: e.hero || e.image, whatsapp: type === 'experience' ? t.greet.experience(e.title) : t.greet.page(e.title), schema: [...schemas.map(schema => schema(e, url)), ...(index ? [breadcrumb(lang, e.title, url)] : [])], body: shell(detail(type, i), false)});
  });
  return {
    pages: [
      page('/', {title: t.home.title, description: t.home.description, index: true, image: 'hero-desktop', whatsapp: t.greet.home, body: shell(home, true)}),
      ...detailPages('journey', trip, faq),
      ...detailPages('destination', destination),
      ...detailPages('experience'),
    ],
    notFound: page('/404.html', {title: `${t.notFound.title} | ${brand.name}`, description: t.notFound.description, index: false, image: 'sahara-dunes', whatsapp: t.greet.home, body: shell(exp('sahara-dunes', {cls: ' experience-detail', back: [`${root}/`, t.back.home], page: '/'}, `<div class="exp-foot"><div class="exp-copy"><span class="eyebrow">${t.notFound.title}</span><h1 id="page-title">${t.notFound.h1}</h1><p class="exp-lead">${t.notFound.lead}</p><p>${t.notFound.text}</p><a class="button" href="${root}/#discover">${t.notFound.button} ${arrow}</a></div></div>`) + footer(false, '/'), false)}),
  };
};
const sites = codes.map(site);
export const pages = sites.flatMap(s => s.pages);
export const notFounds = sites.map(s => s.notFound);

const attr = s => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
// Chrome fetches a page's HTML when a link to it is hovered. Inline, so the CSP allows it through 'inline-speculation-rules'.
const speculation = '<script type="speculationrules">{"prefetch":[{"where":{"and":[{"href_matches":"/*"},{"not":{"href_matches":"/img/*"}}]},"eagerness":"moderate"}]}</script>';
// A page's head tags: on an indexed page, its canonical address and the same page in every language (hreflang).
export const head = page => {
  const img = ogImage(page.image), {locale} = languages[page.lang];
  return [
    `<title>${attr(page.title)}</title>`,
    `<meta name="description" content="${attr(page.description)}" />`,
    ...(page.index ? [`<link rel="canonical" href="${SITE}${page.path}" />`, ...codes.map(code => `<link rel="alternate" hreflang="${code}" href="${SITE}${prefix(code)}${page.rest}" />`), `<link rel="alternate" hreflang="x-default" href="${SITE}${page.rest}" />`, '<meta name="robots" content="max-image-preview:large" />'] : ['<meta name="robots" content="noindex, follow" />']),
    `<meta property="og:site_name" content="${brand.name}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:title" content="${attr(page.title)}" />`,
    `<meta property="og:description" content="${attr(page.description)}" />`,
    `<meta property="og:url" content="${SITE}${page.path}" />`,
    `<meta property="og:image" content="${img.url}" />`,
    `<meta property="og:image:width" content="${img.width}" />`,
    `<meta property="og:image:height" content="${img.height}" />`,
    `<meta property="og:image:alt" content="${attr(page.alt)}" />`,
    `<script type="application/ld+json">${JSON.stringify({'@context': 'https://schema.org', '@graph': page.graph}).replaceAll('<', '\\u003c')}</script>`,
    speculation,
  ].join('\n    ');
};
