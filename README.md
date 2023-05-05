<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <h1 align="center">API-Expenses</h1>

  <div align="center">
<a href="https://www.mysql.com/" target="blank">
<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="logo MySQL" />
</a>
<a href="https://nodejs.org/en" target="blank">
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="logo NodeJS" />
</a>
<a href="https://www.typescriptlang.org/" target="blank">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="logo TypeScript" />
</a>
<a href="https://nestjs.com/" target="blank">
<img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="logo NestJS" />
</a>
<a href="https://expressjs.com/" target="blank">
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="logo Express JS" />
</a>
<a href="https://insomnia.rest/download" target="blank">
<img src="https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white" alt="logo Insomnia" />
</a>
<a href="https://jestjs.io/pt-BR/" target="blank">
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="logo Jest" />
</a>
<a href="https://jwt.io/" target="blank">
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="logo JWT" />
</a>
<a href="https://www.npmjs.com/" target="blank">
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="logo NPM" />
</a>
<a href="https://swagger.io/" target="blank">
<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" alt="logo Swagger" />
</a>
<a href="https://git-scm.com/" target="blank">
<img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" alt="logo Git" />
</a>
<a href="https://code.visualstudio.com/" target="blank">
<img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="logo VSCode" />
</a>
</div>

## Descrição

Backend para cadastramento e verificação das despesas de um condomínio misto (Residencial/Comercial) de acordo com a planilha orçamentária anual (POA).
___

## Funcionalidades

- [x] Cadastro de usuários no sistema
- [x] Login
- [x] Criação de Categorias para despesas
- [x] Busca de todas as Categorias disponíveis
- [x] Atualizar uma categoria pelo ID
- [x] Excluir uma categoria pelo ID
- [x] Criação de Subcategorias para despesas
- [x] Busca de todas as Subcategorias disponíveis
- [x] Atualizar uma Subcategoria pelo ID
- [x] Excluir uma Subcategoria pelo ID
- [x] Cadastro de novas despesas
- [x] Busca de todas as despesas cadastradas
- [x] Atualizar uma categoria pelo ID
- [x] Excluir comentário de uma despesa pelo ID
- [x] Excluir uma despesa cadastrada pelo ID
- [x] Criação de lançamento para uma despesa
- [x] Busca por lançamentos de despesas por categoria
- [x] Busca de todos os lançamentos das despesas
---

## Pré-requisitos

- #### Ter o [MySQL](https://www.mysql.com/) instalado na máquina
- #### Ter o [NodeJS](https://nodejs.org/en) instalado na máquina
- #### Ter o [NestJS](https://nestjs.com/) instalado na máquina
- #### Possuir um editor de código. Recomendo o [VSCode](https://code.visualstudio.com/)
- #### Possuir um software para realizar requisições para API. Recomendo o [Insomnia](https://insomnia.rest/download)
---
  
## Configurando o projeto

#### Acesse o servidor MySQL através do terminal ou por alguma ferramenta de gerenciamento de banco de dados e crie um banco de dados utilizando o comando abaixo:

```bash
$ CREATE DATABASE expenses CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

##### Clone este repositório

```bash
$ git clone https://github.com/andersonaguia/expenses-api.git
```

#### Renomeie o arquivo ```.env.example``` da raiz do projeto para ```.env``` e substitua os dados necessários para acessar o banco que você acabou de criar

```
# MYSQL
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER="your username"
DB_PASS="your password"
DB_NAME="expenses"

JWT_SECRET='your_jwt_secret'
```
#### Instale as dependências

```bash
$ npm install
```

#### Instale as migrations

```bash
$ npm run migration:run
```

## Rodando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Teste

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
---

## Endpoints Disponíveis

Para realizar chamadas para os endpoints você pode utilizar o [Insomnia](https://insomnia.rest/download) importando o arquivo `/public/insomnia/insomnia.json`

## Cadastrar Usuário

```
POST: http://localhost:3000/auth/signup
Headers: {
	"Content-Type": "application/json"
}

Body: {
  "name": "Anderson Aguiar",
	"occupation": "Técnico em Automação",
	"email": "email@email.com",
	"password": "12A345a#",
	"passwordConfirmation": "12A345a#",
	"role": "admin"
}
```

*O parâmetro ```role``` é opcional e por default preenche o dado no banco como ```USER```. Os valores disponíveis para esse parâmetro são: 
```
ADMIN = 'admin',
TRUSTEE = 'sindico',
MANAGER = 'gerente',
SUPERVISOR = 'supervisor',
USER = 'usuario',
```

**Retorno**

```
{
	"statusCode": 201,
	"message": "Cadastro realizado com sucesso!"
}
```

## Login

```
POST: http://localhost:3000/auth/signin
Headers: {
	"Content-Type": "application/json"
}

Body: {
  "email": "email@email.com",
	"password": "12A345a#"	
}
```
**Retorno**

```
{
	"statusCode": 200,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFuZGVyc29uIEFndWlhciIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoibWFudXRlbmNhb0Bjb25kb21pbmlvc29sYXJ0YW1iYXUuY29tLmJyIiwiaWF0IjoxNjgzMzAwNzc2LCJleHAiOjE2ODMzMjIzNzZ9.kF4G3f8rYA2jdkMuAMQq2tHnJEPQ6R_V-Y5eidsWI-w"
}
```

## Criar Categoria

```
POST: http://localhost:3000/category/create
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}

Body: {
  "name": "DESPESAS BANCÁRIAS",
	"monthlyCost": 100,
	"annualCost": 1200
}
```
*Este endpoint só pode ser acessado por usuários cadastrados como ```ADMIN```, ```TRUSTEE``` e ```MANAGER```.

**O parâmetro ```name``` está configurado no banco de dados como ```unique``` então nunca poderá ser duplicado.

**Retorno**

```
{
	"statusCode": 201,
	"message": "Categoria criada com sucesso"
}
```

## Buscar todas as categorias

```
POST: http://localhost:3000/category/findall
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}
```
*Este endpoint está acessível para todos os usuários cadastrados.

**Retorno**

```
[
	{
		"id": 1,
		"name": "DESPESAS BANCÁRIAS",
		"monthlyCost": 100,
		"annualCost": 1200,
		"createdAt": "2023-05-05T15:14:03.248Z",
		"modifiedBy": "Anderson Aguiar"
	}
]
```

## Atualizar uma categoria

```
POST: http://localhost:3000/category/update/1
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}

Body: {
  "name": "",
	"monthlyCost": 36147.76,
	"annualCost": 433773.15
}
```
*Este endpoint só pode ser acessado por usuários cadastrados como ```ADMIN```, ```TRUSTEE``` e ```MANAGER```.

**É obrigatório o envio do ```ID``` da categoria como ```PARAM``` da requisição.

***Todos os parâmetros do ```Body``` estão definidos como ```IsOptional``` então você pode enviar individualmente apenas o dado que deseja atualizar.

**Retorno**

```
{
	"statusCode": 200,
  "message": "Dados atualizados com sucesso"
}
```

## Excluir uma categoria

```
POST: http://localhost:3000/category/delete/1
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}
```
*Este endpoint só pode ser acessado por usuários cadastrados como ```ADMIN```, ```TRUSTEE``` e ```MANAGER```.

**É obrigatório o envio do ```ID``` da categoria como ```PARAM``` da requisição.

***Só será possível realizar a exclusão de uma categoria se não houverem despesas cadastradas que referenciem esta categoria.

**Retorno**

```
{
	"statusCode": 200,
	"message": "Dados excluídos com sucesso"
}
```

## Criar subcategoria

```
POST: http://localhost:3000/subcategory/create
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}

Body: {
  "name": "remuneração",
}
```
*Este endpoint só pode ser acessado por usuários cadastrados como ```ADMIN```, ```TRUSTEE``` e ```MANAGER```.

**O parâmetro ```name``` está configurado no banco de dados como ```unique``` então nunca poderá ser duplicado.

**Retorno**

```
{
	"statusCode": 201,
	"message": "Subcategoria criada com sucesso"
}
```

## Buscar todas as subcategorias

```
POST: http://localhost:3000/subcategory/findall
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}
```
*Este endpoint está acessível para todos os usuários cadastrados.

**Retorno**

```
[
	{
		"id": 1,
		"name": "REMUNERAÇÃO",
		"createdAt": "2023-05-05T16:04:24.127Z",
		"modifiedBy": "Anderson Aguiar"
	}
]
```

## Atualizar uma subcategoria

```
POST: http://localhost:3000/subcategory/update/1
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}

Body: {
  "name": "salário",
}
```
*Este endpoint só pode ser acessado por usuários cadastrados como ```ADMIN```, ```TRUSTEE``` e ```MANAGER```.

**É obrigatório o envio do ```ID``` da subcategoria como ```PARAM``` da requisição.

***É obrigatório o preenchimento do campo ```name``` para atualização de uma subcategoria.

**Retorno**

```
{
	"statusCode": 200,
  "message": "Dados atualizados com sucesso"
}
```

## Excluir uma subcategoria

```
POST: http://localhost:3000/subcategory/delete/1
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}
```
*Este endpoint só pode ser acessado por usuários cadastrados como ```ADMIN```, ```TRUSTEE``` e ```MANAGER```.

**É obrigatório o envio do ```ID``` da subcategoria como ```PARAM``` da requisição.

***Só será possível realizar a exclusão de uma subcategoria se não houverem despesas cadastradas que referenciem esta subcategoria.

**Retorno**

```
{
	"statusCode": 200,
	"message": "Dados excluídos com sucesso"
}
```

## Cadastrar uma nova despesa

```
POST: http://localhost:3000/expense/create
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}

Body: {
  "currentYear": 2023,
	"name": "Salário",
	"categoryId": 1,
	"subcategoryId": null,
	"comments": "Comentário opcional",
	"residentialPercentage": 90,
	"commercialPercentage": 10,
	"monthlyExpense": 20710,
	"annualExpense": 248520,
	"residentialMonthExpense": 18639,
	"commercialMonthExpense": 2071
}
```
*Este endpoint só pode ser acessado por usuários cadastrados como ```ADMIN```, ```TRUSTEE``` e ```MANAGER```.

**O parâmetro ```name``` está configurado no banco de dados como ```unique``` então nunca poderá ser duplicado.
***O parâmetro ```comments``` é opcional.
****O parâmetro ```subcategoryId``` deve ser preenchido como ```null``` caso a despesa cadastrada não possua uma subcategoria.


**Retorno**

```
{
	"statusCode": 201,
	"message": "Despesa criada com sucesso"
}
```

## Buscar todas as despesas cadastradas

```
POST: http://localhost:3000/expense/findall
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}
```
*Este endpoint está acessível para todos os usuários cadastrados.

**Retorno**

```
[
	{
		"id": 1,
		"currentYear": 2023,
		"name": "Salário",
		"comments": "Comentário opcional",
		"residentialPercentage": 90,
		"commercialPercentage": 10,
		"monthlyExpense": 20710,
		"annualExpense": 248520,
		"residentialMonthExpense": 18639,
		"commercialMonthExpense": 2071,
		"category": {
			"id": 1,
			"name": "DESPESAS BANCÁRIAS"
		},
		"subcategory": null,
		"createdAt": "2023-05-05T15:14:35.964Z",
		"modifiedBy": "Anderson Aguiar"
	},
]
```

## Atualizar uma despesa

```
POST: http://localhost:3000/expense/update/3
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}

Body: {
  "comments": "Este é um comentário atual sobre a despesa",
}
```
*Este endpoint só pode ser acessado por usuários cadastrados como ```ADMIN```, ```TRUSTEE``` e ```MANAGER```.

**É obrigatório o envio do ```ID``` da despesa como ```PARAM``` da requisição.

***É obrigatório o preenchimento do campo ```comments``` para atualização de uma despesa.

**Retorno**

```
{
	"statusCode": 200,
  "message": "Dados atualizados com sucesso"
}
```

## Excluir uma despesa

```
POST: http://localhost:3000/expense/delete/3
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}
```
*Este endpoint só pode ser acessado por usuários cadastrados como ```ADMIN```, ```TRUSTEE``` e ```MANAGER```.

**É obrigatório o envio do ```ID``` da despesa como ```PARAM``` da requisição.

***Só será possível realizar a exclusão de uma despesa se não houverem lançamentos cadastrados que referenciem esta despesa.

**Retorno**

```
{
	"statusCode": 200,
	"message": "Dados excluídos com sucesso"
}
```

## Realizar um novo lançamento

```
POST: http://localhost:3000/evolution/create
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}

Body: {
  "expenseId": 1,
	"lastPayment": 12.50,
	"currentMonthlyCash": 90,
	"currentAnnualCash": 1000
}
```
*Este endpoint só pode ser acessado por usuários cadastrados como ```ADMIN```, ```TRUSTEE``` e ```MANAGER```.
**Todos os campos do ```Body``` são obrigatórios.

**Retorno**

```
{
	"statusCode": 201,
	"message": "Dados adicionados com sucesso"
}
```

## Buscar todas os lançamentos cadastrados

```
POST: http://localhost:3000/evolution/findall
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}
```
*Este endpoint está acessível para todos os usuários cadastrados.

**Retorno**

```
[
	{
		"id": 1,
		"createdAt": "2023-05-05T15:16:03.491Z",
		"lastPayment": 12.5,
		"currentAnnualCash": 1000,
		"currentMonthlyCash": 90,
		"expense": {
			"id": 1,
			"currentYear": 2023,
			"name": "Salário",
			"monthlyExpense": 20710,
			"annualExpense": 248520,
			"category": {
				"id": 1,
				"name": "DESPESAS BANCÁRIAS"
			},
			"subcategory": null
		},
		"modifiedBy": {
			"id": 1,
			"name": "Anderson Aguiar"
		}
	}
]
```

## Buscar todas os lançamentos pela categoria

```
POST: http://localhost:3000/evolution/find/1
Headers: {
	"Content-Type": "application/json"
  "Authorization: "Bearer token"
}
```
*Este endpoint está acessível para todos os usuários cadastrados.
**É obrigatório o envio do ```ID``` da categoria como ```PARAM``` da requisição.

**Retorno**

```
[
	{
		"id": 1,
		"createdAt": "2023-05-05T15:16:03.491Z",
		"lastPayment": 12.5,
		"currentAnnualCash": 1000,
		"currentMonthlyCash": 90,
		"expense": {
			"id": 1,
			"currentYear": 2023,
			"name": "Salário",
			"monthlyExpense": 20710,
			"annualExpense": 248520,
			"category": {
				"id": 1,
				"name": "DESPESAS BANCÁRIAS"
			},
			"subcategory": null
		},
		"modifiedBy": {
			"id": 1,
			"name": "Anderson Aguiar"
		}
	}
]
```
---

## Autor

<div align="center">
<h2>Anderson Aguiar</h2>
<a href="https://www.linkedin.com/in/andersonlaguiar/" target="blank">
<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="logo Linkedin" />
</a>
<button onclick="copyToClipboard()"><img title="andersonlaguiar@gmail.com" id="tooltip" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="logo Gmail" /></button>
<a href="https://www.instagram.com/anders.aguiar/?igshid=ZDdkNTZiNTM%3D" target="blank">
<img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="logo Instagram" />
</a>
</div>

<style>
  button {
    background-color: transparent;
    border: none;
  }

  button:hover{
    cursor:pointer;
  }

  img {
    width: 100px;
    height: 25px;
  }

  img[title] {
    position: relative;
  }

  img[title]::after {
        content: attr(title);
        position: absolute;
        background-color: #333;
        color: #fff;
        padding: 5px;
        border-radius: 5px;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        transition: opacity 0.3s;
    }

    abbr[title]:hover::after,
    abbr[title]:focus::after {
        opacity: 1;
    }
</style>

<script>
    copyToClipboard() => {
        var tooltipText = document.getElementById('tooltip').getAttribute('title');
        navigator.clipboard.writeText(tooltipText);
        alert('Texto copiado!');
    }
</script>


## Licença

API-Expenses está sob [licença MIT](LICENSE).
