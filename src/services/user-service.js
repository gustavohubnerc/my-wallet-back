import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { createSession, findUserByEmail } from '../repositories/user-repository.js';
export async function signUpService(name, email, password) {
    if (!name || !email || !password) {
        throw new Error('Missing required fields');
    }

    const user = await findUserByEmail(email);
    if (user) {
        throw new Error('User already exists');
    }

    const hash = bcrypt.hashSync(password, 10);

    const userData = { name, email, password: hash };

    await createUser(userData);
}

export async function signInService(email, password) {
    if (!email || !password) {
        throw new Error('Missing required fields');
    }

    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    if (bcrypt.compareSync(password, user.password)) {
        const token = uuid();

        await createSession({ userId: user._id, token });

        return { name: user.name, token };
    } else {
        throw new Error('Invalid password');
    }
}