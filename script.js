(() => {
  const navLinks = [...document.querySelectorAll('.chapter-nav a')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const linksById = new Map(
    navLinks.map((link) => [link.getAttribute('href').slice(1), link])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => link.removeAttribute('aria-current'));
      const active = linksById.get(visible.target.id);
      if (active) {
        active.setAttribute('aria-current', 'page');
        active.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
  );

  sections.forEach((section) => observer.observe(section));
})();
