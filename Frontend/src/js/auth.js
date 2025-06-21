// auth.js - Sistema completo de autenticação
const { ipcRenderer } = require('electron');
const crypto = require('crypto');

// Banco de dados simulado (substitua por um real como SQLite)
let users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@tecnico.com',
    password: hashPassword('admin123'), // Senha hasheada
    role: 'admin',
    createdAt: new Date()
  }
];

// Função para hash de senha
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Login
document.getElementById('login-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = hashPassword(document.getElementById('password').value);
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    ipcRenderer.send('user-authenticated', user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-container').style.display = 'flex';
  } else {
    showAlert('Credenciais inválidas!', 'danger');
  }
});

// Registro de novos usuários
document.getElementById('register-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = hashPassword(document.getElementById('register-password').value);
  
  if (users.some(u => u.username === username)) {
    showAlert('Usuário já existe!', 'danger');
    return;
  }
  
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
    role: 'technician',
    createdAt: new Date()
  };
  
  users.push(newUser);
  showAlert('Conta criada com sucesso!', 'success');
  switchToScreen('login-screen');
});

// Recuperação de senha (simplificada)
document.getElementById('forgot-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('forgot-email').value;
  const user = users.find(u => u.email === email);
  
  if (user) {
    showAlert(`Instruções enviadas para ${email}`, 'success');
  } else {
    showAlert('E-mail não encontrado!', 'danger');
  }
});

// Navegação entre telas
document.getElementById('show-register')?.addEventListener('click', (e) => {
  e.preventDefault();
  switchToScreen('register-screen');
});

document.getElementById('show-forgot')?.addEventListener('click', (e) => {
  e.preventDefault();
  switchToScreen('forgot-screen');
});

document.getElementById('back-to-login-from-register')?.addEventListener('click', (e) => {
  e.preventDefault();
  switchToScreen('login-screen');
});

document.getElementById('back-to-login-from-forgot')?.addEventListener('click', (e) => {
  e.preventDefault();
  switchToScreen('login-screen');
});

// Funções auxiliares
function switchToScreen(screenId) {
  document.querySelectorAll('.auth-screen').forEach(screen => {
    screen.style.display = 'none';
  });
  document.getElementById(screenId).style.display = 'flex';
}

function showAlert(message, type) {
  const alert = document.createElement('div');
  alert.className = `auth-alert auth-alert-${type}`;
  alert.textContent = message;
  
  const container = document.querySelector('.auth-container');
  container.insertBefore(alert, container.firstChild);
  
  setTimeout(() => alert.remove(), 3000);
}

// Logout
document.getElementById('logout-btn')?.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  ipcRenderer.send('user-logout');
  document.getElementById('app-container').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
});