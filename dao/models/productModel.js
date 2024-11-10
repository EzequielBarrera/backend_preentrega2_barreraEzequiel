const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['shooter', 'estrategia', 'aventura', 'plataformas', 'simulacion', 'rpg', 'multijugador', 'retro', 'supervivencia']
    },
})

ProductSchema.plugin(paginate)

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product