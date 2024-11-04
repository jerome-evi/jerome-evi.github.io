document.addEventListener("DOMContentLoaded", function () {
  const sliderContent = document.querySelector('.slider-content');
  const leftArrow = document.querySelector('.slider-arrow.left');
  const rightArrow = document.querySelector('.slider-arrow.right');
  const sliderContainer = document.querySelector('.slider-container');
  const cards = document.querySelectorAll('.slider-content .carte');
  let currentIndex = 0;
  const totalCards = cards.length;

  function updateSliderPosition() {
      const cardWidth = sliderContainer.offsetWidth;
      sliderContent.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  // Défilement automatique
  let autoSlide = setInterval(() => {
      if (currentIndex < totalCards - 1) {
          currentIndex++;
      } else {
          currentIndex = 0;
      }
      updateSliderPosition();
  }, 3000); // Change toutes les 3 secondes

  sliderContainer.addEventListener('mouseover', () => clearInterval(autoSlide));
  sliderContainer.addEventListener('mouseout', () => {
      autoSlide = setInterval(() => {
          if (currentIndex < totalCards - 1) {
              currentIndex++;
          } else {
              currentIndex = 0;
          }
          updateSliderPosition();
      }, 3000);
  });

  rightArrow.addEventListener('click', () => {
      if (currentIndex < totalCards - 1) currentIndex++;
      else currentIndex = 0;
      updateSliderPosition();
  });

  leftArrow.addEventListener('click', () => {
      if (currentIndex > 0) currentIndex--;
      else currentIndex = totalCards - 1;
      updateSliderPosition();
  });

  // Variables pour le geste de glissement
  let startX = 0;
  let endX = 0;

  // Détection du début du toucher
  sliderContainer.addEventListener('touchstart', (event) => {
      startX = event.touches[0].clientX;
  });

  // Détection de la fin du toucher
  sliderContainer.addEventListener('touchend', (event) => {
      endX = event.changedTouches[0].clientX;
      handleSwipe();
  });

  function handleSwipe() {
      const swipeDistance = endX - startX;
      const threshold = 50; // Seuil de pixels pour valider un swipe

      if (swipeDistance > threshold) {
          // Glissement vers la droite
          if (currentIndex > 0) currentIndex--;
          else currentIndex = totalCards - 1;
      } else if (swipeDistance < -threshold) {
          // Glissement vers la gauche
          if (currentIndex < totalCards - 1) currentIndex++;
          else currentIndex = 0;
      }
      updateSliderPosition();
  }

  window.addEventListener('resize', updateSliderPosition);
});
