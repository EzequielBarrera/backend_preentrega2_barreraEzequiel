const express = require('express')
const { Router } = express
const router = new Router()

const Product_manager = require('../managers/products-manager')
const prodManager = new Product_manager('./public/products.json')
const uuid4 = require('uuid4')

router.get('/', (req, res) => {
    const limit = req.query.limit
    const products = prodManager.getProducts()
    !limit ? res.send({ products: products }) : res.send(products.slice(0, limit))
})

router.get('/:id', (req, res) =>{
    const id = req.params.id
    const productFound = prodManager.getProductsById(id)
    productFound ? res.send(productFound) : res.send('ERROR: product not found')
})

router.post('/', (req, res) => {
    const id = uuid4()
    const product = req.body
    product.id = id
    const productAdd = prodManager.addProduct(product, product.id)
    res.send(productAdd)
}) 

router.put('/:id', (req, res) => {
    const id = req.params.id
    const productNew = req.body
    const productUpdated = prodManager.updateProduct(id, productNew)
    res.send({updated: productUpdated})
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const productDeleted = prodManager.deleteProduct(id)
    res.send(productDeleted)
})

module.exports = router