// Lazy Loading Module - Handles image lazy loading

/**
 * Sets up lazy loading for images
 */
export function setupLazyLoading() {
    // Select all images on the page
    const images = document.querySelectorAll("img:not(.lazy-exclude)");
    
    // Check if IntersectionObserver is supported
    if ("IntersectionObserver" in window) {
      // Create new observer
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          // If image is in viewport
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // If image has data-src attribute, load the image
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove("lazy");
              img.classList.add("lazy-loaded");
            }
            
            // If image has data-srcset attribute, set the srcset
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
            
            // Stop observing image
            observer.unobserve(img);
          }
        });
      }, {
        // Root margin to load images slightly before they come into view
        rootMargin: "50px 0px",
        threshold: 0.01
      });
      
      // Mark images for lazy loading, but only if they're below the fold
      images.forEach(img => {
        // Check if image is below the fold
        if (img.getBoundingClientRect().top > window.innerHeight) {
          // Save original src to data-src
          img.dataset.src = img.src;
          
          // If image has srcset, save to data-srcset
          if (img.srcset) {
            img.dataset.srcset = img.srcset;
            img.srcset = "";
          }
          
          // Set placeholder src (optional)
          img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";
          
          // Add lazy class for CSS transitions
          img.classList.add("lazy");
          
          // Start observing the image
          imageObserver.observe(img);
        }
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      setupLazyLoadingFallback(images);
    }
  }
  
  /**
   * Fallback lazy loading for older browsers
   */
  function setupLazyLoadingFallback(images) {
    // Keep track of lazy images to load
    let lazyImages = [].slice.call(images);
    
    // Function to check and load visible images
    function lazyLoad() {
      // Filter out loaded images
      lazyImages = lazyImages.filter(img => {
        // If image is in viewport
        if (img.getBoundingClientRect().top <= window.innerHeight && 
            img.getBoundingClientRect().bottom >= 0 && 
            getComputedStyle(img).display !== "none") {
          
          // If image has data-src, load it
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            img.classList.add("lazy-loaded");
          }
          
          // If image has data-srcset, set it
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          // Return false to remove from array
          return false;
        }
        
        // Return true to keep in array
        return true;
      });
      
      // If no more lazy images, remove event listeners
      if (lazyImages.length === 0) {
        document.removeEventListener("scroll", lazyLoad);
        window.removeEventListener("resize", lazyLoad);
        window.removeEventListener("orientationchange", lazyLoad);
      }
    }
    
    // Add event listeners
    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
    
    // Initial check
    lazyLoad();
  }