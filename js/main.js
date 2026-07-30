/* =============================================
   FATWA PUTRI JINGGA — PORTFOLIO
   main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // 1. CUSTOM CURSOR
  // =============================================
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('follower');

  if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // Smooth follower animation
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor hover effect on interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .project-card, .skill-group, .info-card');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform   = 'translate(-50%, -50%) scale(1.8)';
        cursor.style.background  = 'var(--rose-soft)';
        follower.style.transform = 'translate(-50%, -50%) scale(1.4)';
        follower.style.opacity   = '1';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform   = 'translate(-50%, -50%) scale(1)';
        cursor.style.background  = 'var(--rose-deep)';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.opacity   = '0.6';
      });
    });
  }


  // =============================================
  // 2. NAVBAR — scroll effect + mobile toggle
  // =============================================
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.querySelector('.nav-links');

  // Add scrolled class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }


  // =============================================
  // 3. SCROLL REVEAL
  // =============================================
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered delay for grouped reveals
        const delay = entry.target.dataset.delay || (index % 4) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  // =============================================
  // 4. SMOOTH ACTIVE NAV LINK ON SCROLL
  // =============================================
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));


  // =============================================
  // 5. HERO PARALLAX (subtle)
  // =============================================
  const blob1 = document.querySelector('.blob-1');
  const blob2 = document.querySelector('.blob-2');

  if (blob1 && blob2) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      blob1.style.transform = `translateY(${scrollY * 0.08}px)`;
      blob2.style.transform = `translateY(${scrollY * -0.05}px)`;
    }, { passive: true });
  }

});


// =============================================
// 6. MOBILE NAV OPEN STYLES (injected via JS)
// =============================================
(function addMobileNavStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 900px) {
      .nav-links.nav-open {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0; right: 0;
        background: rgba(253, 248, 245, 0.97);
        backdrop-filter: blur(18px);
        padding: 1.5rem 2rem;
        gap: 1.5rem;
        border-bottom: 1px solid var(--border);
        animation: slideDown 0.25s ease;
      }

      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-8px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .nav-links a {
        font-size: 0.9rem;
      }

      .nav-links a.active {
        color: var(--rose-deep);
      }
    }

    .nav-links a.active::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
})();
 /* =============================================
   ACTIVE NAV LINK FIX
   ============================================= */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveNavLink() {
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");
    if (href === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNavLink);
window.addEventListener("load", setActiveNavLink);