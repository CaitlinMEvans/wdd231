// Form Module - Handles form functionality and validation
import { saveFormProgress, getFormProgress, clearFormProgress } from './storage.js';
import { openModal } from './modal.js';

/**
 * Sets up form functionality
 */
export function setupForm() {
  const appointmentForm = document.getElementById('appointmentForm');
  if (!appointmentForm) return;
  
  // Add submit handler
  appointmentForm.addEventListener('submit', handleFormSubmit);
  
  // Set up auto-save functionality
  setupFormAutoSave(appointmentForm);
  
  // Restore any saved form data
  restoreSavedFormData(appointmentForm);
  
  // Set up form validation
  setupFormValidation(appointmentForm);
}

/**
 * Handles form submission
 */
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  
  // Check form validity 
  if (!form.checkValidity()) {
    // Form is invalid, highlight errors
    form.classList.add('was-validated');
    return;
  }
  
  // Get form data
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData.entries());
  
  // Display confirmation modal
  showConfirmationModal(formValues);
  
  // Clear saved form data
  clearFormProgress('appointmentForm');
}

/**
 * Sets up form auto-save functionality
 */
function setupFormAutoSave(form) {
  // Auto-save form data on input changes
  const formInputs = form.querySelectorAll('input, textarea, select');
  
  formInputs.forEach(input => {
    input.addEventListener('change', () => {
      const formData = new FormData(form);
      const formValues = Object.fromEntries(formData.entries());
      
      // Save to localStorage
      saveFormProgress('appointmentForm', formValues);
    });
  });
}

/**
 * Restores saved form data if available
 */
function restoreSavedFormData(form) {
  const savedData = getFormProgress('appointmentForm');
  
  if (!savedData || !savedData.data) return;
  
  // Confirm if user wants to restore data
  const confirmRestore = confirm('Would you like to restore your previously entered form data?');
  
  if (!confirmRestore) {
    clearFormProgress('appointmentForm');
    return;
  }
  
  // Fill in form fields from saved data
  Object.entries(savedData.data).forEach(([name, value]) => {
    const field = form.elements[name];
    if (field) {
      field.value = value;
    }
  });
}

/**
 * Sets up form validation
 */
function setupFormValidation(form) {
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    // Add blur event to validate when leaving a field
    input.addEventListener('blur', (event) => {
      validateField(event.target);
    });
    
    // Add input event for real-time validation feedback
    input.addEventListener('input', (event) => {
      // Only validate if the field was already marked as invalid
      if (event.target.classList.contains('is-invalid')) {
        validateField(event.target);
      }
    });
  });
}

/**
 * Validates a single form field
 */
function validateField(field) {
  // Remove previous validation classes
  field.classList.remove('is-valid', 'is-invalid');
  
  let isValid = true;
  let errorMessage = '';
  
  // Check validity
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    errorMessage = 'This field is required';
  } else if (field.type === 'email' && field.value) {
    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(field.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  } else if (field.type === 'tel' && field.value) {
    // Simple phone validation
    const phonePattern = /^[\d\s\(\)\-\+]{10,15}$/;
    if (!phonePattern.test(field.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }
  }
  
  // Add appropriate class based on validity
  field.classList.add(isValid ? 'is-valid' : 'is-invalid');
  
  // Add/update error message
  let errorElement = field.nextElementSibling;
  if (!errorElement || !errorElement.classList.contains('error-message')) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    field.parentNode.insertBefore(errorElement, field.nextSibling);
  }
  
  errorElement.textContent = errorMessage;
  errorElement.style.display = isValid ? 'none' : 'block';
  
  return isValid;
}

/**
 * Shows a confirmation modal with submitted form data
 */
function showConfirmationModal(formData) {
  // Create a formatted display of the submitted data
  const formDataHTML = Object.entries(formData)
    .map(([key, value]) => {
      // Format the field name to be more readable
      const fieldName = key
        .replace(/([A-Z])/g, ' $1') // Add space before capitals
        .replace(/^./, match => match.toUpperCase()) // Capitalize first letter
        .replace(/_/g, ' '); // Replace underscores with spaces
      
      return `<p><strong>${fieldName}:</strong> ${value}</p>`;
    })
    .join('');
  
  // Create modal content
  const modalContent = `
    <div class="confirmation-modal">
      <h2>Appointment Request Submitted</h2>
      <p>Thank you for requesting an appointment. We'll contact you soon to confirm your booking.</p>
      
      <div class="confirmation-details">
        <h3>Appointment Details</h3>
        ${formDataHTML}
      </div>
      
      <div class="confirmation-actions">
        <button class="btn btn-secondary close-modal">Close</button>
      </div>
    </div>
  `;
  
  // Open the modal
  openModal(modalContent, 'confirmation-modal');
}