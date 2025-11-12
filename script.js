// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {

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


    // Navbar Background Change on Scroll
    // const navbar = document.querySelector('.navbar');

    // window.addEventListener('scroll', function() {
    //     if (window.scrollY > 100) {
    //         navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    //         navbar.style.backdropFilter = 'blur(15px)';
    //     } else {
    //         navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    //         navbar.style.backdropFilter = 'blur(10px)';
    //     }
    // });

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
    const dialogTitle = document.getElementById('dialogTitle');
    const dialogIframe = document.getElementById('dialogIframe');
    
    // Set the title and iframe source
    dialogTitle.textContent = title;
    dialogIframe.src = configuratorUrl;
    
    // Show the dialog
    dialog.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
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
document.addEventListener('DOMContentLoaded', function() {
    const dialog = document.getElementById('configuratorDialog');
    const closeBtn = document.querySelector('.dialog-close');
    
    // Close dialog when clicking close button
    closeBtn.addEventListener('click', closeConfigurator);
    
    // Close dialog when clicking outside the content
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            closeConfigurator();
        }
    });
    
    // Close dialog with Escape key
    document.addEventListener('keydown', function(e) {
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