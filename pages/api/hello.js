import connectDB from 'utils/be/connect-db'

connectDB()

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
