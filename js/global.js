document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.hero-slide');
    const slides = carousel.querySelectorAll('.slide');
    const indicators = carousel.querySelectorAll('.spanCircle');
    const leftArrow = carousel.querySelector('.arrow.left');
    const rightArrow = carousel.querySelector('.arrow.right');
    
    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[currentSlideIndex].classList.add('active');
        indicators[currentSlideIndex].classList.add('active');
    }

    function moveSlide(direction) {
        currentSlideIndex += direction;
        
        if (currentSlideIndex >= totalSlides) {
            currentSlideIndex = 0;
        } else if (currentSlideIndex < 0) {
            currentSlideIndex = totalSlides - 1;
        }
        
        updateCarousel();
    }

    // Add click event listener to the entire carousel
    carousel.addEventListener('click', (event) => {
        // Get the width of the carousel
        const carouselWidth = carousel.offsetWidth;
        
        // Calculate the click position relative to the carousel
        const clickPosition = event.clientX - carousel.getBoundingClientRect().left;
        
        // If clicked on left half, move left; if on right half, move right
        if (clickPosition < carouselWidth / 2) {
            moveSlide(-1);
        } else {
            moveSlide(1);
        }
    });

    // Keep existing arrow and indicator event listeners
    leftArrow.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent carousel click event
        moveSlide(-1);
    });

    rightArrow.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent carousel click event
        moveSlide(1);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent carousel click event
            currentSlideIndex = index;
            updateCarousel();
        });
    });
});