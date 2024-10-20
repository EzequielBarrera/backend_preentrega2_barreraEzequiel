const Socket = io()

Socket.on('products', (data) => {
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
    document.getElementById('productsContainer').innerHTML = html
}