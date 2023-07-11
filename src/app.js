import express from 'express';
import cors from 'cors';
import transactionsRouter from './routers/transactions.routes.js';
import userRouter from './routers/user.routes.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use(transactionsRouter);
app.use(userRouter);

/* app.post('/cadastro', async(req, res) => {
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
            res.status(200).send({name: user.name, token});
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        return res.sendStatus(500);
    } 
})

app.post('/nova-transacao/:tipo', async(req, res) => {
    const { value, description } = req.body;
    const { tipo } = req.params;
    const { authorization } = req.headers;
    
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);

    if(tipo !== 'entrada' && tipo !== 'saida') return res.sendStatus(404);

    const transactionSchema = Joi.object({
        value: Joi.number().positive().required(),
        description: Joi.string().required(),
    });

    const validation = transactionSchema.validate({ value, description }, { abortEarly: false });

    if(validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const session = await db.collection('sessions').findOne({ token });

        if(!session) return res.sendStatus(401);

        await db.collection('transactions').insertOne({ value, description, tipo });

        console.log()

        res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
})

app.get('/home', async(req, res) => {
    const { authorization } = req.headers;
    
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);

    try {
        const allTransactions = await db.collection('transactions').find().toArray();

        res.send(allTransactions);
    } catch (error) {
        return res.sendStatus(500);
    }
}) */

const PORT = 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
