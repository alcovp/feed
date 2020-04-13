import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    lastLogin: {
        type: Date
    },
    role: {
        type: String
    }
});
userSchema.plugin(passportLocalMongoose);
userSchema.pre('remove', function(next) {
    this.model('Post').deleteMany({ user: this._id }, next);
});
const User = mongoose.model('User', userSchema);

export default User;