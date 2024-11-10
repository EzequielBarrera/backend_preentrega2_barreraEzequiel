const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number
            }
        }]
    }
})

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart