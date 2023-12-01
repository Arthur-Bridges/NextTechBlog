//factory function setup
async function (event) {
  event.preventDefault();

  // Getting user input
  let username = document.getElementById("user-name").value.trim();
  let password = document.getElementById("password").value.trim();

  // Validate username
  if (!username) {
    let usernameField = document.getElementById("user-name");
    usernameField.style.backgroundColor = "rgb(255, 192, 203)";
    usernameField.style.borderColor = "pink";
    usernameField.placeholder = "Please enter a username";
  }

  // Validate password
  if (!password) {
    let passwordField = document.getElementById("password");
    passwordField.style.backgroundColor = "rgb(255, 192, 203)";
    passwordField.style.borderColor = "pink";
    passwordField.placeholder = "Please enter a password";
  }

  // Validation after UserName and PW are verified
  if (username && password) {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.status === 400 || response.status === 401) {
      alert(data.message);
    } else {
      window.location.replace("/");
    }
  }
}

// Event listener for the login button
document.getElementById("loginBtn").addEventListener("click", loginHandler);
