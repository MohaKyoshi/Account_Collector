const displayer = document.getElementById('display_section');


class NewAccount {
    constructor(name, GEmail, GPass) {
        this.NameAccount = name;
        this.googleEmail = GEmail;
        this.googlePassword = GPass;

        this.createCard = function () {
            const displayDiv = document.createElement('div');
            displayDiv.classList.add('account');
            displayer.appendChild(displayDiv);

            const NameDisplay = document.createElement('h2');
            NameDisplay.innerText = this.NameAccount;
            displayDiv.appendChild(NameDisplay);

            // Google Section
            const googleSec = document.createElement('section');
            googleSec.classList.add('accountSection');
            displayDiv.appendChild(googleSec);

            const emailDisplay = document.createElement('p');
            emailDisplay.innerText = `Email: ${this.googleEmail}`;
            googleSec.appendChild(emailDisplay);

            const passwordDisplay = document.createElement('p');
            passwordDisplay.innerHTML = `Password: ${this.googlePassword}`;
            googleSec.appendChild(passwordDisplay);


            // Buttons for Edit and Delete
            const buttonGroup = document.createElement('div');
            buttonGroup.classList.add('buttonGroup');
            displayDiv.appendChild(buttonGroup);

            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.innerText = 'E';
            editButton.classList.add('editBtn');
            buttonGroup.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.innerText = 'D';
            deleteButton.classList.add('deleteBtn');
            buttonGroup.appendChild(deleteButton);
        }
    }
}


export default NewAccount;
