const { ipcRenderer } = require("electron");
import DeleteFunc from "./deleteCard.js";
import NewAccount from "./newAccOOP.js";
import UpdateFunc from "./updateData.js";
import Usermodel from "./schema.js";




ipcRenderer.on('open_files', (event, getData) => {
    const accounts = document.querySelectorAll('.account');

    const data = JSON.parse(getData);
    for (let i = 0; i < accounts.length; i++) {
        accounts[i].remove();
    }
    for (let i = 0; i < data.length; i++) {
        new NewAccount(data[i].name, data[i].email, data[i].password).createCard();
    }

    UpdateFunc();
    DeleteFunc();
});

async function loadDatabase() {
    try {
        const data = await Usermodel.find();
        const extractedData = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < data.length; i++) {
            new NewAccount(extractedData[i].name, extractedData[i].email, extractedData[i].password).createCard();
        }

    } catch (error) {
        console.error('Error loading data from the database:', error);
    }
}

ipcRenderer.on('load_action', _ => {
    const accounts = document.querySelectorAll('.account');

    for (let i = 0; i < accounts.length; i++) {
        accounts[i].remove();
    }
    loadDatabase();
});