var express = require('express')
var router = express.Router()
var mysql = require('mysql')
require('dotenv').config()

var db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PW,
    database:process.env.DB_NAME,
})

router.get('/topic/add',(req, res)=>{
    var sql = 'SELECT * FROM topic'
    db.query(sql, (err, result)=>{
        if(!err){
        console.log(result)
        res.render('add', {topics : result})
        }else{
        console.log(err)
        }
    })
    
})

router.post('/topic/add', (req, res)=>{
    var title = req.body.title
    var description = req.body.description
    var author = req.body.author
    
    var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)'

    var params = [title, description, author]
    db.query(sql, params, (err, result)=>{
        if(!err){
            console.log("Sucess")
            res.redirect('/topic')
        } else{
            console.log(err)
        }
    })

})

router.get('/topic/:id/edit', (req, res)=>{
    var sql = 'SELECT*FROM topic'
    db.query(sql, (err, results)=>{
        var id = req.params.id
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?'
            db.query(sql, [id], (err, result)=>{
                res.render('edit', {topics: results ,topic: result[0]})
            })
        }else{
            res.send('There is no id')
        }
    })
})

router.post('/topic/:id/edit', (req, res)=>{
    var sql = "UPDATE topic SET title=?, description=?, author=? WHERE id=?"
    var id = req.params.id
    var title = req.body.title
    var desc = req.body.description
    var author = req.body.author
    db.query(sql, [title, desc, author, id], (err, result)=>{
        if(!err){
            res.redirect(`/topic/${id}/edit`)
        }else{
            console.log(err)
        }
    })

})

router.get('/topic/:id/delete', (req, res)=>{
    var sql = 'SELECT*FROM topic'
    db.query(sql, (err, results)=>{
        var id = req.params.id
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?'
            db.query(sql, [id], (err, result)=>{
                res.render('delete', {topics: results ,topic: result[0]})
            })
        }else{
            res.send('There is no id')
        }
    })
})

router.post('/topic/:id/delete', (req, res)=>{
    var sql = "DELETE FROM topic WHERE id=?"
    var id = req.params.id

    db.query(sql, [id], (err, result)=>{
        if(!err){
            res.redirect(`/topic`)
        }else{
            console.log(err)
        }
    })

})

router.get(['/topic', '/topic/:id'], (req, res)=>{
    var sql = "SELECT*FROM topic";
    db.query(sql, (err, results)=>{
        var id = req.params.id
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?'
            db.query(sql, [id], (err, result)=>{
                if(!err){
                    res.render('view', {topics: results ,topic:result[0]})
                }else{
                    console.log(err);
                    res.status(500).send("Internal Server Error")
                }
            })
        }else{
            res.render('view', {topics:results, topic:undefined})
        }
    })
})

module.exports=router