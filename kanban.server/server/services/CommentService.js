import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentService {
  async getComments(query = {}) {
    return await dbContext.Comments.find(query)
  }

  // async getOne(commentId) {
  //   const commentFound = await dbContext.Comments.findById(commentId)
  //   if (!commentFound) {
  //     throw new BadRequest('No Comment exists with that ID')
  //   }
  //   return commentFound
  // }

  async delete(id) {
    return await dbContext.Comments.findByIdAndDelete(id)
  }

  async create(body) {
    return await dbContext.Comments.create(body)
  }

  async getAll(query) {
    return await dbContext.Comments.find(query)
  }

  async edit(id, title) {
    // NOTE why was this getone here
    // await this.getOne(id)
    const update = await dbContext.Comments.findByIdAndUpdate(id, title, { new: true })
    if (!update) {
      throw new BadRequest('No Comment exists with that ID')
    }
    return update
  }
}

export const commentService = new CommentService()
