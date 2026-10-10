import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bazardor";
const globalForMongo = globalThis;

export const client = globalForMongo._bazardorMongo ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") globalForMongo._bazardorMongo = client;

export const db = client.db();
