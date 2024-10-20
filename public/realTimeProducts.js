const socket = io()

socket.on('all-products', (data) => {
    render(data)
})

function render(db) {
    const html = db.map((product) => {
        return (
            `<div class="mb-3 w-50">
                <div class="card text-center">
                    <h5 class="card-header"> ${product.title} </h5>
                    <div class="card-body">
                        <em class="card-title"> ${product.description} </em>
                        <p class="card-text"> <b> $${product.price} </b>  </p>
                        <small>id: ${product.id} </small>
                    </div>
                </div>
            </div>`
        )
    }).join(" ")
    document.getElementById('box').innerHTML = html
}

function addProducts() {
    const newProduct = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        stock: document.getElementById('stock').value,
        thumbnail: document.getElementById('thumbnail').value,
        code: document.getElementById('code').value,
        status: true,
        category: document.getElementById('category').value
    }
    socket.emit('newProduct', newProduct)
    console.log('Product added successfully')
    return false
}

function deleteProducts() {
    const deletedProd = document.getElementById('prodId').value
    socket.emit('deleteProduct', deletedProd)
    console.log('Product deleted successfully')
    return false
}