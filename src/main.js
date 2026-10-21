import './style.css';
import tunisiaMapSource from '../assets/tunisia-outline-source.svg?raw';

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5"/></svg>';
const chevron = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4"/></svg>';
const image = (name, alt, cls = '', sizes = '(max-width: 700px) 100vw, 50vw') => `<img class="${cls}" src="/assets/${name}-960.webp" srcset="/assets/${name}-480.webp 480w, /assets/${name}-960.webp 960w" sizes="${sizes}" alt="${alt}" loading="lazy" width="1536" height="1024" />`;

const experiences = [
  {title:'Adventure', image:'exp-adventure', subtitle:'Follow the dunes. Find your own way.', description:'Leave the road behind at Douz and head into the Grand Erg Oriental. Walk the dunes with a local guide, share a slow-cooked dinner at camp, and let the desert sky set the pace.', details:['Guided dune walks around Douz','A night in a small desert camp','Routes shaped around your pace']},
  {title:'Culinary', image:'exp-culinary', subtitle:'A generous table. A thousand stories.', description:'Taste Tunisia through its kitchens: crisp brik, fragrant couscous, local olive oil, and the gentle heat of harissa. Browse a market, meet the makers, and sit down to a meal that takes its time.', details:['Market walks in Tunis','Home-style cooking experiences','Regional ingredients and traditions']},
  {title:'Culture', image:'exp-culture', subtitle:'Layers of history, lived every day.', description:'Follow the blue doors of Sidi Bou Saïd, explore the lanes of the Tunis medina, and stand among the remains of Carthage. Tunisia’s history is part of the everyday, from architecture to music and craft.', details:['Tunis medina with a local guide','Carthage and Sidi Bou Saïd','Art, architecture, and living traditions']},
  {title:'Family', image:'exp-family', subtitle:'Small discoveries. Big memories.', description:'Camel tracks, sand dunes, ancient arenas, and time by the sea. Build a family journey around curiosity, with shorter travel days, welcoming places to stay, and plenty of room to play.', details:['Flexible days and gentle adventures','Hands-on craft and food activities','Family-friendly desert experiences']},
  {title:'Ancient worlds', image:'exp-ancient-worlds', subtitle:'Take the long way back in time.', description:'Walk into the great amphitheatre at El Jem and imagine the scale of Roman Africa. Pair celebrated sites with quieter archaeological landscapes and guides who bring the details to life.', details:['El Jem’s Roman amphitheatre','The ancient city of Carthage','Optional extensions to Dougga']},
  {title:'Go local', image:'exp-go-local', subtitle:'The people make the place.', description:'Spend time with ceramic makers, market traders, and guides who know their hometowns by heart. These are unhurried encounters, made with respect for people’s work and daily lives.', details:['Ceramic traditions of Nabeul','Small workshops and neighborhood walks','Locally guided experiences']},
  {title:'Off the beaten path', image:'exp-off-the-beaten-path', subtitle:'Let curiosity lead.', description:'Explore the remarkable earth-carved courtyards around Matmata, the hilltop villages of the south, and landscapes that seem to belong to another world.', details:['Matmata’s troglodyte architecture','Southern village walks','Time for unexpected discoveries']},
];
const slug = e => e.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const journeys = [
  {title:'The family adventure', duration:'10 days', image:'family-desert', route:'Tunis · Tozeur · Douz · Djerba', description:'Camel trails, secret courtyards, and the sea. A little adventure for every generation.', days:[['Days 1–3','Tunis & the coast','Ease into Tunisia with the medina, Carthage, and the blue-and-white lanes of Sidi Bou Saïd.'],['Days 4–5','Tozeur & the oases','Explore palm groves and the mountain oasis landscapes around Chebika.'],['Days 6–7','Douz & the Sahara','Meet your guide, walk the dunes, and spend a night at a desert camp.'],['Days 8–10','Djerba','Slow down with island villages, craft workshops, and time on the beach.']]},
];
const regions = {
  north:{title:'Tunis & the North', tag:'Medinas, blue doors & ancient worlds', text:'Wander the medina, trace the history of Carthage, and watch the light change over Sidi Bou Saïd. A beautiful beginning.', image:'sidi-bou-said', experiences:['Tunis medina with a local storyteller','Carthage at the quietest hour','A slow afternoon in Sidi Bou Saïd'], culture:'Ottoman courtyards, Roman ruins and contemporary creative life meet in Tunisia’s layered capital.', gallery:['sidi-bou-said','courtyard-stay','artisan']},
  coast:{title:'The Mediterranean Coast', tag:'Sea air & slower days', text:'From the ceramics of Nabeul to long, sunlit lunches by the water, follow a coastline made for lingering.', image:'coastal-stay', experiences:['Ceramics and markets in Nabeul','A private coastal picnic','Harbour walks and hidden coves'], culture:'Fishing towns, garden villas and generations of ceramic craft give the coast its easy, lived-in character.', gallery:['coastal-stay','culinary','sidi-bou-said']},
  history:{title:'The Historic Heart Kairouan & El Jem', shortTitle:'The Historic Heart', tag:'Kairouan & El Jem', text:'Discover a quieter rhythm among monumental architecture, intricate craft, and one of the world’s great Roman amphitheatres.', image:'el-jem', experiences:['The Great Mosque of Kairouan','El Jem with an expert guide','Traditional weaving workshops'], culture:'Sacred architecture, scholarly traditions and Roman engineering reveal the depth of inland Tunisia.', gallery:['el-jem','exp-ancient-worlds','artisan']},
  oasis:{title:'Tozeur & the Oases', tag:'Palm groves & mountain springs', text:'Ochre brickwork, shaded date palms, and the dramatic oasis landscapes of Chebika. A different kind of desert discovery.', image:'oasis-panorama', experiences:['Walk Tozeur’s palm groves','Mountain oases at Chebika','Sunset over Chott el Djerid'], culture:'Distinctive brickwork, date-palm agriculture and desert water traditions shape everyday life around the oases.', gallery:['oasis-panorama','matmata','sahara-camp']},
  sahara:{title:'The Sahara', tag:'Douz & the Grand Erg Oriental', text:'Beyond Douz, the road gives way to a sea of sand. Walk with a local guide, find a quiet camp, and look up after dark.', image:'sahara-camp', experiences:['Dune walks with a local guide','A night beneath the stars','Tea and stories around the fire'], culture:'Nomadic knowledge, desert hospitality and an intimate understanding of the land guide every journey here.', gallery:['sahara-camp','exp-adventure','family-desert']},
  island:{title:'Djerba & the South', tag:'Island life & earth-carved villages', text:'Whitewashed villages, pottery workshops, and warm island light. Pair Djerba with the remarkable architecture of Matmata.', image:'matmata', experiences:['Pottery in Guellala','Djerba’s villages by bicycle','Earth-carved homes around Matmata'], culture:'Island communities, Amazigh heritage and southern building traditions create a region unlike anywhere else.', gallery:['matmata','coastal-stay','exp-culture']},
};
const destinations = Object.entries(regions).map(([key, region]) => ({key, ...region}));
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
const atlasIllustrations = {north:[190,130,-35,65],history:[195,145,-30,55],coast:[175,135,35,-5],oasis:[180,125,35,-45],sahara:[190,140,55,55],island:[165,120,-30,55]};
const atlasArt = Object.entries(atlasIllustrations).map(([key,[w,h,dx,dy]])=>{
  const [mx,my]=atlasPoints[key], width=w*.7, height=h*.7;
  return `<image class="atlas-illustration" data-illustration-region="${key}" href="/assets/atlas-beige-${key}.png" x="${mx+dx-width/2}" y="${my+dy-height/2}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"/>`;
}).join('');
const atlasLayouts = {
  desktop:{view:'-50 -30 1300 1000',tx:288.3,ty:-40.5,scale:.74,title:[620,850],compass:[985,560],labels:{north:['left',150],history:['left',150],coast:['right',90],island:['right',90],oasis:['left',100],sahara:['left',157]}},
  mobile:{view:'0 -50 720 970',tx:65.1,ty:-22.5,scale:.7,title:[360,815],labels:{north:['left',70],history:['left',70],coast:['right',70],island:['right',70],oasis:['left',75],sahara:['left',110]}}
};
const atlasNames = {north:['Tunis &','the North'],coast:['The Mediterranean','Coast'],history:['The Historic Heart','Kairouan & El Jem'],oasis:['Tozeur &','the Oases'],sahara:['The Sahara'],island:['Djerba &','the South']};
const atlasSvg = mode => {
  const l=atlasLayouts[mode], [vx,vy,vw,vh]=l.view.split(' ').map(Number), id=`atlas-${mode}`, point=key=>{const [x,y]=atlasPoints[key];return [l.tx+x*l.scale,l.ty+y*l.scale];};
  const labels=destinations.map(d=>{const [mx,my]=point(d.key), [side,len]=l.labels[d.key], left=side==='left', end=left?mx-len:mx+len, nameLines=mode==='mobile'&&d.key==='coast'?['The','Mediterranean','Coast']:atlasNames[d.key], lh=mode==='mobile'?22:19, textX=left?end-10:end+10, textY=my-(nameLines.length-1)*lh/2+6;return `<a class="atlas-hotspot atlas-label region-${d.key}" data-atlas-region="${d.key}" href="#destination/${slug(d)}" aria-label="Explore ${d.title}"><line class="atlas-connector" x1="${left?end:mx+10}" y1="${my}" x2="${left?mx-10:end}" y2="${my}"/><g class="atlas-marker" transform="translate(${mx} ${my})"><circle class="atlas-marker-ring" r="10"/><circle class="atlas-marker-core" r="4"/></g><text class="atlas-label-text" x="${textX}" y="${textY}" text-anchor="${left?'end':'start'}">${nameLines.map((line,i)=>`<tspan x="${textX}" dy="${i?lh:0}" class="${i?'atlas-label-sub':''}">${line}</tspan>`).join('')}</text></a>`;}).join('');
  return `<svg class="atlas-map atlas-map-${mode}" viewBox="${l.view}" role="group" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">Interactive map of Tunisia</title><desc id="${id}-desc">Illustrated Tunisia with Algeria to the west, Libya to the southeast, and the Mediterranean along the north and east. Six selectable destinations: Tunis, the Mediterranean coast, Kairouan and El Jem, Tozeur, the Sahara, and Djerba.</desc><defs><radialGradient id="${id}-land-fade" cx="50%" cy="48%" r="68%"><stop offset="48%" stop-color="white"/><stop offset="100%" stop-color="black"/></radialGradient><mask id="${id}-land-edge"><rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="url(#${id}-land-fade)"/></mask><clipPath id="${id}-country"><path d="${tunisiaPath}"/></clipPath><mask id="${id}-water" maskUnits="userSpaceOnUse" x="-1000" y="-200" width="3000" height="1800"><rect x="-1000" y="-200" width="3000" height="1800" fill="white"/><g transform="translate(${l.tx} ${l.ty}) scale(${l.scale})" fill="black"><path d="${atlasLand}"/><path d="${atlasLandExtension}"/><path d="${tunisiaPath}"/></g></mask></defs><g mask="url(#${id}-land-edge)"><g transform="translate(${l.tx} ${l.ty}) scale(${l.scale})" class="atlas-landscape" aria-hidden="true"><path d="${atlasLand}" fill="#ebdcc5"/><path d="${atlasLandExtension}" fill="#ebdcc5"/><path class="atlas-neighbor-coast" d="${atlasCoastPath}"/><path class="atlas-neighbor-coast" d="M-600 ${atlasWest[1]+140}Q-250 ${atlasWest[1]+80} ${atlasWest[0]} ${atlasWest[1]}M738 755C850 770 960 805 1400 864"/></g></g><g mask="url(#${id}-water)"><g class="atlas-sea" mask="url(#${id}-land-edge)" aria-hidden="true"><rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" fill="#c6e1e9"/></g></g><g class="atlas-country-group" transform="translate(${l.tx} ${l.ty}) scale(${l.scale})"><path class="atlas-country" d="${tunisiaPath}" fill="#ebdcc5"/><g clip-path="url(#${id}-country)" class="atlas-regions"><a data-atlas-region="north" href="#destination/tunis-the-north" aria-label="Explore Tunis and the North"><path class="atlas-region region-north" d="M70 85H730V300H70Z"/></a><a data-atlas-region="history" href="#destination/the-historic-heart-kairouan-el-jem" aria-label="Explore Kairouan and El Jem"><path class="atlas-region region-history" d="M70 300H455V565H70Z"/></a><a data-atlas-region="coast" href="#destination/the-mediterranean-coast" aria-label="Explore the Mediterranean Coast"><path class="atlas-region region-coast" d="M455 300H745V565H455Z"/></a><a data-atlas-region="oasis" href="#destination/tozeur-the-oases" aria-label="Explore Tozeur and the Oases"><path class="atlas-region region-oasis" d="M70 565H350V735H70Z"/></a><a data-atlas-region="island" href="#destination/djerba-the-south" aria-label="Explore Djerba and the South"><path class="atlas-region region-island" d="M350 565H745V735H350Z"/></a><a data-atlas-region="sahara" href="#destination/the-sahara" aria-label="Explore the Sahara"><path class="atlas-region region-sahara" d="M70 735H745V1190H70Z"/></a></g><path class="atlas-region-dividers" clip-path="url(#${id}-country)" d="M165 345Q340 320 520 345M160 560Q350 535 555 550M185 770Q350 730 590 790M455 345Q430 470 455 565M350 565Q380 670 350 770"/>${atlasArt}<path class="atlas-outline" d="${tunisiaPath}"/><g class="atlas-neighbors"><text x="35" y="490" text-anchor="middle">ALGERIA</text><text x="685" y="910" text-anchor="middle">LIBYA</text><path d="M-15 440l25-23 18 16 20-30 37 37M635 855l30-30 28 22 18-14 34 25"/></g></g>${labels}${l.compass?`<g class="atlas-compass" transform="translate(${l.compass})"><text y="-13">N</text><path d="M0 0v54M-10 28h20M0 0l-4 11 4-3 4 3Z"/></g>`:''}<g class="atlas-title" transform="translate(${l.title})"><path d="M-17 0h34"/><text text-anchor="middle" y="43">Discover</text><text text-anchor="middle" y="79">Tunisia.</text></g></svg>`;
};

document.querySelector('#app').innerHTML = `
  <header class="header" id="top">
    <a class="wordmark" href="#top" aria-label="Sense home">sense<span class="logo-dot">.</span><span class="wordmark-caption">Extraordinary Tunisia</span></a>
    <nav class="desktop-nav" aria-label="Main navigation">
      <a href="#discover" class="active">Tunisia</a><a href="#experiences">Experiences</a><a href="#journeys">Our journeys</a>
    </nav>
    <button class="header-plan" data-plan>Start planning ${arrow}</button>
    <button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button>
  </header>
  <nav id="mobile-menu" class="mobile-menu" aria-label="Mobile navigation" hidden><a href="#discover">Discover Tunisia</a><a href="#experiences">Experiences</a><a href="#journeys">Our journeys</a><button class="button" data-plan>Start planning ${arrow}</button></nav>
  <main>
    <section class="hero" aria-labelledby="hero-title">
      <picture class="hero-photo"><source media="(max-width: 700px)" srcset="/assets/hero-mobile-480.webp 480w, /assets/hero-mobile-800.webp 800w" sizes="100vw"/><img src="/assets/hero-desktop-1600.webp" srcset="/assets/hero-desktop-800.webp 800w, /assets/hero-desktop-1600.webp 1600w" sizes="100vw" alt="Two travelers looking across the golden dunes of the Tunisian Sahara" width="1536" height="1024" fetchpriority="high"/></picture>
      <div class="hero-copy"><span class="eyebrow">North Africa, a little closer</span><h1 id="hero-title">Tunisia.</h1><p class="hero-subtitle">A feeling. Not just a place.</p><p>Medina mornings. Mediterranean blues.<br/>Sahara nights that stay with you.<br/>Discover a Tunisia that’s entirely your own.</p><button class="button" data-plan>Find your Tunisia ${arrow}</button></div>
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

    <section class="landscape-interlude" aria-labelledby="interlude-title"><picture class="interlude-photo"><source media="(max-width: 700px)" srcset="/assets/beach-interlude-mobile-480.webp 480w, /assets/beach-interlude-mobile-800.webp 800w" sizes="100vw"/><img src="/assets/beach-interlude-desktop-1600.webp" srcset="/assets/beach-interlude-desktop-800.webp 800w, /assets/beach-interlude-desktop-1600.webp 1600w" sizes="100vw" alt="Aerial view of a turquoise Mediterranean bay with a crescent of sand dotted with colourful umbrellas" loading="lazy" width="1440" height="1800"/></picture><div class="interlude-copy"><h2 id="interlude-title">Some places stay<br/>in your photographs.<br/>Others stay<br/>in your soul.</h2><p>Tunisia is the second kind.</p><span class="signature">The sense of a place.</span></div></section>

    <section id="experiences" class="experiences section-shell">
      <div class="experience-intro"><h2>Don’t just see Tunisia.<br/>Feel it.</h2><p>The scent of jasmine in a medina lane. The first bite of a family recipe. The silence after a Saharan sunset.</p><p>Go a little deeper. Meet the people. Follow what moves you.</p><a class="text-link" href="#experience-grid">Find your kind of adventure ${arrow}</a></div>
      <a class="image-tile adventure-tile" href="#experience/${slug(experiences[0])}">${image(experiences[0].image,'A camel caravan crossing the golden dunes of the Sahara')}<span class="tile-copy"><span class="tile-kicker">Out here, you feel everything</span><span class="tile-title">Adventure</span></span><span class="tile-arrow">${arrow}</span></a>
      <div id="experience-grid" class="experience-grid">${experiences.slice(1).map(e=>`<a class="image-tile" href="#experience/${slug(e)}">${image(e.image,e.subtitle,'','(max-width: 700px) 100vw, 33vw')}<span class="tile-title">${e.title}</span><span class="tile-arrow">${arrow}</span></a>`).join('')}</div>
    </section>

    <section id="journeys" class="journeys section-shell"><div class="section-heading"><div><span class="section-dash"></span><h2>A little inspiration.</h2></div><p>Every journey starts with a spark. Here are a few of ours. <br/>Made to inspire. Always made your own.</p></div><div class="journey-grid">${journeys.map((j,i)=>`<article class="journey-card"><a class="journey-image" href="#journey/${slug(j)}" aria-label="Explore ${j.title}">${image(j.image,j.title,'','(max-width: 700px) 100vw, 33vw')}<span class="duration">${j.duration} of discovery</span></a><div class="journey-body"><span class="small-label">${j.route}</span><h3>${j.title}</h3><p>${j.description}</p><a class="text-link" href="#journey/${slug(j)}">Explore this journey ${arrow}</a></div></article>`).join('')}</div><p class="journey-note">A starting point, never a fixed itinerary. Every detail can be shaped around you.</p></section>

    <section id="plan" class="planner-section" aria-labelledby="plan-title"><span class="section-dash"></span><span class="small-label">A journey, made personal</span><h2 id="plan-title">What does your<br/>Tunisia look like?</h2><p>Tell us a little about your kind of escape. Save a trip brief to keep your ideas together.</p><form id="planner-form"><div class="form-grid"><label>Your name<input name="name" required autocomplete="given-name" maxlength="100" placeholder="First name"/></label><label>Email address<input name="email" type="email" required autocomplete="email" maxlength="254" placeholder="you@example.com"/></label><label>When would you like to go?<input name="month" type="month"/></label><label>Who’s coming?<select name="travelers"><option>Just me</option><option selected>Two travelers</option><option>Family</option><option>A group of friends</option></select></label></div><label>What’s calling you?<textarea name="interests" rows="3" maxlength="2000" placeholder="Desert nights, local food, a place by the sea…"></textarea></label><label class="consent"><input type="checkbox" required/> I understand this saves a draft on this device; it does not send a booking enquiry.</label><button class="button" type="submit">Save my trip brief ${arrow}</button><p class="form-note">Your details stay in this browser. You can download or delete your brief at any time.</p></form><div class="planner-wash" aria-hidden="true"></div></section>
  </main>
  <footer class="footer section-shell"><div class="footer-brand"><a href="#top" class="wordmark" aria-label="Sense home">sense<span class="logo-dot">.</span></a><p>Travel with feeling.</p><span>Tunisia, North Africa</span></div><div><h3>Discover</h3><a href="#discover">Our Tunisia</a><a href="#experiences">Experiences</a><a href="#journeys">Our journeys</a></div><div><h3>Stay a little longer</h3><button data-plan>Plan your journey</button></div><div class="footer-closing"><h3>Your next story starts here.</h3><button class="text-link" data-plan>Let’s make it yours ${arrow}</button><p>Thoughtful journeys.<br/>Extraordinary Tunisia.</p></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Sense Tunisia</span><span>Made for the curious.</span><button id="privacy-button">Privacy & your data</button></div></footer>
  <article id="detail-page" class="experience-page" aria-labelledby="page-title" hidden></article>
  <dialog id="detail-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Close dialog">×</button><div id="dialog-content"></div></dialog>
`;

const dialog = document.querySelector('#detail-dialog');
const dialogContent = document.querySelector('#dialog-content');
let previousFocus;
const openDialog = content => {
  previousFocus = document.activeElement;
  dialogContent.innerHTML = content;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
  dialog.scrollTop = 0;
};
const closeDialog = () => dialog.close();
dialog.querySelector('.dialog-close').addEventListener('click',closeDialog);
dialog.addEventListener('click', e => {if(e.target===dialog) {const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');previousFocus?.focus();});
const detailImage = (name,alt) => image(name,alt,'dialog-photo');
const detailPage = document.querySelector('#detail-page');
const sitePage = [document.querySelector('.header'), document.querySelector('main'), document.querySelector('.footer')];
const pages = {
  experience: {list: experiences, back: ['#experiences', 'All experiences'], render: (e, count) => ({eyebrow: `Experience Tunisia · ${count}`, lead: e.subtitle, text: e.description, extra: `<ul class="exp-details">${e.details.map(d=>`<li>${d}</li>`).join('')}</ul>`, cta: 'Make this part of my trip'})},
  journey: {list: journeys, back: ['#journeys', 'All journeys'], render: (j, count) => ({eyebrow: `A sample journey · ${j.duration} · ${count}`, lead: j.route, text: j.description, extra: `<button class="text-link exp-down" data-itinerary>See the day-by-day route ${arrow}</button>`, cta: 'Make this journey mine', after: `<section class="exp-itinerary" aria-labelledby="itinerary-title"><span class="section-dash"></span><h2 id="itinerary-title">The journey, step by step.</h2><ol>${j.days.map(([day,place,text])=>`<li><span>${day}</span><div><h3>${place}</h3><p>${text}</p></div></li>`).join('')}</ol><p class="form-note">This is an illustrative route. Travel arrangements, availability, and pricing require confirmation.</p><button class="button" data-plan data-interest="${j.title}">Make this journey mine ${arrow}</button></section>`})},
  destination: {list: destinations, back: ['#discover', 'Back to the atlas'], render: (d, count) => ({eyebrow: `Discover Tunisia · ${count}`, lead: d.tag, text: d.text, cta: 'Plan a journey here', after: `<section class="destination-editorial" aria-label="Explore ${d.title}"><div class="destination-intro"><span class="section-dash"></span><span class="small-label">The sense of ${d.shortTitle || d.title}</span><h2>Go deeper.<br/>Stay curious.</h2><p>${d.culture}</p></div><div class="destination-experiences"><span class="small-label">Local experiences</span><ol>${d.experiences.map((item,i)=>`<li><span>0${i+1}</span><h3>${item}</h3></li>`).join('')}</ol></div><div class="destination-gallery">${d.gallery.map((photo,i)=>image(photo,`${d.title} — destination photograph ${i+1}`,'',i===0?'(max-width: 700px) 100vw, 66vw':'(max-width: 700px) 50vw, 33vw')).join('')}</div><div class="destination-cta"><span class="eyebrow">Your Tunisia, made personal</span><h2>Let this place become part of your story.</h2><button class="button" data-plan data-interest="${d.title}">Plan my journey ${arrow}</button></div></section>`})},
};
const route = () => {
  const [, type, key] = location.hash.match(/^#(experience|journey|destination)\/(.+)$/) || [];
  const page = pages[type], i = page ? page.list.findIndex(e => slug(e) === key) : -1;
  const open = i >= 0;
  detailPage.hidden = !open;
  detailPage.classList.toggle('destination-page', open && type==='destination');
  document.body.classList.toggle('experience-open', open);
  sitePage.forEach(el => el.inert = open);
  if (!open) return document.getElementById(location.hash.slice(1))?.scrollIntoView();
  const {list, back} = page, e = list[i], n = list.length, prev = list[(i-1+n)%n], next = list[(i+1)%n];
  const c = page.render(e, `0${i+1} / 0${n}`);
  detailPage.innerHTML = `<div class="exp-hero"><div class="exp-photo"><img src="/assets/${e.image}-1600.webp" srcset="/assets/${e.image}-960.webp 960w, /assets/${e.image}-1600.webp 1536w" sizes="100vw" alt="${e.subtitle || e.title}" width="1536" height="1024" fetchpriority="high"/></div><div class="exp-bar"><a class="wordmark" href="#top" aria-label="Sense home">sense<span class="logo-dot">.</span></a><a class="exp-back" href="${back[0]}">${arrow}<span>${back[1]}</span></a></div><div class="exp-foot"><div class="exp-copy"><span class="eyebrow">${c.eyebrow}</span><h1 id="page-title" tabindex="-1">${e.title}</h1><p class="exp-lead">${c.lead}</p><p>${c.text}</p>${c.extra || ''}<button class="button" data-plan data-interest="${e.title}">${c.cta} ${arrow}</button></div><nav class="exp-nav" aria-label="More pages like this"><a href="#${type}/${slug(prev)}">${arrow}<span><small>Previous</small>${prev.title}</span></a><a href="#${type}/${slug(next)}"><span><small>Next</small>${next.title}</span>${arrow}</a></nav></div></div>${c.after || ''}`;
  detailPage.scrollTop = 0;
  detailPage.querySelector('h1').focus({preventScroll:true});
};
addEventListener('hashchange', route);
route();
const safe = str => String(str).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const getDraft = () => {try{return JSON.parse(localStorage.getItem('sense-trip-draft')||'{}');}catch{return {};}};
const plannerForm = document.querySelector('#planner-form');
const draft = getDraft();
for (const [key, value] of Object.entries(draft)) if (plannerForm.elements[key]) plannerForm.elements[key].value = value;
const focusPlanner = () => plannerForm.elements.name.focus({preventScroll:true});
const showPlanner = interest => {
  previousFocus = null;
  if (dialog.open) closeDialog();
  if (interest) plannerForm.elements.interests.value = interest;
  if (detailPage.hidden) {document.querySelector('#plan').scrollIntoView({behavior:'smooth'});focusPlanner();}
  else {addEventListener('hashchange', focusPlanner, {once:true});location.hash = '#plan';}
};
plannerForm.addEventListener('submit',e=>{
  e.preventDefault();const values=Object.fromEntries(new FormData(e.target));
  try{localStorage.setItem('sense-trip-draft',JSON.stringify(values));}catch{openDialog('<div class="dialog-body"><h2 id="dialog-title">Your browser couldn’t save this brief.</h2><p>Allow local storage and try again. Your enquiry has not been sent.</p></div>');return;}
  openDialog(`<div class="dialog-body success-body"><span class="success-icon">✓</span><h2 id="dialog-title">Your Tunisia is taking shape.</h2><p>Your trip brief is saved on this device, ${safe(values.name)}. It hasn’t been sent to a travel team.</p><dl class="brief-summary"><dt>When</dt><dd>${safe(values.month||'Flexible dates')}</dd><dt>Travelers</dt><dd>${safe(values.travelers)}</dd><dt>Your inspiration</dt><dd>${safe(values.interests||'Open to discovery')}</dd></dl><button id="download-brief" class="button">Download my brief ${arrow}</button><button class="text-link" data-plan>Edit my brief</button><button id="delete-brief" class="quiet-button">Delete saved brief</button></div>`);
  document.querySelector('#download-brief').onclick=()=>{const blob=new Blob([`SENSE — YOUR TUNISIA TRIP BRIEF\n\nName: ${values.name}\nEmail: ${values.email}\nMonth: ${values.month||'Flexible'}\nTravelers: ${values.travelers}\n\nInterests:\n${values.interests}\n\nThis is a saved planning draft, not a confirmed booking or submitted enquiry.`],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='my-tunisia-trip-brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  document.querySelector('#delete-brief').onclick=()=>{localStorage.removeItem('sense-trip-draft');plannerForm.reset();openDialog('<div class="dialog-body"><h2 id="dialog-title">Your brief has been deleted.</h2><p>The saved trip details have been removed from this browser.</p><button class="button" data-plan>Start a new brief</button></div>');};
});

document.addEventListener('click', e=>{
  const plan=e.target.closest('[data-plan]');if(plan){showPlanner(plan.dataset.interest);closeMenu();}
  if(e.target.closest('[data-itinerary]'))detailPage.querySelector('.exp-itinerary').scrollIntoView({behavior:'smooth'});
});
const menuToggle=document.querySelector('.menu-toggle');const mobileMenu=document.querySelector('#mobile-menu');
function closeMenu(){mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open menu');document.body.classList.remove('menu-open');}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';mobileMenu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu');document.body.classList.toggle('menu-open',open);});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;closeMenu();if(!detailPage.hidden&&!dialog.open)location.hash=detailPage.querySelector('.exp-back').hash;});
const atlasSection=document.querySelector('.atlas-section');
const setAtlasRegion=key=>{
  atlasSection.querySelectorAll('[data-atlas-region]').forEach(el=>el.classList.toggle('is-active',Boolean(key)&&el.dataset.atlasRegion===key));
  atlasSection.classList.toggle('has-active-region',Boolean(key));
};
atlasSection.querySelectorAll('[data-atlas-region]').forEach(el=>{
  el.addEventListener('pointerenter',()=>setAtlasRegion(el.dataset.atlasRegion));
  el.addEventListener('pointerleave',()=>setAtlasRegion());
  el.addEventListener('focus',()=>setAtlasRegion(el.dataset.atlasRegion));
  el.addEventListener('blur',()=>setAtlasRegion());
});
if('IntersectionObserver' in window){new IntersectionObserver(([entry],observer)=>{if(entry.isIntersecting){atlasSection.classList.add('is-visible');observer.disconnect();}},{threshold:.18}).observe(atlasSection);}else atlasSection.classList.add('is-visible');
document.querySelector('#privacy-button').onclick=()=>{openDialog('<div class="dialog-body"><h2 id="dialog-title">Your data stays with you.</h2><p>This website preview saves your trip brief in local storage on this device only. It does not send them to a server, or make a reservation.</p><p>There are no advertising trackers. All photography and fonts are served from this website. You can remove your saved details below.</p><button class="button" id="clear-data">Delete my saved details</button><p id="privacy-status" role="status"></p></div>');document.querySelector('#clear-data').onclick=()=>{localStorage.removeItem('sense-trip-draft');plannerForm.reset();document.querySelector('#privacy-status').textContent='All saved Sense details have been removed from this browser.';};};
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){document.querySelectorAll('.desktop-nav a').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));}}},{rootMargin:'-15% 0px -65% 0px'});
document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));



