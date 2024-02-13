const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareaModel')

const getTareas = asyncHandler(async (req, res) => {
    const tareas = await Tarea.find({user: req.user._id})
    res.status(200).json(tareas)
})

const postTareas = asyncHandler(async (req, res) => {
    if (!req.body.texto) {
        res.status(400)
        throw new Error('No escribiste una tarea')
    }
    const tarea = await Tarea.create({
        texto: req.body.texto,
        user: req.user._id
    })
    res.status(201).json(tarea)
})

const updateTareas = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)
    
    //Aqui verificamos que la tarea existe
    if(!tarea) {
        res.status(400)
        throw new Error ("tarea no encontrada")
    }
    //Verificamos que la tarea le pertenece al usuario del token proporcionado
    if(tarea.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    }else {
        const updatedTarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updatedTarea)

    }

})

const deleteTareas = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)
    if(!tarea) {
        res.status(400)
        throw new Error ("tarea no encontrada")
    }
    //Verificamos que la tarea le pertenece al usuario del token proporcionado
    if(tarea.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    }else {
        await Tarea.deleteOne(tarea)
        res.status(200).json({id: req.params.id})
        

    }
    



  
})


module.exports = {
    getTareas,
    postTareas,
    updateTareas,
    deleteTareas
}