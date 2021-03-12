import { AppState } from '../AppState'
import { api } from './AxiosService'

class BoardService {
  async getBoards() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
  }

  async getOne(id) {
    const res = await api.get('api/boards/' + id)
    AppState.activeBoard = res.data
  }

  // TODO fix router when creating new board
  async createBoard(boardData) {
    const res = await api.post('api/boards', boardData)
    return res.data.id
  }

  async deleteBoard(id) {
    await api.delete('api/boards/' + id)
    this.getBoards()
  }
}

export const boardService = new BoardService()
