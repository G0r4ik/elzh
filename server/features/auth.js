import jwt from 'jsonwebtoken'
import { models } from '../db.js'
const secretKey = 'YOUR_SECRET_KEfsdsdfsdfcx'

export async function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    idCourse: user.idCourse,
  }
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
  return token
}

export async function validateToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded
  } catch (error) {
    return null
  }
}

export async function checkTokenAndSetUser(request, reply) {
  const token = request.headers['authorization']
  if (!token) throw new Error('Unauthorized')
  const decodedToken = await validateToken(token.split(' ')[1])
  if (!decodedToken) throw new Error('Unauthorized')

  request.user = decodedToken
}

export async function isValidToken(request, reply) {
  try {
    const { token } = request.body

    const isValid = !!(await validateToken(token))
    return { isValid }
  } catch (error) {
    console.log(error)
  }
}

export async function getUserByToken(request, reply) {
  try {
    const { token } = request.body
    const user = await jwt.decode(token)
    if (user.role === 'student') {
      const dbUser = await models.User.findOne({ where: { id: user.id } })
      return dbUser
    } else {
      const dbUser = await models.Teacher.findOne({ where: { id: user.id } })
      return dbUser
    }
  } catch (error) {
    console.log(error)
  }
}

export async function login(request, reply) {
  try {
    const { email, password } = request.body
    const student = await models.User.findOne({ where: { email, password } })
    const teacher = await models.Teacher.findOne({ where: { email, password } })

    const user = student || teacher
    if (!user) {
      return reply.status(401).send({ message: 'Invalid username or password' })
    }
    const token = await generateToken(user)
    reply.send({ token, role: user.role, user })
  } catch (error) {
    console.log(error)
  }
}

export default {
  login,
  getUserByToken,
  isValidToken,
  checkTokenAndSetUser,
  validateToken,
  generateToken,
}
