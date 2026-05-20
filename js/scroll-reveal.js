(function () {
  'use strict';

  /* ── 1. SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-fade, .reveal-left');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
    document.querySelectorAll('.reveal-stagger').forEach((group) => observer.observe(group));
  } else {
    revealEls.forEach((el) => el.classList.add('show'));
    document.querySelectorAll('.reveal-stagger').forEach((g) => g.classList.add('show'));
  }

  /* ── 2. NAV SCROLL SHADOW ── */
  const nav = document.querySelector('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 3. DARK MODE TOGGLE ── */
  const THEME_KEY = 'hs-theme';
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) htmlEl.setAttribute('data-theme', savedTheme);

  function toggleTheme() {
    const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    updateToggleIcon();
  }

  function updateToggleIcon() {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.dm-toggle svg').forEach((svg) => {
      svg.innerHTML = isDark
        ? '<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>'
        : '<path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
    });
  }

  document.querySelectorAll('.dm-toggle').forEach((btn) => btn.addEventListener('click', toggleTheme));
  updateToggleIcon();

  /* ── 4. MOBILE HAMBURGER MENU ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');

  function setMenuOpen(open) {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    /* inert blocks all focus + AT interaction when closed */
    if (open) {
      mobileMenu.removeAttribute('inert');
    } else {
      mobileMenu.setAttribute('inert', '');
    }
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      setMenuOpen(!hamburger.classList.contains('open'));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    /* close on Escape */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.classList.contains('open')) {
        setMenuOpen(false);
        hamburger.focus();
      }
    });
  }

  /* ── 5. ACTIVE NAV LINK on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-menu a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => sectionObserver.observe(s));

  /* ── 6. ROTATING HERO WORDS ── */
  const words = ['AI Systems', 'LLM Agents', 'Full Stack', 'RAG Pipelines'];
  const wrapper = document.querySelector('.hero-rotating-word');
  if (wrapper) {
    let i = 0;
    setInterval(() => {
      wrapper.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(-8px)';
      setTimeout(() => {
        i = (i + 1) % words.length;
        wrapper.textContent = words[i];
        wrapper.style.transition = 'none';
        wrapper.style.transform = 'translateY(8px)';
        wrapper.style.opacity = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            wrapper.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            wrapper.style.opacity = '1';
            wrapper.style.transform = 'translateY(0)';
          });
        });
      }, 260);
    }, 2800);
  }

})();