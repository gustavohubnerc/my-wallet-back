import { Router } from "express"
import { signIn, signUp } from "../controllers/user-controller.js"
import validateSchema from "../middlewares/validateSchema.js"
import { loginSchema, signUpSchema } from "../schemas/schemas.js"

const userRouter = Router()

userRouter.post("/cadastro", validateSchema(signUpSchema), signUp)
userRouter.post("/", validateSchema(loginSchema), signIn)

export default userRouter
