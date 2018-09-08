const express = require('express')
const app = express()
// const db = require('../config/dataBase')
const bodyParser = require('body-parser')
// const bcrypt = require('bcryptjs')
app.use(bodyParser.urlencoded({extended :false}));

app.get('/', (req, res) => {
  res.render('index', {
    title: "Push-Notification-App"
  })
})


module.exports = app