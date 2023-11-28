document.addEventListener("DOMContentLoaded", function () {
  const SLIDES_TO_SHOW_DEFAULT = 3;
  const SLIDES_TO_SHOW_MOBILE = 2; // Количество слайдов для мобильных устройств
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
    // Проверка ширины экрана для решения, сколько слайдов отображать
    return window.innerWidth < 1000 ? SLIDES_TO_SHOW_MOBILE : SLIDES_TO_SHOW_DEFAULT;
  };

  leftButton.addEventListener("click", prevSlide);
  rightButton.addEventListener("click", nextSlide);

  showSlides();

  // Пересчитывать слайды при изменении размера окна
  window.addEventListener("resize", showSlides);
});
