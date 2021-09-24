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
      res.status(404).json({ success: false, error: e.name })
    }
  }

  const DELETE = async () => {
    try {
      await User.findByIdAndRemove(id)
      res.status(204).end()
    } catch (e) {
      res.status(404).json({ success: false, error: e.name })
    }
  }

  switch (method) {
    case 'GET':
      await GET()
      break
    case 'DELETE':
      await DELETE()
      break
  }
}

export default userRouter
