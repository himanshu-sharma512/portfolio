/**
 * scroll-reveal.js
 * Watches all `.reveal` elements and adds `.show` when they
 * enter the viewport.  Uses IntersectionObserver for performance.
 */

(function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.08 }
  );

  document
    .querySelectorAll('.reveal')
    .forEach((el) => observer.observe(el));
})();
