import express from 'express';
import cors from 'cors';
import transactionsRouter from './routers/transactions.routes.js';
import userRouter from './routers/user.routes.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use(transactionsRouter);
app.use(userRouter);

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})
