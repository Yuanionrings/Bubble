// Routes requests that comes into server
const express = require('express')
const router = express.Router()
const UserSchemaCopy = require('../../models/UserSchema')

router.post('/signup', (request, response) =>{
    const newUser = new UserSchemaCopy({
        fullName:request.body.fullName,
        username:request.body.username,
        email:request.body.email,
        password:request.body.password
    })
    newUser.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})

module.exports = router