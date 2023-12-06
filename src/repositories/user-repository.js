import db from "../database/server.connect.js";

export async function findUserByEmail(email) {
    return await db.collection('users').findOne({ email });
}

export async function createUser(userData) {
    return await db.collection('users').insertOne(userData);
}

export async function createSession(sessionData) {
    return await db.collection('sessions').insertOne(sessionData);
}