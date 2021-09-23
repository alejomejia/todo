const mongoose = require('mongoose')
const { BE_MONGODB_URI } = require('./variables')

const connectDB = async () => {
  await mongoose.connect(BE_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('### Connected to MongoDB')
}

module.exports = connectDB
