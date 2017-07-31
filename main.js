const express = require('express')
const path = require('path')
const mustacheExpress = require('mustache-express')
const app = express()
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const expressSession = require('express-session')

// const toDoList = {
//   incompleteItems: [],
//   completedItems: [{ item: 'Fix errors on the To-Do List Project' }, { item: 'Style the To-Do List Project' }]
// }

app.use(express.static('public'))
app.use(expressValidator())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
)

app.engine('mustache', mustacheExpress())

app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', function(req, res) {
  const todoList = req.session.todoList || []

  const data = {
    uncompleted: todoList.filter(todo => !todo.completed),
    completed: todoList.filter(todo => todo.completed)
  }

  res.render('index', data)
})

app.post('/add', function(req, res) {
  const todoList = req.session.todoList || []
  todoList.push({ id: todoList.length + 1, completed: false, listItem: req.body.listItem })
  req.session.todoList = todoList
  res.redirect('/')
})

app.post('/completedItems', (req, res) => {
  const todoList = req.session.todoList || []
  const id = parseInt(req.body.id)
  const todo = todoList.find(todo => todo.id === id)

  if (todo) {
   todo.completed = true
   todo.when = new Date()
   req.session.todoList = todoList
  }
  
  res.redirect('/')
})

app.listen(3000, function() {
  console.log('Successfully started express application!')
})
