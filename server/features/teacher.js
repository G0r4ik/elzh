import { models } from '../db.js'

export async function setMark(request, reply) {
  try {
    const { idStudent, date, idTrimester, mark, idLesson } = request.body
    const existMark = await models.Mark.findOne({
      where: { date: String(date), idTrimester, idLesson, idUser: idStudent },
    })

    models.Mark.update(
      { mark: String(mark) },
      {
        where: { date: String(date), idTrimester, idLesson, idUser: idStudent },
      }
    )

    if (existMark) {
    }
    const cmark = await models.Mark.create({
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
}

export async function getCourses(request, reply) {
  try {
    const courses = await models.Course.findAll()

    return courses
  } catch (error) {
    console.log(error)
  }
}

export async function getLessons(request, reply) {
  try {
    const lessons = await models.Lesson.findAll({
      where: { idTeacher: request.user.id },
    })

    return lessons
  } catch (error) {
    console.log(error)
  }
}

export async function getStudents(request, reply) {
  try {
    const { idCourse, idTrimester, idLesson } = request.query
    const users = JSON.parse(
      JSON.stringify(await models.User.findAll({ where: { idCourse } }))
    )

    for (let i = 0; i < users.length; i++) {
      const marks = await models.Mark.findAll({
        where: { idUser: users[i].id, idTrimester, idLesson },
      })
      users[i].marks = marks
    }
    return users
  } catch (error) {
    console.log(error)
  }
}

export default { getStudents, getLessons, getCourses, setMark }
