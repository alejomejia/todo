import { connect } from 'mongoose'
import { BE_MONGODB_URI } from './variables'

const connectDB = async () => {
  await connect(BE_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('### Connected to MongoDB')
}

export default connectDB
