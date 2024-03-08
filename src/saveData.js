const { ipcRenderer } = require('electron');
import Usermodel from './schema.js';


const display_section = document.getElementById('display_section');
let arrayData = [];



ipcRenderer.on('save_as_action', _ => {
    for (let i = 0; i < display_section.children.length; i++) {
        let name = display_section.children[i].firstElementChild;
        let gmail = display_section.children[i].children[1].children[0];
        let gpass = display_section.children[i].children[1].children[1];

        let dataObj = {
            name: name.innerHTML,
            email: gmail.innerHTML.slice(6,).trim(),
            password: gpass.innerHTML.slice(9,).trim(),
        }
        arrayData.push(dataObj);
    }
    ipcRenderer.send('save_as_data', arrayData);
});


// Cloud Section
ipcRenderer.on('upload_action', async () => {
    try {
        await Usermodel.deleteMany();
        for (let i = 0; i < display_section.children.length; i++) {
            let gname = display_section.children[i].firstElementChild;
            let gmail = display_section.children[i].children[1].children[0];
            let gpass = display_section.children[i].children[1].children[1];

            const newUser = new Usermodel({
                name: gname.innerHTML,
                email: gmail.innerHTML.slice(6).trim(),
                password: gpass.innerHTML.slice(9).trim(),
            });

            await newUser.save();
        }
    } catch (error) {
        console.error('Error uploading data:', error.message);
    }
});