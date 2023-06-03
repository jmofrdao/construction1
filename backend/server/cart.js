const express = require('express')
const router = express.Router()
const {requireUser} = require('./utils')
const {fetchCartById, checkoutCart, fetchTheOrderHistoryById} = require('../db/cart')

router.get('/:userId', requireUser, async (req, res, next) => {
    const {userId} = req.params
    const userCart = await fetchCartById(userId)
    res.send(userCart)
})

router.patch('/:cartId', requireUser, async (req, res, next) => {
    const {cartId} = req.params
    try {
        if (req.user.id) {
            const cartPurchase = await checkoutCart (cartId)
            res.send(cartPurchase)
        } else {
            res.status(403);
            next({
                name: 'UserMissingError',
                message: `User ${req.user.username} is not allowed to checkout for some reason`
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

router.get('/:userId/orderHistory', requireUser, async (req,res,next)=> {
    const {userId} = req.params
    const userCart = await fetchTheOrderHistoryById(userId)
    res.send(userCart)
})



module.exports = router