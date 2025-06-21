# InfoGestor v1.0 
## Software de gerenciamento de empresa de informática

Sistema de gerenciamento integrado para empresas de informática e assistências técnicas.

---

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Status do Projeto](#status-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Requisitos](#requisitos)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Descrição do Projeto

O INFOGEST é um sistema de gestão desenvolvido para atender empresas de informática e assistências técnicas, com foco em organização operacional, controle financeiro e integração de processos essenciais. O software foi projetado para ser uma solução desktop instalável, permitindo uso offline e maior independência do usuário.

---

## Status do Projeto

:construction: Versão 1.0 - Em desenvolvimento inicial :construction:

---

## Funcionalidades

- Cadastro e gerenciamento de clientes
- Sistema de Ordem de Serviço (OS) com numeração automática e busca
- Módulo de vendas integrado ao controle de estoque
- Controle de fluxo de caixa (entradas e saídas financeiras)
- Agenda com alertas para compromissos e atividades agendadas
- Dashboard simplificado para visualização de indicadores
- Gerenciamento de contas a pagar e a receber
- Sistema de autenticação de usuários
- Distribuição em formato instalável (.exe) para uso offline

---

## Tecnologias Utilizadas

- **Electron**: Framework para desenvolvimento de aplicações desktop multiplataforma utilizando tecnologias web (JavaScript, HTML, CSS).  
  [Site oficial do Electron](https://www.electronjs.org/)  
- **JavaScript**: Linguagem principal para lógica de aplicação e integração de módulos.

---

## Instalação e Execução

> Instruções detalhadas de instalação e execução serão fornecidas nas próximas versões.

**Pré-requisitos:**

- Sistema operacional Windows (versão recomendada)
- (Outros requisitos serão adicionados conforme o desenvolvimento)

**Passos básicos:**

1. Baixe o instalador disponível na seção de releases.
2. Execute o instalador e siga as instruções na tela.
3. Após a instalação, abra o aplicativo INFOGEST pelo menu iniciar.

---

## Requisitos

- Ambiente Windows (desktop)
- Não requer conexão com a internet após instalação

---

## Estrutura inicial do Projeto

assistencia-tecnica/
├── main.js                # Processo principal do Electron
├── package.json           # Configurações e dependências do projeto
├── src/
│   ├── assets/            # Imagens, ícones, etc.
│   ├── css/               # Arquivos de estilo (ex: styles.css)
│   ├── js/                # Scripts JS (auth.js, navigation.js, database.js, main.js)
│   └── index.html         # Página principal da aplicação
├── database/              # Banco de dados local (ex: assistencia.db)
└── build/                 # Arquivos gerados para distribuição


## Contribuição

Contribuições são bem-vindas! Para colaborar, por favor abra issues ou pull requests no repositório.

---

## Licença

Este projeto está sob licença [inserir licença]. Consulte o arquivo LICENSE para mais detalhes.
