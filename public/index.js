const socket = io()
const CartController = require('../dao/mongoManagers/cartController')
const CM = new CartController()

socket.on('products', (data) => {
    render(data)
})

function render(db) {
    const html = db.map((product) => {
        return (`
            <div class="mb-3 w-50">
                <div class="card text-center">
                    <h5 class="card-header"> ${product.title} </h5>
                    <div class="card-body">
                        <em class="card-title"> ${product.description} </em>
                        <p class="card-text"> <b> $${product.price} </b>  </p>
                        <small>id: ${product._id} </small>
                        <button class="btn btn-outline-success mt-2" onclick="addToCart("${product._id}")" type="submit">Add to cart</button>
                    </div>
                </div>
            </div>
        `)
    }).join(" ")
    document.getElementById('productsContainer').innerHTML = html

    const addToCart = async (prodId) => {
        await CM.addToCart(prodId)
        console.log('Product added succesfully')
    }
}

