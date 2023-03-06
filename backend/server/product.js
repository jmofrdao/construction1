const express = require('express')
const router = express.Router()
const {getAllProducts} = require('../db/product')

router.get('/', async (req,res,next)=> {
    const products = await getAllProducts()
    res.send(products)
}) 

module.exports = router