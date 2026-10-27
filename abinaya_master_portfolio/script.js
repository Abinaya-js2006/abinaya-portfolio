const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// Skill category filters
const tabs = document.querySelectorAll('.skill-tab');
const skillCards = document.querySelectorAll('.skill-card');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => item.classList.toggle('active', item === tab));
  const group = tab.dataset.group;
  skillCards.forEach(card => {
    card.style.display = group === 'all' || card.dataset.category === group ? 'flex' : 'none';
  });
}));

// Gentle reveal-on-scroll effect
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();

// Contact form opens the visitor's email app; no backend or data storage is used.
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const subject = String(data.get('subject') || '').trim();
  const message = String(data.get('message') || '').trim();
  // Replace this address with Abinaya's real email before publishing.
  const recipient = 'your.email@example.com';
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  if (recipient === 'your.email@example.com') {
    formNote.textContent = 'Demo mode: replace your.email@example.com in index.html and script.js with your real email before publishing.';
    toast.textContent = 'Add your real email address to activate this contact form.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
    return;
  }
  window.location.href = mailto;
});

// Warn gently about social links that still need personalization.
document.querySelectorAll('[data-placeholder]').forEach(link => {
  link.addEventListener('click', event => {
    const kind = link.dataset.placeholder;
    if (kind === 'linkedin' || (kind === 'email' && link.getAttribute('href').includes('your.email@example.com'))) {
      event.preventDefault();
      toast.textContent = kind === 'linkedin' ? 'Add your LinkedIn profile URL before publishing.' : 'Replace the placeholder with your real email address.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  });
});
