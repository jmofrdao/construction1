const express = require('express')
const router = express.Router()
const {addProductCart, fetchcartItemById, editItemQuantity, deleteCartItem, fetchCartItemByUserId} = require('../db/cartItem')
const {requireUser} = require('./utils')

router.post('/:cartId/:productId', async (req,res) => {
    const {cartId, productId} = req.params
    const {quantity, price} = req.body
    console.log(price, 'price')
    try {
        const cartItem = await addProductCart ({productId, cartId, quantity, price})
        console.log(cartItem, 'ietm')
        res.send({cartItem})
    } catch (error) {
        res.send({
            error: error.message
        })
    }
})

router.patch('/:cartItemId', requireUser, async (req, res, next) => {
    const {cartItemId} = req.params
    const {quantity} = req.body
    const {username} = req.user
    const newCartItem = await fetchcartItemById(cartItemId)
    try {
        if (!newCartItem) {
            res.status(403)
            next({
                name: "User id not found",
                message: `User ${username} is not allowed to update this cart`
            })
        } else {
            const brandNewCartItem = editItemQuantity({cartItemId, quantity})
            res.send(brandNewCartItem)
        }
    } catch (error) {
        next(error)
    }
})

router.delete('/:cartItemId', requireUser, async (req, res, next) => {
    const {username} = req.user
    const {cartItemId} = req.params
    try {
        const cartItem = await fetchcartItemById(cartItemId)
        if (cartItem) {
            await deleteCartItem(cartItemId)
            res.send(cartItem)
        } else {
            res.status(403)
            next({
                name: 'MissingUserError',
                message: `User ${username} is not allowed to delete this cart item`
            })
        }
    } catch ({name, message}) {
        next ({name, message})
    }
})

router.get('/:userId', async (req, res, next) => {
    const {userId} = req.params
    const cartOrder = await fetchCartItemByUserId(userId)
    res.send(cartOrder)
})

module.exports = router