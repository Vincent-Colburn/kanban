import { AppState } from '../AppState'
import { api } from './AxiosService'

class BoardService {
  async getBoards() {
    const res = await api.get('api/boards')
    // console.log('this is your service getting boards', res)
    AppState.boards = res.data
  }

  async getOne(id) {
    console.log(id)
    const res = await api.get('api/boards/' + id)
    console.log('getone', res.data)
    AppState.activeBoard = res.data
  }

  // TODO fix router when creating new board
  async createBoard(boardData) {
    const res = await api.post('api/boards', boardData)
    console.log('this is your service creating the board', res)
    this.getBoards()
    // this is for the router link, to give it the right ID to go to once the page is creator
    console.log('over here', res.data.id)
  }

  async deleteBoard(id) {
    await api.delete('api/boards/' + id)
    this.getBoards()
  }
}

export const boardService = new BoardService()
