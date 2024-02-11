const buttonDonate = document.querySelector("#button-donate");
const  donateSection = document.querySelector('#donate-section');
const buttonAbout = document.querySelector('#button-about');
const  aboutSection = document.querySelector('#about-section');
const container = document.querySelector('.participants__flex');
const template = document.querySelector('#participants-template').content;

const buttonNext = document.querySelector('.participants__buttons_next');
const buttonEarly = document.querySelector('.participants__buttons_early');

const initialCards = [
    {
        name: "Хозе-Рауль Капабланка",
        description: "Чемпион мира по шахматам",
    },
    {
        name: "Эммануил Ласкер",
        description: "Чемпион мира по шахматам",
    },
    {
        name: "Александр Алехин",
        description: "Чемпион мира по шахматам",
    },
    {
        name: "Арон Нимцович",
        description: "Чемпион мира по шахматам",
    },
    {
        name: "Рихард Рети",
        description: "Чемпион мира по шахматам",
    },
    {
        name: "Остап Бендер",
        description: "Гроссмейстер",
    },
];
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

function hiddenCard() {
    const participantCards = document.querySelectorAll('.participants__item');

    if (participantCards.length >= 6) {
        for (let i = 1; i < 6; i++) {
            participantCards[i].classList.add('none');
        }
    }
}

hiddenCard();