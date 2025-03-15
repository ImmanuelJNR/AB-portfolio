document.addEventListener("DOMContentLoaded", () => {
  const caseStudies = [...document.querySelectorAll(".case-study")];

  if (!caseStudies.length) return; // Prevent errors if no elements exist

  // Calculate max height efficiently
  // const maxHeight = Math.max(...caseStudies.map((cs) => cs.offsetHeight));

  const caseStudyHeight =
    window.innerWidth >= 900 ? window.innerHeight : window.innerHeight * 0.85;

  // Apply max height using requestAnimationFrame to avoid layout thrashing
  requestAnimationFrame(() => {
    caseStudies.forEach((cs) => {
      // cs.style.height = `${maxHeight}px`;
      cs.style.willChange = "transform"; // Helps with smooth animations
    });
  });

  initializeGSAP(caseStudyHeight);
});

gsap.registerPlugin(ScrollTrigger);

function initializeGSAP(caseStudyHeight) {
  const cards = [...document.querySelectorAll(".case-study")];
  const header = document.querySelector(".pinn");
  const paginationDots = [...document.querySelectorAll(".pagination div")];

  if (!cards.length || !header) return; // Ensure elements exist before proceeding

  const animation = gsap.timeline( {
    defaults: { ease: "power3.out", duration: 1.2 }, 
  }
  );



  cards.forEach((card, index) => {
    if (index === 0) return; // Skip first card (no animation needed)

    gsap.set(card, { y: index * caseStudyHeight });



    animation.to(
      card,
      {
        y: 0,
        duration: 0.8, // Smooth transition
        ease: "power3.out",
      },
      index
    );
  });

  ScrollTrigger.create({
    trigger: ".wrapper",
    start: "top top",
    pin: true,
    end: `+=${cards.length * caseStudyHeight + header.offsetHeight}`,
    scrub: 0.8,
    animation: animation,
    markers: false,
    snap: {
      // snapTo: 1 / (cards.length - 1), // Snap to each section
      snapTo: "labels", // Ensures controlled snapping
      duration: 0.5, // Smooth snapping
      ease: "power3.inOut",
    },
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

// navabar
document.addEventListener("DOMContentLoaded", () => {
  const navList = document.querySelector(".mobile-nav-list");
  const hamburger = document.querySelector(".hamburger");

  // Add a click event listener to the hamburger element
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("trigger");
    navList.classList.toggle("hidden");
    navList.classList.toggle("flex");
  });
});

// preloader
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const percentageText = preloader.querySelector("p");
  const pageContents = document.querySelectorAll(".page-content");
  const images = document.querySelectorAll("img");

  let imagesLoaded = 0;
  const totalImages = images.length;

  function updateProgress() {
    const progress = Math.round((imagesLoaded / totalImages) * 100);
    percentageText.textContent = `${progress}%`;
  }

  // Function to check if all images are loaded
  function imageLoaded() {
    // document.body.style.overflow = "hidden";
    imagesLoaded++;
    updateProgress();

    if (imagesLoaded === totalImages) {
      let counter = 0;
      const interval = setInterval(() => {
        counter += 10;
        percentageText.textContent = `${counter}%`;
        if (counter >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => {
              preloader.style.display = "none";
              document.body.style.overflow = "auto"; // Enable scrolling
              pageContents.forEach((content) => {
                content.style.opacity = "1"; // Show content
              });
            }, 300);
          }, 500);
        }
      }, 10);
    }
  }

  updateProgress();

  // If there are no images, hide the preloader immediately
  if (totalImages === 0) {
    preloader.style.display = "none";
    pageContents.forEach((content) => {
      content.style.opacity = "1";
    });
    document.body.style.overflow = "none";
  } else {
    images.forEach((img) => {
      if (img.complete) {
        imageLoaded(); // Already loaded
      } else {
        img.addEventListener("load", imageLoaded);
        img.addEventListener("error", imageLoaded); // Handle errors
      }
    });
  }

  // smooth scrolling to case studies section on btn click
  document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash === "#case-studies") {
      document.getElementById("case-studies")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
