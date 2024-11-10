// server
const express = require('express')
const app = express()

// views engine require
const handlebars = require('express-handlebars')

// http import
const http = require('http')
const server = http.createServer(app)

// socket import
const { Server } = require('socket.io')
const io = new Server(server)

// mongo y dependencias
const db = require('./dao/mongoManagers/db')
const Product = require('./dao/models/productModel')
const Message = require('./dao/models/messageModel')
const ProductManager = require('./dao/mongoManagers/productController')
const PM = new ProductManager()

// routes
const routeProducts = require('./routes/products')
const routeCarts = require('./routes/carts')
const indexRouter = require('./routes/indexRoute')
const realTimeProductsRoute = require('./routes/realTimeProductsRoute')
const chatRoute = require('./routes/chatRoute')
// data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + "/public"))

// handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')


app.use('/realtimeproducts', realTimeProductsRoute)
app.use('/', indexRouter)
app.use('/api/products', routeProducts)
app.use('/api/carts', routeCarts)
app.use('/chat', chatRoute)

io.on('connection', async (socket) => {
    console.log("user connected");
    const data = await PM.getProducts(); // Llamada que obtiene todos los productos con paginación
    socket.emit('products', data.docs);  // Envía solo el arreglo de productos

    socket.on('newProduct', async (data) => {
        const newProduct = new Product(data);
        await PM.addProduct(newProduct);
        const updatedProducts = await PM.getProducts();
        io.sockets.emit('products', updatedProducts.docs);  // Envía solo el arreglo actualizado de productos
    });

    socket.on('deleteProduct', async (data) => {
        await PM.deleteProduct(data);
        const updatedProducts = await PM.getProducts();
        io.sockets.emit('products', updatedProducts.docs);  // Envía solo el arreglo actualizado de productos
    });

    const messages = await Message.find();
    socket.on('newMessage', async (data) => {
        const message = new Message(data);
        await message.save(data);
        io.sockets.emit('all-messages', messages);
    });
});



server.listen(8080, () => {
    console.log("Server running on port 8080")
    db.connect()
})