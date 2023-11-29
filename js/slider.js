document.addEventListener("DOMContentLoaded", function () {
  const SLIDES_TO_SHOW_DEFAULT = 3;
  const SLIDES_TO_SHOW_MOBILE = 2;
  const slider = document.querySelector(".section__six-slider");
  const slides = Array.from(slider.querySelectorAll(".slider"));
  const totalSlides = slides.length;
  let currentSlide = 0;

  const leftButton = document.querySelector(".slider__btn--left");
  const rightButton = document.querySelector(".slider__btn--right");

  const showSlides = () => {
    slides.forEach((slide, index) => {
      slide.style.display = "none";
      if (index >= currentSlide && index < currentSlide + getSlidesToShow()) {
        slide.style.display = "block";
      }
    });

    leftButton.style.opacity = currentSlide === 0 ? 0 : 1;
    rightButton.style.opacity = currentSlide >= totalSlides - getSlidesToShow() ? 0 : 1;

    leftButton.style.cursor = currentSlide === 0 ? "default" : "pointer";
    rightButton.style.cursor = currentSlide >= totalSlides - getSlidesToShow() ? "default" : "pointer";
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides - getSlidesToShow()) {
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

  const getSlidesToShow = () => {
    if (window.innerWidth < 768) {
      return 1;
    } else if (window.innerWidth < 1000) {
      return SLIDES_TO_SHOW_MOBILE;
    } else {
      return SLIDES_TO_SHOW_DEFAULT;
    }
  };

  leftButton.addEventListener("click", prevSlide);
  rightButton.addEventListener("click", nextSlide);

  showSlides();

  window.addEventListener("resize", showSlides);
});
