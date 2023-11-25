document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".section__six-slider");
  const slides = slider.querySelectorAll(".slider");
  const totalSlides = slides.length;
  let currentSlide = 0;

  const showSlides = () => {
    slides.forEach((slide, index) => {
      slide.style.display = "none";
      if (index >= currentSlide && index < currentSlide + 3) {
        slide.style.display = "block";
      }
    });

    // Проверка на начало и конец слайдера для установки соответствующей прозрачности и курсора кнопок
    const leftButton = document.querySelector(".slider__btn--left");
    const rightButton = document.querySelector(".slider__btn--right");

    leftButton.style.opacity = currentSlide === 0 ? 0 : 1;
    rightButton.style.opacity = currentSlide >= totalSlides - 3 ? 0 : 1;

    leftButton.style.cursor = currentSlide === 0 ? "default" : "pointer";
    rightButton.style.cursor = currentSlide >= totalSlides - 3 ? "default" : "pointer";
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides - 3) {
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

  document.querySelector(".slider__btn--left").addEventListener("click", prevSlide);
  document.querySelector(".slider__btn--right").addEventListener("click", nextSlide);

  // Initial display
  showSlides();
});
