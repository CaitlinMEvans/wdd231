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

const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    visit.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysPassed = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysPassed < 1) {
        visit.textContent = "Back so soon! Awesome!";
    } else if (daysPassed === 1) {
        visit.textContent = `You last visited ${daysPassed} day ago.`;
    } else {
        visit.textContent = `You last visited ${daysPassed} days ago.`;
    }
}

localStorage.setItem('lastVisit', now);

fetch('data/discover.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('discover-cards');
    data.forEach(place => {
      const figure = document.createElement('figure');
      figure.innerHTML = `
        <img src="${place.image}" alt="${place.alt}" width="200" height="200" loading="lazy">
        <figcaption>
          <h4>${place.title}</h4>
          <p><strong>Address:</strong> ${place.address}</p>
          <p>${place.description}</p>
          <button class="learn-more-btn">Learn More</button>
        </figcaption>
      `;
      container.appendChild(figure);
    });
  })
  .catch(err => console.error('Error loading discovery data:', err));
