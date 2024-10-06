document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Collecting form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // Basic validation (can be extended)
    if (name && email && password && cardNumber && expiryDate && cvv) {
        // Simulate a successful sign-up and payment
        console.log('Form submitted:', { name, email, password, cardNumber, expiryDate, cvv });
        
        // Show success message
        document.getElementById('message').innerText = 'Sign up successful!';
        document.getElementById('signupForm').reset(); // Reset form
    } else {
        document.getElementById('message').innerText = 'Please fill in all fields.';
    }
});
