document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const articles = document.querySelectorAll('.article-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Retirer la classe active de tous les boutons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Ajouter la classe active au bouton cliqué
      this.classList.add('active');
      
      // Récupérer la catégorie sélectionnée
      const category = this.getAttribute('data-category');
      
      // Filtrer les articles
      articles.forEach(article => {
        if (category === 'all') {
          article.style.display = 'block';
          // Animation de réapparition
          setTimeout(() => {
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
          }, 10);
        } else {
          const articleCategory = article.getAttribute('data-category');
          if (articleCategory === category) {
            article.style.display = 'block';
            setTimeout(() => {
              article.style.opacity = '1';
              article.style.transform = 'translateY(0)';
            }, 10);
          } else {
            article.style.opacity = '0';
            article.style.transform = 'translateY(20px)';
            setTimeout(() => {
              article.style.display = 'none';
            }, 300);
          }
        }
      });
    });
  });
});