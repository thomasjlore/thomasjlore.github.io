document.getElementById('member-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    const name = nameInput.value;
    const email = emailInput.value;

    addMember(name, email);

    nameInput.value = '';
    emailInput.value = '';
});

function addMember(name, email) {
    const memberList = document.getElementById('member-list');
    const li = document.createElement('li');
    li.innerHTML = `${name} (${email}) <button onclick="removeMember(this)">Remove</button>`;
    memberList.appendChild(li);
}

function removeMember(button) {
    const li = button.parentElement;
    li.remove();
}