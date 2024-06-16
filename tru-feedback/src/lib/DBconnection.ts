import mongoose from 'mongoose';
import 'dotenv/config';
type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

const DBconnect = async (): Promise<void> => {
    if (connection.isConnected) {
        console.log('DB already connected');
        return;
    }

    try {
        const db = await mongoose.connect( process.env.MONGODB_URI || '');
        connection.isConnected = db.connections[0].readyState;
        console.log('Connected to DB');
    } catch (error) {
        console.error('Error connecting to DB', error);
        process.exit(1);
    }
};

export default DBconnect;
