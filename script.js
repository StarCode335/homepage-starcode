// ========================================
// SISTEMA DE NAVEGAÇÃO SPA
// ========================================

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona todos os links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Seleciona todas as seções
    const sections = document.querySelectorAll('.section');
    
    // Função para trocar de seção
    function switchSection(targetSection) {
        // Remove a classe 'active' de todas as seções
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove a classe 'active' de todos os links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Adiciona 'active' na seção alvo
        const activeSection = document.getElementById(targetSection);
        if (activeSection) {
            activeSection.classList.add('active');
        }
        
        // Adiciona 'active' no link correspondente
        const activeLink = document.querySelector(`[data-section="${targetSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Adiciona evento de clique em cada link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão do link
            
            const targetSection = this.getAttribute('data-section');
            switchSection(targetSection);
        });
    });
    
    // ========================================
    // MENU HAMBÚRGUER MOBILE
    // ========================================
    
    const hamburger = document.getElementById('hamburger');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    function toggleMobileMenu(isOpen) {
        if (hamburger && mobileMenu) {
            hamburger.classList.toggle('active', isOpen);
            mobileMenu.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    }

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = !mobileMenu.classList.contains('active');
            toggleMobileMenu(isOpen);
        });
        
        if (closeMenu) {
            closeMenu.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMobileMenu(false);
            });
        }

        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active')) {
                const isClickInside = mobileMenu.contains(e.target) || hamburger.contains(e.target);
                if (!isClickInside) {
                    toggleMobileMenu(false);
                }
            }
        });

        // Fecha o menu ao pressionar Esc
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMobileMenu(false);
            }
        });

        // Impede que cliques dentro do menu fechem o menu (exceto nos links)
        mobileMenu.addEventListener('click', (e) => e.stopPropagation());
        
        // Fecha o menu ao clicar em um link
        mobileLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = this.getAttribute('data-section');
                toggleMobileMenu(false);
                switchSection(targetSection);
            });
        });
    }


    // ========================================
    // LOGO CLICÁVEL (função Home)
    // ========================================
    
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            toggleMobileMenu(false);
            switchSection('home');
        });
    });
    
    
    // ========================================
    // CARROSSEL DE PORTFÓLIO
    // ========================================
    
    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (carouselTrack && projectCards.length > 0) {
        let currentIndex = 0;
        let portfolioAutoplayInterval;
        
        function updateCarousel() {
            const cardWidth = projectCards[0].offsetWidth;
            const gap = 20; 
            const offset = -(currentIndex * (cardWidth + gap));
            
            carouselTrack.style.transform = `translateX(${offset}px)`;
            
            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex === projectCards.length - 1;
        }
        
        function nextProject() {
            if (currentIndex < projectCards.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; 
            }
            updateCarousel();
        }
        
        function startPortfolioAutoplay() {
            stopPortfolioAutoplay();
            portfolioAutoplayInterval = setInterval(nextProject, 5000);
        }
        
        function stopPortfolioAutoplay() {
            clearInterval(portfolioAutoplayInterval);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                stopPortfolioAutoplay();
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
                startPortfolioAutoplay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                stopPortfolioAutoplay();
                if (currentIndex < projectCards.length - 1) {
                    currentIndex++;
                    updateCarousel();
                }
                startPortfolioAutoplay();
            });
        }
        
        updateCarousel();
        startPortfolioAutoplay();
        window.addEventListener('resize', updateCarousel);
    }
    
    
    // ========================================
    // AUTOPLAY SCROLL EQUIPE
    // ========================================
    
    const teamScroll = document.querySelector('.team-scroll');
    if (teamScroll) {
        let teamAutoplayInterval;
        let isUserInteracting = false;
        let interactionTimeout;
        
        function autoScrollTeam() {
            if (!isUserInteracting) {
                const maxScroll = teamScroll.scrollWidth - teamScroll.clientWidth;
                
                if (teamScroll.scrollLeft >= maxScroll - 5) {
                    teamScroll.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    teamScroll.scrollBy({ left: 300, behavior: 'smooth' });
                }
            }
        }
        
        function startTeamAutoplay() {
            stopTeamAutoplay();
            teamAutoplayInterval = setInterval(autoScrollTeam, 4000);
        }
        
        function stopTeamAutoplay() {
            clearInterval(teamAutoplayInterval);
        }
        
        teamScroll.addEventListener('mousedown', () => isUserInteracting = true);
        teamScroll.addEventListener('touchstart', () => isUserInteracting = true);
        
        window.addEventListener('mouseup', () => {
            clearTimeout(interactionTimeout);
            interactionTimeout = setTimeout(() => isUserInteracting = false, 3000);
        });
        
        window.addEventListener('touchend', () => {
            clearTimeout(interactionTimeout);
            interactionTimeout = setTimeout(() => isUserInteracting = false, 3000);
        });

        // Também para o scroll manual simples (scrollbar)
        teamScroll.addEventListener('scroll', () => {
            if (!isUserInteracting) {
                // Se o scroll foi disparado, mas não pela nossa função, é interação do usuário
                // (O navegador não distingue bem, então usamos um flag no autoScroll se necessário, 
                // mas simplificaremos confiando nos eventos de toque/mouse)
            }
        });
        
        startTeamAutoplay();
    }
});
