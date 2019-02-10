const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

/**
 * Renders Signup template
 */
router.get('/signup', (req, res) => {
    const x = req.nToken
    if (x) {
        res.redirect(`/home/${x._id}`)
    }
    res.render('signup')
})

/**
 * Renders login page
 */

router.get('/login', (req, res) => {
    res.render('login')
})

// clears cookie
router.get('/logout', (req, res) => {
    res.clearCookie('nToken')
    res.redirect('/')
})

module.exports = router