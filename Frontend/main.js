/**
 * InfoGestor - Sistema de Gestão de Informações
 * Versão: 1.0
 * Autor: TecDev
 * Programador e Engenheiro de Software: Henrique P. José
 * 
 * Descrição:
 * Este arquivo é responsável pela inicialização e configuração principal
 * da aplicação desktop InfoGestor utilizando Electron.
 * 
 * O Módulo app controla o ciclo de vida da aplicação Electron, incluindo eventos de inicialização, ativação e encerramento.
 * 
 * O Módulo BrowserWindow permite criar e gerenciar janelas nativas que exibem conteúdo web, funcionando como a interface principal do usuário.
 * 
 * O Módulo ipcMain é um emissor de eventos. Quando usado no processo principal,
 * ele lida com mensagens assíncronas e síncronas enviadas a partir de processo 
 * de renderização de página(página web). As mensagens enviadas de um renderizador 
 * serão emitidas para este módulo.
 * 
 * Conferir: https://www.electronjs.org/pt/docs/latest/api
 * 
 * © 2025 TecDev. Todos os direitos reservados.
 */


// main.js - Adicione estas partes
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  mainWindow.loadFile('src/index.html');

  // Gerenciamento de autenticação
  ipcMain.on('user-authenticated', (event, user) => {
    console.log('Usuário cadastrado:', user.username);
  });

  ipcMain.on('user-logout', () => {
    console.log('Usuário fez logout');
  });
}

app.whenReady().then(createWindow);

// ... (outras configurações do Electron)