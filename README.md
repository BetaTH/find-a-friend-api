
<div align='center'>
	<h1>Find a friend Api</h1>
	<img src='https://img.shields.io/github/languages/top/BetaTH/picpay-challenge' alt='Linguagem mais utilizada' />
	<img src='https://img.shields.io/github/last-commit/BetaTH/picpay-challenge' alt='Último commit' />
</div>

<h4 align="center"> 
	🚧  🚀 Em construção...  🚧
</h4>

## 🚀 Introdução
Esse projeto faz parte de um desafio do curso de NodeJS da [Rocketseat](https://rocketseat.com.br/). Consiste em uma aplicação backend com o objetivo de catalogar animais de estimação através de uma API REST, que pode ser acessada por outras aplicações, ajudando pessoas a encontrar um amigo..

## 👨‍💻 Tecnologias

- [Javascript/Typescript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript): Linguagem de programção principal.
- [NodeJS](https://nodejs.org/en): Plataforma para executar JavaScript no backend.
- [PostgreSQL](https://www.postgresql.org/): Banco de dados utilizado na aplicação.
- [Fastify](https://fastify.dev/): Web framework para construir APIs no NodeJS.
- [Prisma ORM](https://www.prisma.io/): ORM para comunicação com o banco de dados.
- [Docker](https://www.docker.com/): Ambiente configuarado para o banco de dados postgress.

## 🏗️ Design Patterns

A aplicação segue os seguintes padrões de design:

1. **Arquitetura Limpa**: A estrutura do projeto é organizada em camadas (entidades, casos de uso, interfaces) para separar as preocupações e facilitar a manutenção.

2. **Domain Driven Design (DDD)**: O design do software é orientado ao domínio, focando em regras de negócio e entidades principais.

3. **Injeção de Dependência**: Inversão de controle e injeção de dependência são usadas para garantir flexibilidade de código e testabilidade.

4. **Testes Automatizados**: Testes unitários são escritos para garantir a qualidade do código.

## 🎯 Principais Recursos

- [x] Se cadastrar como organização
- [x] Se autenticar como organização
- [x] Cadastrar um pet
- [x] Pesquisar pets por cidade e estado, como também por características 
- [x] Obter detalhes de um pet e da org em que ele está

## 🧑‍💻 Em construção

- [ ] Adicionar o swagger para documentar melhor as rotas da API
- [ ] Adicionar fluxo de upload de imagens do pets
- [x] Adicionar testes end-to-end

## 🔧 Rodando o Projeto

Para rodar essa aplicação, é necessário ter instalado o [NodeJS](https://nodejs.org/en) e [Docker](https://www.docker.com/) na sua máquina.

- Execute o comando `cp .env.example .env` para criar arquivos de variáveis de ambiente.
- Inicie os serviços do Docker usando: `docker-compose up -d`
- Execute o comando `pnpm install` para baixar as dependências. Você pode usar o gerenciador de pacotes que preferir.
- Execute o comando `pnpm prisma migrate deploy` para aplicar as migrações ao banco de dados.
- Execute o comando `pnpm build` para buildar a aplicação.
- Execute o comando `pnpm start` para rodar a aplicação.

## 🧪 Testes Automatizados

- Execute o comando `pnpm test` para rodar os testes unitarios

## 🧑‍💻 Possíveis Melhorias

- Adicionar controle dos pets já adotados
- Possibilidade de remover um pet

## 📄 Licença

Este projeto está sob a licença MIT. Acesse o link [LICENSE](https://mit-license.org/) para mais detalhes.

## 🌐 GitHub

O código-fonte da aplicação pode ser encontrado no GitHub: [Project Link](https://github.com/BetaTH?tab=repositories)

## 📧 Contact

Em caso de dúvidas ou sugestões, entre em contato conosco através do email: [thielson12@gmail.com](mailto:thielson12@gmail.com).
