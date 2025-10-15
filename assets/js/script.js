// LOADER
window.addEventListener('load', function() {
  const loader = document.querySelector('.loader-wrapper');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1500);
});

// SCROLL ANIMATIONS
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// BACK TO TOP BUTTON
const backToTopBtn = document.querySelector('.back-to-top');

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

// STAT CARDS COUNTER
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

const statsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      const statNumber = entry.target.querySelector('.stat-number');
      const text = statNumber.textContent;
      const finalValue = parseInt(text);
      
      if (!isNaN(finalValue)) {
        statNumber.textContent = '0';
        animateValue(statNumber, 0, finalValue, 2000);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
  statsObserver.observe(card);
});

// NAVBAR SCROLL EFFECT
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.padding = '12px 5vw';
    nav.style.boxShadow = '0 6px 30px rgba(0,0,0,0.3)';
  } else {
    nav.style.padding = '18px 5vw';
    nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
  }
  
  lastScroll = currentScroll;
});

// FAQ ACCORDION
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', function() {
    this.style.transform = this.style.transform === 'scale(1.02)' ? 'scale(1)' : 'scale(1.02)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 200);
  });
});

// PARALLAX EFFECT
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  const rate = scrolled * 0.3;
  
  if (hero && scrolled < 600) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// CARD TILT EFFECT
document.querySelectorAll('.stat-card, .card').forEach(card => {
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

// CONSOLE MESSAGE
console.log('%c⚽ FC FULBERT CHARTRES ⚽', 'color: #8B1538; font-size: 24px; font-weight: bold;');
console.log('%cBienvenue sur le site officiel !', 'color: #D4AF37; font-size: 14px;');
console.log('%cDepuis 1923 - Passion, Valeurs & Performance', 'color: #1A2332; font-size: 12px;');