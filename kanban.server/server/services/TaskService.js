import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TaskService {
  async getTasks(query = {}) {
    return await dbContext.Tasks.find(query)
  }

  // async getOne(taskId) {
  //   const taskFound = await dbContext.Tasks.findById(taskId)
  //   if (!taskFound) {
  //     throw new BadRequest('No Task exists with that ID')
  //   }
  //   return taskFound
  // }

  async delete(id) {
    return await dbContext.Tasks.findByIdAndDelete(id)
  }

  async create(body) {
    return await dbContext.Tasks.create(body)
  }

  async getAll(query) {
    return await dbContext.Tasks.find(query)
  }

  async edit(id, title) {
    // NOTE why was this getone here
    // await this.getOne(id)
    const update = await dbContext.Tasks.findByIdAndUpdate(id, title, { new: true })
    if (!update) {
      throw new BadRequest('No Task exists with that ID')
    }
    return update
  }
}

export const taskService = new TaskService()
