const mongoose = require('mongoose');

const Student = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    username: {
        type: String,
        required: [true, "Please enter a student username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a student password"],
    },
    standard: {
        type: String,
    },
    schoolid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
    },
    totalpts: {
        type: Number,
        default: 0,
    },
    transactionlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
        },
    ],
});

module.exports = mongoose.model("Student", Student);