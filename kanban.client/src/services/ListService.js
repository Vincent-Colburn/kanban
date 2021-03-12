import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListService {
  async getLists(id) {
    const res = await api.get('api/boards/' + id + '/lists')
    AppState.lists = res.data
  }

  async createList(listData, id) {
    await api.post('api/lists', listData)
    this.getLists(id)
    // this is for the router link, to give it the right ID to go to once the page is creator
  }

  async deleteList(id, boardId) {
    await api.delete('api/lists/' + id)
    this.getLists(boardId)
  }
}

export const listService = new ListService()
