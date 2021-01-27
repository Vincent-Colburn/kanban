import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentService {
  async getComments(id) {
    const res = await api.get('api/tasks/' + id + '/comments')
    console.log('getting Comments from service', id)
    AppState.comments[id] = res.data
    console.log('returning getComments from Appstate.comments', AppState.comments)
  }
}

export const commentService = new CommentService()
