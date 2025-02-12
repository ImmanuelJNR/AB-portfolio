document.addEventListener("DOMContentLoaded", () => {
  const caseStudies = [...document.querySelectorAll(".case-study")];

  if (!caseStudies.length) return; // Prevent errors if no elements exist

  // Calculate max height efficiently
  const maxHeight = Math.max(...caseStudies.map((cs) => cs.offsetHeight));

  // Apply max height using requestAnimationFrame to avoid layout thrashing
  requestAnimationFrame(() => {
    caseStudies.forEach((cs) => (cs.style.height = `${maxHeight}px`));
  });

  initializeGSAP(maxHeight);
});

gsap.registerPlugin(ScrollTrigger);

function initializeGSAP(caseStudyHeight) {
  const cards = [...document.querySelectorAll(".case-study")];
  const header = document.querySelector(".pinn");
  const paginationDots = [...document.querySelectorAll(".pagination div")];

  if (!cards.length || !header) return; // Ensure elements exist before proceeding

  const animation = gsap.timeline();

  cards.forEach((card, index) => {
    if (index === 0) return; // Skip first card (no animation needed)

    gsap.set(card, { y: index * caseStudyHeight });
    animation.to(card, { y: 0, duration: index * 0.5, ease: "none" }, 0);
  });

  ScrollTrigger.create({
    trigger: ".wrapper",
    start: "top top",
    pin: true,
    end: `+=${cards.length * caseStudyHeight + header.offsetHeight}`,
    scrub: true,
    animation: animation,
    markers: false,
    onUpdate: ({ progress }) =>
      updatePagination(progress, cards.length, paginationDots),
  });
}

function updatePagination(progress, totalCards, dots) {
  const activeIndex = Math.floor(progress * (totalCards - 1));

  dots.forEach((dot, index) => {
    const isActive = index === activeIndex;
    dot.classList.toggle("bg-yellow", isActive);
    dot.classList.toggle("bg-fadeBlack", !isActive);
    dot.style.transform = isActive ? "scale(1.5)" : "scale(1)";
  });
}
