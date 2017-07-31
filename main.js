const express = require('express')
const path = require('path')
const mustacheExpress = require('mustache-express')
const app = express()
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const toDoList = {
  incompleteItems: [],
  completedItems: [{ item: 'Fix errors on the To-Do List Project' }, { item: 'Style the To-Do List Project' }]
}

app.use(express.static('public'))
app.use(expressValidator())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mustache', mustacheExpress())

app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', function(req, res) {
  res.render('index', { toDoList: toDoList })
})

app.post('/add', function(req, res) {
  toDoList.incompleteItems.push({ item: req.body.listItem })
  res.redirect('/')
})

app.post('/completedItems/:item', (req, res) => {
  toDoList.completedItems.push({ item: req.params.item })
  toDoList.incompleteItems = toDoList.incompleteItems.filter(incompleteItems => incompleteItems.item !== req.params.item)
  res.redirect('/')
})

app.listen(3000, function() {
  console.log('Successfully started express application!')
})
