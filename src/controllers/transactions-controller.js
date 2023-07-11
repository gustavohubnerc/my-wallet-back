import db from '../database/server.connect.js';
import { transactionSchema } from '../schemas/schemas.js';

export async function newTransaction(req, res) {
    const { value, description } = req.body;
    const { tipo } = req.params;

    if(tipo !== 'entrada' && tipo !== 'saida') return res.sendStatus(404);

    try {
        const session = await db.collection('sessions').findOne({ token });

        if(!session) return res.sendStatus(401);

        await db.collection('transactions').insertOne({ value, description, tipo });

        console.log()

        res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function getTransactions(req, res) {
    try {
        const allTransactions = await db.collection('transactions').find().toArray();

        res.send(allTransactions);
    } catch (error) {
        return res.sendStatus(500);
    }
}