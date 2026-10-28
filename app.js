/**
 * 奧林匹亞數學知識庫 (Olympiad Mathematics Hub)
 * Interactivity: KaTeX render, Theme Toggle, Domain Tabs, Pathway Steppers, Mobile Nav
 */

document.addEventListener('DOMContentLoaded', () => {
  initKaTeX();
  initTheme();
  initDomainTabs();
  initPathwayTabs();
  initMobileMenu();
  initScrollSpy();
});

/* 1. KaTeX Equation Rendering */
function initKaTeX() {
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false
    });
  } else {
    // If KaTeX CDN loads with slight delay
    window.addEventListener('load', () => {
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
          ],
          throwOnError: false
        });
      }
    });
  }
}

/* 2. Theme Toggle (Sync with color-scheme and light-dark) */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('omath-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let nextTheme = 'dark';

    if (currentTheme === 'dark') {
      nextTheme = 'light';
    } else if (currentTheme === 'light') {
      nextTheme = 'dark';
    } else {
      // If currently using system preference
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      nextTheme = isSystemDark ? 'light' : 'dark';
    }

    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('omath-theme', nextTheme);
  });
}

/* 3. Domain Filtering Tabs */
function initDomainTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.domain-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const targetDomain = tab.getAttribute('data-domain');

      cards.forEach(card => {
        const cardDomain = card.getAttribute('data-domain');
        if (targetDomain === 'all' || cardDomain === targetDomain) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* 4. Pathway Selection Tabs */
function initPathwayTabs() {
  const pathBtns = document.querySelectorAll('.path-btn');
  const pathCards = document.querySelectorAll('.pathway-card');

  pathBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pathBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-path');
      pathCards.forEach(card => {
        if (card.id === `path-${target}`) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* 5. Mobile Menu Toggle */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when clicking link
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* 6. Active Navigation Link on Scroll */
function initScrollSpy() {
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.main-nav a');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
