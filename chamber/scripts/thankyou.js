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

const currentUrl = window.location.href;

const everything = currentUrl.split('?');

let formData = everything[1].split('&');

function show(info) {
    formData.forEach((element) => {
        if (element.startsWith(info)) {
            result = element.split('=')[1].replace("%40", "@").replace("%2B", "+").replaceAll("+", " ").replaceAll("%2F", "/").replace("%2C"," ").replaceAll("%3A",":");
        }
    });
    return result;
};

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
<p><strong>Name:</strong> ${show('fname')} ${show('lname')}
<p><strong>Organization Name:</strong> ${show('orgname')}
<p><strong>Email:</strong> <a href='mailto: ${show('email')}'>${show('email')}</a></p>
<p><strong>Phone:</strong> ${show('phone')}
<p><strong>Business Name:</strong> ${show('business')}
<p><strong>Description:</strong> ${show('description')}
<p><strong>Date Submitted: </strong> ${show('fecha')}`