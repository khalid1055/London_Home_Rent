// ============================================
// NEWS TICKER - Live London Real Estate News
// ============================================

// Configuration
const NEWS_CONFIG = {
    API_KEY: 'fa09cc531d5f4a80b1a8d9511d05705f', // Replace with your NewsAPI.org key
    API_URL: 'https://newsapi.org/v2/everything',
    QUERY: 'London real estate OR London property OR London rental market',
    CACHE_KEY: 'london_news_cache',
    CACHE_DURATION: 6 * 60 * 60 * 1000, // 6 hours in milliseconds
    FALLBACK_NEWS: [
        '📈 London rental market up 7.3% YoY',
        '🏠 Westminster avg rent: £2,800/month',
        '📊 Demand for 2-bedroom properties highest',
        '🌆 Tech hubs driving North London growth',
        '💼 Professional renters seeking premium areas'
    ]
};

// Fetch news from NewsAPI
async function fetchLondonNews() {
    // Check if API key is configured
    if (NEWS_CONFIG.API_KEY === 'YOUR_NEWSAPI_KEY') {
        console.log('NewsAPI key not configured. Using fallback news.');
        return NEWS_CONFIG.FALLBACK_NEWS;
    }

    try {
        const url = `${NEWS_CONFIG.API_URL}?q=${encodeURIComponent(NEWS_CONFIG.QUERY)}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${NEWS_CONFIG.API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'ok' && data.articles && data.articles.length > 0) {
            // Format news items
            const newsItems = data.articles.slice(0, 8).map(article => {
                const emoji = getNewsEmoji(article.title);
                const title = article.title.split(' - ')[0]; // Remove source from title
                return `${emoji} ${title}`;
            });
            
            // Cache the news
            const cache = {
                news: newsItems,
                timestamp: Date.now()
            };
            localStorage.setItem(NEWS_CONFIG.CACHE_KEY, JSON.stringify(cache));
            
            return newsItems;
        } else {
            throw new Error('No articles found');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        return NEWS_CONFIG.FALLBACK_NEWS;
    }
}

// Get appropriate emoji based on news content
function getNewsEmoji(title) {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('price') || lowerTitle.includes('cost')) return '💷';
    if (lowerTitle.includes('market') || lowerTitle.includes('growth')) return '📈';
    if (lowerTitle.includes('property') || lowerTitle.includes('home')) return '🏠';
    if (lowerTitle.includes('rent')) return '🏘️';
    if (lowerTitle.includes('demand')) return '📊';
    if (lowerTitle.includes('investment')) return '💼';
    if (lowerTitle.includes('new') || lowerTitle.includes('launch')) return '🆕';
    if (lowerTitle.includes('report') || lowerTitle.includes('data')) return '📋';
    
    return '🌆'; // Default emoji
}

// Load news from cache or fetch new
async function loadNews() {
    // Try to get cached news
    const cached = localStorage.getItem(NEWS_CONFIG.CACHE_KEY);
    
    if (cached) {
        try {
            const cache = JSON.parse(cached);
            const age = Date.now() - cache.timestamp;
            
            // If cache is still valid, use it
            if (age < NEWS_CONFIG.CACHE_DURATION) {
                console.log('Using cached news (age: ' + Math.round(age / 1000 / 60) + ' minutes)');
                return cache.news;
            }
        } catch (error) {
            console.error('Error reading cache:', error);
        }
    }
    
    // Cache expired or doesn't exist, fetch new news
    console.log('Fetching fresh news from API...');
    return await fetchLondonNews();
}

// Update ticker with news items
async function updateNewsTicker() {
    const tickerContent = document.querySelector('.ticker-content');
    
    if (!tickerContent) {
        console.warn('Ticker content element not found');
        return;
    }
    
    // Load news
    const newsItems = await loadNews();
    
    // Build ticker HTML
    const tickerHTML = newsItems.map(item => 
        `<span class="ticker-item">${item}</span>`
    ).join('');
    
    // Duplicate for seamless loop
    tickerContent.innerHTML = tickerHTML + tickerHTML;
}

// Initialize news ticker on page load
updateNewsTicker();

// Refresh news every 6 hours
setInterval(updateNewsTicker, NEWS_CONFIG.CACHE_DURATION);

// ============================================
// SMOOTH SCROLLING
// ============================================

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

// ============================================
// FORM HANDLING
// ============================================

// Lead form submission
const leadForm = document.querySelector('.lead-form');
if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
        // FormSubmit/Formspree will handle automatically
        console.log('Lead form submitted');
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

// ============================================
// SCROLL ANIMATIONS
// ============================================

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

// ============================================
// CTA BUTTON
// ============================================

document.querySelector('.cta-button')?.addEventListener('click', function() {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

