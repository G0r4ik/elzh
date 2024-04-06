import jwt from 'jsonwebtoken'
const secretKey = 'YOUR_SECRET_KEfsdsdfsdfcx'

export async function generateToken(user) {
  const payload = { id: user.id, username: user.username, role: user.role }
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

export async function checkToken(request, reply) {
  const token = request.headers['authorization']
  if (!token) throw new Error('Unauthorized')

  const decodedToken = await validateToken(token)
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
