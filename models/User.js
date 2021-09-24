const { Schema, model, models } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
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

UserSchema.plugin(uniqueValidator)

UserSchema.set('toJSON', {
  transform: (document, returnedUser) => {
    returnedUser.id = returnedUser._id.toString()
    delete returnedUser._id
    delete returnedUser.__v
    delete returnedUser.passwordHash
  }
})

const User = models.User || model('User', UserSchema)

module.exports = User
