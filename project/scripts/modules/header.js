// Header Module - Responsible for inserting and managing the site header

/**
 * Inserts the header dynamically into the page
 */
export async function setupHeader() {
    try {
      const headerElement = document.getElementById("header");
      if (!headerElement) return;
  
      // Use template literals for HTML string
      const headerHTML = `
        <header>
          <div class="logo">
            <a href="index.html">
              <img src="images/logo_primary_optimized.svg" alt="New Venture Therapy Logo" id="header-logo"/>
            </a>
          </div>
          <nav class="nav-wrapper">
            <ul class="nav-links">
              <li><a href="index.html" class="nav-link" data-page="home">Home</a></li>
              <li><a href="about.html" class="nav-link" data-page="about">About</a></li>
              <li><a href="services.html" class="nav-link" data-page="services">Services</a></li>
              <li><a href="#" class="nav-link" data-page="faqs">FAQs</a></li>
            </ul>
          </nav>
          <div class="book-now-desktop">
            <a href="book.html" class="btn-book-now">Book Now</a>
          </div>
          <div class="hamburger-menu" aria-label="Menu" role="button" tabindex="0">
            <span></span><span></span><span></span>
          </div>
          <div class="nav-links-mobile">
            <ul>
              <li><a href="index.html" class="nav-link" data-page="home">Home</a></li>
              <li><a href="about.html" class="nav-link" data-page="about">About</a></li>
              <li><a href="services.html" class="nav-link" data-page="services">Services</a></li>
              <li><a href="#" class="nav-link" data-page="faqs">FAQs</a></li>
              <li class="book-now-mobile">
                <a href="book.html" class="btn-book-now">Book Now</a>
              </li>
            </ul>
          </div>
        </header>
      `;
      
      // Insert the header HTML
      headerElement.innerHTML = headerHTML;
      
      // Mark the current page in the navigation
      highlightCurrentPage();
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error setting up header:', error);
      return Promise.reject(error);
    }
  }
  
  /**
   * Highlights the current page in the navigation
   */
  function highlightCurrentPage() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      // Remove active class from all links
      link.classList.remove('active');
      
      // Get the page identifier from the data attribute
      const page = link.getAttribute('data-page');
      
      // Check if the current URL contains the page name
      if (currentPage.includes(page) || 
          (page === 'home' && (currentPage.endsWith('/') || currentPage.endsWith('index.html')))) {
        link.classList.add('active');
      }
    });
  }