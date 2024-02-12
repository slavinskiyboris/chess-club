const buttonDonate = document.querySelector("#button-donate");
const  donateSection = document.querySelector('#donate-section');
const buttonAbout = document.querySelector('#button-about');
const  aboutSection = document.querySelector('#about-section');
const container = document.querySelector('.participants__flex');
const template = document.querySelector('#participants-template').content;

const buttonEarly = document.querySelector('.participants__buttons_early');
const buttonNext = document.querySelector('.participants__buttons_next');


// Индекс текущей отображаемой карточки
let currentIndex = 0;

// Скрытие всех карточек, кроме первой
function hideAllCards() {
    const cards = container.querySelectorAll('.participants__item');
    cards.forEach((card, index) => {
        card.classList.toggle('none', index !== currentIndex);
    });
}

// Обновление счётчика карточек
function updateCounter() {
    const counter = document.querySelector('.participants__counter');
    counter.textContent = `${currentIndex + 1} / ${initialCards.length}`;
}

// Показ следующей карточки
function showNextCard() {
    const cards = container.querySelectorAll('.participants__item');
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        hideAllCards();
        updateCounter();
    }
}

// Показ предыдущей карточки
function showPreviousCard() {
    if (currentIndex > 0) {
        currentIndex--;
        hideAllCards();
        updateCounter();
    }
}

// Начальное состояние карусели
hideAllCards();
updateCounter();

// Добавление обработчиков событий на кнопки
buttonEarly.addEventListener('click', showPreviousCard);
buttonNext.addEventListener('click', showNextCard);

document.addEventListener('click', function(e) {
    // Проверяем, является ли элемент, на который кликнули, кнопкой "назад"
    if (e.target.closest('.participants__buttons_early')) {
        showPreviousCard();
    }
    // Проверяем, является ли элемент, на который кликнули, кнопкой "вперёд"
    if (e.target.closest('.participants__buttons_next')) {
        showNextCard();
    }
});


buttonDonate.addEventListener('click', function () {
    donateSection.scrollIntoView({ behavior: 'smooth' });
})

buttonAbout.addEventListener('click', function () {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
})


function createParticipantCard(participant) {
    const clone = document.importNode(template, true).querySelector('.participants__item');
    const name = clone.querySelector('.participants__name');
    const description = clone.querySelector('.participants__description');

    name.textContent = participant.name;
    description.textContent = participant.description;

    return clone;
}
initialCards.forEach(function (participant) {
    const card = createParticipantCard(participant);
    container.append(card);
});