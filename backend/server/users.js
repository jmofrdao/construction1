const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const {getUser, getUserByUsername, createUser} = require('../db/users')


router.post('/login', async (req,res,next)=> {
    const {username,password} = req.body.user
    console.log(password, 'pass')

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

router.post('/register', async (req,res,next)=> {
    const {username, password, secondPass, email} = req.body.seller
    if (!username || !password || !secondPass || !email) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply all information'
        })
    }
    try {
        const _user = await getUserByUsername(username)
        if (_user) {
            next({
                name: 'UserTakenError',
                message: `User ${_user.username} is already taken`
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
            const user = await createUser({
                username,
                password,
                email
            })
            if (user) {
                const token = jwt.sign({
                    id: user.id,
                    username
                }, JWT_SECRET)
                res.send({message: 'Thank you for signing up!', token})
            } else {
                next({
                    name: 'UserCreationError',
                    message: 'Error creating user'
                })
            }
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router