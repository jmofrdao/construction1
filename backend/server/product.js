const express = require('express')
const router = express.Router()
const {getAllProducts, createProduct, getProductById, destroyProduct} = require('../db/product')
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

module.exports = router