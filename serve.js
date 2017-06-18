var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer()
var subdomain = require('express-subdomain')



var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/portfolio'



// here's a function that will insert a document
var insertDocument = function(document, db, callback){
  // get the documents collection
  var collection = db.collection('messages')

  try {
    collection.insert(document)
    console.log('successfully inserted document')
    callback()
  } catch (e) {
    console.log('something went wrong inserting document :', e)
  } finally {

  }

}



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))


app.set('view engine', 'jade')
app.post('/', function(req, res){
  console.log('req body : ', req.body)
  console.log('req ip :', req.ip)

  let message_to_insert = {}

  if (!req.body.name || !req.body.email || !req.body.message){
    console.log('User submitted form with incomplete fields')
  } else {
    message_to_insert.name = req.body.name
    message_to_insert.email = req.body.email
    console.log('json message to insert : ', message_to_insert)

    MongoClient.connect(url, function(err, db){
      assert.equal(null, err)
      console.log('connected to db server')
      insertDocument(message_to_insert, db, function(){console.log('done inserting')})
      db.close()
    })
  }


  // try {
  //   if (!req.boody.name || !req.body.email || !req.body.message){
  //     console.log('User submitted form with incomplete fields')
  //   } else {
  //     message_to_insert.name = req.body.name
  //     message_to_insert.email = req.body.email
  //     console.log('json message to insert : ', message_to_insert)
  //
  //     MongoClient.connect(url, function(err, db){
  //       assert.equal(null, err)
  //       console.log('connected to db server')
  //       insertDocument(message_to_insert, db, function(){console.log('done inserting')})
  //       db.close()
  //     })
  //   }
  // } catch (e) {
  //   console.log('Something went wrong reading and inserting document')
  // } finally {
  //
  // }

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
