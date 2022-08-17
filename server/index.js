const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//MODELS
const FoodModel = require('./models/Food')

const app = express()

mongoose.connect('mongodb+srv://crudapp:GjpNuPQDcnhJTDxn@cluster0.aeb3wsm.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

// MIDDLEWARE

app.use(express.json())
app.use(cors())

//ROUTES

app.post('/insert', async (req, res) => {
    const foodName = req.body.foodName
    const food = new FoodModel({
        foodName: foodName
    })
    try {
        await food.save()
            .res.send('Inserted Data...')
    } catch (err) {
        console.log('Error Occured', err)
    }
})

app.get('/read', async (req, res) => {
    FoodModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    await FoodModel.findByIdAndRemove(id).exec()
    res.send('Deleted...')
})

app.listen(3001, () => {
    console.log('server running at port 3001..')
})