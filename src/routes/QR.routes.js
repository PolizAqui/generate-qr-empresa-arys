const { QRGENERATOR } = require('../global/_var')

/******* DEPÉNDENCY  *******/

const express = require('express')
const route = express.Router()


/******* controllers *******/

const qrController = require('../controller/getInfo.controller');

/******* ROUTE  *******/

route.post( QRGENERATOR, qrController.generateQRCode);

module.exports = route
