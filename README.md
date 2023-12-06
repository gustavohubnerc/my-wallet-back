# my-wallet-back
This is the API of a financial management app, which allows the user to have a complete report of their expenses. Front-end: https://github.com/gustavohubnerc/my-wallet-front

## Routes
User:
  - POST /cadastro (sign up) 
  - POST / (login)

Transactions:
  - POST /nova-transacao/:tipo (creates a new transaction)
  - GET /home (shows all user transactions and balance)
  - DELETE /home/:id (deletes a transaction)

## How to run in development:
```
clone this repository
create .env file to connect with the database (MongoDB)
npm i
npm run dev
```
