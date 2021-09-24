import User from 'models/User'

export const testUser = {
  username: 'testeandro',
  password: 'superSecret1234!'
}

export const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}
