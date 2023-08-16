import throttle from 'lodash.throttle';

const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');
const submitButton = document.querySelector('button[type="submit"]');
const form = document.querySelector('.feedback-form');

const saveFormData = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500);

const loadFormData = () => {
  const savedFormData = localStorage.getItem('feedback-form-state');
  if (savedFormData) {
    const parsedFormData = JSON.parse(savedFormData);
    emailInput.value = parsedFormData.email;
    messageInput.value = parsedFormData.message;
  }
};

const clearFormData = () => {
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
};

emailInput.addEventListener('input', saveFormData);
messageInput.addEventListener('input', saveFormData);
submitButton.addEventListener('click', clearFormData);
form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formData);
  clearFormData();
});

loadFormData();
