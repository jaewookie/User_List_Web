var express = require('express')
var app = express()
var path = require('path')
var ejs = require('ejs')
require('dotenv').config()
var bodyParser = require('body-parser')

var listRouter = require('./router/index.js')

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extend : false}))

app.use('/', listRouter)

var port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Sever is stating => http://localhost:${port}`)
})