const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
  name: String,
  isFavorite: Boolean,
  isChecked: Boolean
})

todoSchema.set('toJSON', {
  transform: (document, returnedTodo) => {
    returnedTodo.id = returnedTodo._id.toString()
    delete returnedTodo._id
    delete returnedTodo.__v
  }
})

const Todo = model('Todo', todoSchema)

module.exports = Todo
