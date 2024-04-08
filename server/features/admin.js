export async function createStudent(request, reply) {
  try {
    const { user } = request.body
    const createdUser = await User.create(user)
    return createdUser
  } catch (error) {
    console.log(error)
    return { error: 'Что-то пошло не так' }
  }
}

export async function createTeacher(request, reply) {
  try {
    const { user } = request.body
    const createdUser = await User.create(user)

    return createdUser
  } catch (error) {
    console.log(error)
  }
}

export default { createTeacher, createStudent }
