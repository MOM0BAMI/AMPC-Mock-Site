// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // 1. Toggle Mobile Navbar (for Bootstrap's Navbar)
    const navbarToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');

    navbarToggle.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show');  // Bootstrap class to show/hide menu
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

    // 3. Lazy Loading for Images (using Intersection Observer)
    const lazyImages = document.querySelectorAll('img.lazy');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;  // Lazy load images
                image.classList.remove('lazy');
                observer.unobserve(image);
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

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

    // 5. Adjust Layout or Hide Elements on Mobile
    const heroSection = document.querySelector('#hero');
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
        heroSection.style.display = 'none';  // Example of hiding an element on mobile
    } else {
        heroSection.style.display = 'block';
    }

    // 6. Auto Focus on First Input Field in Forms
    const firstField = document.querySelector('form input');
    if (firstField) firstField.focus();

    // 7. Adjust Button Sizes for Mobile (Make buttons bigger on mobile)
    const buttonsForMobile = document.querySelectorAll('button');
    buttonsForMobile.forEach(button => {
        if (window.innerWidth < 768) {
            button.style.fontSize = '18px';  // Increase button size on mobile
        }
    });

    // 8. Resize Event Handling (For dynamic layout adjustments)
    window.addEventListener('resize', () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Adjust layout for mobile screens
        if (screenWidth < 768) {
            document.body.classList.add('mobile');  // Example: Add a class for mobile-specific styles
        } else {
            document.body.classList.remove('mobile');
        }

        // Dynamically hide/show elements or adjust content based on window size
        if (screenWidth < 768) {
            heroSection.style.display = 'none'; // Adjust hero section for mobile
        } else {
            heroSection.style.display = 'block';
        }
    });

});

// Select all testimonial images
const testimonialImages = document.querySelectorAll('.testimonial-image');

// Create the zoom overlay element
const zoomOverlay = document.createElement('div');
zoomOverlay.className = 'zoom-overlay';
document.body.appendChild(zoomOverlay);

// Add an image element to the overlay
const zoomedImage = document.createElement('img');
zoomOverlay.appendChild(zoomedImage);

// Add click event to each testimonial image
testimonialImages.forEach(image => {
    image.addEventListener('click', () => {
        zoomedImage.src = image.src; // Set the source of the zoomed image
        zoomOverlay.classList.add('active'); // Show the overlay
    });
});

// Add click event to the overlay to close the zoom
zoomOverlay.addEventListener('click', () => {
    zoomOverlay.classList.remove('active'); // Hide the overlay
});

// Form validation for Add Contact page
document.querySelector('form').addEventListener('submit', function (e) {
    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    const phone = document.querySelector('input[name="phone"]');

    if (!name.value || !email.value || !phone.value) {
        e.preventDefault();  // Prevent form submission
        alert('All fields are required!');
    }
});
