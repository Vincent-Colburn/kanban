import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentService {
  async getComments(id) {
    const res = await api.get('api/tasks/' + id + '/comments')
    AppState.comments[id] = res.data
  }

  async createComment(newComment) {
    await api.post('api/comments', newComment)
    this.getComments(newComment.task)
  }

  async deleteComment(comment) {
    await api.delete('api/comments/' + comment.id)
    this.getComments(comment.task)
  }
}

export const commentService = new CommentService()
