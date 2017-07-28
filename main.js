const express = require('express')
const path = require('path')
const mustacheExpress = require('mustache-express')
const app = express()
const todos = ['Make the bed', 'Wash the car']
const completed = ['Make the bed', 'Wash the car']

app.use(express.static('public'))
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', function(req, res) {
  res.render('index', { todos: todos })
})

app.post('/', function(req, res) {
  todos.push(req.body.todo)
  res.redirect('/')
})

app.listen(3000, function() {
  console.log('Successfully started express application!')
})
