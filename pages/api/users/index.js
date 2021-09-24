import connectDB from 'utils/be/connect-db'
import { requestLogger } from 'utils/be/middlewares'
import User from 'models/User'

connectDB()

const usersRouter = async (req, res) => {
  requestLogger(req, res)

  const { method, body } = req

  const GET = async () => {
    try {
      const users = await User.find({})
      res.status(200).json({ success: true, data: users })
    } catch (e) {
      res.status(400).json({ success: false, error: e.name })
    }
  }

  const POST = async () => {
    try {
      const user = new User(body)
      const savedUser = await user.save()
      res.status(201).json({ success: true, data: savedUser })
    } catch (e) {
      res.status(400).json({ success: false, error: e.name })
    }
  }

  switch (method) {
    case 'GET':
      await GET()
      break
    case 'POST':
      await POST()
      break
  }
}

export default usersRouter
