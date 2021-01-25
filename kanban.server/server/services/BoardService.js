import { dbContext } from '../db/DbContext'
// import { BadRequest } from '../utils/Errors'

class BoardService {
  async create(body) {
    return await dbContext.Boards.create(body)
  }
}

export const boardService = new BoardService()
