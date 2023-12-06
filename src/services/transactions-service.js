import dayjs from 'dayjs';
import { createTransaction, deleteTransactionById, getAllTransactions } from '../repositories/transactions-repository.js';

export async function createNewTransaction(value, description, tipo, token) {
    const date = dayjs().format("DD/MM");

    if (!token) {
        throw new Error('Unauthorized');
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
        throw new Error('Invalid transaction type');
    }

    const session = await db.collection('sessions').findOne({ token });
    if (!session) {
        throw new Error('Invalid session');
    }

    const transactionData = { value, description, tipo, date };

    await createTransaction(transactionData);
}

export async function getAllTransactionsService(token) {
    if (!token) {
        throw new Error('Unauthorized');
    }

    return await getAllTransactions();
}

export async function deleteTransactionByIdService(id, token) {
    if (!token || !id) {
        throw new Error('Unauthorized');
    }

    const findTransaction = await db.collection('transactions').findOne({ _id: new ObjectId(id) });
    if (!findTransaction) {
        throw new Error('Transaction not found');
    }

    await deleteTransactionById(id);
}