import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentService {
  async getComments(id) {
    const res = await api.get('api/tasks/' + id + '/comments')
    // console.log('getting Comments from service', id)
    AppState.comments[id] = res.data
    // console.log('returning getComments from Appstate.comments', AppState.comments)
  }

  async createComment(newComment) {
    // console.log('id and title', newComment)
    await api.post('api/comments', newComment)
    this.getComments(newComment.task)
  }

  async deleteComment(comment) {
    // console.log('this is the delete function in service', comment)
    await api.delete('api/comments/' + comment.id)
    this.getComments(comment.task)
  }
}

export const commentService = new CommentService()
