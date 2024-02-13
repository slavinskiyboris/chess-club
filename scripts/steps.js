// Получаем элементы DOM для карусели
const slides = document.querySelectorAll('.carousel-container__card'); // Обновленный селектор
const prevButton = document.querySelector('.carousel__buttons_prev');
const nextButton = document.querySelector('.carousel__buttons_next');
const indicatorsContainer = document.querySelector('.carousel-container__indicators'); // Убедитесь, что этот селектор соответствует вашей разметке

let currentSlide = 0;
const indicators = [];

// Функция для создания индикаторов
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

// Функция для обновления индикаторов
function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Функция для обновления видимости слайдов и состояния кнопок
function updateCarousel() {
    slides.forEach((slide, index) => {
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

// Функция для добавления обработчиков событий к кнопкам
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

// Инициализация карусели
function initCarousel() {
    createIndicators();
    attachEventListeners();
    updateCarousel(); // Вызывается для установки начального состояния карусели
}

initCarousel();
