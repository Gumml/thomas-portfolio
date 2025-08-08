
// Theme toggle
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
if(savedTheme === 'light') root.classList.add('light');
document.addEventListener('click',(e)=>{
  const t = e.target.closest('.theme-toggle'); if(!t) return;
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// Hide/show header on scroll
let lastY = window.scrollY;
const header = document.querySelector('.site-header');
window.addEventListener('scroll',()=>{
  const y = window.scrollY;
  if(y > lastY + 6 && y > 40) header.classList.add('hidden');
  else if(y < lastY - 6 || y <= 40) header.classList.remove('hidden');
  lastY = y;
});

// Nav bubble highlight
const nav = document.querySelector('.navlinks');
const links = Array.from(nav.querySelectorAll('a'));
const bubble = document.createElement('i');
bubble.className = 'navbubble pulse';
nav.appendChild(bubble);

function moveBubble(toEl, instant=false){
  const r = toEl.getBoundingClientRect();
  const nr = nav.getBoundingClientRect();
  const x = r.left - nr.left + nav.scrollLeft;
  const y = r.top - nr.top;
  bubble.style.width = r.width + 'px';
  bubble.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  if(instant) bubble.style.transition = 'none';
  else bubble.style.transition = '';
  setTimeout(()=> bubble.classList.remove('pulse'), 800);
}
let active = links[0]; moveBubble(active, true);

links.forEach(a=>{
  a.addEventListener('mouseenter', ()=> moveBubble(a));
  a.addEventListener('focus', ()=> moveBubble(a));
  a.addEventListener('click', ()=> { active = a; moveBubble(a); });
});
window.addEventListener('resize', ()=> moveBubble(active, true));

// Smooth scroll for hash links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const tgt = document.querySelector(a.getAttribute('href'));
    if(!tgt) return;
    e.preventDefault();
    tgt.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('shown'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Instagram consent embeds
const CONSENT_KEY = 'sv_external_consent';
function hasConsent(){ return localStorage.getItem(CONSENT_KEY) === 'true'; }
function grantConsent(){ localStorage.setItem(CONSENT_KEY, 'true'); location.reload(); }
function buildConsentTile(url){
  const tile = document.createElement('div');
  tile.className = 'glass embed-consent';
  tile.innerHTML = `<h3>Instagram-Inhalt</h3>
  <p>Beim Laden dieses Inhalts werden Daten an Instagram/Meta übertragen. Mehr dazu in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
    <a class="button" href="#" data-url="${url}">Nur diesen Beitrag laden</a>
    <a class="button primary" href="#" data-all="1">Immer externe Inhalte laden</a>
  </div>`;
  tile.querySelector('[data-url]').addEventListener('click', (e)=>{ e.preventDefault(); loadInstagram([url]); });
  tile.querySelector('[data-all]').addEventListener('click', (e)=>{ e.preventDefault(); grantConsent(); });
  return tile;
}
function loadInstagram(urls){
  const grid = document.querySelector('.portfolio-grid');
  grid.innerHTML='';
  urls.forEach(u=>{
    const bq = document.createElement('blockquote');
    bq.className = 'instagram-media glass';
    bq.setAttribute('data-instgrm-permalink', u);
    bq.setAttribute('data-instgrm-version', '14');
    bq.style.minHeight = '420px';
    grid.appendChild(bq);
  });
  const s = document.createElement('script');
  s.async = true; s.src = "https://www.instagram.com/embed.js";
  document.body.appendChild(s);
}
document.addEventListener('DOMContentLoaded', ()=>{
  const urls = [
    "https://www.instagram.com/p/DM2rkQho2En/",
    "https://www.instagram.com/p/DM5d0YZIsXf/",
    "https://www.instagram.com/p/DMvEE89Irov/"
  ];
  const grid = document.querySelector('.portfolio-grid');
  if(grid){
    if(hasConsent()) loadInstagram(urls);
    else { grid.innerHTML=''; urls.forEach(u=> grid.appendChild(buildConsentTile(u))); }
  }
});
