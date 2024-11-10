const mongoose = require('mongoose')
const URL = 'mongodb+srv://barreraezequiel281:AxuUfmgfFY3ZWYgR@ecommerce.9ltjf.mongodb.net/Ecommerce'

module.exports = {
    connect: () => {
        return mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(connect => {
                console.log('Connected to DB')
            })
            .catch(err => console.log(err))
    }
}