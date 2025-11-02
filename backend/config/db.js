import { connect } from 'mongoose';

const connectDatabase = async () => {
    try {
        await connect(process.env.MONGO_URI, {});
        console.log('Database connected');
    } catch (e) {
        console.error('Error connected to MongoDB', e);
        process.exit(1);
    }
}

export default connectDatabase;