// ====================== Ano no rodapé ======================
document.getElementById('year').textContent = new Date().getFullYear();

// ====================== Entrada: digitação no terminal ======================
(function typeIntro() {
  const el = document.getElementById('typed');
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = 'open --to-work';
    return;
  }
  const text = 'open --to-work';
  let i = 0;
  const tick = () => {
    el.textContent = text.slice(0, i);
    if (i++ <= text.length) setTimeout(tick, 70);
  };
  setTimeout(tick, 700);
})();

// ====================== Header com sombra ao rolar ======================
const header = document.querySelector('.hdr');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ====================== Menu mobile ======================
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  })
);

// ====================== Reveal ao rolar ======================
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
reveals.forEach((el) => io.observe(el));

// ====================== Link ativo no menu ======================
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((l) =>
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`)
        );
      }
    });
  },
  { threshold: 0.5 }
);
sections.forEach((s) => spy.observe(s));
