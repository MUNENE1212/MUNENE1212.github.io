// Munene Denis Portfolio - Modern Interactive Features

// ==============================================
// 1. MOBILE NAVIGATION MENU
// ==============================================
const initMobileNav = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');

    // Create hamburger menu
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    // Insert hamburger after logo
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(hamburger);

    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
};

// ==============================================
// 2. SMOOTH SCROLLING
// ==============================================
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// ==============================================
// 3. SCROLL PROGRESS INDICATOR
// ==============================================
const initScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// ==============================================
// 4. BACK TO TOP BUTTON
// ==============================================
const initBackToTop = () => {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// ==============================================
// 5. SCROLL REVEAL ANIMATIONS
// ==============================================
const initScrollReveal = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // For staggered animations
                if (entry.target.classList.contains('stagger-children')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('revealed');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.skill-card, .project-card, .education-item, .about-content, .about-img').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Observe grids for staggered children animation
    document.querySelectorAll('.skills-grid, .projects-grid').forEach(grid => {
        grid.classList.add('stagger-children');
        observer.observe(grid);
    });
};

// ==============================================
// 6. LAZY LOADING IMAGES
// ==============================================
const initLazyLoading = () => {
    const images = document.querySelectorAll('img[src]');
    const videos = document.querySelectorAll('video');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });

    videos.forEach(video => {
        video.classList.add('lazy');
        imageObserver.observe(video);
    });
};

// ==============================================
// 7. FORM VALIDATION AND FEEDBACK
// ==============================================
const initFormEnhancement = () => {
    const form = document.querySelector('.contact-form form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');

    // Add real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            showNotification('Please fix the errors in the form', 'error');
        } else {
            showNotification('Message sent successfully!', 'success');
        }
    });
};

const validateField = (field) => {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';

    // Remove previous error
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    field.classList.remove('invalid', 'valid');

    // Validation rules
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    } else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }

    // Show error or success
    if (!isValid) {
        field.classList.add('invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    } else if (value) {
        field.classList.add('valid');
    }

    return isValid;
};

const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// ==============================================
// 8. LOADING SCREEN
// ==============================================
const initLoadingScreen = () => {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">MD</div>
        </div>
    `;
    document.body.appendChild(loader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
};

// ==============================================
// 9. ACTIVE NAVIGATION HIGHLIGHT
// ==============================================
const initActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
};

// ==============================================
// 10. TYPING EFFECT FOR HERO SUBTITLE
// ==============================================
const initTypingEffect = () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';

    let index = 0;
    const typeSpeed = 50;

    const type = () => {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, typeSpeed);
        }
    };

    // Start typing after welcome message
    setTimeout(type, 3000);
};

// ==============================================
// INITIALIZE ALL FEATURES
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initMobileNav();
    initSmoothScroll();
    initScrollProgress();
    initBackToTop();
    initScrollReveal();
    initLazyLoading();
    initFormEnhancement();
    initActiveNav();
    initTypingEffect();
});

// ==============================================
// PERFORMANCE OPTIMIZATION
// ==============================================
// Debounce function for scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Additional scroll optimizations can go here
}, 20);

window.addEventListener('scroll', optimizedScroll);
