// FAQ Module - Handles FAQ accordion functionality

/**
 * Initializes the FAQ accordion functionality
 */
export async function setupFAQs() {
    // Find FAQ container
    const faqContainer = document.querySelector('.accordion');
    if (!faqContainer) return;
    
    try {
      // Fetch FAQ data
      const faqs = await fetchFAQData();
      
      // Render FAQs
      renderFAQs(faqContainer, faqs);
      
      // Setup accordion interactivity
      setupAccordionBehavior();
    } catch (error) {
      console.error('Error setting up FAQs:', error);
      // Fallback to static FAQs if available
      setupAccordionBehavior();
    }
  }
  
  /**
   * Fetches FAQ data from JSON file
   */
  async function fetchFAQData() {
    try {
      const response = await fetch('scripts/data/faqs.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.faqs;
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
      throw error;
    }
  }
  
  /**
   * Renders FAQs in the container element
   */
  function renderFAQs(container, faqs) {
    // Clear existing content
    container.innerHTML = "";
    
    // Use array methods to transform data into HTML
    const faqsHTML = faqs.map(faq => {
      // Use template literals for HTML string
      return `
        <div class="accordion-item" data-category="${faq.category}" data-date="${faq.dateAdded}">
          <button class="accordion-header" aria-expanded="false" aria-controls="faq-content-${faq.id}">
            ${faq.question}
            <span class="accordion-icon">+</span>
          </button>
          <div id="faq-content-${faq.id}" class="accordion-body">
            <p>${faq.answer}</p>
            <div class="faq-meta">
              <span class="faq-category">${faq.category}</span>
              <span class="faq-date">Updated: ${formatDate(faq.dateAdded)}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
    
    // Set the HTML content
    container.innerHTML = faqsHTML;
  }
  
  /**
   * Sets up click behavior for accordion items
   */
  function setupAccordionBehavior() {
    // Select all accordion headers
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Add click event listeners
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === "true";
        const body = this.nextElementSibling;
        const icon = this.querySelector('.accordion-icon');
        
        // Close all other items first
        accordionHeaders.forEach(otherHeader => {
          if (otherHeader !== this) {
            otherHeader.setAttribute('aria-expanded', 'false');
            otherHeader.nextElementSibling.style.maxHeight = '0';
            
            const otherIcon = otherHeader.querySelector('.accordion-icon');
            if (otherIcon) otherIcon.textContent = '+';
          }
        });
        
        // Toggle current item
        if (isExpanded) {
          this.setAttribute('aria-expanded', 'false');
          body.style.maxHeight = '0';
          if (icon) icon.textContent = '+';
        } else {
          this.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = `${body.scrollHeight}px`;
          if (icon) icon.textContent = '−';
        }
      });
    });
  }
  
  /**
   * Formats a date string from ISO format to readable format
   */
  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (error) {
      return dateString;
    }
  }
  
  /**
   * Filters FAQs by category
   */
  export function filterFAQsByCategory(category) {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  /**
   * Searches FAQs by keyword
   */
  export function searchFAQs(keyword) {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const searchTerm = keyword.toLowerCase().trim();
    
    if (!searchTerm) {
      // If search is empty, show all items
      accordionItems.forEach(item => {
        item.style.display = '';
      });
      return;
    }
    
    accordionItems.forEach(item => {
      const question = item.querySelector('.accordion-header').textContent.toLowerCase();
      const answer = item.querySelector('.accordion-body p').textContent.toLowerCase();
      
      if (question.includes(searchTerm) || answer.includes(searchTerm)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }