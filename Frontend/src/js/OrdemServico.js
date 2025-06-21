// Exemplo de estrutura para as OS (ordens de serviço)
class OrdemServico {
  constructor(id, clienteId, equipamento, defeito, status, valor, dataAbertura) {
    this.id = id;
    this.clienteId = clienteId;
    this.equipamento = equipamento;
    this.defeito = defeito;
    this.status = status; // "Aberta", "Em andamento", "Concluída", "Entregue"
    this.valor = valor;
    this.dataAbertura = dataAbertura;
    this.dataConclusao = null;
    this.observacoes = [];
  }
}