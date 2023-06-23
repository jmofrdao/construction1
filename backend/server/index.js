const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const {getUserById} = require('../db/users')
const {getSellerById} = require('../db/sellers')

router.use(async (req,res,next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next()
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const parsedToken = jwt.verify(token, JWT_SECRET);
            const id = parsedToken && parsedToken.id
            if (id) {
                req.user = await getUserById(id)
                next()
            }
        } catch (error) {
            next(error)
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        })
    }
})

router.use(async (req,res,next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next()
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const parsedToken = jwt.verify(token, JWT_SECRET);
            const id = parsedToken && parsedToken.id
            if (id) {
                req.seller = await getSellerById(id)
                next()
            }
        } catch (error) {
            next(error)
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        })
    }
})


const usersRouter = require('./users')
router.use('/users', usersRouter)

const productRouter = require('./product')
router.use('/product', productRouter)

const sellerRouter = require('./seller')
router.use('/seller', sellerRouter)

const locationRouter = require('./locations')
router.use('/locations', locationRouter)

const cartRouter = require('./cart')
router.use('/cart', cartRouter)

const cartItemRouter = require('./cartItem')
router.use('/cartItem', cartItemRouter)


module.exports = router