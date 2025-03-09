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

let date = new Date();
// document.getElementById('date-and-time').value = date.toDateString();
const dateAndTime = document.getElementById('submit');
dateAndTime.addEventListener('click', () => {
    document.getElementById('date-and-time').value = date.toLocaleString();
})

// FORM Validation
document.querySelector("form").addEventListener("submit", function(event) {
    const phone = document.querySelector('input[name="phone"]');
    const email = document.querySelector('input[name="email"]');
    
    // Validate Phone Number (Basic pattern for US numbers)
    const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    if (!phonePattern.test(phone.value)) {
        alert("Please enter a valid phone number (e.g., 801-555-1234).");
        event.preventDefault(); // Stop form submission
        return;
    }

    // Validate Email Address (Basic pattern)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
        return;
    }
});

// aria live polite  on error messages
function showError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Membership
const tiers = "data/membershipLevels.json";

async function getMembershipTiers() {
    const response = await fetch(tiers);
    const data = await response.json();
    const membershipTiers = data.tiers;

    nonProfit = document.getElementById('non-profit');
    nonProfit.addEventListener('click', () => {
        displayMembershipDetails(membershipTiers[0]);
    });

    bronze = document.getElementById('bronze');
    bronze.addEventListener('click', () => {
        displayMembershipDetails(membershipTiers[1]);
    });

    silver = document.getElementById('silver');
    silver.addEventListener('click', () => {
        displayMembershipDetails(membershipTiers[2]);
    });

    gold = document.getElementById('gold');
    gold.addEventListener('click', () => {
        displayMembershipDetails(membershipTiers[3]);
    });
}

const dialog = document.querySelector('dialog');
let membershipDetails = document.createElement('detail');
dialog.appendChild(membershipDetails);

function displayMembershipDetails(tier) {
    membershipDetails.innerHTML = '';
    membershipDetails.innerHTML = `
    <button id='closeModal'>X</button>
    <h4>${tier.title} Membership</h4>
    <p><strong>Cost:</strong> $${tier.cost} per month
    <p><strong>Benefits:</strong> ${tier.benefits}
    <p><strong>Conditions:</strong> ${tier.conditions}`

    dialog.showModal();

    closeModal.addEventListener('click', () => {
        dialog.close();
    });
}

getMembershipTiers();