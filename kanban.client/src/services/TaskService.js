import { AppState } from '../AppState'
import { api } from './AxiosService'

class TaskService {
  async getTasks(id) {
    const res = await api.get('api/lists/' + id + '/tasks')
    console.log(res.data)
    AppState.tasks[id] = res.data
    console.log(AppState.tasks)
  }
}

export const taskService = new TaskService()
