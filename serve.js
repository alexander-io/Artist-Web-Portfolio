var express = require('express')
var app = express()

app.use(express.static('public'))

// app.get('/', function(req, res){
//   res.send('hello world')
// })

app.set('view engine', 'jade')

app.get('/resume', function(req, res){
  res.sendfile('public/resume.html', {root: __dirname})
})

app.listen(3000, function(){
  console.log('example app listening on port')
})
