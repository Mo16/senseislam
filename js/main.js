document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks = document.querySelector('.nav__links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => { navLinks.classList.toggle('active'); });
    navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('active')));
  }

  // FAQ
  document.querySelectorAll('.faq-item__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.section') || btn.closest('[data-tabs]') || document;
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  // Nav shadow
  const nav = document.querySelector('.nav');
  if (nav) window.addEventListener('scroll', () => { nav.style.boxShadow = scrollY > 40 ? '0 4px 30px rgba(0,0,0,.06)' : 'none'; });

  // Contact form -> mailto with topic as subject
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstname = (document.getElementById('firstname') || {}).value || '';
      const lastname = (document.getElementById('lastname') || {}).value || '';
      const email = (document.getElementById('email') || {}).value || '';
      const phone = (document.getElementById('phone') || {}).value || '';
      const subject = (document.getElementById('subject') || {}).value || 'Enquiry';
      const message = (document.getElementById('msg') || {}).value || '';
      const consent = document.getElementById('privacy-consent');
      if (consent && !consent.checked) {
        consent.focus();
        return;
      }
      const body =
        'Name: ' + firstname + ' ' + lastname + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + phone + '\n' +
        'Topic: ' + subject + '\n\n' +
        'Message:\n' + message;
      const mailto = 'mailto:info@senseislam.org' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
    });
  }
});
