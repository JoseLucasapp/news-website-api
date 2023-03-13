import crypto from 'crypto'
import mongoose from 'mongoose';

const users = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: true,
        set: value => crypto.createHash('md5').update(value).digest('hex')
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('users', users);