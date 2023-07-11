import db from '../database/server.connect.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    if(!name || !email || !password) return res.sendStatus(422);

    try {
        const hash = bcrypt.hashSync(password, 10);

        const userData = { name, email, password: hash};

        await db.collection('users').insertOne(userData);

        res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
}    

export async function signIn(req, res) {
    const { email, password } = req.body;
    
    if(!email || !password) return res.sendStatus(422);

    try {
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
}    