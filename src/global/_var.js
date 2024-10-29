require('dotenv').config()

/****** SERVER *****/

const PORT  =  process.env.PORT

/****** DATABASE *******/

const PG_USER = process.env._USER
const PG_HOST = process.env._HOST
const PG_NAME = process.env._NAME
const PG_PASS = process.env._PASS

/****** ROUTER *******/

const QRGENERATOR = process.env.QRGENERATOR

module.exports = {
    //server
    PORT,
    //database
    PG_USER,
    PG_HOST,
    PG_NAME,
    PG_PASS,
    //router
    QRGENERATOR
}