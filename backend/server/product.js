const express = require('express')
const router = express.Router()
const {getAllProducts, createProduct, getProductById, destroyProduct, updateProduct} = require('../db/product')
const {requireSeller} = require('./utils')

router.get('/', async (req,res,next)=> {
    const products = await getAllProducts()
    res.send(products)
}) 

router.post('/', requireSeller, async (req,res,next)=> {
    const {sellerId, locationId, name, price, inventory, description} = req.body
    const productData = {
        sellerId: req.seller.id, name, price, inventory, description
    }

    try {
        const product = await createProduct(productData)
        if (product) {
            res.send(product)
        } else {
            next({
                name: 'errorCreating',
                message: 'Error creating Product'
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

router.delete('/:productId', requireSeller, async (req,res,next)=> {
    const {productId} = req.params
    try {
        const product = await getProductById(productId)
        console.log(product, 'prod')
        console.log(req.seller, 'id')
        console.log(product.sellerId, 'sell')
        if (product && product.sellerId === req.seller.id) {
            await destroyProduct(productId)
            res.send(product)
        } else {
            res.status(403);
            next({
              name: "MissingUserError",
              message: `User ${req.seller.username} is not allowed to delete this post.`,
            });
          }
    } catch ({name, message}) {
        next({name, message})
    }
})

router.patch('/:productId', requireSeller, async (req, res ,next)=> {
    const {productId} = req.params
    const {sellerId, locationId, name, price, inventory, description} = req.body
    const originalProductId = await getProductById(productId)
    try {
        if (!originalProductId) {
            next({
                name: 'NoProduct',
                message: `Product ${productId} not found`
            })
        } else if (!name || !price || !inventory) {
            next({
                name: 'ProvideAllInfo',
                message: 'Please provide information for Name, Price, and Inventory'
            })
        }
        else {
            const updatedProduct = await updateProduct({
                productId, 
                sellerId: req.seller.id, name, price, inventory, description, locationId
            })
            console.log(updateProduct, 'update')
            res.send(updatedProduct)
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:productId', async (req,res,next)=> {
    const {productId} = req.params
    const getProduct = await getProductById(productId)
    res.send(getProduct)
})

module.exports = router