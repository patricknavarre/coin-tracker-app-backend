const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    userName: {
        type: String,
        trim: true,
        required: true,
    },

    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "friend" }]
});

module.exports = mongoose.model("user", UserSchema);