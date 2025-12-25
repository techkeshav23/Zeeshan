// Navigation functionality
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetPage = item.getAttribute('data-page');
        
        // Remove active class from all nav items and pages
        navItems.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        // Add active class to clicked nav item and corresponding page
        item.classList.add('active');
        document.getElementById(targetPage).classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Gift box reveal animation
const giftBox = document.getElementById('giftBox');
const revealContent = document.getElementById('revealContent');
const tapText = document.querySelector('.tap-text');
let isOpened = false;

giftBox.addEventListener('click', () => {
    if (!isOpened) {
        giftBox.classList.add('opened');
        tapText.style.opacity = '0';
        
        setTimeout(() => {
            revealContent.classList.add('show');
        }, 600);
        
        isOpened = true;
    }
});

// Explore button functionality
const exploreBtn = document.getElementById('exploreBtn');
exploreBtn.addEventListener('click', () => {
    // Navigate to photos page
    navItems.forEach(nav => nav.classList.remove('active'));
    pages.forEach(page => page.classList.remove('active'));
    
    document.querySelector('[data-page="photos"]').classList.add('active');
    document.getElementById('photos').classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add some festive snow effect
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄️';
    snowflake.style.position = 'fixed';
    snowflake.style.top = '-50px';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = (Math.random() * 20 + 10) + 'px';
    snowflake.style.opacity = Math.random();
    snowflake.style.pointerEvents = 'none';
    snowflake.style.zIndex = '9999';
    snowflake.style.animation = `fall ${Math.random() * 3 + 5}s linear`;
    
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 8000);
}

// Add CSS animation for snowflakes
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Create snowflakes periodically
setInterval(createSnowflake, 300);

// Add touch feedback for mobile
navItems.forEach(item => {
    item.addEventListener('touchstart', () => {
        item.style.transform = 'scale(0.95)';
    });
    
    item.addEventListener('touchend', () => {
        item.style.transform = 'scale(1)';
    });
});

// Photo card animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.querySelectorAll('.photo-card, .movie-card, .message-card, .about-card').forEach(card => {
    observer.observe(card);
});

// Add click animation to movie cards
document.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1.02)';
        }, 100);
    });
});

// Console easter egg
console.log('%c🎅 Ho Ho Ho! 🎄', 'font-size: 30px; color: #e50914; font-weight: bold;');
console.log('%cMerry Christmas, Zeeshan! 🎁', 'font-size: 20px; color: #ffd700;');
console.log('%cYour Secret Santa loves you! 💝', 'font-size: 16px; color: #fff;');

// Confetti effect for home page
function createConfetti() {
    const colors = ['#e50914', '#ffd700', '#ffffff', '#831010'];
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-20px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.opacity = '0.8';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
        { transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: Math.random() * 2000 + 3000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => confetti.remove();
}

// Trigger confetti when gift is opened
let confettiInterval;
giftBox.addEventListener('click', () => {
    if (!confettiInterval) {
        confettiInterval = setInterval(() => {
            for (let i = 0; i < 5; i++) {
                createConfetti();
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(confettiInterval);
        }, 3000);
    }
});
