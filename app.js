const { app, BrowserWindow, Menu, MenuItem, dialog, ipcMain, shell } = require('electron');
const path = require('node:path');
const fs = require('node:fs');


let win;


// Main window
function createMainWin() {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        minHeight: 600,
        minWidth: 800,
        height: 1000,
        width: 1200,
    });

    win.loadFile(path.join(__dirname, 'windows', 'main.html'));
    win.on('closed', _ => {
        win = null;
    });
}




// Display the "Save As" dialog
function saveAsDialog() {
    dialog.showSaveDialog(win, {
        defaultPath: path.join(app.getPath('documents'), 'Untitle.txt'),
    }).then(result => {
        if (!result.canceled) {
            win.webContents.send('save_as_action');

            ipcMain.on('save_as_data', (event, data) => {
                fs.writeFile(result.filePath, JSON.stringify(data), err => {
                    if (err) {
                        dialog.showErrorBox("Faild to save", err);
                    };
                });
            });
        };
    });
};

// Display the "Open Files" dialog
function openDialog() {
    dialog.showOpenDialog(win, {
        defaultPath: app.getPath('documents'),
    }).then(result => {
        if (!result.canceled && result.filePaths.length > 0) {
            const filePath = result.filePaths[0];
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    dialog.showErrorBox('Failed to open', err);
                } else {
                    win.webContents.send('open_files', data);
                };
            });
        };
    });
};



// Apllication Menu
function appMenu() {
    const template = [
        {
            label: 'File',
            submenu: [{
                label: "Open",
                click: _ => {
                    openDialog();
                },
                accelerator: 'CmdOrCtrl+O'
            },
            {
                label: 'Load File',
                click: _ => {
                    win.webContents.send('load_action');
                },
                accelerator: 'CmdOrCtrl+X'
            },


            { type: 'separator' },


            {
                label: 'Save As',
                click: _ => {
                    saveAsDialog();
                },
                accelerator: 'CmdOrCtrl+Shift+S',
            },

            {
                label: 'Upload File',
                click: _ => {
                    win.webContents.send('upload_action');
                },
                accelerator: 'CmdOrCtrl+U',
            },

            { type: 'separator' },

            {
                label: 'Login',
                click: _ => {
                    win.webContents.send('login_action');
                },
                accelerator: 'CmdOrCtrl+Shift+L'
            },
            {
                label: 'Logout',
                click: () => {
                    win.webContents.send('logout_action');
                },
                accelerator: 'Alt+Shift+L'
            }
            ]
        },
        {
            label: 'Window',
            submenu: [
                {
                    label: 'Search',
                    click: _ => {
                        win.webContents.send('search_action');
                    },
                    accelerator: 'CmdOrCtrl+F',
                },

                {
                    label: 'Add Account',
                    click: _ => {
                        win.webContents.send('add_action');
                    },
                    accelerator: 'Shift+A',
                }
            ]
        },

        {
            label: 'Help',
            submenu: [
                {
                    label: 'View Main Page',
                    click: () => {

                    }
                },
                {
                    label: 'Author',
                    click: () => {
                        shell.openExternal('https://github.com/MohaKyoshi');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}


// This is Context Menu whn you right click it will popup
function contextMenuFunc() {
    const ctxMenu = new Menu();
    // Option to show Search Bar
    ctxMenu.append(new MenuItem({
        label: 'Search',
        click: _ => {
            win.webContents.send('search_action');
        },
        accelerator: 'CmdOrCtrl+F',
    }));

    // Option to show Add Account menu
    ctxMenu.append(new MenuItem({
        label: 'Add Account',
        click: _ => {
            win.webContents.send('add_action');
        },
        accelerator: 'Shift+A',
    }));

    ctxMenu.append(new MenuItem({
        type: 'separator',
    }));


    // Option to loadData from files
    ctxMenu.append(new MenuItem({
        label: 'Open',
        click: _ => {
            openDialog();
        },
        accelerator: 'CmdOrCtrl+O'
    }));

    // Option to loadData from database
    ctxMenu.append(new MenuItem({
        label: 'Load File',
        click: _ => {
            win.webContents.send('load_action');
        },
        accelerator: 'CmdOrCtrl+X'
    }));

    ctxMenu.append(new MenuItem({
        type: 'separator',
    }));

    // Option to Save as the file
    ctxMenu.append(new MenuItem({
        label: 'Save As',
        click: _ => {
            saveAsDialog();
        },
        accelerator: 'CmdOrCtrl+Shift+S',
    }));

    // Option to uploade data to database
    ctxMenu.append(new MenuItem({
        label: 'Upload File',
        click: _ => {
            win.webContents.send('upload_action');
        },
        accelerator: 'CmdOrCtrl+U',
    }));


    win.webContents.on('context-menu', (e, params) => {
        ctxMenu.popup(win, params.x, params.y);
    });
}

// after enter the Mongodb url 
ipcMain.on('Connected_successfully', _ => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Connect to DataBase',
        message: 'Connected Successfully',
        buttons: ['OK'],
        defaultId: 0,
    });
});
ipcMain.on('Connected_Failed', (e, err) => {
    dialog.showErrorBox('Connected Failed', err.message)
});
ipcMain.on('notConnected', _ => {
    dialog.showErrorBox('Uploading Failed', 'Not Connected to database, you need to login.');
});

// When The app is ready it will generate window
app.on('ready', _ => {
    createMainWin();
    appMenu();
    contextMenuFunc();
});