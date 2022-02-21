const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String, required: true  },
    expiry: {
        type: Date,
        required: true },
    qty: {
        type: Number,    },
    image: {
        type: String, required: true},
})

module.exports = mongoose.model('Product', productSchema)