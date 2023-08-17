// loginFormHandler
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#loginEmail').value.trim();
  const password = document.querySelector('#loginPassword').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

// signupFormHandler
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#signupUsername').value.trim();
  const email = document.querySelector('#signupEmail').value.trim().toLowerCase();
  const password = document.querySelector('#signupPassword').value.trim();
  const repeatPassword = document.querySelector('#signupRepeatPassword').value.trim();

  if (username && email && password && repeatPassword) {
      if (password !== repeatPassword) {
          alert('Passwords do not match');
          return;
      }

      const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ username, email, password, repeatPassword }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          document.location.replace('/');
      } else {
          alert('Failed to sign up');
      }
  }
};


// Attach event listeners
document.querySelector('#submit-login').addEventListener('click', loginFormHandler);
document.querySelector('#submit-signup').addEventListener('click', signupFormHandler);
