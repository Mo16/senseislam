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

  // Contact form -> Netlify Forms (AJAX) with inline success message
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');

  const showSuccess = () => {
    if (!contactSuccess) return;
    contactSuccess.hidden = false;
    if (contactForm) contactForm.hidden = true;
    contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // If returning from a non-JS Netlify redirect, show success
  if (contactSuccess && /[?&]sent=1\b/.test(window.location.search)) {
    showSuccess();
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const consent = document.getElementById('privacy-consent');
      if (consent && !consent.checked) {
        consent.focus();
        return;
      }
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

      const formData = new FormData(contactForm);
      const body = new URLSearchParams();
      formData.forEach((value, key) => { body.append(key, value); });

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      })
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok');
          showSuccess();
        })
        .catch(() => {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
          alert('Sorry — there was a problem sending your message. Please email info@senseislam.org directly.');
        });
    });
  }
});
