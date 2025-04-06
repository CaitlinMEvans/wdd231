// Main entry point for New Venture Therapy website

// Import modules
import { setupHeader } from './modules/header.js';
import { setupFooter } from './modules/footer.js';
import { setupDarkMode } from './modules/darkMode.js';
import { setupLazyLoading } from './modules/lazyLoading.js';
import { setupNavigation } from './modules/navigation.js';
import { setupFAQs } from './modules/faq.js';
import { setupTestimonials } from './modules/testimonials.js';
import { setupServices } from './modules/services.js';
import { setupSpecialties } from './modules/specialties.js';
import { setupModal } from './modules/modal.js';
import { setupForm } from './modules/form.js';
import { setupScrollToTop } from './modules/scrollToTop.js';
import { trackRecentlyViewed } from './modules/storage.js';

// Initialize site functionality
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Insert header and footer before anything else
    await setupHeader();
    await setupFooter();
    
    // Setup basic functionality
    setupDarkMode();
    setupLazyLoading();
    setupNavigation();
    setupScrollToTop();
    
    // Setup page-specific functionality based on URL path
    const currentPage = window.location.pathname;
    
    // Features common to multiple pages
    setupFAQs();
    setupModal();
    
    // Home page specific functionality
    if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
      setupTestimonials();
      setupServices();
      trackRecentlyViewed();
    }
    
    // About page specific functionality
    if (currentPage.includes('about.html')) {
      setupSpecialties();
    }
    
    // Booking page specific functionality
    if (currentPage.includes('book.html')) {
      setupForm();
    }
    
    console.log('New Venture Therapy website initialized successfully!');
  } catch (error) {
    console.error('Error initializing website:', error);
  }
});