import { MongoClient } from 'mongodb';

const {
    MONGO_URI = 'mongodb://localhost/API-Express'
} = process.env;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();