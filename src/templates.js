// Page markup as strings, from src/content.js. vite.config.js writes each page to static HTML at build time and renders
// it per request in dev; main.js adds the behaviour. Runs in Node only (it reads the map source from disk).
import { readFileSync } from 'node:fs';
import manifest from './image-manifest.json';
import { SITE, whatsapp, brand, experiences, journeys, destinations, alts } from './content.js';
import { base, srcset, fallbackSrc, coverSizes, fullBleedSizes, slots, heroSources, picture } from './images.js';

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5"/></svg>';
// Below-the-fold photos wait for the first frame after load (see main.js), so the hero gets the bandwidth first.
const image = (name, slot) => picture(name, coverSizes(name, slots[slot]), `alt="${alts[name]}" loading="lazy" decoding="async"`, 'media', true);
const types = {
  journey: {dir: 'journeys', list: journeys, back: ['/#journeys', 'All journeys']},
  destination: {dir: 'destinations', list: destinations, back: ['/#discover', 'Back to the atlas']},
  experience: {dir: 'experiences', list: experiences, back: ['/#experiences', 'All experiences']},
};
const path = (type, item) => `/${types[type].dir}/${item.slug}/`;
// Links to a detail page name its photo, which main.js starts fetching on hover.
const link = (type, item) => `href="${path(type, item)}" data-photo="${item.hero || item.image}"`;
// Detail pages send their call to action to the home page planner, which fills in the interest.
const planLink = interest => `/?interest=${encodeURIComponent(interest)}#plan`;
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
const atlasNames = {north:['Tunis &','the North'],coast:['The Mediterranean','Coast'],history:['The Historic Heart','Kairouan & El Jem'],oasis:['Tozeur &','the Oases'],sahara:['The Sahara'],island:['Djerba &','the South']};
const atlasLinks = Object.fromEntries(destinations.map(d => [d.key, link('destination', d)]));
const atlasSvg = mode => {
  const l=atlasLayouts[mode], [vx,vy,vw,vh]=l.view.split(' ').map(Number), id=`atlas-${mode}`, point=key=>{const [x,y]=atlasPoints[key];return [l.tx+x*l.scale,l.ty+y*l.scale];};
  const labels=destinations.map(d=>{const [mx,my]=point(d.key), [side,len]=l.labels[d.key], left=side==='left', end=left?mx-len:mx+len, nameLines=mode==='mobile'&&d.key==='coast'?['The','Mediterranean','Coast']:atlasNames[d.key], lh=mode==='mobile'?22:19, textX=left?end-10:end+10, textY=my-(nameLines.length-1)*lh/2+6;return `<a class="atlas-hotspot atlas-label region-${d.key}" data-atlas-region="${d.key}" ${link('destination', d)} aria-label="Explore ${d.title}"><line class="atlas-connector" x1="${left?end:mx+10}" y1="${my}" x2="${left?mx-10:end}" y2="${my}"/><g transform="translate(${mx} ${my})"><g class="atlas-marker"><circle class="atlas-marker-ring" r="10"/><circle class="atlas-marker-core" r="4"/></g></g><text class="atlas-label-text" x="${textX}" y="${textY}" text-anchor="${left?'end':'start'}">${nameLines.map((line,i)=>`<tspan x="${textX}" dy="${i?lh:0}" class="${i?'atlas-label-sub':''}">${line}</tspan>`).join('')}</text></a>`;}).join('');
  return `<svg class="atlas-map atlas-map-${mode}" viewBox="${l.view}" role="group" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">Interactive map of Tunisia</title><desc id="${id}-desc">Illustrated Tunisia with Algeria to the west, Libya to the southeast, and the Mediterranean along the north and east. Six selectable destinations: Tunis, the Mediterranean coast, Kairouan and El Jem, Tozeur, the Sahara, and Djerba.</desc><defs><radialGradient id="${id}-land-fade" cx="50%" cy="48%" r="68%"><stop offset="48%" stop-color="white"/><stop offset="100%" stop-color="black"/></radialGradient><mask id="${id}-land-edge"><rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="url(#${id}-land-fade)"/></mask><clipPath id="${id}-country"><path d="${tunisiaPath}"/></clipPath><mask id="${id}-water" maskUnits="userSpaceOnUse" x="-1000" y="-200" width="3000" height="1800"><rect x="-1000" y="-200" width="3000" height="1800" fill="white"/><g transform="translate(${l.tx} ${l.ty}) scale(${l.scale})" fill="black"><path d="${atlasLand}"/><path d="${atlasLandExtension}"/><path d="${tunisiaPath}"/></g></mask></defs><g mask="url(#${id}-land-edge)"><g transform="translate(${l.tx} ${l.ty}) scale(${l.scale})" class="atlas-landscape" aria-hidden="true"><path d="${atlasLand}" fill="#ebdcc5"/><path d="${atlasLandExtension}" fill="#ebdcc5"/><path class="atlas-neighbor-coast" d="${atlasCoastPath}"/><path class="atlas-neighbor-coast" d="M-600 ${atlasWest[1]+140}Q-250 ${atlasWest[1]+80} ${atlasWest[0]} ${atlasWest[1]}M738 755C850 770 960 805 1400 864"/></g></g><g mask="url(#${id}-water)"><g class="atlas-sea" mask="url(#${id}-land-edge)" aria-hidden="true"><rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="#c6e1e9"/></g></g><g class="atlas-country-group" transform="translate(${l.tx} ${l.ty}) scale(${l.scale})"><path class="atlas-country" d="${tunisiaPath}" fill="#ebdcc5"/><g clip-path="url(#${id}-country)" class="atlas-regions"><a data-atlas-region="north" ${atlasLinks.north} aria-label="Explore Tunis and the North"><path class="atlas-region region-north" d="M70 85H730V300H70Z"/></a><a data-atlas-region="history" ${atlasLinks.history} aria-label="Explore Kairouan and El Jem"><path class="atlas-region region-history" d="M70 300H455V565H70Z"/></a><a data-atlas-region="coast" ${atlasLinks.coast} aria-label="Explore the Mediterranean Coast"><path class="atlas-region region-coast" d="M455 300H745V565H455Z"/></a><a data-atlas-region="oasis" ${atlasLinks.oasis} aria-label="Explore Tozeur and the Oases"><path class="atlas-region region-oasis" d="M70 565H350V735H70Z"/></a><a data-atlas-region="island" ${atlasLinks.island} aria-label="Explore Djerba and the South"><path class="atlas-region region-island" d="M350 565H745V735H350Z"/></a><a data-atlas-region="sahara" ${atlasLinks.sahara} aria-label="Explore the Sahara"><path class="atlas-region region-sahara" d="M70 735H745V1190H70Z"/></a></g><path class="atlas-region-dividers" clip-path="url(#${id}-country)" d="M165 345Q340 320 520 345M160 560Q350 535 555 550M185 770Q350 730 590 790M455 345Q430 470 455 565M350 565Q380 670 350 770"/>${atlasArt}<path class="atlas-outline" d="${tunisiaPath}"/><g class="atlas-neighbors"><text x="35" y="490" text-anchor="middle">ALGERIA</text><text x="685" y="910" text-anchor="middle">LIBYA</text><path d="M-15 440l25-23 18 16 20-30 37 37M635 855l30-30 28 22 18-14 34 25"/></g></g>${labels}${l.compass?`<g class="atlas-compass" transform="translate(${l.compass})"><text y="-13">N</text><path d="M0 0v54M-10 28h20M0 0l-4 11 4-3 4 3Z"/></g>`:''}<g class="atlas-title" transform="translate(${l.title})"><path d="M-17 0h34"/><text text-anchor="middle" y="43">Discover</text><text text-anchor="middle" y="79">Tunisia.</text></g></svg>`;
};

const instagramIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>';
// The site footer, on every page: who Sense Tunisia is, Instagram and WhatsApp, and links to every section and
// destination. Elsewhere, the planner and privacy links lead to the home page (main.js opens the privacy dialog for #privacy).
const footer = home => { const to = home ? '' : '/'; return `<footer class="footer section-shell"><a href="${home ? '#top' : '/'}" class="wordmark" aria-label="${brand.name} home">sense<span class="logo-dot">.</span></a><p class="footer-tagline">${brand.description}</p><a class="footer-instagram" href="${brand.instagram}" target="_blank" rel="me noopener noreferrer">${instagramIcon}<span>Instagram @${brand.handle}</span></a><div class="footer-cols"><div><h3>Discover:</h3><a href="${to}#discover">Our Tunisia</a><a href="${to}#experiences">Experiences</a><a href="${to}#journeys">Our journeys</a></div><div><h3>Destinations:</h3>${destinations.map(d=>`<a ${link('destination', d)}>${d.shortTitle||d.title}</a>`).join('')}</div><div><h3>Contact:</h3><span>Tunisia, North Africa</span><a href="${whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp ${brand.phone}</a>${home ? '<button data-plan>Plan your journey</button>' : '<a href="/#plan">Plan your journey</a>'}</div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ${brand.name}</span>${home ? '<button id="privacy-button">Privacy & your data</button>' : '<a href="/#privacy">Privacy & your data</a>'}<span>Made for the curious.</span></div></footer>`; };

const home = `
  <header class="header" id="top">
    <a class="wordmark" href="#top">sense<span class="logo-dot">.</span><span class="wordmark-caption">Extraordinary Tunisia</span></a>
    <nav class="desktop-nav" aria-label="Main navigation">
      <a href="#discover" class="active">Destinations</a><a href="#experiences">Experiences</a><a href="#journeys">Our journeys</a>
    </nav>
    <button class="header-plan" data-plan>Start planning ${arrow}</button>
    <button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button>
  </header>
  <nav id="mobile-menu" class="mobile-menu" aria-label="Mobile navigation" hidden><a href="#discover">Destinations</a><a href="#experiences">Experiences</a><a href="#journeys">Our journeys</a><button class="button" data-plan>Start planning ${arrow}</button></nav>
  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <picture class="hero-photo"><source media="${heroSources[0].media}" type="image/avif" srcset="${srcset('hero-mobile','avif')}" sizes="${heroSources[0].sizes}"/><source media="${heroSources[0].media}" srcset="${srcset('hero-mobile','fallback')}" sizes="${heroSources[0].sizes}"/><source type="image/avif" srcset="${srcset('hero-desktop','avif')}" sizes="${heroSources[1].sizes}"/><img src="${fallbackSrc('hero-desktop')}" srcset="${srcset('hero-desktop','fallback')}" sizes="${heroSources[1].sizes}" alt="${alts['hero-desktop']}" width="1536" height="1024" fetchpriority="high" decoding="async"/></picture>
      <div class="hero-copy"><h1 id="hero-title">Tunisia, with a local host.</h1><p class="hero-subtitle">Private days and tailor-made trips, from the Tunis medina to the Sahara.</p><button class="button" data-plan>Plan your private journey ${arrow}</button></div>
      <a href="#discover" class="hero-scroll"><span>Let your curiosity lead</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v17m-5-5 5 5 5-5" stroke="currentColor" stroke-width="1.5"/></svg></a>
      <span class="hero-coordinate">33°27′ N &nbsp; 9°01′ E<br/><span>The Sahara, Tunisia</span></span>
      <div class="paint-border hero-paint" aria-hidden="true"></div>
    </section>

    <section id="discover" class="discover atlas-section" aria-labelledby="discover-title">
      <h2 id="discover-title" class="sr-only">Discover Tunisia</h2>
      <p class="atlas-instruction">Choose a place. Follow what moves you.</p>
      <div class="atlas-stage">
        ${atlasSvg('desktop')}
        ${atlasSvg('mobile')}
      </div>
    </section>

    <section class="landscape-interlude" aria-labelledby="interlude-title">${picture('beach-interlude', coverSizes('beach-interlude', slots.interlude), `alt="${alts['beach-interlude']}" loading="lazy" decoding="async"`, 'interlude-photo', true)}<div class="interlude-copy"><h2 id="interlude-title">Some places stay<br/>in your photographs.<br/>Others stay<br/>in your soul.</h2><p>Tunisia is the second kind.</p><span class="signature">The sense of a place.</span></div></section>

    <section id="experiences" class="experiences section-shell">
      <div class="experience-intro"><h2>Don’t just see Tunisia.<br/>Feel it.</h2><p>The scent of jasmine in a medina lane. The first bite of a family recipe. The silence after a Saharan sunset.</p><p>Go a little deeper. Meet the people. Follow what moves you.</p></div>
      <a class="image-tile adventure-tile" ${link('experience', experiences[0])}>${image(experiences[0].image,'adventure')}<span class="tile-copy"><span class="tile-kicker">${experiences[0].kicker}</span><span class="tile-title">Adventure</span></span><span class="tile-arrow">${arrow}</span></a>
      <div id="experience-grid" class="experience-grid">${experiences.slice(1).map(e=>`<a class="image-tile" ${link('experience', e)}>${image(e.image,'tile')}<span class="tile-copy"><span class="tile-kicker">${e.kicker}</span><span class="tile-title">${e.title}</span></span><span class="tile-arrow">${arrow}</span></a>`).join('')}</div>
    </section>

    <section id="journeys" class="journeys section-shell"><div class="section-heading"><div><span class="section-dash"></span><span class="small-label">${brand.name} signature days</span><h2>A little inspiration.</h2></div><p>Every journey starts with a spark. Here are a few of ours. <br/>Made to inspire. Always made your own.</p></div><div class="journey-grid">${journeys.map((j,i)=>`<article class="journey-card"${j.accent?` data-accent="${j.accent}"`:''}><a class="journey-image" ${link('journey', j)} aria-label="Explore ${j.title}, ${j.duration} of discovery">${image(j.image,'journey')}<span class="duration">${j.duration} of discovery</span></a><div class="journey-body"><a class="journey-body-link" ${link('journey', j)}><span class="small-label">${j.route}</span><h3>${j.title}</h3><p>${j.description}</p></a><a class="text-link" ${link('journey', j)}>Explore this journey ${arrow}</a></div></article>`).join('')}</div><p class="journey-note">A starting point, never a fixed itinerary. Every detail can be shaped around you.</p></section>

    <section id="plan" class="planner-section" aria-labelledby="plan-title"><span class="section-dash"></span><span class="small-label">A journey, made personal</span><h2 id="plan-title">What does your<br/>Tunisia look like?</h2><p>Tell us a little about your kind of escape. Save a trip brief to keep your ideas together.</p><form id="planner-form"><div class="form-grid"><label>Your name<input name="name" required autocomplete="given-name" maxlength="100" placeholder="First name"/></label><label>Email address<input name="email" type="email" required autocomplete="email" maxlength="254" placeholder="you@example.com"/></label><label>When would you like to go?<input name="month" type="month"/></label><label>Who’s coming?<select name="travelers"><option>Just me</option><option selected>Two travelers</option><option>Family</option><option>A group of friends</option></select></label></div><label>What’s calling you?<textarea name="interests" rows="3" maxlength="2000" placeholder="Desert nights, local food, a place by the sea…"></textarea></label><label class="consent"><input type="checkbox" required/> I understand this saves my brief on this device; nothing is sent until I choose to send it on WhatsApp.</label><button class="button" type="submit">Save my trip brief ${arrow}</button><p class="form-note">Your details stay in this browser until you send them. You can download or delete your brief at any time.</p></form><div class="planner-wash" aria-hidden="true"></div></section>
  </main>
  ${footer(true)}
  <dialog id="detail-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Close dialog">×</button><div id="dialog-content"></div></dialog>
`;

// A row of links to related pages, from the [type, slug] pairs in src/content.js.
const find = ([type, slug]) => types[type].list.find(item => item.slug === slug);
const related = (label, refs) => `<nav class="related" aria-label="${label}"><span class="small-label">${label}</span>${refs.map(ref => `<a ${link(ref[0], find(ref))}>${find(ref).title}</a>`).join('')}</nav>`;
const render = {
  experience: (e, count) => { const d = find(['destination', e.where]); return {eyebrow: `Experience Tunisia · ${count}`, lead: e.subtitle, text: e.description, extra: `<a class="text-link exp-down exp-next" ${link('destination', d)}>Explore ${(d.shortTitle || d.title).replace(/^The /, 'the ')} ${arrow}</a>`, cta: 'Make this part of my trip'}; },
  journey: (j, count) => ({eyebrow: `A ${brand.name} signature day · ${j.duration} · ${count}`, lead: j.route, text: j.description, extra: `<a class="text-link exp-down" href="#itinerary">See the day, hour by hour ${arrow}</a>`, cta: 'Make this day mine', after: `<section id="itinerary" class="exp-itinerary"${j.accent?` data-accent="${j.accent}"`:''} aria-labelledby="itinerary-title"><span class="section-dash"></span><h2 id="itinerary-title">The day, step by step.</h2><ol>${j.days.map(([day,place,text])=>`<li><span>${day}</span><div><h3>${place}</h3><p>${text}</p></div></li>`).join('')}</ol>${j.details?`<h3 class="itinerary-sub">The service, in detail.</h3><ol class="journey-details">${j.details.map(([k,v])=>`<li><span>${k}</span><div><p>${v}</p></div></li>`).join('')}</ol>`:''}${related('Explore more', j.related)}<p class="form-note">An illustrative outline. Final arrangements, availability, and pricing are confirmed when we shape the day around you.</p><a class="button" href="${planLink(j.title)}">Make this day mine ${arrow}</a></section>`}),
  destination: (d, count) => ({eyebrow: `Discover Tunisia · ${count}`, lead: d.tag, text: d.text, cta: 'Plan a journey here', after: `<section class="destination-editorial" aria-label="Explore ${d.title}"><div class="destination-intro"><span class="section-dash"></span><span class="small-label">The sense of ${d.shortTitle || d.title}</span><h2>Go deeper.<br/>Stay curious.</h2><p>${d.culture}</p></div><div class="destination-guide">${d.guide.map(([heading,...sentences])=>`<section><h2>${heading}</h2><p>${sentences.join(' ')}</p></section>`).join('')}${related('Experiences here', d.related)}</div><div class="destination-experiences"><h2 class="small-label">Local experiences</h2><ol>${d.experiences.map((item,i)=>`<li><span>0${i+1}</span><h3>${item}</h3></li>`).join('')}</ol></div><div class="destination-gallery">${d.gallery.map((photo,i)=>image(photo,i===0?'galleryLead':'gallery')).join('')}</div><div class="destination-cta"><span class="eyebrow">Your Tunisia, made personal</span><h2>Let this place become part of your story.</h2><a class="button" href="${planLink(d.title)}">Plan my journey ${arrow}</a></div></section>`}),
};
const detail = (type, i) => {
  const {list, back} = types[type], e = list[i], photo = e.hero || e.image, n = list.length, prev = list[(i-1+n)%n], next = list[(i+1)%n];
  const c = render[type](e, `0${i+1} / 0${n}`), cls = {destination: ' destination-page', experience: ' experience-detail'}[type] || '';
  return `<main id="main"><article class="experience-page${cls}"${e.accent?` data-accent="${e.accent}"`:''} aria-labelledby="page-title"><div class="exp-hero"><div class="exp-photo">${picture(photo, fullBleedSizes(photo),`alt="${alts[photo]}" fetchpriority="high"`)}</div><div class="exp-bar"><a class="wordmark" href="/" aria-label="${brand.name} home">sense<span class="logo-dot">.</span></a><a class="exp-back" href="${back[0]}">${arrow}<span>${back[1]}</span></a></div><div class="exp-foot"><div class="exp-copy"><span class="eyebrow">${c.eyebrow}</span><h1 id="page-title">${e.title}</h1><p class="exp-lead">${c.lead}</p><p>${c.text}</p>${c.extra || ''}<a class="button" href="${planLink(e.title)}">${c.cta} ${arrow}</a></div><nav class="exp-nav" aria-label="More pages like this"><a ${link(type, prev)}>${arrow}<span><small>Previous</small>${prev.title}</span></a><a ${link(type, next)}><span><small>Next</small>${next.title}</span>${arrow}</a></nav></div></div>${c.after || ''}</article></main>${footer(false)}`;
};

// Structured data (schema.org JSON-LD): every page carries one connected graph of the business, the website and the page
// itself. The share image is the page photo's smallest JPEG of at least 1200px, or its largest.
const ogImage = name => { const {width, height, fallback} = manifest[name], [w, ext] = fallback.find(([w]) => w >= 1200) ?? fallback.at(-1); return {url: `${SITE}${base(name, w)}.${ext}`, width: w, height: Math.round(w * height / width)}; };
const org = {'@type': 'TravelAgency', '@id': `${SITE}/#org`, name: brand.name, alternateName: brand.alternateNames, url: `${SITE}/`, logo: `${SITE}/icon-512.png`, image: ogImage('hero-desktop').url, description: brand.description, slogan: brand.slogan, sameAs: brand.sameAs, telephone: brand.phone, contactPoint: {'@type': 'ContactPoint', telephone: brand.phone, contactType: 'reservations', url: whatsapp}, address: {'@type': 'PostalAddress', addressCountry: 'TN'}, areaServed: {'@type': 'Country', name: 'Tunisia'}};
const website = {'@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: brand.name, alternateName: brand.alternateNames, inLanguage: 'en', publisher: {'@id': org['@id']}};
const webPage = page => ({'@type': 'WebPage', '@id': `${SITE}${page.path}#webpage`, url: `${SITE}${page.path}`, name: page.title, inLanguage: 'en', isPartOf: {'@id': website['@id']}, publisher: {'@id': org['@id']}, primaryImageOfPage: {'@type': 'ImageObject', url: ogImage(page.image).url}});
const trip = (j, url) => ({'@type': 'TouristTrip', name: j.title, description: j.description, url, image: ogImage(j.hero || j.image).url, itinerary: {'@type': 'ItemList', itemListElement: j.places.map((name, i) => ({'@type': 'ListItem', position: i + 1, item: {'@type': 'TouristAttraction', name}}))}, offers: {'@type': 'Offer', url, price: j.price, priceCurrency: 'EUR', description: 'Starting price per person, based on two guests', priceSpecification: {'@type': 'UnitPriceSpecification', price: j.price, priceCurrency: 'EUR', referenceQuantity: {'@type': 'QuantitativeValue', value: 1, unitText: 'person'}}}, provider: {'@id': org['@id']}});
const faq = j => ({'@type': 'FAQPage', mainEntity: j.details.map(([name, text]) => ({'@type': 'Question', name, acceptedAnswer: {'@type': 'Answer', text}}))});
const destination = (d, url) => ({'@type': 'TouristDestination', name: d.title, description: d.text, url, image: ogImage(d.image).url, includesAttraction: d.places.map(name => ({'@type': 'TouristAttraction', name}))});
const breadcrumb = (name, url) => ({'@type': 'BreadcrumbList', itemListElement: [{'@type': 'ListItem', position: 1, name: brand.name, item: `${SITE}/`}, {'@type': 'ListItem', position: 2, name, item: url}]});

// Every page: its URL, title (ending with the brand), head tags (see head below), the WhatsApp message its chat links
// start with, its own structured data, and its markup.
const detailPages = (type, ...schemas) => types[type].list.map((e, i) => {
  const url = SITE + path(type, e), index = e.index ?? true;
  return {path: path(type, e), ...e.seo, title: `${e.seo.title} | ${brand.name}`, index, image: e.hero || e.image, whatsapp: `Hi ${brand.name}, I’m interested in ${type === 'experience' ? `the ${e.title} experience` : e.title}.`, schema: [...schemas.map(schema => schema(e, url)), ...(index ? [breadcrumb(e.title, url)] : [])], body: detail(type, i)};
});
export const pages = [
  {path: '/', title: `${brand.name} | Private Tours & Tailor-Made Trips`, description: `${brand.name} designs private, host-led days and tailor-made trips across Tunisia: the Tunis medina, Carthage, Sidi Bou Saïd, the Sahara and Djerba.`, index: true, image: 'hero-desktop', whatsapp: `Hi ${brand.name}, I’d like to plan a trip to Tunisia.`, schema: [], body: home},
  ...detailPages('journey', trip, faq),
  ...detailPages('destination', destination),
  ...detailPages('experience'),
];
export const notFound = {path: '/404.html', title: `Page not found | ${brand.name}`, description: 'This page wandered off. Find your way back to the atlas of Tunisia, our signature days and every experience from the medina to the Sahara.', index: false, image: 'sahara-dunes', whatsapp: `Hi ${brand.name}, I’d like to plan a trip to Tunisia.`, schema: [], body: `<main id="main"><article class="experience-page experience-detail" aria-labelledby="page-title"><div class="exp-hero"><div class="exp-photo">${picture('sahara-dunes', fullBleedSizes('sahara-dunes'), `alt="${alts['sahara-dunes']}" fetchpriority="high"`)}</div><div class="exp-bar"><a class="wordmark" href="/" aria-label="${brand.name} home">sense<span class="logo-dot">.</span></a><a class="exp-back" href="/">${arrow}<span>Back home</span></a></div><div class="exp-foot"><div class="exp-copy"><span class="eyebrow">Page not found</span><h1 id="page-title">This path wandered off.</h1><p class="exp-lead">The page you were looking for isn’t here.</p><p>Choose a place on the atlas, or start from one of our signature days.</p><a class="button" href="/#discover">Explore the atlas ${arrow}</a></div></div></div></article></main>${footer(false)}`};

const attr = s => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
// Chrome fetches a page's HTML when a link to it is hovered. Inline, so the CSP allows it through 'inline-speculation-rules'.
const speculation = '<script type="speculationrules">{"prefetch":[{"where":{"and":[{"href_matches":"/*"},{"not":{"href_matches":"/img/*"}}]},"eagerness":"moderate"}]}</script>';
// A page's head tags.
export const head = page => {
  const img = ogImage(page.image);
  return [
    `<title>${attr(page.title)}</title>`,
    `<meta name="description" content="${attr(page.description)}" />`,
    ...(page.index ? [`<link rel="canonical" href="${SITE}${page.path}" />`, '<meta name="robots" content="max-image-preview:large" />'] : ['<meta name="robots" content="noindex, follow" />']),
    `<meta property="og:site_name" content="${brand.name}" />`,
    `<meta property="og:title" content="${attr(page.title)}" />`,
    `<meta property="og:description" content="${attr(page.description)}" />`,
    `<meta property="og:url" content="${SITE}${page.path}" />`,
    `<meta property="og:image" content="${img.url}" />`,
    `<meta property="og:image:width" content="${img.width}" />`,
    `<meta property="og:image:height" content="${img.height}" />`,
    `<meta property="og:image:alt" content="${attr(alts[page.image])}" />`,
    `<script type="application/ld+json">${JSON.stringify({'@context': 'https://schema.org', '@graph': [org, website, webPage(page), ...page.schema]}).replaceAll('<', '\\u003c')}</script>`,
    speculation,
  ].join('\n    ');
};
