// Scroll To Top Module - Handles scroll to top button functionality

/**
 * Sets up scroll to top button functionality
 */
export function setupScrollToTop() {
    // Create scroll to top button if it doesn't exist
    createScrollToTopButton();
    
    // Add scroll event listener to show/hide button
    window.addEventListener('scroll', toggleScrollToTopButton);
    
    // Initial check to set button visibility
    toggleScrollToTopButton();
  }
  
  /**
   * Creates the scroll to top button
   */
  function createScrollToTopButton() {
    // Check if button already exists
    if (document.querySelector('.scroll-to-top')) return;
    
    // Create button element
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.classList.add('scroll-to-top');
    scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
    scrollToTopButton.innerHTML = '↑';
    
    // Add click event listener
    scrollToTopButton.addEventListener('click', scrollToTop);
    
    // Add to document body
    document.body.appendChild(scrollToTopButton);
  }
  
  /**
   * Toggles the visibility of the scroll to top button
   */
  function toggleScrollToTopButton() {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    if (!scrollToTopButton) return;
    
    // Show button if scrolled down more than 300px
    if (window.scrollY > 300) {
      scrollToTopButton.classList.add('visible');
    } else {
      scrollToTopButton.classList.remove('visible');
    }
  }
  
  /**
   * Scrolls the page to the top
   */
  function scrollToTop() {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // After scrolling, focus on the first focusable element
    setTimeout(() => {
      const firstFocusable = document.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, 500);
  }