import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentService {
  async getAll(query) {
    return await dbContext.Comments.find(query).populate('creator')
  }

  async getComments(query = {}) {
    return await dbContext.Comments.find(query).populate('creator')
  }

  // async getOne(commentId) {
  //   const commentFound = await dbContext.Comments.findById(commentId)
  //   if (!commentFound) {
  //     throw new BadRequest('No Comment exists with that ID')
  //   }
  //   return commentFound
  // }

  async delete(id, userId) {
    return await dbContext.Comments.findOneAndDelete({ _id: id, creatorId: userId })
  }

  async create(body) {
    return await dbContext.Comments.create(body)
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
