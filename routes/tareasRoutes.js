const express =require('express')
const router = express.Router()
const {getTareas, postTareas, updateTareas, deleteTareas} = require('../controllers/tareasController')
const { protect } = require('../middleware/authMiddleware')

//Obtener Tareas
router.get('/', protect, getTareas )

//Crear Tareas
router.post('/', protect, postTareas)

//Modificar Tareas
router.put('/:id', protect, updateTareas)

//Eliminar Tareas
router.delete('/:id', protect, deleteTareas)


module.exports = router