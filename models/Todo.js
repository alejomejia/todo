const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Todo name is required'],
    trim: true,
    maxlength: [true, 'Todo cannot be more than 40 characters']
  },
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
