// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // 1. Toggle Mobile Navbar (for Bootstrap's Navbar)
    const navbarToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');

    navbarToggle.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show'); // Bootstrap class to show/hide menu
    });

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // 3. Lazy Loading for Images (with fallback for older browsers)
    const lazyImages = document.querySelectorAll('img.lazy');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src; // Lazy load images
                    image.classList.remove('lazy');
                    observer.unobserve(image);
                }
            });
        });
        lazyImages.forEach(image => imageObserver.observe(image));
    } else {
        lazyImages.forEach(image => {
            image.src = image.dataset.src; // Fallback loading
            image.classList.remove('lazy');
        });
    }

    // 4. Touch Event Handling for Interactive Elements (Buttons, Links)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.classList.add('active');
        });
        button.addEventListener('touchend', () => {
            button.classList.remove('active');
        });
    });

    // Remove active state when touching outside a button
    document.addEventListener('touchstart', (e) => {
        if (!e.target.classList.contains('btn')) {
            buttons.forEach(button => button.classList.remove('active'));
        }
    });

    // 5. Adjust Layout or Hide Elements on Mobile (Use classes instead of inline styles)
    const heroSection = document.querySelector('#hero');
    const adjustHeroSection = () => {
        if (window.innerWidth < 768) {
            heroSection.classList.add('hidden');
        } else {
            heroSection.classList.remove('hidden');
        }
    };
    adjustHeroSection();

    // 6. Auto Focus on First Input Field in Forms
    const firstField = document.querySelector('form input');
    if (firstField) firstField.focus();

    // 7. Adjust Button Sizes for Mobile (Make buttons bigger on mobile)
    const buttonsForMobile = document.querySelectorAll('button');
    const adjustButtonSize = () => {
        buttonsForMobile.forEach(button => {
            if (window.innerWidth < 768) {
                button.style.fontSize = '18px'; // Increase button size on mobile
            } else {
                button.style.fontSize = ''; // Reset to default
            }
        });
    };
    adjustButtonSize();

    // 8. Resize Event Handling (Debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            adjustHeroSection();
            adjustButtonSize();
        }, 200); // Adjust the delay as needed
    });
});

// Select all testimonial images
const testimonialImages = document.querySelectorAll('.testimonial-image');

// Create the zoom overlay element
const zoomOverlay = document.createElement('div');
zoomOverlay.className = 'zoom-overlay';
zoomOverlay.setAttribute('role', 'dialog');
zoomOverlay.setAttribute('aria-hidden', 'true');
document.body.appendChild(zoomOverlay);

// Add an image element to the overlay
const zoomedImage = document.createElement('img');
zoomOverlay.appendChild(zoomedImage);

// Add click event to each testimonial image
testimonialImages.forEach(image => {
    image.addEventListener('click', () => {
        zoomedImage.src = image.src; // Set the source of the zoomed image
        zoomOverlay.classList.add('active'); // Show the overlay
        zoomOverlay.setAttribute('aria-hidden', 'false'); // Accessibility
    });
});

// Add click event to the overlay to close the zoom
zoomOverlay.addEventListener('click', () => {
    zoomOverlay.classList.remove('active'); // Hide the overlay
    zoomOverlay.setAttribute('aria-hidden', 'true'); // Accessibility
});

// Form validation for Add Contact page
document.querySelector('form').addEventListener('submit', function (e) {
    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    const phone = document.querySelector('input[name="phone"]');
    const errorMsg = document.querySelector('.error-message');

    if (!name.value || !email.value || !phone.value) {
        e.preventDefault(); // Prevent form submission
        if (errorMsg) {
            errorMsg.textContent = 'All fields are required!';
            errorMsg.classList.add('visible');
        } else {
            alert('All fields are required!');
        }
    }
});
