var express = require('express')
var router = express.Router()
var mysql = require('mysql')
require('dotenv').config()

mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PW,
    database:process.env.DB_NAME,
    
})