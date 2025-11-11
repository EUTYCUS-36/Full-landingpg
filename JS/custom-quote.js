// custom-quote.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('custom-quote-form');
  const messageBox = document.getElementById('form-message');

  // Validation helpers
  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isPhoneValid(phone) {
    // Simple Kenyan phone format check: starts with 07 or +2547, digits only, 10-13 length
    return /^(?:\+254|0)?7\d{8}$/.test(phone);
  }

  // Show error message on input
  function showError(input, msg) {
    const errorElem = input.nextElementSibling;
    errorElem.textContent = msg;
    errorElem.style.color = '#d33';
    input.setAttribute('aria-invalid', 'true');
  }

  // Clear error message
  function clearError(input) {
    const errorElem = input.nextElementSibling;
    errorElem.textContent = '';
    input.removeAttribute('aria-invalid');
  }

  // Validate individual fields
  function validateField(input) {
    const value = input.value.trim();

    if (!value) {
      showError(input, 'This field is required.');
      return false;
    }

    if (input.type === 'email') {
      if (!isEmailValid(value)) {
        showError(input, 'Please enter a valid email.');
        return false;
      }
    }

    if (input.type === 'tel') {
      if (!isPhoneValid(value)) {
        showError(input, 'Please enter a valid Kenyan phone number.');
        return false;
      }
    }

    clearError(input);
    return true;
  }

  // Validate form
  function validateForm() {
    let isValid = true;

    // Required fields selectors - update if you add more
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');

    requiredFields.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  // Real-time validation on blur
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
  });

  // Handle form submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    messageBox.textContent = '';
    messageBox.style.color = '';

    if (!validateForm()) {
      messageBox.textContent = 'Please fix errors in the form.';
      messageBox.style.color = '#d33';
      messageBox.focus();
      return;
    }

    // Simulate submission delay
    messageBox.textContent = 'Sending your request...';
    messageBox.style.color = '#0077cc';

    // Simulate sending data to server (replace this with real API call)
    setTimeout(() => {
      messageBox.textContent = 'Thank you! Your custom quote request has been received. We will contact you shortly.';
      messageBox.style.color = 'green';
      form.reset();
    }, 1500);
  });
});

