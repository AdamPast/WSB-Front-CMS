const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity:{
        type: Number,
        default: 1,
        min: 1,
        required: true
    }
})

module.exports = mongoose.model("Order", orderSchema)