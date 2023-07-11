import db from '../database/server.connect.js';
import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';

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

export async function deleteTransaction(req, res) {
    const id = req.params.id;
    const token = req.headers.authorization?.replace("Bearer ", "");

    if(!token || !id) return res.sendStatus(401);

    try {
        const findTransaction = await db.collection('transactions').findOne({ _id: ObjectId(id) });
        if (!findTransaction) return res.sendStatus(401);

        await db.collection('transactions').deleteOne({ _id: ObjectId(id) });

        res.sendStatus(204);
    } catch (error) {
        return res.sendStatus(500);
    }
}    