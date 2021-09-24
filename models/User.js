import { Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [4, 'Username cannot be less than 4 characters'],
    maxlength: [16, 'Username cannot be more than 16 characters']
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

export default User
