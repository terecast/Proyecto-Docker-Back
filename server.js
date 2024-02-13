const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const {connectDb} = require('./config/db')
const port = process.env.PORT || 5001
const cors = require('cors')

connectDb()
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))
app.use(errorHandler)


app.listen(port, () => console.log(`La app corre en puerto ${port}`))