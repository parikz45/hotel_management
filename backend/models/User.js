const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true })

userSchema.statics.signup = async function (username, email, password, name, phone) {
    if (!username || !email || !password || !name || !phone) {
        throw Error('All fields must be filled');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }
    if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
        throw Error('Phone number is not valid');
    }
    const existsEmail = await this.findOne({ email });
    if (existsEmail) {
        throw Error('Email is already in use');
    }
    const existsUsername = await this.findOne({ username });
    if (existsUsername) {
        throw Error('Username is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.create({ username, email, password: hashedPassword, name, phone });

    return user;
}
userSchema.statics.login = async function (username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({ username });
    if (!user) {
        throw Error('Invalid username ');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw Error('Invalid username or password');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);