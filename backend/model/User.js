const mongoose = require('mongoose');

// Create schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    phone: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'student',
    },
    age:{
        type: Number,
        required: true
    }
},
{
    timestamps: true
}
);

// Create model
const User = mongoose.model('User', userSchema);
module.exports = User;



