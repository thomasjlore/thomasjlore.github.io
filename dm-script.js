const users = document.getElementById('users');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let currentUser = '';

// Function to display messages
function addMessage(content, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = content;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
}

// Event listener for user selection
users.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        currentUser = event.target.dataset.user;
        messagesContainer.innerHTML = ''; // Clear messages for new user
        addMessage(`You are now messaging ${currentUser}`, 'receiver');
    }
});

// Event listener for the send button
sendButton.addEventListener('click', () => {
    const messageContent = messageInput.value.trim();
    if (messageContent && currentUser) {
        addMessage(messageContent, 'user');
        messageInput.value = '';
        
        // Simulate a receiver response
        setTimeout(() => {
            addMessage(`Response from ${currentUser}`, 'receiver');
        }, 1000);
    } else if (!currentUser) {
        alert("Please select a user to message.");
    }
});

// Event listener for the Enter key
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});