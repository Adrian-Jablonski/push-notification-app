require('dotenv').config()
const Promise = require('bluebird')
const initOptions = {
    promiseLib: Promise,
}

// const monitor = require('pg-monitor')
// monitor.attach(initOptions)
// monitor.setTheme('matrix')

const pgp = require('pg-promise')(initOptions)

const connection = {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl: true,
}

const db = pgp(connection)

module.exports = db