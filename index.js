function initPortfolioAnimations(presetName) {
  gsap.registerPlugin(ScrollTrigger);

  const animationPresets = {
    smooth: {
      navDuration: 1.1,
      heroDuration: 1.2,
      heroStagger: 0.2,
      revealY: 24,
      revealDuration: 1.15,
      revealEase: "power1.out",
      sectionTitleDuration: 0.9,
      sectionDescDuration: 0.8,
      progressScrub: 0.55,
      heroParallax: 9,
      workParallax: -10,
      hoverY: -5,
      hoverDuration: 0.5
    },
    dynamic: {
      navDuration: 0.65,
      heroDuration: 0.75,
      heroStagger: 0.24,
      revealY: 46,
      revealDuration: 0.75,
      revealEase: "power3.out",
      sectionTitleDuration: 0.55,
      sectionDescDuration: 0.45,
      progressScrub: 0.12,
      heroParallax: 24,
      workParallax: -24,
      hoverY: -11,
      hoverDuration: 0.3
    }
  };
  

  const selectedPreset = presetName || "smooth";
  const anim = animationPresets[selectedPreset] || animationPresets.smooth;

  gsap.from("nav", {
    y: -40,
    opacity: 0,
    duration: anim.navDuration,
    ease: selectedPreset === "smooth" ? "power1.out" : "power2.out"
  });

  gsap.from(".hero-left > *", {
    y: 34,
    opacity: 0,
    duration: anim.heroDuration,
    ease: selectedPreset === "smooth" ? "power1.out" : "power3.out",
    stagger: anim.heroStagger
  });

  gsap.from(".hero-photo-placeholder", {
    scale: 0.93,
    opacity: 0,
    duration: anim.heroDuration + 0.2,
    ease: selectedPreset === "smooth" ? "power1.out" : "power2.out",
    delay: 0.2
  });

  gsap.to(".scroll-progress", {
    scaleX: 1,
    transformOrigin: "left center",
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: anim.progressScrub
    }
  });

  gsap.to(".hero-right", {
    yPercent: anim.heroParallax,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.utils.toArray("section").forEach((section) => {
    const label = section.querySelector(".section-label, .hero-label");
    const title = section.querySelector(".section-title, .hero-name");
    const desc = section.querySelector(".services-desc, .hero-desc, .contact-desc");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    if (label) timeline.from(label, { x: -20, opacity: 0, duration: 0.5, ease: anim.revealEase });
    if (title) timeline.from(title, { y: 34, opacity: 0, duration: anim.sectionTitleDuration, ease: anim.revealEase }, "-=0.15");
    if (desc) timeline.from(desc, { y: 24, opacity: 0, duration: anim.sectionDescDuration, ease: anim.revealEase }, "-=0.28");
  });

  gsap.utils.toArray(".service-card, .work-card, .testimonial-card, .about-right, .contact-form").forEach((el) => {
    gsap.from(el, {
      y: anim.revealY,
      opacity: 0,
      duration: anim.revealDuration,
      ease: anim.revealEase,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  gsap.utils.toArray(".work-card .work-visual-text").forEach((el) => {
    gsap.to(el, {
      yPercent: anim.workParallax,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest(".work-card"),
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  gsap.utils.toArray(".work-card, .service-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { y: anim.hoverY, duration: anim.hoverDuration, ease: anim.revealEase });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { y: 0, duration: anim.hoverDuration, ease: anim.revealEase });
    });
  });
}
