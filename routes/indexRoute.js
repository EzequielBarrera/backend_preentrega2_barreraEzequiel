const express = require('express')
const { Router } = express
const router = new Router()
const ProductController = require('../dao/mongoManagers/productController')
const productManager = new ProductController()

router.get('/', async (req, res) => {
    const { query, limit, page } = req.query
    const data = await productManager.getProducts(query, limit, page)

    let products = data.docs.map((product) => {
        return {
            title: product.title,
            _id: product._id,
            price: product.price,
            description: product.description,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            status: product.status,
            category: product.category
        }
    })

    const { docs, ...rest } = data
    let links = []

    for (let i = 1; i < rest.totalPages + 1; i++) {
        links.push({ label: i, href: 'http://localhost:8080/?page=' + i })
    }

    return res.status(200).render('home', { products: products, pagination: rest, links })
})

module.exports = router