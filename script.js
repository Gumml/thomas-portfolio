
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
    "https://www.instagram.com/p/POST_1_URL/",
    "https://www.instagram.com/p/POST_2_URL/",
    "https://www.instagram.com/p/POST_3_URL/"
  ];

  const grid = document.querySelector('.portfolio-grid');
  if(hasConsent()){
    loadInstagram(urls);
  } else {
    grid.innerHTML = '';
    urls.forEach(u => grid.appendChild(buildConsentTile(u)));
  }
});
