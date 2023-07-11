import { Router } from "express"
import { getTransactions, newTransaction } from "../controllers/transactions-controller.js"
import validateSchema from "../middlewares/validateSchema.js"
import { transactionSchema } from "../schemas/schemas.js"
import { checkToken } from "../middlewares/validateAuth.js"


const transactionsRouter = Router()

transactionsRouter.post("/nova-transacao/:tipo", validateSchema(transactionSchema), checkToken, newTransaction)
transactionsRouter.get("/home", checkToken, getTransactions)

export default transactionsRouter