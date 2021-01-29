import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { taskService } from '../services/TaskService'
import { commentService } from '../services/CommentService'

export class TaskController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      // .get(':taskId', this.getOne)
      .get('/:id/comments', this.getComments)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await taskService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  // ANCHOR why is it req.query
  async getAll(req, res, next) {
    try {
      return res.send(await taskService.getAll(req.query))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      return res.send(await taskService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  // async getOne(req, res, next) {
  //   try {
  //     res.send(await taskService.getOne(req.params.taskId))
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async edit(req, res, next) {
    try {
      res.send(await taskService.edit(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      const data = await commentService.getComments({ task: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
