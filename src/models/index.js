import mongoose from 'mongoose';

export const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/feed', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
};