const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');

// Função para criar a janela principal do Electron
function createWindow() {
  // Cria a janela do Electron
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Executa o programa externo (como o gedit)
  exec('gedit', (err, stdout, stderr) => {
    if (err) {
      console.error('Erro ao abrir o programa:', err);
      return;
    }
    console.log('Programa aberto!');
  });

  // Carrega um arquivo HTML local ou uma URL
  win.loadURL('index.html');
}

// Quando o Electron estiver pronto, cria a janela
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Fecha a aplicação quando todas as janelas estiverem fechadas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
