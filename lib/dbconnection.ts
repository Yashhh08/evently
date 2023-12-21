import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {

    if (!process.env.MONGODB_URI) {
        throw new Error('Missing MONGODB_URI environment variable');
    }

    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: "evently" });

        isConnected = true;

        console.log('Connected to database');
    } catch (error: any) {
        throw new Error('Unable to connect to database', error);
    }
}