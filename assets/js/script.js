document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    const ctaButton = document.querySelector('.cta-button');
    const redButton = document.querySelector('.red-button');
    const submitButton = document.querySelector('.submit-button');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 40px';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.padding = '15px 40px';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');

                if (targetId === '#') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }

                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }

            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    ctaButton.addEventListener('click', function() {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const targetPosition = aboutSection.offsetTop - 80;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });

    if (redButton) {
        redButton.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const targetPosition = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                const selectElement = document.querySelector('.contact-form select');
                if (selectElement) {
                    for (let i = 0; i < selectElement.options.length; i++) {
                        if (selectElement.options[i].value === 'red-access') {
                            selectElement.selectedIndex = i;
                            break;
                        }
                    }
                }
            }
        });
    }

    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();

            const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
            let isValid = true;

            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff3e3e';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (isValid) {
                submitButton.innerHTML = 'Submitted!';
                submitButton.style.backgroundColor = 'var(--success)';

                setTimeout(() => {
                    formInputs.forEach(input => {
                        input.value = '';
                    });

                    submitButton.innerHTML = 'Submit';
                    submitButton.style.backgroundColor = '';
                }, 2000);
            }
        });
    }

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;

        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        if (scrollPosition < document.querySelector('section').offsetTop) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[0].classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveNavLink);

    const terminalLines = document.querySelectorAll('.terminal-body p');
    let lineIndex = 0;

    function showNextLine() {
        if (lineIndex < terminalLines.length - 1) {
            terminalLines[lineIndex].style.opacity = 1;
            lineIndex++;
            setTimeout(showNextLine, 500);
        } else {
            terminalLines[lineIndex].style.opacity = 1;
        }
    }

    terminalLines.forEach(line => {
        line.style.opacity = 0;
    });

    const redSection = document.querySelector('#red');
    let terminalAnimationStarted = false;

    function checkRedSectionVisibility() {
        if (redSection) {
            const redSectionTop = redSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (redSectionTop < windowHeight * 0.75 && !terminalAnimationStarted) {
                terminalAnimationStarted = true;
                showNextLine();
            }
        }
    }

    window.addEventListener('scroll', checkRedSectionVisibility);
    checkRedSectionVisibility();

    const productCards = document.querySelectorAll('.product-card');

    function animateProductCards() {
        productCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    productCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const productsSection = document.querySelector('#products');
    let productAnimationStarted = false;

    function checkProductsSectionVisibility() {
        if (productsSection) {
            const productsSectionTop = productsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (productsSectionTop < windowHeight * 0.75 && !productAnimationStarted) {
                productAnimationStarted = true;
                animateProductCards();
            }
        }
    }

    window.addEventListener('scroll', checkProductsSectionVisibility);
    checkProductsSectionVisibility();
});
