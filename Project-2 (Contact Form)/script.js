const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

/**
 * Validate fields and show inline error messages.
 * Returns true when the form is valid.
 */
function validateForm() {
  let isValid = true;

  const fields = [
    { id: 'name', message: 'Please enter your full name.' },
    { id: 'email', message: 'Please enter a valid email address.', type: 'email' },
    { id: 'subject', message: 'Please enter a subject.' },
    { id: 'message', message: 'Please enter your message.' }
  ];

  fields.forEach(({ id, message, type }) => {
    const input = document.getElementById(id);
    const errorEl = document.querySelector(`.error[data-for="${id}"]`);
    let errorText = '';

    if (!input.value.trim()) {
      errorText = message;
    } else if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!emailRegex.test(input.value.trim())) {
        errorText = message;
      }
    }

    errorEl.textContent = errorText;
    if (errorText) {
      isValid = false;
    }
  });

  return isValid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  statusEl.hidden = true;
  statusEl.textContent = '';

  if (!validateForm()) {
    return;
  }

  // Simulate async submission
  const formData = Object.fromEntries(new FormData(form).entries());

  form.querySelector('.btn').disabled = true;
  setTimeout(() => {
    console.log('Form submitted:', formData);
    statusEl.textContent = 'Thanks! Your message has been sent.';
    statusEl.hidden = false;
    form.reset();
    form.querySelector('.btn').disabled = false;
  }, 600);
});


