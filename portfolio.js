// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Scroll Progress & Sticky Navbar & Scroll Top Button
const navbar = document.querySelector('.navbar');
const scrollTopBtn = document.getElementById('scroll-top');
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    // Scroll Progress
    const winScroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }

    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        navbar.style.borderBottom = '1px solid rgba(255, 165, 0, 0.3)';
        scrollTopBtn.style.display = 'flex';
    } else {
        navbar.style.background = 'var(--bg-dark)';
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottom = '1px solid rgba(255, 165, 0, 0.1)';
        scrollTopBtn.style.display = 'none';
    }

    // Update active link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY || document.documentElement.scrollTop;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop - 150) {
            const id = section.getAttribute('id');
            if (id) current = id;
        }
    });

    document.querySelectorAll('.menu ul li a').forEach(a => {
        a.classList.remove('active');
        const href = a.getAttribute('href').substring(1);
        if (current && href === current) {
            a.classList.add('active');
            a.style.color = '#ffa500';
        } else {
            a.style.color = 'inherit';
        }
    });
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');
const body = document.body;

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when a link is clicked
document.querySelectorAll('.menu ul li a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-theme')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Stats Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Start counters when in view
const statsSection = document.querySelector('.stats');
const observerOptions = { threshold: 0.5 };
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        startCounters();
        statsObserver.unobserve(statsSection);
    }
}, observerOptions);

if (statsSection) statsObserver.observe(statsSection);

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active button state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.classList.contains(filterValue)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 1);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Form Submission with Feedback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.btnn');
        const originalText = submitBtn.innerHTML;

        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate API call
        setTimeout(() => {
            alert('Message sent successfully! Eugene will get back to you soon.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            contactForm.reset();
        }, 2000);
    });
}

// Typing Effect
const typedTextSpan = document.querySelector(".typed-text");
const textArray = ["Full-Stack Developer", "Software Engineer", "Data Scientist", "UI/UX Designer"];
const typingSpeed = 100;
const erasingSpeed = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (!typedTextSpan) return;
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (!typedTextSpan) return;
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingSpeed);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingSpeed + 1100);
    }
}

// Skill Bars Animation
const skillCards = document.querySelectorAll('.skill-card');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.level-bar');
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
                bar.style.transition = 'width 1.5s ease-in-out';
            }, 100);
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillCards.forEach(card => skillsObserver.observe(card));

document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});
