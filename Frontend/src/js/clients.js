document.addEventListener('DOMContentLoaded', function() {
  // Alternar entre CPF e CNPJ
  const clientType = document.getElementById('client-type');
  const cpfGroup = document.getElementById('cpf-group');
  const cnpjGroup = document.getElementById('cnpj-group');
  const nameLabel = document.getElementById('name-label');
  
  clientType.addEventListener('change', function() {
    if (this.value === 'pf') {
      cpfGroup.style.display = 'block';
      cnpjGroup.style.display = 'none';
      nameLabel.textContent = 'Nome Completo';
    } else {
      cpfGroup.style.display = 'none';
      cnpjGroup.style.display = 'block';
      nameLabel.textContent = 'Razão Social';
    }
  });
  
  // Abrir modal de novo cliente
  const newClientBtn = document.getElementById('new-client-btn');
  const clientModal = document.getElementById('client-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  
  newClientBtn.addEventListener('click', function() {
    document.getElementById('modal-title').textContent = 'Novo Cliente';
    clientModal.style.display = 'flex';
    document.getElementById('client-form').reset();
  });
  
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      clientModal.style.display = 'none';
    });
  });
  
  // Fechar modal ao clicar fora
  window.addEventListener('click', function(event) {
    if (event.target === clientModal) {
      clientModal.style.display = 'none';
    }
  });
  
  // Máscaras para campos
  const masks = document.querySelectorAll('[data-mask]');
  masks.forEach(input => {
    const mask = input.dataset.mask;
    input.addEventListener('input', function() {
      applyMask(this, mask);
    });
  });
  
  function applyMask(field, mask) {
    let value = field.value.replace(/\D/g, '');
    let result = '';
    let position = 0;
    
    for (let i = 0; i < mask.length; i++) {
      if (mask.charAt(i) === '0') {
        if (value.charAt(position) !== undefined) {
          result += value.charAt(position);
          position++;
        } else {
          break;
        }
      } else {
        result += mask.charAt(i);
      }
    }
    
    field.value = result;
  }
  
  // Buscar CEP (exemplo)
  const searchCepBtn = document.getElementById('search-cep');
  searchCepBtn.addEventListener('click', function() {
    const cep = document.getElementById('client-cep').value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
      alert('CEP inválido');
      return;
    }
    
    // Simulação de busca de CEP
    // Na implementação real, você faria uma requisição para uma API de CEP
    console.log(`Buscando endereço para CEP: ${cep}`);
    
    // Exemplo de resposta (substituir pela chamada real à API)
    setTimeout(() => {
      document.getElementById('client-address').value = 'Rua Exemplo';
      document.getElementById('client-neighborhood').value = 'Centro';
      document.getElementById('client-city').value = 'São Paulo';
      document.getElementById('client-state').value = 'SP';
    }, 1000);
  });
  
  // Formulário de cliente
  const clientForm = document.getElementById('client-form');
  clientForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação e envio do formulário
    const formData = {
      type: document.getElementById('client-type').value,
      name: document.getElementById('client-name').value,
      document: document.getElementById('client-type').value === 'pf' 
        ? document.getElementById('client-cpf').value 
        : document.getElementById('client-cnpj').value,
      registration: document.getElementById('client-registration').value,
      email: document.getElementById('client-email').value,
      phone: document.getElementById('client-phone').value,
      cellphone: document.getElementById('client-cellphone').value,
      cep: document.getElementById('client-cep').value,
      address: document.getElementById('client-address').value,
      number: document.getElementById('client-number').value,
      complement: document.getElementById('client-complement').value,
      neighborhood: document.getElementById('client-neighborhood').value,
      city: document.getElementById('client-city').value,
      state: document.getElementById('client-state').value,
      active: document.getElementById('client-active').checked
    };
    
    console.log('Dados do cliente:', formData);
    
    // Simular salvamento
    setTimeout(() => {
      alert('Cliente salvo com sucesso!');
      clientModal.style.display = 'none';
      // Atualizar lista de clientes
    }, 1000);
  });
  
  // Simular dados de clientes para a tabela
  const clientsTable = document.getElementById('clients-table').getElementsByTagName('tbody')[0];
  
  // Exemplo de dados (substituir por dados reais do banco de dados)
  const sampleClients = [
    {
      id: 1,
      name: 'Tech Solutions LTDA',
      document: '12.345.678/0001-90',
      contact: 'contato@tech.com.br',
      registration: 'TECH2023',
      status: 'active'
    },
    {
      id: 2,
      name: 'Maria da Silva',
      document: '123.456.789-00',
      contact: 'maria@email.com',
      registration: 'MS2023',
      status: 'active'
    },
    {
      id: 3,
      name: 'Inactive Company SA',
      document: '98.765.432/0001-21',
      contact: 'inactive@example.com',
      registration: 'INC2022',
      status: 'inactive'
    }
  ];
  
  function populateClientsTable(clients) {
    clientsTable.innerHTML = '';
    
    if (clients.length === 0) {
      const row = clientsTable.insertRow();
      row.className = 'empty-state';
      row.innerHTML = `
        <td colspan="7">
          <i class="fas fa-users-slash"></i>
          <p>Nenhum cliente encontrado</p>
        </td>
      `;
      return;
    }
    
    clients.forEach(client => {
      const row = clientsTable.insertRow();
      
      row.innerHTML = `
        <td>${client.id}</td>
        <td>${client.name}</td>
        <td>${client.document}</td>
        <td>${client.contact}</td>
        <td>${client.registration}</td>
        <td><span class="status-badge status-${client.status}">${
          client.status === 'active' ? 'Ativo' : 'Inativo'
        }</span></td>
        <td class="action-cell">
          <button class="action-btn edit-btn" data-id="${client.id}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete-btn" data-id="${client.id}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
    });
    
    // Adicionar eventos aos botões de ação
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const clientId = this.dataset.id;
        editClient(clientId);
      });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const clientId = this.dataset.id;
        deleteClient(clientId);
      });
    });
  }
  
  function editClient(id) {
    // Simular busca de cliente (substituir por chamada real ao banco de dados)
    const client = sampleClients.find(c => c.id == id);
    
    if (client) {
      document.getElementById('modal-title').textContent = 'Editar Cliente';
      // Preencher formulário com dados do cliente
      // (implementação simplificada)
      document.getElementById('client-name').value = client.name;
      clientModal.style.display = 'flex';
    }
  }
  
  function deleteClient(id) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      // Simular exclusão (substituir por chamada real ao banco de dados)
      console.log(`Excluindo cliente ID: ${id}`);
      alert('Cliente excluído com sucesso!');
      // Atualizar tabela
      populateClientsTable(sampleClients.filter(c => c.id != id));
    }
  }
  
  // Inicializar tabela com dados de exemplo
  populateClientsTable(sampleClients);
  
  // Busca de clientes
  const clientSearch = document.getElementById('client-search');
  clientSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredClients = sampleClients.filter(client => 
      client.name.toLowerCase().includes(searchTerm) || 
      client.document.includes(searchTerm) ||
      client.contact.toLowerCase().includes(searchTerm) ||
      client.registration.toLowerCase().includes(searchTerm)
    );
    populateClientsTable(filteredClients);
  });
  
  // Filtro de status
  const clientFilter = document.getElementById('client-filter');
  clientFilter.addEventListener('change', function() {
    if (this.value === 'all') {
      populateClientsTable(sampleClients);
    } else {
      const filteredClients = sampleClients.filter(client => 
        client.status === this.value
      );
      populateClientsTable(filteredClients);
    }
  });
});