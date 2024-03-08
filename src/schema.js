const { connect, Schema, model } = require('mongoose');
const { ipcRenderer } = require('electron');
import loadFunc from './loadingScreen.js';




const loginSec = document.getElementById('loginSec');
const getURLbtn = document.getElementById('getURLButton');
const setURL = document.getElementById('setURL');

const time = 0.2;


function connectData() {
    const mongoUrl = JSON.parse(localStorage.getItem('logged'));

    loadFunc();
    const getLoading = document.querySelector('.loadingScreen');

    connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            getLoading.remove();
            ipcRenderer.send('Connected_successfully');
        })
        .catch((err) => {
            getLoading.remove();
            ipcRenderer.send('Connected_Failed', err);
        });
}

const { gsap } = require('gsap');
ipcRenderer.on('login_action', _ => {
    if (localStorage.getItem('logged') === null) {
        if (Number(window.getComputedStyle(loginSec).opacity) === 0) {
            gsap.to(loginSec, { duration: time, opacity: 1, display: "flex" });
        } else {
            gsap.to(loginSec, { duration: time, opacity: 0, display: "none" })
        };

        getURLbtn.addEventListener('click', _ => {
            localStorage.setItem('logged', JSON.stringify(setURL.value));
            gsap.to(loginSec, { duration: time, opacity: 0, display: "none" });

            connectData();
        });
    } else {
        connectData();
    }
});

ipcRenderer.on('logout_action', _ => {
    localStorage.clear();
});

const accountSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

const Usermodel = model('Account', accountSchema);


export default Usermodel;