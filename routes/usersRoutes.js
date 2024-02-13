const express =require('express')
const router = express.Router()
const { registrarUser, loginUser, datosUser } = require('../controllers/usersController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registrarUser)
router.post('/login', loginUser)
router.get('/datos', protect, datosUser)

module.exports = router