/* ============================================
   FC FULBERT CHARTRES - SCRIPT.JS
   JavaScript pour animations et interactivité
   ============================================ */

// ========================================
// LOADER - Animation de chargement
// ========================================
window.addEventListener('load', function() {
  const loader = document.querySelector('.loader-wrapper');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1500); // Affiche le loader pendant 1.5 secondes
  }
});

// ========================================
// SCROLL ANIMATIONS - Apparition au scroll
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optionnel : ne plus observer une fois visible
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observer tous les éléments avec la classe fade-in
document.addEventListener('DOMContentLoaded', function() {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => {
    observer.observe(el);
  });
});

// ========================================
// BACK TO TOP BUTTON - Bouton retour en haut
// ========================================
const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// STAT CARDS COUNTER - Animation des chiffres
// ========================================
function animateValue(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(function() {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      element.textContent = end;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Observer pour déclencher l'animation des stats
const statsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      const statNumber = entry.target.querySelector('.stat-number');
      
      if (statNumber) {
        const text = statNumber.textContent.trim();
        const finalValue = parseInt(text);
        
        // Animer seulement si c'est un nombre valide
        if (!isNaN(finalValue)) {
          statNumber.textContent = '0';
          animateValue(statNumber, 0, finalValue, 2000);
        }
      }
    }
  });
}, { threshold: 0.5 });

// Observer toutes les stat cards
document.addEventListener('DOMContentLoaded', function() {
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    statsObserver.observe(card);
  });
});

// ========================================
// NAVBAR SCROLL EFFECT - Effet au scroll
// ========================================
let lastScroll = 0;
const nav = document.querySelector('nav');

if (nav) {
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Réduire la navbar au scroll
    if (currentScroll > 100) {
      nav.style.padding = '12px 5vw';
      nav.style.boxShadow = '0 6px 30px rgba(0,0,0,0.3)';
    } else {
      nav.style.padding = '18px 5vw';
      nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    }
    
    lastScroll = currentScroll;
  });
}

// ========================================
// FAQ ACCORDION EFFECT - Effet d'accordéon
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    item.addEventListener('click', function() {
      // Effet de pulse au clic
      this.style.transform = this.style.transform === 'scale(1.02)' ? 'scale(1)' : 'scale(1.02)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
    });
  });
});

// ========================================
// PARALLAX EFFECT - Effet parallaxe sur le hero
// ========================================
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  
  if (hero) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    
    // Arrêter le parallax après un certain point
    if (scrolled < 600) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  }
});

// ========================================
// SMOOTH SCROLL - Défilement doux pour les liens
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Ignorer les liens vides
      if (href === '#' || href === '') {
        return;
      }
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// ========================================
// CARD TILT EFFECT - Effet 3D sur les cartes
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const tiltCards = document.querySelectorAll('.stat-card, .card, .joueur-card-pro');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
});

// ========================================
// LAZY LOADING IMAGES - Chargement différé
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
});

// ========================================
// ACTIVE MENU LINK - Lien actif dans le menu
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const menuLinks = document.querySelectorAll('nav ul li a');
  
  menuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || href === `./${currentPage}`) {
      link.classList.add('active');
    }
  });
});

// ========================================
// TABLE RESPONSIVE - Scroll horizontal sur mobile
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const tables = document.querySelectorAll('table');
  
  tables.forEach(table => {
    // Vérifier si la table dépasse de son conteneur
    if (table.offsetWidth > table.parentElement.offsetWidth) {
      table.parentElement.style.overflowX = 'auto';
      table.parentElement.style.webkitOverflowScrolling = 'touch';
    }
  });
});

// ========================================
// COOKIE CONSENT (optionnel)
// ========================================
/*
function showCookieConsent() {
  const consent = localStorage.getItem('cookieConsent');
  
  if (!consent) {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-content">
        <p>Ce site utilise des cookies pour améliorer votre expérience.</p>
        <button onclick="acceptCookies()">Accepter</button>
      </div>
    `;
    document.body.appendChild(banner);
  }
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'true');
  document.querySelector('.cookie-banner').remove();
}

// Décommenter pour activer
// document.addEventListener('DOMContentLoaded', showCookieConsent);
*/

// ========================================
// SEARCH FUNCTIONALITY - Recherche (optionnel)
// ========================================
function initSearch() {
  const searchInput = document.getElementById('search-input');
  
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const searchableElements = document.querySelectorAll('[data-searchable]');
      
      searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          element.style.display = '';
          element.classList.add('search-highlight');
        } else {
          element.style.display = 'none';
          element.classList.remove('search-highlight');
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', initSearch);

// ========================================
// MODAL / LIGHTBOX (optionnel)
// ========================================
function openModal(content) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-overlay" onclick="closeModal()"></div>
    <div class="modal-content">
      <button class="modal-close" onclick="closeModal()">×</button>
      ${content}
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
  }
}

// Fermer avec Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ========================================
// FORM VALIDATION (optionnel)
// ========================================
function validateForm(formId) {
  const form = document.getElementById(formId);
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
          
          // Créer un message d'erreur
          if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Ce champ est requis';
            input.parentNode.insertBefore(errorMsg, input.nextSibling);
          }
        } else {
          input.classList.remove('error');
          const errorMsg = input.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.remove();
          }
        }
      });
      
      if (isValid) {
        // Soumettre le formulaire
        form.submit();
      }
    });
  }
}

// ========================================
// SHARE BUTTONS - Partage sur réseaux sociaux
// ========================================
function shareOnSocial(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  
  let shareUrl = '';
  
  switch(platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${title}%20${url}`;
      break;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
}

// ========================================
// PRINT PAGE - Imprimer la page
// ========================================
function printPage() {
  window.print();
}

// ========================================
// COPY TO CLIPBOARD - Copier dans le presse-papier
// ========================================
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    // Afficher une notification
    showNotification('Copié dans le presse-papier !');
  }).catch(function(err) {
    console.error('Erreur de copie:', err);
  });
}

// ========================================
// NOTIFICATION SYSTEM - Système de notifications
// ========================================
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Animation d'entrée
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Supprimer après 3 secondes
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// ========================================
// CONSOLE MESSAGE - Message dans la console
// ========================================
console.log('%c⚽ FC FULBERT CHARTRES ⚽', 'color: #8B1538; font-size: 24px; font-weight: bold;');
console.log('%cBienvenue sur le site officiel !', 'color: #D4AF37; font-size: 14px;');
console.log('%cDepuis 1923 - Passion, Valeurs & Performance', 'color: #1A2332; font-size: 12px;');
console.log('%c📧 Contact : contact@fcfulbert.fr', 'color: #6C757D; font-size: 11px;');

// ========================================
// PERFORMANCE MONITORING - Suivi des performances
// ========================================
if ('performance' in window) {
  window.addEventListener('load', function() {
    setTimeout(function() {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      
      console.log(`⚡ Page chargée en ${pageLoadTime}ms`);
      
      // Envoyer à un système d'analytics si nécessaire
      // sendToAnalytics('pageLoadTime', pageLoadTime);
    }, 0);
  });
}

// ========================================
// ERROR HANDLING - Gestion des erreurs
// ========================================
window.addEventListener('error', function(e) {
  console.error('Erreur détectée:', e.message);
  // Envoyer à un système de logging si nécessaire
  // sendErrorToServer(e);
});

// ========================================
// ACCESSIBILITY - Amélioration de l'accessibilité
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Ajouter role et aria-label aux éléments interactifs
  const buttons = document.querySelectorAll('button:not([aria-label])');
  buttons.forEach(button => {
    if (!button.getAttribute('aria-label')) {
      button.setAttribute('aria-label', button.textContent.trim());
    }
  });
  
  // Skip to main content
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.className = 'skip-to-main';
  skipLink.textContent = 'Aller au contenu principal';
  document.body.insertBefore(skipLink, document.body.firstChild);
});

// ========================================
// COUNTDOWN TIMER - Compte à rebours (optionnel)
// ========================================
function startCountdown(targetDate, elementId) {
  const countdownElement = document.getElementById(elementId);
  
  if (!countdownElement) return;
  
  const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;
    
    if (distance < 0) {
      clearInterval(timer);
      countdownElement.innerHTML = 'Match en cours !';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    countdownElement.innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

// Exemple d'utilisation:
// startCountdown('2025-10-15 18:00:00', 'countdown');

// ========================================
// INITIALIZE ALL - Initialisation globale
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ FC Fulbert - JavaScript initialisé');
  
  // Ajouter d'autres initialisations ici si nécessaire
});

// ========================================
// FIN DU FICHIER SCRIPT.JS
// ========================================