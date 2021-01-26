import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListService {
  async getLists(query = {}) {
    return await dbContext.Lists.find(query)
  }

  // async getOne(listId) {
  //   const listFound = await dbContext.Lists.findById(listId)
  //   if (!listFound) {
  //     throw new BadRequest('No List exists with that ID')
  //   }
  //   return listFound
  // }

  async delete(id) {
    return await dbContext.Lists.findByIdAndDelete(id)
  }

  async create(body) {
    return await dbContext.Lists.create(body)
  }

  async getAll(query) {
    return await dbContext.Lists.find(query)
  }

  async edit(id, title) {
    // NOTE why was this getone here
    // await this.getOne(id)
    const update = await dbContext.Lists.findByIdAndUpdate(id, title, { new: true })
    if (!update) {
      throw new BadRequest('No List exists with that ID')
    }
    return update
  }
}

export const listService = new ListService()
