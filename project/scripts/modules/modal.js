// Modal Module - Handles modal dialogs throughout the site

let activeModal = null;

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
      <div class="modal">
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
 */
export function openModal(content, className = '') {
  const modalContainer = document.getElementById('modal-container');
  const modalContent = modalContainer.querySelector('.modal-content');
  const modalElement = modalContainer.querySelector('.modal');
  
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
  
  // Focus the modal for accessibility
  modalElement.focus();
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
  }, 300); // Match this to your CSS transition duration
}

/**
 * Confirms an action with the user using a modal
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
  }, 100);
}