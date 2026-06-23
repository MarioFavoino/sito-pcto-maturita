const words = [
  'competenze digitali',
  'sicurezza sul lavoro',
  'spirito critico',
  'orientamento al futuro',
  'problem solving'
];

const typingText = document.getElementById('typingText');
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop(){
  const current = words[wordIndex];
  typingText.textContent = current.slice(0, charIndex);
  if(!deleting && charIndex < current.length){
    charIndex++;
    setTimeout(typeLoop, 70);
    return;
  }
  if(!deleting && charIndex === current.length){
    deleting = true;
    setTimeout(typeLoop, 1200);
    return;
  }
  if(deleting && charIndex > 0){
    charIndex--;
    setTimeout(typeLoop, 35);
    return;
  }
  deleting = false;
  wordIndex = (wordIndex + 1) % words.length;
  setTimeout(typeLoop, 300);
}
if(typingText) typeLoop();

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .14});
revealItems.forEach(item => observer.observe(item));

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target);
    const duration = 1000;
    const start = performance.now();
    function animate(now){
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = target === 200 ? value + '+' : value;
      if(progress < 1) requestAnimationFrame(animate);
      else el.textContent = target === 200 ? '200+' : target;
    }
    requestAnimationFrame(animate);
    counterObserver.unobserve(el);
  });
}, {threshold:.6});
counters.forEach(counter => counterObserver.observe(counter));

const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.activity-card');
const yearBlocks = document.querySelectorAll('.year-block');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;

    cards.forEach(card => {
      const visible = filter === 'all' || card.dataset.year === filter;
      card.classList.toggle('is-hidden', !visible);
    });

    yearBlocks.forEach(block => {
      const visibleBlock = filter === 'all' || block.dataset.yearBlock === filter;
      block.classList.toggle('is-empty', !visibleBlock);
    });
  });
});

const modal = document.getElementById('activityModal');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalDate = document.getElementById('modalDate');
const modalHours = document.getElementById('modalHours');
const modalDetail = document.getElementById('modalDetail');

cards.forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = card.dataset.title;
    modalMeta.textContent = 'Dettaglio attività · ' + card.dataset.year;
    modalDate.textContent = card.dataset.date;
    modalHours.textContent = card.dataset.hours;
    modalDetail.textContent = card.dataset.detail;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  });
});

document.querySelectorAll('[data-close-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  });
});
document.addEventListener('keydown', (event) => {
  if(event.key === 'Escape'){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  }
});

const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
window.addEventListener('scroll', () => {
  const top = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('scrollLine').style.width = `${(top / docHeight) * 100}%`;

  let current = 'home';
  sections.forEach(section => {
    if(top >= section.offsetTop - 160) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

const menuToggle = document.getElementById('menuToggle');
const navBox = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const open = navBox.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navLinks.forEach(link => link.addEventListener('click', () => {
  navBox.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.getElementById('printBtn').addEventListener('click', () => window.print());
