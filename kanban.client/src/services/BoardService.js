import { AppState } from '../AppState'
import { api } from './AxiosService'

class BoardService {
  async getBoards() {
    const res = await api.get('api/boards')
    console.log('this is your service getting boards', res)
    AppState.boards = res.data
  }
}

export const boardService = new BoardService()
