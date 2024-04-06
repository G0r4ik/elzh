import Fastify from 'fastify'
import cors from '@fastify/cors'
import './db.js'
import { checkToken, generateToken, validateToken } from './auth.js'
import {
  Course,
  CourseLesson,
  Lesson,
  Mark,
  Teacher,
  Trimester,
  User,
} from './db.js'
import jwt from 'jsonwebtoken'

const fastify = Fastify({ logger: false })
await fastify.register(cors, { origin: '*' })

fastify.decorate('checkAuth', checkToken)

fastify.get('/', {
  preHandler: [fastify.checkAuth],
  handler: async function handler(request, reply) {
    reply.send({ message: `Hello from protected route, ${request.auth}` })
  },
})

fastify.post('/login', async (request, reply) => {
  const { email, password } = request.body
  const student = await User.findOne({ where: { email, password } })
  const teacher = await Teacher.findOne({ where: { email, password } })

  if (!student && !teacher) {
    return reply.status(401).send({ message: 'Invalid username or password' })
  }
  const user = student || teacher
  const token = await generateToken(user)
  reply.send({ token, role: user.role })
})

fastify.post('/checkToken', async (request, reply) => {
  const { token } = request.body

  const isValid = !!(await validateToken(token))
  return { isValid }
})

fastify.post('/students', async (request, reply) => {
  try {
    const { user } = request.body
    const createdUser = await User.create(user)
    return createdUser
  } catch (error) {
    console.log(error)
  }
})

fastify.post('/teachers', async (request, reply) => {
  try {
    const { user } = request.body
    const createdUser = await User.create(user)

    return createdUser
  } catch (error) {
    console.log(error)
  }
})

fastify.post('/mark', async (request, reply) => {
  try {
    const { idStudent, date, idTrimester, mark, idLesson } = request.body
    const existMark = await Mark.findOne({
      where: { date: String(date), idTrimester, idLesson, idUser: idStudent },
    })

    // const existMark = await Mark.findOne({ where: { id: user.id } })

    Mark.update(
      { mark: String(mark) },
      {
        where: { date: String(date), idTrimester, idLesson, idUser: idStudent },
      }
    )

    if (existMark) {
      console.log(1)
    }
    const cmark = await Mark.create({
      idUser: idStudent,
      date,
      idTrimester,
      mark,
      idLesson,
    })

    return cmark
  } catch (error) {
    console.log(error)
  }
})

fastify.get('/courses', async (request, reply) => {
  try {
    const courses = await Course.findAll()

    return courses
  } catch (error) {
    console.log(error)
  }
})

fastify.get('/lessons/:idTeacher', async (request, reply) => {
  try {
    const { idTeacher } = request.params
    const lessons = await Lesson.findAll({ where: { idTeacher: idTeacher } })

    return lessons
  } catch (error) {
    console.log(error)
  }
})

fastify.get(
  '/lessonsStudent/:idUser/:idTrimester/:idCourse',
  async (request, reply) => {
    try {
      const { idUser, idCourse, idTrimester } = request.params
      const lessons = await CourseLesson.findAll({
        where: { idCourse: +idCourse },
        include: [
          { model: Lesson },
          { model: Trimester },
          // {
          //   model: Mark,
          //   where: { idUser, idTrimester },
          // },
        ],
      })

      const marks = await Mark.findAll({
        where: { idUser, idTrimester },
      })

      return { lessons, marks }
    } catch (error) {
      console.log(error)
    }
  }
)

fastify.get('/trimester', async (request, reply) => {
  try {
    const trimester = await Trimester.findAll()

    return trimester
  } catch (error) {
    console.log(error)
  }
})

fastify.get('/course/:id/:idTrimester/:idLesson', async (request, reply) => {
  try {
    const { id, idTrimester, idLesson } = request.params
    const users = JSON.parse(
      JSON.stringify(await User.findAll({ where: { idCourse: id } }))
    )

    for (let i = 0; i < users.length; i++) {
      const marks = await Mark.findAll({
        where: { idUser: users[i].id, idTrimester, idLesson },
      })
      users[i].marks = marks
    }
    return users
  } catch (error) {
    console.log(error)
  }
})

fastify.post('/getUserByToken', async (request, reply) => {
  try {
    const { token } = request.body
    const user = await jwt.decode(token)
    if (user.role === 'student') {
      const dbUser = await User.findOne({ where: { id: user.id } })
      return dbUser
    } else {
      const dbUser = await Teacher.findOne({ where: { id: user.id } })
      return dbUser
    }
  } catch (error) {
    console.log(error)
  }
})

try {
  await fastify.listen({ port: process.env.PORT || 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
