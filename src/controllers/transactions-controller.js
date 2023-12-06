import { createNewTransaction, deleteTransactionByIdService, getAllTransactionsService } from "../services/transactions-service.js";

export async function newTransactionController(req, res) {
    const { value, description } = req.body;
    const { tipo } = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        await createNewTransaction(value, description, tipo, token);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getTransactionsController(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const allTransactions = await getAllTransactionsService(token);
        res.send(allTransactions);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deleteTransactionController(req, res) {
    const id = req.params.id;
    const token = req.headers.authorization?.replace("Bearer ", "");

    try {
        await deleteTransactionByIdService(id, token);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}