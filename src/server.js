const express = require('express')
const app = express()
const _var = require('./global/_var')
const cors = require('cors')

/****** DEPENDENCY ******/

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/******* ROUTES ******/

const route = require('./routes/QR.routes')


/******* SERVER ******/

app.listen(_var.PORT, (err) => {
    if (err) throw err
    console.log(`Servidor Inicializado en: http://localhost:${_var.PORT}`);
})

app.use(route)