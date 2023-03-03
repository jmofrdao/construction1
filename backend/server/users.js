const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const {getUser} = require('../db/users')


router.post('/login', async (req,res,next)=> {
    const {username,password} = req.body

    if (!username || !password) {
        next({
            name:'MissingCredentialsError',
            message: 'Please supply both username and password'
        })
    }

    try {
        const user = await getUser({username, password})
        if (user) {
            const token = jwt.sign({
                id: user.id,
                username
            }, JWT_SECRET)
            res.send({message: 'You are logged in!', token, user})
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Incorrect Username or Password'
            })
        }
    } catch ({name,message}) {
        next({
            name,
            message
        })
    }
})

module.exports = router