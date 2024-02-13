const buttonDonate = document.querySelector("#button-donate");
const  donateSection = document.querySelector('#donate-section');
const buttonAbout = document.querySelector('#button-about');
const  aboutSection = document.querySelector('#about-section');
const container = document.querySelector('.participants__flex');
const template = document.querySelector('#participants-template').content;

let buttonEarly, buttonNext;
let currentSlideIndex = 0;
let cardsToShow = getCardsToShow();
let autoSlideInterval;

function createParticipantCard(participant) {
    const clone = document.importNode(template, true).querySelector('.participants__item');
    const name = clone.querySelector('.participants__name');
    const description = clone.querySelector('.participants__description');

    name.textContent = participant.name;
    description.textContent = participant.description;

    return clone;
}

document.addEventListener('DOMContentLoaded', () => {
    initialCards.forEach(participant => {
        const card = createParticipantCard(participant);
        container.append(card);
    });

    updateActiveButtons();
    updateInterface();
    startAutoSlide();
});

function updateCounter() {
    const totalParticipants = document.querySelectorAll('.participants__item').length;
    const shownCardsCount = Math.min(currentSlideIndex + cardsToShow, totalParticipants);
    document.querySelectorAll('.participants__counter').forEach(counterElement => {
        counterElement.textContent = `${shownCardsCount} / ${totalParticipants}`;
    });
}

function updateInterface() {
    cardsToShow = getCardsToShow();
    updateVisibleCards();
    updateButtonsState();
    updateCounter();
}

function getCardsToShow() {
    const width = window.innerWidth;
    if (width < 1024) return 1;
    if (width >= 1024 && width < 1366) return 2;
    return 3;
}

function updateVisibleCards() {
    const participants = document.querySelectorAll('.participants__item');
    participants.forEach((card, index) => {
        card.style.display = index >= currentSlideIndex && index < currentSlideIndex + cardsToShow ? 'block' : 'none';
    });
}

function updateButtonsState() {
    const totalParticipants = document.querySelectorAll('.participants__item').length;
    buttonEarly.disabled = currentSlideIndex === 0;
    buttonNext.disabled = currentSlideIndex >= totalParticipants - cardsToShow;
}

function shiftSlide(direction) {
    const totalParticipants = document.querySelectorAll('.participants__item').length;

    if (direction === 'next') {
        if (currentSlideIndex + cardsToShow >= totalParticipants) {
            currentSlideIndex = 0;
        } else {
            currentSlideIndex += cardsToShow;
        }
    } else if (direction === 'early') {
        if (currentSlideIndex === 0) {
            currentSlideIndex = totalParticipants - (totalParticipants % cardsToShow || cardsToShow);
            if (currentSlideIndex === totalParticipants) {
                currentSlideIndex -= cardsToShow;
            }
        } else {
            currentSlideIndex -= cardsToShow;
        }
    }

    // Убедимся, что индекс не выходит за пределы
    currentSlideIndex = Math.max(0, Math.min(currentSlideIndex, totalParticipants - cardsToShow));
    updateInterface();
}

function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        shiftSlide('next');
    }, 4000);
}

function updateActiveButtons() {
    if (window.innerWidth < 550) {
        buttonEarly = document.querySelector('.participants__buttons-mobile_early');
        buttonNext = document.querySelector('.participants__buttons-mobile_next');
    } else {
        buttonEarly = document.querySelector('.participants__buttons_early');
        buttonNext = document.querySelector('.participants__buttons_next');
    }
    attachEventListeners();
}

function attachEventListeners() {
    buttonEarly?.removeEventListener('click', shiftSlideEarly);
    buttonNext?.removeEventListener('click', shiftSlideNext);

    buttonEarly.addEventListener('click', shiftSlideEarly);
    buttonNext.addEventListener('click', shiftSlideNext);
}

function shiftSlideEarly() {
    clearInterval(autoSlideInterval);
    shiftSlide('early');
    startAutoSlide();
}

function shiftSlideNext() {
    clearInterval(autoSlideInterval);
    shiftSlide('next');
    startAutoSlide();
}

window.addEventListener('resize', () => {
    updateActiveButtons();
    updateInterface();
    clearInterval(autoSlideInterval);
    startAutoSlide();
});

buttonDonate.addEventListener('click', function () {
    donateSection.scrollIntoView({ behavior: 'smooth' });
})

buttonAbout.addEventListener('click', function () {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
})