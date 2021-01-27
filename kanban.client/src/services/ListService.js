import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListService {
  async getLists(id) {
    const res = await api.get('api/boards/' + id + '/lists')
    AppState.lists = res.data
  }

  async createList(listData) {
    await api.post('api/lists', listData)
    this.getLists()
    // this is for the router link, to give it the right ID to go to once the page is creator
  }

  async deleteList(id) {
    await api.delete('api/lists/' + id)
    this.getLists()
  }
}

export const listService = new ListService()
