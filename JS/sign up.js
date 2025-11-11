/* Password strength + confirm + toggle + simple signup save to localStorage (demo) */
(() => {
  const pw = document.getElementById('password');
  const confirm = document.getElementById('confirm');
  const pwStrengthEl = document.getElementById('pw-strength');
  const pwMatchEl = document.getElementById('pw-match');
  const pwToggle = document.querySelector('.pw-toggle');
  const form = document.querySelector('.signup-form');

  // Toggle visibility
  pwToggle.addEventListener('click', () => {
    const t = pw.type === 'password' ? 'text' : 'password';
    pw.type = t;
    // also toggle confirm visibility for UX consistency
    confirm.type = t;
    pwToggle.textContent = t === 'text' ? '🙈' : '👁️';
  });

  // Password strength checker (simple points)
  function evaluateStrength(value) {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return score; // 0..5
  }

  pw.addEventListener('input', () => {
    const val = pw.value;
    const score = evaluateStrength(val);
    pw.classList.remove('pw-strong');

    if (!val) {
      pwStrengthEl.textContent = '';
      pwStrengthEl.className = 'pw-strength';
    } else if (score <= 2) {
      pwStrengthEl.textContent = 'Weak password ❌ — try at least 8 chars, number, symbol';
      pwStrengthEl.className = 'pw-strength weak';
    } else if (score <= 4) {
      pwStrengthEl.textContent = 'Good password 👍 — almost strong';
      pwStrengthEl.className = 'pw-strength good';
    } else {
      pwStrengthEl.textContent = 'Strong password 💪';
      pwStrengthEl.className = 'pw-strength strong';
      pw.classList.add('pw-strong');
    }

    // Also check confirm if user typed it already
    checkMatch();
  });

  // Confirm password live check
  function checkMatch() {
    const a = pw.value;
    const b = confirm.value;
    if (!b) {
      pwMatchEl.textContent = '';
      pwMatchEl.className = 'pw-match';
      return;
    }
    if (a === b) {
      pwMatchEl.textContent = 'Passwords match ✅';
      pwMatchEl.className = 'pw-match success';
    } else {
      pwMatchEl.textContent = 'Passwords do not match ❌';
      pwMatchEl.className = 'pw-match error';
    }
  }
  confirm.addEventListener('input', checkMatch);

  // Handle form submit (demo)
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent actual submission
    const fullname = document.getElementById('fullname').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = pw.value;

    // Basic checks
    if (evaluateStrength(password) < 3) {
      alert('Please choose a stronger password before signing up.');
      pw.focus();
      return;
    }
    if (password !== confirm.value) {
      alert('Passwords do not match. Please confirm correctly.');
      confirm.focus();
      return;
    }

    // Save user to localStorage (demo only) — key: "smertco_users"
    // We will store an array of users. NEVER do this in production.
    try {
      const existing = JSON.parse(localStorage.getItem('smertco_users') || '[]');
      // simple duplicate check by username or email
      const dup = existing.find(u => u.username === username || u.email === email);
      if (dup) {
        alert('A user with that username or email already exists (demo). Try a different one.');
        return;
      }
      existing.push({ fullname, username, email, password }); // plaintext for demo ONLY
      localStorage.setItem('smertco_users', JSON.stringify(existing));
    } catch (err) {
      console.error('storage error', err);
    }

    // Success flow: show small congratulations element and redirect to congratulations page
    // You can create a congratulations.html page and link below
    alert('🎉 Congratulations — account created! (Demo)'); // simple for now
    // Redirect to congratulations or homepage:
    // window.location.href = 'congratulations.html';
    // or
    window.location.href = '../page/congratulation.html';
  });
})();
