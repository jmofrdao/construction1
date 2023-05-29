const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const {getSeller, getSellerByUsername, createSeller, getAllSellers, getSellerByIdWithoutUsername} = require('../db/sellers')
const {getLocationsBySeller, getLocationBySellerId} = require('../db/location')
const {requireSeller} = require('./utils')
router.post('/login', async (req,res,next)=> {
    const {username,password} = req.body.seller
console.log(username, 'username')
    if (!username || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both Username and Password'
        })
    }
    try {
        const seller = await getSeller({username, password})
        console.log(seller, 'seller')
        if (seller) {
            const token = jwt.sign({
                id: seller.id,
                username
            }, JWT_SECRET)
            res.send({message: 'You are logged in!', token, seller})
        } else {
            next({
                name: 'IncorrectCredentials',
                message: 'Incorrect Username or Password'
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

router.post('/register', async (req, res, next)=> {
    const {username, password, email, secondPass, company} = req.body.seller

    if (!username || !password || !email || !secondPass || !company) {
        next({
            name: 'MissingCredentialsError', 
            message: 'Please Supply All Information'
        })
    }
    try {
        const _seller = await getSellerByUsername (username)
        if (_seller) {
            next({
                name: 'UserExistsError',
                message: `${_seller.username} already exists`
            })
        } else if (password.length < 8) {
            next({
                name: 'PasswordLengthError',
                message: 'Password must be longer than 8 characters'
            })
        } else if (password !== secondPass) {
            next({
                name: 'PasswordVerificationError',
                message: 'Passwords do not match'
            })
        } else {
           const seller = await createSeller({
               username,
               password,
               email,
               company
           })
           if (seller) {
               const token = jwt.sign({
                 id: seller.id,
                 username  
               }, JWT_SECRET)
               res.send({message: 'Thank you for signing up!', token})
           } else {
               next({
                   name: 'ErrorCreatingSeller',
                   message: 'Trouble creating seller'
               })
           }
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:username/locations', async (req,res,next) => {
    const {username} = req.params
    console.log(username, 'name')
    try {
        const location = await getLocationsBySeller(username)
        if (username) {
            res.send(location)
        } else {
            next({
                name:'ErrorLocation',
                message: 'Error Getting Locations'
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

router.get("/me", requireSeller, async (req, res, next) => {
    
    try {
      res.send(req.seller);
    } catch (error) {
      next(error);
    }
  });

  router.get('/', async (req,res,next)=> {
    const sellers = await getAllSellers()
    res.send(sellers)
}) 

router.get('/:sellerId', async (req,res,next) => {
    
    const {sellerId} = req.params
    
    try {
        const locations = await getLocationBySellerId(sellerId)
        if (sellerId) {
            res.send(locations)
        } else {
            next({
                name:'ErrorLocation',
                message: 'Error Getting Location'
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

router.get('/:sellerId/sellers', async (req,res,next) => {
    const {sellerId} = req.params
    try {
        const sellers = await getSellerByIdWithoutUsername(sellerId)
        if (sellerId) {
            res.send(sellers)
        } else {
            next({
                name: 'sellerError',
                message: 'Error getting the sellers'
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = router