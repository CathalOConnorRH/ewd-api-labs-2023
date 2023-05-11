import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from '../utils/Winston';

dotenv.config();

export default {

    async init() {
        if (process.env.DATABASE_DIALECT === "mongo") {
            // Connect to database
            mongoose.connect(process.env.DATABASE_URL);
            const connection = await mongoose.connection;

            connection.on('error', (err) => {
                logger.error(`Database connection error: ${err}`);
            });
            connection.on('disconnected', () => {
                logger.info('Database disconnected');
            });
            connection.once('open', async () => {
                logger.info(`Database connected to ${connection.name} on ${connection.host}`);
                //delete the existing  collections if in development mode
                // if (process.env.NODE_ENV == "development") {
                //     logger.info(`Environment is ` + process.env.NODE_ENV + ` Removing existing collections for development purposes`);
                //     // Get all collections
                //     const collections = await connection.db.listCollections().toArray();

                //     //delete all collections
                //     collections
                //         .map((collection) => collection.name)
                //         .forEach(async (collectionName) => {
                //             connection.dropCollection(collectionName);
                //         });
                // }
            });
        }

    }
};
