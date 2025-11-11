// login.js — SMERTCO Login System
(() => {
  const form = document.getElementById('login-form');
  const idInput = document.getElementById('login-identifier');
  const pwInput = document.getElementById('login-password');
  const msgEl = document.getElementById('login-msg');
  const pwToggle = document.querySelector('.pw-toggle');
  const rememberContainer = document.getElementById('remember-container');
  const rememberMe = document.getElementById('remember-me');
  const successAnim = document.getElementById('success-animation');

  // Toggle password visibility
  if (pwToggle && pwInput) {
    pwToggle.addEventListener('click', () => {
      const t = pwInput.type === 'password' ? 'text' : 'password';
      pwInput.type = t;
      pwToggle.textContent = t === 'text' ? '🙈' : '👁️';
    });
  }

  // Helper: show message with style
  function showMsg(text, cls = '') {
    msgEl.textContent = text;
    msgEl.className = cls;
    clearTimeout(showMsg._t);
    showMsg._t = setTimeout(() => {
      msgEl.textContent = '';
      msgEl.className = '';
    }, 4000);
  }

  // Detect when user types password correctly (optional feature)
  pwInput.addEventListener('input', () => {
    const identifier = idInput.value.trim().toLowerCase();
    const password = pwInput.value;
    let users = [];

    try {
      users = JSON.parse(localStorage.getItem('smertco_users') || '[]');
    } catch (err) {
      console.error('localStorage parse error', err);
    }

    const user = users.find(
      u =>
        (u.username && u.username.toLowerCase() === identifier) ||
        (u.email && u.email.toLowerCase() === identifier)
    );

    // If a user exists and password matches, show "Remember Me"
    if (user && user.password === password) {
      rememberContainer.style.display = 'flex';
    } else {
      rememberContainer.style.display = 'none';
    }
  });

  // Handle form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const identifier = idInput.value.trim().toLowerCase();
      const password = pwInput.value;

      if (!identifier || !password) {
        showMsg('Please enter your username/email and password', 'login-error');
        return;
      }

      let users = [];
      try {
        users = JSON.parse(localStorage.getItem('smertco_users') || '[]');
      } catch (err) {
        console.error('localStorage parse error', err);
      }

      const user = users.find(
        u =>
          (u.username && u.username.toLowerCase() === identifier) ||
          (u.email && u.email.toLowerCase() === identifier)
      );

      if (!user) {
        showMsg('No account found with that username/email', 'login-error');
        return;
      }

      if (user.password !== password) {
        showMsg('Incorrect password. Try again.', 'login-error');
        return;
      }

      // ✅ Success: animation + session save
      showMsg(`Welcome back, ${user.fullname.split(' ')[0]}!`, 'login-success');

      if (successAnim) {
        successAnim.style.display = 'flex';
      }

      const sessionUser = {
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        timestamp: Date.now(),
      };

      if (rememberMe && rememberMe.checked) {
        localStorage.setItem('smertco_current_user', JSON.stringify(sessionUser));
      } else {
        sessionStorage.setItem('smertco_current_user', JSON.stringify(sessionUser));
      }

      // Delay for animation
      setTimeout(() => {
        window.location.href = '../page/congratulation.html';
      }, 1800);
    });
  }
})();