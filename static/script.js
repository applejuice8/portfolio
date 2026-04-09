// Variables Declaration
const hamburger = document.getElementById('hamburger');
const indicator = document.getElementById('nav-indicator');
const navLinks = document.getElementById('nav-links');
const links = document.querySelectorAll('.nav-link');
let scrollLock = false;

// Toggle Dark Mode
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    const logos = document.querySelectorAll('.school-logo');

    themeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('light-mode');
        
        // Toggle Between Moon, Sun Icon
        let isLight = document.documentElement.classList.contains('light-mode');
        icon.classList.toggle('fa-sun', isLight);
        icon.classList.toggle('fa-moon', !isLight);

        // Toggle Between Light, Dark Theme School Logos
        logos.forEach(logo => {
            const src = logo.getAttribute('src');
            if (isLight) {
                logo.setAttribute('src', src.replace('Dark', 'Light'));
            } else {
                logo.setAttribute('src', src.replace('Light', 'Dark'));
            }
        });
    });
}

// Hamburger Icon
function setupHamburger() {
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Update Indicator Position
function updateIndicator(element) {
    if (!element) return;

    // Don't Update Indicator On Mobile
    if (window.innerWidth > 768) {
        const width = element.getBoundingClientRect().width;
        indicator.style.width = `${width}px`;
        indicator.style.left = `${element.offsetLeft + 61}px`;
    }

    // Update Active Link
    links.forEach(link => link.classList.remove('active'));
    element.classList.add('active');
}

// Setup Event Listener For Each Link
function setupLinks() {
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Interval Before Clicking Another Link
            if (scrollLock) {
                e.preventDefault();
                return;
            }

            // Prevent Race Condition
            scrollLock = true;
            updateIndicator(link);

            // Close Mobile Menu After Click Link
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }

            // Lock For 600ms
            setTimeout(function() {
                scrollLock = false;
            }, 600);
        });
    });
}

// Update Indicator When Scroll
function handleScroll() {
    window.addEventListener('scroll', function() {
        // Abort If Locked
        if (scrollLock) return;

        const scrollY = window.scrollY;
        let sectionId;

        // Check Current Viewport In Which Section
        document.querySelectorAll('section').forEach(section => {
            const offsetTop = section.offsetTop - 150; 
            const offsetBot = offsetTop + section.offsetHeight;

            if (scrollY >= offsetTop && scrollY < offsetBot) {
                sectionId = section.getAttribute('id');
                // if (sectionId === 'education') sectionId = 'about'; // Education Under About Section
            }
        });

        // Update Indicator
        const active = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        updateIndicator(active);
    });
}

// Handle Window Resize
function handleWindowResize() {
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Remove Mobile Menu If Too Wide
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Update Indicator Position
            const active = document.querySelector('.nav-link.active');
            updateIndicator(active);
        }
    });
}

// Setup Cert Overlay
function setupOverlay() {
    const certs = document.querySelectorAll('.cert');
    const overlay = document.getElementById('overlay');
    const overlayImage = document.getElementById('overlay-image');
    const overlayName = document.getElementById('overlay-name');
    const overlayIssuer = document.getElementById('overlay-issuer');
    const closeBtn = document.getElementById('close-btn');

    // Open Cert Overlay
    certs.forEach(cert => {
        cert.addEventListener('click', function() {
            const image = cert.querySelector('img');
            overlayImage.src = image.src;
            overlayImage.alt = image.alt;

            overlayName.textContent = cert.querySelector('.cert-name').textContent;
            overlayIssuer.textContent = cert.querySelector('.cert-issuer').textContent;

            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        })
    })

    // Close Cert Overlay 
    closeBtn.addEventListener('click', function() {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    })
}

// Main Method
window.addEventListener('DOMContentLoaded', function() {
    // Set Initial Indicator Position
    const active = document.querySelector('.nav-link.active');
    updateIndicator(active);

    // Setups
    setupThemeToggle();
    setupHamburger();
    setupLinks();
    handleScroll();
    handleWindowResize();
    animateBars();
    setupOverlay();
});