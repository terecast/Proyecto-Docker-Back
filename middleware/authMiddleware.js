const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usuarioModel')

const protect = asyncHandler(async(req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
           //Obtener Token
           token = req.headers.authorization.split(' ')[1] 
           //Verificar tocken
           const decoded = jwt.verify(token,process.env.JWT_SECRET)

           //Obtenemos los datos del usuario
           req.user = await User.findById(decoded.id).select('-password')
           next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Acceso no Autorizado')
            
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Acceso no autorizado no se proporciono token')
    }
})

module.exports = { protect }