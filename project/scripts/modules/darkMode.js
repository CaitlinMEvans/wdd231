// Dark Mode Module - Handles dark mode functionality

/**
 * Sets up dark mode functionality
 */
export function setupDarkMode() {
    const headerLogo = document.getElementById("header-logo");
    const footerLogo = document.getElementById("footer-logo");
    const lightModeLogo = "images/logo_primary_optimized.svg";
    const darkModeLogo = "images/darkMode_logo_primary_optimized.svg";
    
    // Get stored preference
    const isDarkModeSaved = localStorage.getItem("darkMode") === "true";
    
    // Initialize dark mode based on saved preference
    if (isDarkModeSaved) {
      document.body.classList.add("dark-mode");
    }
    
    // Update logo based on current mode
    updateLogo(isDarkModeSaved);
    
    // Set up toggle button click handler
    setupToggleButton();
    
    // Add keyboard shortcut (Shift + D)
    setupKeyboardShortcut();
    
    /**
     * Updates logo images based on dark mode state
     */
    function updateLogo(isDarkMode) {
      const newLogo = isDarkMode ? darkModeLogo : lightModeLogo;
      if (headerLogo) headerLogo.src = newLogo;
      if (footerLogo) footerLogo.src = newLogo;
    }
    
    /**
     * Sets up dark mode toggle button
     */
    function setupToggleButton() {
      // Find toggle button in the DOM
      const toggleButton = document.querySelector(".dark-mode-toggle");
      if (!toggleButton) return;
      
      // Add click event listener
      toggleButton.addEventListener("click", () => {
        // Toggle dark mode class on body
        const isDarkMode = document.body.classList.toggle("dark-mode");
        
        // Save preference to localStorage
        localStorage.setItem("darkMode", isDarkMode);
        
        // Update logo
        updateLogo(isDarkMode);
        
        // Announce mode change for accessibility
        announceMode(isDarkMode);
      });
    }
    
    /**
     * Sets up keyboard shortcut for dark mode toggle
     */
    function setupKeyboardShortcut() {
      document.addEventListener("keydown", (e) => {
        // Shift + D to toggle dark mode
        if (e.shiftKey && e.key === "D") {
          // Find and click the toggle button to reuse existing logic
          const toggleButton = document.querySelector(".dark-mode-toggle");
          if (toggleButton) {
            toggleButton.click();
          }
        }
      });
    }
    
    /**
     * A11Y: Announces mode change for screen readers
     */
    function announceMode(isDarkMode) {
      // Create temporary element for screen reader announcement
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("class", "sr-only");
      announcement.textContent = isDarkMode ? "Dark mode enabled" : "Light mode enabled";
      
      // Add to DOM temporarily
      document.body.appendChild(announcement);
      
      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }