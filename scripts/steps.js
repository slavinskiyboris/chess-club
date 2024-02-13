const slides = document.querySelectorAll('.carousel-container__card');
const prevButton = document.querySelector('.carousel__buttons_prev');
const nextButton = document.querySelector('.carousel__buttons_next');
const indicatorsContainer = document.querySelector('.carousel-container__indicators');

let currentSlide = 0;
const indicators = [];

function createIndicators() {
    for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-container__indicators_item');
        if (i === 0) {
            indicator.classList.add('active');
        }
        indicatorsContainer.appendChild(indicator);
        indicators.push(indicator);
    }
}

function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function updateCarousel() {
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
    });

    const isFirstSlide = currentSlide === 0;
    const isLastSlide = currentSlide === slides.length - 1;

    prevButton.disabled = isFirstSlide;
    nextButton.disabled = isLastSlide;

    prevButton.classList.toggle('carousel__buttons_disabled', isFirstSlide);
    nextButton.classList.toggle('carousel__buttons_disabled', isLastSlide);

    updateIndicators();
}

function attachEventListeners() {
    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateCarousel();
        }
    });
}

function initCarousel() {
    createIndicators();
    attachEventListeners();
    updateCarousel();
}

initCarousel();
