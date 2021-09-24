import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import connectDB from 'utils/be/connect-db'
import { requestLogger } from 'utils/be/middlewares'
import { BE_SECRET_TOKEN_WORD } from 'utils/be/variables'
import User from 'models/User'

connectDB()

const loginRouter = async (req, res) => {
  requestLogger(req, res)

  const { method, body } = req

  if (method !== 'POST') res.status(400).json({ success: false })

  const user = await User.findOne({ username: body.username })
  const isPasswordOk =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  // if user is not found or the password is not ok
  if (!(user && isPasswordOk))
    res
      .status(401)
      .json({ success: false, error: 'invalid username or password' })

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, BE_SECRET_TOKEN_WORD, {
    expiresIn: 60 * 60 * 24 * 7
  })

  res.status(200).send({ username: user.username, name: user.name, token })
}

export default loginRouter
