import connectDB from 'utils/be/connect-db'
import { requestLogger } from 'utils/be/middlewares'
import User from 'models/User'

connectDB()

const userRouter = async (req, res) => {
  requestLogger(req, res)

  const { method, body } = req
  const { id } = req.query

  const GET = async () => {
    try {
      const user = await User.findById(id)
      res.status(200).json({ success: true, data: user })
    } catch (e) {
      res.status(404).json({ success: false, error: 'User not found' })
    }
  }

  const PUT = async () => {
    const { name } = body

    try {
      const updatedUser = {
        name
      }

      await User.findByIdAndUpdate(id, updatedUser, {
        new: true,
        runValidators: true,
        context: 'query'
      })
      res.status(200).json({ success: true, data: updatedUser })
    } catch (e) {
      res.status(404).json({ success: false, error: e.message })
    }
  }

  const DELETE = async () => {
    try {
      await User.findByIdAndRemove(id)
      res.status(204).end()
    } catch (e) {
      res.status(404).json({ success: false, error: e.message })
    }
  }

  switch (method) {
    case 'GET':
      await GET()
      break
    case 'PUT':
      await PUT()
      break
    case 'DELETE':
      await DELETE()
      break
  }
}

export default userRouter
