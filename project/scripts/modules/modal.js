// Modal Module - Handles modal dialogs throughout the site

let activeModal = null;
let previouslyFocusedElement = null;

/**
 * Sets up modal functionality
 */
export function setupModal() {
  // Create modal container if it doesn't exist
  createModalContainer();
  
  // Setup global event handlers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
      closeModal();
    } else if (e.key === 'Tab' && activeModal) {
      trapFocus(e);
    }
  });
}

/**
 * Creates the modal container if it doesn't exist
 */
function createModalContainer() {
  // Check if modal container already exists
  if (document.getElementById('modal-container')) return;
  
  // Create the modal container element
  const modalContainer = document.createElement('div');
  modalContainer.id = 'modal-container';
  modalContainer.className = 'modal-container';
  modalContainer.style.display = 'none';
  
  // Add modal HTML structure
  modalContainer.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-wrapper">
      <div class="modal" role="dialog" aria-modal="true" tabindex="-1">
        <button class="modal-close" aria-label="Close modal">×</button>
        <div class="modal-content"></div>
      </div>
    </div>
  `;
  
  // Add to document body
  document.body.appendChild(modalContainer);
  
  // Add event listeners
  const overlay = modalContainer.querySelector('.modal-overlay');
  const closeButton = modalContainer.querySelector('.modal-close');
  
  overlay.addEventListener('click', closeModal);
  closeButton.addEventListener('click', closeModal);
}

/**
 * Opens a modal with the specified content
 * @param {string} content - HTML content for the modal
 * @param {string} [className] - Optional class name to add to the modal
 */
export function openModal(content, className = '') {
  const modalContainer = document.getElementById('modal-container');
  const modalContent = modalContainer.querySelector('.modal-content');
  const modalElement = modalContainer.querySelector('.modal');
  
  // Store the currently focused element to restore focus later
  previouslyFocusedElement = document.activeElement;
  
  // Set the content
  modalContent.innerHTML = content;
  
  // Add optional class
  if (className) {
    modalElement.classList.add(className);
  }
  
  // Set active modal reference
  activeModal = modalElement;
  
  // Display the modal with animation
  modalContainer.style.display = 'block';
  setTimeout(() => {
    modalContainer.classList.add('active');
  }, 10);
  
  // Add click listener to any close buttons within the modal content
  const closeButtons = modalContent.querySelectorAll('.close-modal');
  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });
  
  // Prevent scrolling on the body
  document.body.style.overflow = 'hidden';
  
  // Focus the first focusable element (or the modal itself as fallback)
  setTimeout(() => {
    const focusableElements = getFocusableElements(modalElement);
    const firstFocusable = focusableElements.length > 0 ? 
      focusableElements[0] : 
      modalElement;
    
    firstFocusable.focus();
  }, 50);
}

/**
 * Closes the currently open modal
 */
export function closeModal() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer || !activeModal) return;
  
  // Remove active class first (triggers animation)
  modalContainer.classList.remove('active');
  
  // Wait for animation to complete before hiding
  setTimeout(() => {
    modalContainer.style.display = 'none';
    
    // Clear content and remove any added classes
    const modalContent = modalContainer.querySelector('.modal-content');
    const modalElement = modalContainer.querySelector('.modal');
    
    modalContent.innerHTML = '';
    modalElement.className = 'modal'; // Reset to base class
    
    // Re-enable scrolling
    document.body.style.overflow = '';
    
    // Clear active modal reference
    activeModal = null;
    
    // Restore focus to the previously focused element
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }, 300); // Match this to your CSS transition duration
}

/**
 * Gets all focusable elements within a container
 * @param {HTMLElement} container - The container to search in
 * @returns {Array} - Array of focusable elements
 */
function getFocusableElements(container) {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ];
  
  const elements = container.querySelectorAll(focusableSelectors.join(','));
  return Array.from(elements).filter(el => {
    // Filter out hidden elements
    return el.offsetWidth > 0 && el.offsetHeight > 0;
  });
}

/**
 * Traps focus within the modal when tabbing
 * @param {Event} e - Keyboard event
 */
function trapFocus(e) {
  if (!activeModal) return;
  
  // Get all focusable elements
  const focusableElements = getFocusableElements(activeModal);
  
  // If there are no focusable elements, do nothing
  if (focusableElements.length === 0) return;
  
  // Get first and last focusable elements
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  // Handle tab navigation
  if (e.shiftKey) { // Shift + Tab
    if (document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    }
  } else { // Tab
    if (document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  }
}

/**
 * Confirms an action with the user using a modal
 * @param {string} message - Message to display
 * @param {Function} onConfirm - Callback function when confirmed
 * @param {Function} [onCancel] - Optional callback function when canceled
 */
export function confirmAction(message, onConfirm, onCancel = null) {
  const confirmContent = `
    <div class="confirm-dialog">
      <p>${message}</p>
      <div class="confirm-actions">
        <button class="btn btn-secondary confirm-cancel">Cancel</button>
        <button class="btn btn-primary bg-red confirm-ok">Confirm</button>
      </div>
    </div>
  `;
  
  openModal(confirmContent, 'confirm-modal');
  
  // Add event listeners after the modal is open
  setTimeout(() => {
    const confirmBtn = document.querySelector('.confirm-ok');
    const cancelBtn = document.querySelector('.confirm-cancel');
    
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        closeModal();
        if (typeof onConfirm === 'function') onConfirm();
      });
    }
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        closeModal();
        if (typeof onCancel === 'function') onCancel();
      });
    }
    
    // Focus the confirm button by default
    if (confirmBtn) {
      confirmBtn.focus();
    }
  }, 100);
}