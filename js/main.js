// Funcionalidad principal de la aplicación

// Navegación suave
document.addEventListener('DOMContentLoaded', function () {

    // Smooth scroll para los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Actualizar enlace activo
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Destacar sección activa en la navegación al hacer scroll
    const sections = document.querySelectorAll('.section');

    function highlightNavOnScroll() {
        let scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animatedElements = document.querySelectorAll(
        '.study-card, .objective-card, .benefit-card, .finding-card, .problem-box, .methodology-box'
    );

    animatedElements.forEach(element => {
        element.classList.add('fade-in-element');
        fadeInObserver.observe(element);
    });

    // Contador animado para números grandes
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target.toLocaleString('es-AR');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start).toLocaleString('es-AR');
            }
        }, 16);
    }

    // Animar el número destacado en la introducción
    const statNumber = document.querySelector('.stat-number');
    if (statNumber) {
        const statObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(statNumber, 120000);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statObserver.observe(statNumber);
    }

    // Animar números en las tarjetas de hallazgos
    const findingNumbers = document.querySelectorAll('.finding-number');
    findingNumbers.forEach(number => {
        const findingObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = number.textContent;
                    const value = parseFloat(text);

                    if (!isNaN(value)) {
                        let start = 0;
                        const duration = 1500;
                        const increment = value / (duration / 16);

                        const timer = setInterval(() => {
                            start += increment;
                            if (start >= value) {
                                number.textContent = value.toFixed(1) + '%';
                                clearInterval(timer);
                            } else {
                                number.textContent = start.toFixed(1) + '%';
                            }
                        }, 16);
                    }

                    findingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        findingObserver.observe(number);
    });

    // Animar números en las tarjetas de estudio
    const studyNumbers = document.querySelectorAll('.study-number');
    studyNumbers.forEach(number => {
        const studyObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const value = parseInt(number.textContent);

                    if (!isNaN(value)) {
                        animateCounter(number, value, 1500);
                    }

                    studyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        studyObserver.observe(number);
    });

    // Efecto parallax suave en el header
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');

        if (header && scrolled < 500) {
            header.style.transform = `translateY(${scrolled * 0.3}px)`;
            header.style.opacity = 1 - (scrolled / 500);
        }
    });

    // Botón para volver arriba (se muestra al hacer scroll)
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mejorar accesibilidad: focus visible para teclado
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function () {
        document.body.classList.remove('keyboard-navigation');
    });

    // Log de carga exitosa
    console.log('✅ Aplicación ACV cargada correctamente');
    console.log('📊 Gráficos estadísticos inicializados');
    console.log('🎨 Animaciones activadas');
});

// Agregar estilos CSS para las animaciones y el botón de scroll
const style = document.createElement('style');
style.textContent = `
    .fade-in-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        background-color: var(--color-primary-light);
        color: var(--color-primary-dark);
        font-weight: 600;
    }
    
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
    
    .scroll-to-top:active {
        transform: translateY(-2px);
    }
    
    body.keyboard-navigation *:focus {
        outline: 3px solid var(--color-primary);
        outline-offset: 2px;
    }
    
    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 20px;
        }
    }
`;
document.head.appendChild(style);
