// Theme toggling functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.dataset.theme = savedTheme;
    updateThemeIcon(savedTheme === 'dark');
}

themeToggle.addEventListener('click', () => {
    const isDark = body.dataset.theme === 'dark';
    body.dataset.theme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', body.dataset.theme);
    updateThemeIcon(!isDark);
});

function updateThemeIcon(isDark) {
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile menu functionality
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');

// Create mobile menu button
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
navbar.querySelector('.container').insertBefore(mobileMenuBtn, themeToggle);

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.querySelector('i').className = navLinks.classList.contains('active') 
        ? 'fas fa-times' 
        : 'fas fa-bars';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll-based navbar background
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--background-color');
        navbar.style.boxShadow = getComputedStyle(document.documentElement)
            .getPropertyValue('--card-shadow');
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
    }
}); 