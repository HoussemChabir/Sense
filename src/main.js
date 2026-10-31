import { srcset, fullBleedSizes } from './images.js';
import { whatsapp, brand } from './content.js';

// Every page arrives as static HTML (src/templates.js); this adds the behaviour.
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5"/></svg>';
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
// Escape leaves a detail page the way its back link does.
if (detailPage) document.addEventListener('keydown', e => {if (e.key === 'Escape') location.href = detailPage.querySelector('.exp-back').href;});

// The home page: dialog, trip planner, menu and atlas.
if (plannerForm) {
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
  if (interest) {plannerForm.elements.interests.value = interest; history.replaceState(null, '', `/${location.hash}`);}
  // After load, as the browser's own jump to #plan resets focus (and replaceState above cancels the jump itself).
  if (location.hash === '#plan') addEventListener('load', () => setTimeout(showPlanner), {once:true});
  // The brief reaches Sense Tunisia only when the visitor sends it on WhatsApp.
  const sendLink = brief => `<a class="button" href="${whatsapp}?text=${encodeURIComponent(`Hi ${brand.name}, here is my Tunisia trip brief.\n\n${brief}`)}" target="_blank" rel="noopener noreferrer">Send my brief on WhatsApp ${arrow}</a>`;
  plannerForm.addEventListener('submit',e=>{
    e.preventDefault();const values=Object.fromEntries(new FormData(e.target));
    const brief=`Name: ${values.name}\nEmail: ${values.email}\nMonth: ${values.month||'Flexible'}\nTravelers: ${values.travelers}\n\nInterests:\n${values.interests||'Open to discovery'}`;
    try{localStorage.setItem('sense-trip-draft',JSON.stringify(values));}catch{openDialog(`<div class="dialog-body"><h2 id="dialog-title">Your browser couldn’t save this brief.</h2><p>Allow local storage and try again, or send the brief to us on WhatsApp now.</p>${sendLink(brief)}</div>`);return;}
    openDialog(`<div class="dialog-body success-body"><span class="success-icon">✓</span><h2 id="dialog-title">Your Tunisia is taking shape.</h2><p>Your trip brief is saved on this device, ${safe(values.name)}. Send it to us on WhatsApp to start planning together.</p><dl class="brief-summary"><dt>When</dt><dd>${safe(values.month||'Flexible dates')}</dd><dt>Travelers</dt><dd>${safe(values.travelers)}</dd><dt>Your inspiration</dt><dd>${safe(values.interests||'Open to discovery')}</dd></dl>${sendLink(brief)}<button id="download-brief" class="text-link">Download my brief</button><button class="text-link" data-plan>Edit my brief</button><button id="delete-brief" class="quiet-button">Delete saved brief</button></div>`);
    document.querySelector('#download-brief').onclick=()=>{const blob=new Blob([`SENSE — YOUR TUNISIA TRIP BRIEF\n\n${brief}\n\nThis is a saved planning draft, not a confirmed booking or submitted enquiry.`],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='my-tunisia-trip-brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
    document.querySelector('#delete-brief').onclick=()=>{localStorage.removeItem('sense-trip-draft');plannerForm.reset();openDialog('<div class="dialog-body"><h2 id="dialog-title">Your brief has been deleted.</h2><p>The saved trip details have been removed from this browser.</p><button class="button" data-plan>Start a new brief</button></div>');};
  });

  document.addEventListener('click', e=>{if(e.target.closest('[data-plan]')){showPlanner();closeMenu();}});
  const menuToggle=document.querySelector('.menu-toggle');const mobileMenu=document.querySelector('#mobile-menu');
  function closeMenu(){mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open menu');document.body.classList.remove('menu-open');}
  menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';mobileMenu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu');document.body.classList.toggle('menu-open',open);});
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
  document.querySelector('#privacy-button').onclick=()=>{openDialog(`<div class="dialog-body"><h2 id="dialog-title">Your data stays with you.</h2><p>Your trip brief is saved in local storage on this device. It reaches ${brand.name} only if you choose to send it on WhatsApp, and no reservation is made.</p><p>There are no cookies or advertising trackers: we only measure anonymous page views and loading speed. All photography and fonts are served from this website. You can remove your saved details below.</p><button class="button" id="clear-data">Delete my saved details</button><p id="privacy-status" role="status"></p></div>`);document.querySelector('#clear-data').onclick=()=>{localStorage.removeItem('sense-trip-draft');plannerForm.reset();document.querySelector('#privacy-status').textContent=`All saved ${brand.name} details have been removed from this browser.`;};};
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
