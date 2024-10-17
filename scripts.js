// Sidebar Menu Toggle
const openMenuButton = document.getElementById('open-menu');
const closeMenuButton = document.getElementById('close-menu');
const sidebarMenu = document.getElementById('sidebar-menu');

// Open Sidebar
openMenuButton.addEventListener('click', function() {
    sidebarMenu.classList.add('active');
    openMenuButton.style.display = 'none'; // Hide the open button when the menu is open
});

// Close Sidebar
closeMenuButton.addEventListener('click', function() {
    sidebarMenu.classList.remove('active');
    openMenuButton.style.display = 'block'; // Show the open button when the menu is closed
});

// Close Sidebar if clicking outside of it
document.addEventListener('click', function(event) {
    if (!sidebarMenu.contains(event.target) && !openMenuButton.contains(event.target)) {
        sidebarMenu.classList.remove('active');
        openMenuButton.style.display = 'block'; // Show the open button when the menu is closed
    }
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in animation on scroll
const faders = document.querySelectorAll('.fade-in');
const fadeInOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px"
};

const fadeInOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            fadeInOnScroll.unobserve(entry.target);
        }
    });
}, fadeInOptions);

faders.forEach(fader => {
    fadeInOnScroll.observe(fader);
});

// Show/Hide Submenu on hover
const servicesMenuItem = document.querySelector('.services-menu-item'); // Update the selector to match your HTML
const submenu = document.querySelector('.submenu'); // Update the selector to match your submenu

if (servicesMenuItem && submenu) {
    servicesMenuItem.addEventListener('mouseenter', () => {
        submenu.style.display = 'block'; // Show submenu
    });

    servicesMenuItem.addEventListener('mouseleave', () => {
        submenu.style.display = 'none'; // Hide submenu
    });
}

// Smooth scroll for subsection links if added
document.querySelectorAll('.subsection-title').forEach(subsection => {
    subsection.addEventListener('click', function() {
        const targetId = this.getAttribute('id');
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// ** New Functionality for Submenu Toggle on Click **
const submenuToggle = document.querySelectorAll('.sidebar ul li');

submenuToggle.forEach(item => {
    item.addEventListener('click', () => {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            submenu.classList.toggle('active'); // Toggle submenu visibility
        }
    });
});
