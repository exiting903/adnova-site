
(function() {
    function initApp() {
        console.log("App Initialized");
        
        // --- Elements ---
        const menuBtn = document.getElementById('menu-btn');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuLinks = document.querySelectorAll('.menu-link');
        
        // Use class selector to find all "Leave Request" buttons
        const scrollButtons = document.querySelectorAll('.js-scroll-contact');
        
        const contactSection = document.getElementById('contact');
        
        const form = document.getElementById('contactForm');
        const phoneInput = document.getElementById('phone');
        
        const modal = document.getElementById('successModal');
        const modalContent = document.getElementById('modalContent');
        const modalCloseBtn = document.getElementById('modal-close-btn');

        // --- Menu Logic ---
        function toggleMenu(show) {
            if (!mobileMenu) return;
            if (show) {
                mobileMenu.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden'; // Disable scroll
            } else {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = ''; // Enable scroll
            }
        }

        if (menuBtn) {
            menuBtn.onclick = function(e) {
                e.preventDefault();
                toggleMenu(true);
            };
        }

        if (closeMenuBtn) {
            closeMenuBtn.onclick = function(e) {
                e.preventDefault();
                toggleMenu(false);
            };
        }

        // Close menu when clicking links
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });

        // Close menu when clicking outside (on the overlay itself, if content doesn't cover it)
        if (mobileMenu) {
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    toggleMenu(false);
                }
            });
        }

        // --- Scroll Logic ---
        function handleScroll(e) {
            e.preventDefault();
            if (contactSection) {
                // Use scrollIntoView for smooth scrolling
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.error("Contact section not found!");
            }
        }

        scrollButtons.forEach(btn => {
            btn.onclick = handleScroll;
        });

        // --- Modal Logic ---
        function showModal() {
            if (!modal || !modalContent) return;
            modal.classList.remove('hidden');
            // Force reflow for animation
            void modal.offsetWidth;
            modal.classList.add('modal-show');
            modalContent.classList.add('modal-content-show');
            document.body.style.overflow = 'hidden';
        }

        function hideModal() {
            if (!modal || !modalContent) return;
            modal.classList.remove('modal-show');
            modalContent.classList.remove('modal-content-show');
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 200);
        }

        if (modalCloseBtn) {
            modalCloseBtn.onclick = hideModal;
        }

        if (modal) {
            modal.onclick = function(e) {
                if (e.target === modal) hideModal();
            };
        }

        // --- Form Logic ---
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                // Allow only numbers and formatting chars
                e.target.value = e.target.value.replace(/[^0-9+\s]/g, '');
            });
        }

        if (form) {
            form.onsubmit = function(e) {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const originalContent = btn.innerHTML;
                
                // Loading spinner
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
                btn.disabled = true;

                // Fake network request
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    showModal();
                    form.reset();
                }, 800);
            };
        }
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();
