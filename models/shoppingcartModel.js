const mongoose = require('mongoose');

const shoppingcartSchema = new mongoose.Schema({
    itemname: {
        type: String,
    },
    itemprice: {
        type: Number,
    },
    itemquantity: {
        type: Number,
    },
});

module.exports = mongoose.model("Shoppingcart", shoppingcartSchema);