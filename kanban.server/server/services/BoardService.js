import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardService {
  async getAll(query) {
    return await dbContext.Boards.find(query).populate('creator')
  }

  async getOne(boardId) {
    const boardFound = await dbContext.Boards.findById(boardId).populate('creator', 'name')
    if (!boardFound) {
      throw new BadRequest('No Board exists with that ID')
    }
    return boardFound
  }

  async delete(id) {
    return await dbContext.Boards.findByIdAndDelete(id)
  }

  async create(body) {
    return await dbContext.Boards.create(body)
  }

  async edit(id, title) {
    // NOTE why was this getone here
    // await this.getOne(id)
    const update = await dbContext.Boards.findByIdAndUpdate(id, title, { new: true })
    if (!update) {
      throw new BadRequest('No Board exists with that ID')
    }
    return update
  }

  // NOTE THIS is located in the List Service, and therefor not needed here and commented out

  // async getLists(boardId) {
  //   const res = await dbContext.Lists.find({ board: boardId }).populate('list')
  //   return res
  // }
}

export const boardService = new BoardService()
