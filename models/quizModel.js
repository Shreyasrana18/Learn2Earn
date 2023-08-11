const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question: {
        type: String,
    },
    option1: {
        type: String,
    },
    option2: {
        type: String,
    },
    option3: {
        type: String,
    },
    option4: {
        type: String,
    },
    correct: {
        type: String,
    },
});

module.exports = mongoose.model("Quiz", quizSchema);