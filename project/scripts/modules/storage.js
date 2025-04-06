// Storage Module - Handles localStorage interactions// Storage Module - Handles localStorage interactions

/**
 * Stores a value in localStorage with appropriate error handling
 */
export function setStorageItem(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`Error storing ${key} in localStorage:`, error);
      return false;
    }
  }
  
  /**
   * Retrieves a value from localStorage with appropriate error handling
   */
  export function getStorageItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return defaultValue;
    }
  }
  
  /**
   * Removes an item from localStorage
   */
  export function removeStorageItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  }
  
  /**
   * Clears all localStorage items for this site
   */
  export function clearStorage() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
  
  /**
   * Adds an item to the recently viewed list
\   */
  export function addToRecentlyViewed(type, id) {
    // Get current recently viewed items
    const recentlyViewed = getStorageItem('recentlyViewed', []);
    
    // Create the new item object
    const newItem = {
      type,
      id,
      timestamp: Date.now()
    };
    
    // Check if item already exists
    const existingIndex = recentlyViewed.findIndex(
      item => item.type === type && item.id === id
    );
    
    // If it exists, remove it (we'll add it to the front)
    if (existingIndex !== -1) {
      recentlyViewed.splice(existingIndex, 1);
    }
    
    // Add the new item at the beginning
    recentlyViewed.unshift(newItem);
    
    // Keep only the most recent 10 items
    const trimmedList = recentlyViewed.slice(0, 10);
    
    // Save to localStorage
    setStorageItem('recentlyViewed', trimmedList);
  }
  
  /**
   * Gets the list of recently viewed items
   */
  export function getRecentlyViewed(type = null, limit = 10) {
    const recentlyViewed = getStorageItem('recentlyViewed', []);
    
    // Apply type filter if provided
    const filtered = type 
      ? recentlyViewed.filter(item => item.type === type)
      : recentlyViewed;
    
    // Apply limit
    return filtered.slice(0, limit);
  }
  
  /**
   * Saves form progress to localStorage
   */
  export function saveFormProgress(formId, formData) {
    setStorageItem(`formProgress_${formId}`, {
      data: formData,
      timestamp: Date.now()
    });
  }
  
  /**
   * Retrieves saved form progress
\   */
  export function getFormProgress(formId) {
    return getStorageItem(`formProgress_${formId}`, null);
  }
  
  /**
   * Clears saved form progress
   */
  export function clearFormProgress(formId) {
    removeStorageItem(`formProgress_${formId}`);
  }
  
  /**
   * Initializes and displays the recently viewed section on applicable pages
   */
  export function trackRecentlyViewed() {
    // Add event listeners to elements that should be tracked
    const trackableElements = document.querySelectorAll('[data-track-view]');
    
    trackableElements.forEach(element => {
      element.addEventListener('click', () => {
        const type = element.dataset.trackType;
        const id = parseInt(element.dataset.trackId);
        
        if (type && id) {
          addToRecentlyViewed(type, id);
        }
      });
    });
    
    // If there's a container for recently viewed items, populate it
    const recentContainer = document.querySelector('.recently-viewed-container');
    if (recentContainer) {
      displayRecentlyViewed(recentContainer);
    }
  }
  
  /**
   * Displays recently viewed items in the specified container
\   */
  async function displayRecentlyViewed(container, limit = 4) {
    // Get recently viewed items
    const recentItems = getRecentlyViewed(null, limit);
    
    if (!recentItems.length) {
      container.style.display = 'none';
      return;
    }
    
    // Fetch services and specialties data to display details
    let servicesData = [];
    let specialtiesData = [];
    
    try {
      const servicesResponse = await fetch('scripts/data/services.json');
      if (servicesResponse.ok) {
        const data = await servicesResponse.json();
        servicesData = data.services;
      }
      
      const specialtiesResponse = await fetch('scripts/data/specialties.json');
      if (specialtiesResponse.ok) {
        const data = await specialtiesResponse.json();
        specialtiesData = data.specialties;
      }
    } catch (error) {
      console.error('Error fetching data for recently viewed items:', error);
    }
    
    // Build HTML for each recently viewed item
    const itemsHTML = recentItems.map(item => {
      let itemData;
      let url;
      
      if (item.type === 'service') {
        itemData = servicesData.find(service => service.id === item.id);
        url = `services.html?id=${item.id}`;
      } else if (item.type === 'specialty') {
        itemData = specialtiesData.find(specialty => specialty.id === item.id);
        url = `specialties.html?id=${item.id}`;
      }
      
      if (!itemData) return ''; // Skip if data not found
      
      return `
        <div class="recently-viewed-item">
          <a href="${url}">
            <img src="${itemData.image}" alt="${itemData.name}" loading="lazy">
            <div class="recently-viewed-info">
              <h4>${itemData.name}</h4>
              <p>${itemData.shortDescription || ''}</p>
            </div>
          </a>
        </div>
      `;
    }).join('');
    
    // Update the container with the generated HTML
    container.innerHTML = `
      <h3>Recently Viewed</h3>
      <div class="recently-viewed-grid">
        ${itemsHTML}
      </div>
    `;
    
    // Show the container
    container.style.display = 'block';
  }