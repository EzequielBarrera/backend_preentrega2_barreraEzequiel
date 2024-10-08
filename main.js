const express = require('express')

const app = express()

const routeProducts = require('./routes/products')
const routeCarts = require('./routes/carts')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname + "/public"))

app.use('/api/products', routeProducts)
app.use('/api/carts', routeCarts)

app.get('/', (req, res) => {
    res.send('Primer Preentrega')
})


app.listen(8080, () => {
    console.log("Server running on port 8080")
})