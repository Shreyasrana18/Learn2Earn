const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    names: {
        type: String,
    },
    address: {
        type: String,
    },
    boardType: {
        type: String,
    },
    studentlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
    quizlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
        },
    ],
    shoppinglist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shoppingcart",
        },
    ],
});

module.exports = mongoose.model("School", schoolSchema);