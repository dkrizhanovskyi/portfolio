document.addEventListener("DOMContentLoaded", () => {
    const translations = {
        en: {},
        de: {},
        ua: {}
    };

    // Function to load translations
    const loadTranslations = async (lang) => {
        try {
            const response = await fetch(`lang/${lang}.json`);
            if (!response.ok) throw new Error(`Could not load ${lang} translations`);
            const data = await response.json();
            translations[lang] = data;
        } catch (error) {
            console.error(error);
        }
    };

    // Load all translations and set the initial language
    const initializeTranslations = async () => {
        await Promise.all([
            loadTranslations('en'),
            loadTranslations('de'),
            loadTranslations('ua')
        ]);
        setLanguage('en'); // Set initial language to English
    };

    initializeTranslations();

    // Function to set the language
    const setLanguage = (lang) => {
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
            const lang = event.target.dataset.lang;
            setLanguage(lang);
            dropdownContent.classList.remove('show');
        });
    });
});
