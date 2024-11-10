const fs = require('fs')
const prodManager = require('./products-manager')

const pManager = new prodManager('./public/products.json')
class CartManager {
    constructor(path) {
        this.path = path
        this.carts = []
        this.products = []
    }

    #read() {
        try {
            this.carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        } catch (err) {
            console.log('file not found');
        }
    }

    #write() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2, 'utf-8'))
        } catch (err) {
            console.log('error writing file');
        }
    }

    addCart() {
        this.#read()
        const cartId = this.carts.length == 0 ? 1 : this.carts[this.carts.length - 1].id + 1
        const cart = { id: cartId, products: this.products }
        this.carts.push(cart)
        this.#write()
        console.log('cart created successfully');
        return cart
    }

    getCartById(id) {
        this.#read()
        const cartFound = this.carts.find(cart => cart.id === id)
        if (cartFound) {
            return cartFound
        } else {
            console.log('cart not found');
        }
    }

    addProductToCart(cartId, productId) {
        this.#read()
        const cartFound = this.getCartById(cartId)
        if (!cartFound) {
            console.log('cart not found');
            return false;
        }

        const prodExists = pManager.getProductsByID(productId)

        if (prodExists) {
            const prodInCart = cartFound.products.find(item => item.product.id === productId)


            if (prodInCart) {
                prodInCart.product.quantity++
                this.#write()
                console.log('product added successfully');
                return prodInCart
            } else {
                const newProduct = { id: productId, quantity: 1 }
                cartFound.products.push({ product: newProduct })
                this.#write()
                console.log('product added successfully');
                return newProduct
            }
        } else {
            console.log('product does not exist')
            return false
        }

    }
}


module.exports = CartManager
