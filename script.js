
// Two-click consent for external embeds (Instagram)
const CONSENT_KEY = 'sv_external_consent';
function hasConsent(){ return localStorage.getItem(CONSENT_KEY) === 'true'; }
function grantConsent(){ localStorage.setItem(CONSENT_KEY, 'true'); location.reload(); }

function buildConsentTile(url){
  const tile = document.createElement('div');
  tile.className = 'glass embed-consent';
  tile.innerHTML = `
    <h3>Instagram-Inhalt</h3>
    <p>Beim Laden dieses Inhalts werden Daten an Meta/Instagram übertragen. Mehr dazu in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p>
    <div>
      <a class="button" href="#" data-url="${url}">Nur diesen Beitrag laden</a>
      <a class="button primary" href="#" data-all="1">Immer externe Inhalte laden</a>
    </div>
  `;
  tile.querySelector('[data-url]').addEventListener('click', (e)=>{
    e.preventDefault();
    loadInstagram([url]);
  });
  tile.querySelector('[data-all]').addEventListener('click', (e)=>{
    e.preventDefault();
    grantConsent();
  });
  return tile;
}

function loadInstagram(urls){
  const grid = document.querySelector('.portfolio-grid');
  grid.innerHTML = '';
  urls.forEach(u => {
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

document.addEventListener('DOMContentLoaded', () =>{
  const urls = [
    "https://www.instagram.com/p/DM2rkQho2En/",
    "https://www.instagram.com/p/DM5d0YZIsXf/",
    "https://www.instagram.com/p/DMvEE89Irov/"
  ];

  const grid = document.querySelector('.portfolio-grid');
  if(hasConsent()){
    loadInstagram(urls);
  } else {
    grid.innerHTML = '';
    urls.forEach(u => grid.appendChild(buildConsentTile(u)));
  }
});


// === Micro-interactions pack (iOS-ish) ===

// Ripple on buttons
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.button');
  if(!btn) return;
  const r = document.createElement('span');
  r.className = 'ripple';
  const rect = btn.getBoundingClientRect();
  r.style.left = (e.clientX - rect.left) + 'px';
  r.style.top  = (e.clientY - rect.top) + 'px';
  btn.appendChild(r);
  setTimeout(()=>r.remove(), 650);
});

// Parallax blobs (subtle)
const blobs = document.createElement('div');
blobs.className = 'blobs';
blobs.innerHTML = '<i class="blob"></i><i class="blob b2"></i>';
document.body.appendChild(blobs);

// Cursor-based inertia
let tx=0, ty=0, cx=0, cy=0;
window.addEventListener('mousemove', (e)=>{
  tx = (e.clientX / window.innerWidth  - .5) * 20;
  ty = (e.clientY / window.innerHeight - .5) * 20;
});
function animate(){
  cx += (tx - cx) * 0.06;
  cy += (ty - cy) * 0.06;
  blobs.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
  requestAnimationFrame(animate);
}
animate();


// === Scroll parallax for panels ===
const parallaxEls = [];
document.querySelectorAll('.panel, .profile-wrap').forEach((el, i) => {
  el.dataset.parallax = (i % 2 === 0) ? '0.06' : '0.1'; // alternate strength
  parallaxEls.push(el);
});

function onScrollParallax(){
  const y = window.scrollY || 0;
  parallaxEls.forEach(el => {
    const s = parseFloat(el.dataset.parallax || '0.08');
    el.style.transform = `translateY(${y * s * -1}px)`;
  });
  requestAnimationFrame(onScrollParallax);
}
onScrollParallax();
