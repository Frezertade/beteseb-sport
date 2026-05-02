/* Beteseb Sport — JavaScript */

window.addEventListener('load', () => {
    setTimeout(() => { document.getElementById('loader').classList.add('hidden'); }, 1800);
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop, h = section.offsetHeight, id = section.getAttribute('id');
        if (scrollY > top && scrollY <= top + h) {
            document.querySelectorAll('.nav-link').forEach(l => {
                l.classList.remove('active');
                if (l.getAttribute('href') === '#' + id) l.classList.add('active');
            });
        }
    });
});

// Counter animation
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000, increment = target / (duration / 16);
        let current = 0;
        const update = () => {
            current += increment;
            if (current < target) { counter.textContent = Math.ceil(current).toLocaleString(); requestAnimationFrame(update); }
            else { counter.textContent = target.toLocaleString(); }
        };
        update();
    });
}

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.closest('.hero')) animateCounters();
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .program-card, .testimonial-card, .about-feature, .video-card, .pillar, .contact-item, .floating-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

const hero = document.querySelector('.hero');
if (hero) observer.observe(hero);

// Stagger grid items
document.querySelectorAll('.services-grid, .programs-grid, .testimonials-grid, .videos-grid').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => { child.style.transitionDelay = `${i * 0.1}s`; });
});

// Form
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#078930';
            btn.style.color = '#fff';
            setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.style.color = ''; btn.disabled = false; form.reset(); }, 3000);
        }, 1500);
    });
}

// Card glow effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.background = `radial-gradient(circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(212,175,55,0.05), var(--dark-2))`;
    });
    card.addEventListener('mouseleave', () => { card.style.background = ''; });
});
