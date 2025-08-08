
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

