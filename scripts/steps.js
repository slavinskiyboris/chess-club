const slides = document.querySelectorAll('.carousel-card');
const prevButton = document.querySelector('.carousel__buttons_prev');
const nextButton = document.querySelector('.carousel__buttons_next');
let currentSlide = 0;

const indicatorsContainer = document.querySelector('.carousel-indicators');
const indicators = [];

// Создание индикаторов
for (let i = 0; i < slides.length; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('carousel-indicator');
    if (i === 0) {
        indicator.classList.add('active');
    }
    indicatorsContainer.appendChild(indicator);
    indicators.push(indicator);
}

function updateIndicators(currentSlide) {
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

const updateCarousel = () => {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
    });

    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === slides.length - 1;

    // Обновляем классы для кнопок, чтобы отображать их как прозрачные, когда они неактивны
    if (currentSlide === 0) {
        prevButton.classList.add('carousel__buttons_disabled');
    } else {
        prevButton.classList.remove('carousel__buttons_disabled');
    }

    if (currentSlide === slides.length - 1) {
        nextButton.classList.add('carousel__buttons_disabled');
    } else {
        nextButton.classList.remove('carousel__buttons_disabled');
    }
};

prevButton.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
    updateIndicators(currentSlide);
});

nextButton.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateCarousel();
    }
    updateIndicators(currentSlide);
});

// Инициализация карусели
updateCarousel();
updateIndicators(currentSlide);