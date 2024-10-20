const express = require('express')
const handlebars = require('express-handlebars')

const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const routeProducts = require('./routes/products')
const routeCarts = require('./routes/carts')

const ProductManager = require('./managers/products-manager')
const ProdManager = new ProductManager('./public/products.json')

const productsRouter = require('./routes/indexRoute')
const realTimeProductsRoute = require('./routes/realTimeProductsRoute')
const chatRoute = require('./routes/chatRoute')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname + "/public"))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/realtimeproducts', realTimeProductsRoute)


app.use('/', productsRouter)

app.use('/api/products', routeProducts)
app.use('/api/carts', routeCarts)

app.get('/', (req, res) => {
    res.send('Primer Preentrega')
})

app.use('/chat', chatRoute)

let messages = []
io.on('connection', (socket) => {
    console.log("user connected")
    socket.emit('products', ProdManager.getProducts())

    socket.on('newProduct', (data) => {
        ProdManager.addProduct(data)
        io.sockets.emit('all-products', ProdManager.getProducts())
    })

    socket.on('deleteProduct', (data) => {
        ProdManager.deleteProduct(data)
        io.sockets.emit('all-products', ProdManager.getProducts())
    })

    socket.on('newMessage', (data) => {
        console.log(data)
        messages.push(data)
        io.sockets.emit('all-messages', messages)
    })
})



server.listen(8080, () => {
    console.log("Server running on port 8080")
})