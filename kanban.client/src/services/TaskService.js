import { AppState } from '../AppState'
import { api } from './AxiosService'

class TaskService {
  async getTasks(id) {
    const res = await api.get('api/lists/' + id + '/tasks')
    AppState.tasks[id] = res.data
  }

  async createTask(title) {
    await api.post('api/tasks', title)
    this.getTasks(title.list)
  }

  async editTask(task, newListId) {
    const move = { list: newListId }
    await api.put('api/tasks/' + task.id, move)
    this.getTasks(newListId)
    this.getTasks(task.list)
  }

  async deleteTask(task) {
    await api.delete('api/tasks/' + task.id)
    this.getTasks(task.list)
  }
}

export const taskService = new TaskService()
