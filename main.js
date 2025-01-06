gsap.registerPlugin(ScrollTrigger);

const cards = document.querySelectorAll(".case-study");
const header = document.querySelector(".pinn");
const paginationDots = document.querySelectorAll(".pagination div");
const animation = gsap.timeline();

const caseStudyHeight = cards[0]?.offsetHeight || 0;
cards.forEach((card, index) => {
  if (index > 0) {
    //increment y value of each card by 200px
    // gsap.set(card, {y:index * 800})
    //animate each card back to 0 (for stacking)

    gsap.set(card, { y: index * caseStudyHeight });

    animation.to(card, { y: 0, duration: index * 0.5, ease: "none" }, 0);
    // animation.to(card, {y: 0, duration: index * 0.5, ease: "none" }, 0);
    // animation.to(
    //     card,
    //     { y: 0, duration: 0.5, ease: "power1.inOut" },
    //     index * 0.2 // Stagger the animations
    // );
  }
});

ScrollTrigger.create({
  trigger: ".wrapper",
  start: "top top",
  pin: true,
  //   end:`+=${(cards.length * 200) + header.offsetHeight}`,
  // end: `+=${cards.length * caseStudyHeight + header.offsetHeight}`,
  end: `+=${cards.length * caseStudyHeight}`,
  scrub: true,
  animation: animation,
  markers: false,
  onUpdate: (self) => {
    // Calculate the active index based on the progress
    const activeIndex = Math.floor(self.progress * (cards.length - 1));

    // Update pagination dots
    paginationDots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("bg-yellow"); // Active color
        dot.classList.remove("bg-fadeBlack"); // Remove inactive color
        dot.style.transform = "scale(1.5)"; // Make the active dot bigger
      } else {
        dot.classList.remove("bg-yellow"); // Remove active color
        dot.classList.add("bg-fadeBlack"); // Inactive color
        dot.style.transform = "scale(1)"; // Reset size for inactive dots
      }
    });
  },
});

// ScrollTrigger configuration
// ScrollTrigger.create({
//     trigger: ".wrapper", // Pin the entire section
//     start: "top top", // Start pinning when the section hits the top
//     pin: true, // Pin the section
//     scrub: 0.5, // Smooth scrubbing
//     end: `+=${cards.length * 500 + header.offsetHeight}`, // Dynamic end point
//     animation: animation,
//     markers: false, // Remove debugging markers
// });

// gsap.registerPlugin(ScrollTrigger);

// const cards = document.querySelectorAll(".case-study");
// const header = document.querySelector(".pinn");

// const wrapperHeight = cards.length * 100; // Define a custom height based on the number of cards

// // Pin the wrapper and handle the scrolling animations
// ScrollTrigger.create({
//   trigger: ".wrapper", // Pin the entire wrapper
//   start: "top top", // Start when the wrapper reaches the top of the viewport
//   pin: true, // Pin the wrapper
//   end: `+=${wrapperHeight}vh`, // End after all cards have scrolled
//   scrub: true, // Smooth scroll
//   markers: false, // Disable markers for debugging
// });

// // Animate each card to scroll over the previous one
// cards.forEach((card, index) => {
//   gsap.to(card, {
//     yPercent: -100 * index, // Move each card upward
//     ease: "none",
//     scrollTrigger: {
//       trigger: ".wrapper", // Use the wrapper as the trigger
//       start: `top top+=${index * 100}vh`, // Start animating each card as it enters
//       end: `top top+=${(index + 1) * 100}vh`, // Stop animating when the next card starts
//       scrub: true, // Smooth scrolling
//     },
//   });
// });
