const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    itemname: {
        type: String,
    },
    itemprice: {
        type: Number,
    },
});

module.exports = mongoose.model("Transaction", transactionSchema);