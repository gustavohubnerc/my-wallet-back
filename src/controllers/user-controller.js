import { signInService, signUpService } from "../services/user-service.js";


export async function signUpController(req, res) {
    const { name, email, password } = req.body;

    try {
        await signUpService(name, email, password);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signInController(req, res) {
    const { email, password } = req.body;

    try {
        const data = await signInService(email, password);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}