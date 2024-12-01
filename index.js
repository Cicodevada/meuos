const { app, BrowserWindow, ipcMain  } = require('electron')
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    //fullscreen: true, // Janela em tela cheia
    //skipTaskbar: true, // Oculta da barra de tarefas
    //frame: false, // Remove as bordas e barra da janela
    //alwaysOnBottom: true, // Opção para deixar atrás (veja as notas abaixo)
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true
    }
  })

  win.loadFile('index.html');
  win.setAlwaysOnTop(false);
  //win.setKiosk(true);

  win.webContents.on("did-attach-webview", (_, contents) => {
    contents.setWindowOpenHandler((details) => {
      win.webContents.send('open-url', details.url);
      return { action: 'deny' }
    })
  })

  
}

app.whenReady().then(() => {
  createWindow()
})