// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {

    // Initialize Wireframe to Webpage Animation
    initWireframeAnimation();

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // Navbar Hide/Show on Scroll (Desktop Only)
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    function updateNavbar() {
        const currentScrollY = window.pageYOffset;

        // Only apply on desktop (width > 768px)
        if (window.innerWidth > 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down & past threshold - hide navbar
                navbar.classList.add('nav-hidden');
                navbar.classList.remove('nav-visible');
            } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
                // Scrolling up or at top - show navbar
                navbar.classList.remove('nav-hidden');
                navbar.classList.add('nav-visible');
            }
        } else {
            // On mobile, always show navbar
            navbar.classList.remove('nav-hidden');
            navbar.classList.add('nav-visible');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Handle window resize to reset navbar state
    window.addEventListener('resize', function () {
        if (window.innerWidth <= 768) {
            navbar.classList.remove('nav-hidden');
            navbar.classList.add('nav-visible');
        }
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
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

    // Form Submission Handler
    const contactForm = document.querySelector('.contact-form form');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .nav-link.active {
            color: #ffffff !important;
            background-color: rgba(255, 255, 255, 0.1) !important;
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe sections for animations
    sections.forEach(section => {
        observer.observe(section);
    });

    // CTA Button Click Handler
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function () {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerOffset = 80;
                const elementPosition = contactSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.home-section');
        if (parallaxElement) {
            const speed = scrolled * 0.5;
            parallaxElement.style.transform = `translateY(${speed}px)`;
        }
    });

    // Feature cards hover effect enhancement
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Pricing cards hover effect
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            if (!card.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });

        card.addEventListener('mouseleave', function () {
            if (!card.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Login and Sign Up button handlers
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification('Login functionality coming soon!', 'info');
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification('Sign up functionality coming soon!', 'info');
        });
    }

    // Pricing button handlers
    const pricingButtons = document.querySelectorAll('.pricing-button');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const plan = this.closest('.pricing-card').querySelector('h3').textContent;
            showNotification(`${plan} plan selected! Redirecting to checkout...`, 'success');
        });
    });

    // Add loading animation
    window.addEventListener('load', function () {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('Faber3D Website initialized successfully!');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animate class when element is in view
            entry.target.classList.add('animate');
            console.log('Embossed text animation triggered');
        } else {
            // Remove animate class when element goes out of view to reset animation
            entry.target.classList.remove('animate');
            console.log('Embossed text animation reset');
        }
    });
}, {
    threshold: 0.3 // Trigger when 30% of element is visible
});

// Observe the embossed text element
const embossedText = document.querySelector('.embossed-text');
if (embossedText) {
    observer.observe(embossedText);
}

// Typewriter Animation Observer
const typewriterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animate class to trigger typewriter animation
            entry.target.classList.add('animate');
            console.log('Typewriter animation triggered');
        } else {
            // Reset animation when out of view
            entry.target.classList.remove('animate');
            console.log('Typewriter animation reset');
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of element is visible
});

// Observe the typewriter element
const typewriterElement = document.querySelector('.typewriter');
if (typewriterElement) {
    typewriterObserver.observe(typewriterElement);
}


// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========================================
// Dialog Functionality
// ========================================

function openConfigurator(title, configuratorUrl) {
    const dialog = document.getElementById('configuratorDialog');
    const dialogIframe = document.getElementById('dialogIframe');

    // Set iframe source
    dialogIframe.src = configuratorUrl;

    // Update product information based on title
    updateProductInfo(title);

    // Show the dialog
    dialog.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function updateProductInfo(productTitle) {
    // Product data mapping
    const productData = {
        'Modern Sofa': {
            category: 'LIVING ROOM',
            title: 'Modern Sofa',
            description: 'Contemporary sofa with premium upholstery and ergonomic design for maximum comfort.',
            dimensions: '220cm x 90cm x 85cm',
            material: 'Fabric & Steel',
            style: 'Contemporary',
            colors: '8 Options'
        },
        'Dining Table': {
            category: 'DINING ROOM',
            title: 'Dining Table',
            description: 'Elegant dining table with solid wood construction and timeless design.',
            dimensions: '180cm x 90cm x 75cm',
            material: 'Oak Wood',
            style: 'Classic',
            colors: '6 Options'
        },
        'Lounge Chair': {
            category: 'LIVING ROOM',
            title: 'Lounge Chair',
            description: 'Comfortable lounge chair with premium leather and modern aesthetic.',
            dimensions: '80cm x 85cm x 100cm',
            material: 'Leather & Metal',
            style: 'Modern',
            colors: '4 Options'
        },
        'Wardrobe System': {
            category: 'BEDROOM',
            title: 'Wardrobe System',
            description: 'Modular wardrobe system with customizable compartments and sleek finish.',
            dimensions: '250cm x 60cm x 220cm',
            material: 'Laminated Wood',
            style: 'Minimalist',
            colors: '7 Options'
        },
        'Office Desk': {
            category: 'OFFICE',
            title: 'Office Desk',
            description: 'Professional office desk with cable management and ergonomic height.',
            dimensions: '160cm x 80cm x 75cm',
            material: 'Wood & Steel',
            style: 'Industrial',
            colors: '5 Options'
        },
        'Bookshelf Unit': {
            category: 'OFFICE',
            title: 'Bookshelf Unit',
            description: 'Open bookshelf unit with adjustable shelves and modern aesthetic.',
            dimensions: '200cm x 40cm x 220cm',
            material: 'Metal & Wood',
            style: 'Industrial',
            colors: '5 Options'
        },
        'TV Console': {
            category: 'LIVING ROOM',
            title: 'TV Console',
            description: 'Sleek TV console with hidden cable management and storage compartments.',
            dimensions: '180cm x 45cm x 55cm',
            material: 'Wood & Glass',
            style: 'Contemporary',
            colors: '6 Options'
        },
        'Kitchen Island': {
            category: 'KITCHEN',
            title: 'Kitchen Island',
            description: 'Functional kitchen island with granite top and integrated storage.',
            dimensions: '200cm x 90cm x 90cm',
            material: 'Wood & Granite',
            style: 'Modern',
            colors: '4 Options'
        },
        'Bed Frame': {
            category: 'BEDROOM',
            title: 'Bed Frame',
            description: 'Minimalist bed frame with low profile design and quality construction.',
            dimensions: '200cm x 160cm x 30cm',
            material: 'Solid Wood',
            style: 'Minimalist',
            colors: '5 Options'
        },
        'Outdoor Set': {
            category: 'OUTDOOR',
            title: 'Outdoor Set',
            description: 'Weather-resistant outdoor furniture set perfect for patios and gardens.',
            dimensions: 'Table: 150cm x 90cm x 75cm',
            material: 'Teak & Aluminum',
            style: 'Rustic',
            colors: '3 Options'
        }
    };

    const product = productData[productTitle] || productData['Bookshelf Unit'];

    // Update DOM elements
    document.getElementById('productCategory').textContent = product.category;
    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productDimensions').textContent = product.dimensions;
    document.getElementById('productMaterial').textContent = product.material;
    document.getElementById('productStyle').textContent = product.style;
    document.getElementById('productColors').textContent = product.colors;
}

function closeConfigurator() {
    const dialog = document.getElementById('configuratorDialog');
    const dialogIframe = document.getElementById('dialogIframe');

    // Hide the dialog
    dialog.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling

    // Clear iframe source to stop loading
    setTimeout(() => {
        dialogIframe.src = '';
    }, 300);
}

// Add event listeners for dialog
document.addEventListener('DOMContentLoaded', function () {
    const dialog = document.getElementById('configuratorDialog');
    const closeBtn = document.querySelector('.dialog-close');

    // Close dialog when clicking close button
    closeBtn.addEventListener('click', closeConfigurator);

    // Close dialog when clicking outside the content
    dialog.addEventListener('click', function (e) {
        if (e.target === dialog) {
            closeConfigurator();
        }
    });

    // Close dialog with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && dialog.classList.contains('active')) {
            closeConfigurator();
        }
    });
});

// ========================================
// 🎨 CONFIGURA TUS CONTENIDOS AQUÍ
// ========================================

const row1Items = [
    {
        image: 'https://m.media-amazon.com/images/I/916LFXslqwL._AC_UF894,1000_QL80_.jpg?w=800&h=500&fit=crop',
        title: 'Modern Sofa',
        subtitle: '@studioform',
        icon: '🛋️',
        configuratorUrl: 'https://faber3d.com/Configurator/collection.html?collection=bzLyzoHdq1&object=V2gov2JyyB&conf=7&rol=1&embed'
    },
    {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
        title: 'Dining Table',
        subtitle: '@woodcraft',
        icon: '🍽️',
        configuratorUrl: 'https://faber3d.com/Configurator/collection.html?collection=bzLyzoHdq1&object=V2gov2JyyB&conf=8&rol=1&embed'
    },
    {
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=500&fit=crop',
        title: 'Lounge Chair',
        subtitle: '@comfortlab',
        icon: '🪑',
        configuratorUrl: 'https://faber3d.com/Configurator/collection.html?collection=bzLyzoHdq1&object=V2gov2JyyB&conf=9&rol=1&embed'
    },
    {
        image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=500&fit=crop',
        title: 'Wardrobe System',
        subtitle: '@closetstudio',
        icon: '👕',
        configuratorUrl: 'https://faber3d.com/Configurator/collection.html?collection=bzLyzoHdq1&object=V2gov2JyyB&conf=10&rol=1&embed'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLlfrzKnsxbMa0q4eA0mFBK97M0lkD-UW18A&s?w=800&h=500&fit=crop',
        title: 'Office Desk',
        subtitle: '@workspaceco',
        icon: '💼',
        configuratorUrl: 'https://faber3d.com/Configurator/collection.html?collection=bzLyzoHdq1&object=V2gov2JyyB&conf=11&rol=1&embed'
    }
];

const row2Items = [
    {
        image: 'https://stillserenity.com/cdn/shop/products/GY-White-Display-Cabinet-Product-Display-Cabinet-Nordic-Simple-Living-Room-Arch-Cave-Storage-Curio-Cabinet.jpg?v=1666176182?w=800&h=500&fit=crop',
        title: 'Bookshelf Unit',
        subtitle: '@oakdesign',
        icon: '📚',
        configuratorUrl: 'https://faber3d.com/Configurator/collection.html?collection=bzLyzoHdq1&object=V2gov2JyyB&conf=12&rol=1&embed'
    },
    {
        image: 'https://lagom-studio.co.uk/wp-content/uploads/2022/10/hard-wax-oil-hairpin-5.jpg?w=800&h=500&fit=crop',
        title: 'TV Console',
        subtitle: '@interiorx',
        icon: '📺',
        configuratorUrl: 'https://faber3d.com/Configurator/collection.html?collection=bzLyzoHdq1&object=V2gov2JyyB&conf=13&rol=1&embed'
    },
    {
        image: 'https://www.contemporist.com/wp-content/uploads/2022/03/modern-kitchen-cantilevered-kitchen-island-160322-1124-01.jpg?w=800&h=500&fit=crop',
        title: 'Kitchen Island',
        subtitle: '@kitchenco',
        icon: '🍳',
        configuratorUrl: 'https://faber3d.com/Configurator/collection.html?collection=bzLyzoHdq1&object=V2gov2JyyB&conf=14&rol=1&embed'
    },
    {
        image: 'https://megafurniture.sg/cdn/shop/articles/low-bed-frames-the-latest-trend-in-minimalist-bedroom-design-for-singaporeans-megafurniture_86d2e511-ffd5-4140-bd1e-9ceac7004f3d.jpg?v=1747973458?w=800&h=500&fit=crop',
        title: 'Bed Frame',
        subtitle: '@dreamhaus',
        icon: '🛏️',
        configuratorUrl: 'https://faber3d.com/Configurator/collection.html?collection=bzLyzoHdq1&object=V2gov2JyyB&conf=15&rol=1&embed'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpBrDOjnPR0SwNJpNPJFVLEDOJgl6vt27MCg&s?w=800&h=500&fit=crop',
        title: 'Outdoor Set',
        subtitle: '@gardenmade',
        icon: '🌿',
        configuratorUrl: 'https://faber3d.com/Configurator/collection.html?collection=bzLyzoHdq1&object=V2gov2JyyB&conf=16&rol=1&embed'
    }
];

// ========================================
// Funciones para crear las cards
// ========================================

function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => openConfigurator(item.title, item.configuratorUrl);

    card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="card-image">
                <div class="card-overlay">
                    <div class="card-title">${item.title}</div>
                </div>
            `;

    return card;
}

function initializeRow(rowId, items) {
    const row = document.getElementById(rowId);

    // Duplicar items para crear el efecto infinito
    // Necesitamos suficientes copias para llenar el ancho de la pantalla
    const itemsToRender = [...items, ...items, ...items];

    itemsToRender.forEach(item => {
        row.appendChild(createCard(item));
    });
}

// Inicializar las filas
initializeRow('row1', row1Items);
initializeRow('row2', row2Items);

// ========================================
// Ajustar velocidad según contenido
// ========================================

function adjustScrollSpeed() {
    const row1 = document.querySelector('.scroll-left .scroll-content');
    const row2 = document.querySelector('.scroll-right .scroll-content');

    // Calcular duración basada en el ancho del contenido
    const width1 = row1.scrollWidth / 2;
    const width2 = row2.scrollWidth / 2;

    // Velocidad constante: píxeles por segundo
    const speed = 15; // ajusta este valor para cambiar la velocidad

    const duration1 = width1 / speed;
    const duration2 = width2 / speed;

    row1.style.animationDuration = `${duration1}s`;
    row2.style.animationDuration = `${duration2}s`;
}

// Llamar después de que las imágenes se carguen
window.addEventListener('load', adjustScrollSpeed);
window.addEventListener('resize', adjustScrollSpeed);

// Materials Carousel Functionality
function initMaterialsCarousel() {
    const circles = document.querySelectorAll('.carousel-container .circle');
    const contentSlides = document.querySelectorAll('.carousel-container .content-slide');
    const titleElement = document.getElementById('carousel-title');
    const progressBar = document.getElementById('progress-bar');

    // Check if carousel elements exist
    if (!circles.length || !titleElement || !progressBar) {
        return;
    }

    const titles = [
        'Wood Textures',
        'Metal Finish',
        'Fabric Texture',
        'Leather Grain',
        'Marble Surface',
        'Glass Finish'
    ];

    let currentIndex = 0;
    const totalSlides = circles.length;
    const intervalTime = 2000; // 2 seconds

    function updateCarousel(index) {
        // Update circles with position-based classes
        circles.forEach((circle, i) => {
            // Calculate relative position from the active index
            let position = i - index;

            // Handle wraparound for circular carousel
            // Make items wrap so they always come from the right
            if (position < -2) {
                position += totalSlides;
            } else if (position > 3) {
                position -= totalSlides;
            }

            // Remove all position classes
            circle.classList.remove('active', 'pos-0', 'pos--1', 'pos--2', 'pos-1', 'pos-2', 'pos-3', 'pos--3', 'pos-left-hidden', 'pos-right-hidden');

            // Apply appropriate position class
            if (position === 0) {
                circle.classList.add('active', 'pos-0');
            } else if (position === -1) {
                circle.classList.add('pos--1');
            } else if (position === -2) {
                circle.classList.add('pos--2');
            } else if (position === 1) {
                circle.classList.add('pos-1');
            } else if (position === 2) {
                circle.classList.add('pos-2');
            } else if (position === 3) {
                // Items waiting to enter from the right
                circle.classList.add('pos-right-hidden');
            } else if (position < -2) {
                // Items exiting to the left
                circle.classList.add('pos-left-hidden');
            }
        });

        // Update content slides
        contentSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });

        // Update title with animation
        titleElement.style.animation = 'none';
        setTimeout(() => {
            titleElement.textContent = titles[index];
            titleElement.style.animation = 'fadeInUpCarousel 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards';
        }, 10);

        // Reset progress bar
        progressBar.style.animation = 'none';
        setTimeout(() => {
            progressBar.style.animation = 'progressCarousel 1.5s linear forwards';
        }, 10);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel(currentIndex);
    }

    // Auto-rotate every 1.5 seconds
    let autoRotate = setInterval(nextSlide, intervalTime);

    // Click handlers for manual navigation
    circles.forEach((circle, index) => {
        circle.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);

            // Reset auto-rotate timer
            clearInterval(autoRotate);
            autoRotate = setInterval(nextSlide, intervalTime);
        });
    });

    // Initialize
    updateCarousel(0);
}

// 3D Material Cubes
let materialCubes = [];
let materialScenes = [];
let materialRenderers = [];
let materialCameras = [];

// Material texture paths
const materialTextures = [
    'assets/materials/Wood001_1K_Color.jpg',
    'assets/materials/Metal046B_1K_Color.jpg',
    'assets/materials/Wood002_1K_Color.jpg',
    'assets/materials/Wood033_1K_Color.jpg',
    'assets/materials/Wood050_1K_Color.jpg',
    'assets/materials/Wood067_1K_Color.jpg'
];

function initMaterial3D(index) {
    const container = document.getElementById(`material-cube-${index}`);
    if (!container || !window.THREE) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Load material texture
    const textureLoader = new THREE.TextureLoader();
    const materialTexture = textureLoader.load(materialTextures[index]);

    // Improve texture quality
    materialTexture.wrapS = THREE.RepeatWrapping;
    materialTexture.wrapT = THREE.RepeatWrapping;
    materialTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Create cube with material texture
    const geometry = createRoundedBoxGeometry(3, 3, 3, 10, 0.15);
    let material;

    // Adjust material properties based on material type
    if (index === 1) { // Metal
        material = new THREE.MeshStandardMaterial({
            map: materialTexture,
            roughness: 0.3,
            metalness: 0.8
        });
    } else if (index === 5) { // Glass-like
        material = new THREE.MeshStandardMaterial({
            map: materialTexture,
            roughness: 0.1,
            metalness: 0.2,
            transparent: true,
            opacity: 0.9
        });
    } else { // Wood and other materials
        material = new THREE.MeshStandardMaterial({
            map: materialTexture,
            roughness: 0.7,
            metalness: 0.1
        });
    }

    const cube = new THREE.Mesh(geometry, material);
    geometry.center();
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // Add ground grid
    const gridSize = 12;
    const gridDivisions = 24;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x333333, 0x1a1a1a);
    gridHelper.position.y = -2;
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Add ground shadow plane
    const groundGeometry = new THREE.PlaneGeometry(gridSize, gridSize);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.1 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 5, 5);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 1024;
    directionalLight1.shadow.mapSize.height = 1024;
    directionalLight1.shadow.camera.near = 0.1;
    directionalLight1.shadow.camera.far = 15;
    directionalLight1.shadow.camera.left = -8;
    directionalLight1.shadow.camera.right = 8;
    directionalLight1.shadow.camera.top = 8;
    directionalLight1.shadow.camera.bottom = -8;
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    // Camera position
    camera.position.z = 5;

    // Mouse interaction variables
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotation = { x: 0.3, y: 0.3 };

    // Mouse events
    renderer.domElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    renderer.domElement.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            rotation.y += deltaX * 0.01;
            rotation.x += deltaY * 0.01;

            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    renderer.domElement.addEventListener('mouseup', () => {
        isDragging = false;
    });

    renderer.domElement.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // Touch events for mobile
    renderer.domElement.addEventListener('touchstart', (e) => {
        isDragging = true;
        previousMousePosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    });

    renderer.domElement.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const deltaX = e.touches[0].clientX - previousMousePosition.x;
            const deltaY = e.touches[0].clientY - previousMousePosition.y;

            rotation.y += deltaX * 0.01;
            rotation.x += deltaY * 0.01;

            previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        }
    });

    renderer.domElement.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Store references
    materialCubes[index] = cube;
    materialScenes[index] = scene;
    materialRenderers[index] = renderer;
    materialCameras[index] = camera;

    // Animation loop for this cube
    function animate() {
        requestAnimationFrame(animate);

        // Auto-rotate when not dragging
        if (!isDragging) {
            rotation.y += 0.005;
        }

        // Apply rotation
        cube.rotation.x = rotation.x;
        cube.rotation.y = rotation.y;

        renderer.render(scene, camera);
    }

    animate();
}

function createRoundedBoxGeometry(width, height, depth, segments, radius) {
    const shape = new THREE.Shape();
    const halfWidth = width / 2 - radius;
    const halfHeight = height / 2 - radius;

    shape.moveTo(-halfWidth, -halfHeight + radius);
    shape.lineTo(-halfWidth, halfHeight - radius);
    shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth + radius, halfHeight);
    shape.lineTo(halfWidth - radius, halfHeight);
    shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth, halfHeight - radius);
    shape.lineTo(halfWidth, -halfHeight + radius);
    shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth - radius, -halfHeight);
    shape.lineTo(-halfWidth + radius, -halfHeight);
    shape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth, -halfHeight + radius);

    const extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelSegments: segments,
        steps: 1,
        bevelSize: radius,
        bevelThickness: radius
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

function initAllMaterial3D() {
    // Only initialize if Three.js is loaded and containers exist
    if (!window.THREE) {
        setTimeout(initAllMaterial3D, 100);
        return;
    }

    for (let i = 0; i < 6; i++) {
        const container = document.getElementById(`material-cube-${i}`);
        if (container) {
            initMaterial3D(i);
        }
    }
}

// Handle window resize for 3D cubes
function handleMaterial3DResize() {
    materialRenderers.forEach((renderer, index) => {
        if (renderer && materialCameras[index]) {
            const container = document.getElementById(`material-cube-${index}`);
            if (container) {
                const camera = materialCameras[index];
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }
        }
    });
}

window.addEventListener('resize', handleMaterial3DResize);

// Configurator Functionality
function initConfigurator() {
    // Check if configurator elements exist
    const configuratorContainer = document.querySelector('.configurator');
    if (!configuratorContainer) {
        console.log('Configurator not found, skipping initialization');
        return;
    }

    // Configuration
    const config = {
        width: { min: 80, max: 200, current: 80 },
        height: { min: 150, max: 250, current: 150 },
        units: { min: 1, max: 5, current: 1 },
        material: 'oak',
        materialMultiplier: 1.2,
        basePrice: 240
    };

    let animationId = null;
    let isDestroyed = false;

    // Animation sequence
    const sequence = [
        { type: 'width', target: 140, duration: 1200 },
        { type: 'pause', duration: 300 },
        { type: 'height', target: 210, duration: 1200 },
        { type: 'pause', duration: 300 },
        { type: 'units', target: 3, duration: 1000 },
        { type: 'pause', duration: 300 },
        { type: 'material', target: 'walnut', duration: 300 },
        { type: 'pause', duration: 1200 },
        { type: 'material', target: 'oak', duration: 300 },
        { type: 'pause', duration: 1000 },
        // Reset sequence
        { type: 'width', target: 80, duration: 1000 },
        { type: 'pause', duration: 200 },
        { type: 'height', target: 150, duration: 1000 },
        { type: 'pause', duration: 200 },
        { type: 'units', target: 1, duration: 800 },
        { type: 'pause', duration: 1000 }
    ];

    let currentStep = 0;
    let isAnimating = false;

    function updateSlider(type, value) {
        if (isDestroyed) return;
        
        // Ensure value is within bounds
        const clampedValue = Math.max(config[type].min, Math.min(config[type].max, value));
        const range = config[type].max - config[type].min;
        const percentage = range > 0 ? ((clampedValue - config[type].min) / range) * 100 : 0;
        
        const track = document.getElementById(`${type}Track`);
        const thumb = document.getElementById(`${type}Thumb`);
        const valueDisplay = document.getElementById(`${type}Value`);

        // Robust element checking
        if (!track || !thumb || !valueDisplay) {
            console.warn(`Missing slider elements for ${type}`);
            return;
        }

        // Use transform for better performance and smoothness
        track.style.width = Math.max(0, Math.min(100, percentage)) + '%';
        thumb.style.left = Math.max(0, Math.min(100, percentage)) + '%';

        if (type === 'units') {
            const displayValue = Math.round(clampedValue);
            valueDisplay.textContent = displayValue + (displayValue === 1 ? ' unit' : ' units');
        } else {
            valueDisplay.textContent = Math.round(clampedValue) + ' cm';
        }

        config[type].current = clampedValue;
    }

    function updateMaterial(material) {
        const materialOptions = document.querySelectorAll('.material-option');
        const materialValueEl = document.getElementById('materialValue');
        
        if (!materialValueEl) return;

        materialOptions.forEach(opt => {
            opt.classList.remove('active');
            if (opt.dataset.material === material) {
                opt.classList.add('active');
                config.materialMultiplier = parseFloat(opt.dataset.multiplier);
            }
        });
        config.material = material;
        materialValueEl.textContent = material.charAt(0).toUpperCase() + material.slice(1);
    }

    function calculatePrice() {
        const { width, height, units, materialMultiplier, basePrice } = config;
        
        // Calculate size factor based on dimensions
        const widthFactor = width.current / 100;
        const heightFactor = height.current / 200;
        const sizeFactor = (widthFactor + heightFactor) / 2;
        
        // Calculate total
        const total = Math.round(basePrice * materialMultiplier * sizeFactor * units.current);
        
        // Update UI
        const materialMultiplierEl = document.getElementById('materialMultiplier');
        const sizeFactorEl = document.getElementById('sizeFactor');
        const totalPriceEl = document.getElementById('totalPrice');

        if (materialMultiplierEl) materialMultiplierEl.textContent = 'x' + materialMultiplier.toFixed(1);
        if (sizeFactorEl) sizeFactorEl.textContent = 'x' + sizeFactor.toFixed(2);
        if (totalPriceEl) {
            totalPriceEl.textContent = '€ ' + total;
            
            // Pulse animation
            totalPriceEl.classList.add('updating');
            setTimeout(() => {
                totalPriceEl.classList.remove('updating');
            }, 400);
        }
    }

    function animateValue(type, start, end, duration) {
        return new Promise(resolve => {
            if (isDestroyed) {
                resolve();
                return;
            }

            const startTime = Date.now();
            const range = end - start;
            let animationId = null;

            function update() {
                if (isDestroyed) {
                    if (animationId) cancelAnimationFrame(animationId);
                    resolve();
                    return;
                }

                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Linear progression for continuous speed with bounds checking
                const current = start + range * progress;
                
                updateSlider(type, current);
                calculatePrice();

                if (progress < 1 && !isDestroyed) {
                    animationId = requestAnimationFrame(update);
                } else {
                    animationId = null;
                    resolve();
                }
            }

            animationId = requestAnimationFrame(update);
            
            // Store animation ID for cleanup if destroyed
            if (isDestroyed && animationId) {
                cancelAnimationFrame(animationId);
                resolve();
            }
        });
    }

    async function runSequence() {
        if (isDestroyed || isAnimating) return;
        isAnimating = true;

        try {
            const step = sequence[currentStep];
            if (!step) {
                isAnimating = false;
                return;
            }

            if (step.type === 'pause') {
                await new Promise(resolve => {
                    const timeoutId = setTimeout(() => {
                        if (!isDestroyed) resolve();
                    }, step.duration);
                    if (isDestroyed) {
                        clearTimeout(timeoutId);
                        resolve();
                    }
                });
            } else if (step.type === 'material') {
                if (!isDestroyed) {
                    updateMaterial(step.target);
                    calculatePrice();
                    await new Promise(resolve => {
                        const timeoutId = setTimeout(() => {
                            if (!isDestroyed) resolve();
                        }, step.duration);
                        if (isDestroyed) {
                            clearTimeout(timeoutId);
                            resolve();
                        }
                    });
                }
            } else {
                const start = config[step.type].current;
                await animateValue(step.type, start, step.target, step.duration);
            }

            if (!isDestroyed) {
                currentStep = (currentStep + 1) % sequence.length;
            }
        } catch (error) {
            console.warn('Animation sequence error:', error);
        } finally {
            isAnimating = false;
        }
        
        // Continue sequence with safety check
        if (!isDestroyed) {
            const nextId = setTimeout(() => {
                if (!isDestroyed) runSequence();
            }, 100);
            if (isDestroyed) clearTimeout(nextId);
        }
    }

    // Initialize configurator with safety checks
    try {
        updateSlider('width', config.width.current);
        updateSlider('height', config.height.current);
        updateSlider('units', config.units.current);
        calculatePrice();

        // Start animation after a brief delay with destroy check
        const startTimeoutId = setTimeout(() => {
            if (!isDestroyed) runSequence();
        }, 1000);
        
        // Cleanup timeout if destroyed
        if (isDestroyed) clearTimeout(startTimeoutId);
        
    } catch (error) {
        console.warn('Configurator initialization failed:', error);
        isDestroyed = true;
    }

    // Add cleanup function to window for potential external cleanup
    window.destroyConfigurator = function() {
        isDestroyed = true;
        isAnimating = false;
        console.log('Configurator destroyed');
    };
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Small delay to ensure all elements are rendered
    setTimeout(() => {
        initMaterialsCarousel();
        initAllMaterial3D();
        initConfigurator();
        initMorphingCube();
        initParametricFurniture();
        initFormulaDiagram();
    }, 200);
});

// Morphing Cube Implementation
function initMorphingCube() {
    const container = document.getElementById('morphingCube1');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f0f);
    scene.fog = new THREE.Fog(0x0f0f0f, 8, 20);

    // Camera
    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(3, 2.5, 4);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight1.position.set(5, 5, 5);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 1024;
    directionalLight1.shadow.mapSize.height = 1024;
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(-3, 3, -3);
    scene.add(directionalLight2);

    // Helper function to create rounded box geometry
    function createRoundedBoxGeometry(width, height, depth, radius, segments) {
        const shape = new THREE.Shape();
        const eps = 0.00001;
        const r = radius - eps;
        
        shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
        shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
        shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
        shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
        
        const extrudeSettings = {
            depth: depth - radius * 2,
            bevelEnabled: true,
            bevelSegments: segments,
            steps: 1,
            bevelSize: r,
            bevelThickness: radius
        };
        
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geometry.center();
        
        return geometry;
    }

    // Create the morphing cube with rounded edges
    const cubeGeometry = createRoundedBoxGeometry(1.5, 1.5, 1.5, 0.1, 6);
    const cubeMaterial = new THREE.MeshStandardMaterial({
        color: 0x505050,
        roughness: 0.4,
        metalness: 0.4,
        envMapIntensity: 1
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // Create a group for axes that will rotate with the cube
    const axesGroup = new THREE.Group();
    scene.add(axesGroup);

    // Create axes sticks (smaller for the card view)
    const stickGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 12);
    
    // Create rounded tips for axes
    const tipGeometry = new THREE.SphereGeometry(0.04, 12, 12);
    
    // Y-axis (green, pointing up)
    const greenMaterial = new THREE.MeshStandardMaterial({
        color: 0x4ade80,
        roughness: 0.3,
        metalness: 0.6
    });
    const greenStick = new THREE.Mesh(stickGeometry, greenMaterial);
    greenStick.position.y = 1.1;
    greenStick.castShadow = true;
    axesGroup.add(greenStick);
    
    const greenTip = new THREE.Mesh(tipGeometry, greenMaterial);
    greenTip.position.y = 1.7;
    greenTip.castShadow = true;
    axesGroup.add(greenTip);

    // X-axis (blue, pointing left)
    const blueMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        roughness: 0.3,
        metalness: 0.6
    });
    const blueStick = new THREE.Mesh(stickGeometry, blueMaterial);
    blueStick.rotation.z = Math.PI / 2;
    blueStick.position.x = -1.1;
    blueStick.castShadow = true;
    axesGroup.add(blueStick);
    
    const blueTip = new THREE.Mesh(tipGeometry, blueMaterial);
    blueTip.position.x = -1.7;
    blueTip.castShadow = true;
    axesGroup.add(blueTip);

    // Z-axis (red, pointing forward)
    const redMaterial = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        roughness: 0.3,
        metalness: 0.6
    });
    const redStick = new THREE.Mesh(stickGeometry, redMaterial);
    redStick.rotation.x = Math.PI / 2;
    redStick.position.z = 1.1;
    redStick.castShadow = true;
    axesGroup.add(redStick);
    
    const redTip = new THREE.Mesh(tipGeometry, redMaterial);
    redTip.position.z = 1.7;
    redTip.castShadow = true;
    axesGroup.add(redTip);

    // Create subtle grid ground (smaller for card view)
    const gridSize = 8;
    const gridDivisions = 16;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x333333, 0x1a1a1a);
    gridHelper.position.y = -1.2;
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Animation variables
    let time = 0;
    const morphDuration = 2.0; // duration for each transformation
    const pauseDuration = 0.4;
    let isDestroyed = false;

    // Animation scales for the three-stage sequence
    const originalScale = { x: 1, y: 1, z: 1 };
    const rectangleScale = { x: 2, y: 0.6, z: 1 };
    const tallScale = { x: 2, y: 1.8, z: 1 };

    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animate() {
        if (isDestroyed) return;
        requestAnimationFrame(animate);

        time += 0.016; // ~60fps

        const totalCycle = (morphDuration + pauseDuration) * 3; // 3 stages now
        const cycleTime = time % totalCycle;

        let progress = 0;
        let targetScale = { ...originalScale };

        if (cycleTime < morphDuration) {
            // Stage 1: Cube to Rectangle
            progress = cycleTime / morphDuration;
            const eased = easeInOutCubic(progress);
            
            targetScale.x = originalScale.x + (rectangleScale.x - originalScale.x) * eased;
            targetScale.y = originalScale.y + (rectangleScale.y - originalScale.y) * eased;
            targetScale.z = originalScale.z + (rectangleScale.z - originalScale.z) * eased;
            
        } else if (cycleTime < morphDuration + pauseDuration) {
            // Pause at rectangle
            targetScale = { ...rectangleScale };
            
        } else if (cycleTime < morphDuration * 2 + pauseDuration) {
            // Stage 2: Rectangle to Tall Rectangle
            progress = (cycleTime - morphDuration - pauseDuration) / morphDuration;
            const eased = easeInOutCubic(progress);
            
            targetScale.x = rectangleScale.x + (tallScale.x - rectangleScale.x) * eased;
            targetScale.y = rectangleScale.y + (tallScale.y - rectangleScale.y) * eased;
            targetScale.z = rectangleScale.z + (tallScale.z - rectangleScale.z) * eased;
            
        } else if (cycleTime < morphDuration * 2 + pauseDuration * 2) {
            // Pause at tall rectangle
            targetScale = { ...tallScale };
            
        } else if (cycleTime < morphDuration * 3 + pauseDuration * 2) {
            // Stage 3: Tall Rectangle back to Cube
            progress = (cycleTime - morphDuration * 2 - pauseDuration * 2) / morphDuration;
            const eased = easeInOutCubic(progress);
            
            targetScale.x = tallScale.x + (originalScale.x - tallScale.x) * eased;
            targetScale.y = tallScale.y + (originalScale.y - tallScale.y) * eased;
            targetScale.z = tallScale.z + (originalScale.z - tallScale.z) * eased;
            
        } else {
            // Pause at cube
            targetScale = { ...originalScale };
        }

        // Apply scale smoothly
        cube.scale.set(targetScale.x, targetScale.y, targetScale.z);

        // Gentle rotation
        cube.rotation.y = time * 0.12;
        cube.rotation.x = Math.sin(time * 0.08) * 0.08;
        
        // Axes follow the cube rotation
        axesGroup.rotation.copy(cube.rotation);

        // Subtle camera movement
        const cameraRotation = time * 0.03;
        camera.position.x = Math.cos(cameraRotation) * 4 + 0.5;
        camera.position.z = Math.sin(cameraRotation) * 4 + 0.5;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    // Handle container resize
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const { width, height } = entry.contentRect;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
    });
    resizeObserver.observe(container);

    // Cleanup function
    window.addEventListener('beforeunload', () => {
        isDestroyed = true;
        resizeObserver.disconnect();
        renderer.dispose();
    });

    // Start animation
    animate();

    return {
        destroy: () => {
            isDestroyed = true;
            resizeObserver.disconnect();
            if (renderer) {
                renderer.dispose();
                container.removeChild(renderer.domElement);
            }
        }
    };
}

// Parametric Furniture Implementation
function initParametricFurniture() {
    const container = document.getElementById('parametricFurniture');
    if (!container) return;

    let scene, camera, renderer, furniture;
    let isDestroyed = false;

    // Current parameters
    let currentParams = {
        width: 1200,
        height: 1800,
        depth: 400
    };

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    // Camera
    camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(1800, 1400, 1800);
    camera.lookAt(0, 800, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(1000, 2000, 1000);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const rimLight = new THREE.DirectionalLight(0x4ade80, 0.4);
    rimLight.position.set(-500, 800, -500);
    scene.add(rimLight);

    // Ground shadow
    const groundGeometry = new THREE.PlaneGeometry(3000, 3000);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create furniture function
    function createFurniture(w, h, d) {
        if (furniture) {
            scene.remove(furniture);
        }

        const group = new THREE.Group();
        const t = 20; // thickness

        const woodMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b6f47,
            roughness: 0.6,
            metalness: 0.1
        });

        // Back panel
        const back = new THREE.Mesh(new THREE.BoxGeometry(w, h, t), woodMaterial);
        back.position.set(0, h / 2, -d / 2 + t / 2);
        back.castShadow = true;
        group.add(back);

        // Left and right sides
        const leftSide = new THREE.Mesh(new THREE.BoxGeometry(t, h, d), woodMaterial);
        leftSide.position.set(-w / 2 + t / 2, h / 2, 0);
        leftSide.castShadow = true;
        group.add(leftSide);

        const rightSide = new THREE.Mesh(new THREE.BoxGeometry(t, h, d), woodMaterial);
        rightSide.position.set(w / 2 - t / 2, h / 2, 0);
        rightSide.castShadow = true;
        group.add(rightSide);

        // Top and bottom
        const topGeometry = new THREE.BoxGeometry(w, t, d);
        const top = new THREE.Mesh(topGeometry, woodMaterial);
        top.position.set(0, h - t / 2, 0);
        top.castShadow = true;
        group.add(top);

        const bottom = new THREE.Mesh(topGeometry, woodMaterial);
        bottom.position.set(0, t / 2, 0);
        bottom.castShadow = true;
        group.add(bottom);

        // Shelves (3 adjustable shelves)
        const shelfCount = 3;
        for (let i = 1; i <= shelfCount; i++) {
            const shelf = new THREE.Mesh(
                new THREE.BoxGeometry(w - t * 2, t, d - t), 
                woodMaterial
            );
            shelf.position.set(0, (h / (shelfCount + 1)) * i, t / 2);
            shelf.castShadow = true;
            group.add(shelf);
        }

        // Add subtle edge glow effect
        const edgesMaterial = new THREE.LineBasicMaterial({ 
            color: 0x4ade80, 
            opacity: 0.15, 
            transparent: true 
        });
        
        group.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const edges = new THREE.EdgesGeometry(child.geometry);
                const line = new THREE.LineSegments(edges, edgesMaterial);
                child.add(line);
            }
        });

        furniture = group;
        scene.add(group);
    }

    // Animation loop
    function animate() {
        if (isDestroyed) return;
        requestAnimationFrame(animate);
        
        if (furniture) {
            furniture.rotation.y += 0.003;
        }
        
        renderer.render(scene, camera);
    }

    // Initialize sliders
    function initSliders() {
        const widthSlider = document.getElementById('widthSlider');
        const heightSlider = document.getElementById('heightSlider');
        const depthSlider = document.getElementById('depthSlider');
        
        const widthValue = document.getElementById('paramWidth');
        const heightValue = document.getElementById('paramHeight');
        const depthValue = document.getElementById('paramDepth');

        if (!widthSlider || !heightSlider || !depthSlider) return;

        function updateFurniture() {
            createFurniture(currentParams.width, currentParams.height, currentParams.depth);
        }

        widthSlider.addEventListener('input', (e) => {
            currentParams.width = parseInt(e.target.value);
            if (widthValue) widthValue.textContent = currentParams.width;
            updateFurniture();
        });

        heightSlider.addEventListener('input', (e) => {
            currentParams.height = parseInt(e.target.value);
            if (heightValue) heightValue.textContent = currentParams.height;
            updateFurniture();
        });

        depthSlider.addEventListener('input', (e) => {
            currentParams.depth = parseInt(e.target.value);
            if (depthValue) depthValue.textContent = currentParams.depth;
            updateFurniture();
        });
    }

    // Handle container resize
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const { width, height } = entry.contentRect;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
    });
    resizeObserver.observe(container);

    // Initialize
    createFurniture(currentParams.width, currentParams.height, currentParams.depth);
    initSliders();
    animate();

    // Cleanup
    window.addEventListener('beforeunload', () => {
        isDestroyed = true;
        resizeObserver.disconnect();
        renderer.dispose();
    });

    return {
        destroy: () => {
            isDestroyed = true;
            resizeObserver.disconnect();
            if (renderer && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
                renderer.dispose();
            }
        }
    };
}

// Formula Diagram Implementation
function initFormulaDiagram() {
    const canvas = document.getElementById('formulaCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let hoveredNode = null;
    let animationFrame = null;
    let time = 0;
    let isDestroyed = false;
    let autoHoverIndex = 0;
    let autoHoverTimer = 0;
    const autoHoverDuration = 3; // 3 seconds per node
    const nodeOrder = ['height', 'width', 'depth', 'spacing', 'volume', 'shelves'];

    // Define nodes with geometric icon types (horizontal layout - centered)
    const nodes = [
        { id: 'height', label: 'Height', x: 100, y: 70, icon: 'ruler', color: '#3b82f6' },
        { id: 'width', label: 'Width', x: 100, y: 160, icon: 'dimension', color: '#3b82f6' },
        { id: 'depth', label: 'Depth', x: 100, y: 250, icon: 'cube', color: '#3b82f6' },
        { id: 'spacing', label: 'Spacing', x: 300, y: 115, icon: 'distribute', color: '#8b5cf6' },
        { id: 'volume', label: 'Volume', x: 300, y: 205, icon: 'box', color: '#8b5cf6' },
        { id: 'shelves', label: 'Shelf Count', x: 500, y: 160, icon: 'layers', color: '#ec4899' },
    ];

    // Define connections (horizontal flow: left to right)
    const connections = [
        { from: 'height', to: 'spacing' },
        { from: 'width', to: 'spacing' },
        { from: 'height', to: 'volume' },
        { from: 'width', to: 'volume' },
        { from: 'depth', to: 'volume' },
        { from: 'spacing', to: 'shelves' },
        { from: 'volume', to: 'shelves' },
    ];

    // Setup canvas
    function setupCanvas() {
        const container = canvas.parentElement;
        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();
        
        // Ensure minimum width and proper scaling
        const containerWidth = Math.max(rect.width, 400);
        
        canvas.width = containerWidth * dpr;
        canvas.height = 360 * dpr;
        canvas.style.width = containerWidth + 'px';
        canvas.style.height = '360px';
        ctx.scale(dpr, dpr);
        
        // Reset and scale nodes to fit container width properly (centered vertically)
        const baseNodes = [
            { id: 'height', x: 100, y: 70 },
            { id: 'width', x: 100, y: 160 },
            { id: 'depth', x: 100, y: 250 },
            { id: 'spacing', x: 300, y: 115 },
            { id: 'volume', x: 300, y: 205 },
            { id: 'shelves', x: 500, y: 160 }
        ];
        
        const scaleX = containerWidth / 600;
        nodes.forEach((node, i) => {
            const baseNode = baseNodes.find(bn => bn.id === node.id);
            if (baseNode) {
                node.x = baseNode.x * scaleX;
                node.y = baseNode.y;
            }
        });
    }

    // Draw icon functions
    function drawIcon(type, x, y, size, color, isHovered) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = isHovered ? 1 : 0.8;

        switch (type) {
            case 'ruler':
                ctx.beginPath();
                ctx.moveTo(x, y - size);
                ctx.lineTo(x, y + size);
                ctx.moveTo(x - size * 0.5, y - size * 0.7);
                ctx.lineTo(x + size * 0.5, y - size * 0.7);
                ctx.moveTo(x - size * 0.5, y + size * 0.7);
                ctx.lineTo(x + size * 0.5, y + size * 0.7);
                ctx.stroke();
                break;

            case 'dimension':
                ctx.beginPath();
                ctx.moveTo(x - size, y);
                ctx.lineTo(x + size, y);
                ctx.moveTo(x - size, y - size * 0.5);
                ctx.lineTo(x - size, y + size * 0.5);
                ctx.moveTo(x + size, y - size * 0.5);
                ctx.lineTo(x + size, y + size * 0.5);
                ctx.stroke();
                break;

            case 'cube':
                ctx.beginPath();
                ctx.moveTo(x - size * 0.5, y - size * 0.3);
                ctx.lineTo(x + size * 0.5, y - size * 0.3);
                ctx.lineTo(x + size * 0.5, y + size * 0.5);
                ctx.lineTo(x - size * 0.5, y + size * 0.5);
                ctx.closePath();
                ctx.moveTo(x - size * 0.5, y - size * 0.3);
                ctx.lineTo(x, y - size * 0.7);
                ctx.lineTo(x + size, y - size * 0.7);
                ctx.lineTo(x + size * 0.5, y - size * 0.3);
                ctx.moveTo(x + size * 0.5, y - size * 0.3);
                ctx.lineTo(x + size, y - size * 0.7);
                ctx.lineTo(x + size, y + size * 0.1);
                ctx.lineTo(x + size * 0.5, y + size * 0.5);
                ctx.stroke();
                break;

            case 'distribute':
                ctx.beginPath();
                ctx.moveTo(x - size * 0.7, y - size * 0.6);
                ctx.lineTo(x + size * 0.7, y - size * 0.6);
                ctx.moveTo(x - size * 0.7, y);
                ctx.lineTo(x + size * 0.7, y);
                ctx.moveTo(x - size * 0.7, y + size * 0.6);
                ctx.lineTo(x + size * 0.7, y + size * 0.6);
                ctx.moveTo(x, y - size * 0.6);
                ctx.lineTo(x, y + size * 0.6);
                ctx.stroke();
                break;

            case 'box':
                ctx.strokeRect(x - size * 0.6, y - size * 0.5, size * 1.2, size);
                ctx.beginPath();
                ctx.moveTo(x - size * 0.6, y);
                ctx.lineTo(x + size * 0.6, y);
                ctx.moveTo(x, y - size * 0.5);
                ctx.lineTo(x, y + size * 0.5);
                ctx.stroke();
                break;

            case 'layers':
                const offset = size * 0.25;
                ctx.beginPath();
                ctx.moveTo(x - size, y - offset);
                ctx.lineTo(x, y - size - offset);
                ctx.lineTo(x + size, y - offset);
                ctx.lineTo(x, y + size * 0.5 - offset);
                ctx.closePath();
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(x - size, y + offset);
                ctx.lineTo(x, y - size * 0.5 + offset);
                ctx.lineTo(x + size, y + offset);
                ctx.lineTo(x, y + size + offset);
                ctx.closePath();
                ctx.stroke();
                break;
        }
        
        ctx.globalAlpha = 1;
    }

    function animate() {
        if (isDestroyed) return;
        
        time += 0.015;
        autoHoverTimer += 0.015;
        
        // Auto-hover animation: cycle through nodes every 3 seconds
        if (autoHoverTimer >= autoHoverDuration) {
            autoHoverTimer = 0;
            autoHoverIndex = (autoHoverIndex + 1) % nodeOrder.length;
            hoveredNode = nodeOrder[autoHoverIndex];
        }
        
        const canvasWidth = canvas.clientWidth || 600;
        const canvasHeight = 360;
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw connections
        connections.forEach((conn, index) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            
            if (!fromNode || !toNode) return;

            const isRelated = hoveredNode === conn.from || hoveredNode === conn.to;
            
            // Calculate curve control points
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const offsetX = -dy * 0.2;
            const offsetY = dx * 0.2;

            // Draw curved line (horizontal flow)
            ctx.beginPath();
            ctx.moveTo(fromNode.x + 30, fromNode.y);
            ctx.quadraticCurveTo(
                midX + offsetX * 0.5,
                midY + offsetY * 0.5,
                toNode.x - 30,
                toNode.y
            );
            
            const alpha = isRelated ? '80' : '30';
            ctx.strokeStyle = `${fromNode.color}${alpha}`;
            ctx.lineWidth = isRelated ? 2.5 : 1.5;
            ctx.stroke();

            // Animated flow particle
            if (isRelated) {
                const flowSpeed = (time + index * 0.5) % 1;
                const t = flowSpeed;
                
                const x = Math.pow(1 - t, 2) * (fromNode.x + 30) + 
                         2 * (1 - t) * t * (midX + offsetX * 0.5) + 
                         Math.pow(t, 2) * (toNode.x - 30);
                const y = Math.pow(1 - t, 2) * fromNode.y + 
                         2 * (1 - t) * t * (midY + offsetY * 0.5) + 
                         Math.pow(t, 2) * toNode.y;
                
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = toNode.color;
                ctx.fill();
            }
        });

        // Draw nodes
        nodes.forEach(node => {
            const isHovered = hoveredNode === node.id;
            const scale = isHovered ? 1.08 : 1;
            const size = 60 * scale;

            // Glow effect
            if (isHovered) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, size / 2 + 8, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, size / 2,
                    node.x, node.y, size / 2 + 8
                );
                gradient.addColorStop(0, node.color + '40');
                gradient.addColorStop(1, node.color + '00');
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            // Node background
            ctx.beginPath();
            const cornerRadius = 12;
            const x = node.x - size / 2;
            const y = node.y - size / 2;
            ctx.roundRect(x, y, size, size, cornerRadius);
            ctx.fillStyle = isHovered ? '#1a1a1a' : '#0f0f0f';
            ctx.fill();
            ctx.strokeStyle = isHovered ? node.color : '#2a2a2a';
            ctx.lineWidth = isHovered ? 2 : 1.5;
            ctx.stroke();

            // Draw icon
            drawIcon(node.icon, node.x, node.y, 12, node.color, isHovered);

            // Label below node
            ctx.font = isHovered ? 'bold 11px Inter, sans-serif' : '11px Inter, sans-serif';
            ctx.fillStyle = isHovered ? '#ffffff' : '#9ca3af';
            ctx.textAlign = 'center';
            ctx.fillText(node.label, node.x, node.y + size / 2 + 18);
        });

        animationFrame = requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let foundNode = null;
        for (const node of nodes) {
            const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2));
            if (distance < 30) {
                foundNode = node.id;
                break;
            }
        }

        // Manual hover overrides auto-hover
        if (foundNode) {
            hoveredNode = foundNode;
            autoHoverTimer = 0; // Reset auto-hover timer
        }
    }

    function handleMouseLeave() {
        // Resume auto-hover when mouse leaves
        autoHoverTimer = 0;
        autoHoverIndex = (autoHoverIndex + 1) % nodeOrder.length;
        hoveredNode = nodeOrder[autoHoverIndex];
    }

    // Initialize with delay to ensure container is properly sized
    setTimeout(() => {
        setupCanvas();
        animate();
    }, 100);
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
        if (!isDestroyed) {
            setTimeout(() => {
                setupCanvas();
            }, 50);
        }
    });
    resizeObserver.observe(canvas.parentElement);

    // Cleanup
    window.addEventListener('beforeunload', () => {
        isDestroyed = true;
        if (animationFrame) cancelAnimationFrame(animationFrame);
        resizeObserver.disconnect();
    });

    return {
        destroy: () => {
            isDestroyed = true;
            if (animationFrame) cancelAnimationFrame(animationFrame);
            resizeObserver.disconnect();
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        }
    };
}

// =============================================================================
// Wireframe to Webpage Animation
// =============================================================================
function initWireframeAnimation() {
    const canvas = document.getElementById('wireframeCanvas');
    const finalWebImage = document.getElementById('finalWebImage');
    if (!canvas || !finalWebImage) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas size
    canvas.width = 1200 * dpr;
    canvas.height = 800 * dpr;
    // canvas.style.width = '1200px';
    // canvas.style.height = '800px';
    ctx.scale(dpr, dpr);

    let startTime = null;
    const totalDuration = 8000; // 8 seconds total animation
    let animationFrame = null;
    let isAnimating = false;
    let animationComplete = false;

    const progressBar = document.getElementById('wireframeProgress');
    const progressText = document.getElementById('wireframeProgressText');

    function animate() {
        if (!startTime) {
            startTime = Date.now();
        }

        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const rawProgress = Math.min(elapsed / totalDuration, 1);
        
        // Easing function for smooth animation
        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        const animProgress = easeInOutCubic(rawProgress);

        // Update progress bar
        if (progressBar) {
            progressBar.style.width = `${animProgress * 100}%`;
        }
        if (progressText) {
            progressText.textContent = animProgress < 0.4 ? 'Drawing...' : 
                                       animProgress < 0.6 ? 'Transforming...' : 'Complete';
        }

        ctx.clearRect(0, 0, 1200, 800);

        // If wireframe is complete and we're in the spring-out phase (50-100%)
        if (animProgress >= 0.5) {
            // Calculate spring-out progress (0 to 1 over the last 50%)
            const springProgress = (animProgress - 0.5) / 0.5;
            
            // Simple easeOut for smooth appearance without bounce
            const easeOut = (t) => {
                return 1 - Math.pow(1 - t, 3);
            };
            
            const opacity = easeOut(springProgress); // Fade in smoothly
            
            // Scale from 100% to 105%
            const scale = 1 + (springProgress * 0.05);
            
            // Show the HTML image element with fade effect and scale
            finalWebImage.style.display = 'block';
            finalWebImage.style.opacity = opacity;
            finalWebImage.style.transform = `translate(-50%, 0) scale(${scale})`;
            
            // Hide canvas content during image display
            ctx.clearRect(0, 0, 1200, 800);
        } else {
            // Hide image during wireframe phase
            finalWebImage.style.display = 'none';
            
            // Calculate animation phases based on progress (only up to 50%)
            const wireframePhase = Math.min(animProgress * 2, 1); // Complete by 50%
            const transitionPhase = 0; // No transition to color
            const colorPhase = 0; // Stay in wireframe

            // Draw wireframe browser window
            drawWireframeBrowser(ctx, wireframePhase, transitionPhase, colorPhase);
        }

        // Stop animation when complete
        if (rawProgress >= 1) {
            animationComplete = true;
            isAnimating = false;
            return;
        }

        animationFrame = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (isAnimating) return;
        
        isAnimating = true;
        startTime = null;
        animationComplete = false;
        animate();
    }

    function resetAnimation() {
        startTime = null;
        animationComplete = false;
        isAnimating = false;
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
        // Hide the image when resetting
        if (finalWebImage) {
            finalWebImage.style.display = 'none';
            finalWebImage.style.opacity = '0';
            finalWebImage.style.transform = 'translate(-50%, 0) scale(1)';
        }
    }

    // Intersection Observer to detect when canvas is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Always restart animation when scrolling into view
                resetAnimation();
                startAnimation();
            } else {
                // Stop and reset when scrolling out of view
                resetAnimation();
            }
        });
    }, {
        threshold: 0.3 // Start when 30% of canvas is visible
    });

    observer.observe(canvas);

    function drawWireframeBrowser(ctx, wireframe, transition, color) {
        const margin = 100;
        const browserWidth = 1000;
        const browserHeight = 560; // Reduced from 600 to fit within canvas
        const x = margin;
        const y = margin;

        // Browser chrome outline
        if (wireframe > 0) {
            const chromeProgress = Math.min(wireframe * 2, 1);
            
            ctx.strokeStyle = color > 0 ? `rgba(75, 85, 99, ${1 - color * 0.5})` : '#6b7280';
            ctx.lineWidth = 2;
            
            // Draw rounded rectangle path
            const radius = 12;
            ctx.beginPath();
            
            // Top-left corner
            ctx.moveTo(x + radius, y);
            
            // Top line
            if (chromeProgress > 0) {
                const topProgress = Math.min(chromeProgress * 4, 1);
                ctx.lineTo(x + radius + (browserWidth - radius * 2) * topProgress, y);
                
                // Top-right corner
                if (topProgress >= 1 && chromeProgress > 0.25) {
                    const cornerProgress = Math.min((chromeProgress - 0.25) * 4, 1);
                    const angle = cornerProgress * Math.PI / 2;
                    ctx.arc(x + browserWidth - radius, y + radius, radius, -Math.PI / 2, -Math.PI / 2 + angle);
                }
            }
            
            // Right line
            if (chromeProgress > 0.25) {
                const rightProgress = Math.min((chromeProgress - 0.25) / 0.25, 1);
                const verticalLineLength = browserHeight - radius * 2;
                ctx.lineTo(x + browserWidth, y + radius + verticalLineLength * rightProgress);
                
                // Bottom-right corner
                if (rightProgress >= 1 && chromeProgress > 0.5) {
                    const cornerProgress = Math.min((chromeProgress - 0.5) * 4, 1);
                    const angle = cornerProgress * Math.PI / 2;
                    ctx.arc(x + browserWidth - radius, y + radius + verticalLineLength, radius, 0, angle);
                }
            }
            
            // Bottom line
            if (chromeProgress > 0.5) {
                const bottomProgress = Math.min((chromeProgress - 0.5) / 0.25, 1);
                const bottomY = y + browserHeight - radius;
                ctx.lineTo(x + browserWidth - radius - (browserWidth - radius * 2) * bottomProgress, bottomY);
                
                // Bottom-left corner
                if (bottomProgress >= 1 && chromeProgress > 0.75) {
                    const cornerProgress = Math.min((chromeProgress - 0.75) * 4, 1);
                    const angle = cornerProgress * Math.PI / 2;
                    ctx.arc(x + radius, bottomY - radius, radius, Math.PI / 2, Math.PI / 2 + angle);
                }
            }
            
            // Left line
            if (chromeProgress > 0.75) {
                const leftProgress = Math.min((chromeProgress - 0.75) / 0.25, 1);
                const verticalLineLength = browserHeight - radius * 2;
                const bottomY = y + browserHeight - radius;
                ctx.lineTo(x, bottomY - verticalLineLength * leftProgress);
                
                // Top-left corner completion
                if (leftProgress >= 1) {
                    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
                }
            }
            
            ctx.stroke();
        }

        // Browser toolbar
        if (wireframe > 0.15) {
            const toolbarProgress = Math.min((wireframe - 0.15) / 0.15, 1);
            const toolbarHeight = 50;
            
            // Toolbar background - gray
            if (color > 0 && toolbarProgress > 0) {
                ctx.fillStyle = 'rgba(229, 231, 235, 0.95)';
                ctx.fillRect(x, y, browserWidth * toolbarProgress, toolbarHeight);
            }
            
            // Toolbar separator line
            ctx.strokeStyle = color > 0 ? `rgba(209, 213, 219, ${1 - color * 0.5})` : '#6b7280';
            ctx.beginPath();
            ctx.moveTo(x, y + toolbarHeight);
            ctx.lineTo(x + browserWidth * toolbarProgress, y + toolbarHeight);
            ctx.stroke();

            // Browser dots
            if (toolbarProgress > 0.3) {
                const dotProgress = (toolbarProgress - 0.3) / 0.7;
                for (let i = 0; i < 3; i++) {
                    if (dotProgress > i * 0.2) {
                        ctx.beginPath();
                        ctx.arc(x + 30 + i * 20, y + 25, 6, 0, Math.PI * 2);
                        if (color > 0) {
                            const colors = ['#ef4444', '#fbbf24', '#22c55e'];
                            ctx.fillStyle = colors[i];
                            ctx.fill();
                        } else {
                            ctx.stroke();
                        }
                    }
                }
            }

            // URL bar
            if (toolbarProgress > 0.5) {
                const urlProgress = (toolbarProgress - 0.5) / 0.5;
                const urlWidth = 600;
                const urlX = x + 150;
                
                ctx.strokeStyle = color > 0 ? `rgba(209, 213, 219, 1)` : '#6b7280';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.roundRect(urlX, y + 15, urlWidth * urlProgress, 20, 10);
                ctx.stroke();
                
                if (color > 0 && urlProgress > 0.3) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.fill();
                }
            }
        }

        const contentY = y + 50;
        const contentHeight = browserHeight - 50;
        
        // Content area background - light
        if (wireframe > 0.2 && color > 0) {
            const contentProgress = Math.min((wireframe - 0.2) / 0.1, 1);
            ctx.fillStyle = 'rgba(249, 250, 251, 0.98)';
            ctx.fillRect(x, contentY, browserWidth * contentProgress, contentHeight);
        }

        // Header section
        if (wireframe > 0.3) {
            const headerProgress = Math.min((wireframe - 0.3) / 0.15, 1);
            drawHeader(ctx, x, contentY + 10, browserWidth, headerProgress, transition, color);
        }

        // Navigation - below header
        if (wireframe > 0.45) {
            const navProgress = Math.min((wireframe - 0.45) / 0.15, 1);
            drawNavigation(ctx, x, contentY + 55, browserWidth, navProgress, transition, color);
        }

        // Hero section (furniture + controls)
        if (wireframe > 0.6) {
            const heroProgress = Math.min((wireframe - 0.6) / 0.2, 1);
            drawHeroSection(ctx, x, contentY + 100, browserWidth, heroProgress, transition, color);
        }
    }

    function drawHeader(ctx, x, y, width, progress, transition, color) {
        // Logo
        ctx.strokeStyle = color > 0 ? `rgba(34, 197, 94, ${1 - color * 0.3})` : '#6b7280';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x + 40, y + 30, 15 * progress, 0, Math.PI * 2);
        ctx.stroke();

        if (color > 0) {
            ctx.fillStyle = `rgba(34, 197, 94, ${color})`;
            ctx.fill();
        }

        // Logo text
        if (progress > 0.3) {
            ctx.font = 'bold 18px sans-serif';
            ctx.fillStyle = color > 0 ? '#1f2937' : '#6b7280';
            ctx.fillText('FurnitureShop', x + 70, y + 38);
        }

        // Cart icon
        if (progress > 0.6) {
            const btnProgress = (progress - 0.6) / 0.4;
            const cartX = x + width - 60;
            
            ctx.strokeStyle = color > 0 ? '#22c55e' : '#6b7280';
            ctx.lineWidth = 2;
            
            // Cart body
            if (btnProgress > 0) {
                ctx.beginPath();
                ctx.moveTo(cartX, y + 25);
                ctx.lineTo(cartX + 5, y + 20);
                ctx.lineTo(cartX + 25, y + 20);
                ctx.lineTo(cartX + 30, y + 25);
                ctx.lineTo(cartX + 28, y + 35);
                ctx.lineTo(cartX + 2, y + 35);
                ctx.closePath();
                ctx.stroke();
                
                if (color > 0) {
                    // Badge
                    ctx.fillStyle = '#22c55e';
                    ctx.beginPath();
                    ctx.arc(cartX + 25, y + 18, 6, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.font = 'bold 9px sans-serif';
                    ctx.fillStyle = '#ffffff';
                    ctx.textAlign = 'center';
                    ctx.fillText('2', cartX + 25, y + 21);
                }
            }
        }
    }

    function drawNavigation(ctx, x, y, width, progress, transition, color) {
        const navItems = ['Living Room', 'Bedroom', 'Office', 'Storage'];
        const itemWidth = 110;
        const startX = x + 220; // Position to the right of logo (logo ends around x+200)

        navItems.forEach((item, i) => {
            if (progress > i * 0.2) {
                const itemProgress = Math.min((progress - i * 0.2) / 0.2, 1);
                
                ctx.strokeStyle = color > 0 ? 'rgba(209, 213, 219, 0)' : '#6b7280';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(startX + i * itemWidth, y);
                ctx.lineTo(startX + i * itemWidth + 80 * itemProgress, y);
                ctx.stroke();

                if (color > 0) {
                    ctx.font = '13px sans-serif';
                    ctx.fillStyle = i === 0 ? '#22c55e' : '#6b7280';
                    ctx.textAlign = 'left';
                    ctx.fillText(item, startX + i * itemWidth, y);
                    
                    // Active underline
                    if (i === 0) {
                        ctx.strokeStyle = '#22c55e';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(startX, y + 5);
                        ctx.lineTo(startX + 80 * itemProgress, y + 5);
                        ctx.stroke();
                    }
                }
            }
        });
    }

    function drawHeroSection(ctx, x, y, width, progress, transition, color) {
        // Split into left (3D furniture) and right (controls) sections
        const leftWidth = width * 0.48;
        const rightWidth = width * 0.48;
        const leftX = x + 40;
        const rightX = x + leftWidth + 80;

        // Left side - 3D Furniture visualization
        if (progress > 0) {
            const furnitureProgress = Math.min(progress / 0.4, 1);
            
            // Draw furniture frame/container with light background
            if (furnitureProgress > 0) {
                ctx.strokeStyle = color > 0 ? `rgba(229, 231, 235, ${0.8})` : '#6b7280';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.roundRect(leftX, y, leftWidth * furnitureProgress, 200, 12);
                ctx.stroke();

                if (color > 0 && furnitureProgress > 0.3) {
                    ctx.fillStyle = 'rgba(249, 250, 251, 0.9)';
                    ctx.fill();
                }
            }

            // Draw simple 3D furniture representation (shelf/cabinet)
            if (furnitureProgress > 0.5 && color > 0) {
                const furnitureX = leftX + 60;
                const furnitureY = y + 25;
                const furnitureWidth = 220;
                const furnitureHeight = 110;

                // Cabinet body - lighter wood tone
                ctx.fillStyle = 'rgba(180, 140, 90, 0.95)';
                ctx.fillRect(furnitureX, furnitureY, furnitureWidth, furnitureHeight);

                // Shelf divisions
                ctx.strokeStyle = 'rgba(140, 100, 60, 1)';
                ctx.lineWidth = 2;
                for (let i = 1; i < 4; i++) {
                    const shelfY = furnitureY + (furnitureHeight / 4) * i;
                    ctx.beginPath();
                    ctx.moveTo(furnitureX, shelfY);
                    ctx.lineTo(furnitureX + furnitureWidth, shelfY);
                    ctx.stroke();
                }

                // Vertical divider
                ctx.beginPath();
                ctx.moveTo(furnitureX + furnitureWidth / 2, furnitureY);
                ctx.lineTo(furnitureX + furnitureWidth / 2, furnitureY + furnitureHeight);
                ctx.stroke();

                // 3D effect - side panel
                ctx.fillStyle = 'rgba(140, 100, 60, 0.85)';
                ctx.beginPath();
                ctx.moveTo(furnitureX + furnitureWidth, furnitureY);
                ctx.lineTo(furnitureX + furnitureWidth + 18, furnitureY - 12);
                ctx.lineTo(furnitureX + furnitureWidth + 18, furnitureY + furnitureHeight - 12);
                ctx.lineTo(furnitureX + furnitureWidth, furnitureY + furnitureHeight);
                ctx.closePath();
                ctx.fill();

                // Top panel - lightest tone
                ctx.fillStyle = 'rgba(200, 160, 110, 0.95)';
                ctx.beginPath();
                ctx.moveTo(furnitureX, furnitureY);
                ctx.lineTo(furnitureX + 18, furnitureY - 12);
                ctx.lineTo(furnitureX + furnitureWidth + 18, furnitureY - 12);
                ctx.lineTo(furnitureX + furnitureWidth, furnitureY);
                ctx.closePath();
                ctx.fill();
            }
        }

        // Right side - Product info and controls
        if (progress > 0.3) {
            const controlsProgress = Math.min((progress - 0.3) / 0.5, 1);
            
            // Product Title
            if (controlsProgress > 0) {
                ctx.strokeStyle = color > 0 ? 'rgba(31, 41, 55, 0)' : '#6b7280';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(rightX, y + 15);
                ctx.lineTo(rightX + 250 * controlsProgress, y + 15);
                ctx.stroke();

                if (color > 0) {
                    ctx.font = 'bold 20px sans-serif';
                    ctx.fillStyle = '#1f2937';
                    ctx.textAlign = 'left';
                    ctx.fillText('Modern Bookshelf', rightX, y + 15);
                }
            }
            
            // Description
            if (controlsProgress > 0.2) {
                ctx.font = '11px sans-serif';
                ctx.fillStyle = color > 0 ? '#6b7280' : '#9ca3af';
                ctx.textAlign = 'left';
                if (color > 0) {
                    ctx.fillText('Customizable wooden shelf unit', rightX, y + 32);
                }
            }

            // Draw 3 sliders
            const sliderLabels = ['Width', 'Height', 'Depth'];
            const sliderValues = ['120 cm', '180 cm', '40 cm'];
            
            for (let i = 0; i < 3; i++) {
                if (controlsProgress > 0.3 + i * 0.15) {
                    const sliderProgress = Math.min((controlsProgress - 0.3 - i * 0.15) / 0.2, 1);
                    const sliderY = y + 50 + i * 28;
                    
                    // Label
                    if (color > 0) {
                        ctx.font = '11px sans-serif';
                        ctx.fillStyle = '#6b7280';
                        ctx.textAlign = 'left';
                        ctx.fillText(sliderLabels[i].toUpperCase(), rightX, sliderY);
                        
                        ctx.fillStyle = '#1f2937';
                        ctx.textAlign = 'right';
                        ctx.fillText(sliderValues[i], rightX + 220, sliderY);
                    }

                    // Slider track
                    if (sliderProgress > 0.3) {
                        const trackProgress = (sliderProgress - 0.3) / 0.7;
                        const trackY = sliderY + 6;
                        const trackWidth = 220;
                        
                        // Background track
                        ctx.strokeStyle = color > 0 ? 'rgba(229, 231, 235, 1)' : '#6b7280';
                        ctx.lineWidth = 4;
                        ctx.lineCap = 'round';
                        ctx.beginPath();
                        ctx.moveTo(rightX, trackY);
                        ctx.lineTo(rightX + trackWidth * trackProgress, trackY);
                        ctx.stroke();

                        // Slider fill
                        if (color > 0 && trackProgress > 0.4) {
                            ctx.strokeStyle = '#22c55e';
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.moveTo(rightX, trackY);
                            ctx.lineTo(rightX + trackWidth * 0.5 * trackProgress, trackY);
                            ctx.stroke();

                            // Slider thumb
                            if (trackProgress > 0.6) {
                                ctx.fillStyle = '#ffffff';
                                ctx.strokeStyle = '#22c55e';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(rightX + trackWidth * 0.5, trackY, 6, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.stroke();
                            }
                        }
                    }
                }
            }
            
            // Price
            if (controlsProgress > 0.7) {
                const priceY = y + 145;
                if (color > 0) {
                    ctx.font = 'bold 24px sans-serif';
                    ctx.fillStyle = '#1f2937';
                    ctx.textAlign = 'left';
                    ctx.fillText('€ 299', rightX, priceY);
                }
            }
            
            // Add to Cart button
            if (controlsProgress > 0.8) {
                const btnProgress = (controlsProgress - 0.8) / 0.2;
                const btnY = y + 155;
                const btnWidth = 180;
                const btnHeight = 36;
                
                ctx.fillStyle = color > 0 ? '#22c55e' : '#6b7280';
                ctx.beginPath();
                ctx.roundRect(rightX, btnY, btnWidth * btnProgress, btnHeight, 8);
                ctx.fill();
                
                if (color > 0 && btnProgress > 0.5) {
                    ctx.font = 'bold 13px sans-serif';
                    ctx.fillStyle = '#ffffff';
                    ctx.textAlign = 'center';
                    ctx.fillText('Add to Cart', rightX + btnWidth / 2, btnY + 23);
                }
            }
        }
    }

    function drawFeatureCards(ctx, x, y, width, progress, transition, color) {
        const cardWidth = 280;
        const cardHeight = 140; // Reduced from 160
        const gap = 40;
        const totalCardsWidth = cardWidth * 3 + gap * 2;
        const startX = x + (width - totalCardsWidth) / 2;
        
        const maxY = y + 160; // Adjusted max height

        for (let i = 0; i < 3; i++) {
            if (progress > i * 0.3) {
                const cardProgress = Math.min((progress - i * 0.3) / 0.3, 1);
                const cardX = startX + i * (cardWidth + gap);
                
                const actualCardHeight = Math.min(cardHeight * cardProgress, maxY - y);
                
                // Card outline
                ctx.strokeStyle = color > 0 ? 'rgba(75, 85, 99, 0)' : '#6b7280';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.roundRect(cardX, y, cardWidth, actualCardHeight, 16);
                ctx.stroke();

                if (color > 0) {
                    ctx.fillStyle = `rgba(31, 41, 55, ${color * 0.8})`;
                    ctx.fill();
                }

                if (cardProgress > 0.5 && actualCardHeight > 80) {
                    // Icon
                    const iconProgress = (cardProgress - 0.5) / 0.5;
                    const iconSize = 30;
                    const iconY = y + 40;
                    
                    ctx.strokeStyle = color > 0 ? 'rgba(74, 222, 128, 0)' : '#4ade80';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(cardX + cardWidth / 2, iconY, iconSize * iconProgress, 0, Math.PI * 2);
                    ctx.stroke();

                    if (color > 0) {
                        const colors = ['#4ade80', '#3b82f6', '#8b5cf6'];
                        ctx.fillStyle = colors[i];
                        ctx.fill();
                    }

                    // Title line
                    if (iconProgress > 0.5) {
                        const titleWidth = 180;
                        const titleX = cardX + (cardWidth - titleWidth) / 2;
                        
                        ctx.strokeStyle = color > 0 ? 'rgba(255, 255, 255, 0)' : '#9ca3af';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(titleX, y + 90);
                        ctx.lineTo(titleX + titleWidth * iconProgress, y + 90);
                        ctx.stroke();

                        if (color > 0) {
                            ctx.font = 'bold 14px sans-serif';
                            ctx.fillStyle = '#ffffff';
                            ctx.textAlign = 'center';
                            const titles = ['Real-Time Preview', 'Parametric Design', 'Auto-Calculate'];
                            ctx.fillText(titles[i], cardX + cardWidth / 2, y + 90);
                        }
                    }

                    // Description lines
                    if (iconProgress > 0.7 && actualCardHeight > 120) {
                        for (let j = 0; j < 2; j++) {
                            const lineWidth = j === 0 ? 200 : 180;
                            const lineX = cardX + (cardWidth - lineWidth) / 2;
                            const lineY = y + 110 + j * 12;
                            
                            if (lineY < y + actualCardHeight - 10) {
                                ctx.strokeStyle = color > 0 ? 'rgba(156, 163, 175, 0)' : '#6b7280';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(lineX, lineY);
                                ctx.lineTo(lineX + lineWidth * iconProgress, lineY);
                                ctx.stroke();

                                if (color > 0) {
                                    ctx.font = '11px sans-serif';
                                    ctx.fillStyle = '#9ca3af';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('Every change updates', cardX + cardWidth / 2, lineY);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        observer.disconnect();
    });
}