import mongoose from 'mongoose';

const troughSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageName: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    writers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    readers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});
const Trough = mongoose.model('Trough', troughSchema);

export default Trough;