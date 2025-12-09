document.addEventListener('DOMContentLoaded', function () {
    // 1. Animation d'intersection pour les sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // 2. Smooth scrolling amélioré avec rebond
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                setTimeout(() => {
                    targetElement.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        targetElement.style.transform = 'translateY(0)';
                    }, 300);
                }, 1000);
            }
        });
    });

    // 3. Animation des cartes de compétences
    const skillCards = document.querySelectorAll('.card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'perspective(1000px) rotateX(10deg) rotateY(10deg)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        });
    });

    // 4. Effet de vague sur le header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            header.style.background = 'rgba(23, 26, 33, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.background = 'var(--bg-color)';
            header.style.backdropFilter = '';
            header.style.boxShadow = '';
        }

        header.style.transform = `translateY(${Math.sin(scrollPosition * 0.01) * 3}px)`;
    });

    // 5. Animation de texte typographique avec correction d'espace
    const mainTitle = document.querySelector('.main h1');
    if (mainTitle) {
        let text = mainTitle.textContent;

        // Ajoute un espace s'il manque entre une minuscule et une majuscule
        text = text.replace(/([a-zéèà])([A-ZÉÈÀ])/g, '$1 $2');

        mainTitle.textContent = '';

        const letters = text.split('');
        letters.forEach((char, i) => {
            setTimeout(() => {
                mainTitle.textContent += char;
            }, i * 100);
        });
    }

    // 6. Effet parallaxe (ajouter data-speed="0.3" aux sections concernées)
    const parallaxSections = document.querySelectorAll('.main, .about, .projects');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        parallaxSections.forEach(section => {
            const speed = section.dataset.speed || 0.3;
            const offset = scrollPosition * speed;
            section.style.backgroundPositionY = `${offset}px`;
        });
    });

    // 7. Animation des icônes sociales
    const socialIcons = document.querySelectorAll('.Social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const rotations = [5, -5, 10, -10];
            const randomRotate = rotations[Math.floor(Math.random() * rotations.length)];
            icon.style.transform = `rotate(${randomRotate}deg) scale(1.2)`;
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
        });
    });

    // 8. Effet de confetti au clic sur le bouton CV
    const downloadBtn = document.querySelector('.btn-area .btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            if (!e.target.href.includes('#')) {
                createConfetti();
            }
        });
    }

    function createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = '-10px';
            confetti.style.zIndex = '9999';
            confetti.style.transform = 'rotate(45deg)';

            document.body.appendChild(confetti);

            const animation = confetti.animate([
                { top: '-10px', opacity: 1 },
                { top: `${Math.random() * 100 + 50}vh`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
            });

            animation.onfinish = () => confetti.remove();
        }
    }

    // 9. Changement de style au clic sur le titre principal
    if (mainTitle) {
        mainTitle.addEventListener('click', () => {
            mainTitle.classList.toggle('clicked-style');
        });
    }

    // 10. Animation au clic n'importe où sur la page
    document.addEventListener('click', function(e) {
        for (let i = 0; i < 5; i++) {
            const circle = document.createElement('div');
            circle.className = 'click-circle';
            document.body.appendChild(circle);

            const size = Math.random() * 20 + 10;
            const color = `hsl(${Math.random() * 360}, 100%, 60%)`;

            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;
            circle.style.backgroundColor = color;
            circle.style.left = `${e.clientX}px`;
            circle.style.top = `${e.clientY}px`;

            // Animation
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 100 + 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            circle.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => circle.remove();
        }
    });
});
