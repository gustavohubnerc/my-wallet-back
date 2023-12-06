import { ObjectId } from "mongodb";
import db from "../database/server.connect.js";

export async function createTransaction(transactionData) {
    return await db.collection('transactions').insertOne(transactionData);
}

export async function getAllTransactions() {
    return await db.collection('transactions').find().toArray();
}

export async function deleteTransactionById(id) {
    return await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });
}