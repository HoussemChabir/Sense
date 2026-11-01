import { srcset, fullBleedSizes } from './images.js';
import { whatsapp } from './content.js';

// Every page arrives as static HTML (src/templates.js); this adds the behaviour.
const arrow = '<svg class="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5"/></svg>';
const detailPage = document.querySelector('.experience-page');
const atlasSection = document.querySelector('.atlas-section');
const plannerForm = document.querySelector('#planner-form');

// Start fetching a detail page's photo when a link to it is hovered, focused or touched, so it is there when the page opens.
const warm = e => {
  const name = e.target.closest?.('[data-photo]')?.dataset.photo;
  if (!name || document.querySelector(`link[data-warm="${name}"]`)) return;
  document.head.insertAdjacentHTML('beforeend', `<link rel="preload" as="image" type="image/avif" imagesrcset="${srcset(name, 'avif')}" imagesizes="${fullBleedSizes(name)}" data-warm="${name}">`);
};
for (const type of ['pointerover', 'focusin', 'touchstart']) document.addEventListener(type, warm, {passive:true});
// The language menu closes on a click outside it. Escape closes it, or else leaves a detail page the way its back link does.
document.addEventListener('click', e => document.querySelectorAll('.lang-menu[open]').forEach(menu => {if (!menu.contains(e.target)) menu.open = false;}));
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const menu = document.querySelector('.lang-menu[open]');
  if (menu) {menu.open = false; menu.querySelector('summary').focus();}
  else if (detailPage) location.href = detailPage.querySelector('.exp-back').href;
});

// The home page: dialog, trip planner, menu and atlas.
if (plannerForm) {
  // The words of this page's language, from src/i18n/ (written into the page by src/templates.js).
  const t = JSON.parse(document.querySelector('#app-words').textContent);
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
  const safe = str => String(str).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const getDraft = () => {try{return JSON.parse(localStorage.getItem('sense-trip-draft')||'{}');}catch{return {};}};
  const draft = getDraft();
  for (const [key, value] of Object.entries(draft)) if (plannerForm.elements[key]) plannerForm.elements[key].value = value;
  const focusPlanner = () => plannerForm.elements.name.focus({preventScroll:true});
  const showPlanner = () => {
    previousFocus = null;
    if (dialog.open) closeDialog();
    document.querySelector('#plan').scrollIntoView({behavior:'smooth'});
    focusPlanner();
  };
  // Detail pages link here as /?interest=<their title>#plan.
  const interest = new URLSearchParams(location.search).get('interest');
  if (interest) {plannerForm.elements.interests.value = interest; history.replaceState(null, '', location.pathname + location.hash);}
  // After load, as the browser's own jump to #plan resets focus (and replaceState above cancels the jump itself).
  if (location.hash === '#plan') addEventListener('load', () => setTimeout(showPlanner), {once:true});
  // The brief can also go on WhatsApp, to start planning right away or when it could not be sent below.
  const sendLink = brief => `<a class="button" href="${whatsapp}?text=${encodeURIComponent(`${t.briefIntro}\n\n${brief}`)}" target="_blank" rel="noopener noreferrer">${t.send} ${arrow}</a>`;
  plannerForm.addEventListener('submit',async e=>{
    e.preventDefault();const values=Object.fromEntries(new FormData(e.target));
    // The travellers' choice is saved in English; the brief shows it in this page's language.
    const travelers=plannerForm.elements.travelers.selectedOptions[0]?.text??values.travelers;
    const brief=`${t.briefName}: ${values.name}\n${t.briefEmail}: ${values.email}\n${t.briefMonth}: ${values.month||t.flexible}\n${t.briefTravelers}: ${travelers}\n\n${t.briefInterests}:\n${values.interests||t.open}`;
    // worker.js keeps the brief in Cloudflare D1 (not on the Vite dev server, so there it is only saved here).
    const button=plannerForm.querySelector('[type=submit]');button.disabled=true;
    const sent=await fetch('/api/brief',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,lang:document.documentElement.lang})}).then(r=>r.ok,()=>false);
    button.disabled=false;
    try{localStorage.setItem('sense-trip-draft',JSON.stringify(values));}catch{if(!sent){openDialog(`<div class="dialog-body"><h2 id="dialog-title">${t.unsavedTitle}</h2><p>${t.unsavedText}</p>${sendLink(brief)}</div>`);return;}}
    openDialog(`<div class="dialog-body success-body"><span class="success-icon">✓</span><h2 id="dialog-title">${t.savedTitle}</h2><p>${(sent?t.sentText:t.savedText).replace('{name}', safe(values.name))}</p><dl class="brief-summary"><dt>${t.when}</dt><dd>${safe(values.month||t.flexibleDates)}</dd><dt>${t.travelers}</dt><dd>${safe(travelers)}</dd><dt>${t.inspiration}</dt><dd>${safe(values.interests||t.open)}</dd></dl>${sendLink(brief)}<button id="download-brief" class="text-link">${t.download}</button><button class="text-link" data-plan>${t.edit}</button><button id="delete-brief" class="quiet-button">${t.delete}</button></div>`);
    document.querySelector('#download-brief').onclick=()=>{const blob=new Blob([`${t.fileTitle}\n\n${brief}\n\n${t.fileNote}`],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=t.fileName;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
    document.querySelector('#delete-brief').onclick=()=>{localStorage.removeItem('sense-trip-draft');plannerForm.reset();openDialog(`<div class="dialog-body"><h2 id="dialog-title">${t.deletedTitle}</h2><p>${t.deletedText}</p><button class="button" data-plan>${t.newBrief}</button></div>`);};
  });

  document.addEventListener('click', e=>{if(e.target.closest('[data-plan]')){showPlanner();closeMenu();}});
  const menuToggle=document.querySelector('.menu-toggle');const mobileMenu=document.querySelector('#mobile-menu');
  function closeMenu(){mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label',t.openMenu);document.body.classList.remove('menu-open');}
  menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';mobileMenu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?t.closeMenu:t.openMenu);document.body.classList.toggle('menu-open',open);});
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
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
  document.querySelector('#privacy-button').onclick=()=>{openDialog(`<div class="dialog-body"><h2 id="dialog-title">${t.privacyTitle}</h2>${t.privacyText.map(text=>`<p>${text}</p>`).join('')}<button class="button" id="clear-data">${t.clear}</button><p id="privacy-status" role="status"></p></div>`);document.querySelector('#clear-data').onclick=()=>{localStorage.removeItem('sense-trip-draft');plannerForm.reset();document.querySelector('#privacy-status').textContent=t.cleared;};};
  // Other pages' footers link to /#privacy.
  if(location.hash==='#privacy')document.querySelector('#privacy-button').click();
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){document.querySelectorAll('.desktop-nav a').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));}}},{rootMargin:'-15% 0px -65% 0px'});
  document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
}

// Once the page has loaded and an above-the-fold image is ready (the first photo decoded, or an image LCP entry; 2s at
// most), release the deferred photos (native lazy loading takes over) and the atlas art, so they never slow the hero.
// SVG <image> has no <picture>: the atlas art uses the format the hero <picture> proved this browser decodes.
const firstPhoto=document.querySelector('.hero-photo img, .exp-photo img');
const firstDecoded=firstPhoto.decode().catch(()=>{});
const imagePainted=PerformanceObserver.supportedEntryTypes?.includes('largest-contentful-paint')&&new Promise(r=>new PerformanceObserver((list,o)=>{if(list.getEntries().some(e=>e.url)){o.disconnect();r();}}).observe({type:'largest-contentful-paint',buffered:true}));
new Promise(r=>addEventListener('load',r,{once:true})).then(()=>Promise.race([firstDecoded,imagePainted,new Promise(r=>setTimeout(r,2000))])).then(()=>{
  for(const el of document.querySelectorAll('[data-srcset]')){el.srcset=el.dataset.srcset;el.removeAttribute('data-srcset');}
  for(const img of document.querySelectorAll('img[data-src]')){img.src=img.dataset.src;img.removeAttribute('data-src');}
  if(!atlasSection)return;
  const ext=document.querySelector('.hero-photo img').currentSrc.endsWith('.avif')?'avif':'webp';
  atlasSection.querySelectorAll('image[data-href]').forEach(i=>{i.setAttribute('href',`${i.dataset.href}.${ext}`);i.removeAttribute('data-href');});
});
// The loading screen (index.html, home page only) lifts once the first photo is decoded and the fonts are ready, or 2.5 s
// after navigation at most, so a slow connection never keeps the page hidden. The other photos load as they near the screen.
Promise.race([Promise.all([firstDecoded,document.fonts.ready]),new Promise(r=>setTimeout(r,Math.max(0,2500-performance.now())))]).then(()=>{document.body.classList.add('is-loaded');setTimeout(()=>document.querySelector('.loader')?.remove(),800);});
