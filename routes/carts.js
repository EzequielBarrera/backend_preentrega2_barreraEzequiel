const express = require('express')
const{ Router } = express
const router = new Router()

const CartManager = require('../managers/carts-manager')
const cartManager = new CartManager('./public/carts.json')

router.post('/', (req, res) =>{
    cartManager.addCart(req.body)
    res.send({cart: req.body})
})

router.get('/:cid', (req, res) =>{
    const cartId = parseInt(req.params.cid)
    const cart = cartManager.getCartById(cartId)
    if(cart){
        res.send(cart)
    }else{
        res.send('ERROR: cart not found')
    }
})

router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid)
    const prodId = req.params.pid
    const productAdd = cartManager.addProductToCart(cartId, prodId)
    productAdd ? res.send({product: productAdd}) : res.send('error adding product')
})

module.exports = router