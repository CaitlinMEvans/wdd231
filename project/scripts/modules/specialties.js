// Specialties Module - Handles specialty card functionality
import { openModal } from './modal.js';
import { addToRecentlyViewed } from './storage.js';

let specialtiesData = [];

/**
 * Sets up specialties functionality
 */
export async function setupSpecialties() {
  try {
    const specialtyContainer = document.querySelector('.specialty-container');
    if (!specialtyContainer) return;
    
    // Fetch specialties data
    specialtiesData = await fetchSpecialtiesData();
    
    // Render specialties
    renderSpecialties(specialtyContainer, specialtiesData);
    
    // Add event listeners for specialty cards
    setupSpecialtyCardListeners();
  } catch (error) {
    console.error('Error setting up specialties:', error);
  }
}

/**
 * Fetches specialties data from JSON file
 */
async function fetchSpecialtiesData() {
  try {
    const response = await fetch('scripts/data/specialties.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.specialties;
  } catch (error) {
    console.error('Error fetching specialties data:', error);
    throw error;
  }
}

/**
 * Renders specialty cards in the specified container
 */
function renderSpecialties(container, specialties) {
  // Use array map method to create HTML elements from data
  const specialtiesHTML = specialties.map(specialty => {
    // Use template literals to build HTML string
    return `
      <div class="specialty-card" data-specialty-id="${specialty.id}">
        <img src="${specialty.image}" alt="${specialty.name}" loading="lazy">
        <div class="specialty-label bg-${specialty.color}">${specialty.name}</div>
      </div>
    `;
  }).join('');
  
  // Set the HTML content of the container
  container.innerHTML = specialtiesHTML;
}

/**
 * Adds click event listeners to specialty cards
 */
function setupSpecialtyCardListeners() {
  // Select all specialty cards
  const specialtyCards = document.querySelectorAll('.specialty-card');
  
  specialtyCards.forEach(card => {
    card.addEventListener('click', () => {
      const specialtyId = parseInt(card.dataset.specialtyId);
      showSpecialtyDetails(specialtyId);
    });
  });
}

/**
 * Shows detailed information about a specialty in a modal
 */
function showSpecialtyDetails(specialtyId) {
  // Find the specialty by ID
  const specialty = specialtiesData.find(spec => spec.id === specialtyId);
  
  if (!specialty) return;
  
  // Add to recently viewed in localStorage
  addToRecentlyViewed('specialty', specialtyId);
  
  // Create related services list
  const relatedServicesHTML = specialty.relatedServices.map(service => 
    `<li>${service}</li>`
  ).join('');
  
  // Create techniques list
  const techniquesHTML = specialty.techniques.map(technique => 
    `<li>${technique}</li>`
  ).join('');
  
  // Create the modal content using template literals
  const modalContent = `
    <div class="specialty-modal-content">
      <div class="specialty-modal-header bg-${specialty.color}">
        <h2>${specialty.name}</h2>
      </div>
      
      <div class="specialty-modal-body">
        <div class="specialty-modal-image">
          <img src="${specialty.image}" alt="${specialty.name}">
        </div>
        
        <div class="specialty-modal-details">
          <p class="specialty-description">${specialty.description}</p>
          
          <div class="specialty-info-section">
            <h3>Related Services</h3>
            <ul class="specialty-related-services">
              ${relatedServicesHTML}
            </ul>
          </div>
          
          <div class="specialty-info-section">
            <h3>Techniques Used</h3>
            <ul class="specialty-techniques">
              ${techniquesHTML}
            </ul>
          </div>
        </div>
      </div>
      
      <div class="specialty-modal-actions">
        <a href="book.html?specialty=${specialtyId}" class="btn btn-primary bg-${specialty.color}">Book Appointment</a>
        <button class="btn btn-secondary close-modal">Close</button>
      </div>
    </div>
  `;
  
  // Open the modal with the content
  openModal(modalContent, 'specialty-details-modal');
}

/**
 * Filters specialties by related service
 */
export function filterSpecialtiesByService(service) {
  // First, get updated specialties data if not already loaded
  if (specialtiesData.length === 0) {
    setupSpecialties();
    return;
  }
  
  // Filter specialties by the selected service
  const filteredSpecialties = service === 'all'
    ? specialtiesData
    : specialtiesData.filter(specialty => 
        specialty.relatedServices.includes(service)
      );
  
  // Re-render with filtered data
  const specialtyContainer = document.querySelector('.specialty-container');
  if (specialtyContainer) {
    renderSpecialties(specialtyContainer, filteredSpecialties);
    setupSpecialtyCardListeners();
  }
}