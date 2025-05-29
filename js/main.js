// Fungsi untuk memuat artikel
async function loadArtikel(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const artikelContent = doc.querySelector('.artikel-content');
        
        if (artikelContent) {
            const contentArea = document.querySelector('.content');
            contentArea.innerHTML = artikelContent.outerHTML;
            // Scroll ke atas konten
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Update URL tanpa refresh
            history.pushState({}, '', url);
        }
    } catch (error) {
        console.error('Error loading artikel:', error);
        alert('Maaf, terjadi kesalahan saat memuat artikel. Silakan coba lagi.');
    }
}

// Event listener untuk link artikel
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('href');
        
        // Update active state
        document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
        
        // Load artikel
        loadArtikel(url);
        
        // Tutup menu mobile jika terbuka
        const sidebarNav = document.querySelector('.sidebar-nav');
        if (sidebarNav.classList.contains('active')) {
            sidebarNav.classList.remove('active');
        }
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const currentPath = window.location.pathname;
    if (currentPath.includes('artikel/')) {
        loadArtikel(currentPath);
    }
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
    const nav = document.querySelector('.sidebar-nav');
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-button');
    menuButton.innerHTML = '☰';
    
    document.querySelector('.sidebar').prepend(menuButton);
    
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