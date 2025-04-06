// Footer Module - Responsible for inserting and managing the site footer

/**
 * Inserts the footer dynamically into the page
 */
export async function setupFooter() {
    try {
      const footerElement = document.getElementById("footer");
      if (!footerElement) return;
  
      // Use template literals for HTML string
      const footerHTML = `
        <footer class="footer">
          <div class="footer-logo">
            <div class="logo">
              <a href="index.html">
                <img src="images/logo_primary_optimized.svg" alt="New Venture Therapy Logo" id="footer-logo" />
              </a>
            </div>
          </div>
          <div class="footer-info-grid">
            <div class="footer-info-item">
              <h3>Location</h3>
              <p>456 Imaginary Road, Suite 4<br />Tooele, Utah #####</p>
            </div>
            <div class="footer-info-item">
              <h3>Schedule</h3>
              <p>Mon-Fri / 8:00 AM - 7:00 PM<br />Sat-Sun / 10:00 AM - 5:00 PM</p>
            </div>
            <div class="footer-info-item">
              <h3>Contact</h3>
              <p>(917) - 707 - 9336<br />emailaddress@email.com</p>
            </div>
          </div>
          <div class="footer-social">
            <button class="dark-mode-toggle" aria-label="Toggle Dark Mode">Toggle Dark Mode</button>
            <a href="#" class="social-icon"><img src="images/icon_facebook.svg" alt="Facebook"></a>
            <a href="#" class="social-icon"><img src="images/icon-x.svg" alt="X"></a>
            <a href="#" class="social-icon"><img src="images/icon_instagram.svg" alt="Instagram"></a>
          </div>
          <div class="footer-copyright">
            <p>&copy; ${new Date().getFullYear()} New Venture Therapy</p>
            <p><a href="attributions.html" class="attributions-link">Attributions</a></p>
          </div>
        </footer>
      `;
      
      // Insert the footer HTML
      footerElement.innerHTML = footerHTML;
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error setting up footer:', error);
      return Promise.reject(error);
    }
  }