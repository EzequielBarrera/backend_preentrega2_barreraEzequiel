const Cart = require('../models/cartModel')

class CartController {
    constructor(path) {
        this.path = path
    }

    async getCarts() {
        try {
            return (
                await Cart.find({})
            )
        } catch (err) {
            console.log(err)
        }
    }

    async getCartById(id) {
        try {
            const cartFound = await Cart.findOne({ _id: id })
            console.log(cartFound)
            if (cartFound) {
                return cartFound
            } else {
                console.log({ message: 'Cart not found' })
                return null
            }
        } catch (err) {
            console.log(err)
        }
    }

    addCart() {
        try {
            let cart = new Cart()
            return cart.save()
        } catch (error) {
            console.log(error);
        }
    }

    addToCart = async (prodId) => {
        const cartId = "673008d323a11b84e6e262ce"

        try {
            const res = await fetch(`/api/carts/${cartId}/product/${prodId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                await res.json()
                console.log("Producto added to card")
            } else {
                await res.json();
                console.error('Error adding product to cart');
            }
        } catch (error) {
            console.error({ error: error });
        }
    }

    updateQuantity = async (cartId, prodId, newQuantity) => {
        try {
            const cartFound = await this.getCartById(cartId)

            if (cartFound) {
                const productFound = cartFound.products.find((product) => product.product.toString() === prodId)

                if (productFound) {
                    await Cart.updateOne(
                        { _id: cartId, 'products.product': prodId },
                        { $set: { 'products.$.quantity': newQuantity } }
                    )
                    return ({ message: 'Quantity updated' })
                } else {
                    console.log('Product not found')
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    deleteFromCart = async (cartId, prodId) => {
        try {
            const cartFound = await this.getCartById(cartId)
            if (cartFound) {
                const productFound = cartFound.products.findIndex(product => product._id === prodId)

                if (productFound) {
                    cartFound.products.splice(productFound, 1)
                    await cartFound.save()
                    return cartFound
                } else {
                    return false
                }
            } else {
                console.log('Cart not found')
            }
        } catch (err) {
            console.log(err)
        }
    }

    emptyCart = async (cartId) => {
        try {
            const cartFound = await this.getCartById(cartId)
            if (cartFound) {
                cartFound.products = []
                await cartFound.save()
                return cartFound
            } else {
                return false
            }
        } catch (err) {
            console.log(err)
        }
    }

}


module.exports = CartController