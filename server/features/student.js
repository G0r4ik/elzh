import { models } from '../db.js'

export async function getStudentLessons(request, reply) {
  try {
    const { idTrimester } = request.params
    const lessons = await models.CourseLesson.findAll({
      where: { idCourse: request.user.idCourse },
      include: [{ model: models.Lesson }, { model: models.Trimester }],
    })
    const marks = await models.Mark.findAll({
      where: { idUser: request.user.id, idTrimester },
    })
    return { lessons, marks }
  } catch (error) {
    console.log(error)
  }
}

export default { getStudentLessons }
