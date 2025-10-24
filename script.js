// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Duplicate ticker content for seamless loop
const tickerContent = document.querySelector('.ticker-content');
if (tickerContent) {
    const tickerHTML = tickerContent.innerHTML;
    tickerContent.innerHTML = tickerHTML + tickerHTML;
}

// Form submission handling
const leadForm = document.querySelector('.lead-form');
if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
        // If using formspree or similar service, this will handle automatically
        // Otherwise, you can add custom handling here
        console.log('Form submitted');
    });
}

// Search button handling
const searchButton = document.querySelector('.search-button');
if (searchButton) {
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Search functionality - Connect to your property database or redirect to search page');
    });
}

// Service links handling
document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Service feature - Add your service details or links here');
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.service-card, .borough-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// CTA button click
document.querySelector('.cta-button')?.addEventListener('click', function() {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

