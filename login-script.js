document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    // Simple validation
    if (username === 'user' && password === 'pass') {
        messageElement.textContent = 'Login successful!';
        messageElement.style.color = 'green';
        // Here you can redirect or perform another action
        // window.location.href = 'dashboard.html';
    } else {
        messageElement.textContent = 'Invalid username or password!';
    }
});
