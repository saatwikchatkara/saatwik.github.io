
// Navigation functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                animateSkillBars();
                animateQuantumSkills();
            }

            // Animate achievement numbers when about section is visible
            if (entry.target.id === 'about') {
                animateNumbers();
            }

            // Add entrance animation for experience items
            if (entry.target.classList.contains('experience-item')) {
                entry.target.style.animationDelay = `${Array.from(document.querySelectorAll('.experience-item')).indexOf(entry.target) * 0.2}s`;
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Initialize skill items after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Ensure skills are visible and properly initialized
    const skillItems = document.querySelectorAll('.skill-item');
    console.log('Found skill items:', skillItems.length);
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        // Make sure items are visible
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
    });

    // Force skills section to be visible
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsSection.style.display = 'block';
        skillsSection.style.visibility = 'visible';
    }
});

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, index * 100);
    });
}

// Quantum-themed skills animation
function animateQuantumSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    console.log('Animating skills:', skillItems.length);
    
    skillItems.forEach((item, index) => {
        // Remove any initial hiding
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
        item.classList.add('quantum-reveal');
        
        setTimeout(() => {
            const icon = item.querySelector('.skill-icon');
            if (icon) {
                icon.style.animation = 'quantumSpin 1.5s ease-out';
                // Reset animation after completion
                setTimeout(() => {
                    icon.style.animation = '';
                }, 1500);
            }
        }, index * 200);
    });
}

// Animate achievement numbers
function animateNumbers() {
    const numbers = document.querySelectorAll('.achievement-number');
    numbers.forEach(number => {
        const target = parseInt(number.textContent);
        const increment = target / 50;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            number.textContent = Math.floor(current) + (number.textContent.includes('+') ? '+' : '');
        }, 50);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.quantum-bg, .quantum-particle');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typewriter effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typewriter effect when page loads
window.addEventListener('load', () => {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typeWriter(typewriterElement, text, 150);
    }
});

// Quantum particle animation
function createQuantumParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #00ffff;
        border-radius: 50%;
        pointer-events: none;
        animation: floatParticle 8s linear infinite;
        left: ${Math.random() * 100}vw;
        opacity: 0.6;
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Create floating particles periodically with varying intervals
setInterval(createQuantumParticle, 1500);
setInterval(() => {
    createQuantumParticle();
    setTimeout(createQuantumParticle, 300);
}, 3000);

// Add quantum tunnel effect to sections
function addQuantumTunnel() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.style.background = section.style.background + ', radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 255, 255, 0.1) 0%, transparent 50%)';
        });
        
        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            section.style.setProperty('--mouse-x', x + '%');
            section.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// Initialize quantum effects
document.addEventListener('DOMContentLoaded', addQuantumTunnel);

// Add floating particle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
            transform: translateY(90vh) scale(1);
        }
        90% {
            opacity: 0.6;
            transform: translateY(-10vh) scale(1);
        }
        100% {
            transform: translateY(-20vh) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simple form validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.project-icon i');
        icon.style.animation = 'pulse 0.5s ease-in-out';
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.project-icon i');
        icon.style.animation = '';
    });
});

// Quantum circuit animation
const quantumGates = document.querySelectorAll('.quantum-gate');
quantumGates.forEach((gate, index) => {
    gate.addEventListener('click', () => {
        gate.style.animation = 'none';
        setTimeout(() => {
            gate.style.animation = 'pulse 2s ease-in-out infinite';
        }, 100);
    });
});

// Loading screen (optional)
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Parallax and other scroll effects here
}, 16)); // ~60fps
