(function(){
      const toast = document.getElementById('welcome-toast');
      const user =
        JSON.parse(localStorage.getItem('smertco_current_user')) ||
        JSON.parse(sessionStorage.getItem('smertco_current_user'));

      if (user && user.fullname) {
        toast.textContent = `🎉 Welcome back, ${user.fullname}!`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.add('hide');
          setTimeout(() => toast.remove(), 500);
        }, 4000);
      }

      document.getElementById('year').textContent = new Date().getFullYear();
    })();

    function handleNewsletterSignup() {
      const email = document.getElementById('email').value.trim();
      if (!email) return alert('Please enter an email.');
      alert('Thanks — we will send a discount code to ' + email);
      document.getElementById('newsletter-form').reset();
    }
const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
  });

// ==== SCROLL ANIMATION (FADE-UP + STAGGER) ====
const cards = document.querySelectorAll(".fcard");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal"); // ✅ FIXED
    }
  });
}, { threshold: 0.2 });

cards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.15}s`; // stagger
  observer.observe(card);
});

// ==== HOVER DELAY EFFECT (SMOOTH & REFINED) ====
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("hover-active");
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("hover-active");
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.products-wrapper');
  const grid = document.querySelector('.products-grid');
  const productCards = document.querySelectorAll('.product-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!wrapper || !grid || productCards.length === 0) return;

  let index = 0;
  let itemsPerView = window.innerWidth > 768 ? 3 : 1;
  let totalSlides = Math.ceil(productCards.length / itemsPerView);

  function updateSlider() {
    const wrapperWidth = wrapper.clientWidth;
    const offset = -(index * wrapperWidth);
    grid.style.transition = 'transform 0.6s ease, opacity 0.35s ease';
grid.style.transform = `translateX(${offset}px)`;
    prevBtn.classList.toggle('hidden', index === 0);
nextBtn.classList.toggle('hidden', index === totalSlides - 1);
  }

  nextBtn && nextBtn.addEventListener('click', () => {
    if (index < totalSlides - 1) {
      index++;
      updateSlider();
    }
  });

  prevBtn && prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      updateSlider();
    }
  });

  window.addEventListener('resize', () => {
    const prevItems = itemsPerView;
    itemsPerView = window.innerWidth > 768 ? 3 : 1;
    totalSlides = Math.ceil(productCards.length / itemsPerView);

    // Keep current page valid: clamp index so we don't jump to 0 unexpectedly
    const maxIndex = Math.max(0, totalSlides - 1);
    index = Math.min(index, maxIndex);

    updateSlider();
  });

  // initial state: hide/show arrows correctly and position grid
  updateSlider();
});

document.addEventListener('DOMContentLoaded', () => {
  const testimonialCards = document.querySelectorAll('.testimonial');

  testimonialCards.forEach((card, i) => {
    card.classList.add('preload'); // optional marker
    // add directional class for staggered effect
    if (i === 0) card.classList.add('fade-down');
    if (i === 1) card.classList.add('fade-right');
    if (i === 2) card.classList.add('fade-left');
    if (i === 3) card.classList.add('fade-up');
  });

  const observerOptions = { threshold: 0.22 };
  const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        testimonialObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  testimonialCards.forEach((c, idx) => {
    c.style.transitionDelay = `${idx * 0.12}s`;
    testimonialObserver.observe(c);
  });
});

function handleNewsletterSignup() {
  const emailInput = document.getElementById('email');
  const message = document.getElementById('newsletter-message');
  const submitBtn = document.querySelector('#newsletter-form button[type="submit"]');
  const email = emailInput.value.trim();

  message.textContent = '';

  if (!email) {
    message.textContent = 'Please enter your email address.';
    emailInput.focus();
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    message.textContent = 'Please enter a valid email address.';
    emailInput.focus();
    return;
  }

  submitBtn.disabled = true;
  message.textContent = 'Submitting...';

  setTimeout(() => {
    message.textContent = `Thank you, ${email}! You’re now subscribed and will receive 5% off.`;
    emailInput.value = '';
    submitBtn.disabled = false;
  }, 1500);
}

document.getElementById('email').addEventListener('input', () => {
  const message = document.getElementById('newsletter-message');
  if (message.textContent !== '') message.textContent = '';
});


document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('.about-section');

  if (!aboutSection) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutSection.classList.add('visible');
        obs.unobserve(aboutSection);
      }
    });
  }, { threshold: 0.25 });

  obs.observe(aboutSection);
});

document.addEventListener('DOMContentLoaded', () => {
  const animElements = document.querySelectorAll('#contact-section [data-animate]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const dir = entry.target.getAttribute('data-animate');
        entry.target.classList.add('animate-in');
        entry.target.style.setProperty('--anim-dir', dir);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  animElements.forEach(el => obs.observe(el));

  // keyboard accessibility for social tooltips
  const socials = document.querySelectorAll('#contact-section .social');
  socials.forEach(s => {
    s.addEventListener('focus', () => s.classList.add('focus'));
    s.addEventListener('blur', () => s.classList.remove('focus'));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".sfooter");

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add("show");
        obs.unobserve(footer);
      }
    });
  }, { threshold: 0.25 });

  obs.observe(footer);

  document.getElementById("year").textContent = new Date().getFullYear();
});