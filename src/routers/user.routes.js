import { Router } from "express"
import { signInController, signUpController } from "../controllers/user-controller.js"
import validateSchema from "../middlewares/validateSchema.js"
import { loginSchema, signUpSchema } from "../schemas/schemas.js"

const userRouter = Router()

userRouter.post("/cadastro", validateSchema(signUpSchema), signUpController)
userRouter.post("/", validateSchema(loginSchema), signInController)

export default userRouter
