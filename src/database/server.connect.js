import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
    await mongoClient.connect();
    console.log('MongoDB connected!');
    db = mongoClient.db();
} catch (error) {
    console.log(error.message);
}

export default db