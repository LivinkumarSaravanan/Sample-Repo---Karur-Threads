/* ===============================================
   KarurThreads - Premium Hospital Textiles
   GSAP-Powered Animation System v2.0
   =============================================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* -------------------- Utility Functions -------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const lerp = (start, end, factor) => start + (end - start) * factor;
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const map = (value, inMin, inMax, outMin, outMax) =>
    ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

/* -------------------- Theme Management -------------------- */
const ThemeManager = {
    init() {
        this.toggle = $('#themeToggle');
        this.html = document.documentElement;

        // Load saved theme or detect system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.setTheme(savedTheme, false);
        } else {
            this.setTheme('light', true);
        }

        this.toggle?.addEventListener('click', () => this.toggleTheme());
    },

    setTheme(theme, save = true) {
        this.html.setAttribute('data-theme', theme);
        if (save) localStorage.setItem('theme', theme);
    },

    toggleTheme() {
        const current = this.html.getAttribute('data-theme');
        this.setTheme(current === 'dark' ? 'light' : 'dark');
    }
};

/* -------------------- Page Loader -------------------- */
const PageLoader = {
    init() {
        this.loader = $('#loader');
        this.logoText = this.loader?.querySelector('.loader-logo-text');
        this.shimmer = this.loader?.querySelector('.loader-shimmer');
        this.progress = this.loader?.querySelector('.loader-progress');

        if (!this.loader) return;

        this.animate();
    },

    animate() {
        const tl = gsap.timeline({
            onComplete: () => this.hide()
        });

        // Logo entrance
        tl.to(this.logoText, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        })
            .to(this.shimmer, {
                opacity: 1,
                duration: 0.3
            }, '-=0.5')
            .to(this.shimmer, {
                opacity: 0,
                duration: 0.5,
                delay: 0.8
            })
            // Logo exit
            .to(this.logoText, {
                opacity: 0,
                y: -30,
                duration: 0.6,
                ease: 'power2.in'
            }, '+=0.3')
            .to(this.progress, {
                opacity: 0,
                duration: 0.3
            }, '-=0.3');
    },

    hide() {
        this.loader.classList.add('hidden');
        document.body.style.overflow = 'auto';

        // Initialize all modules after loader completes
        setTimeout(() => {
            SmoothScroll.init();
            Navbar.init();
            HeroSection.init();
            FeaturesSection.init();
            AboutSection.init();
            WhyChooseSection.init();
            ProductsSection.init();
            CTASection.init();
            ContactSection.init();
            CursorGlow.init();

            ScrollTrigger.refresh();
        }, 0);
    }
};

/* -------------------- Smooth Scroll -------------------- */
const SmoothScroll = {
    init() {
        $$('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = $(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    gsap.to(window, {
                        scrollTo: offsetTop,
                        duration: .3,
                        ease: 'power2.inOut'
                    });
                }
            });
        });
    }
};

/* -------------------- Navbar -------------------- */
const Navbar = {
    init() {
        this.navbar = $('#navbar');
        this.links = $$('.nav-link');
        this.mobileBtn = $('#mobileMenuBtn');
        this.navLinks = $('#navLinks');
        this.lastScroll = 0;
        this.currentSection = 'hero';

        if (!this.navbar) return;

        this.bindEvents();
    },

    bindEvents() {
        // Mobile menu toggle
        this.mobileBtn?.addEventListener('click', () => {
            this.mobileBtn.classList.toggle('active');
            this.navLinks?.classList.toggle('active');
        });

        // Close mobile menu on link click
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                this.mobileBtn?.classList.remove('active');
                this.navLinks?.classList.remove('active');
            });
        });

        // Scroll handling
        // window.addEventListener('scroll', () => this.onScroll(), { passive: true });

        // Section detection
        this.sections = $$('section[id]');
        this.sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => this.setActiveSection(section.id),
                onEnterBack: () => this.setActiveSection(section.id)
            });
        });
    },

    onScroll() {
        const scrolled = window.scrollY > 60;
        this.navbar.classList.toggle('scrolled', scrolled);
    },

    setActiveSection(id) {
        this.currentSection = id;
        this.links.forEach(link => {
            const section = link.dataset.section;
            link.classList.toggle('active', section === id);
        });
    }
};

/* -------------------- Hero Section -------------------- */
const HeroSection = {
    init() {
        this.eyebrow = $('.hero-eyebrow');
        this.titleLines = $$('.title-line');
        this.subtitle = $('.hero-subtitle');
        this.buttons = $('.hero-buttons');
        this.stats = $('.hero-stats');
        this.scrollIndicator = $('.hero-scroll');

        if (!this.titleLines.length) return;

        this.animate();
    },

    animate() {
        const tl = gsap.timeline({ delay: 0.3 });

        // Eyebrow
        tl.to(this.eyebrow, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
        });

        // Title lines staggered
        tl.to(this.titleLines, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.12,
            ease: 'power3.out'
        }, '-=0.4');
        +
            // Subtitle
            tl.to(this.subtitle, {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: 'power2.out'
            }, '-=0.4');

        // Buttons
        tl.to(this.buttons, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        }, '-=0.3');

        // Stats
        tl.to(this.stats, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        }, '-=0.2');

        // Scroll indicator
        tl.to(this.scrollIndicator, {
            opacity: 1,
            duration: 0.25,
            ease: 'power2.out'
        }, '-=0.1');
    }
};

/* -------------------- Features Section -------------------- */
const FeaturesSection = {
    init() {
        this.section = $('#features');
        this.cards = $$('.feature-card');
        this.header = this.section?.querySelector('.section-header');

        if (!this.cards.length) return;

        this.animate();
    },

    animate() {
        const isMobile = window.innerWidth < 768;

        // Header animation
        if (this.header) {
            gsap.from(this.header.children, {
                scrollTrigger: {
                    trigger: this.header,
                    start: 'top 85%',
                    once: true
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power2.out'
            });
        }

        // Cards staggered entrance
        this.cards.forEach((card, index) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: isMobile ? 'top 100%' : 'top 85%',
                    once: true
                },
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: isMobile ? 0 : index * 0.08,
                ease: 'power3.out'
            });
        });
    }
};

/* -------------------- About Section -------------------- */
const AboutSection = {
    init() {
        this.cards = $$('.about-card');

        if (!this.cards.length) return;

        this.animate();
    },

    animate() {
        const isMobile = window.innerWidth < 768;

        // Lead text animation
        if (this.leadText) {
            gsap.from(this.leadText, {
                scrollTrigger: {
                    trigger: this.leadText,
                    start: 'top 85%',
                    once: true
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: 'power2.out'
            });
        }

        // Cards staggered animation
        this.cards.forEach((card, index) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: isMobile ? 'top 100%' : 'top 85%',
                    once: true
                },
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: isMobile ? 0 : index * 0.12,
                ease: 'power3.out'
            });
        });
    }
};

/* -------------------- Why Choose Us -------------------- */
const WhyChooseSection = {
    init() {
        this.items = $$('.checklist-item');
        this.badges = $$('.checklist-icon svg');

        if (!this.items.length) return;

        this.animate();
    },

    animate() {
        const isMobile = window.innerWidth < 768;

        this.items.forEach((item, index) => {
            // Item entrance
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: isMobile ? 'top 100%' : 'top 88%',
                    once: true
                },
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: isMobile ? 0 : index * 0.08,
                ease: 'power3.out'
            });

            // Checkmark draw animation
            const svg = item.querySelector('.checklist-icon svg');
            if (svg) {
                gsap.to(svg, {
                    scrollTrigger: {
                        trigger: item,
                        start: isMobile ? 'top 100%' : 'top 85%',
                        once: true
                    },
                    strokeDashoffset: 0,
                    duration: 0.4,
                    delay: isMobile ? 0 : index * 0.08 + 0.2,
                    ease: 'power2.out'
                });
            }
        });
    }
};

/* -------------------- Products Section -------------------- */
const ProductsSection = {
    init() {
        this.section = $('#products');
        this.cards = $$('.product-card');
        this.header = this.section?.querySelector('.section-header');

        if (!this.cards.length) return;

        this.animate();
    },

    animate() {
        const isMobile = window.innerWidth < 768;

        // Header animation
        if (this.header) {
            gsap.from(this.header.children, {
                scrollTrigger: {
                    trigger: this.header,
                    start: 'top 100%',
                    once: true
                },
                opacity: 0,
                y: 30,
                duration: 0.3,
                stagger: 0.08,
                ease: 'power2.out'
            });
        }

        // Cards staggered entrance
        this.cards.forEach((card, index) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: isMobile ? 'top 100%' : 'top 85%',
                    once: true
                },
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: isMobile ? 0 : index * 0.08,
                ease: 'power3.out'
            });
        });
    }
};

/* -------------------- CTA Section -------------------- */
const CTASection = {
    init() {
        this.section = $('#cta');
        this.content = this.section?.querySelector('.cta-content');

        if (!this.content) return;

        this.animate();
    },

    animate() {
        gsap.from(this.content.children, {
            scrollTrigger: {
                trigger: this.content,
                start: 'top 150%',
                once: true
            },
            opacity: 0,
            y: 30,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out'
        });
    }
};

/* -------------------- Contact Section -------------------- */
const ContactSection = {
    init() {
        this.section = $('#contact');
        this.infoCards = $$('.info-card');
        this.formGroups = $$('.form-group');
        this.form = $('#contactForm');

        if (!this.infoCards.length) return;

        this.animate();
        this.bindFormEvents();
    },

    animate() {
        const isMobile = window.innerWidth < 768;

        // Info cards staggered animation
        this.infoCards.forEach((card, index) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: isMobile ? 'top 100%' : 'top 88%',
                    once: true
                },
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: isMobile ? 0 : index * 0.08,
                ease: 'power3.out'
            });
        });

        // Form groups animation
        this.formGroups.forEach((group, index) => {
            gsap.to(group, {
                scrollTrigger: {
                    trigger: group,
                    start: 'top 100%'
                },
                opacity: 1,
                y: 0,
                duration: 0.4,
                delay: isMobile ? 0 : index * 0.06,
                ease: 'power3.out'
            });
        });
    },

    bindFormEvents() {
        this.form?.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = this.form.querySelector('button[type="submit"]');
            btn.classList.add('loading');
            btn.disabled = true;

            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1800));

            btn.classList.remove('loading');
            btn.classList.add('sent');

            // Reset after delay
            setTimeout(() => {
                btn.classList.remove('sent');
                btn.disabled = false;
                this.form.reset();
            }, 2500);
        });
    }
};

/* -------------------- Cursor Glow Effect -------------------- */
const CursorGlow = {
    init() {
        if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        this.glow = document.createElement('div');
        this.glow.className = 'cursor-glow';
        document.body.appendChild(this.glow);

        this.x = 0;
        this.y = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.isVisible = false;

        this.bindEvents();
        this.animate();
    },

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;

            if (!this.isVisible) {
                this.isVisible = true;
                gsap.to(this.glow, { opacity: 1, duration: 0.3 });
            }
        });

        document.addEventListener('mouseleave', () => {
            this.isVisible = false;
            gsap.to(this.glow, { opacity: 0, duration: 0.3 });
        });
    },

    animate() {
        this.x = lerp(this.x, this.targetX, 0.08);
        this.y = lerp(this.y, this.targetY, 0.08);

        gsap.set(this.glow, {
            left: `${this.x}px`,
            top: `${this.y}px`
        });

        requestAnimationFrame(() => this.animate());
    }
};

/* -------------------- Parallax Effects -------------------- */
const ParallaxEffects = {
    init() {
        if (window.innerWidth < 768) return;

        // Hero background parallax
        const heroImage = $('.hero-image-layer');
        if (heroImage) {
            gsap.to(heroImage, {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                yPercent: 30,
                ease: 'none'
            });
        }

        // About image parallax
        const aboutMain = $('.about-image-main');
        if (aboutMain) {
            gsap.to(aboutMain, {
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                yPercent: -10,
                ease: 'none'
            });
        }
    }
};

/* -------------------- Catalog Download Modal -------------------- */
const CatalogModal = {
    modal: null,
    pendingDownload: null,

    init() {
        this.modal = document.getElementById('catalogModal');

        if (!this.modal) return;

        // Handle all catalog download links
        document.querySelectorAll('a[download][href*="Catelog"], a[download][href*="catalog"]').forEach(link => {
            link.addEventListener('click', (e) => {
                this.show();
            });
        });

        // Handle OK button
        const okBtn = document.getElementById('catalogModalOk');
        if (okBtn) {
            okBtn.addEventListener('click', () => {
                this.hide();
            });
        }

        // Close on overlay click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.hide();
            }
        });
    },

    show() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    hide() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

/* -------------------- Main Initialization -------------------- */
document.addEventListener('DOMContentLoaded', () => {
    // Prevent scroll during loader
    document.body.style.overflow = 'hidden';

    // Initialize modules
    ThemeManager.init();
    PageLoader.init();
    ParallaxEffects.init();
    CatalogModal.init();
});
