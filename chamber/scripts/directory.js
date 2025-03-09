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

// Cards vs Table filter
const cardButton = document.getElementById("cards-filter");
cardButton.addEventListener('click', () => {
    getBusinessData("cards");
})

const tableButton = document.getElementById("list-filter");
tableButton.addEventListener('click', () => {
    getBusinessData("table");
});

// JSON file
const businesses = "data/members.json";

async function getBusinessData(filter){
    document.getElementById("cards").innerHTML = "";
    const response = await fetch(businesses);
    const data = await response.json();
    const businessData = data.businesses;
    // console.log(data);
    if (filter == "cards")
        makeBusinessCards(businessData);
    else if (filter == "table")
        makeBusinessTable(businessData);
}

const makeBusinessCards = (businesses) => {
    businesses.forEach((business) => {
        let card = document.createElement('section');
        let logo = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let link = document.createElement('p');

        let a = document.createElement('a');

        a.setAttribute('href', business.website);
        a.className = "website";

        let aText = document.createTextNode(business.website);
        a.appendChild(aText);

        link.appendChild(a);

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
        card.appendChild(link);
        card.setAttribute('id', 'business-cards');

        document.querySelector("#cards").appendChild(card);
    })
}

const makeBusinessTable = (businesses) => {
    let table = document.createElement('table');

    businesses.forEach((business) => {
        let row = document.createElement('tr');
        let name = document.createElement('td');
        let address = document.createElement('td');
        let phone = document.createElement('td');
        let link = document.createElement('td');
        let a = document.createElement('a');

        a.setAttribute('href', business.website);
        a.className = "website";

        let aText = document.createTextNode("Website");
        a.appendChild(aText);

        link.appendChild(a);

        name.textContent = business.name;
        address.textContent = `${business.address}\n${business.city}`;
        phone.textContent = business.phone;

        row.appendChild(name);
        row.appendChild(address);
        row.appendChild(phone);
        row.appendChild(link);

        table.appendChild(row);
    })
    document.querySelector("#cards").appendChild(table);
}

getBusinessData("cards");
