import { Router } from "express"
import { getTransactionsController, newTransactionController, deleteTransactionController } from "../controllers/transactions-controller.js"
import validateSchema from "../middlewares/validateSchema.js"
import { transactionSchema } from "../schemas/schemas.js"

const transactionsRouter = Router()

transactionsRouter.post("/nova-transacao/:tipo", validateSchema(transactionSchema), newTransactionController)
transactionsRouter.get("/home", getTransactionsController)
transactionsRouter.delete("/home/:id", deleteTransactionController)

export default transactionsRouter