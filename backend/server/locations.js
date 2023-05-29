const express = require('express')
const router = express.Router()
const {requireSeller} = require('./utils')
const {createLocation, getLocationById, destroyLocation} = require('../db/location')
const {getProductByLocation} = require('../db/product')

router.post('/', requireSeller, async (req, res, next)=> {
    const {sellerId, address, state, city, zip, phone} = req.body
    const locationData = {
        sellerId: req.seller.id, address, state, city, zip, phone
    }
    try {
        const location = await createLocation(locationData)
        if (location) {
            res.send(location)
        } else {
            next({
                name:'ErrorCreating',
                message: 'Error creating Location'
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

router.delete('/:locationId', requireSeller, async (req,res,next)=> {
const {locationId} = req.params
try {
const location = await getLocationById(locationId)
if (location && location.sellerId === req.seller.id) {
    await destroyLocation(locationId)
    res.send(location)
} else {
    res.status(403);
    next({
        name: 'MissingSellerError',
        message: `Seller ${req.seller.username} is not allowed to delete this location`
    })
}
} catch ({name, message}) {
    next({name, message})
}
})

router.get('/:locationId/product', async (req,res,next) => {
    const {locationId} = req.params
    console.log(locationId, 'loc')
    try {
        const product = await getProductByLocation(locationId)
        if (locationId) {
            res.send(product)
        } else {
            next({
                name:'ErrorProduct',
                message: 'Error Getting Product'
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})
module.exports = router