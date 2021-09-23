const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedUser) => {
    returnedUser.id = returnedUser._id.toString()
    delete returnedUser._id
    delete returnedUser.__v
    delete returnedUser.passwordHash
  }
})

const User = model('User', userSchema)

module.exports = User
