document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('inscription-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validation simple
      const nom = document.getElementById('nom').value.trim();
      const prenom = document.getElementById('prenom').value.trim();
      const email = document.getElementById('email').value.trim();
      const telephone = document.getElementById('telephone').value.trim();
      const rgpd = document.getElementById('rgpd').checked;
      const reglement = document.getElementById('reglement').checked;
      
      if (!nom || !prenom || !email || !telephone) {
        alert('⚠️ Veuillez remplir tous les champs obligatoires');
        return;
      }
      
      if (!rgpd || !reglement) {
        alert('⚠️ Veuillez accepter les conditions obligatoires');
        return;
      }
      
      // Simulation envoi
      alert('✅ Votre demande d\'inscription a été envoyée avec succès !\n\nNous vous recontacterons dans les 48 heures.\n\nMerci de votre confiance ! ⚽');
      
      // Réinitialiser le formulaire
      form.reset();
      
      // Scroll vers le haut
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Calcul automatique de la catégorie selon la date de naissance
  const dateNaissance = document.getElementById('date-naissance');
  const categorieSelect = document.getElementById('categorie');
  
  if (dateNaissance && categorieSelect) {
    dateNaissance.addEventListener('change', function() {
      const birthDate = new Date(this.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      // Suggestion de catégorie (simplifié)
      if (age >= 18) {
        categorieSelect.value = 'senior';
      } else if (age >= 16) {
        categorieSelect.value = 'u18';
      } else if (age >= 14) {
        categorieSelect.value = 'u17';
      } else if (age >= 13) {
        categorieSelect.value = 'u15';
      } else if (age >= 11) {
        categorieSelect.value = 'u12';
      } else if (age >= 9) {
        categorieSelect.value = 'u10';
      } else if (age >= 7) {
        categorieSelect.value = 'u8';
      } else {
        categorieSelect.value = 'u6';
      }
    });
  }
});