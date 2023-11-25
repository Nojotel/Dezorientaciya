document.addEventListener("DOMContentLoaded", function () {
  const SLIDES_TO_SHOW = 3;
  const slider = document.querySelector(".section__six-slider");
  const slides = Array.from(slider.querySelectorAll(".slider"));
  const totalSlides = slides.length;
  let currentSlide = 0;

  const leftButton = document.querySelector(".slider__btn--left");
  const rightButton = document.querySelector(".slider__btn--right");

  const showSlides = () => {
    slides.forEach((slide, index) => {
      slide.style.display = "none";
      if (index >= currentSlide && index < currentSlide + SLIDES_TO_SHOW) {
        slide.style.display = "block";
      }
    });

    leftButton.style.opacity = currentSlide === 0 ? 0 : 1;
    rightButton.style.opacity = currentSlide >= totalSlides - SLIDES_TO_SHOW ? 0 : 1;

    leftButton.style.cursor = currentSlide === 0 ? "default" : "pointer";
    rightButton.style.cursor = currentSlide >= totalSlides - SLIDES_TO_SHOW ? "default" : "pointer";
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides - SLIDES_TO_SHOW) {
      currentSlide++;
    }
    showSlides();
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      currentSlide--;
    }
    showSlides();
  };

  leftButton.addEventListener("click", prevSlide);
  rightButton.addEventListener("click", nextSlide);

  // Initial display
  showSlides();
});
