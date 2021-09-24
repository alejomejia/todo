require('dotenv').config()

const isTestEnv = process.env.NODE_ENV === 'test'

export const BE_MONGODB_URI = isTestEnv
  ? process.env.BE_TEST_MONGODB_URI
  : process.env.BE_MONGODB_URI

export const BE_SECRET_TOKEN_WORD = process.env.BE_SECRET_TOKEN_WORD
