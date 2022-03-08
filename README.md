<h1 align="center" id="title">Basic Login System</h1>
<p  align="center" id="badges">
<img src="https://img.shields.io/github/issues/jeffhsarti/login-system-trabalhadores">
<img src="https://img.shields.io/github/forks/jeffhsarti/login-system-trabalhadores">
<img src="https://img.shields.io/github/stars/jeffhsarti/login-system-trabalhadores">
<img  src="http://img.shields.io/static/v1?label=status&message=development&color=GREEN"/>
</p>

<h1 align="center" id="index">Índice</h1>

- [Título](#title)
- [Badges](#badges)
- [Índice](#index)
- [Descrição do Projeto](#project-description)
- [Status do Projeto](#status)
- [Funcionalidades e Demonstração da Aplicação](#features)
- [Tecnologias utilizadas](#technologies)
- [À Fazer](#to-do)
- [Executando Localmente](#executing)

<h1 align="center" id="project-description">Descrição do Projeto</h1>
<p>Esse projeto tem o objetivo de oferecer uma API CRUD de usuários com uma rota de autenticação, servindo como base para uma aplicação maior, que está sendo definida pelo grupo Trabalhadores.</p>

<h1 align="center" id="status">Status do Projeto</h1>
<p>O sistema de autenticação e API de usuários está em desenvolvimento. Para maiores informações, consulta a guia <i>À Fazer</i></p>

<h1 align="center" id="features">Funcionalidades e Demonstração da Aplicação</h1>
<p>A aplicação pode ser acessada via <a href="https://login-system-trabalhadores.herokuapp.com/" rel="noopener noreferrer" target="_blank">link</a>. A documentação da API pode ser encontrada <a href="https://login-system-trabalhadores.herokuapp.com/doc" rel="noopener noreferrer" target="_blank">aqui</a>.</p>

<h1 align="center" id="technologies">Tecnologias utilizadas</h1>
<p>A aplicação foi construída à partir do framework Express.js, que se utiliza do Node.js como plataforma. O banco de dados para a aplicação é um banco PostgreSQL e a tecnologia usada para geração dos tokens de autenticação é a jsonwebtoken. Consulte a lista de dependências no package.json para maiores informações sobre os pacotes utilizados.</p>

<h1 align="center" id="status">Tecnologias utilizadas</h1>
<p>A aplicação foi construída à partir do framework Express.js, que se utiliza do Node.js como plataforma. O banco de dados para a aplicação é um banco PostgreSQL e a tecnologia usada para geração dos tokens de autenticação é a jsonwebtoken. Consulte a lista de dependências no package.json para maiores informações sobre os pacotes utilizados.</p>

<h1 align="center" id="to-do">À Fazer</h1>
<strong>Alta prioridade:</strong>

- [ ] Testes Unitários
  - [ ] Validators
  - [ ] Controllers
  - [ ] Middlewares
- [ ] Testes de Integração
  - [ ] Banco

<strong>Média prioridade:</strong>

- [ ] Serviço de Mailling
  - [ ] Confirmação de cadastro
  - [ ] Confirmação de alteração de dados

<h1 align="center" id="executing">Executando Localmente</h1>
<p>Para executar a aplicação localmente, alguns passos são necessários</p>

- Instalar o Node.js e o gerenciador de pacotes NPM (https://nodejs.org/en/download/)
- Faça um fork desse projeto
- Navegue até a pasta raíz do projeto e execute o comando `npm ci`
- Crie um arquivo chamado `.env` na pasta raíz do projeto e preencha-o de acordo com o modelo fornecido no arquivo .env.example
- Ao configurar o .env com os dados do banco, execute o comando `npx sequelize-cli db:migrate` para migrar as Models para o banco de dados. Não é necessário criar as tabelas manualmente, mas caso prefira, a execução dessa etapa não será necessária.
- Execute o comando `npm start`.

<p>
  Esse projeto está configurado para acessar um banco PostgreSQL. Caso queira utilizar outro banco, instale o driver de acesso do Node.js para o banco escolhido.
  Para uma lista detalhada de bancos e drivers permitidos pela ORM Sequelize, consulte: <a href="https://sequelize.org/master/manual/getting-started.html" target="_blank" rel="noopener noreferrer">Sequelize Docs</a>.
</p>
