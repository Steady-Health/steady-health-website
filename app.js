/* Steady Health — app.js */

// ─── COUNT-UP ANIMATION ───
function animateCount(el, target, duration = 1200) {
    const start = performance.now();
    const from = parseInt(el.textContent, 10) || 0;
    function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(from + (target - from) * eased);
        if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

// ─── HERO ORB SCORE ANIMATION ───
const heroScoreEl = document.getElementById('heroScore');
if (heroScoreEl) {
    setTimeout(() => animateCount(heroScoreEl, 87, 1600), 600);
}

// ─── INTERSECTION OBSERVER ───
// Handles both .reveal (fade-in) and .countup (number animation)
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        if (el.classList.contains('reveal')) {
            el.classList.add('visible');
        }

        if (el.classList.contains('countup')) {
            const target = parseInt(el.dataset.target, 10);
            if (!isNaN(target)) animateCount(el, target, 1000);
        }

        // Also trigger countup for score chip vals in hero
        if (el.classList.contains('chip-val')) {
            const target = parseInt(el.dataset.target, 10);
            if (!isNaN(target)) animateCount(el, target, 1200);
        }

        io.unobserve(el);
    });
}, { threshold: 0.15 });

// Observe all reveal targets
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
document.querySelectorAll('.countup').forEach(el => io.observe(el));
document.querySelectorAll('.chip-val').forEach(el => io.observe(el));

// ─── NAV SCROLL STATE ───
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 20
        ? 'rgba(8, 12, 24, 0.92)'
        : 'rgba(8, 12, 24, 0.7)';
}, { passive: true });

// ─── FEATURE CARD TILT ON HOVER ───
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
        card.style.transition = 'transform 0.1s ease, border-color 0.25s, box-shadow 0.25s';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s ease, border-color 0.25s, box-shadow 0.25s';
    });
});
