 // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('#mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        const submitText = document.getElementById('submitText');
        const spinner = document.getElementById('spinner');
        const formStatus = document.getElementById('formStatus');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                submitText.textContent = 'Sending...';
                spinner.classList.remove('hidden');
                
                try {
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: new FormData(contactForm),
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        formStatus.textContent = 'Message sent successfully!';
                        formStatus.classList.remove('hidden');
                        formStatus.classList.add('text-green-400');
                        contactForm.reset();
                    } else {
                        throw new Error('Failed to send message');
                    }
                } catch (error) {
                    formStatus.textContent = 'Failed to send message. Please try again.';
                    formStatus.classList.remove('hidden');
                    formStatus.classList.add('text-red-400');
                } finally {
                    submitText.textContent = 'Send Message';
                    spinner.classList.add('hidden');
                    
                    setTimeout(() => {
                        formStatus.classList.add('hidden');
                    }, 5000);
                }
            });
        }
        
        // Back to top button
        const backToTopButton = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Cookie Consent
        const cookieConsent = document.getElementById('cookieConsent');
        const acceptCookies = document.getElementById('acceptCookies');
        
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                cookieConsent.classList.remove('hidden');
            }, 2000);
        }
        
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            cookieConsent.classList.add('hidden');
        });

        // Intersection Observer for animations
        const animateElements = document.querySelectorAll('.animate-fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });