import { Router } from "express"
import { getTransactions, newTransaction } from "../controllers/transactions-controller.js"
import validateSchema from "../middlewares/validateSchema.js"
import { transactionSchema } from "../schemas/schemas.js"

const transactionsRouter = Router()

transactionsRouter.post("/nova-transacao/:tipo", validateSchema(transactionSchema), newTransaction)
transactionsRouter.get("/home", getTransactions)

export default transactionsRouter