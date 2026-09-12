/* ============================================================
   YOHUN BALAJI — PORTFOLIO INTERACTIONS & ANIMATIONS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Cursor Glow Effect (Desktop only)
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const renderGlow = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(renderGlow);
    };
    renderGlow();
  }

  // 3. Smooth Scrolling (Lenis + GSAP)
  let lenis = null;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // 4. Smooth Anchor Link Navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -60 });
        } else {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // 5. Active Nav Link on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const updateActiveNav = () => {
    const scrollY = window.scrollY + 200;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };
  window.addEventListener("scroll", updateActiveNav, { passive: true });

  // 6. GSAP Reveal Animations
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".reveal-fade").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    gsap.utils.toArray(".reveal-stagger").forEach((container) => {
      const children = container.children;
      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }

  // 7. Interactive Modal for Projects & Certificates
  const modal = document.getElementById("infoModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalClose = document.getElementById("modalClose");

  const openModal = (imgSrc, title, desc) => {
    if (!modal) return;
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Attach modal trigger to certificate cards
  document.querySelectorAll(".cert-card").forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.getAttribute("data-img") || card.querySelector("img")?.src;
      const title = card.querySelector(".cert-title")?.textContent || "Certificate";
      const desc = card.getAttribute("data-desc") || card.querySelector(".cert-issuer")?.textContent || "";
      openModal(img, title, desc);
    });
  });

  // Attach modal trigger to project cards
  document.querySelectorAll(".project-card").forEach((card) => {
    const btn = card.querySelector(".project-btn");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const img = card.querySelector(".project-thumb img")?.src;
        const title = card.querySelector(".project-title")?.textContent || "Project Details";
        const desc = card.querySelector(".project-desc")?.textContent || "";
        openModal(img, title, desc);
      });
    }
  });
});
