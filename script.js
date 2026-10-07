// typing effect
const words = ['clean, fast websites.', 'full-stack web apps.', 'intuitive UI/UX designs.', 'ideas that ship.'];
const el = document.getElementById('typed');
let w = 0, c = 0, del = false;
(function type(){
  const cur = words[w];
  el.textContent = cur.slice(0, c);
  if (!del && c === cur.length){ del = true; return setTimeout(type, 1400); }
  if (del && c === 0){ del = false; w = (w + 1) % words.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 35 : 70);
})();

// reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } }), {threshold:.12});
document.querySelectorAll('.reveal').forEach(n => io.observe(n));

// 3D tilt for photo and project cards
function tilt(node, max){
  node.addEventListener('pointermove', e => {
    const r = node.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    node.style.transform = `perspective(800px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(0)`;
  });
  node.addEventListener('pointerleave', () => node.style.transform = '');
}
tilt(document.getElementById('photo'), 14);
document.querySelectorAll('.tilt').forEach(n => tilt(n, 8));

// mobile menu + year
const menu = document.getElementById('menu');
document.getElementById('burger').onclick = () => menu.classList.toggle('open');
menu.querySelectorAll('a').forEach(a => a.onclick = () => menu.classList.remove('open'));
document.getElementById('year').textContent = new Date().getFullYear();
