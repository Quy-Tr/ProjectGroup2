(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const nameInput    = document.getElementById('contactName');
  const emailInput   = document.getElementById('contactEmail');
  const phoneInput   = document.getElementById('contactPhone');
  const messageInput = document.getElementById('contactMessage');
  const successBox   = document.getElementById('contactSuccess');
  function showError(input, errorId, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    document.getElementById(errorId).textContent = message;
  }
  function clearError(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }
  function validateName() {
    const val = nameInput.value.trim();
    if (!val) {
      showError(nameInput, 'nameError', 'Vui lòng nhập họ và tên.');
      return false;
    }
    if (val.length < 2) {
      showError(nameInput, 'nameError', 'Họ và tên phải có ít nhất 2 ký tự.');
      return false;
    }
    clearError(nameInput);
    return true;
  }
  function validateEmail() {
    const val = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      showError(emailInput, 'emailError', 'Vui lòng nhập địa chỉ email.');
      return false;
    }
    if (!emailRegex.test(val)) {
      showError(emailInput, 'emailError', 'Email không đúng định dạng (ví dụ: ten@email.com).');
      return false;
    }
    clearError(emailInput);
    return true;
  }
  function validatePhone() {
    const val = phoneInput.value.trim();
    const phoneRegex = /^[0-9]{9,11}$/;
    if (!val) {
      showError(phoneInput, 'phoneError', 'Vui lòng nhập số điện thoại.');
      return false;
    }
    if (!phoneRegex.test(val)) {
      showError(phoneInput, 'phoneError', 'Số điện thoại chỉ gồm 9–11 chữ số, không chứa ký tự đặc biệt.');
      return false;
    }
    clearError(phoneInput);
    return true;
  }
  function validateMessage() {
    const val = messageInput.value.trim();
    if (!val) {
      showError(messageInput, 'messageError', 'Vui lòng nhập nội dung tin nhắn.');
      return false;
    }
    if (val.length < 10) {
      showError(messageInput, 'messageError', 'Nội dung phải có ít nhất 10 ký tự.');
      return false;
    }
    clearError(messageInput);
    return true;
  }
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  phoneInput.addEventListener('blur', validatePhone);
  messageInput.addEventListener('blur', validateMessage);
  phoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const isValid =
      validateName() &
      validateEmail() &
      validatePhone() &
      validateMessage();
    if (isValid) {
      form.reset();
      [nameInput, emailInput, phoneInput, messageInput].forEach(function (el) {
        el.classList.remove('is-valid', 'is-invalid');
      });
      successBox.style.display = 'block';
      successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(function () {
        successBox.style.display = 'none';
      }, 6000);
    }
  });
})();
