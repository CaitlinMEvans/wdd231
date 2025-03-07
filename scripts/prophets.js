const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData(filter){
    document.getElementById("cards").innerHTML = "";
    const response = await fetch(url);
    const data = await response.json();
    const prophets = data.prophets;
    if (filter == "all")
        displayProphets(prophets);
    else if (filter == "utah")
        displayProphets(prophets.filter(prophet => prophet.birthplace == 'Utah'));
    else if (filter == "us")
        displayProphets(prophets.filter(prophet => prophet.birthplace == 'England'));
    else if (filter == "age")
        displayProphets(prophets.filter(prophet => getAge(prophet.birthdate, prophet.death) >= 95));
    else if (filter == "kids")
        displayProphets(prophets.filter(prophet => prophet.numofchildren > 10));
    else if (filter == "served")
        displayProphets(prophets.filter(prophet => prophet.length >= 15));
}


const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let dateOfBirth = document.createElement('p');
        let locationOfBirth = document.createElement('p');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`;
        locationOfBirth.textContent = `Location: ${prophet.birthplace}`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}th Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.append(dateOfBirth);
        card.append(locationOfBirth);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
}

getProphetData("all");

const allButton = document.querySelector('#all');
allButton.addEventListener('click', () => {
    getProphetData("all");
})
const utahButton = document.querySelector('#utah');
utahButton.addEventListener('click', () => {
    getProphetData("utah");
})
const countryButton = document.querySelector('#us');
countryButton.addEventListener('click', () => {
    getProphetData("us");
})
const ageButton = document.querySelector('#age');
ageButton.addEventListener('click', () => {
    getProphetData("age");
})
const childButton = document.querySelector('#kids');
childButton.addEventListener('click', () => {
    getProphetData("kids");
})
const durationButton = document.querySelector('#served');
durationButton.addEventListener('click', () => {
    getProphetData("served");
})

function getAge(birthdate, deathdate){
    let birth = new Date(birthdate);
    let death = new Date(deathdate);
    if (deathdate == null) {
        death = new Date();
    }
    return Math.floor((death - birth) / (365 * 24 * 60 * 60 * 1000));
}

// Year for copyright year
const currentYear = document.getElementById('currentyear');
currentYear.textContent = new Date().getFullYear();

// Date/Time for last modification for website
const lastModified = document.getElementById('lastModified');
lastModified.textContent = (document.lastModified);
