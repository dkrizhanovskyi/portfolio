document.addEventListener("DOMContentLoaded", function () {
    const translations = {
      en: {},
      de: {},
      ua: {}
    };
  
    function loadTranslations(lang) {
      return fetch(`lang/${lang}.json`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Could not load ${lang} translations`);
          }
          return response.json();
        })
        .then(data => {
          translations[lang] = data;
        });
    }
  
    Promise.all([
      loadTranslations('en'),
      loadTranslations('de'),
      loadTranslations('ua')
    ]).then(() => {
      setLanguage('en'); // Установим начальный язык
    }).catch(error => {
      console.error(error);
    });
  
    window.setLanguage = function (lang) {
      document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
          element.textContent = translations[lang][key];
        }
      });
    };
  
    // Burger menu toggle
    const burgerMenu = document.querySelector('.burger-menu .fas');
    const dropdownContent = document.querySelector('.burger-menu .dropdown-content');
    burgerMenu.addEventListener('click', () => {
      dropdownContent.classList.toggle('show');
    });
  
    // Event listeners for language buttons
    document.querySelectorAll('.burger-menu .dropdown-content button').forEach(button => {
      button.addEventListener('click', (event) => {
        const lang = event.target.textContent.toLowerCase();
        setLanguage(lang);
        dropdownContent.classList.remove('show');
      });
    });
  });
  