const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    dateSinceAte: {
        type: Number
    }
})

const Food = mongoose.model('Food', FoodSchema)

module.exports = Food