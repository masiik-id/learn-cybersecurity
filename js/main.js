// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animasi untuk post cards
const postCards = document.querySelectorAll('.post-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

postCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Toggle mobile menu
const createMobileMenu = () => {
    const nav = document.querySelector('nav ul');
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-button');
    menuButton.innerHTML = '☰';
    
    document.querySelector('nav .container').prepend(menuButton);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
};

// Inisialisasi mobile menu jika lebar layar < 768px
if (window.innerWidth < 768) {
    createMobileMenu();
}

// Update mobile menu saat resize window
window.addEventListener('resize', () => {
    if (window.innerWidth < 768 && !document.querySelector('.mobile-menu-button')) {
        createMobileMenu();
    }
}); 