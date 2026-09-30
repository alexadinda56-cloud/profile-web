/**
 * Logika Interaktif Halaman Profil Dinda Alexa Nabila Utomo
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Menutup menu mobile saat salah satu link diklik
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      });
    });
  }

  // 3. Sistem Tab Navigasi Pengalaman
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-tab');

      // Update status tombol aktif
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Tampilkan panel yang bersangkutan
      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // 4. Salin Email Instan (Copy to Clipboard)
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'alexadinda56@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const icon = copyBtn.querySelector('i');
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-check');
        copyBtn.title = 'Tersalin!';

        setTimeout(() => {
          icon.classList.remove('fa-check');
          icon.classList.add('fa-copy');
          copyBtn.title = 'Salin Email';
        }, 2000);
      }).catch(err => {
        console.error('Gagal menyalin email:', err);
      });
    });
  }

});

// 5. Fungsi Lightbox Dokumentasi Foto (Global Scope)
// Fungsi Lightbox Otomatis
function openLightbox(element, title) {
  const modal = document.getElementById('lightboxModal');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalView = document.querySelector('.lightbox-view');

  if (modal && modalTitle && modalView) {
    modalTitle.textContent = title;

    // Mengambil foto yang ada di dalam elemen yang diklik secara otomatis
    const imgElement = element.querySelector('img');
    if (imgElement && imgElement.src) {
      modalView.innerHTML = `<img src="${imgElement.src}" alt="${title}" class="lightbox-img">`;
    } else {
      modalView.innerHTML = `<i class="fa-solid fa-image lightbox-placeholder-icon"></i>`;
    }

    modal.classList.add('active');
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Menutup modal dengan tombol ESC keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});