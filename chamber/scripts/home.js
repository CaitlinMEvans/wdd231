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

// const weatherIconDiv = document.querySelector("#weather-icon");
// const currentTemp = document.getElementById("current-temp");
// const weatherConditions = document.getElementById("condition");
// const highTemp = document.getElementById("high-temp");
// const lowTemp = document.getElementById("low-temp");
// const humidity = document.getElementById("humidity");
// const sunrise = document.getElementById("sunrise");
// const sunset = document.getElementById("sunset");

// const tomorrowDay = document.getElementById("tomorrow");
// const twoDay = document.getElementById("two-day");

// const todayForecast = document.getElementById("today-forecast");
// const tomorrowForecast = document.getElementById("tomorrow-forecast");
// const twoDayForecast = document.getElementById("two-day-forecast");

// const url = 'https://api.openweathermap.org/data/2.5/weather?lat=38.23&lon=-122.64&appid=499d17cb2fcb9bce311b043aee09342e&units=imperial'
// const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=38.23&lon=-122.64&appid=499d17cb2fcb9bce311b043aee09342e&units=imperial'

// function displayResults(data) {
//     const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
//     let weatherIcon = document.createElement('img');
//     weatherIcon.setAttribute('src', iconsrc);
//     weatherIcon.setAttribute('alt', data.weather[0].description);
//     weatherIcon.setAttribute('loading', 'lazy');
//     weatherIconDiv.appendChild(weatherIcon);

//     let desc = data.weather[0].description;

//     const sunTime = new Date(data.sys.sunrise * 1000);
//     const setTime = new Date(data.sys.sunset * 1000);

//     currentTemp.innerHTML = `${Math.round(data.main.temp)} F`;
//     weatherConditions.innerHTML = `${capitalizeWords(desc)}`;
//     highTemp.innerHTML = `<strong>High:</strong> ${Math.round(data.main.temp_max)} F`;
//     lowTemp.innerHTML = `<strong>Low:</strong> ${Math.round(data.main.temp_min)} F`
//     humidity.innerHTML = `<strong>Humidity:</strong> ${data.main.humidity}%`;
//     sunrise.innerHTML = `<strong>Sunrise:</strong> ${sunTime.toLocaleTimeString('default', {hour: '2-digit', minute:'2-digit'})}`;
//     sunset.innerHTML = `<strong>Sunset:</strong> ${setTime.toLocaleTimeString('default', {hour: '2-digit', minute:'2-digit'})}`;

//     todayForecast.innerHTML = `${Math.round(data.main.temp_max)} F`;
// }

// function displayForecast(data) {
//     const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

//     const date = new Date();
//     const today = date.getDay();

//     let tomorrow = today + 1;
//     if (tomorrow > 6)
//         tomorrow = tomorrow - 7;

//     let tomorrowString = daysOfWeek[tomorrow];

//     tomorrowDay.innerHTML = tomorrowString;
//     tomorrowForecast.innerHTML = `${Math.round(data.list[7].main.temp_max)} F`;

//     let two = today + 2;
//     if (two > 6)
//         two = two - 7;

//     let twoDayString = daysOfWeek[two];

//     twoDay.innerHTML = twoDayString;
//     twoDayForecast.innerHTML = `${Math.round(data.list[15].main.temp_max)} F`;
// }

// function capitalizeWords(str) {
//     const words = str.split(' ');
//     for (let i = 0; i < words.length; i++) {
//         words[i] = words[i][0].toUpperCase() + words[i].substr(1);
//     }

//     return words.join(' ');
// }

// async function apiFetch() {
//     try {
//         const response = await fetch(url);
//         if (response.ok) {
//             const data = await response.json();
//             displayResults(data);
//         } else {
//             throw Error(await response.text());
//         }
//     } catch (error) {
//         console.log(error)
//     }

//     try {
//         const response = await fetch(forecastUrl);
//         if (response.ok) {
//             const data2 = await response.json();
//             // console.log(data2);
//             displayForecast(data2);
//         } else {
//             throw Error(await response.text());
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// apiFetch();

// Weather API (Updated for Provo, Utah)
const API_KEY = '499d17cb2fcb9bce311b043aee09342e'; // Use your API key
const LAT = '40.2338'; 
const LON = '-111.6585'; 

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=imperial`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=imperial`;

const weatherIconDiv = document.querySelector("#weather-icon");
const currentTemp = document.getElementById("current-temp");
const weatherConditions = document.getElementById("condition");
const highTemp = document.getElementById("high-temp");
const lowTemp = document.getElementById("low-temp");
const humidity = document.getElementById("humidity");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const tomorrowDay = document.getElementById("tomorrow");
const twoDay = document.getElementById("two-day");

const todayForecast = document.getElementById("today-forecast");
const tomorrowForecast = document.getElementById("tomorrow-forecast");
const twoDayForecast = document.getElementById("two-day-forecast");

async function fetchWeatherData() {
    try {
        // Fetch Current Weather
        const response = await fetch(weatherURL);
        if (!response.ok) throw new Error("Weather data not available");
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
    }

    try {
        // Fetch Forecast
        const response = await fetch(forecastURL);
        if (!response.ok) throw new Error("Forecast data not available");
        const forecastData = await response.json();
        displayForecast(forecastData);
    } catch (error) {
        console.error("Error fetching forecast:", error);
    }
}

function displayWeather(data) {
    // Clear previous weather icon
    weatherIconDiv.innerHTML = '';

    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    weatherIcon.setAttribute('loading', 'lazy');
    weatherIconDiv.appendChild(weatherIcon);

    let description = capitalizeWords(data.weather[0].description);
    let sunriseTime = new Date(data.sys.sunrise * 1000);
    let sunsetTime = new Date(data.sys.sunset * 1000);

    currentTemp.innerHTML = `${Math.round(data.main.temp)}°F`;
    weatherConditions.innerHTML = `${description}`;
    highTemp.innerHTML = `<strong>High:</strong> ${Math.round(data.main.temp_max)}°F`;
    lowTemp.innerHTML = `<strong>Low:</strong> ${Math.round(data.main.temp_min)}°F`;
    humidity.innerHTML = `<strong>Humidity:</strong> ${data.main.humidity}%`;
    sunrise.innerHTML = `<strong>Sunrise:</strong> ${sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    sunset.innerHTML = `<strong>Sunset:</strong> ${sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    todayForecast.innerHTML = `${Math.round(data.main.temp_max)}°F`;
}

function displayForecast(data) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const today = date.getDay();

    let tomorrow = (today + 1) % 7;
    let twoDaysLater = (today + 2) % 7;

    tomorrowDay.innerHTML = daysOfWeek[tomorrow];
    tomorrowForecast.innerHTML = `${Math.round(data.list[7].main.temp_max)}°F`;

    twoDay.innerHTML = daysOfWeek[twoDaysLater];
    twoDayForecast.innerHTML = `${Math.round(data.list[15].main.temp_max)}°F`;
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

fetchWeatherData();



// JSON file
const businesses = "data/members.json";

async function getBusinessData(){
    document.getElementById("cards").innerHTML = "";
    const response = await fetch(businesses);
    const data = await response.json();
    const businessData = data.businesses;
    // console.log(data);

    let eligibleBusinesses = [];

    let i = 0;
    while (i < 7) {
        if (businessData[i].membership >= 2) {
            eligibleBusinesses.push(businessData[i])
        }
        i++;
    }
    // console.log(eligibleBusinesses);

    let createdBusinesses = []

    let i2 = randomNum(0, eligibleBusinesses.length);
    // console.log(i2);

    i2.forEach((i2) => {
        createdBusinesses.push(eligibleBusinesses[i2])
    })

    // console.log(createdBusinesses)
    makeBusinessCards(createdBusinesses);
}

function randomNum(min, max) {
    let n = [];
    for(let i=0; i<3; i++){
        let number = (Math.floor(Math.random() * max) +min);
        if (n.includes(number) == false) {
            n.push(number);
        }
        else {
            i = i-1;
        }
    }
    return n
}

const makeBusinessCards = (businesses) => {
    businesses.forEach((business) => {
        let card = document.createElement('section');
        let logo = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let membership = document.createElement('p');
        let link = document.createElement('p');

        let a = document.createElement('a');

        a.setAttribute('href', business.website);
        a.className = "website";

        let aText = document.createTextNode(business.website);
        a.appendChild(aText);

        link.appendChild(a);

        if (business.membership == 3) {
            membership.textContent = 'Membership Level: Gold';
        }
        else if (business.membership == 2) {
            membership.textContent = 'Membership Level: Silver';
        }
        else {
            membership.textContent = 'Membership Level: Bronze';
        }

        name.textContent = business.name;
        address.textContent = business.address;
        phone.textContent = business.phone;

        logo.setAttribute('src', business.image);
        logo.setAttribute('alt', `Logo for ${business.name}, Membership - ${business.membership}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', business.width)
        logo.setAttribute('height', business.height);

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(membership);
        card.appendChild(link);
        card.setAttribute('id', 'business-cards');

        document.querySelector("#cards").appendChild(card);
    })
}

getBusinessData();