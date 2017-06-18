var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer()
var subdomain = require('express-subdomain')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))

// app.get('/', function(req, res){
//   res.sendFile('public/index.html', {root: __dirname})
// })

app.set('view engine', 'jade')

// app.get('/resume', function(req, res){
//   res.sendfile('public/resume.html', {root: __dirname})
// })

app.post('/index.html', function(req, res){
  // res.send('got post request')
  // console.log('got post request :', req.params)
  // console.log('req body:', req)
  console.log('req body : ', req.body)
  console.log('req ip :', req.ip)
  // res.end()
  // res.sendFile('public/index.html', {root: __dirname})

})

app.listen(3000, function(){
  console.log('example app listening on port')
})


// var router = express.Router()
//
// router.get('/', function(req, res){
//   res.send('Welcome to the api')
// })
//
// app.use(subdomain('api', router))
// app.listen(3000)
