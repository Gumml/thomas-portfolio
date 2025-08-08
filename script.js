
// scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
},{ threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// animated decals
const decalLayer = document.createElement('div');
decalLayer.style.position='fixed';
decalLayer.style.inset='0';
decalLayer.style.pointerEvents='none';
decalLayer.style.zIndex='-1';
document.body.appendChild(decalLayer);

function random(min,max){ return Math.random()*(max-min)+min; }

for(let i=0;i<36;i++){
  const d = document.createElement('span');
  const size = random(60,200);
  d.style.position='absolute';
  d.style.left = random(-50, 98) + 'vw';
  d.style.top = random(-20, 110) + 'vh';
  d.style.width = size + 'px';
  d.style.height = (size*0.18) + 'px';
  d.style.border = '1px solid rgba(255,255,255,.12)';
  d.style.borderRadius = random(6,20) + 'px';
  d.style.background = 'linear-gradient(90deg, rgba(255,255,255,.08), rgba(255,255,255,.0))';
  d.style.transform = `rotate(${random(-25,25)}deg)`;
  d.style.animation = `float ${random(8,20)}s ease-in-out ${random(-4,4)}s infinite alternate`;
  decalLayer.appendChild(d);
}

const sty = document.createElement('style');
sty.textContent = `@keyframes float{ from{ transform: translateY(0) rotate(var(--r,0deg)); } to{ transform: translateY(-10px) rotate(var(--r,0deg)); } }`;
document.head.appendChild(sty);

// instagram embed loader
(function(){
  const s = document.createElement('script');
  s.async = true;
  s.src = "https://www.instagram.com/embed.js";
  document.body.appendChild(s);
})();



// === Extra Motion Pass ===

// Parallax mouse reaction for speed-lines & decals
let mx = 0, my = 0;
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;
  mx = x * 20; my = y * 20;
});

function updateParallax(){
  // translate speed-lines and decal layer subtly
  const sl = document.querySelector('.speed-lines');
  const dl = document.querySelector('body > div[style*="pointer-events:none"]'); // decal layer inserted earlier
  if(sl){ sl.style.transform = `translate3d(${mx}px, ${my}px, 0)`; }
  if(dl){ dl.style.transform = `translate3d(${mx*0.6}px, ${my*0.6}px, 0)`; }
  requestAnimationFrame(updateParallax);
}
updateParallax();

// Spark particles (subtle)
const sparkLayer = document.createElement('div');
sparkLayer.className = 'spark-layer';
document.body.appendChild(sparkLayer);
for(let i=0; i<80; i++){
  const s = document.createElement('i');
  s.className = 'spark';
  s.style.left = Math.random()*100 + 'vw';
  s.style.top = Math.random()*100 + 'vh';
  s.style.opacity = Math.random()*0.8 + 0.2;
  s.style.transform = `translateZ(0) scale(${Math.random()*1.2+0.6})`;
  sparkLayer.appendChild(s);
}
setInterval(() => {
  sparkLayer.querySelectorAll('.spark').forEach(s => {
    const dx = (Math.random() - .5) * 4;
    const dy = (Math.random() - .5) * 4;
    const x = parseFloat(s.style.left);
    const y = parseFloat(s.style.top);
    s.style.left = Math.min(100, Math.max(0, x + dx)) + 'vw';
    s.style.top  = Math.min(100, Math.max(0, y + dy)) + 'vh';
  });
}, 600);

// Scroll progress bar
const progress = document.createElement('div');
progress.style.position='fixed';
progress.style.left='0'; progress.style.top='0';
progress.style.height='3px'; progress.style.width='0%';
progress.style.background='linear-gradient(90deg, var(--accent), var(--accent-2))';
progress.style.zIndex='40'; progress.style.boxShadow='0 0 12px rgba(255,255,255,.25)';
document.body.appendChild(progress);
window.addEventListener('scroll', () => {
  const st = window.scrollY;
  const h = document.body.scrollHeight - window.innerHeight;
  const pct = Math.max(0, Math.min(1, st / h)) * 100;
  progress.style.width = pct + '%';
});
