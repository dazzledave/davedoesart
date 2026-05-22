/* ==========================================================================
   DAVE DOES ART - PREMIUM GRAPHIC DESIGN PORTFOLIO INTERACTION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Custom Cursor Trail Animation
       ========================================== */
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    // Tracking cursor position
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let cursorDotX = 0, cursorDotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth lerp (linear interpolation) loop for high-fidelity custom cursor follower
    const tickCursor = () => {
        // Outer circle speed (slower for smooth drag trail)
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        
        // Inner dot speed (snappy)
        cursorDotX += (mouseX - cursorDotX) * 0.35;
        cursorDotY += (mouseY - cursorDotY) * 0.35;

        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }
        if (cursorDot) {
            cursorDot.style.left = `${cursorDotX}px`;
            cursorDot.style.top = `${cursorDotY}px`;
        }

        requestAnimationFrame(tickCursor);
    };
    
    tickCursor();

    // Hover interactive state transformations
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .filter-btn, input, select, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor?.classList.add('hovered');
            cursorDot?.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor?.classList.remove('hovered');
            cursorDot?.classList.remove('hovered');
        });
    });


    /* ==========================================
       2. Scroll-Driven Header Transformation
       ========================================== */
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });


    /* ==========================================
       3. Intersection Observer Scroll Animations
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve once animation is executed to optimize performance
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    /* ==========================================
       4. Responsive Hamburger Menu Toggle
       ========================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuToggle?.classList.toggle('active');
        navMenu?.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    };

    menuToggle?.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        });
    });


    /* ==========================================
       5. Hardware-Accelerated Portfolio Grid Filter
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from current buttons, add to clicked button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('filtered-out');
                    // Reset sizing styles for smooth layout rendering
                    card.style.position = 'relative';
                    card.style.visibility = 'visible';
                } else {
                    card.classList.add('filtered-out');
                    // Delayed positioning adjustment to prevent layout break
                    setTimeout(() => {
                        if (card.classList.contains('filtered-out')) {
                            card.style.position = 'absolute';
                            card.style.visibility = 'hidden';
                        }
                    }, 400);
                }
            });
        });
    });


    /* ==========================================
       6. Project Details Data & Lightbox Controller
       ========================================== */
    const projectsData = {
        'neon-dream': {
            title: 'Neon Dream Energy',
            category: 'Branding & Packaging',
            client: 'Neon Energy Labs',
            role: 'Brand Architect & Packaging',
            deliverables: 'Identity System, Can Design, Custom Wordmark',
            image: 'assets/neon_dream.png',
            story: 'Neon Dream was conceived to capture the vibrant, electric energy of modern subcultures. We developed a highly structured custom geometric wordmark paired with an electric neon violet and coral color story. The physical can mockup showcases dark aluminum with an ultra-glossy spot UV coating that stands out spectacularly under deep fluorescent light environments.',
            typeface: 'Syne & Plus Jakarta Sans',
            palette: [
                { hex: '#ff5a5f', bg: '#ff5a5f' },
                { hex: '#7b2cbf', bg: '#7b2cbf' },
                { hex: '#00f5ff', bg: '#00f5ff' },
                { hex: '#07080b', bg: '#07080b' }
            ]
        },
        'ethereal': {
            title: 'Ethereal Anthology',
            category: 'Editorial Design',
            client: 'Codex Publishing House',
            role: 'Creative & Editorial Director',
            deliverables: 'Book Cover Design, Interior Layout, Typography System',
            image: 'assets/ethereal.png',
            story: 'Designed for a collection of avant-garde modern poetry, Ethereal bridges raw paper textures with abstract, modern organic shapes. The design process focused extensively on mathematical grid systems, selecting a bespoke editorial typeface stack that emphasizes white space, quiet breathing room, and premium literary luxury.',
            typeface: 'Playfair Display & Inter',
            palette: [
                { hex: '#d6ccc2', bg: '#d6ccc2' },
                { hex: '#1c1a27', bg: '#1c1a27' },
                { hex: '#ffffff', bg: '#ffffff' },
                { hex: '#e3d5ca', bg: '#e3d5ca' }
            ]
        },
        'symmetry': {
            title: 'Symmetry Architects',
            category: 'Brand Identity',
            client: 'Symmetry & Partners',
            role: 'Lead Graphic Designer',
            deliverables: 'Visual Identity, Corporate Stationery Set, Debossing layout',
            image: 'assets/symmetry.png',
            story: 'Symmetry is an elite architectural firm focusing on structural minimalism. We built a brand system entirely based on grid alignments and the golden ratio. The final stationery set utilizes heavy raw cotton matte black cardstock, finished with deep blind debossing print techniques, evoking structural depth and architectural permanence.',
            typeface: 'Space Grotesk & Outfit',
            palette: [
                { hex: '#000000', bg: '#000000' },
                { hex: '#333333', bg: '#333333' },
                { hex: '#ffffff', bg: '#ffffff' },
                { hex: '#cccccc', bg: '#cccccc' }
            ]
        },
        'prism': {
            title: 'Prism Interface',
            category: 'UI/UX Concept',
            client: 'Prism Fintech Corp',
            role: 'UI/UX & Design Strategist',
            deliverables: 'UI/UX Design Kit, Visual Dashboard Concept, Brand Tokens',
            image: 'assets/prism.png',
            story: 'Prism redefines visual finance applications. Applying advanced glassmorphism techniques, we created a dashboard built entirely of translucent glowing panels. High-intensity cyan and violet gradient maps guide user attention to crucial financial indices, establishing a perfect balance between high-end digital design and functional ergonomics.',
            typeface: 'Outfit & Plus Jakarta Sans',
            palette: [
                { hex: '#00f5ff', bg: '#00f5ff' },
                { hex: '#ff007f', bg: '#ff007f' },
                { hex: '#12131c', bg: '#12131c' },
                { hex: '#1b1d28', bg: '#1b1d28' }
            ]
        },
        'bloom': {
            title: 'Bloom Cosmetics',
            category: 'Packaging Design',
            client: 'Bloom Botanicals Ltd',
            role: 'Visual Director & Packaging Designer',
            deliverables: 'Product Bottles, Palette Strategy, Outer Box Layout',
            image: 'assets/bloom.png',
            story: 'Bloom is a luxury organic cosmetic brand. The branding strategy utilizes warm botanical shapes and tactile paper textures to communicate raw purity. We designed custom matte glass serum dropper bottles, complete with minimalist, embossed text layouts that feel extremely premium and tactile in-hand.',
            typeface: 'Syne & Plus Jakarta Sans',
            palette: [
                { hex: '#ffb5a7', bg: '#ffb5a7' },
                { hex: '#fcd5ce', bg: '#fcd5ce' },
                { hex: '#f8edeb', bg: '#f8edeb' },
                { hex: '#d8e2dc', bg: '#d8e2dc' }
            ]
        },
        'spectrum': {
            title: 'Spectrum Liquid',
            category: '3D Illustration',
            client: 'Personal Visual Exploration',
            role: '3D Artist & Art Director',
            deliverables: '3D Art Prints, High-Res Wallpapers, Interactive Backgrounds',
            image: 'assets/spectrum.png',
            story: 'Spectrum is an experimental personal art series exploring how fluid light interacts with highly reflective organic chrome geometries. Modeled using Cinema 4D, each shape behaves like a liquid prism, refracting light into metallic color gradients. The collection represents the intersection of digital abstraction and high-end physical lighting mechanics.',
            typeface: 'Syne & Outfit',
            palette: [
                { hex: '#00f5ff', bg: '#00f5ff' },
                { hex: '#7b2cbf', bg: '#7b2cbf' },
                { hex: '#ff5a5f', bg: '#ff5a5f' },
                { hex: '#ffb5a7', bg: '#ffb5a7' }
            ]
        }
    };

    const lightbox = document.getElementById('project-lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxClose = document.getElementById('lightbox-close');

    const openLightbox = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;

        // Construct Swatches HTML
        let swatchesHTML = '';
        data.palette.forEach(color => {
            swatchesHTML += `
                <div class="swatch-item">
                    <div class="swatch-color" style="background-color: ${color.bg}"></div>
                    <span class="swatch-hex">${color.hex}</span>
                </div>
            `;
        });

        // Set Lightbox Content
        lightboxContent.innerHTML = `
            <div class="lightbox-header">
                <span class="lightbox-category">${data.category}</span>
                <h3 class="lightbox-title">${data.title}</h3>
            </div>
            
            <div class="lightbox-meta-grid">
                <div class="meta-item">
                    <span class="meta-label">Client</span>
                    <span class="meta-value">${data.client}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Role</span>
                    <span class="meta-value">${data.role}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Deliverables</span>
                    <span class="meta-value">${data.deliverables}</span>
                </div>
            </div>

            <img class="lightbox-showcase-img" src="${data.image}" alt="${data.title} Presentation">

            <div class="lightbox-story-section">
                <h4 class="lightbox-story-title">Project Vision & Story</h4>
                <p class="lightbox-story-text">${data.story}</p>
            </div>

            <div class="lightbox-specs-grid">
                <div class="spec-column">
                    <h5 class="spec-column-title">Visual HSL Palette</h5>
                    <div class="palette-swatches">
                        ${swatchesHTML}
                    </div>
                </div>
                <div class="spec-column">
                    <h5 class="spec-column-title">Primary Font Family</h5>
                    <div class="typeface-spec">
                        <span class="font-name">${data.typeface.split('&')[0].trim()}</span>
                        <span class="font-sample">AaBbCcDd</span>
                    </div>
                </div>
            </div>
        `;

        // Activate Modal
        lightbox?.classList.add('active');
        lightbox?.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox?.classList.remove('active');
        lightbox?.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        // Clear inner HTML after transit closes to optimize
        setTimeout(() => {
            if (!lightbox?.classList.contains('active')) {
                lightboxContent.innerHTML = '';
            }
        }, 400);
    };

    // Card click event listeners
    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-id');
            if (projectId) {
                openLightbox(projectId);
            }
        });
    });

    // Close listeners
    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.querySelector('.lightbox-backdrop')?.addEventListener('click', closeLightbox);

    // Escape Key close support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
            closeLightbox();
        }
    });


    /* ==========================================
       7. Reactive Contact Form Handling
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast-success');
    const submitBtn = contactForm?.querySelector('.btn-submit');
    const submitText = submitBtn?.querySelector('.submit-text');
    const submitSpinner = submitBtn?.querySelector('.submit-spinner');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Show spinner & disable buttons
        submitBtn.disabled = true;
        submitSpinner?.classList.remove('d-none');
        if (submitText) submitText.textContent = 'Initiating...';

        // 2. Mocking API delay
        setTimeout(() => {
            // 3. Reset Button states
            submitBtn.disabled = false;
            submitSpinner?.classList.add('d-none');
            if (submitText) submitText.textContent = 'Initiate Alignment';

            // 4. Trigger premium toast
            toast?.classList.add('active');
            contactForm.reset();

            // 5. Hide Toast after 4 seconds
            setTimeout(() => {
                toast?.classList.remove('active');
            }, 4000);

        }, 1500);
    });

});
