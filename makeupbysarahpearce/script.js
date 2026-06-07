/* =========================================================
   ARIA MONROE | MAKEUP ARTIST WEBSITE
   script.js
   ========================================================= */

// ----- NAV: scroll effect & burger menu -----
const nav      = document.getElementById('nav');
const burger   = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

burger.addEventListener('click', () => {
  const isOpen = burger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// Close mobile menu when a link is tapped
mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-label', 'Open menu');
  });
});

// ----- SCROLL REVEAL -----
const revealEls = document.querySelectorAll(
  '.about__grid, .gallery__item, .pricing__card, .testimonial, .contact__grid, .pricing__header, .gallery__header'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children within a grid
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

// Add stagger delays for grid children
document.querySelectorAll('.gallery__item').forEach((el, i) => {
  el.dataset.delay = i * 80;
});
document.querySelectorAll('.pricing__card').forEach((el, i) => {
  el.dataset.delay = i * 120;
});
document.querySelectorAll('.testimonial').forEach((el, i) => {
  el.dataset.delay = i * 100;
});

revealEls.forEach(el => revealObserver.observe(el));

// ----- CONTACT FORM -----
const form        = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

const validators = {
  name:    { el: document.getElementById('name'),    errEl: document.getElementById('nameError'),    test: v => v.trim().length >= 2,     msg: 'Please enter your full name.' },
  email:   { el: document.getElementById('email'),   errEl: document.getElementById('emailError'),   test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
  message: { el: document.getElementById('message'), errEl: document.getElementById('messageError'), test: v => v.trim().length >= 10,    msg: 'Please tell me a little more (at least 10 characters).' },
};

function validateField(key) {
  const { el, errEl, test, msg } = validators[key];
  const valid = test(el.value);
  el.closest('.form__group').classList.toggle('has-error', !valid);
  errEl.textContent = valid ? '' : msg;
  return valid;
}

// Live validation on blur
Object.keys(validators).forEach(key => {
  validators[key].el.addEventListener('blur', () => validateField(key));
  validators[key].el.addEventListener('input', () => {
    if (validators[key].el.closest('.form__group').classList.contains('has-error')) {
      validateField(key);
    }
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const allValid = Object.keys(validators).map(validateField).every(Boolean);
  if (!allValid) return;

  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  formSuccess.textContent = '';

  try {
    const data = new FormData(form);
    const response = await fetch('https://formspree.io/f/xbdzdqda', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      formSuccess.textContent = '✓ Message sent! I\'ll be in touch as soon as possible.';
      formSuccess.style.color = '';
      setTimeout(() => { formSuccess.textContent = ''; }, 6000);
    } else {
      throw new Error('Server error');
    }
  } catch {
    formSuccess.textContent = '✗ Something went wrong. Please email me directly at makeupbysarahpearce@gmail.com';
    formSuccess.style.color = '#c0392b';
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

// ----- SMOOTH ACTIVE NAV LINK HIGHLIGHT -----
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.opacity = link.getAttribute('href') === `#${entry.target.id}` ? '1' : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
