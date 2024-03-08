const { ipcRenderer } = require('electron');
const { default: gsap } = require('gsap');

const Addmenu = document.getElementById('Addmenu');
const createBtn = document.getElementById('create_button');

const time = 0.2;

// Inputs
const name = document.getElementById('nameAccount');

const googleEmail = document.getElementById('googleEmail');
const googlePassword = document.getElementById('googlePassword');

// Matching
const nameMatching = /\w{4,}/ig;
const gmailMatching = /\w+@\w+\.(com|net|org)/ig;

const timeforMenu = 0.3;
const inputerrClr = 'coral';



function UpdateFunc() {
    const editBtns = document.querySelectorAll('.editBtn');

    editBtns.forEach(el => {
        el.addEventListener('click', e => {

            // Hide and show the Menu itself by using someanimation by gsap
            if (Number(window.getComputedStyle(Addmenu).opacity) === 0) {
                gsap.to(Addmenu, { duration: time, opacity: 1, display: "flex" });

                if (createBtn.innerHTML === 'Create') {
                    createBtn.innerHTML = 'Update';
                }
            } else {
                gsap.to(Addmenu, { duration: time, opacity: 0, display: "none" });
            };


            // Get Data from the exist Account
            const getname = e.target.parentElement.parentElement.children[0].innerHTML;
            const getemail = e.target.parentElement.parentElement.children[1].children[0].innerHTML.slice(6,).trim();
            const getpassword = e.target.parentElement.parentElement.children[1].children[1].innerHTML.slice(9,).trim();

            // Set Data to the inputs
            name.value = getname;

            googleEmail.value = getemail;
            googlePassword.value = getpassword;


            // Event  Listener for Update the values
            createBtn.addEventListener('click', _ => {
                if (name.value.match(nameMatching)
                    && googleEmail.value.match(gmailMatching)
                    && googlePassword.value !== '' && createBtn.innerHTML === 'Update') {

                    e.target.parentElement.parentElement.children[0].innerHTML = name.value;

                    e.target.parentElement.parentElement.children[1].children[0].innerHTML = `Email: ${googleEmail.value.trim()}`;
                    e.target.parentElement.parentElement.children[1].children[1].innerHTML = `Password: ${googlePassword.value.trim()}`;

                    // Return it to null
                    name.value = '';
                    googleEmail.value = '';
                    googlePassword.value = '';

                    gsap.to(Addmenu, { duration: time, opacity: 0, display: "none" });
                } else if (!name.value.match(nameMatching)
                    && !googleEmail.value.match(gmailMatching)
                    && !googlePassword.value !== '' && createBtn.innerHTML === 'Update') {
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
            });

        });
    });
};



export default UpdateFunc;