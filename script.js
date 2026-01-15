// ========================================
// SISTEMA DE NAVEGAÇÃO SPA
// ========================================

// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os links de navegação
  const navLinks = document.querySelectorAll(".nav-link");

  // Seleciona todas as seções
  const sections = document.querySelectorAll(".section");

  // Função para trocar de seção
  function switchSection(targetSection) {
    // Remove a classe 'active' de todas as seções
    sections.forEach((section) => {
      section.classList.remove("active");
    });

    // Remove a classe 'active' de todos os links
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // Adiciona 'active' na seção alvo
    const activeSection = document.getElementById(targetSection);
    if (activeSection) {
      activeSection.classList.add("active");
      
      // Se a seção for portfólio, redimensiona o carrossel do Flickity
      if (targetSection === "portfolio") {
        setTimeout(() => {
          const carousel = document.querySelector(".carousel");
          if (carousel) {
            // Verifica se a instância do Flickity existe
            const flkty = Flickity.data(carousel);
            if (flkty) {
              flkty.resize();
            }
          }
        }, 100); // Pequeno delay para garantir que o CSS display:flex foi aplicado
      }
    }

    // Adiciona 'active' no link correspondente
    const activeLink = document.querySelector(
      `[data-section="${targetSection}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  // Adiciona evento de clique em cada link de navegação
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Previne o comportamento padrão do link

      const targetSection = this.getAttribute("data-section");
      switchSection(targetSection);
    });
  });

  // ========================================
  // MENU HAMBÚRGUER MOBILE
  // ========================================

  const hamburger = document.getElementById("hamburger");
  const closeMenu = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  function toggleMobileMenu(isOpen) {
    if (hamburger && mobileMenu) {
      hamburger.classList.toggle("active", isOpen);
      mobileMenu.classList.toggle("active", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = !mobileMenu.classList.contains("active");
      toggleMobileMenu(isOpen);
    });

    if (closeMenu) {
      closeMenu.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleMobileMenu(false);
      });
    }

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", function (e) {
      if (mobileMenu.classList.contains("active")) {
        const isClickInside =
          mobileMenu.contains(e.target) || hamburger.contains(e.target);
        if (!isClickInside) {
          toggleMobileMenu(false);
        }
      }
    });

    // Fecha o menu ao pressionar Esc
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        toggleMobileMenu(false);
      }
    });

    // Impede que cliques dentro do menu fechem o menu (exceto nos links)
    mobileMenu.addEventListener("click", (e) => e.stopPropagation());

    // Fecha o menu ao clicar em um link
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetSection = this.getAttribute("data-section");
        toggleMobileMenu(false);
        switchSection(targetSection);
      });
    });
  }

  // ========================================
  // LOGO CLICÁVEL (função Home)
  // ========================================

  const logos = document.querySelectorAll(".logo");
  logos.forEach((logo) => {
    logo.style.cursor = "pointer";
    logo.addEventListener("click", function () {
      toggleMobileMenu(false);
      switchSection("home");
    });
  });

  // ========================================
  // TROCA DE VÍDEO RESPONSIVA
  // ========================================
  
  const homeVideo = document.getElementById("homeVideo");
  const videoSource = document.getElementById("videoSource");

  function updateVideoSource() {
    if (!homeVideo || !videoSource) return;

    const isMobile = window.innerWidth <= 768;
    const currentSrc = videoSource.getAttribute("src");
    const newSrc = isMobile 
      ? "ASSETS/logo-animada-vertical.mp4" 
      : "ASSETS/logo-animada2.0.mp4";

    // Só atualiza se a fonte mudar para evitar recarregamentos desnecessários
    if (currentSrc !== newSrc) {
      videoSource.setAttribute("src", newSrc);
      homeVideo.load();
      // Tenta reproduzir novamente após carregar
      homeVideo.play().catch(e => console.log("Autoplay preventido pelo navegador:", e));
    }
  }

  // Executa inicialmente
  updateVideoSource();

  // Executa ao redimensionar a tela
  window.addEventListener("resize", () => {
    // Debounce simples para não executar excessivamente durante o resize
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(updateVideoSource, 250);
  });

  // ========================================
  // CARROSSEL DE PORTFÓLIO
  // ========================================
  
  // Flickity handles the carousel automatically via data-flickity attribute in HTML
  // No manual JS required for basic functionality


  // ========================================
  // AUTOPLAY SCROLL EQUIPE
  // ========================================

  const teamScroll = document.querySelector(".team-scroll");
  if (teamScroll) {
    let teamAutoplayInterval;
    let isUserInteracting = false;
    let interactionTimeout;

    function autoScrollTeam() {
      if (!isUserInteracting) {
        const maxScroll = teamScroll.scrollWidth - teamScroll.clientWidth;

        if (teamScroll.scrollLeft >= maxScroll - 5) {
          teamScroll.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          teamScroll.scrollBy({ left: 300, behavior: "smooth" });
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

    teamScroll.addEventListener("mousedown", () => (isUserInteracting = true));
    teamScroll.addEventListener("touchstart", () => (isUserInteracting = true));

    window.addEventListener("mouseup", () => {
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => (isUserInteracting = false), 3000);
    });

    window.addEventListener("touchend", () => {
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => (isUserInteracting = false), 3000);
    });

    // Também para o scroll manual simples (scrollbar)
    teamScroll.addEventListener("scroll", () => {
      if (!isUserInteracting) {
        // Se o scroll foi disparado, mas não pela nossa função, é interação do usuário
        // (O navegador não distingue bem, então usamos um flag no autoScroll se necessário,
        // mas simplificaremos confiando nos eventos de toque/mouse)
      }
    });

    startTeamAutoplay();
    startTeamAutoplay();
  }

  // ========================================
  // ANIMAÇÃO DA TIMELINE AO SCROLL
  // ========================================
  
  const timelineSection = document.querySelector('.timeline-section-container');
  
  if (timelineSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: Stop observing once visible if you want it to happen only once
          observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.2, // Trigger when 20% of the element is visible
      rootMargin: "0px" 
    });
    
    observer.observe(timelineSection);
  }
});
