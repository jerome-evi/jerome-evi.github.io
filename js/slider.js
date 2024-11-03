document.addEventListener("DOMContentLoaded", function () {
    const sliderContent = document.querySelector('.slider-content');
    const leftArrow = document.querySelector('.slider-arrow.left');
    const rightArrow = document.querySelector('.slider-arrow.right');
    const sliderContainer = document.querySelector('.slider-container');
    const cards = document.querySelectorAll('.slider-content .carte');
    let currentIndex = 0;
    const totalCards = cards.length;
  
    function updateSliderPosition() {
      const cardWidth = document.querySelector('.slider-container').offsetWidth;
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
    }, 2000); // Change chaque 3 secondes
  
    // Gestion de l'arrêt du défilement au survol
    sliderContainer.addEventListener('mouseover', () => {
      clearInterval(autoSlide); // Arrête le défilement
    });
  
    sliderContainer.addEventListener('mouseout', () => {
      autoSlide = setInterval(() => {
        if (currentIndex < totalCards - 1) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateSliderPosition();
      }, 2000); // Redémarre le défilement
    });
  
    // Flèches de navigation
    rightArrow.addEventListener('click', () => {
      if (currentIndex < totalCards - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateSliderPosition();
    });
  
    leftArrow.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = totalCards - 1;
      }
      updateSliderPosition();
    });
  
    // Ajuste la position du slider lors du redimensionnement
    window.addEventListener('resize', updateSliderPosition);
  });
  