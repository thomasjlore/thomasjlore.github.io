const API_KEY = 'patd4be9mcFIwTRFZ.c5fc8501b9efc4d7c87852dcef050e76000e9a11e6932629b82ff05c45473801';
const BASE_ID = 'eIwOqjOgWfv1m';
const USERS_TABLE = 'Users';
const MESSAGES_TABLE = 'Messages';

async function fetchAirtable(url, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        }
    };
    if (data) options.body = JSON.stringify(data);
    const response = await fetch(url, options);
    return response.json();
}

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    const userData = { fields: { username, email, password } };
    const result = await fetchAirtable(`https://api.airtable.com/v0/${BASE_ID}/${USERS_TABLE}`, 'POST', userData);
    console.log(result);
    alert('Signup successful!');
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = await fetchAirtable(`https://api.airtable.com/v0/${BASE_ID}/${USERS_TABLE}?filterByFormula={username}="${username}"`, 'GET');
    
    if (users.records.length > 0 && users.records[0].fields.password === password) {
        alert('Login successful!');
        document.getElementById('profileInfo').innerText = `Welcome, ${username}!`;
        document.getElementById('signup').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        loadMessages(username);
    } else {
        alert('Invalid credentials');
    }
});

document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const toUser = document.getElementById('messageTo').value;
    const content = document.getElementById('messageContent').value;
    const fromUser = document.getElementById('loginUsername').value;

    const messageData = { fields: { fromUser, toUser, message: content, timestamp: new Date().toISOString() } };
    await fetchAirtable(`https://api.airtable.com/v0/${BASE_ID}/${MESSAGES_TABLE}`, 'POST', messageData);
    document.getElementById('messageContent').value = '';
    loadMessages(fromUser);
});

async function loadMessages(currentUser) {
    const messages = await fetchAirtable(`https://api.airtable.com/v0/${BASE_ID}/${MESSAGES_TABLE}?filterByFormula=OR({fromUser}="${currentUser}", {toUser}="${currentUser}")`, 'GET');
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    messages.records.forEach(record => {
        const msg = document.createElement('div');
        msg.innerText = `${record.fields.fromUser}: ${record.fields.message}`;
        messagesContainer.appendChild(msg);
    });
}
