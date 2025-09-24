// JavaScript files are compiled and minified during the build process to the assets/built folder. See available scripts in the package.json file.

// Import CSS
import "../css/index.css";

// Import JS
import menuOpen from "./menuOpen";
import infiniteScroll from "./infiniteScroll";

// Dark mode functionality
function initDarkMode() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const toggleButton = document.getElementById('dark-mode-toggle');
        const toggleIcon = toggleButton ? toggleButton.querySelector('.toggle-icon') : null;

        if (toggleButton && toggleIcon) {
            // Update button to match current theme
            toggleIcon.textContent = savedTheme === 'dark' ? '☀' : '☽';
            toggleButton.setAttribute('title', savedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

            // Add click event listener
            toggleButton.addEventListener('click', function() {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                toggleIcon.textContent = newTheme === 'dark' ? '☀' : '☽';
                toggleButton.setAttribute('title', newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            });
        }
    });
}

// Subscribe button feedback functionality
function initSubscribeButtons() {
    // Function to add button feedback
    function addButtonFeedback(button) {
        console.log('Adding feedback to button:', button);

        // Add loading state
        button.classList.add('loading');
        button.disabled = true;

        console.log('Button classes after loading:', button.classList.toString());

        // Simulate loading time
        setTimeout(() => {
            button.classList.remove('loading');
            button.classList.add('success');
            button.disabled = false;

            console.log('Button classes after success:', button.classList.toString());

            // Reset after 3 seconds
            setTimeout(() => {
                button.classList.remove('success');
                console.log('Button reset, classes:', button.classList.toString());
            }, 3000);
        }, 1500);
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initButtons);
    } else {
        initButtons();
    }

    function initButtons() {
        console.log('Initializing subscribe buttons...');

        // Handle all subscribe buttons with delegation
        document.addEventListener('click', function(e) {
            const button = e.target;

            // Check if clicked element is a subscribe button
            if (button.matches('.subscribe-button, .newsletter-button') ||
                button.matches('.sidebar-newsletter-form button[type="submit"]') ||
                button.matches('[data-members-form] button[type="submit"]')) {

                console.log('Subscribe button clicked:', button);

                // Prevent double-processing
                if (button.classList.contains('loading') || button.classList.contains('success')) {
                    return;
                }

                addButtonFeedback(button);
            }
        });

        // Also handle form submissions
        document.addEventListener('submit', function(e) {
            if (e.target.matches('[data-members-form]')) {
                const submitButton = e.target.querySelector('button[type="submit"]');
                if (submitButton && !submitButton.classList.contains('loading')) {
                    console.log('Form submitted, adding feedback to button:', submitButton);
                    addButtonFeedback(submitButton);
                }
            }
        });

        console.log('Subscribe button initialization complete');
    }
}

// Call the functions
menuOpen();
infiniteScroll();
initDarkMode();
initSubscribeButtons();