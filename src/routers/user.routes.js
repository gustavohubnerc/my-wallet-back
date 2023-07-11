import { Router } from "express"
import { signIn, signUp } from "../controllers/user-controller.js"
import validateSchema from "../middlewares/validateSchema.js"
import { userExists, checkUser } from "../middlewares/validateAuth.js"
import { loginSchema, signUpSchema } from "../schemas/schemas.js"

const userRouter = Router()

userRouter.post("/cadastro", validateSchema(signUpSchema), userExists, signUp)
userRouter.post("/", validateSchema(loginSchema), checkUser, signIn)

export default userRouter
