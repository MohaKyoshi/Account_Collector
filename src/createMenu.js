// This script will show you a menu of creating a new account
const { ipcRenderer } = require("electron");
const { default: gsap } = require("gsap");


const Addmenu = document.getElementById('Addmenu');



const createBtn = document.getElementById('create_button');

const time = 0.2;

// Hide and show the Menu itself by using someanimation by gsap
ipcRenderer.on('add_action', _ => {
    if (Number(window.getComputedStyle(Addmenu).opacity) === 0) {
        gsap.to(Addmenu, { duration: time, opacity: 1, display: "flex" });
        if (createBtn.innerHTML === 'Update') {
            createBtn.innerHTML = 'Create';
        }

    } else {
        gsap.to(Addmenu, { duration: time, opacity: 0, display: "none" })
    };
});




import DeleteFunc from "./deleteCard.js";
// Display the new card of the account
import NewAccount from "./newAccOOP.js";
import UpdateFunc from "./updateData.js";



const name = document.getElementById('nameAccount');

const googleEmail = document.getElementById('googleEmail');
const googlePassword = document.getElementById('googlePassword');

const timeforMenu = 0.3;
const inputerrClr = 'coral';

// Matching
const nameMatching = /\w{4,}/ig;
const gmailMatching = /\w+@\w+\.(com|net|org)/ig;


// Function that check if you write it right it will create an account
function createAnAccount() {
    if (name.value.match(nameMatching)
        && googleEmail.value.match(gmailMatching)
        && googlePassword.value !== '' && createBtn.innerHTML === 'Create') {
        const newAcc = new NewAccount(
            name.value,
            googleEmail.value,
            googlePassword.value
        ).createCard();


        name.value = '';
        googleEmail.value = '';
        googlePassword.value = '';

        // gsap animation
        gsap.to(Addmenu, { duration: 0.6, opacity: 0, display: "none" });
    } else if (!name.value.match(nameMatching)
        && !googleEmail.value.match(gmailMatching)
        && !googlePassword.value !== '' && createBtn.innerHTML === 'Create') {
        // when there is an error The inputs will turn to red
        if (!name.value.match(nameMatching)) {
            const tl = gsap.timeline()
            tl.to(name, { duration: timeforMenu, background: inputerrClr });
            tl.to(name, { duration: timeforMenu, background: 'rgba(255, 255, 255, 0.2)' });
        }
        if (!googleEmail.value.match(gmailMatching)) {
            const tl = gsap.timeline()
            tl.to(googleEmail, { duration: timeforMenu, background: inputerrClr });
            tl.to(googleEmail, { duration: timeforMenu, background: 'rgba(255, 255, 255, 0.2)' });
        }
        if (googlePassword.value === '') {
            const tl = gsap.timeline()
            tl.to(googlePassword, { duration: timeforMenu, background: inputerrClr });
            tl.to(googlePassword, { duration: timeforMenu, background: 'rgba(255, 255, 255, 0.2)' });
        }
    }

}


createBtn.addEventListener('click', _ => {
    createAnAccount();
    DeleteFunc();
    UpdateFunc();
});
