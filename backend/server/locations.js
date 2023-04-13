const express = require('express')
const router = express.Router()
const {requireSeller} = require('./utils')
const {createLocation} = require('../db/location')

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

module.exports = router