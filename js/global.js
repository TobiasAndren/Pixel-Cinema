/*----- Hero slider -----*/
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.hero-slide');
    const slides = carousel.querySelectorAll('.slide');
    const indicators = carousel.querySelectorAll('.spanCircle');
    const leftArrow = carousel.querySelector('.arrow.left');
    const rightArrow = carousel.querySelector('.arrow.right');
    
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let isHovering = false;

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

    function startAutoSlide() {
    
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    
        autoSlideInterval = setInterval(() => {
            
            /*----- Do not automatically change slide when hovering -----*/
            if (!isHovering) {
                moveSlide(1);
            }
        /*----- Millisecond interval -----*/
        }, 5000); 
    }

    /*----- Click event listener for carousel -----*/
    carousel.addEventListener('click', (event) => {
        /*----- Carousel width -----*/
        const carouselWidth = carousel.offsetWidth;
        
        /*----- Calculate the click position relative to the carousel -----*/
        const clickPosition = event.clientX - carousel.getBoundingClientRect().left;
        
        /*----- 50% of image react to click -----*/
        if (clickPosition < carouselWidth / 2) {
            moveSlide(-1);
        } else {
            moveSlide(1);
        }
        
        // Reset auto-slide timer when manually clicking
        startAutoSlide();
    });

    // Pause auto-sliding when hovering
    carousel.addEventListener('mouseenter', () => {
        isHovering = true;
    });

    // Resume auto-sliding when not hovering
    carousel.addEventListener('mouseleave', () => {
        isHovering = false;
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlideIndex = index;
            updateCarousel();
            
            // Reset auto-slide timer when clicking indicator
            startAutoSlide();
        });
    });

    // Start auto-sliding when the page loads
    startAutoSlide();
});