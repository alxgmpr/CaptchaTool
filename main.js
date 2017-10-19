const {app, BrowserWindow} = require('electron');
const ipc = require('electron').ipcMain;
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    })
}

function checkoutFunction () {
    console.log('Doing atc stuff');
}

function requestCaptcha() {
    console.log('Requesting captcha');

    win.webContents.send('captchaNeeded', {
        sitekey: '6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz',
        host: 'checkout.shopify.com',
        proxy: '127.0.0.1'
    });

}

ipc.on('captchaNeeded', function(event, data) {
    console.log(data);
});


app.on('ready', () => {
    createWindow();
    checkoutFunction();
    setTimeout(() => {requestCaptcha()}, 5000);
});


app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});
