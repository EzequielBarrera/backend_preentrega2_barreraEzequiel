const fs = require('fs')
const uuid4 = require('uuid4')

class Product_manager {
    constructor(path) {
        this.path = path
        this.products = []
    }

    #validateFields(product) {
        const keys = ['title', 'description', 'price', 'thumbnail', 'code', 'stock', 'status', 'category']
        const keysInProd = Object.keys(product)
        let error = false
        keys.forEach(key => {
            const included = keysInProd.includes(key)
            if (!included) {
                error == true
                console.log('ERROR 400: bad request. complete all fields');
            }
        })
        return error
    }
    #read() {
        try {
            this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        } catch (err) {
            console.log('File not found')
        }
    }

    #write() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
        } catch (err) {
            console.log("Error writing file")
        }
    }

    getProducts() {
        try {
            const products = fs.readFileSync(this.path, 'utf-8')
            this.products = JSON.parse(products)
            return this.products
        } catch (err) {
            console.log('File not found.')
        }
    }

    getProductsByID(id) {
        try {
            this.#read()
            const productFound = this.products.find(product => product.id === id)
            return productFound ? productFound : console.log('Product ID not found')
        } catch (err) {
            console.log('File not found');
        }
    }

    addProduct(newProduct, id) {
        this.#read()
        const validated = this.#validateFields(newProduct)
        const productFound = this.products.find(product => product.code === newProduct.code)
        if (validated) {
            console.log('ERR 400');
        } else if (productFound) {
            console.log('ERROR: product code already exists');
        } else {
            const newID = uuid4()
            newProduct.id = newID
            this.products.push({ ...newProduct, id: newProduct.id })
            this.#write()
            console.log('Product added successfully');
            return newProduct
        }
    }

    deleteProduct(id) {
        this.#read()
        const productFound = this.getProductsByID(id)
        if (productFound) {
            this.products = this.products.filter(product => product.id !== id)
            this.#write()
            console.log('Product deleted successfully');
            return { deletedProduct: productFound }
        } else {
            console.log('Product ID not found');
        }
    }

    updateProduct(id, modifiedProduct) {
        try {
            this.#read()
            const validated = this.#validateFields(modifiedProduct)
            const productIndex = this.products.findIndex(product => product.id === id)

            if (validated) {
                console.log('ERR 400: All fields are required.');
            } else if (productIndex !== -1) {
                this.products[productIndex] = { ...this.products[productIndex], ...modifiedProduct, id: id }

                this.#write()

                console.log('Product modified successfully.');
                return this.products[productIndex]
            } else {
                console.log('Product ID not found.');
            }
        } catch (err) {
            console.log('File not found.');
        }
    }
}

module.exports = Product_manager