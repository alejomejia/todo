import { connection } from 'mongoose'
import bcrypt from 'bcrypt'

import connectDB from 'utils/be/connect-db'
import { testUser, usersInDb } from './helpers'
import User from 'models/User'

connectDB()

beforeEach(async () => {
  await User.deleteMany({})

  const { username, password } = testUser

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username, passwordHash })

  await user.save()
})

describe('api/users', () => {
  test('check if there is one user', async () => {
    const users = await usersInDb()
    expect(users).toHaveLength(1)
  })
})

afterAll(() => connection.close())
