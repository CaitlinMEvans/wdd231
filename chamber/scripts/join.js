// // Year for copyright year
// const currentYear = document.getElementById('currentyear');
// currentYear.textContent = new Date().getFullYear();

// // Date/Time for last modification for website
// const lastModified = document.getElementById('lastModified');
// lastModified.textContent = (document.lastModified);

// // Variables for menu button in mobile view
// const hamButton = document.querySelector('#menu');
// const navigation = document.querySelector('#animateme');

// // Event listener for menu button
// hamButton.addEventListener('click', () => {
//     navigation.classList.toggle('open');
//     hamButton.classList.toggle('open');
// });

// let date = new Date();
// // document.getElementById('date-and-time').value = date.toDateString();
// const dateAndTime = document.getElementById('submit');
// dateAndTime.addEventListener('click', () => {
//     document.getElementById('date-and-time').value = date.toLocaleString();
// })

// // FORM Validation
// document.querySelector("form").addEventListener("submit", function(event) {
//     const phone = document.querySelector('input[name="phone"]');
//     const email = document.querySelector('input[name="email"]');
    
//     // Validate Phone Number (Basic pattern for US numbers)
//     const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
//     if (!phonePattern.test(phone.value)) {
//         alert("Please enter a valid phone number (e.g., 801-555-1234).");
//         event.preventDefault(); // Stop form submission
//         return;
//     }

//     // Validate Email Address (Basic pattern)
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailPattern.test(email.value)) {
//         alert("Please enter a valid email address.");
//         event.preventDefault();
//         return;
//     }
// });

// // aria live polite  on error messages
// function showError(message) {
//     const errorDiv = document.getElementById("error-message");
//     errorDiv.innerHTML = `<p style="color: red;">${message}</p>`;
// }

// // Membership
// const tiers = "data/membershipLevels.json";

// async function getMembershipTiers() {
//     const response = await fetch(tiers);
//     const data = await response.json();
//     const membershipTiers = data.tiers;

//     nonProfit = document.getElementById('non-profit');
//     nonProfit.addEventListener('click', () => {
//         displayMembershipDetails(membershipTiers[0]);
//     });

//     bronze = document.getElementById('bronze');
//     bronze.addEventListener('click', () => {
//         displayMembershipDetails(membershipTiers[1]);
//     });

//     silver = document.getElementById('silver');
//     silver.addEventListener('click', () => {
//         displayMembershipDetails(membershipTiers[2]);
//     });

//     gold = document.getElementById('gold');
//     gold.addEventListener('click', () => {
//         displayMembershipDetails(membershipTiers[3]);
//     });
// }

// const dialog = document.querySelector('dialog');
// let membershipDetails = document.createElement('detail');
// dialog.appendChild(membershipDetails);

// function displayMembershipDetails(tier) {
//     membershipDetails.innerHTML = '';
//     membershipDetails.innerHTML = `
//     <button id='closeModal'>X</button>
//     <h4>${tier.title} Membership</h4>
//     <p><strong>Cost:</strong> $${tier.cost} per month
//     <p><strong>Benefits:</strong> ${tier.benefits}
//     <p><strong>Conditions:</strong> ${tier.conditions}`

//     dialog.showModal();

//     closeModal.addEventListener('click', () => {
//         dialog.close();
//     });
// }

// getMembershipTiers();

// Year for copyright year
const currentYear = document.getElementById('currentyear');
currentYear.textContent = new Date().getFullYear();

// Date/Time for last modification for website
const lastModified = document.getElementById('lastModified');
lastModified.textContent = document.lastModified;

// Variables for menu button in mobile view
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('#animateme');

// Event listener for menu button
hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// Auto-fill the timestamp field when the form loads
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('date-and-time').value = new Date().toLocaleString();
});

// FORM VALIDATION
document.querySelector("form").addEventListener("submit", function(event) {
    const phone = document.querySelector('input[name="phone"]');
    const email = document.querySelector('input[name="email"]');
    const orgTitle = document.querySelector('input[name="orgname"]');

    // Phone Number Validation
    const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    if (!phonePattern.test(phone.value)) {
        showError("Please enter a valid phone number (e.g., 801-555-1234).");
        event.preventDefault();
        return;
    }

    // Email Validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) {
        showError("Please enter a valid email address (example@domain.com).");
        event.preventDefault();
        return;
    }

    // Organizational Title Validation (Only letters, spaces, hyphens, min 7 characters)
    const orgTitlePattern = /^[a-zA-Z\s\-]{7,}$/;
    if (!orgTitlePattern.test(orgTitle.value)) {
        showError("Organization title must be at least 7 characters long and contain only letters, spaces, and hyphens.");
        event.preventDefault();
        return;
    }
});

// Function to display error messages
function showError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.innerHTML = `<p style="color: red;">${message}</p>`;
    errorDiv.setAttribute("aria-live", "polite"); // Accessibility improvement
}

// MEMBERSHIP LEVEL CARDS & MODALS
const tiers = "data/membershipLevels.json";

async function getMembershipTiers() {
    const response = await fetch(tiers);
    const data = await response.json();
    const membershipTiers = data.tiers;

    // Attach event listeners to each membership level card
    document.getElementById('non-profit').addEventListener('click', () => displayMembershipDetails(membershipTiers[0]));
    document.getElementById('bronze').addEventListener('click', () => displayMembershipDetails(membershipTiers[1]));
    document.getElementById('silver').addEventListener('click', () => displayMembershipDetails(membershipTiers[2]));
    document.getElementById('gold').addEventListener('click', () => displayMembershipDetails(membershipTiers[3]));
}

// Modal handling
const dialog = document.querySelector('#membership-dialog');
let membershipDetails = document.createElement('div');
membershipDetails.setAttribute("id", "membership-content");
dialog.appendChild(membershipDetails);

function displayMembershipDetails(tier) {
    membershipDetails.innerHTML = `
        <button id="closeModal">X</button>
        <h4>${tier.title} Membership</h4>
        <p><strong>Cost:</strong> $${tier.cost} per month</p>
        <p><strong>Benefits:</strong> ${tier.benefits}</p>
        <p><strong>Conditions:</strong> ${tier.conditions}</p>
    `;

    dialog.showModal();

    // Close modal when clicking the close button
    document.getElementById("closeModal").addEventListener("click", () => {
        dialog.close();
    });
}

// Close modal when clicking outside of it
document.addEventListener("click", function(event) {
    if (event.target === dialog) {
        dialog.close();
    }
});

// Initialize membership tiers and modal events
getMembershipTiers();
