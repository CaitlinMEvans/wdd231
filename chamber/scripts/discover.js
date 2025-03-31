// Year for copyright year
const currentYear = document.getElementById('currentyear');
currentYear.textContent = new Date().getFullYear();

// Date/Time for last modification for website
const lastModified = document.getElementById('lastModified');
lastModified.textContent = (document.lastModified);

// Variables for menu button in mobile view
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('#animateme');

// Event listener for menu button
hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

const visit = document.getElementById('visits');

if (localStorage.getItem('lastVisit') == null) {
    visit.innerHTML = "Welcome! Let us know if you have any questions."
    localStorage.setItem('lastVisit', new Date());
}
else {
    const lastVisit = new Date(localStorage.getItem('lastVisit'));
    let currentVisit = new Date();

    let dayDiff = Math.round((currentVisit.getTime() - lastVisit.getTime()) / (1000 * 3600 * 24));
    // console.log(dayDiff)

    if (dayDiff <= 0) {
        visit.innerHTML = "Back so soon! Awesome!";
    }
    else if (dayDiff == 1) {
        visit.innerHTML = `You last visited ${dayDiff} day ago.`;

    }
    else {
        visit.innerHTML = `You last visited ${dayDiff} days ago.`;
    }
    localStorage.setItem('lastVisit', new Date());
}