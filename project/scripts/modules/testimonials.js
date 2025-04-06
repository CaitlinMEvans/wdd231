// Testimonials Module - Handles testimonial carousel functionality

/**
 * Sets up testimonials carousel functionality
 */
export async function setupTestimonials() {
    const testimonialContainer = document.querySelector('.testimonials-carousel');
    if (!testimonialContainer) return;
    
    try {
      // Fetch testimonial data
      const testimonials = await fetchTestimonialData();
      
      // Render testimonials
      renderTestimonials(testimonialContainer, testimonials);
      
      // Setup carousel controls
      setupCarouselControls();
    } catch (error) {
      console.error('Error setting up testimonials:', error);
    }
  }
  
  /**
   * Fetches testimonial data from JSON file
   */
  async function fetchTestimonialData() {
    try {
      const response = await fetch('scripts/data/testimonials.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.testimonials;
    } catch (error) {
      console.error('Error fetching testimonial data:', error);
      throw error;
    }
  }
  
  /**
   * Renders testimonials in the container element
   */
  function renderTestimonials(container, testimonials) {
    // Clear existing content
    container.innerHTML = "";
    
    // Use array methods to transform data into HTML
    const testimonialsHTML = testimonials.map(testimonial => {
      // Create star rating HTML based on the rating
      const ratingStars = Array(5).fill()
        .map((_, index) => {
          const starClass = index < testimonial.rating ? 'star-filled' : 'star-empty';
          return `<span class="star ${starClass}">★</span>`;
        })
        .join('');
      
      // Use template literals for HTML string
      return `
        <div class="testimonial" data-id="${testimonial.id}">
          <div class="testimonial-content">
            <span class="quote-mark">"</span>
            <div class="testimonial-rating">${ratingStars}</div>
            <p class="testimonial-quote">${testimonial.quote}</p>
            <p class="testimonial-text">${testimonial.text}</p>
            <p class="testimonial-author">${testimonial.author}</p>
            <p class="testimonial-service">${testimonial.serviceType}</p>
            <p class="testimonial-date">${testimonial.date}</p>
          </div>
        </div>
      `;
    }).join('');
    
    // Set the HTML content
    container.innerHTML = testimonialsHTML;
  }
  
  /**
   * Sets up carousel navigation controls
   */
  function setupCarouselControls() {
    const carousel = document.querySelector('.testimonials-carousel');
    const prevButton = document.querySelector('.control-button.left');
    const nextButton = document.querySelector('.control-button.right');
    
    if (!carousel || !prevButton || !nextButton) return;
    
    let scrollAmount = 0;
    const testimonialWidth = carousel.querySelector('.testimonial')?.offsetWidth || 300;
    const gap = 16; // Gap between testimonials
    
    // Set up click handlers for navigation buttons
    prevButton.addEventListener('click', () => {
      // Calculate new scroll position
      scrollAmount = Math.max(scrollAmount - (testimonialWidth + gap), 0);
      // Scroll the carousel
      carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    nextButton.addEventListener('click', () => {
      // Calculate new scroll position
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      scrollAmount = Math.min(scrollAmount + (testimonialWidth + gap), maxScroll);
      // Scroll the carousel
      carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Add swipe handling for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50; // Minimum swipe distance
      
      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - show next
        nextButton.click();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - show previous
        prevButton.click();
      }
    }
  }
  
  /**
   * Filters testimonials by service type
   */
  export function filterTestimonialsByService(serviceType) {
    // Get all testimonials
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonials.forEach(testimonial => {
      const service = testimonial.querySelector('.testimonial-service').textContent;
      
      if (serviceType === 'all' || service === serviceType) {
        testimonial.style.display = '';
      } else {
        testimonial.style.display = 'none';
      }
    });
  }