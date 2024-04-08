import Fastify from 'fastify'
import cors from '@fastify/cors'
import './db.js'

import admin from './features/admin.js'
import auth from './features/auth.js'
import teacher from './features/teacher.js'
import shared from './features/shared.js'
import student from './features/student.js'

const fastify = Fastify({ logger: false })
await fastify.register(cors, { origin: '*' })

fastify.decorate('checkAuth', auth.checkTokenAndSetUser)

fastify.get('/', {
  preHandler: [fastify.checkAuth],
  handler: async function handler(request, reply) {
    reply.send({ message: `Hello from protected route, ${request.auth}` })
  },
})

fastify.get('/lessonsStudent/:idTrimester', {
  preHandler: [fastify.checkAuth],
  handler: student.getStudentLessons,
})
fastify.get('/trimester', {
  preHandler: [fastify.checkAuth],
  handler: shared.getTrimesters,
})

fastify.post('/login', auth.login)
fastify.post('/checkToken', auth.isValidToken)
fastify.post('/getUserByToken', auth.getUserByToken)

fastify.post('/student', {
  preHandler: [fastify.checkAuth],
  handler: admin.createStudent,
})
fastify.post('/teacher', {
  preHandler: [fastify.checkAuth],
  handler: admin.createTeacher,
})

fastify.post('/mark', {
  preHandler: [fastify.checkAuth],
  handler: teacher.setMark,
})
fastify.get('/courses', {
  preHandler: [fastify.checkAuth],
  handler: teacher.getCourses,
})
fastify.get('/lessons', {
  preHandler: [fastify.checkAuth],
  handler: teacher.getLessons,
})
fastify.get('/studentsByT', {
  preHandler: [fastify.checkAuth],
  handler: teacher.getStudents,
})

try {
  await fastify.listen({ port: process.env.PORT || 3000 })
  console.log(process.env.PORT)
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
