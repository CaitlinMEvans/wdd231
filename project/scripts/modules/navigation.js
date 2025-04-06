// Navigation Module - Handles navigation and hamburger menu functionality

/**
 * Sets up navigation functionality
 */
export function setupNavigation() {
    // Setup hamburger menu for mobile
    setupHamburgerMenu();
    
    // Setup smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Setup active link highlighting
    highlightActiveLink();
    
    // Setup submenu toggles if they exist
    setupSubmenuToggles();
  }
  
  /**
   * Sets up hamburger menu for mobile navigation
   */
  function setupHamburgerMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinksMobile = document.querySelector('.nav-links-mobile');
    
    if (!hamburgerMenu || !navLinksMobile) return;
    
    // Add click event to hamburger icon
    hamburgerMenu.addEventListener('click', () => {
      // Toggle active class on mobile nav
      navLinksMobile.classList.toggle('active');
      
      // Toggle aria-expanded for accessibility
      const isExpanded = navLinksMobile.classList.contains('active');
      hamburgerMenu.setAttribute('aria-expanded', isExpanded);
      
      // Toggle hamburger animation class if needed
      hamburgerMenu.classList.toggle('open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
      const isClickInside = hamburgerMenu.contains(event.target) || 
                             navLinksMobile.contains(event.target);
      
      if (!isClickInside && navLinksMobile.classList.contains('active')) {
        navLinksMobile.classList.remove('active');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        hamburgerMenu.classList.remove('open');
      }
    });
    
    // Close mobile menu when pressing Escape
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinksMobile.classList.contains('active')) {
        navLinksMobile.classList.remove('active');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        hamburgerMenu.classList.remove('open');
      }
    });
    
    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navLinksMobile.classList.contains('active')) {
        navLinksMobile.classList.remove('active');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        hamburgerMenu.classList.remove('open');
      }
    });
  }
  
  /**
   * Sets up smooth scrolling for anchor links
   */
  function setupSmoothScrolling() {
    // Select all links that point to anchors on the same page
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        // Get the target element
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // If target exists, scroll to it smoothly
        if (targetElement) {
          event.preventDefault();
          
          // Calculate position to scroll to (with offset for fixed header if needed)
          const headerOffset = 80; // Adjust based on your header height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          // Scroll smoothly
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update URL hash without scrolling
          history.pushState(null, null, targetId);
          
          // Close mobile menu if open
          const navLinksMobile = document.querySelector('.nav-links-mobile');
          const hamburgerMenu = document.querySelector('.hamburger-menu');
          
          if (navLinksMobile && navLinksMobile.classList.contains('active')) {
            navLinksMobile.classList.remove('active');
            hamburgerMenu.setAttribute('aria-expanded', 'false');
            hamburgerMenu.classList.remove('open');
          }
        }
      });
    });
  }
  
  /**
   * Highlights active link in navigation
   */
  function highlightActiveLink() {
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Select all navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .nav-links-mobile a');
    
    navLinks.forEach(link => {
      // Remove active class from all links
      link.classList.remove('active');
      
      // Get link href
      const linkPath = link.getAttribute('href');
      
      // Check if link matches current page
      if (linkPath === currentPath || 
          (currentPath.endsWith('/') && linkPath === 'index.html') ||
          (linkPath === 'index.html' && currentPath.endsWith('/'))) {
        link.classList.add('active');
      }
    });
  }
  
  /**
   * Sets up submenu toggles for dropdown menus
   */
  function setupSubmenuToggles() {
    // Select all elements with submenus
    const hasSubmenu = document.querySelectorAll('.has-submenu');
    
    hasSubmenu.forEach(item => {
      const submenuToggle = item.querySelector('.submenu-toggle');
      const submenu = item.querySelector('.submenu');
      
      if (!submenuToggle || !submenu) return;
      
      // Add click event to toggle
      submenuToggle.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Toggle expanded state
        const isExpanded = submenuToggle.getAttribute('aria-expanded') === 'true';
        submenuToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle submenu visibility
        submenu.classList.toggle('active');
      });
      
      // Close submenu when clicking outside
      document.addEventListener('click', (event) => {
        const isClickInside = item.contains(event.target);
        
        if (!isClickInside && submenu.classList.contains('active')) {
          submenu.classList.remove('active');
          submenuToggle.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Close submenu when pressing Escape
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && submenu.classList.contains('active')) {
          submenu.classList.remove('active');
          submenuToggle.setAttribute('aria-expanded', 'false');
          submenuToggle.focus();
        }
      });
    });
  }