import db from '../database/server.connect.js';
import dayjs from 'dayjs';

export async function newTransaction(req, res) {
    const { value, description } = req.body;
    const { tipo } = req.params;
    const { authorization } = req.headers;
    
    const date = dayjs().format("DD/MM");

    const token = authorization?.replace("Bearer ", "");
    
    if(!token) return res.sendStatus(401);

    if(tipo !== 'entrada' && tipo !== 'saida') return res.sendStatus(404);

    try {
        const session = await db.collection('sessions').findOne({ token });

        if(!session) return res.sendStatus(401);

        await db.collection('transactions').insertOne({ value, description, tipo, date });

        res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function getTransactions(req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);
    
    try {
        const allTransactions = await db.collection('transactions').find().toArray();

        res.send(allTransactions);
    } catch (error) {
        return res.sendStatus(500);
    }
}