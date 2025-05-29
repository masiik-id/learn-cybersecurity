// Fungsi untuk menangani navigasi
document.addEventListener('DOMContentLoaded', function() {
    // Menangani klik pada menu sidebar
    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetArticle = document.getElementById(targetId);
            if (targetArticle) {
                targetArticle.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}); 