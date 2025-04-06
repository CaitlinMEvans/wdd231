// Services Module - Manages the services display and interaction
import { openModal } from './modal.js';
import { addToRecentlyViewed } from './storage.js';

let servicesData = [];

/**
 * Initializes the services functionality
 */
export async function setupServices() {
  try {
    // Find services grid on the page
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;
    
    // Fetch services data
    servicesData = await fetchServicesData();
    
    // Render the services
    renderServices(servicesGrid, servicesData);
    
    // Add click listeners to service cards for modal interaction
    setupServiceCardListeners();
    
    // If we're on the services page, set up filtering and additional features
    if (window.location.pathname.includes('services.html')) {
      setupServicesFiltering();
    }
  } catch (error) {
    console.error('Error setting up services:', error);
  }
}

/**
 * Fetches services data from JSON file
 */
async function fetchServicesData() {
  try {
    const response = await fetch('scripts/data/services.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.services;
  } catch (error) {
    console.error('Error fetching services data:', error);
    return [];
  }
}

/**
 * Renders service cards in the specified container
 */
function renderServices(container, services) {
  // Use array map method to create HTML elements from data
  const serviceCardsHTML = services.map(service => {
    // Use template literals to build HTML string
    return `
      <div class="service-card" data-service-id="${service.id}">
        <img src="${service.image}" alt="${service.name}" loading="lazy">
        <h3>${service.name}</h3>
        <p>${service.shortDescription}</p>
        <div class="service-details">
          <span class="service-duration">${service.duration}</span>
          <span class="service-price">${service.price}</span>
        </div>
        <button class="btn btn-secondary view-service">Learn More</button>
      </div>
    `;
  }).join('');
  
  // Set the HTML content of the container
  container.innerHTML = serviceCardsHTML;
}

/**
 * Adds click event listeners to service cards
 */
function setupServiceCardListeners() {
  // Select all service cards and add click listeners
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    const serviceId = parseInt(card.dataset.serviceId);
    
    // Add click event to the Learn More button
    const viewButton = card.querySelector('.view-service');
    if (viewButton) {
      viewButton.addEventListener('click', (event) => {
        event.preventDefault();
        showServiceDetails(serviceId);
      });
    }
    
    // Add click event to the entire card
    card.addEventListener('click', (event) => {
      // Only trigger if the click wasn't on the button (handled above)
      if (!event.target.closest('.view-service')) {
        showServiceDetails(serviceId);
      }
    });
  });
}

/**
 * Shows detailed information about a service in a modal
 */
function showServiceDetails(serviceId) {
  // Find the service by ID
  const service = servicesData.find(service => service.id === serviceId);
  
  if (!service) return;
  
  // Add to recently viewed in localStorage
  addToRecentlyViewed('service', serviceId);
  
  // Create the modal content using template literals
  const modalContent = `
    <div class="service-modal-content">
      <img src="${service.image}" alt="${service.name}" class="service-modal-image">
      <div class="service-modal-details">
        <h2>${service.name}</h2>
        <p>${service.fullDescription}</p>
        
        <div class="service-info-grid">
          <div class="service-info-item">
            <span class="service-info-label">Duration:</span>
            <span class="service-info-value">${service.duration}</span>
          </div>
          <div class="service-info-item">
            <span class="service-info-label">Price:</span>
            <span class="service-info-value">${service.price}</span>
          </div>
          <div class="service-info-item">
            <span class="service-info-label">Availability:</span>
            <span class="service-info-value">${service.availability.join(', ')}</span>
          </div>
        </div>
        
        <h3>Benefits</h3>
        <ul class="service-benefits">
          ${service.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
        
        <div class="service-modal-actions">
          <a href="book.html?service=${serviceId}" class="btn btn-primary bg-green">Book Now</a>
          <button class="btn btn-secondary close-modal">Close</button>
        </div>
      </div>
    </div>
  `;
  
  // Open the modal with the content
  openModal(modalContent, 'service-details-modal');
}

/**
 * Sets up service filtering functionality (for services page)
 */
function setupServicesFiltering() {
  // Get filter buttons if they exist
  const filterButtons = document.querySelectorAll('.service-filter-button');
  if (!filterButtons.length) return;
  
  // Add click listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Get filter value from the button's data attribute
      const filterValue = button.dataset.filter;
      
      // Remove active class from all buttons and add to clicked button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter services based on the selected filter
      const filteredServices = filterValue === 'all' 
        ? servicesData 
        : servicesData.filter(service => service.availability.includes(filterValue));
      
      // Re-render the filtered services
      const servicesGrid = document.querySelector('.services-grid');
      renderServices(servicesGrid, filteredServices);
      
      // Re-add event listeners to the new service cards
      setupServiceCardListeners();
    });
  });
}