import { models } from '../db.js'

export async function getTrimesters(request, reply) {
  try {
    return models.Trimester.findAll()
  } catch (error) {
    console.log(error)
  }
}

export default { getTrimesters }
