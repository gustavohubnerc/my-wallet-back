import express from 'express';
import Joi from 'joi';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
    await mongoClient.connect();
    console.log('MongoDB connected!');
    db = mongoClient.db();
} catch (error) {
    console.log(error.message);
}

app.post('/cadastro', async(req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) return res.sendStatus(422);

    const signUpSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(3)
    })

    const validation = signUpSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const userExists = await db.collection('users').findOne({ email });

        if (userExists) return res.sendStatus(409);

        const hash = bcrypt.hashSync(password, 10);

        const userData = { name, email, password: hash};

        await db.collection('users').insertOne(userData);

        res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
})

app.post('/', async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.sendStatus(422);

    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(3)
    })

    const validation = loginSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const user = await db.collection('users').findOne({ email });
        if(!user) return res.sendStatus(404);

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            await db.collection('sessions').insertOne({ userId: user._id, token });
            res.status(200).send(token);
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        return res.sendStatus(500);
    }
    
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
