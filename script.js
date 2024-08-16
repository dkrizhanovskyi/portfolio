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
            console.error(`Error loading ${lang} translations:`, error);
        }
    };

    // Initialize translations and set the initial language
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
    window.setLanguage = function(lang) { // Make setLanguage globally available
        if (!translations[lang]) {
            console.warn(`Language "${lang}" is not available`);
            return;
        }

        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            } else {
                console.warn(`Missing translation for "${key}" in "${lang}"`);
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
            const lang = event.target.getAttribute('data-lang');
            if (lang) {
                setLanguage(lang);
                dropdownContent.classList.remove('show');
            } else {
                console.warn(`Language "${lang}" is not available`);
            }
        });
    });
});
