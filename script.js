/* ============================================================
  Araby Mobile Studio — script.js
  Vanilla JavaScript — no frameworks, no dependencies
  Works fully on GitHub Pages (static)
============================================================ */

/* ── 1. NAVBAR: SCROLL SHADOW + ACTIVE LINK ── */
(function initNavbar() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');

  // Add shadow class when user scrolls down
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Highlight active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
})();


/* ── 2. HAMBURGER MOBILE MENU ── */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking the mobile CTA
  const mobileCta = document.querySelector('.mobile-cta');
  if (mobileCta) mobileCta.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ── 3. FADE-IN ON SCROLL (IntersectionObserver) ── */
(function initFadeIn() {
  const elements = document.querySelectorAll('.fade-in');

  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything if browser doesn't support
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Animate once
        }
      });
    },
    {
      threshold: 0.1,      // Trigger when 10% of element is visible
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ── 4. CONTACT FORM — JS ALERT (GitHub Pages has no backend) ── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get field values
    const name    = document.getElementById('form-name').value.trim();
    const email   = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all fields before sending.');
      return;
    }

    // Since this is GitHub Pages (no backend), show a friendly alert
    // Replace this with a real form service (Formspree, EmailJS, etc.) if needed
    alert(`Thank you, ${name}!\n\nPlease contact us directly at:\ncontact@arabymobile.com\n\nWe'll get back to you as soon as possible.`);

    // Reset the form after showing alert
    form.reset();
  });
})();


/* ── 5. BACK TO TOP BUTTON ── */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ── 6. SMOOTH ANCHOR SCROLL (with offset for fixed header) ── */
(function initSmoothAnchors() {
  const HEADER_HEIGHT = 68; // Match CSS .nav height

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return; // Skip empty anchors (footer placeholders)

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ── 7. STATS COUNTER ANIMATION ── */
(function initCounters() {
  const statNums = document.querySelectorAll('.stat-num');

  // Extract numeric part from text like "500+" or "100%"
  function getNumericValue(text) {
    const match = text.match(/[\d,.]+/);
    return match ? parseFloat(match[0].replace(/,/g, '')) : null;
  }

  function animateCounter(el, endValue, suffix, duration) {
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.floor(startValue + (endValue - startValue) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el   = entry.target;
      const text = el.dataset.original || el.textContent;
      // Store original on first run
      if (!el.dataset.original) el.dataset.original = text;

      const value  = getNumericValue(text);
      const suffix = text.replace(/[\d,.]+/, '').trim();

      if (value !== null) {
        animateCounter(el, value, suffix, 1600);
      }
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
})();


/* ── 8. NAVBAR ACTIVE LINK STYLE (CSS helper) ── */
// Inject active link style dynamically so we don't need extra CSS
(function injectActiveLinkStyle() {
  const style = document.createElement('style');
  style.textContent = `.nav-link.active { color: var(--cyan); }`;
  document.head.appendChild(style);
})();
